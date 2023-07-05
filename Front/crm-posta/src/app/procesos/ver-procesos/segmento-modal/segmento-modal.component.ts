import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/client/modal.service';
import { Process } from '../../Process';
import { ProcesoService } from '../../proceso.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-segmento-modal',
  templateUrl: './segmento-modal.component.html',
  styleUrls: ['./segmento-modal.component.css']
})
export class SegmentoModalComponent implements OnInit{
  @Input()proceso:Process= new Process();
  @Input()bool:boolean;
  constructor(
    private modalServide:ModalService,
    private procesoService:ProcesoService
  ){}

  ngOnInit(): void {
    console.log(this.proceso);
    console.log(this.bool);
    
  }

  public cerrarVerMas(){
    this.modalServide.cerrarVerMas();
  }
  
  public editar(){
    this.procesoService.segmentoPut(this.proceso.canvasModel.customerSegments).subscribe(dato=>{
    this.modalServide.cerrarVerMas();
    Swal.fire('Editado ', 'El segmento fue editado con exito', 'success');
    })
  }
}
