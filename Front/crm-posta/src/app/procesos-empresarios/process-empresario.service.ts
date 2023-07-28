import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from './../URL';
import { Observable } from 'rxjs';
import { ProcessEmpresario } from './process-empresario';

@Injectable({
  providedIn: 'root'
})
export class ProcessEmpresarioService {
  url: string = URL + '/processEmpre'
  constructor(private http: HttpClient) { }
  //metodos get
  public procesoEmpresarioFindAll(): Observable<any> {
    return this.http.get<any>(`${this.url}/ultimo`);
  }
  public procesoEmpresarioFindById(id:number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
  //metodos post
  public procesoEmpresarioSave(procesoEmpresario: ProcessEmpresario): Observable<any> {
    return this.http.post<any>(`${this.url}`, procesoEmpresario);
  }
  // metodos put
  public updateProcesoEconomico(procesoEmpresario: ProcessEmpresario): Observable<any> {
    return this.http.put<any>(`${this.url}/economico`, procesoEmpresario);
  }
  public updateProcesoDiagnostico(procesoEmpresario: ProcessEmpresario): Observable<any> {
    return this.http.put<any>(`${this.url}/diagnostico`, procesoEmpresario);
  }
}
