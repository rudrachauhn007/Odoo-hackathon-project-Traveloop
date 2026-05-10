import { useEffect, useState } from "react";

import api from "../../lib/axios";

import { Bell, Trash2 } from "lucide-react";

function NotificationBell() {
    const [open, setOpen] = useState(false);

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await api.get("/notifications");

            setNotifications(res.data.notifications);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const handleRead = async (id) => {
        try {
            await api.patch(`/notifications/${id}/read`);

            setNotifications((prev) =>
                prev.map((n) =>
                    n.id === id
                        ? {
                              ...n,
                              isRead: true,
                          }
                        : n,
                ),
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/notifications/${id}`);

            setNotifications((prev) => prev.filter((n) => n.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleReadAll = async () => {
        try {
            await api.patch("/notifications/read-all");

            setNotifications((prev) =>
                prev.map((n) => ({
                    ...n,
                    isRead: true,
                })),
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative">
            {/* BELL */}
            <button
                onClick={() => setOpen(!open)}
                className="
                    relative
                    h-12
                    w-12
                    rounded-2xl
                    bg-white
                    border
                    border-slate-200
                    flex
                    items-center
                    justify-center
                    hover:bg-slate-50
                    transition
                "
            >
                <Bell size={20} />

                {unreadCount > 0 && (
                    <div
                        className="
                            absolute
                            -top-1
                            -right-1
                            h-6
                            w-6
                            rounded-full
                            bg-red-500
                            text-white
                            text-xs
                            flex
                            items-center
                            justify-center
                            font-semibold
                        "
                    >
                        {unreadCount}
                    </div>
                )}
            </button>

            {/* DROPDOWN */}
            {open && (
                <div
                    className="
                        absolute
                        right-0
                        mt-4
                        w-[420px]
                        bg-white
                        border
                        border-slate-200
                        rounded-3xl
                        shadow-2xl
                        z-50
                        overflow-hidden
                    "
                >
                    {/* HEADER */}
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">Notifications</h2>

                            <p className="text-slate-500 text-sm mt-1">
                                {unreadCount} unread
                            </p>
                        </div>

                        <button
                            onClick={handleReadAll}
                            className="
                                text-emerald-600
                                font-medium
                                text-sm
                            "
                        >
                            Mark all read
                        </button>
                    </div>

                    {/* BODY */}
                    <div className="max-h-[500px] overflow-y-auto">
                        {loading ? (
                            <div className="p-10 text-center">
                                <p className="text-slate-500">
                                    Loading notifications...
                                </p>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="p-10 text-center">
                                <p className="text-slate-500">
                                    No notifications
                                </p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`
                                            p-5
                                            border-b
                                            border-slate-100
                                            transition
                                            ${
                                                !notification.isRead
                                                    ? "bg-emerald-50"
                                                    : "bg-white"
                                            }
                                        `}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div
                                            className="flex-1 cursor-pointer"
                                            onClick={() =>
                                                handleRead(notification.id)
                                            }
                                        >
                                            <h3 className="font-semibold mb-2">
                                                {notification.title}
                                            </h3>

                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                {notification.message}
                                            </p>

                                            <p className="text-xs text-slate-400 mt-3">
                                                {new Date(
                                                    notification.createdAt,
                                                ).toLocaleString()}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleDelete(notification.id)
                                            }
                                            className="
                                                    text-red-500
                                                    hover:bg-red-50
                                                    p-2
                                                    rounded-xl
                                                "
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotificationBell;
