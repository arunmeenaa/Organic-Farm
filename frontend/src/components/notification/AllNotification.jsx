import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  ShoppingCart,
  Tractor,
  Package,
  Check,
  Trash2,
  CheckCheck,
  Search,
} from "lucide-react";

import { useNotifications } from "../../context/NotificationContext";

/* ---------------- Icon Helper ---------------- */

const getIconInfo = (type) => {
  switch (type) {
    case "order":
      return {
        icon: (
          <ShoppingCart
            size={24}
            className="text-emerald-600 dark:text-emerald-400"
          />
        ),
        bg: "bg-emerald-100 dark:bg-emerald-500/20",
        label: "Order",
      };

    case "booking":
      return {
        icon: <Tractor size={24} className="text-sky-600 dark:text-sky-400" />,
        bg: "bg-sky-100 dark:bg-sky-500/20",
        label: "Booking",
      };

    case "product":
      return {
        icon: (
          <Package size={24} className="text-amber-600 dark:text-amber-400" />
        ),
        bg: "bg-amber-100 dark:bg-amber-500/20",
        label: "Product",
      };

    default:
      return {
        icon: <Bell size={24} className="text-stone-500 dark:text-stone-400" />,
        bg: "bg-stone-100 dark:bg-stone-500/20",
        label: "General",
      };
  }
};

/* ---------------- Date Helpers ---------------- */

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
  const created = new Date(date);

  const diff = now - created;

  const minute = 60000;
  const hour = minute * 60;
  const day = hour * 24;

  if (diff < minute) return "Just now";

  if (diff < hour) return `${Math.floor(diff / minute)} min ago`;

  if (diff < day) return `${Math.floor(diff / hour)}h ago`;

  if (isYesterday(date))
    return (
      "Yesterday • " +
      created.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    );

  return created.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: created.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};

/* ---------------- Component ---------------- */

