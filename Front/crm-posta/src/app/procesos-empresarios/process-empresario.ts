import { Client } from "../client/client";
import { Usuario } from "../usuario/usuario";
import { DiagnosticoEmpresarial } from "./diagnostico-empresarial";
import { PlanDeAccion } from './plan-de-accion';


export class ProcessEmpresario {
id:number;
user:Usuario;
client:Client;
estado:string;
terminado:boolean;
fechaAlta:string;
diagnosticoEmpresarial:	DiagnosticoEmpresarial;
planDeAccion:PlanDeAccion;
informeDiagnostico:boolean;



}
