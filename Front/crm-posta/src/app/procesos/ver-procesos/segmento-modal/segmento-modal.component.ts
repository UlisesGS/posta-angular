import { Component } from '@angular/core';
import { ModalService } from 'src/app/client/modal.service';

@Component({
  selector: 'app-segmento-modal',
  templateUrl: './segmento-modal.component.html',
  styleUrls: ['./segmento-modal.component.css']
})
export class SegmentoModalComponent {

  constructor(
    private modalServide:ModalService,
  ){}

  
}