const AllNotification = () => {
  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotifications();

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const glassPanel =
    "bg-white/70 dark:bg-[#112117]/65 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-3xl shadow-xl";

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  /* ---------- Search ---------- */

  const filteredNotifications = useMemo(() => {
    let list = [...notifications];

    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (filter === "unread") {
      list = list.filter((n) => !n.isRead);
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.message.toLowerCase().includes(q),
      );
    }

    return list;
  }, [notifications, filter, search]);

  /* ---------- Group ---------- */

  const groupedNotifications = useMemo(() => {
    const groups = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };

    filteredNotifications.forEach((n) => {
      if (isToday(n.createdAt)) groups.Today.push(n);
      else if (isYesterday(n.createdAt)) groups.Yesterday.push(n);
      else groups.Earlier.push(n);
    });

    return groups;
  }, [filteredNotifications]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-5">
        {/* Header */}

        <div className={`${glassPanel}  top-24 z-20 p-7 mb-8`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold">Notifications</h1>

              <p className="mt-2 text-stone-500 dark:text-stone-400">
                Stay updated with your marketplace activities.
              </p>

              <div className="flex gap-6 mt-5">
                <div>
                  <p className="text-2xl font-bold">{notifications.length}</p>

                  <p className="text-xs uppercase tracking-wider text-stone-500">
                    Total
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-emerald-600">
                    {unreadCount}
                  </p>

                  <p className="text-xs uppercase tracking-wider text-stone-500">
                    Unread
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={markAllAsRead}
              className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold flex items-center gap-2 hover:bg-emerald-500 transition"
            >
              <CheckCheck size={18} />
              Mark All Read
            </button>
          </div>

          {/* Search */}

          <div className="mt-8 relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notifications..."
              className="w-full rounded-xl bg-white/70 dark:bg-white/5 border border-stone-200 dark:border-white/10 pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Filter */}

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 rounded-full font-medium transition ${
                filter === "all"
                  ? "bg-emerald-600 text-white"
                  : "bg-white dark:bg-white/5"
              }`}
            >
              All ({notifications.length})
            </button>

            <button
              onClick={() => setFilter("unread")}
              className={`px-5 py-2 rounded-full font-medium transition ${
                filter === "unread"
                  ? "bg-emerald-600 text-white"
                  : "bg-white dark:bg-white/5"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
        </div>

        {/* Empty State */}

        {filteredNotifications.length === 0 ? (
          <div
            className={`${glassPanel} p-16 flex flex-col items-center justify-center text-center`}
          >
            <div className="w-24 h-24 rounded-full bg-white/60 dark:bg-white/5 flex items-center justify-center mb-6">
              <Bell size={42} className="text-stone-400" />
            </div>

            <h2 className="text-2xl font-bold">No Notifications Found</h2>

            <p className="mt-2 text-stone-500 dark:text-stone-400 max-w-md">
              You're all caught up. New orders, bookings and marketplace
              activities will appear here.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {Object.entries(groupedNotifications).map(([section, items]) => {
              if (!items.length) return null;

              return (
                <div key={section} className="mb-10">
                  {/* Section Header */}

                  <div
                    className="
              
              top-58.75
              z-10
              mb-4
              px-5
              py-2
              rounded-xl
              backdrop-blur-xl
              bg-white/70
              dark:bg-[#112117]/80
              border
              border-white/50
              dark:border-white/10
            "
                  >
                    <span className="uppercase tracking-[0.18em] text-xs font-bold text-stone-500 dark:text-emerald-300">
                      {section}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {items.map((notification) => {
                      const { icon, bg, label } = getIconInfo(
                        notification.type,
                      );

                      return (
                        <motion.div
                          layout
                          key={notification._id}
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            x: 80,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className={`
                    ${glassPanel}
                    relative
                    overflow-hidden
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-2xl

                    ${
                      !notification.isRead
                        ? "border-l-4 border-l-emerald-500 shadow-[0_10px_40px_rgba(16,185,129,.08)]"
                        : ""
                    }
                  `}
                        >
                          {/* unread glow */}

                          {!notification.isRead && (
                            <span
                              className="
                        absolute
                        top-5
                        right-5
                        w-2.5
                        h-2.5
                        rounded-full
                        bg-emerald-500
                        animate-pulse
                      "
                            />
                          )}

                          <div className="flex gap-5">
                            {/* icon */}

                            <div
                              className={`
                        ${bg}
                        w-14
                        h-14
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        shrink-0
                      `}
                            >
                              {icon}
                            </div>

                            {/* content */}

                            <div className="flex-1">
                              <div className="flex items-center gap-3 flex-wrap">
                                <h2
                                  className={`text-lg ${
                                    notification.isRead
                                      ? "font-semibold"
                                      : "font-bold"
                                  }`}
                                >
                                  {notification.title}
                                </h2>

                                <span
                                  className="
                            px-2.5
                            py-1
                            rounded-full
                            text-[11px]
                            font-semibold
                            bg-stone-100
                            dark:bg-white/5
                          "
                                >
                                  {label}
                                </span>

                                {!notification.isRead && (
                                  <span
                                    className="
                              px-2.5
                              py-1
                              rounded-full
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-wider
                              bg-emerald-500/10
                              text-emerald-600
                              dark:text-emerald-300
                            "
                                  >
                                    NEW
                                  </span>
                                )}
                              </div>

                              <p className="mt-3 leading-7 text-stone-600 dark:text-stone-300">
                                {notification.message}
                              </p>

                              <div className="mt-5 flex items-center justify-between flex-wrap gap-4">
                                <span className="text-sm text-stone-400">
                                  {getRelativeTime(notification.createdAt)}
                                </span>

                                <div className="flex gap-3">
                                  {!notification.isRead && (
                                    <button
                                      onClick={() =>
                                        markAsRead(notification._id)
                                      }
                                      className="
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                px-4
                                py-2
                                bg-emerald-100
                                dark:bg-emerald-500/20
                                hover:bg-emerald-200
                                dark:hover:bg-emerald-500/30
                                transition
                              "
                                    >
                                      <Check size={16} />
                                      Mark Read
                                    </button>
                                  )}

                                  <button
                                    onClick={() =>
                                      removeNotification(notification._id)
                                    }
                                    className="
                              flex
                              items-center
                              gap-2
                              rounded-xl
                              px-4
                              py-2
                              bg-red-100
                              dark:bg-red-500/20
                              hover:bg-red-200
                              dark:hover:bg-red-500/30
                              text-red-600
                              dark:text-red-400
                              transition
                            "
                                  >
                                    <Trash2 size={16} />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default AllNotification;
