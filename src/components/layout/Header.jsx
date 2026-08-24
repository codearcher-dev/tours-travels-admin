import { useState } from "react";
import { Menu, Bell } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ setIsOpen }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, message: "New enquiry from John Doe for Goa Holiday", isRead: false, time: "5m ago" },
        { id: 2, message: "New enquiry from Jane Smith for Kashmir Paradise", isRead: false, time: "1h ago" },
        { id: 3, message: "New feedback received for Kerala Trip", isRead: true, time: "2d ago" },
    ]);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const toggleNotifications = () => {
        if (!showNotifications) {
            // Mark all as read when opening
            setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        }
        setShowNotifications(!showNotifications);
    };

    return (
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8 relative z-30 select-none">
            <div className="flex flex-1 items-center">
                <button
                    type="button"
                    className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
                    onClick={() => setIsOpen(true)}>
                    <span className="sr-only">Open sidebar</span>
                    <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
                {/* <img className="h-8 w-auto" src="/logo.png" alt="Prime Traveller" /> */}
                <div>
                    <h3 className="text-lg uppercase font-bold font-mono -mb-2">Prime Traveller</h3>
                    <p className="text-xs text-primary-600">Admin panel</p>
                </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
                {/* Notification Bell */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={toggleNotifications}
                        className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                        <span className="sr-only">View notifications</span>
                        <Bell className="h-6 w-6" aria-hidden="true" />
                        {unreadCount > 0 && <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />}
                    </button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                            <div className="absolute right-0 z-50 mt-2 w-68 sm:w-80 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
                                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                                    {unreadCount > 0 && (
                                        <span className="inline-flex items-center rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-600/20">
                                            {unreadCount} New
                                        </span>
                                    )}
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        <div className="divide-y divide-gray-100">
                                            {notifications.map((notif) => (
                                                <div
                                                    key={notif.id}
                                                    className={`p-4 hover:bg-gray-50 transition-colors ${!notif.isRead ? "bg-blue-50/50" : ""}`}>
                                                    <div className="flex items-start gap-3">
                                                        <div
                                                            className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${!notif.isRead ? "bg-primary-500" : "bg-gray-300"}`}></div>
                                                        <div className="flex-1">
                                                            <p
                                                                className={`text-sm ${!notif.isRead ? "text-gray-900 font-semibold" : "text-gray-600"}`}>
                                                                {notif.message}
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-6 text-center text-sm text-gray-500">No notifications right now.</div>
                                    )}
                                </div>
                                <div className="border-t border-gray-100 p-2 bg-gray-50/50 rounded-b-xl text-center">
                                    <Link
                                        to="/enquiries"
                                        onClick={() => setShowNotifications(false)}
                                        className="text-xs font-semibold text-primary-600 hover:text-primary-700">
                                        View all enquiries
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Profile dropdown */}
                <div className="relative ml-3">
                    <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">A</div>
                        <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin User</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
