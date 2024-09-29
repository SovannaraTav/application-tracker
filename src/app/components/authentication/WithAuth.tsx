"use client"; // Client-side component
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import "../../styles/loadingStyle.css"

// Higher-order component to wrap another component with authentication check
const WithAuth = (WrappedComponent: React.FC) => {
    // Component to handle authentication logic
    const WithAuthComponent = (props: any) => {
        // Obtained the current user and loading status from AuthContext
        const { currentUser, loading } = useAuth();
        const router = useRouter();
        const [isLoading, setIsLoading] = useState(true);

        // Handles authentication state changes
        useEffect(() => {
            if (!loading) {
                if (!currentUser) {
                    // Redirects the user to the landing page if not authenticated
                    router.push("/");
                }
                else {
                    // Sets the loading state to false if the user is authenticated after 2 seconds
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 2000);
                }
            }
        }, [currentUser, loading, router]);

        // Displays a loading message while checking the authentication status of the user
        if (isLoading) {
            return (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading...</p>
                </div>
            );
        }

        // Renders the wrapped component with its props if the user is authenticated
        return <WrappedComponent {...props} />;
    };

    // Sets a display name for the higher-order component to allow better debugging
    WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return WithAuthComponent;
};

export default WithAuth;