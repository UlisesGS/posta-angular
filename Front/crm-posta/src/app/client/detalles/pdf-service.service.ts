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
}
