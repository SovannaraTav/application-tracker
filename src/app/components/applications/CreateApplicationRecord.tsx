"use client"; // Client-side component
import React, { useState } from "react";
import { createApplicationRecord } from "@/app/services/firestoreService";
import { ApplicationRecordData } from "@/app/types/interfaces";

const CreateApplicationRecord: React.FC = () => {
    // State variables
    const [formData, setFormData] = useState<ApplicationRecordData>({ position: "", location: "", salary: 0 });

    // Function to handle input changes that update the data in the form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle the form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Creates a new application record with the form data
        await createApplicationRecord(formData);
        // Clears out the form data and alerts the user on success
        setFormData({ position: "", location: "", salary: 0 });
        window.alert("Application record created successfully. Refresh page to see.")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="position" value={formData.position} onChange={handleChange} placeholder="Position" />
                <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
                <input name="salary" type="number" value={formData.salary} onChange={handleChange} placeholder="Salary" />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateApplicationRecord;