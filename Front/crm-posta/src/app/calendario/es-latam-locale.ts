const defaultLocaleConfig = {
  code: 'es-latam',
  week: {
    dow: 0, // Lunes como primer día de la semana (0: domingo, 1: lunes, etc.)
    doy: 4, // La semana que contiene el 4 de enero es la primera semana del año
  },
  buttonText: {
    prev: 'Anterior',
    next: 'Siguiente',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    list: 'Agenda',
  },
  weekText: 'Semana', // Etiqueta para la vista semanal
  allDayText: 'Todo el día',
  moreLinkText: 'más',
  noEventsText: 'No hay eventos para mostrar',
  viewTitleFormat: function(options) {
    // Puedes usar options.date para obtener la fecha actual y personalizar el título
    const year = options.date.getFullYear();
    const month = options.date.toLocaleString('es-latam', { month: 'long' }).toUpperCase();
    return `${month} ${year}`;
  },
  // Agrega la opción viewTitleFormat para dar formato al título de la vista
  
};

export default defaultLocaleConfig;