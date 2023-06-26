import { Component, HostBinding, OnInit } from '@angular/core';
import { ModalService } from 'src/app/client/modal.service';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/client';
import { BusquedaService } from 'src/app/busqueda.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Usuario } from 'src/app/usuario/usuario';

@Component({
  selector: 'app-header-superior',
  templateUrl: './header-superior.component.html',
  styleUrls: ['./header-superior.component.css']
})
export class HeaderSuperiorComponent implements OnInit{

  @HostBinding('class.is-open')
  public modal:boolean;
  public termino:string;
  usuario:Usuario = new Usuario()
  clientes:Client[]=[]
    constructor(public modalService:ModalService,
      private clienteService:ClientService,
       private busquedaService: BusquedaService,
       public authService:AuthService){}

    ngOnInit(): void {
      this.modal=false;
      this.usuario=this.authService.devolverUsuario()
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
