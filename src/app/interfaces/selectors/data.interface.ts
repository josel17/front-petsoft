import { Company } from "./company.interface";
import { DocumentType } from "./documentType.interface";
import { Gender } from "./gender.interface";
import { Status } from "./status.interface";

export interface Selectors {
    gender:       Gender[];
    status:       Status[];
    company:      Company[];
    documentType: DocumentType[];
}