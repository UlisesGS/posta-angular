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
  //private urlEndPoint:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080/v3/api-docs/clients"
  private urlEndPoint:string="http://localhost:8080/clients";
  private httpHeader=new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient, private router:Router) { }
  getClient(page:number):Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/paginar/'+0, {headers:this.httpHeader})
  }
}
