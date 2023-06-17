import { Client } from "./client";

export class Businessman extends Client {
  contracting:string;
  companyName:string;
  fechaAlta:string;
  typeOfCompany:string;
  employeePartTime:number;
  employeeFullTime:number;
  registroMercantil:boolean;
  numberMercantilRegistry:string;
}
