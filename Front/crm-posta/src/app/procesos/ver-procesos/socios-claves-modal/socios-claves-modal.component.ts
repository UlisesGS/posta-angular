import { Component, Input } from '@angular/core';
import { Process } from '../../Process';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../../proceso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-socios-claves-modal',
  templateUrl: './socios-claves-modal.component.html',
  styleUrls: ['./socios-claves-modal.component.css']
})
export class SociosClavesModalComponent {
  @Input()proceso:Process= new Process();
  @Input()bool:boolean;
  constructor(
    private modalServide:ModalService,private procesoService:ProcesoService
  ){}

  ngOnInit(): void {
    console.log(this.proceso);

  }

  public cerrarVerMas(){
    this.modalServide.cerrarVerMas6();
  }
  public editar(){
    this.procesoService.sociosClavesPut(this.proceso.canvasModel.keyPartners).subscribe(dato=>{
    this.modalServide.cerrarVerMas6();
    Swal.fire('Editado ', 'Socios Claves fue editado con exito', 'success');
    })
  }
}
