import { Component } from '@angular/core';
import { ModalService } from 'src/app/client/modal.service';

@Component({
  selector: 'app-asesoria',
  templateUrl: './asesoria.component.html',
  styleUrls: ['./asesoria.component.css']
})
export class AsesoriaComponent {

  constructor(private modalService:ModalService){}

  cerrarModalAsesoria():void{
    this.modalService.cerrarModalAsesoria();
  }
}
