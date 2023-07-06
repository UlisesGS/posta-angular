import { Component, Input } from '@angular/core';
import { Process } from '../../Process';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../../proceso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recursos-claves-modal',
  templateUrl: './recursos-claves-modal.component.html',
  styleUrls: ['./recursos-claves-modal.component.css']
})
export class RecursosClavesModalComponent {
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
    this.modalServide.cerrarVerMas4();
  }
  public editar(){
    this.procesoService.recursosClavesPut(this.proceso.canvasModel.keyRecources).subscribe(dato=>{
    this.modalServide.cerrarVerMas4();
    Swal.fire('Editado ', 'Recursos Claves fue editado con exito', 'success');
    })
  }
}

