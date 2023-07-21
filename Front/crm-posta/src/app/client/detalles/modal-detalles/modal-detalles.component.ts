import { Component, Input } from '@angular/core';
import { Process } from 'src/app/procesos/Process';
import { ModalService } from '../../modal.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-modal-detalles',
  templateUrl: './modal-detalles.component.html',
  styleUrls: ['./modal-detalles.component.css']
})
export class ModalDetallesComponent {

  @Input()proceso:Process = new Process();
  @Input()autoB:string;
  @Input()canvasB:string;
  @Input()negociosB:string;
  @Input()financieroB:string;

  constructor(
    public modalService: ModalService,
    private ruta:Router,
  ) { }


  public cerrarTest() {
    this.modalService.cerrarTestAuto();
    this.modalService.cerrarTestCanvas();
    this.modalService.cerrarTestNegocios();
    this.modalService.cerrarTestFinanciero();
  }

  


  public continuarProceso(){
    if(this.proceso.selfAssessment!=null){

    }
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
        this.ruta.navigate([`informacion/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'Informacion Proyecto':
        this.ruta.navigate([`interno/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'Analisis Interno/Externo':
        this.ruta.navigate([`dofa/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'Analisis Dofa':
        this.ruta.navigate([`conclusion/cliente/${this.proceso.canvasModel.client.id}`]);
      ;
      break;
      case 'Conclusiones':
       this.ruta.navigate([`ventas/cliente/${this.proceso.canvasModel.client.id}`]);
      //this.ruta.navigate(['/procesos']);
      ;
      break;
      case 'Presupuesto Venta':
        this.ruta.navigate([`compras/cliente/${this.proceso.canvasModel.client.id}`]);
       //this.ruta.navigate(['/procesos']);
       ;
       break;
       case 'Presupuesto Compra':
        this.ruta.navigate([`gastos/cliente/${this.proceso.canvasModel.client.id}`]);
       //this.ruta.navigate(['/procesos']);
       ;
       break;
       case 'Presupuesto Gastos/Costos':
        this.ruta.navigate([`inversion/cliente/${this.proceso.canvasModel.client.id}`]);
      
       ;
       break;
    }
    this.modalService.cerrarTestAuto();
  }

}
