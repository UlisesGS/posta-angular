import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusinessPlanFinancial } from './BusinessPlanFinancial';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlanFinancieroService {

 private urlEndPoint:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080/financial"

  //private urlEndPoint:string="http://localhost:8080/financial";
  constructor(private http:HttpClient) { }
  public planFinancialSave(businessPlanFinancial:BusinessPlanFinancial):Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}`,businessPlanFinancial);
  }
  public inversionPut(businessPlanFinancial:BusinessPlanFinancial):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/inversion/${businessPlanFinancial.id}`,businessPlanFinancial)
  }
  public gastosPut(businessPlanFinancial:BusinessPlanFinancial):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/gastos/${businessPlanFinancial.id}`,businessPlanFinancial)
  }
  public comprasPut(businessPlanFinancial:BusinessPlanFinancial):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/compras/${businessPlanFinancial.id}`,businessPlanFinancial)
  }
}
