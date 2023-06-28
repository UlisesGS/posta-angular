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
  //private urlEndPoint:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080/clients"
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
    return this.http.get<any>(`${this.urlEndPoint}/type/${page}?type=${variableType}`)
  }

  public getClientState(page:number, variableState:boolean): Observable<any>{    / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/state/${page}?active=${variableState}`)
  }

  public getClientsPaginar(page:number):Observable<any>{     / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/paginar/${page}`, {headers:this.httpHeader})
  }

  public getClientsMunicipiosPage(page:number, idMunicipio:number): Observable<any>{      / AGREGAR PAGINACION /
  console.log(idMunicipio);

  return this.http.get<any>(`${this.urlEndPoint}/municipios/${page}?idMunicipio=${idMunicipio}`);
  }

  public getClientsGender(page:number, variableGender:string): Observable<any>{      / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/gender/${page}?gender=${variableGender}`);
  }

  public getClientsByTime(page:number): Observable<any>{      / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/byTime/${page}`);
  }

  public getEnums():Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/enums`);
  }

  public getCiiu():Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/actividades`);
  }


  /* TODOS LOS PUT */
  public updateEntrepreneur(entrepreneur:Client):Observable<any>{
   
    return this.http.put<any>(`${this.urlEndPoint}/client/${entrepreneur.id}`, entrepreneur,{headers:this.httpHeader})
  }

  public updateBusinessman(businessman:Client):Observable<any>{
    console.log(businessman);
    
    return this.http.put<any>(`${this.urlEndPoint}/client/${businessman.id}`,businessman, {headers:this.httpHeader})
  }
/* TODOS LOS DELETE */
  public ClientsDelete(id:void):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`)
  }


  public saveClient(client:Client):Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/save`, client)
  }

    public saveSelfAssessment(client:Client):Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/selfAssessment`, client)
    }

  public saveEntrepreneur(entrepreneur:Client):Observable<any>{
      return this.http.post<any>(`${this.urlEndPoint}/save`,entrepreneur)
    }

    public saveBusinessman(businessman:Client):Observable<any>{
      return this.http.post<any>(`${this.urlEndPoint}/save`,businessman)
    }
   
    public buscarPorNombre(termino:string):Observable<any>{
      return this.http.get<any>(`${this.urlEndPoint}/search/${termino}`)
    }
   
}
