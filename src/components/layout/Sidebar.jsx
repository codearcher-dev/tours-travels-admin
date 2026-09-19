import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, MapPin, MessageSquare, Mail, Users, LogOut, LineChart } from "lucide-react";
import clsx from "clsx";
import { logout } from "../../services/auth.services";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";

const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Packages", path: "/packages", icon: Package },
    { name: "Destinations", path: "/destinations", icon: MapPin },
    { name: "Feedbacks", path: "/feedbacks", icon: MessageSquare },
    { name: "Enquiries", path: "/enquiries", icon: Mail },
    { name: "Insights", path: "/insights", icon: LineChart },
    { name: "Admins", path: "/admins", icon: Users },
];

export default function Sidebar({ isOpen, setIsOpen }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            const data = await logout();
            toast.success(data.message);
            setUser(null);
            navigate("/login");
        } catch (error) {
            toast.error("Failed to logout");
        }
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden" onClick={() => setIsOpen(false)} />}

            {/* Sidebar */}
            <div
                className={clsx(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                )}>
                <div className="flex h-16 flex-shrink-0 items-center justify-center px-4 border-b border-gray-200">
                    <img className="h-10 w-auto" src="/logo.png" alt="Prime Traveller" />
                </div>

                <div className="flex flex-1 flex-col overflow-y-auto">
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={clsx(
                                        isActive ? "bg-primary-50 text-primary-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                        "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                                    )}>
                                    <Icon
                                        className={clsx(
                                            isActive ? "text-primary-600" : "text-gray-400 group-hover:text-gray-500",
                                            "mr-3 h-5 w-5 flex-shrink-0",
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="border-t border-gray-200 p-4">
                    <button
                        onClick={handleLogout}
                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700">
                        <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-red-500 group-hover:text-red-600" aria-hidden="true" />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}
