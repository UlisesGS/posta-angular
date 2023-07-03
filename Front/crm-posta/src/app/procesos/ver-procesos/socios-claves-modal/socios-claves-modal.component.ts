import { Component, Input } from '@angular/core';
import { Process } from '../../Process';
import { ModalService } from 'src/app/client/modal.service';

@Component({
  selector: 'app-socios-claves-modal',
  templateUrl: './socios-claves-modal.component.html',
  styleUrls: ['./socios-claves-modal.component.css']
})
export class SociosClavesModalComponent {
  @Input()proceso:Process= new Process();
  constructor(
    private modalServide:ModalService,
  ){}

  ngOnInit(): void {
    console.log(this.proceso);
    
  }

  public cerrarVerMas(){
    this.modalServide.cerrarVerMas6();
  }
}
