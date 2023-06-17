import { Municipio } from "../municipio/municipio";

export class Client{
    id:number;
    nit:string;
    name:string;
    lastName:string;
    edad:number;
    municipio:Municipio;
    phone:string;
    email:string;
    address:string;
    gender:[];
    studyLevel:[];
    ethnicGroup:[];
    victimPopulation:boolean;
    disability:boolean;
    displacement:boolean;
    remarks:string;
    active:boolean;
    type:string;
    regdate:Date;
    updatedate:Date;
  //  businessIdea:string;
  //  product:string;
    // municipio:Municipio;


}
