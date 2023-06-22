import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Asesoria } from './asesoria';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }
  private urlEndPoint:string="http://localhost:8080/users";
  private httpHeader=new HttpHeaders({'Content-Type':'application/json'});

  /* TODOS LOS GET */
  public usuarioFindAll():Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}`);
  }

  public usuarioFindById(id:number):Observable<any >{
    return this.http.get<any>(`${this.urlEndPoint}/${id}`);
  }


  /* TODOS LOS SAVE */
  public usuarioSave(usuario:Usuario):Observable<any>{
    return this.http.post<any>(this.urlEndPoint,usuario);
  }

  public asesoriaSave(asesoria:Asesoria):Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/advisory`, asesoria);
  }


  /* TODOS LOS UPDATE */
  public usuarioUpdate(usuario:Usuario):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.id}`,usuario);
  }


  /* TODOS LOS DALETE */
  public usuarioDelete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }
}
