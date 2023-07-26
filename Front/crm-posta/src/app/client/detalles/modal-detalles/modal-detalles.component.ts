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
  @Input()tipoVer:string;

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

  


  public verProceso(){
  
    switch(this.tipoVer){
      case 'autoEvaluacion':
        this.ruta.navigate([`puntajeAutoevaluacion/ver/${this.proceso.selfAssessment.client.id}`]); 
        break;
      case 'canvas':
      this.ruta.navigate([`procesos/verLienzo/${this.proceso.id}`]);
      break;
      case 'negocio':

        this.ruta.navigate([`clients/${this.proceso.canvasModel.client.id}/verBasico/${this.proceso.id}`]);

      ;
      break;
      case 'Propuesta de Valor':
        this.ruta.navigate([`canales/cliente/${this.proceso.canvasModel.client.id}`]);
       ;
       break;
    }
    this.modalService.cerrarTestAuto();
  }

}
