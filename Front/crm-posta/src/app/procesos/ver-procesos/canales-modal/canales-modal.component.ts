import { Component, Input } from '@angular/core';
import { Process } from '../../Process';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../../proceso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-canales-modal',
  templateUrl: './canales-modal.component.html',
  styleUrls: ['./canales-modal.component.css']
})
export class CanalesModalComponent {
  @Input()proceso:Process= new Process();
  @Input()bool:boolean;
  constructor(
    private modalServide:ModalService,
    private procesoService:ProcesoService
  ){}

  ngOnInit(): void {
    console.log(this.proceso);
    
  }

  public cerrarVerMas(){
    this.modalServide.cerrarVerMas2();
  }

  public editar(){
    this.procesoService.canalesPut(this.proceso.canvasModel.channels).subscribe(dato=>{
    this.modalServide.cerrarVerMas2();
    Swal.fire('Editado ', 'Los canales fueron editados con exito', 'success');
    })
  }
}
