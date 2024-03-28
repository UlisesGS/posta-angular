import { Component, HostBinding, OnInit } from '@angular/core';
import { ModalService } from 'src/app/client/modal.service';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/client';
import { BusquedaService } from 'src/app/busqueda.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Usuario } from 'src/app/usuario/usuario';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/mensajes/mensaje-service.service';
import { Mensaje } from 'src/app/mensajes/mensaje';

@Component({
  selector: 'app-header-superior',
  templateUrl: './header-superior.component.html',
  styleUrls: ['./header-superior.component.css']
})
export class HeaderSuperiorComponent implements OnInit {

  @HostBinding('class.is-open')
  public modal: boolean;
  public termino: string;
  usuario: Usuario = new Usuario()
  clientes: Client[] = []
  mensajes: Mensaje[];
  mensajesRecibidos: any[] = [];
  hayMensajesNuevos: boolean = false;
  constructor(public modalService: ModalService,
    private clienteService: ClientService,
    private busquedaService: BusquedaService,
    public authService: AuthService,
    private ruta: Router,
    private mensajeService: MensajeService,
  ) { }

  ngOnInit(): void {
    this.modal = false;
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    this.obtenerMensajesRecibidos();
  }

  obtenerMensajesRecibidos(): void {
    this.mensajeService.getMensajesByUser(this.usuario.id).subscribe(
      (mensajes) => {
        // Filtrar los mensajes recibidos por el usuario logueado
        this.mensajesRecibidos = mensajes.filter(mensaje => mensaje.destinatario.id === this.usuario.id);
        // Verificar si hay mensajes nuevos
        this.verificarMensajesNuevos();
      },
      (error) => {
        console.error('Error al obtener mensajes del usuario:', error);
      }
    );
  }

  verificarMensajesNuevos(): void {
    // Verificar si hay algún mensaje no leído que no haya sido enviado por el usuario logueado
    this.hayMensajesNuevos = this.mensajesRecibidos.some(mensaje => !mensaje.leido && mensaje.remitente.id !== this.usuario.id);
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
  panel() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'))

    this.ruta.navigate(['/panel/', this.usuario?.id])
  }
}
