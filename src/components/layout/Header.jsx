import { useState } from "react";
import { Menu, Bell, User, Mail, Lock, KeyRound, Eye, EyeOff, X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { changePassword } from "../../services/auth.services";

export default function Header({ setIsOpen }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const { user } = useUser();

    // Password form state
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);

    const [notifications, setNotifications] = useState([
        { id: 1, message: "New enquiry from John Doe for Goa Holiday", isRead: false, time: "5m ago" },
        { id: 2, message: "New enquiry from Jane Smith for Kashmir Paradise", isRead: false, time: "1h ago" },
        { id: 3, message: "New feedback received for Kerala Trip", isRead: true, time: "2d ago" },
    ]);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const toggleNotifications = () => {
        if (!showNotifications) {
            setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
            setShowProfile(false);
        }
        setShowNotifications(!showNotifications);
    };

    const toggleProfile = () => {
        setShowNotifications(false);
        setShowProfile(!showProfile);
    };

    const openChangePassword = () => {
        setShowProfile(false);
        setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setPasswordError("");
        setPasswordSuccess("");
        setShowChangePassword(true);
    };

    const closeChangePassword = () => {
        setShowChangePassword(false);
        setPasswordError("");
        setPasswordSuccess("");
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm((prev) => ({ ...prev, [name]: value }));
        setPasswordError("");
        setPasswordSuccess("");
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = passwordForm;

        if (!oldPassword || !newPassword || !confirmPassword) {
            setPasswordError("All fields are required.");
            return;
        }
        if (newPassword.length < 6) {
            setPasswordError("New password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("New password and confirm password do not match.");
            return;
        }

        setPasswordLoading(true);
        setPasswordError("");
        try {
            await changePassword({ oldPassword, newPassword });
            setPasswordSuccess("Password changed successfully!");
            setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
            setTimeout(() => {
                setShowChangePassword(false);
            }, 2000);
        } catch (err) {
            setPasswordError(err.response?.data?.message || "Failed to change password. Please try again.");
        } finally {
            setPasswordLoading(false);
        }
    };

    const getInitial = () => {
        const name = user?.name || "Admin User";
        return name.charAt(0).toUpperCase();
    };

    return (
        <>
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
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                            )}
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

                    {/* Profile / Admin Name — clickable */}
                    <div className="relative ml-3">
                        <button
                            type="button"
                            onClick={toggleProfile}
                            className="flex items-center space-x-3 rounded-lg px-2 py-1 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                                {getInitial()}
                            </div>
                            <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name || "Admin User"}</span>
                        </button>

                        {/* Profile Settings Dropdown */}
                        {showProfile && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)}></div>
                                <div className="absolute right-0 z-50 mt-2 w-72 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
                                    {/* Avatar + name header */}
                                    <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
                                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-base flex-shrink-0">
                                            {getInitial()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || "Admin User"}</p>
                                            <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                                        </div>
                                    </div>

                                    {/* Info rows */}
                                    <div className="py-1">
                                        <div className="px-4 py-2 flex items-center gap-3">
                                            <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-400">Name</p>
                                                <p className="text-sm font-medium text-gray-800 truncate">{user?.name || "Admin User"}</p>
                                            </div>
                                        </div>
                                        <div className="px-4 py-2 flex items-center gap-3">
                                            <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-400">Email</p>
                                                <p className="text-sm font-medium text-gray-800 truncate">{user?.email || "—"}</p>
                                            </div>
                                        </div>
                                        <div className="px-4 py-2 flex items-center gap-3">
                                            <Lock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-400">Role</p>
                                                <p className="text-sm font-medium text-gray-800 capitalize">{user?.role || "Admin"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100" />

                                    {/* Change Password action */}
                                    <div className="py-1 rounded-b-xl">
                                        <button
                                            type="button"
                                            onClick={openChangePassword}
                                            className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <KeyRound className="h-4 w-4 text-primary-500" />
                                                <span>Change Password</span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Change Password Modal */}
            {showChangePassword && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeChangePassword} />

                    {/* Modal card */}
                    <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <KeyRound className="h-5 w-5 text-primary-600" />
                                <h2 className="text-base font-semibold text-gray-900">Change Password</h2>
                            </div>
                            <button
                                type="button"
                                onClick={closeChangePassword}
                                className="rounded-lg p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmitPassword} className="px-6 py-5 space-y-4">
                            {/* Current Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
                                <div className="relative">
                                    <input
                                        type={showOld ? "text" : "password"}
                                        name="oldPassword"
                                        value={passwordForm.oldPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter current password"
                                        className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowOld(!showOld)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showOld ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showNew ? "text" : "password"}
                                        name="newPassword"
                                        value={passwordForm.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter new password"
                                        className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm New Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        name="confirmPassword"
                                        value={passwordForm.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Re-enter new password"
                                        className={`w-full rounded-lg border px-3.5 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                                            passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword
                                                ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                                                : passwordForm.confirmPassword && passwordForm.newPassword === passwordForm.confirmPassword
                                                  ? "border-green-400 focus:border-green-400 focus:ring-green-400/20"
                                                  : "border-gray-300 focus:border-primary-500 focus:ring-primary-500/20"
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                                    <p className="mt-1 text-xs text-red-500">Passwords do not match.</p>
                                )}
                                {passwordForm.confirmPassword && passwordForm.newPassword === passwordForm.confirmPassword && (
                                    <p className="mt-1 text-xs text-green-500">Passwords match.</p>
                                )}
                            </div>

                            {/* Error / Success banners */}
                            {passwordError && (
                                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">{passwordError}</div>
                            )}
                            {passwordSuccess && (
                                <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-2.5 text-sm text-green-600">
                                    {passwordSuccess}
                                </div>
                            )}

                            {/* Action buttons */}
                            <div className="flex items-center gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={closeChangePassword}
                                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={passwordLoading}
                                    className="flex-1 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500">
                                    {passwordLoading ? "Updating..." : "Update Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
