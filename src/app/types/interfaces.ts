import { User } from "firebase/auth";

export interface ApplicationRecordData {
    id?: string;
    position: string;
    positionType: string; // Full-time, part-time, contract, internship, etc.
    company: string;
    source: string; // LinkedIn, Indeed, etc.
    location: string;
    salary: number;
    description?: string;
    skillsRequired?: string;
    benefits?: string;
    dateApplied?: string; // Store date in ISO format
    applicationDeadline?: string; // Store date in ISO format
    applicationStatus?: string;
    fileUrls?: string[];
    // Index signature to ensure this interface is compatible with Cloud Firestore's expected type
    [key: string]: any;
}

export interface AuthContextProps {
    currentUser: User | null;
    loading: boolean;
}