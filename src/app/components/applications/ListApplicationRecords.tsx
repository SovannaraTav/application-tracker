"use client"; // Client-side component
import React, { useState, useEffect } from "react";
import { getApplicationRecords, deleteApplicationRecord } from "@/app/services/firestoreService";
import UpdateApplicationRecord from "./UpdateApplicationRecord";
import { ApplicationRecordData } from "@/app/types/interfaces";
import { useAuth } from "../authentication/AuthContext";
import "../../styles/applicationRecordStyle.css";

const ListApplicationRecords: React.FC = () => {
    // State variables
    const { currentUser } = useAuth();
    const [applicationRecords, setApplicationRecords] = useState<ApplicationRecordData[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Fetches all application records and its associated data of the current user when the component mounts
    useEffect(() => {
        if (currentUser) {
            const fetchData = async () => {
                const data = await getApplicationRecords();
                setApplicationRecords(data);
            };
            fetchData();
        }
    }, [currentUser]);

    // Function to handle the deletion of an application record
    const handleDelete = async (id: string) => {
        const deletionConfirmed = window.confirm("Are you sure you want to delete this application record?");
        if (deletionConfirmed) {
            await deleteApplicationRecord(id);
            // Updates the applicationRecords state to remove the deleted application record from the array
            setApplicationRecords(applicationRecords.filter(app => app.id !== id));
        }
    }

    // Function to handle setting the ID of the application record being edited
    const handleEdit = (id: string) => {
        setEditingId(id);
    }

    return (
        <div className="container">
            {applicationRecords.map(app => (
                <div key={app.id} className="record">
                    {editingId === app.id ? (
                        // Renders this component if the application record and its associated data are being edited
                        <UpdateApplicationRecord id={app.id!} initialData={app} />
                    ) : (
                        // Renders the application record and its associated data if not being edited
                        <>
                            <div className="record-header">
                                <h3 className="record-title">{app.position} @ {app.company}</h3>
                                <div className="record-footer">
                                    <button className="edit-button" onClick={() => handleEdit(app.id!)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDelete(app.id!)}>Delete</button>
                                </div>
                            </div>
                            <div className="record-body">
                                <p><strong>Position Type:</strong> {app.positionType}</p>
                                <p><strong>Source</strong>: {app.source}</p>
                                <p><strong>Location</strong>: {app.location}</p>
                                <p><strong>Salary</strong>: {app.salary}</p>
                                <p><strong>Description:</strong> {app.description}</p>
                                <p><strong>Skills Required:</strong> {app.skillsRequired}</p>
                                <p><strong>Benefits:</strong> {app.benefits}</p>
                                <p><strong>Date Applied:</strong> {app.dateApplied}</p>
                                <p><strong>Application Deadline:</strong> {app.applicationDeadline}</p>
                                <p><strong>Application Status:</strong> {app.applicationStatus}</p>
                                <p><strong>Files:</strong></p>
                                {app.fileUrls && app.fileUrls.map((url, index) => (
                                    <div key={index}>
                                        <a href={url} target="_blank" rel="noopener noreferrer" className="file-link">View File {index + 1}</a>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ListApplicationRecords;