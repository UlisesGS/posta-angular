import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Client } from './client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
 // private urlEndPoint:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080/v3/api-docs/clients"
  private urlEndPoint:string="http://localhost:8080/clients";
  private httpHeader=new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient, private router:Router) { }



  /* TODOS LOS GET NORMALES */
  public getClient(id:number): Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/${id}`);
  }

  public getClientsMunicipios(): Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/municipios`);
  }

  /* TODAS LAS PAGINACIONES */
  public getClientType(page:number, variableType:string): Observable<any>{    / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/type/${0}?type=${variableType}`)
  }

  public getClientState(page:number, variableState:boolean): Observable<any>{    / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/state/${0}?active=${variableState}`)
  }

  public getClientsPaginar(page:number):Observable<any>{     / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/paginar/${0}`, {headers:this.httpHeader})
  }

  public getClientsMunicipiosPage(page:number, variableIdmunicipio:number): Observable<any>{      / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/municipios/${0}?idMunicipio=${variableIdmunicipio}`);
  }

  public getClientsGender(page:number, variableGender:string): Observable<any>{      / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/gender/${0}?=${variableGender}`);
  }

  public getClientsByTime(page:number): Observable<any>{      / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/byTime/${0}`);
  }



  /* TODOS LOS PUT */
  public updateEntrepreneur(id:number):Observable<any>{
    return this.http.put<any>(`${this.http}/entrepreneur/${id}`, {headers:this.httpHeader})
  }

  public updateBusinessman(id:number):Observable<any>{
    return this.http.put<any>(`${this.http}/businessman/${id}`, {headers:this.httpHeader})
  }
/* TODOS LOS DELETE */
  public ClientsDelete(id:void):Observable<void>{
    return this.http.delete<void>(`${this.http}/${id}`)
  }



  /* TODOS LOS POST */
  /*public saveSelfAssessment():Observable<any>{
    return this.http.post<any>(${this.http}/selfAssessment)/

    /public saveEntrepreneur():Observable<any>{
      return this.http.post<any>(${this.http}/entrepreneur)
    }

    public saveBusinessman():Observable<any>{
      return this.http.post<any>(${this.http}/businessman)
    }*/
}
