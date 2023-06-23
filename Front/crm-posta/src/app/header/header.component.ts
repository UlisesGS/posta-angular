import { Component, OnInit } from '@angular/core';
import { ModalService } from '../client/modal.service';
import { ClientService } from '../client/client.service';
import { Client } from '../client/client';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {

public modal:boolean;
public termino:string;
clientes:Client[]=[]
  constructor(public modalService:ModalService,private clienteService:ClientService){}

  ngOnInit(): void {
    this.modal=false;
  }

  abrirModalAsesoria():void{
    this.modalService.abrirModalAsesoria();
  }
  public buscar(){
this.clienteService.buscarPorNombre(this.termino).subscribe(data=>{
  this.clientes=data;
})
console.log(this.clientes);

  }

}
