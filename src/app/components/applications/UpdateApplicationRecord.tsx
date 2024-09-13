import React, { useState } from "react";
import { updateApplicationRecord } from "@/app/services/firestoreService";
import { ApplicationRecordData } from "@/app/types/interfaces";

const UpdateApplicationRecord: React.FC<{ id: string, initialData: ApplicationRecordData}> = ({ id, initialData }) => {
    // State variables
    const [formData, setFormData] = useState<ApplicationRecordData>(initialData);

    // Function to handle input changes that update the data in the form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle the form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Updates an existing application record and its associated data with the form data
        await updateApplicationRecord(id, formData);
        // Alerts the user on success
        window.alert("Application record updated successfully. Refresh page to see.")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="position" value={formData.position} onChange={handleChange} placeholder="Position" />
                <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
                <input name="salary" type="number" value={formData.salary} onChange={handleChange} placeholder="Salary" />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateApplicationRecord;