import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";

const useBackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!Capacitor.isNativePlatform()) {
            return;
        }

        const backListener = App.addListener("backButton", ({ canGoBack }) => {
            if (location.pathname === "/") {
                App.exitApp();
            } else {
                navigate(-1);
            }
        });

        return () => {
            backListener.then((handler) => handler.remove());
        };
    }, [location, navigate]);
};

export default useBackButton;
