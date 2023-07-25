import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { Process } from 'src/app/procesos/Process';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { PresupuestoCompra } from './../../PresupuestoCompra';

import { EstructuraMercado } from '../../EstructuraMercado';
import { EstructuraCompra } from './../../EstructuraCompras';
import { PlanFinancieroService } from '../../plan-financiero.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presupuesto-form',
  templateUrl: './presupuesto-form.component.html',
  styleUrls: ['./presupuesto-form.component.css']
})
export class PresupuestoFormComponent implements OnInit {
  i = 0;
  totalUnitarios: number = 0;
  totalAnuales: number = 0;
  nombreP: string;
  materiaPrima: string[] = [];
  unidadesDeMedida: string[] = [];
  valorUnitario: number[] = [];
  cantidadUnidad: number[] = [];
  totalUnitario: number[] = [];
  cantidadP: number = 0;
  cliente: Client = new Client;
  procesos: Process[] = [];
  proceso: Process = new Process;
  estructuraCompra: EstructuraCompra = new EstructuraCompra()
  estructuraCompra2: EstructuraCompra = new EstructuraCompra()
  estructuraCompras: EstructuraCompra[] = []
  presupuestoCompra: PresupuestoCompra = new PresupuestoCompra();
  constructor(private rutaParametro: ActivatedRoute,
    private clienteService: ClientService,
    private procesoService: ProcesoService,
    private planFinancialService: PlanFinancieroService,
    private router: Router) { }
  ngOnInit(): void {
    //this.presupuestoVenta.ciclicidadVentas= [];
    //  this.estructuraMercado.cantidad
    ;
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      let idEditar = + parametro.get('idEditar');
      if (idEditar) {
        this.procesoService.procesosFindAll().subscribe(data=>{
          this.procesos=data;
          this.procesos.forEach(p => {
            if (p.id == idEditar) {
              this.proceso = p;
              console.log(this.proceso);
              //this.presupuestoCompra= this.proceso.businessPlanFinancial.presupuestoCompra;

            }
          })
        })

      }
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          if (idEditar) {
console.log("estoy editando");

          } else {
console.log('no estoy editando');

            this.procesoService.procesosFindAll().subscribe(pro => {
              this.procesos = pro;

              this.procesos.forEach(proceso => {
                if (proceso.canvasModel.client.id == this.cliente.id) {
                  this.proceso = proceso;

                  proceso.businessPlanFinancial.presupuestoVenta.estructuraMercado.forEach(mercado => {
                    this.crearPresupuestoCompra(mercado);
                    this.cantidadP += 1;
                    console.log(this.cantidadP);

                  })

                }

              })
            })
          }

        })
      }

    })
  }
  //procesos?.businessPlanFinancial?.presupuestoVenta?.estructuraMercado
  elementos: any[] = []; // Inicializa la lista vacía o con elementos existentes

sacarFila(presupuestoCompra:PresupuestoCompra,e:EstructuraCompra){
  console.log(presupuestoCompra);
  console.log(e);



 //this.presupuestoCompra.estructuraCompras=this.proceso.businessPlanFinancial.presupuestoCompra
}
  agregarFila(producto: string) {
    this.totalUnitarios = 0
    this.totalAnuales = 0
    this.proceso.businessPlanFinancial.presupuestoCompra.forEach(compra => {

      if (compra.nombreProcucto == producto) {
        this.nombreP = compra.nombreProcucto

        console.log(this.estructuraCompra);

        console.log(producto);
        //  this.elementos.push({ nombre: '', ventas: '' });


        // this.estructuraCompra= new EstructuraCompra();
        //  this.estructuraCompra.materiaPrima=this.materiaPrima[this.i];
        // this.estructuraCompra.tipo=this.unidadesDeMedida[this.i];
        //   this.estructuraCompra.valorUnitario=this.valorUnitario[this.i];
        //  this.estructuraCompra.cantidadUbnidad=this.cantidadUnidad[this.i];
        compra.total = 0;

        this.estructuraCompra.totalUnitario = this.estructuraCompra.valorUnitario * this.estructuraCompra.cantidadUbnidad;
        //this.estructuraCompra.
        //this.estructuraCompras.push(this.estructuraCompra);
        console.log(compra.estructuraCompras);

        if (compra.estructuraCompras == null) {
          compra.estructuraCompras = [];
        }
        compra.estructuraCompras.push(this.estructuraCompra);
        compra.sacarTotales();





      }
      console.log(this.totalUnitarios);
      console.log(this.totalAnuales);

      this.totalUnitarios += compra.total;
      this.totalAnuales += compra.totalAnual;
      this.i++
      console.log(this.i);

      console.log(`paso ${this.totalUnitarios}`);
      console.log(`pas ${this.totalAnuales}`);
    })

    this.nombreP = this.presupuestoCompra.nombreProcucto
    this.estructuraCompras = [];
    this.estructuraCompra = new EstructuraCompra();




    //this.proceso.businessPlanFinancial.presupuestoCompra.forEach()
    console.log(this.proceso);



  }

  public crearPresupuestoCompra(estructuraMercado: EstructuraMercado) {

    this.presupuestoCompra = new PresupuestoCompra();
    this.presupuestoCompra.cantidadProducto = estructuraMercado.cantidad;
    this.presupuestoCompra.nombreProcucto = estructuraMercado.producto;
    this.presupuestoCompra.tipoProducto = estructuraMercado.tipo;
    this.proceso.businessPlanFinancial.presupuestoCompra.push(this.presupuestoCompra);
    console.log(this.proceso);

  }
  public guardarYsalir() {
    console.log(this.proceso);

    this.proceso.estado = 'Presupuesto Compra';

    this.procesoService.procesosUpdate(this.proceso).subscribe(data1 => {
      console.log(data1);

    })
    this.planFinancialService.comprasPut(this.proceso.businessPlanFinancial).subscribe(data => {
      console.log(data);

      this.router.navigate(['/procesos'])
      Swal.fire('Exito', 'Presupuesto Compra creada con exito', 'success');

    })

  }
  public guardar() {
    console.log(this.proceso);

    this.proceso.estado = 'Presupuesto Compra'

    this.procesoService.procesosUpdate(this.proceso).subscribe(data1 => {
      console.log(data1);

    })

    this.planFinancialService.comprasPut(this.proceso.businessPlanFinancial).subscribe(data => {
      console.log(data);

      this.router.navigate(['gastos/cliente/', this.cliente.id])

    })

  }

}
