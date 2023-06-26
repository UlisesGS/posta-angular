import { Injectable, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  usuario:Usuario = new Usuario()
  constructor() { }
  ngOnInit(): void {
    this.isLogin()
  }
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
    localStorage.removeItem('usuario')

  }
  public devolverUsuario():Usuario{

    if(localStorage.getItem('usuario')){
     this.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      return this.usuario;
    }
    return null;
  }
  public rolAdmin ():boolean{
    if(localStorage.getItem('usuario')){
      this.usuario=JSON.parse(localStorage.getItem('usuario'))
      if(this.usuario.role=='ADMIN'){
        return true;
      }

    }
    return false;
  }
  public nameUsuario():string{
    if(localStorage.getItem('usuario')){
      this.usuario=JSON.parse(localStorage.getItem('usuario'))

        return this.usuario.name;
      }
return null;


  }
}
