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
  console.log(termino);


  }
  public getTermino():string{

console.log(this.termino);

    return  this.termino;
  }
}
