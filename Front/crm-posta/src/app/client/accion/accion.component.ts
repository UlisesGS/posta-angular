import { Component, Input } from '@angular/core';
import { ModalService } from '../modal.service';
import { Client } from '../client';

@Component({
  selector: 'app-accion',
  templateUrl: './accion.component.html',
  styleUrls: ['./accion.component.css']
})
export class AccionComponent {

  @Input()cliente:Client = new Client();

  constructor(private modalService:ModalService){}

  cerrarModalAction():void{
    this.modalService.cerrarModalAction();
  }


}
