import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  //private urlEndPoint:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080/clients"
  private urlEndPoint:string="http://localhost:8080/canvas";
  constructor(private http:HttpClient) { }
  // canvas model
  public procesosFindAll():Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}`);
  }
  public canvasFindById(id:number):Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/buscar/${id}`);
  }
  
  }
