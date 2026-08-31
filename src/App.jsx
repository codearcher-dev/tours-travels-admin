import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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

function App() {
    return (
        <>
            <Toaster position="top-right" />
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected Routes (Admin Layout) */}
                <Route path="/" element={<Layout />}>
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
