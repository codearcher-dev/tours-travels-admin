import { createContext, useContext, useEffect, useState } from "react";
import { getAllPackages } from "../services/packages.services";
import { getDestinations } from "../services/destination.services";
import { countEnquiries } from "../services/enquiry.services";

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
    const [packages, setPackages] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [pendingEnquiriesCount, setPendingEnquiriesCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const initializeData = async () => {
        setPackages([]);
        setDestinations([]);
        setPendingEnquiriesCount(0);
        setLoading(true);
        setError(null);

        try {
            const packagesData = await getAllPackages();
            const destinationData = await getDestinations();
            const pendingCount = await countEnquiries("pending");
            setPackages(packagesData.packages);
            setDestinations(destinationData.destinations);
            setPendingEnquiriesCount(pendingCount.count);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to initialize data packages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initializeData();
    }, []);

    return (
        <PackageContext.Provider
            value={{
                packages,
                setPackages,
                destinations,
                setDestinations,
                pendingCount: pendingEnquiriesCount,
                loading,
                error,
                retry: initializeData,
            }}>
            {children}
        </PackageContext.Provider>
    );
};

export const useData = () => useContext(PackageContext);
