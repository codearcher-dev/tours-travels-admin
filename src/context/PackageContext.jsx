import { createContext, useContext, useEffect, useState } from "react";
import { getAllPackages } from "../services/packages.services";
import { getDestinations } from "../services/destination.services";

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
    const [packages, setPackages] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = async () => {
        setLoading(true);
        setError(null);

        try {
            const packagesData = await getAllPackages();
            const destinationData = await getDestinations();
            console.log(destinationData);

            setPackages(packagesData.packages);
            setDestinations(destinationData.destinations);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch packages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return <PackageContext.Provider value={{ packages, destinations, loading, error, retry: fetch }}>{children}</PackageContext.Provider>;
};

export const usePackages = () => useContext(PackageContext);
