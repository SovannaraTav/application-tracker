"use client"; // Client-side component
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthError, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } 
    from "firebase/auth";
import { auth } from "../../../../firebaseConfig";
import "../../styles/signInFormStyle.css";

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
                setError("An account with this email does not exist or invalid credentials provided. Please try again.");
            }
            else if (error.code === "auth/popup-closed-by-user") {
                setError("Google popup window sign in error. Please try again.");
            }
            else {
                setError("Sign in error. Please try again.");
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
        <div className="flex">
            <div className="info-container">
                <h1 className="info-container-heading">Application Record Tracker</h1>
                <ol className="info-container-list">
                    <li className="info-container-item">A simple website application tool to create, view, edit, and delete application records for keeping track of jobs and internships you've applied to.</li>
                    <li className="info-container-item">Record and keep track of information associated with each job and internship you've applied to such as position, location, salary, and many more.</li>
                    <li className="info-container-item">Upload, view, and remove files and images associated with each job and internship you've applied to.</li>
                </ol>
            </div>

            <div className="signin-form-outer-container">
                <form className="signin-form-inner-container" onSubmit={handleSignIn}>
                    <div>
                        <label className="signin-form-label" htmlFor="email">Email:</label>
                        <input
                            className="signin-form-input"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="signin-form-label" htmlFor="password">Password:</label>
                        <input
                            className="signin-form-input"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/*Displays error message if any occur */}
                    {error && <p className="signin-form-error">{error}</p>}

                    <button className="signin-form-button-1" type="submit">Sign In</button>

                    <div>
                        <button className="signin-form-button-2" onClick={handleGoogleSignIn}>Sign In with Google</button>
                    </div>

                    <div>
                        <button className="signin-form-button-2" onClick={handleRedirectToSignUp}>Create New Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInForm;