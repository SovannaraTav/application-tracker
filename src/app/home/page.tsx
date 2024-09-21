"use client"
import React from "react";
import SignOutButton from "../components/buttons/SignOutButton";
import CreateApplicationRecord from "../components/applications/CreateApplicationRecord";
import ListApplicationRecords from "../components/applications/ListApplicationRecords";
import WithAuth from "../components/authentication/WithAuth";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <CreateApplicationRecord />
            <ListApplicationRecords />
            <SignOutButton />
        </div>
    );
};

export default WithAuth(Home);