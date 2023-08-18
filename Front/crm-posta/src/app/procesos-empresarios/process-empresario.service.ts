import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from './../URL';
import { Observable, catchError, throwError } from 'rxjs';
import { ProcessEmpresario } from './process-empresario';
import { Process } from '../procesos/Process';

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
  public procesoEmpresarioSave(procesoEmpresario: Process): Observable<any> {
    return this.http.post<any>(`${this.url}`, procesoEmpresario)
  }
  // metodos put
  public updateProcesoEconomico(procesoEmpresario: Process): Observable<any> {
    return this.http.put<any>(`${this.url}/economico/${procesoEmpresario.processEmpresario.diagnosticoEmpresarial.analisisEconomico.id}`, procesoEmpresario);
  }
  public updateProcesoDiagnostico(procesoEmpresario: Process): Observable<any> {
    return this.http.put<any>(`${this.url}/diagnostico/${procesoEmpresario.processEmpresario.diagnosticoEmpresarial.diagnostico.id}`, procesoEmpresario);
  }
  public updateProcesoResultado(procesoEmpresario: Process): Observable<any> {
    return this.http.put<any>(`${this.url}/resultados/${procesoEmpresario.processEmpresario.diagnosticoEmpresarial.analisisResultados.id}`, procesoEmpresario);
  }

  public updatePlanDeAccion(procesoEmpresario: Process): Observable<any> {
    return this.http.put<any>(`${this.url}/planAccion/${procesoEmpresario.processEmpresario.planDeAccion.id}`, procesoEmpresario);
  }
}
