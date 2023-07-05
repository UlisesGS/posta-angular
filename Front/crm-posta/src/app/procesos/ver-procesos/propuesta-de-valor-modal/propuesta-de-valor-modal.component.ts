import { Component, Input } from '@angular/core';
import { Process } from '../../Process';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../../proceso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-propuesta-de-valor-modal',
  templateUrl: './propuesta-de-valor-modal.component.html',
  styleUrls: ['./propuesta-de-valor-modal.component.css']
})
export class PropuestaDeValorModalComponent {
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
    this.modalServide.cerrarVerMas1();
  }

  public editar(){
    this.procesoService.propuestaValorPut(this.proceso.canvasModel.valuePropositions).subscribe(dato=>{
    this.modalServide.cerrarVerMas1();
    Swal.fire('Editado ', 'La propuesta de valor fue editada con exito', 'success');
    })
  }
}
