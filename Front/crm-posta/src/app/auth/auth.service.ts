import { Injectable, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './auth';
import { URL } from '../URL';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private _usuario: Usuario
  private _token: string;
  urlBase=URL;

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario
    } else if (this._usuario == null && localStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      return this._usuario
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token
    } else if (this._token == null && localStorage.getItem('token') != null) {
      this._token = localStorage.getItem('token');
      return this._token
    }
    return null;
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.isLogin()
  }

  public login(usuario: Auth): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/login`, usuario);
  }
  saveToken(accesToken: string) {
    this._token = accesToken;
    localStorage.setItem('token', this._token);
  }
  public saveLogin(usuario: Usuario) {
    this._usuario = usuario;
    console.log(this.usuario);
    
    localStorage.setItem('usuario', JSON.stringify(usuario));
    Swal.fire('Correcto', 'Inicio Sesion correctamente', 'success');
  }

  public isLogin(): boolean {
    if (localStorage.getItem('usuario')) {
      return true;
    }
    return false;
  }


  public logaut() {
    this._token=null;
    this._usuario=null;
    localStorage.clear()
    localStorage.removeItem('usuario')
  }

  //devolver us
  public devolverUsuario(): Usuario {
    if (localStorage.getItem('usuario')) {
      this._usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return null;
  }

  public rolAdmin(): boolean {
    if (localStorage.getItem('usuario')) {
      this._usuario = JSON.parse(localStorage.getItem('usuario'))
      if (this._usuario.role == 'ADMIN') {
        return true;
      }

    }
    return false;
  }

  public nameUsuario(): string {
    if (localStorage.getItem('usuario')) {
      this._usuario = JSON.parse(localStorage.getItem('usuario'))

      return this._usuario.name;
    }
    return null;
  }

  

}
