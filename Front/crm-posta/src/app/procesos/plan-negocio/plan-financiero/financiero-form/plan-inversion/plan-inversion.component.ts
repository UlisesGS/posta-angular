import { Component } from '@angular/core';

@Component({
  selector: 'app-plan-inversion',
  templateUrl: './plan-inversion.component.html',
  styleUrls: ['./plan-inversion.component.css']
})
export class PlanInversionComponent {
  activosFijos: any[] = []; // Inicializa la lista vacía o con elementos existentes
  maquinaria: any[] = [];
  muebles: any[] = [];
  vehiculos:any[]=[];

  agregarActivo() {
    this.activosFijos.push({ nombre: '', ventas: '' });
  }
  agregarMaquinaria() {
    this.maquinaria.push({ nombre: '', ventas: '' });
  }
  agregarMuebles() {
    this.muebles.push({ nombre: '', ventas: '' });
  }
  agregarVehiculos() {
    this.vehiculos.push({ nombre: '', ventas: '' });
  }
}
