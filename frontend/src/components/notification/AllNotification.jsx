import {
  Bell,
  ShoppingCart,
  Tractor,
  Package,
  Check,
  Trash2,
} from "lucide-react";

import { useNotifications } from "../../context/NotificationContext";

const AllNotification = () => {
  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotifications();

  const getIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingCart size={22} className="text-green-600" />;

      case "booking":
        return <Tractor size={22} className="text-blue-600" />;

      case "product":
        return <Package size={22} className="text-orange-500" />;

      default:
        return <Bell size={22} className="text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Loading Notifications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}

        <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Notifications</h1>

            <p className="text-gray-500 mt-2">
              Stay updated with your latest activities.
            </p>
          </div>

          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold"
            >
              Mark All Read
            </button>
          )}
        </div>

        {/* Empty */}

        {notifications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-16 text-center">
            <Bell size={60} className="mx-auto text-gray-400" />

            <h2 className="text-2xl font-semibold mt-5">No Notifications</h2>

            <p className="text-gray-500 mt-2">You're all caught up.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`bg-white rounded-2xl shadow p-6 flex gap-5 ${
                  !notification.isRead ? "border-l-4 border-green-600" : ""
                }`}
              >
                <div className="bg-green-50 h-12 w-12 rounded-xl flex items-center justify-center">
                  {getIcon(notification.type)}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {notification.title}
                      </h2>

                      <p className="text-gray-600 mt-2">
                        {notification.message}
                      </p>
                    </div>

                    {!notification.isRead && (
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full h-fit">
                        New
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-400 mt-4">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>

                  <div className="flex gap-3 mt-5">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification._id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check size={18} />
                        Mark Read
                      </button>
                    )}

                    <button
                      onClick={() => removeNotification(notification._id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNotification;
