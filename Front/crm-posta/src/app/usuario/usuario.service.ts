import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Usuario } from './usuario';
import { Asesoria } from './asesoria';
import { ModalService } from '../client/modal.service';
import { URL } from './../URL';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements OnInit{

  constructor(private http:HttpClient,
    private modalService:ModalService) { }


 // private urlEndPoint:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080/users";
  private urlEndPoint:string=`${URL}/users`;


  private httpHeader=new HttpHeaders({'Content-Type':'application/json'});

  ngOnInit(): void {

  } 


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
  public usuarioFindByEmail(email:string):Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/byEmail/${email}`)
  }
  public usuarioGetAsesorias(usuario:Usuario):Observable<Asesoria[]>{
    return this.http.get<Asesoria[]>(`${this.urlEndPoint}/byAdvisory/${0}?user_id=${usuario.id}`)
  }
}


