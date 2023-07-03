import { Component, Input } from '@angular/core';
import { Process } from '../../Process';
import { ModalService } from 'src/app/client/modal.service';

@Component({
  selector: 'app-estructura-costos-modal',
  templateUrl: './estructura-costos-modal.component.html',
  styleUrls: ['./estructura-costos-modal.component.css']
})
export class EstructuraCostosModalComponent {
  @Input()proceso:Process= new Process();
  constructor(
    private modalServide:ModalService,
  ){}

  ngOnInit(): void {
    console.log(this.proceso);
    
  }

  public cerrarVerMas(){
    this.modalServide.cerrarVerMas8();
  }
}
