import { Component } from '@angular/core';
import { PlanFinancieroService } from '../../plan-financiero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { Client } from 'src/app/client/client';
import { Process } from 'src/app/procesos/Process';

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

  cliente:Client=new Client();
  procesos:Process[]=[];
  proceso:Process= new Process();

  constructor(
    private planFinancieroService:PlanFinancieroService,
    private rutaParametro:ActivatedRoute,
    private clienteService:ClientService,
    private procesoService:ProcesoService,
    private router:Router,
  ){}

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
