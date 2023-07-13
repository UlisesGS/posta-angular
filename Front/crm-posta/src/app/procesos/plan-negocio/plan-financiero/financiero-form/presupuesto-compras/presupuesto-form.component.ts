import { Component } from '@angular/core';

@Component({
  selector: 'app-presupuesto-form',
  templateUrl: './presupuesto-form.component.html',
  styleUrls: ['./presupuesto-form.component.css']
})
export class PresupuestoFormComponent {
 
  elementos: any[] = []; // Inicializa la lista vacía o con elementos existentes
  

  agregarFila() {
    this.elementos.push({ nombre: '', ventas: '' });
  }
 
  

}
