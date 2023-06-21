import { Component, OnInit } from '@angular/core';
import { ModalService } from '../client/modal.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {

  public modal:boolean;

  constructor(public modalService:ModalService){}

  ngOnInit(): void {
    this.modal=false;
  }

  abrirModalAsesoria():void{
    this.modalService.abrirModalAsesoria();
  }

}
