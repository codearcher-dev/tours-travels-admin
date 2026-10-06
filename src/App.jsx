import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Capacitor } from "@capacitor/core";
import { useEffect } from "react";
import "./App.css";

// Layout
import Layout from "./components/layout/Layout";

// Auth
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Pages
import Home from "./pages/Home";
import PackagesList from "./pages/packages/PackagesList";
import PackageForm from "./pages/packages/PackageForm";
import DestinationsList from "./pages/destinations/DestinationsList";
import DestinationForm from "./pages/destinations/DestinationForm";
import FeedbacksList from "./pages/feedbacks/FeedbacksList";
import FeedbackLinkForm from "./pages/feedbacks/FeedbackLinkForm";
import EnquiriesList from "./pages/enquiries/EnquiriesList";
import Insights from "./pages/insights/Insights";
import Admins from "./pages/admins/Admins";
import { useUser } from "./context/UserContext";
import Spinner from "./components/ui/Spinner";
import { initPushNotifications, pendingRoute } from "./services/push-notification.services.js";
import useBackButton from "./hooks/native/useBackButton.jsx";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUser();
    if (loading) {
        return (
            <>
                <div className="flex h-screen w-full items-center justify-center text-sm text-gray-500">
                    <Spinner />
                </div>
            </>
        );
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
const PublicRoute = ({ children }) => {
    const { user, loading } = useUser();
    if (loading) {
        return (
            <>
                <div className="flex h-screen w-full items-center justify-center text-sm text-gray-500">
                    <Spinner />
                </div>
            </>
        );
    }
    if (user) {
        return <Navigate to="/" replace />;
    }
    return children;
};

function App() {
    const navigate = useNavigate();
    const { loading, user } = useUser();

    useBackButton();

    useEffect(() => {
        console.log("App mounted, initializing push notifications...");
        initPushNotifications();
    }, []);

    useEffect(() => {
        const handler = () => {
            if (!loading && user && pendingRoute.value) {
                console.log("Navigating to : ", pendingRoute.value);
                const r = pendingRoute.value;
                pendingRoute.value = null;
                navigate(r, { replace: true });
            }
        };

        handler(); // Call the handler immediately in case there's a pending route on mount
        window.addEventListener("push-navigate", handler);
        return () => {
            window.removeEventListener("push-navigate", handler);
        };
    }, [loading, user, navigate]);

    return (
        <>
            <Toaster position="top-right" />
            <Routes>
                {/* Public Routes */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/loading"
                    element={
                        <div className="flex h-screen w-full items-center justify-center text-sm text-gray-500">
                            <Spinner />
                        </div>
                    }
                />

                <Route
                    path="/forgot-password"
                    element={
                        <PublicRoute>
                            <ForgotPassword />
                        </PublicRoute>
                    }
                />

                {/* Protected Routes (Admin Layout) */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }>
                    <Route index element={<Home />} />

                    <Route path="packages">
                        <Route index element={<PackagesList />} />
                        <Route path="new" element={<PackageForm />} />
                        <Route path=":slug" element={<PackageForm />} />
                    </Route>

                    <Route path="destinations">
                        <Route index element={<DestinationsList />} />
                        <Route path="new" element={<DestinationForm />} />
                        <Route path=":id" element={<DestinationForm />} />
                    </Route>

                    <Route path="feedbacks">
                        <Route index element={<FeedbacksList />} />
                        <Route path="new" element={<FeedbackLinkForm />} />
                    </Route>

                    <Route path="enquiries" element={<EnquiriesList />} />

                    <Route path="insights" element={<Insights />} />

                    <Route path="admins" element={<Admins />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
