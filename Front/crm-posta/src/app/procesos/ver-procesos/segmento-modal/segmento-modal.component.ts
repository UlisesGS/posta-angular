import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/client/modal.service';
import { Process } from '../../Process';

@Component({
  selector: 'app-segmento-modal',
  templateUrl: './segmento-modal.component.html',
  styleUrls: ['./segmento-modal.component.css']
})
export class SegmentoModalComponent implements OnInit{
  @Input()proceso:Process= new Process();
  constructor(
    private modalServide:ModalService,
  ){}

  ngOnInit(): void {
    console.log(this.proceso);
    
  }

  public cerrarVerMas(){
    this.modalServide.cerrarVerMas();
  }
  
}
