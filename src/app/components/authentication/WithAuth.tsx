"use client"; // Client-side component
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

// Higher-order component to wrap another component with authentication check
const WithAuth = (WrappedComponent: React.FC) => {
    return (props: any) => {
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
                    // Sets the loading state to false if the user is authenticated
                    setIsLoading(false);
                }
            }
        }, [currentUser, loading, router]);

        // Displays a loading message while checking the authentication status of the user
        if (isLoading) {
            return <div>Loading...</div>;
        }

        // Renders the wrapped component with its props if the user is authenticated
        return <WrappedComponent {...props} />;
    };
};

export default WithAuth;