import { Client } from "../client/client";
import { Usuario } from "../usuario/usuario";
import { DiagnosticoEmpresarial } from "./diagnostico-empresarial";

export class ProcessEmpresario {
id:number;
user:Usuario;
client:Client;
estado:string;
terminado:boolean;
fechaAlta:string;
diagnosticoEmpresarial:	DiagnosticoEmpresarial;
informeDiagnostico:boolean;
planDeAccion:string;
}
