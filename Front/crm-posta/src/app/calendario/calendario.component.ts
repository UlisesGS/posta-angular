import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  currentMonth: Date;
  daysOfWeek: string[];
  calendar: any[];

  constructor() {
    this.currentMonth = new Date();
    this.daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    this.calendar = this.generateCalendar(this.currentMonth);
  }

  previousMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1);
    this.calendar = this.generateCalendar(this.currentMonth);
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1);
    this.calendar = this.generateCalendar(this.currentMonth);
  }

  generateCalendar(month: Date) {
    const calendar = [];
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const startDate = new Date(startOfMonth);
    const endDate = new Date(endOfMonth);

    while (startDate <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        const events = this.getEventsForDate(date);
        week.push({ date, month: date.getMonth(), events });
        startDate.setDate(startDate.getDate() + 1);
      }
      calendar.push(week);
    }

    return calendar;
  }

  getEventsForDate(date: Date) {
    // Aquí puedes implementar la lógica para obtener los eventos de tu fuente de datos (API, base de datos, etc.)
    // Por ahora, se utilizan datos de ejemplo estáticos
    const events = [
      { title: 'Evento 1', time: '10:00 AM' },
      { title: 'Evento 2', time: '02:30 PM' }
    ];

    return events;
  }
  seleccion(dia:any){
    console.log(dia);

    Swal.fire('Fecha', `La fecha seleccinada es ${dia.date}`, 'success')

  }
}
