import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/usuario/usuario';
import { Auth } from '../auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  titulo:string='Login Usuario';
  usuario:Usuario = new Usuario;
  auth:Auth = new Auth()
  constructor(
    private usuarioService:UsuarioService,
    private authService:AuthService,
    private ruta:Router){}

  ngOnInit(): void {

  }
  public findByUsernameAndPassword(){
   this.usuarioService.usuarioFindByEmail(this.auth.email).subscribe(data=>{
    this.usuario=data;
    if(this.usuario.password==this.auth.password){
      Swal.fire('Usuario: ', 'Usuario correcto', 'success');
      this.authService.saveLogin(this.usuario)
      this.ruta.navigate(['/main']);
    }else{
      Swal.fire('Error: ', 'Usuario o contraseña incorrecto', 'error');
    }
   },e=>{
    Swal.fire('Error: ', 'Usuario o contraseña incorrecto', 'error');
   })
  }

}
