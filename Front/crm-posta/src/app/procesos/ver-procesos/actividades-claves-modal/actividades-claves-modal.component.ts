import { Component, Input } from '@angular/core';
import { Process } from '../../Process';
import { ModalService } from 'src/app/client/modal.service';

@Component({
  selector: 'app-actividades-claves-modal',
  templateUrl: './actividades-claves-modal.component.html',
  styleUrls: ['./actividades-claves-modal.component.css']
})
export class ActividadesClavesModalComponent {
  @Input()proceso:Process= new Process();
  @Input()bool:boolean;
  constructor(
    private modalServide:ModalService,
  ){}

  ngOnInit(): void {
    console.log(this.proceso);
    console.log(this.bool);
    
  }

  public cerrarVerMas(){
    this.modalServide.cerrarVerMas5();
  }
}

