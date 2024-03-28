import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mensaje } from './mensaje';
import { Observable } from 'rxjs';
import { URL } from '../URL';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  apiUrl:string=URL+'/mensaje'
  constructor(private http:HttpClient) { }
  crearMensaje(mensaje: Mensaje): Observable<Mensaje> {
    const url = `${this.apiUrl}/save`;
    return this.http.post<Mensaje>(url, mensaje);
  }
  getMensajesByUser(userId: number): Observable<Mensaje[]> {
    const url = `${this.apiUrl}/porUser/${userId}`;
    return this.http.get<Mensaje[]>(url);
  }

  leido(id:number):Observable<void>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
