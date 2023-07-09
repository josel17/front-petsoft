import { Brand } from "./brand.interfaces";

export interface Company {
    id:    number;
    name:  string;
    brand: Brand[];
}
