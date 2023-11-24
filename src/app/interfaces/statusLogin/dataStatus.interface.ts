import { User } from "../auth/user.interface";
import { Company } from "../selectors/company.interface";

export interface DataStatus {
    user:    User;
    company: Company;
}