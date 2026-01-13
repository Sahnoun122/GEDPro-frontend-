export type FieldType = 
 | "text"
 |"email"
 | "number"
 | "date"
 | "select"
 | "file";

 export interface Field{
    id : string;
    label : string;
    type : FieldType;
    required : boolean;
    options?: string[];
    order : number;
 }