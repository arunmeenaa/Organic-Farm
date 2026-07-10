import { useEffect, useRef } from "react";
import {
  Bell,
  Check,
  ShoppingCart,
  Tractor,
  Package,
  Trash2,
  CheckCheck,
  ArrowRight,
} from "lucide-react";

import { useNotifications } from "../../context/NotificationContext";
import { Link } from "react-router-dom";

const NotificationDropdown = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead, removeNotification } =
    useNotifications();

  const containerRef = useRef(null);

  // Close when clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const getIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingCart size={18} className="text-emerald-600" />;

      case "booking":
        return <Tractor size={18} className="text-sky-600" />;

      case "product":
        return <Package size={18} className="text-amber-600" />;

      default:
        return <Bell size={18} className="text-stone-500" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case "order":
        return "bg-emerald-100/70";
      case "booking":
        return "bg-sky-100/70";
      case "product":
        return "bg-amber-100/70";
      default:
        return "bg-stone-100/70";
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute right-0 mt-4 w-[380px] rounded-2xl overflow-hidden z-50
        bg-white/60 backdrop-blur-2xl backdrop-saturate-150
        border border-white/60 ring-1 ring-black/5
        shadow-[0_20px_50px_-12px_rgba(6,78,59,0.25)]"
    >
      {/* Glossy sheen overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 via-white/10 to-transparent" />
      <div className="pointer-events-none absolute -top-16 -left-10 w-40 h-40 bg-emerald-200/40 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-10 w-40 h-40 bg-amber-100/40 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}

        <div className="flex justify-between items-center px-5 py-4 border-b border-white/40 bg-white/20">
          <h2 className="text-lg font-semibold text-stone-900">
            Notifications
          </h2>

          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <CheckCheck size={14} />
              Mark all
            </button>
          )}
        </div>

        {/* Empty */}

        {notifications.length === 0 ? (
          <div className="py-14 text-center text-stone-500">
            <Bell size={40} className="mx-auto mb-3 opacity-40" />
            No Notifications
          </div>
        ) : (
          <div className="max-h-[450px] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`relative flex font-bold3 gap-3 p-4 border-b border-white/40 hover:bg-white/50 transition-colors ${
                  !notification.isRead
                    ? "bg-emerald-100 border-l-4 border-l-emerald-500"
                    : "bg-white/10 border-l-4 border-l-transparent opacity-70"
                }`}
              >
                {/* Unread dot */}
                {!notification.isRead && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500" />
                )}

                {/* Icon */}

                <div
                  className={`mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${getIconBg(
                    notification.type,
                  )}`}
                >
                  {getIcon(notification.type)}
                </div>

                {/* Content */}

                <div className="flex-1 min-w-0 pr-4">
                  <h3
                    className={`text-sm ${
                      !notification.isRead
                        ? "font-bold text-stone-900"
                        : "font-medium text-stone-600"
                    }`}
                  >
                    {notification.title}
                  </h3>

                  <p
                    className={`text-sm mt-1 ${
                      !notification.isRead ? "text-stone-700" : "text-stone-500"
                    }`}
                  >
                    {notification.message}
                  </p>

                  <p className="text-xs text-stone-400 mt-2">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Actions */}

                <div className="flex flex-col gap-3">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification._id)}
                      title="Mark as read"
                      className="w-7 h-7 rounded-full flex items-center justify-center bg-emerald-100/60 hover:bg-emerald-200/70 transition-colors"
                    >
                      <Check size={14} className="text-emerald-700" />
                    </button>
                  )}

                  <button
                    onClick={() => removeNotification(notification._id)}
                    title="Delete"
                    className="w-7 h-7 rounded-full flex items-center justify-center bg-red-100/50 hover:bg-red-200/60 transition-colors"
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}

        {notifications.length > 0 && (
          <div className="border-t border-white/40 p-3 bg-white/25 flex gap-2">
            <Link
              to="/notifications"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg
                bg-white/50 hover:bg-white/70 border border-white/60
                text-stone-800 font-medium text-sm transition-colors"
            >
              View all
              <ArrowRight size={14} />
            </Link>

            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-sm"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
