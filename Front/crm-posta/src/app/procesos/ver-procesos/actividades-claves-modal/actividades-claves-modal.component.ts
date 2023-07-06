import { Component, Input } from '@angular/core';
import { Process } from '../../Process';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../../proceso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividades-claves-modal',
  templateUrl: './actividades-claves-modal.component.html',
  styleUrls: ['./actividades-claves-modal.component.css']
})
export class ActividadesClavesModalComponent {
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
    this.modalServide.cerrarVerMas5();
  }
  public editar(){
    this.procesoService.actividadesClavesPut(this.proceso.canvasModel.keyActivities).subscribe(dato=>{
    this.modalServide.cerrarVerMas5();
    Swal.fire('Editado ', 'La Actividades Claves fue editada con exito', 'success');
    })
  }
}

