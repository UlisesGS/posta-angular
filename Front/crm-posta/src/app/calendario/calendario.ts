import { Client } from "../client/client";
import { Usuario } from "../usuario/usuario";

export class Calendario {
    id: number;
    fecha: Date | null = null;
    
    titulo:string;
    contenido: string;
    usuario: Usuario;
    cliente: Client;
}
