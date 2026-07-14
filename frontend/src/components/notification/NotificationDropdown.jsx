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
import { Link } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";

// FIX 1: Moved static helper function OUTSIDE the component
// This prevents the function from being recreated on every render cycle
const getIconInfo = (type) => {
  switch (type) {
    case "order":
      return {
        icon: (
          <ShoppingCart
            size={18}
            className="text-emerald-600 dark:text-emerald-400"
          />
        ),
        bg: "bg-emerald-100/70 dark:bg-emerald-500/20",
      };
    case "booking":
      return {
        icon: <Tractor size={18} className="text-sky-600 dark:text-sky-400" />,
        bg: "bg-sky-100/70 dark:bg-sky-500/20",
      };
    case "product":
      return {
        icon: (
          <Package size={18} className="text-amber-600 dark:text-amber-400" />
        ),
        bg: "bg-amber-100/70 dark:bg-amber-500/20",
      };
    default:
      return {
        icon: <Bell size={18} className="text-stone-500 dark:text-stone-400" />,
        bg: "bg-stone-100/70 dark:bg-stone-500/20",
      };
  }
};

const NotificationDropdown = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead, removeNotification } =
    useNotifications();

  const containerRef = useRef(null);

  // FIX 2 & 3: Enhanced useEffect for accessibility and memory leak prevention
  useEffect(() => {
    const handleInteractionOutside = (event) => {
      // Close if clicked outside
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onClose?.();
      }
    };

    const handleEscapeKey = (event) => {
      // Close if Escape key is pressed (Important for Accessibility/UX)
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("click", handleInteractionOutside);
    document.addEventListener("keydown", handleEscapeKey);

    // Cleanup function
    return () => {
      document.removeEventListener("click", handleInteractionOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);
  const isToday = (date) => {
    const today = new Date();
    return new Date(date).toDateString() === today.toDateString();
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return new Date(date).toDateString() === yesterday.toDateString();
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diff < minute) return "Just now";

    if (diff < hour) return `${Math.floor(diff / minute)} min ago`;

    if (diff < day) return `${Math.floor(diff / hour)} hr ago`;

    if (isYesterday(date)) {
      return (
        "Yesterday • " +
        new Date(date).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      );
    }

    return new Date(date).toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year:
        now.getFullYear() !== new Date(date).getFullYear()
          ? "numeric"
          : undefined,
    });
  };
  const groupedNotifications = {
    Today: [],
    Yesterday: [],
    Earlier: [],
  };

  notifications.forEach((notification) => {
    if (isToday(notification.createdAt)) {
      groupedNotifications.Today.push(notification);
    } else if (isYesterday(notification.createdAt)) {
      groupedNotifications.Yesterday.push(notification);
    } else {
      groupedNotifications.Earlier.push(notification);
    }
  });
  return (
    <div
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      className="absolute right-0 mt-4 w-90 sm:w-105 max-w-[calc(100vw-24px)] rounded-2xl overflow-hidden z-50 origin-top-right
animate-in
fade-in
zoom-in-95
duration-200
        bg-white/65
dark:bg-[#09130E]/72
backdrop-blur-3xl backdrop-saturate-150
        border border-white/60 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5
        shadow-[0_25px_60px_rgba(0,0,0,.18)]
dark:shadow-[0_30px_80px_rgba(0,0,0,.55)]
        transition-colors font-['Inter',sans-serif]"
    >
      {/* Glossy sheen overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/50 dark:from-white/5 via-white/10 dark:via-transparent to-transparent z-0" />

      {/* Ambient Glows */}
      <div className="pointer-events-none absolute -top-16 -left-10 w-40 h-40 bg-emerald-200/40 dark:bg-emerald-600/10 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-16 -right-10 w-40 h-40 bg-amber-100/40 dark:bg-amber-600/10 rounded-full blur-3xl z-0" />

      <div className="relative z-10">
        {/* Header */}
        <div
          className="flex justify-between sticky
top-0
z-20 items-center px-5 py-4 border-b border-stone-200/50 dark:border-white/10 bg-white/30 dark:bg-[#112117]/50"
        >
          <h2 className="text-lg font-bold text-stone-900 dark:text-emerald-50">
            Notifications
            <span className="ml-2 text-sm text-stone-500">
              ({notifications.length})
            </span>
          </h2>

          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            >
              <CheckCheck size={16} />
              Mark all read
            </button>
          )}
        </div>

        {/* Empty State */}
        {notifications.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-stone-500 dark:text-emerald-100/50">
            <div className="w-16 h-16 mb-4 rounded-full bg-stone-100 dark:bg-white/5 flex items-center justify-center">
              <Bell size={28} className="opacity-50" />
            </div>
            <p className="font-medium">No new notifications</p>
            <p className="text-sm mt-1 opacity-70">You're all caught up!</p>
          </div>
        ) : (
          /* Notifications List */
          <div className="max-h-105 overflow-y-auto">
            {Object.entries(groupedNotifications).map(([section, items]) => {
              if (!items.length) return null;

              return (
                <div key={section}>
                  <div
                    className="
          sticky top-0 z-10
          px-5 py-2
          text-[11px]
          font-bold
          tracking-[0.15em]
          uppercase
          text-stone-500
          dark:text-emerald-300/70
          bg-white/80
          dark:bg-[#0A130E]/90
          backdrop-blur-xl
          border-b border-stone-200/40 dark:border-white/5
        "
                  >
                    {section}
                  </div>

                  {items.map((notification) => {
                    const { icon, bg } = getIconInfo(notification.type);

                    return (
                      <div
                        key={notification._id}
                        className={`relative flex gap-4 p-4 border-b border-stone-200/40 dark:border-white/5 hover:bg-emerald-100/50 hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-200 ${
                          !notification.isRead
                            ? "bg-linear-to-r from-emerald-100 to-transparent dark:from-emerald-900/25 dark:bg-emerald-950/30 border-l-4 border-l-emerald-500 dark:border-l-emerald-400"
                            : "bg-transparent border-l-4 border-l-transparent opacity-80 dark:opacity-75"
                        }`}
                      >
                        {!notification.isRead && (
                          <span
                            className="
absolute
top-4
right-4
w-2
h-2
rounded-full
bg-emerald-500
animate-pulse
shadow-[0_0_10px_rgba(16,185,129,.6)]
"
                          />
                        )}

                        <div
                          className={`mt-1 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}
                        >
                          {icon}
                        </div>

                        <div className="flex-1 min-w-0 pr-6">
                          <h3
                            className={`text-sm ${
                              !notification.isRead
                                ? "font-bold text-stone-900 dark:text-emerald-50"
                                : "font-semibold text-stone-700 dark:text-emerald-100/80"
                            }`}
                          >
                            {notification.title}
                          </h3>

                          <p
                            className={`text-sm mt-1 leading-relaxed ${
                              !notification.isRead
                                ? "text-stone-700 dark:text-emerald-100/70"
                                : "text-stone-500 dark:text-emerald-100/50"
                            }`}
                          >
                            {notification.message}
                          </p>

                          <p className="text-xs font-medium text-stone-400 dark:text-emerald-100/40 mt-2.5">
                            {getRelativeTime(notification.createdAt)}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 shrink-0">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification._id)}
                              className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-100/60 dark:bg-emerald-500/20 hover:bg-emerald-200/80 dark:hover:bg-emerald-500/30 transition-colors group"
                            >
                              <Check
                                size={16}
                                className="text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform"
                              />
                            </button>
                          )}

                          <button
                            onClick={() => removeNotification(notification._id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100/50 dark:bg-red-500/20 hover:bg-red-200/70 dark:hover:bg-red-500/30 transition-colors group"
                          >
                            <Trash2
                              size={16}
                              className="text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform"
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        {notifications.length > 0 && (
          <div
            className="border-t sticky
bottom-0
z-20 border-stone-200/50 dark:border-white/10 p-3 bg-white/40 dark:bg-[#112117]/60 flex gap-3"
          >
            <Link
              to="/notifications"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 
                border border-stone-200/60 dark:border-white/10
                text-stone-800 dark:text-emerald-50 font-semibold text-sm transition-colors"
            >
              View all
              <ArrowRight size={16} />
            </Link>

            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-400 text-white font-semibold text-sm transition-colors shadow-sm"
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
