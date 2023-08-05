import { Usuario } from "../usuario/usuario";

export class Mensaje {
id:number;
asunto:string;
contenido:string;
remitente:Usuario;
destinatario:Usuario;
fehcaEnvio:Date;
}
