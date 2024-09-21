"use client" // Client-side component
import React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebaseConfig";

const SignOutButton: React.FC = () => {
    const router = useRouter();

    // Function to handle the process of the user signing out of their account
    const handleSignOut = async () => {
        try {
            // Attempts to sign out the user of their account
            await signOut(auth);    
            // Redirects the user to the landing page on success
            router.push("/");
        }
        catch (e) {
            // Handles any errors that occur during this process
            console.error("Error signing out.");
        }
    };

    return (
        <div>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default SignOutButton;