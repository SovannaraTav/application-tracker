import { User } from "firebase/auth";

export interface ApplicationRecordData {
    id?: string;
    position: string;
    location: string;
    salary: number;
    fileUrls?: string[];
    // Index signature to ensure this interface is compatible with Cloud Firestore's expected type
    [key: string]: any;
}

export interface AuthContextProps {
    currentUser: User | null;
    loading: boolean;
}