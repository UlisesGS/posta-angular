import { Client } from "../client/client";
import { Usuario } from "./usuario";

export class Asesoria {
    id:number;
    client:Client;
    advisory:string;
    user:Usuario;
    regdate:Date;

}
