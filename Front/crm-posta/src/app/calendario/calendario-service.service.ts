import { Injectable } from '@angular/core';
import { URL } from '../URL';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calendario } from './calendario';

@Injectable({
  providedIn: 'root'
})
export class CalendarioServiceService {
  urlBack= URL+'/calendario'
  constructor(private http:HttpClient) { }

  crearEvento(calendario:Calendario):Observable<Calendario>{
    return this.http.post<Calendario>(`${this.urlBack}/save`, calendario);
  }

  getAllCalendariosByUserId(id: number): Observable<Calendario[]> {
    return this.http.get<Calendario[]>(`${this.urlBack}/porUsuario/${id}`);
  }
  
  actualizarEvento(evento: Calendario): Observable<Calendario> {
    const url = `${this.urlBack}/update/${evento.id}`;
    return this.http.put<Calendario>(url, evento);
  }
}
