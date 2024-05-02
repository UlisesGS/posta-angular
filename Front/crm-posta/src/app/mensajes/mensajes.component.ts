import { Component, OnInit } from '@angular/core';
import { Mensaje } from './mensaje';
import { MensajeService } from './mensaje-service.service';
import { AuthService } from '../auth/auth.service';
import { Usuario } from '../usuario/usuario';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  mensajes: Mensaje[];
  nuevoMensaje: Mensaje = new Mensaje();
  usuario: Usuario;
  usuarios: Usuario[];
  mostrar: boolean = false;
  botonMensaje: string = 'Nuevo Mensaje';
  mensajesMostrados: Mensaje[] = [];
  vistaMensajes: boolean = false;
  botonVistaMensajes: string = 'Recibidos';
  mensajeSeleccionado: Mensaje | null = null;

  constructor(
    private mensajeService: MensajeService,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.obtenerMensajesPorUsuario();
    this.obtenerUsuarios();
  }

  obtenerMensajesPorUsuario(): void {
    this.usuario = this.authService.devolverUsuario();
    this.mensajeService.getMensajesByUser(this.usuario.id).subscribe(
      (mensajes) => {
        this.mensajes = mensajes;
        this.filtrarMensajes();
      },
      (error) => {
        console.error('Error al obtener mensajes del usuario:', error);
      }
    );
  }

  obtenerUsuarios(): void {
    this.usuarioService.usuarioFindAll().subscribe(
      (usuarios) => {
        this.usuario = this.authService.devolverUsuario();
        this.usuarios = usuarios.filter((usuario) =>
          usuario.id != this.usuario.id
        )
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

  crearNuevoMensaje(): void {
    this.usuario = this.authService.devolverUsuario();
    this.nuevoMensaje.remitente = this.usuario;

    this.mensajeService.crearMensaje(this.nuevoMensaje).subscribe(
      (response) => {
        this.obtenerMensajesPorUsuario();
        this.nuevoMensaje = new Mensaje();
      },
      (error) => {
        console.error('Error al crear el mensaje:', error);
      }
    );
  }

  mostrarFormulario(): void {
    this.mostrar = !this.mostrar;
    this.botonMensaje = this.mostrar ? 'Cerrar' : 'Nuevo Mensaje';
  }

  cambiarVistaMensajes(): void {
    this.vistaMensajes = !this.vistaMensajes;
    this.botonVistaMensajes = this.vistaMensajes ? 'Enviados' : 'Recibidos';
    this.filtrarMensajes();
  }

  filtrarMensajes(): void {
    this.usuario = this.authService.devolverUsuario();
    if (this.vistaMensajes) {
      this.mensajesMostrados = this.mensajes.filter(mensaje =>
        mensaje.destinatario.id === this.usuario.id
      );
    } else {
      this.mensajesMostrados = this.mensajes.filter(mensaje =>
        mensaje.remitente.id === this.usuario.id
      );
    }
  }

  mostrarMensajeCompleto(mensaje: Mensaje) {
    this.mensajeSeleccionado = mensaje;
  }

  volverALista() {
    this.mensajeSeleccionado = null;
  }






  //Este el codigo que estaba funcionando. Pero sin la notificacion.
  // constructor(
  //   private mensajeService: MensajeService,
  //   private authService: AuthService,
  //   private usuarioService: UsuarioService,
  // ) { }
  // ngOnInit(): void {
  //   this.obtenerMensajesPorUsuario();
  //   this.obtenerUsuarios();
  // }

  // mensajes: Mensaje[];
  // nuevoMensaje: Mensaje = new Mensaje();
  // usuario: Usuario;
  // usuarios: Usuario[];
  // mostrar: boolean = false;
  // botonMensaje: string = 'Nuevo Mensaje';
  // mensajesMostrados: Mensaje[] = [];
  // vistaMensajes: boolean = false;
  // botonVistaMensajes: string = 'Recibidos';
  // mensajeSeleccionado: Mensaje | null = null

  // obtenerMensajesPorUsuario(): void {
  //   this.usuario = this.authService.devolverUsuario();
  //   this.mensajeService.getMensajesByUser(this.usuario.id).subscribe(
  //     (mensajes) => {
  //       this.mensajes = mensajes;

  //       // Después de obtener los mensajes, filtrar y mostrar los mensajes recibidos
  //       this.filtrarMensajes();
  //     },
  //     (error) => {
  //       console.error('Error al obtener mensajes del usuario:', error);
  //     }
  //   );
  // }

  // obtenerUsuarios(): void {
  //   this.usuarioService.usuarioFindAll().subscribe(
  //     (usuarios) => {
  //       this.usuario = this.authService.devolverUsuario();
  //       this.usuarios = usuarios.filter((usuario) =>
  //         usuario.id != this.usuario.id
  //       )
  //     },
  //     (error) => {
  //       console.error('Error al obtener la lista de usuarios:', error);
  //     }
  //   );
  // }

  // crearNuevoMensaje(): void {
  //   this.usuario = this.authService.devolverUsuario();
  //   this.nuevoMensaje.remitente = this.usuario;

  //   this.mensajeService.crearMensaje(this.nuevoMensaje).subscribe(
  //     (response) => {

  //       this.obtenerMensajesPorUsuario();
  //       this.nuevoMensaje = new Mensaje();
  //       window.location.reload();
  //     },
  //     (error) => {
  //       // Maneja el error si ocurre algún problema al crear el mensaje
  //       console.error('Error al crear el mensaje:', error);
  //     }
  //   );
  // }
  // mostrarFormulario(): void {
  //   if (this.mostrar) {
  //     this.mostrar = false
  //     this.botonMensaje = "Nuevo Mensaje"
  //   } else {
  //     this.mostrar = true
  //     this.botonMensaje = "Cerrar"
  //   }
  // }

  // cambiarVistaMensajes(): void {
  //   if (this.vistaMensajes) {
  //     this.vistaMensajes = false
  //     this.botonVistaMensajes = "Recibidos"
  //     this.filtrarMensajes();
  //   } else {
  //     this.vistaMensajes = true
  //     this.botonVistaMensajes = "Enviados"
  //     this.filtrarMensajes();
  //   }
  // }

  // // Método para filtrar los mensajes según la vista 
  // filtrarMensajes(): void {

  //   this.usuario = this.authService.devolverUsuario();
  //   if (this.vistaMensajes) {
  //     // Mostrar solo los mensajes recibidos (donde el usuario logueado es el destinatario)
  //     this.mensajesMostrados = this.mensajes.filter(mensaje =>

  //       mensaje.destinatario.id === this.usuario.id);

  //     console.log(this.mensajesMostrados);
  //   } else {
  //     // Mostrar solo los mensajes enviados (donde el usuario logueado es el remitente)
  //     this.mensajesMostrados = this.mensajes.filter(mensaje =>
  //       mensaje.remitente.id === this.usuario.id);
  //     console.log(this.mensajesMostrados);
  //   }
  // }
  // mostrarMensajeCompleto(mensaje: any) {
  //   this.mensajeSeleccionado = mensaje;
  // }
  // volverALista() {
  //   this.mensajeSeleccionado = null;
  // }


}
