import { Component } from '@angular/core';

@Component({
  selector: 'app-presupuesto-gasto',
  templateUrl: './presupuesto-gasto.component.html',
  styleUrls: ['./presupuesto-gasto.component.css']
})
export class PresupuestoGastoComponent {
  elementos: any[] = []; // Inicializa la lista vacía o con elementos existentes
  elementos1: any[] = [];
  elementos2: any[] = [];

  agregarFila() {
    this.elementos.push({ nombre: '', ventas: '' });
  }
  agregarFila1() {
    this.elementos1.push({ nombre: '', ventas: '' });
  }
  agregarFila2() {
    this.elementos2.push({ nombre: '', ventas: '' });
  }

}
