import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Canvas } from './canvas';
import { Process } from './Process';



@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  //private urlEndPoint:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080/canvas"
  private urlEndPoint:string="http://localhost:8080/canvas";
   //private urlEndPoint:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080/process"
   private urlProcesos:string="http://localhost:8080/process";
  constructor(private http:HttpClient) { }
// procesos
  public procesosFindAll():Observable<any>{
    return this.http.get<any>(`${this.urlProcesos}`);
  }
  public procesosFindById(id:number):Observable<any>{
    return this.http.get<any>(`${this.urlProcesos}/${id}`);
  }
  public procesosSave(proceso:Process):Observable<any>{
    return this.http.post<any>(`${this.urlProcesos}`,proceso);
  }
  public procesosUpdate(proceso:Process):Observable<any>{
    return this.http.put<any>(`${this.urlProcesos}/${proceso.id}`,proceso);
  }
   // canvas model
  public canvasFindById(id:number):Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/buscar/${id}`);
  }
  public canvasSave(canvas:Canvas):Observable<any>{
    console.log("desde el canvasSave"+canvas);

    return this.http.post<any>(`${this.urlEndPoint}/save`,canvas);
  }


  }
