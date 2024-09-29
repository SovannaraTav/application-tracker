"use client"; // Client-side component
import React, { useState } from "react";
import { createApplicationRecord } from "@/app/services/firestoreService";
import { uploadFile } from "@/app/services/storageService";
import { ApplicationRecordData } from "@/app/types/interfaces";
import "../../styles/applicationRecordStyle.css";

const CreateApplicationRecord: React.FC = () => {
    // State variables
    const [formData, setFormData] = useState<ApplicationRecordData>(
        { position: "", positionType: "", company: "", source: "", location: "", salary: 0 });
    const [files, setFiles] = useState<FileList | null>(null);

    // Function to handle input changes and update the form data
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        setFormData({ position: "", positionType: "", company: "", source: "", location: "", salary: 0 });
        setFiles(null);
        window.alert("Application record created successfully. Refresh page to see changes.")
    }

    return (
        <div className="container">
            <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                    <label className="form-label" htmlFor="position">Position</label>
                    <input className="form-input" name="position" value={formData.position} onChange={handleChange} placeholder="Position" required />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="positionType">Position Type</label>
                    <input className="form-input" name="positionType" value={formData.positionType} onChange={handleChange} placeholder="Position Type" required />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="company">Company</label>
                    <input className="form-input" name="company" value={formData.company} onChange={handleChange} placeholder="Company" required />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="source">Source</label>
                    <input className="form-input" name="source" value={formData.source} onChange={handleChange} placeholder="Source" required />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="location">Location</label>
                    <input className="form-input" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="salary">Salary</label>
                    <input className="form-input" name="salary" type="number" value={formData.salary} onChange={handleChange} placeholder="Salary" />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="description">Description</label>
                    <textarea className="form-textarea" name="description" value={formData.description || ""} onChange={handleChange} placeholder="Description"></textarea>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="skillsRequired">Skills Required</label>
                    <textarea className="form-textarea" name="skillsRequired" value={formData.skillsRequired || ""} onChange={handleChange} placeholder="Skills Required"></textarea>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="benefits">Benefits</label>
                    <textarea className="form-textarea" name="benefits" value={formData.benefits || ""} onChange={handleChange} placeholder="Benefits"></textarea>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="dateApplied">Date Applied</label>
                    <input className="form-input" name="dateApplied" type="date" value={formData.dateApplied || ""} onChange={handleChange} placeholder="Date Applied" />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="applicationDeadline">Application Deadline</label>
                    <input className="form-input" name="applicationDeadline" type="date" value={formData.applicationDeadline || ""} onChange={handleChange} placeholder="Application Deadline" required />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="applicationStatus">Application Status</label>
                    <input className="form-input" name="applicationStatus" value={formData.applicationStatus || ""} onChange={handleChange} placeholder="Application Status" required />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="files">Files</label>
                    <input className="form-input" type="file" multiple onChange={handleFileChange} />
                </div>
                
                <button className="form-button" type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateApplicationRecord;