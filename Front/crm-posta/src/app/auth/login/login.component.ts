import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/usuario/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  titulo:string='Login Usuario';
  usuario:Usuario = new Usuario;
  constructor(
    private usuarioService:UsuarioService,
    private authService:AuthService,
    private ruta:Router){}

  ngOnInit(): void {

  }
  public findByUsernameAndPassword(){
    
  }

}
