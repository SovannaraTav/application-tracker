"use client"; // Client-side component
import React, { useState, useEffect } from "react";
import { getApplicationRecords, deleteApplicationRecord } from "@/app/services/firestoreService";
import UpdateApplicationRecord from "./UpdateApplicationRecord";
import { ApplicationRecordData } from "@/app/types/interfaces";

const ListApplicationRecords: React.FC = () => {
    // State variables
    const [applicationRecords, setApplicationRecords] = useState<ApplicationRecordData[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Fetches all application records and its associated data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            const data = await getApplicationRecords();
            setApplicationRecords(data);
        };
        fetchData();
    }, []);

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
        <div>
            {applicationRecords.map(app => (
                <div key={app.id}>
                    {editingId === app.id ? (
                        // Renders this component if the application record and its associated data are being edited
                        <UpdateApplicationRecord id={app.id!} initialData={app} />
                    ) : (
                        // Renders the application record and its associated data if not being edited
                        <>
                            <h3>Position: {app.position}</h3>
                            <p>Location: {app.location}</p>
                            <p>Salary: {app.salary}</p>
                            
                            <p>Files:</p>
                            {app.fileUrls && app.fileUrls.map((url, index) => (
                               <div key={index}>
                                <a href={url} target="_blank" rel="noopener noreferrer">View File {index + 1}</a>
                               </div> 
                            ))}

                            <button onClick={() => handleEdit(app.id!)}>Edit</button>
                            <button onClick={() => handleDelete(app.id!)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ListApplicationRecords;