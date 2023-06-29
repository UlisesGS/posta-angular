import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;
  action: boolean = false;
  asesoria: boolean=false;
  proceso:boolean=false;
  private _notificar = new EventEmitter<any>()
  constructor() { }
  get notificar(): EventEmitter<any> {
    return this._notificar;

  }
  abrirModal() {
    this.modal = true
  }

  cerrarModal() {
    this.modal = false
  }

  abrirModalAction() {
    this.action = true
  }

  cerrarModalAction() {
    this.action = false
  }

  abrirModalAsesoria() {
    this.asesoria = true
  }

  cerrarModalAsesoria() {
    this.asesoria = false
  }
  abrirModalPocesos(){
this.proceso=true;
  }
  cerrarModalProceso(){
this.proceso=false;
  }
}
