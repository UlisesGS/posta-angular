import { Component, Input } from '@angular/core';
import { Process } from '../../Process';
import { ModalService } from 'src/app/client/modal.service';

@Component({
  selector: 'app-recursos-claves-modal',
  templateUrl: './recursos-claves-modal.component.html',
  styleUrls: ['./recursos-claves-modal.component.css']
})
export class RecursosClavesModalComponent {
  @Input()proceso:Process= new Process();
  constructor(
    private modalServide:ModalService,
  ){}

  ngOnInit(): void {
    console.log(this.proceso);
    
  }

  public cerrarVerMas(){
    this.modalServide.cerrarVerMas4();
  }
}

