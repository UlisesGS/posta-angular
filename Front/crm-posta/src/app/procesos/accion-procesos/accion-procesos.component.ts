import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/client/modal.service';

@Component({
  selector: 'app-accion-procesos',
  templateUrl: './accion-procesos.component.html',
  styleUrls: ['./accion-procesos.component.css']
})
export class AccionProcesosComponent implements OnInit {
  constructor(public modal:ModalService){}
  ngOnInit(): void {

  }
  cerrarModalAction(){
    this.modal.cerrarModalProceso();
  }

}
