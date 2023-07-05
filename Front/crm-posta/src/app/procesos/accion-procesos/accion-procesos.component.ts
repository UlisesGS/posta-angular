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
      case 'iniciando':
        this.ruta.navigate([`autoevaluacion/cliente/${this.proceso.canvasModel.client.id}`]);
        break;
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
      case 'Relación con los Clientes':
        this.ruta.navigate([`recursosClaves/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'Recursos Claves':
        this.ruta.navigate([`actividadesClaves/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'Actividades Claves':
        this.ruta.navigate([`sociosClaves/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'Socios Claves':
        this.ruta.navigate([`ingresos/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'Ingresos':
        this.ruta.navigate([`estructuraCostos/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'Estructura Costos':
        this.ruta.navigate([`main`]);
      ;
      break;
    }
  }
}
