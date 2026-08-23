import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout
import Layout from './components/layout/Layout';

// Auth
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';

// Pages
import Home from './pages/Home';
import PackagesList from './pages/packages/PackagesList';
import PackageForm from './pages/packages/PackageForm';
import DestinationsList from './pages/destinations/DestinationsList';
import DestinationForm from './pages/destinations/DestinationForm';
import FeedbacksList from './pages/feedbacks/FeedbacksList';
import FeedbackLinkForm from './pages/feedbacks/FeedbackLinkForm';
import EnquiriesList from './pages/enquiries/EnquiriesList';
import Admins from './pages/admins/Admins';

function App() {
  return (
    <BrowserRouter>
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
            <Route path=":id" element={<PackageForm />} />
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
          
          <Route path="admins" element={<Admins />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
