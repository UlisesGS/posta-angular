import { Component, Input } from '@angular/core';
import { Process } from '../../Process';
import { ModalService } from 'src/app/client/modal.service';

@Component({
  selector: 'app-propuesta-de-valor-modal',
  templateUrl: './propuesta-de-valor-modal.component.html',
  styleUrls: ['./propuesta-de-valor-modal.component.css']
})
export class PropuestaDeValorModalComponent {
  @Input()proceso:Process= new Process();
  constructor(
    private modalServide:ModalService,
  ){}

  ngOnInit(): void {
    console.log(this.proceso);
    
  }

  public cerrarVerMas(){
    this.modalServide.cerrarVerMas1();
  }
}
