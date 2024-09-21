import { doc, collection, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import { ApplicationRecordData } from "../types/interfaces";

/*
Function to handle the process of creating a new application record and adding its associated 
data to Cloud Firestore
*/
export const createApplicationRecord = async (data: ApplicationRecordData) => {
    try {
        // Obtained the currently authenticated user
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not authenticated.");
        }
        
        // Reference to the user's applications collection in Cloud Firestore
        const userCollection = collection(db, `users/${user.uid}/applications`);

        // Adds the new document with its associated data to the collection and returns its ID
        const docRef = await addDoc(userCollection, data);
        return docRef.id;
    }
    catch (error) {
        // Logs any errors that occur during this process
        console.error("Error adding document: ", error);
    }
};

/*
Function to handle the process of retrieving all application records and its associated data 
from Cloud Firestore
*/
export const getApplicationRecords = async (): Promise<ApplicationRecordData[]> => {
    try {
        // Obtained the currently authenticated user
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not authenticated.");
        }

        // Reference to the user's applications collection in Cloud Firestore
        const userCollection = collection(db, `users/${user.uid}/applications`);

        // Retrieves all documents and its associated data from the collection
        const querySnapshot = await getDocs(userCollection);
        // Maps the documents to an array of ApplicationRecordData objects
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ApplicationRecordData[];
    }
    catch (error) {
        // Logs any errors that occur during this process and returns an empty array
        console.error("Error getting documents: ", error);
        return [];
    }
}

/*
Function to handle the process of updating the data associated with an existing application 
record stored in Cloud Firestore
*/
export const updateApplicationRecord = async (id: string, data: ApplicationRecordData) => {
    try {
        // Obtained the currently authenticated user
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not authenticated.");
        }

        // Reference to the desired document to update in the user's applications collection in Cloud Firestore
        const docRef = doc(db, `users/${user.uid}/applications`, id);
        // Updates the associated data of the desired document
        await updateDoc(docRef, data);
    }
    catch (error) {
        // Logs any errors that occur during this process
        console.error("Error updating document: ", error);
    }
};

/*
Function to handle the process of deleting the data associated with an existing application 
record stored in Cloud Firestore
*/
export const deleteApplicationRecord = async (id: string) => {
    try {
        // Obtained the currently authenticated user
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not authenticated.");
        }

        // Reference to the desired document to delete in the user's applications collection in Cloud Firestore
        const docRef = doc(db, `users/${user.uid}/applications`, id);
        // Deletes the associated data of the desired document
        await deleteDoc(docRef);
    }
    catch (error) {
        // Logs any errors that occur during this process
        console.error("Error deleting document: ", error);
    }
};