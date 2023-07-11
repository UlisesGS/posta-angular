import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BusinessPlan } from './BusinessPlan';
import { ProyectInformation } from './ProyectInformation';
import { DofaAnalisis } from './DofaAnalisis';
import { InternalExternalAnalysis } from './InternalExternalAnalysis';

@Injectable({
  providedIn: 'root'
})
export class ModeloBasicoService {

  //private urlEndPoint:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080/plan"

  private urlEndPoint:string="http://localhost:8080/plan";
  constructor(private http:HttpClient) { }

  // TODOS LOS GET
  public planListar():Observable<any[]>{
    return this.http.get<any[]>(`${this.urlEndPoint}/listar`)
  }

  public planFindById(id:number):Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/buscarId/${id}`)
  }


  // TODOS LOS POST
  public planSaveBusinessPlan(businessPlan:BusinessPlan):Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/save`, businessPlan)
  }

  public planSaveDofa(dofaAnalisis:DofaAnalisis):Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/dofa`, dofaAnalisis)
  }

  public planSaveProyect(proyectInformation:ProyectInformation):Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/proyect`, proyectInformation)
  }

  public planSaveAnalisis(analisis:InternalExternalAnalysis):Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/analisis`, analisis)
  }


  // TODOS LOS PUT
  public planUpdateBusinessPlan(businessPlan:BusinessPlan):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/businessPut/${businessPlan.id}`, businessPlan )
  }

  public planUpdateDofa(dofa:DofaAnalisis):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/dofaPut/${dofa.id}`, dofa )
  }

  public planUpdateProyect(proyect:ProyectInformation):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/proyectPut/${proyect.id}`, proyect )
  }

  public planUpdateAnalisis(analisis:InternalExternalAnalysis):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/analisisPut/${analisis.id}`, analisis )
  }

}
