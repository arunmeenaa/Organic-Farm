import { createContext, useContext, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "../services/notification.service";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const previousNotifications = useRef([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    socket.emit("register", user._id);
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      setNotifications([]);
      return;
    }

    fetchNotifications();
  }, [isAuthenticated]);
  useEffect(() => {
    socket.on("notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);

      showNotificationToast(notification);
    });

    return () => {
      socket.off("notification");
    };
  }, []);
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const { data } = await getNotifications();

      const latest = data.notifications;

      // Skip toast on first load
      if (previousNotifications.current.length > 0) {
        latest.forEach((notification) => {
          const exists = previousNotifications.current.find(
            (item) => item._id === notification._id,
          );

          if (!exists && !notification.isRead) {
            showNotificationToast(notification);
          }
        });
      }

      previousNotifications.current = latest;

      setNotifications(latest);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const showNotificationToast = (notification) => {
    toast.custom(
      (t) => (
        <div
          className={`w-[380px] bg-white rounded-2xl shadow-2xl border border-green-100 p-4 transition-all duration-300 ${
            t.visible
              ? "animate-in slide-in-from-right"
              : "animate-out slide-out-to-right"
          }`}
        >
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
              {notification.type === "order"
                ? "🛒"
                : notification.type === "booking"
                  ? "🚜"
                  : "🔔"}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">
                {notification.title}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {notification.message}
              </p>

              <button
                onClick={() => {
                  toast.dismiss(t.id);

                  if (notification.type === "order") {
                    navigate(`/orders/${notification.referenceId}`);
                  } else if (notification.type === "booking") {
                    navigate(`/machine-bookings/${notification.referenceId}`);
                  }
                }}
                className="mt-4 text-green-600 hover:text-green-700 font-semibold"
              >
                View Details →
              </button>
            </div>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "bottom-right",
      },
    );
  };
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  const markAsRead = async (id) => {
    try {
      await markNotificationRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await markAllNotificationsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeNotification = async (id) => {
    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== id),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
