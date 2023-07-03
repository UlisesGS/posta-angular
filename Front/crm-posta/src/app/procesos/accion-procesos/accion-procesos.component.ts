import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/client/modal.service';
import { Process } from '../Process';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accion-procesos',
  templateUrl: './accion-procesos.component.html',
  styleUrls: ['./accion-procesos.component.css']
})
export class AccionProcesosComponent implements OnInit {

  @Input()proceso:Process = new Process();

  constructor(public modal:ModalService,
    private ruta:Router){}
  ngOnInit(): void {

  }
  cerrarModalAction(){
    this.modal.cerrarModalProceso();
  }

  public continuarProceso(){
    switch(this.proceso.estado){
      case 'AutoEvaluación':
      this.ruta.navigate([`segmento/cliente/${this.proceso.canvasModel.client.id}`]);
      break;
      case 'Segmento de Clientes':
        this.ruta.navigate([`propuestaDeValor/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'Propuesta de Valor':
        this.ruta.navigate([`canales/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'Canales':
        this.ruta.navigate([`relaciones/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'Relaciones con los Clientes':
        this.ruta.navigate([`recursosClaves/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'recursosClaves':
        this.ruta.navigate([`actividadesClaves/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'actividadesClaves':
        this.ruta.navigate([`sociosClaves/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'sociosClaves':
        this.ruta.navigate([`ingresos/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'ingresos':
        this.ruta.navigate([`estructuraCostos/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'estructuraCostos':
        this.ruta.navigate([`main`]);
      ;
      break;
    }
  }
}
