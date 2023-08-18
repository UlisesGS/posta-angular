import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  termino:string=""

  constructor() { }
  public setTermino(termino:string){
    this.termino=termino;




  }
  public getTermino():string{


    return  this.termino;
  }
}
