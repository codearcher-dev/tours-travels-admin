import { createContext, useContext, useEffect, useState } from "react";
import { getAllPackages } from "../services/packages.services";
import { getDestinations } from "../services/destination.services";
import { countEnquiries } from "../services/enquiry.services";
import { getUser } from "../services/auth.services";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getUser();
            console.log("data : ", data);
            setUser(data.user);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch user data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return <UserContext.Provider value={{ user, setUser, loading, error }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
