import { Component, OnInit} from '@angular/core';
import { CalendarioServiceService } from './calendario-service.service';
import { AuthService } from '../auth/auth.service';
import { Usuario } from '../usuario/usuario';
import { Calendario } from './calendario';
import esLatamLocale from './es-latam-locale';
import { ClientService } from '../client/client.service';
import { Client } from '../client/client';

import { Calendar, CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import esLocale from '@fullcalendar/core/locales/es';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit{
  usuario:Usuario;
  cliente:Client;
  clientes:Client[];

  nuevoEvento: Calendario = {
    id: 0,
    fecha: new Date(),
    titulo: '',
    contenido: '',
    usuario: null,
    cliente: null 
  };

  closeResult = '';

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, bootstrap5Plugin],
    themeSystem: 'standard',
    locale: esLocale,
    firstDay: 0,
    titleFormat: {
      month: 'long',
      year: 'numeric'
    },
    // Agrega tus eventos aquí, si los tienes
    events: [],
    fixedWeekCount: false
    
  };

  calendar: any; // Variable para mantener una referencia al objeto del calendario

  handleCalendarInit(calendar: any) {
    this.calendar = calendar;
  }
   
  constructor(private modalService:NgbModal,
    private calendarioService:CalendarioServiceService,
    private authService:AuthService,
    private clienteService:ClientService){}

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
    
    getAllCalendariosByUserId() {
      this.usuario=this.authService.devolverUsuario();
      this.calendarioService.getAllCalendariosByUserId(this.usuario.id).subscribe((calendarios) => {
        console.log('Calendarios del usuario:', calendarios);
        this.calendarOptions.events = calendarios.map((calendario) => ({
          title: calendario.titulo,
          start: calendario.fecha,
          cliente: calendario.cliente,
          contenido:calendario.contenido,
          // Puedes agregar más propiedades del evento aquí según tus necesidades
        }));
        // Aquí puedes hacer algo con los calendarios devueltos, por ejemplo, mostrarlos en una lista
      });
    }
    crearEvento() {
      this.usuario=this.authService.devolverUsuario();
      this.nuevoEvento.usuario=this.usuario;
    
    this.calendarioService.crearEvento(this.nuevoEvento).subscribe((calendarioCreado) => {
      console.log('Evento creado:', calendarioCreado);
      this.getAllCalendariosByUserId(); // Vuelve a cargar los calendarios después de crear el evento
    });
  }
  ngOnInit(): void {
    this.buscarCliente();

    this.getAllCalendariosByUserId();
  }

  buscarCliente(){
    this.clienteService.clienteListarTodos().subscribe(listas=>{
      this.clientes=listas;
      console.log(listas);
    });
    
    
  }
  handleEventClick(eventClickInfo: EventClickArg) {
    // Accede a la información del evento clickeado
    const eventoClickeado = eventClickInfo.event;
    
    // Aquí puedes mostrar la información del evento en el mismo modal que contiene el calendario
    // Por ejemplo, puedes mostrar los detalles del evento en un <div> dentro del modal
    this.mostrarDetallesEvento(eventoClickeado);
  }

  mostrarDetallesEvento(eventoClickeado: any) {
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
 
}
