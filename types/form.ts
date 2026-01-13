import { Field } from "./field";

export interface Form {
    id: string;
    title : string;
    description? : string;
    isActive : boolean;
    fields : Field[];
    createdAt : string;
}