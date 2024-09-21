"use client"; // Client-side component
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthError, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } 
    from "firebase/auth";
import { auth } from "../../../../firebaseConfig";

const SignInForm: React.FC = () => {
    // State variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Function to handle the first method of signing in with an email and password
    const handleSignIn = async (event : React.FormEvent) => {
        event.preventDefault();
        try {
            // Attempts to sign in the user with their provided email and password
            await signInWithEmailAndPassword(auth, email, password);
            // Clears out state variables and redirects the user to the home page on success
            setEmail("");
            setPassword("");
            setError(null);
            router.push("/home");
        }
        catch (e) {
            // Handles any authentication errors for this first method of signing in
            const error = e as AuthError;
            if (error.code === "auth/invalid-credential") {
                setError("An account with this email does not exist or invalid credentials provided.");
            }
            else {
                setError(error.message);
            }
        }
    };

    // Function to handle the second method of signing in with a Google account
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            // Attempts to sign in the user with their Google account
            await signInWithPopup(auth, provider);
            // Redirects the user to the home page on success
            router.push("/home");
        }
        catch (e) {
            // Handles any authentication errors for this second method of signing in
            const error = e as AuthError;
            setError(error.message);
        }
    };

    // Function to redirect the user to the sign up page if they don't have account beforehand
    const handleRedirectToSignUp = () => {
        router.push("/signup");
    }

    return (
        <div>
            <form onSubmit={handleSignIn}>
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

                {/*Displays error message if any occur */}
                {error && <p>{error}</p>}

                <button type="submit">Sign In</button>
            </form>

            <div>
                <button onClick={handleGoogleSignIn}>Sign In with Google</button>
            </div>
            
            <div>
                <button onClick={handleRedirectToSignUp}>Create New Account</button>
            </div>
        </div>
    );
};

export default SignInForm;