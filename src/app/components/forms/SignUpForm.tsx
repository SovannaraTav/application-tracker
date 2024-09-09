"use client"; // Client-side component
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebaseConfig";

const SignUpForm: React.FC = () => {
    // State variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Function to handle the process of the user creating a new account with an email and password
    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // Attempts to create a new account for the user with their provided email and password
            await createUserWithEmailAndPassword(auth, email, password);
            // Clears out state variables and redirects the user to a different page on success
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setError(null);
            router.push("/");
        }
        catch (e) {
            // Handles any authentication errors that occur during this process
            const error = e as AuthError;
            if (error.code === "auth/email-already-in-use") {
                setError("An account with this email already exists.");
            }
            else if (error.code === "auth/weak-password") {
                setError("Invalid password. Must contain at least 6 characters.");
            }
            else {
                setError(error.message);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {/*Displays error message if any occur */}
                {error && <p>{error}</p>}

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;