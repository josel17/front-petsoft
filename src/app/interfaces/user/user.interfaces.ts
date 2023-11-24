import { Company } from "./company.interfaces";
import { DocumentType } from "./documentType.interface";
import { Gender } from "./gender.interface";
import { Status } from "./status.interfaces";

export interface DataUser {
    id:              number;
    email:           string;
    gender:          Gender;
    status:          Status;
    company:         Company;
    fullName:       string;
    lastName1:     string;
    lastName2:     string;
    phoneNumber:    null;
    dateRegister:   Date;
    documentType:   DocumentType;
    documentNumber: number;
}
