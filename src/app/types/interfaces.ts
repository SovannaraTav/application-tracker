export interface ApplicationRecordData {
    id?: string;
    position: string;
    location: string;
    salary: number;
    // Index signature to ensure this interface is compatible with Cloud Firestore's expected type
    [key: string]: any;
}