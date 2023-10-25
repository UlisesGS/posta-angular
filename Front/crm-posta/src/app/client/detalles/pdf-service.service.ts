import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/app/URL'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {
  private urlEndPoint:string=`${URL}/pdf`;
  

  constructor(private http:HttpClient) { }
  
 public generarInforme(id:number):Observable<Blob>{
  const httpOptions = {
    responseType: 'blob' as 'json', // Indicar el tipo de respuesta como Blob
  };
  return this.http.get<Blob>(`${this.urlEndPoint}/informe/${id}`, httpOptions)
 }
 public generarContacto(id:number):Observable<Blob>{
  const httpOptions = {
    responseType: 'blob' as 'json', // Indicar el tipo de respuesta como Blob
  };
  return this.http.get<Blob>(`${this.urlEndPoint}/generarPdf/${id}`, httpOptions)
 }
 public generarConceptos(id:number):Observable<Blob>{
  const httpOptions = {
    responseType: 'blob' as 'json', // Indicar el tipo de respuesta como Blob
  };
  return this.http.get<Blob>(`${this.urlEndPoint}/conceptos/${id}`, httpOptions)
 }
 public generarEstrategia(id:number):Observable<Blob>{
  const httpOptions = {
    responseType: 'blob' as 'json', // Indicar el tipo de respuesta como Blob
  };
  return this.http.get<Blob>(`${this.urlEndPoint}/estrategica/${id}`, httpOptions)
 }
 public generarProductividad(id:number):Observable<Blob>{
  const httpOptions = {
    responseType: 'blob' as 'json', // Indicar el tipo de respuesta como Blob
  };
  return this.http.get<Blob>(`${this.urlEndPoint}/productividad/${id}`, httpOptions)
 }
 public generarOperacional(id:number):Observable<Blob>{
  const httpOptions = {
    responseType: 'blob' as 'json', // Indicar el tipo de respuesta como Blob
  };
  return this.http.get<Blob>(`${this.urlEndPoint}/operacional/${id}`, httpOptions)
 }
 public generarCalidad(id:number):Observable<Blob>{
  const httpOptions = {
    responseType: 'blob' as 'json', // Indicar el tipo de respuesta como Blob
  };
  return this.http.get<Blob>(`${this.urlEndPoint}/calidad/${id}`, httpOptions)
 }
 public generarInnovacion(id:number):Observable<Blob>{
  const httpOptions = {
    responseType: 'blob' as 'json', // Indicar el tipo de respuesta como Blob
  };
  return this.http.get<Blob>(`${this.urlEndPoint}/innovacion/${id}`, httpOptions)
 }
 public generarFinanciera(id:number):Observable<Blob>{
  const httpOptions = {
    responseType: 'blob' as 'json', // Indicar el tipo de respuesta como Blob
  };
  return this.http.get<Blob>(`${this.urlEndPoint}/financiera/${id}`, httpOptions)
 }
 public generarLogistica(id:number):Observable<Blob>{
  const httpOptions = {
    responseType: 'blob' as 'json', // Indicar el tipo de respuesta como Blob
  };
  return this.http.get<Blob>(`${this.urlEndPoint}/logistica/${id}`, httpOptions)
 }
 public generarTransformacion(id:number):Observable<Blob>{
  const httpOptions = {
    responseType: 'blob' as 'json', // Indicar el tipo de respuesta como Blob
  };
  return this.http.get<Blob>(`${this.urlEndPoint}/transformacion/${id}`, httpOptions)
 }
 public generarAmbiental(id:number):Observable<Blob>{
  const httpOptions = {
    responseType: 'blob' as 'json', // Indicar el tipo de respuesta como Blob
  };
  return this.http.get<Blob>(`${this.urlEndPoint}/ambiental/${id}`, httpOptions)
 }
 public generarIntelectual(id:number):Observable<Blob>{
  const httpOptions = {
    responseType: 'blob' as 'json', // Indicar el tipo de respuesta como Blob
  };
  return this.http.get<Blob>(`${this.urlEndPoint}/intelectual/${id}`, httpOptions)
 }
 public generarDiagnostico(id:number):Observable<Blob>{//Esto es analisis economico
  const httpOptions = {
    responseType: 'blob' as 'json', // Indicar el tipo de respuesta como Blob
  };
  return this.http.get<Blob>(`${this.urlEndPoint}/diagnostico/${id}`, httpOptions)
 }

}
