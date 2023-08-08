import { Component, Input } from '@angular/core';
import { Process } from '../../Process';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../../proceso.service';
import Swal from 'sweetalert2';
import { CostComponent } from '../../CostComponent';

@Component({
  selector: 'app-ingresos-modal',
  templateUrl: './ingresos-modal.component.html',
  styleUrls: ['./ingresos-modal.component.css']
})
export class IngresosModalComponent {
  @Input()proceso:Process= new Process();
  @Input()bool:boolean;
  
  constructor(
    private modalServide:ModalService,
    private procesoService:ProcesoService,
  ){}

  ngOnInit(): void {
   
    
    
  }

  public cerrarVerMas(){
    this.modalServide.cerrarVerMas7();
  }

  public editar(){
    this.procesoService.ingresosPut(this.proceso.canvasModel.revenueStreams).subscribe(dato=>{
    this.modalServide.cerrarVerMas7();
    Swal.fire('Editado ', 'Los ingresos fueron editados con exito', 'success');
    })
  }
}
