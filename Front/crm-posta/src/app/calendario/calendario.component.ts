import { Component, OnInit } from '@angular/core';
import { CalendarioServiceService } from './calendario-service.service';
import { AuthService } from '../auth/auth.service';
import { Usuario } from '../usuario/usuario';
import { Calendario } from './calendario';
import esLatamLocale from './es-latam-locale';
import { ClientService } from '../client/client.service';
import { Client } from '../client/client';

import { Calendar, CalendarOptions, EventClickArg, EventInput  } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import esLocale from '@fullcalendar/core/locales/es';

import { NgbModal, ModalDismissReasons, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateClickArg } from '@fullcalendar/interaction';
import { utcToZonedTime, format } from 'date-fns-tz';



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  usuario: Usuario;
  cliente: Client;
  clientes: Client[];
  nuevaHora: string = '';
  nuevoEvento: Calendario = {
    id: 0,
    fecha: new Date(),
    
    titulo: '',
    contenido: '',
    usuario: null,
    cliente: null
  };

  closeResult = '';
  modalDetallesEvento: string = '';

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, bootstrap5Plugin,timeGridPlugin, listPlugin],
    themeSystem: 'standard',
    locale: esLocale,
    firstDay: 0,
    titleFormat: {
      month: 'long',
      year: 'numeric'
    },
    // Agrega tus eventos aquí, si los tienes
    events: [],
    fixedWeekCount: false,
    //  dateClick: this.handleDateClick.bind(this),
     headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' // Agrega las vistas que deseas mostrar
  }

  };

  calendar: any; // Variable para mantener una referencia al objeto del calendario

  handleCalendarInit(calendar: any) {
    this.calendar = calendar;
  }

  constructor(private modalService: NgbModal,
    private calendarioService: CalendarioServiceService,
    private authService: AuthService,
    private clienteService: ClientService) { }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // 
  getAllCalendariosByUserId() {
    this.usuario = this.authService.devolverUsuario();
    console.log(this.usuario);
    this.calendarioService.getAllCalendariosByUserId(this.usuario.id).subscribe((calendarios) => {
        console.log('Calendarios del usuario:', calendarios);
        this.calendarOptions.events = calendarios.map((calendario) => {
          
          const fechaHoraUTC = new Date(calendario.fecha);
          const fechaHoraZonaHoraria = utcToZonedTime(fechaHoraUTC, 'America/Bogota');
  
          const fechaHora = format(fechaHoraZonaHoraria, 'dd/MM/yyyy HH:mm', {
            timeZone: 'America/Bogota'
          });
  
          return {
            title: calendario.titulo,
            start: fechaHoraZonaHoraria,
            cliente: calendario.cliente,
            contenido: calendario.contenido,
            hora: fechaHora,
            // Otras propiedades del evento según sea necesario
          };
        });
      });
  }
 

  
  ngOnInit(): void {
    this.buscarCliente();

    this.getAllCalendariosByUserId();
    // this.calendarOptions.dateClick = this.handleDateClick.bind(this);
    
  }

  buscarCliente() {
    this.clienteService.clienteListarTodos().subscribe(listas => {
      this.clientes = listas;
      console.log(listas);
    });


  }
  crearEvento() {
    this.usuario = this.authService.devolverUsuario();
    this.nuevoEvento.usuario = this.usuario;
  
    // Combina la fecha y la hora seleccionada para crear la fecha completa del evento
    const fechaHoraEvento = new Date(this.nuevoEvento.fecha);
    const horaMinutos = this.nuevaHora.split(':');
    fechaHoraEvento.setHours(Number(horaMinutos[0]));
    fechaHoraEvento.setMinutes(Number(horaMinutos[1]));
  
    this.nuevoEvento.fecha = fechaHoraEvento;
  
    // Envía el evento con la fecha y hora incorporada a la propiedad fecha
    this.calendarioService.crearEvento(this.nuevoEvento).subscribe((calendarioCreado) => {
      console.log('Evento creado:', calendarioCreado);
      this.modalService.dismissAll();
      this.getAllCalendariosByUserId();
  
      // Reinicia el nuevoEvento para el próximo evento
      this.nuevoEvento = {
        id: 0,
        fecha: new Date(),
  
        titulo: '',
        contenido: '',
        usuario: null,
        cliente: null
      };
  
      // Limpia la nuevaHora después de crear el evento
      this.nuevaHora = '';
    });
  }
  
//   handleDateClick(arg) {
//  console.log('Fecha clickeada:', arg.date);
//    this.mostrarEventosDelDia(arg.date);
//   }
  
  //  mostrarEventosDelDia(fecha: Date) {
  //    const eventosDelDia = [];
  //    for (const evento of this.calendarOptions.events) {
  //      const eventoFecha = new Date(evento.start);
  //      if (eventoFecha.toDateString() === fecha.toDateString()) {
  //        eventosDelDia.push(evento);
  //      }
  //    }
  
  //    const modalContent = this.generarContenidoModalEventos(eventosDelDia);
  //    this.abrirModalConContenido(modalContent);
  //  }

  //Esto es del Juanma desde aca
 /* mostrarDetallesEvento(eventoClickeado: any) {
    const detallesEventoDiv = document.getElementById('detallesEvento');
    detallesEventoDiv.innerHTML = `
      <h4>${eventoClickeado.title}</h4>
      <p><strong>Fecha de inicio:</strong> ${eventoClickeado.start}</p>
      <p><strong>Cliente:</strong> ${eventoClickeado.cliente?.name} ${eventoClickeado.cliente?.lastName}</p>
      <p><strong>Contenido:</strong> ${eventoClickeado.contenido}</p>
      <!-- Puedes mostrar más detalles según las propiedades adicionales del evento -->
    `;
    
  }




//Aca esta todo para mostrar lo que hay al hacer click en el evento
  cargarCalendarios() {
    this.getAllCalendariosByUserId();
  }
  ngAfterViewInit(): void {
    this.cargarCalendarios();
  }
  // Método para mostrar detalles del evento en un modal
 */
//hasta aca del Juanma

  // Implementa estas funciones si no lo has hecho ya
  generarContenidoModalEventos(eventosDelDia: any[]) {
    // Genera el contenido HTML para mostrar los eventos en el modal
    let contenido = '<ul>';
    eventosDelDia.forEach(evento => {
      contenido += `<li>${evento.title} - Hora: ${evento.hora}</li>`;
    });
    contenido += '</ul>';
    return contenido;
  }
  abrirModalConContenido(contenido: string) {
    const modalRef = this.modalService.open('', { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.modalDetallesEvento = contenido;
  }
  
  
  

}
