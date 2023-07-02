import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Canvas } from './canvas';
import { Process } from './Process';
import { CustomerSegments } from './CustomerSegments';
import { ValuePropositions } from './ValuePropositions';
import { Channels } from './Channels';



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
public procesosFindAllUltimo():Observable<any>{
  return this.http.get<any>(`${this.urlProcesos}/ultimo`);
}
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
  public canvasUpdate(canvas:Canvas):Observable<any>{


    return this.http.put<any>(`${this.urlEndPoint}/model/${canvas.id}`,canvas);
  }
  // modelo canvas todos los save de los diferentes sectores
public segmentoSave(customerSegments:CustomerSegments):Observable<any>{
  return this.http.post<any>(`${this.urlEndPoint}/segmetento`,customerSegments)
}
public propuestaValorSave(valuePropositions:ValuePropositions):Observable<any>{
  return this.http.post<any>(`${this.urlEndPoint}/propuestaValor`,valuePropositions)
}
public canalesSave(channels:Channels):Observable<any>{
  return this.http.post<any>(`${this.urlEndPoint}/canales`,channels)
}

  }
