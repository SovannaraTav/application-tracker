import React, { useState } from "react";
import { updateApplicationRecord } from "@/app/services/firestoreService";
import { uploadFile, deleteFile } from "@/app/services/storageService";
import { ApplicationRecordData } from "@/app/types/interfaces";

const UpdateApplicationRecord: React.FC<{ id: string, initialData: ApplicationRecordData}> = ({ id, initialData }) => {
    // State variables
    const [formData, setFormData] = useState<ApplicationRecordData>(initialData);
    const [files, setFiles] = useState<FileList | null>(null);

    // Function to handle input changes and update the form data
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle any file-related actions and update files data
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    };

    // Function to handle the deletion of a file
    const handleFileDelete = async (fileUrl: string) => {
        await deleteFile(fileUrl);
        // Updates form data to remove the deleted file URL from it
        setFormData({ ...formData, fileUrls: formData.fileUrls?.filter(url => url !== fileUrl) });
    };

    // Function to handle the form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Keeps track of existing and new file URLs
        const existingfileUrls: string[] = formData.fileURLs ?? [];
        const newFileUrls: string[] = [];
        if (files) {
            // Uploads each new file and obtains their URL
            for(let i = 0; i < files.length; i++) {
                const file = files[i];
                const url = await uploadFile(file, `applications/${file.name}`);
                newFileUrls.push(url);
            }
        }

        // Updates an existing application record and its associated data with the form and files data
        const updatedFileUrls = [...existingfileUrls, ...newFileUrls];
        await updateApplicationRecord(id, { ...formData, fileUrls: updatedFileUrls });
        // Alerts the user on success
        window.alert("Application record updated successfully. Refresh page to see changes.")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="position" value={formData.position} onChange={handleChange} placeholder="Position" />
                <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
                <input name="salary" type="number" value={formData.salary} onChange={handleChange} placeholder="Salary" />
                <input type="file" multiple onChange={handleFileChange} />
                {formData.fileUrls && formData.fileUrls.map((url, index) => (
                    <div key={index}>
                        <a href={url} target="_blank" rel="noopener noreferrer">View File {index + 1}</a>
                        <button type="button" onClick={() => handleFileDelete(url)}>Remove</button>
                    </div> 
                ))}
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateApplicationRecord;