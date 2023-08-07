import { Municipio } from "../municipio/municipio";
import { Canvas } from "../procesos/canvas";
import { Ciiu } from "./ciiu";
import { SelfAssessment } from './../procesos/selfAssessment';
<<<<<<< HEAD
import { Usuario } from 'src/app/usuario/usuario';
=======
import { Usuario } from "../usuario/usuario";
>>>>>>> 3a1a895a1cd06bb4f63c5910a1b91f242570f73c

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
