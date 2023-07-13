import { Component, OnInit } from '@angular/core';
import { BusinessPlanFinancial } from './../../BusinessPlanFinancial';
import { PlanFinancieroService } from './../../plan-financiero.service';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { Client } from 'src/app/client/client';
import { Process } from 'src/app/procesos/Process';
import { EstructuraMercado } from '../../EstructuraMercado';
import { CiclicidadVentas } from './../../CiclicidadVentas';
import { PresupuestoVenta } from './../../PresupuestoVenta';

@Component({
  selector: 'app-presupuesto-ventas',
  templateUrl: './presupuesto-ventas.component.html',
  styleUrls: ['./presupuesto-ventas.component.css']
})
export class PresupuestoVentasComponent implements OnInit {

  producto:string;
  cantidad:number;
  productos:string[];
  cantidades:number[];
  elementos: any[] = []; // Inicializa la lista vacía o con elementos existentes
  businessPlanFinancial:BusinessPlanFinancial= new BusinessPlanFinancial();
  cliente:Client= new Client();
  procesos:Process[]=[];
  proceso:Process= new Process;
  estructuraMercados:EstructuraMercado[]=[];
  estructuraMercado:EstructuraMercado = new EstructuraMercado();
  ciclicidad:CiclicidadVentas= new CiclicidadVentas();
  ciclicidadVentas:CiclicidadVentas[]=[];
  presupuestoVenta:PresupuestoVenta= new PresupuestoVenta()
  constructor(
    private planFinancieroService:PlanFinancieroService,
    private rutaParametro:ActivatedRoute,
    private clienteService:ClientService,
    private procesoService:ProcesoService,

    ){}
  ngOnInit(): void {
this.estructuraMercado.cantidad
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          console.log(data);
          this.procesoService.procesosFindAll().subscribe(pro => {
            this.procesos=pro;

            this.procesos.forEach(proceso=>{
              if(proceso.canvasModel.client.id==this.cliente.id){
                this.proceso=proceso;
                console.log(this.proceso);

              }
            })
          })

        })
      }
    })
  }
  agregarFila() {
    this.estructuraMercado= new EstructuraMercado()
this.estructuraMercado.cantidad=this.cantidad;
this.estructuraMercado.producto=this.producto;
   // this.elementos.push({ nombre: '', ventas: '' });
this.presupuestoVenta.addElementos(this.estructuraMercado);
console.log(this.presupuestoVenta);


   }



//console.log(this.estructuraMercados);



/*

   this.estructuraMercado.cantidad=this.cantidad[];
   this.estructuraMercado.producto=this.producto[];
    this.businessPlanFinancial.presupuestoVenta.estructuraMercado.push(this.estructuraMercado);
    */

  public guardar(){
console.log(this.businessPlanFinancial);

  }
  public guardarYsalir(){
    console.log(this.businessPlanFinancial);
  }
}
