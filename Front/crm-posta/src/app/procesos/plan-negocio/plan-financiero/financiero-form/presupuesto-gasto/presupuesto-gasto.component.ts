import { Component } from '@angular/core';

@Component({
  selector: 'app-presupuesto-gasto',
  templateUrl: './presupuesto-gasto.component.html',
  styleUrls: ['./presupuesto-gasto.component.css']
})
export class PresupuestoGastoComponent {
  materiaPrima: any[] = []; // Inicializa la lista vacía o con elementos existentes
  materiaPrima1: any[] = [];
  materiaPrima2: any[] = [];

  operativos:any[]=[];
  administrativos:any[]=[];
  ventas:any[]=[];

  agregarFila() {
    this.materiaPrima.push({ nombre: '', ventas: '' });
  }
  agregarFila1() {
    this.materiaPrima1.push({ nombre: '', ventas: '' });
  }
  agregarFila2() {
    this.materiaPrima2.push({ nombre: '', ventas: '' }); 
  }

  agregarCostoOperativo() {
    this.operativos.push({ nombre: '', ventas: '' });
  }
  agregarGastoAdministrativo() {
    this.administrativos.push({ nombre: '', ventas: '' });
  }
  agregarGastoVenta() {
    this.ventas.push({ nombre: '', ventas: '' });
  }
  


}
