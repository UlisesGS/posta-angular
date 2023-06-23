import { Injectable } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario:Usuario = new Usuario()
  constructor() { }
  public isLogin():boolean{
    if (localStorage.getItem('usuario')){
      return true;
    }
    return false;

  }
  public saveLogin(usuario:Usuario){
    localStorage.setItem('usuario',JSON.stringify(usuario));
    Swal.fire('Correcto', 'Inicio Sesion correctamente','success');
  }
  public logaut(){
    localStorage.clear();

  }
  public devolverUsuario():Usuario{

    if(localStorage.getItem('usuario')){
     this.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      return this.usuario;
    }
    return null;
  }
}
