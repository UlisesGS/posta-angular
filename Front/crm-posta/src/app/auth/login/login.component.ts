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
  titulo: string = 'Login Usuario';
  usuario: Usuario = new Usuario;
  auth: Auth = new Auth()
  caducidad:boolean= false;
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private ruta: Router,
  /*  private datePipe: DatePipe*/) { }

  ngOnInit(): void {
    if(this.authService.isLogin()){
      this.ruta.navigate(['/main'])
    }
   //this.getFechaActual()
    
  }
 /* getFechaActual() {
    const today = new Date();
    const formattedDate = this.datePipe.transform(today, 'yyyy-MM-dd');
    console.log('Fecha actual:', formattedDate);
  }
*/
  public login() {
    if (this.auth.password == null || this.auth.email == null) {
      Swal.fire('Error: ', 'Usuario o contraseña vacio', 'error');
      return;
    }
    //traigo el us para guardarlo en login
    this.usuarioService.usuarioFindByEmail(this.auth.email).subscribe(data=>{
      this.usuario=data;
      
    })
    
    this.authService.login(this.auth).subscribe(response => {
      this.authService.saveLogin(this.usuario);//guardo us que se logueo
      this.authService.saveToken(response.token);//guardo token
    
      let us = this.authService.usuario;
      Swal.fire('Login: ', `hola ${us.name}`, 'success');
      this.ruta.navigate(['/main']);
    },err => {
      if(err.status == 401){
        Swal.fire('Error: ', 'Usuario o contraseña incorrecto', 'error');
      }
    })
  }


}
