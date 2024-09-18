"use client"; // Client-side component
import React, { useState } from "react";
import { createApplicationRecord } from "@/app/services/firestoreService";
import { uploadFile } from "@/app/services/storageService";
import { ApplicationRecordData } from "@/app/types/interfaces";

const CreateApplicationRecord: React.FC = () => {
    // State variables
    const [formData, setFormData] = useState<ApplicationRecordData>({ position: "", location: "", salary: 0 });
    const [files, setFiles] = useState<FileList | null>(null);

    // Function to handle input changes and update the form data
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle any file-related actions and update files data
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    };

    // Function to handle the form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const fileUrls: string[] = [];
        if (files) {
            // Uploads each new file and obtains their URL
            for(let i = 0; i < files.length; i++) {
                const file = files[i];
                const url = await uploadFile(file, `applications/${file.name}`);
                fileUrls.push(url);
            }
        }

        // Creates a new application record with the form and files data
        await createApplicationRecord({ ...formData, fileUrls });
        // Clears out the form and files data and alerts the user on success
        setFormData({ position: "", location: "", salary: 0 });
        setFiles(null);
        window.alert("Application record created successfully. Refresh page to see changes.")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="position" value={formData.position} onChange={handleChange} placeholder="Position" />
                <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
                <input name="salary" type="number" value={formData.salary} onChange={handleChange} placeholder="Salary" />
                <input type="file" multiple onChange={handleFileChange} />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateApplicationRecord;