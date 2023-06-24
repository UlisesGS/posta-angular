import { Component, HostBinding, OnInit } from '@angular/core';
import { ModalService } from 'src/app/client/modal.service'; 
import { ClientService } from 'src/app/client/client.service'; 
import { Client } from 'src/app/client/client'; 
import { BusquedaService } from 'src/app/busqueda.service'; 

@Component({
  selector: 'app-header-superior',
  templateUrl: './header-superior.component.html',
  styleUrls: ['./header-superior.component.css']
})
export class HeaderSuperiorComponent implements OnInit{

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
