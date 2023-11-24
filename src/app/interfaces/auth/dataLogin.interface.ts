import { Menu } from "./menu.interfaces";
import { User } from "./user.interface";

export interface DataLogin {
    token: string;
    user:  User;
    menu:  Menu[];
}