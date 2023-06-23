import { Component, Input } from '@angular/core';
import { ModalService } from '../modal.service';
import { Client } from '../client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accion',
  templateUrl: './accion.component.html',
  styleUrls: ['./accion.component.css']
})
export class AccionComponent {

  @Input()cliente:Client = new Client();

  constructor(private modalService:ModalService,
    private ruta:Router,
    ){}

  cerrarModalAction():void{
    this.modalService.cerrarModalAction();
  }
  public tipoCliente(){
    if(this.cliente.type=='entrepreneur'){
      this.ruta.navigate([`clients/form/editar/entrepreneur/${this.cliente.id}`]);

    }else{
      this.ruta.navigate([`clients/form/editar/businessman/${this.cliente.id}`]);
    }
  }


}
