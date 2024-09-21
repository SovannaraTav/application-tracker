"use client"; // Client-side component
import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../../../firebaseConfig";
import { AuthContextProps } from "@/app/types/interfaces";

// Assigns an authentication context with default values
const AuthContext = createContext<AuthContextProps>({ currentUser: null, loading: true });

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Provides authentication state to its children
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State variables
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Handles authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);
    
    return (
        // Provides the current user and loading status to the context
        <AuthContext.Provider value={{ currentUser, loading }}>{children}</AuthContext.Provider>
    );
};