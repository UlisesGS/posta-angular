import { Component, Input } from '@angular/core';
import { Process } from '../../Process';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../../proceso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relaciones-modal',
  templateUrl: './relaciones-modal.component.html',
  styleUrls: ['./relaciones-modal.component.css']
})
export class RelacionesModalComponent {
  @Input()proceso:Process= new Process();
  @Input()bool:boolean;
  constructor(
    private modalServide:ModalService,private procesoService:ProcesoService
  ){}

  ngOnInit(): void {
    console.log(this.proceso);
console.log(this.bool);

  }

  public cerrarVerMas(){
    this.modalServide.cerrarVerMas3();
  }
  public editar(){
    this.procesoService.relacionesPut(this.proceso.canvasModel.customerRelationships).subscribe(dato=>{
    this.modalServide.cerrarVerMas3();
    Swal.fire('Editado ', 'La Relacion fue editada con exito', 'success');
    })
  }
}

