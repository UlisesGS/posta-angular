import { Component } from '@angular/core';

@Component({
  selector: 'app-presupuesto-ventas',
  templateUrl: './presupuesto-ventas.component.html',
  styleUrls: ['./presupuesto-ventas.component.css']
})
export class PresupuestoVentasComponent {
  elementos: any[] = []; // Inicializa la lista vacía o con elementos existentes

  agregarFila() {
    this.elementos.push({ nombre: '', ventas: '' });
  }
}
