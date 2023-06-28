import { Municipio } from "../municipio/municipio";
import { Ciiu } from "./ciiu";

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
    gender:string[];
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
//Atributos Emprendedor
    businessIdea:string;
    product:string;
//Atributos Empresario
  contracting:string;
  companyName:string;
  fechaAlta:string;
  typeOfCompany:string;
  employeePartTime:number;
  employeeFullTime:number;
  registroMercantil:boolean;
  numberMercantilRegistry:string;
  ciiu:Ciiu;
  //Atributos edad
  fechaNacimiento:Date;
  
  


}
