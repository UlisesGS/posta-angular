import { Component, HostBinding, OnInit } from '@angular/core';
import { ModalService } from '../client/modal.service';
import { ClientService } from '../client/client.service';
import { Client } from '../client/client';
import { BusquedaService } from './../busqueda.service';
import { Usuario } from './../usuario/usuario';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  @HostBinding('class.is-open')
  public modal: boolean;
  public termino: string;
  usuario: Usuario = new Usuario()
  clientes: Client[] = []
  constructor(public authService: AuthService
    , public modalService: ModalService
    , private clienteService: ClientService
    , private busquedaService: BusquedaService
    , private ruta: Router,
  ) { }

  ngOnInit(): void {
    this.modal = false;
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
  }



  abrirModalAsesoria(): void {
    this.modalService.abrirModalAsesoria();
  }
  public setLlenar() {
    //this.clienteService.buscarPorNombre(this.termino).subscribe(data=>{
    //this.clientes=data;
    //})
    //console.log(this.clientes);
    this.busquedaService.setTermino(this.termino);
  }
  public cerrarSesion() {
    this.authService.logaut();
    Swal.fire("Sesion", 'Sesión Cerrada con Éxito', 'success');
    this.ruta.navigate(['/login'])
  }

  

}
