import { Role } from "./role.interfaces";

export interface User {
    role:            Role[];
    email:           string;
    user_id:         number;
    first_name:      string;
    last_name_1:     string;
    last_name_2:     string;
    sencond_name:    string;
    document_number: number;
}
