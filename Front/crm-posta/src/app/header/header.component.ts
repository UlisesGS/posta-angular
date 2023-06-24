import { Component, HostBinding, OnInit } from '@angular/core';
import { ModalService } from '../client/modal.service';
import { ClientService } from '../client/client.service';
import { Client } from '../client/client';
import { BusquedaService } from './../busqueda.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  @HostBinding('class.is-open')
public modal:boolean;
public termino:string;
clientes:Client[]=[]
  constructor(public modalService:ModalService,private clienteService:ClientService, private busquedaService: BusquedaService){}

  ngOnInit(): void {
    this.modal=false;
  }

  abrirModalAsesoria():void{
    this.modalService.abrirModalAsesoria();
  }
  public setLlenar(){
//this.clienteService.buscarPorNombre(this.termino).subscribe(data=>{
  //this.clientes=data;
//})
//console.log(this.clientes);
this.busquedaService.setTermino(this.termino);
  }

}
