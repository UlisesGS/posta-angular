import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;
  action: boolean = false;
  asesoria: boolean = false;
  proceso: boolean = false;
  verMas: boolean = false;
  verMas1: boolean = false;
  verMas2: boolean = false;
  verMas3: boolean = false;
  verMas4: boolean = false;
  verMas5: boolean = false;
  verMas6: boolean = false;
  verMas7: boolean = false;
  verMas8: boolean = false;
  auto: boolean = false;
  canvas: boolean = false;
  negocios: boolean = false;
  financiero: boolean = false;

  diagnostico: boolean = false;
  planAccion: boolean = false;

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


  abrirModalPocesos() {
    this.proceso = true;
  }
  cerrarModalProceso() {
    this.proceso = false;
  }


  abrirVerMas() {
    this.verMas = true;
  }
  cerrarVerMas() {
    this.verMas = false;
  }

  abrirVerMas1() {
    this.verMas1 = true;
  }
  cerrarVerMas1() {
    this.verMas1 = false;
  }

  abrirVerMas2() {
    this.verMas2 = true;
  }
  cerrarVerMas2() {
    this.verMas2 = false;
  }

  abrirVerMas3() {
    this.verMas3 = true;
  }
  cerrarVerMas3() {
    this.verMas3 = false;
  }

  abrirVerMas4() {
    this.verMas4 = true;
  }
  cerrarVerMas4() {
    this.verMas4 = false;
  }

  abrirVerMas5() {
    this.verMas5 = true;
  }
  cerrarVerMas5() {
    this.verMas5 = false;
  }

  abrirVerMas6() {
    this.verMas6 = true;
  }
  cerrarVerMas6() {
    this.verMas6 = false;
  }

  abrirVerMas7() {
    this.verMas7 = true;
  }
  cerrarVerMas7() {
    this.verMas7 = false;
  }

  abrirVerMas8() {
    this.verMas8 = true;
  }
  cerrarVerMas8() {
    this.verMas8 = false;
  }

  abrirTestAuto() {
    this.auto = true;
  }
  cerrarTestAuto() {
    this.auto = false;
  }
/*
  abrirTestCanvas() {
    this.canvas = true;
  }
  cerrarTestCanvas() {
    this.canvas = false;
  }
  abrirTestNegocios() {
    this.negocios = true;
  }
  cerrarTestNegocios() {
    this.negocios = false;
  }

  abrirTestFinanciero() {
    this.financiero = true;
  }
  cerrarTestFinanciero() {
    this.financiero = false;
  }



  abrirDiagnostico() {
    this.diagnostico = true;
  }
  cerrarDiagnostico() {
    this.diagnostico = false;
  }

  abrirPlanAccion() {
    this.planAccion = true;
  }
  cerrarPlanAccion() {
    this.planAccion = false;
  }*/


}
