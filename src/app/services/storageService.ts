import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, storage } from "../../../firebaseConfig";

// Function to handle the process of uploading a file to Cloud Storage
export const uploadFile = async (file: File, path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Obtained the currently authenticated user
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not authenticated.");
        }

        // Creates a reference to the file location in Cloud Storage
        const storageRef = ref(storage, `users/${user.uid}/${path}`);
        // Starts the file upload process
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Monitors the file upload process
        uploadTask.on("state_changed", 
            (snapshot) => {
                // Any progress handling to be added if needed
            },
            (error) => {
                // Handles any errors that occur during this process
                reject(error);
            },
            () => {
                // Once the file upload process is completed, obtain the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};

// Function to handle the process of deleting a file from Cloud Storage
export const deleteFile = async (fileUrl: string) => {
    // Obtained the currently authenticated user
    const user = auth.currentUser;
    if (!user) {
        throw new Error("User not authenticated.");
    }

    // Creates a reference to the file location in Cloud Storage
    const fileRef = ref(storage, fileUrl);
    // Deletes the corresponding file from Cloud Storage
    await deleteObject(fileRef);
}