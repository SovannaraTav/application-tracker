import React from "react";
import SignOutButton from "../components/buttons/SignOutButton";
import CreateApplicationRecord from "../components/applications/CreateApplicationRecord";
import ListApplicationRecords from "../components/applications/ListApplicationRecords";

export default function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <CreateApplicationRecord />
            <ListApplicationRecords />
            <SignOutButton />
        </div>
    );
};