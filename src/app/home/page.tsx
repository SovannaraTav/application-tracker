"use client"
import React from "react";
import SignOutButton from "../components/buttons/SignOutButton";
import CreateApplicationRecord from "../components/applications/CreateApplicationRecord";
import ListApplicationRecords from "../components/applications/ListApplicationRecords";
import WithAuth from "../components/authentication/WithAuth";

const Home: React.FC = () => {
    return (
        <div>
            <SignOutButton />
            <CreateApplicationRecord />
            <ListApplicationRecords />
        </div>
    );
};

export default WithAuth(Home);