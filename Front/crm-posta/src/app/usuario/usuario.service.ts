import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }
  private urlEndPoint:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080/users"
  //private urlEndPoint:string="http://localhost:8080/users";
  private httpHeader=new HttpHeaders({'Content-Type':'application/json'});
  public usuarioFindAll():Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}`);
  }
  public usuarioFindById(id:number):Observable<any >{
    return this.http.get<any>(`${this.urlEndPoint}/${id}`);
  }
  public usuarioSave(usuario:Usuario):Observable<any>{
    return this.http.post<any>(this.urlEndPoint,usuario);
  }
  public usuarioUpdate(usuario:Usuario):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.id}`,usuario)
  }
  public usuarioDelete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }
}
