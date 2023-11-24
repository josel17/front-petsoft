import { Menu } from "./menu.interfaces";
import { Role } from "./role.interface";

export interface User {
    role:            Role[];
    menu:            Menu[]
    email:           string;
    user_id:         number;
    full_name:       string;
    last_name_1:     string;
    last_name_2:     string;
    document_number: number;
}