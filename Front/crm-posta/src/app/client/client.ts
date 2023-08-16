import { Municipio } from "../municipio/municipio";
import { Canvas } from "../procesos/canvas";
import { Ciiu } from "./ciiu";
import { SelfAssessment } from './../procesos/selfAssessment';
import { Usuario } from "../usuario/usuario";

export class Client{

    id:number;
    selfAssessment:SelfAssessment
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
  contracting1:string;
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
  canvasModel:Canvas;
  user:Usuario;



}
