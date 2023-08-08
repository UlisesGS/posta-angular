import { Component, OnInit } from '@angular/core';
import { PlanFinancieroService } from '../../plan-financiero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { Client } from 'src/app/client/client';
import { Process } from 'src/app/procesos/Process';
import { Inversion } from '../../Inversion';
import { PlanInversion } from '../../PlanInversion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-inversion',
  templateUrl: './plan-inversion.component.html',
  styleUrls: ['./plan-inversion.component.css']
})
export class PlanInversionComponent implements OnInit {

  /*activosFijos: any[] = []; // Inicializa la lista vacía o con elementos existentes
  maquinaria: any[] = [];
  muebles: any[] = [];
  vehiculos: any[] = [];*/
  cliente: Client = new Client();
  procesos: Process[] = []
  proceso: Process = new Process();
  activoFijo: Inversion = new Inversion();
  activosFijos: Inversion[] = [];
  maquinarias: Inversion[] = [];
  maquinaria: Inversion = new Inversion();
  muebles: Inversion[] = [];
  mueble: Inversion = new Inversion();
  vehiculos: Inversion[] = [];
  vehiculo: Inversion = new Inversion();
  planDeInversion: PlanInversion = new PlanInversion();
  constructor(
    private planFinancialService: PlanFinancieroService,
    private rutaParametro: ActivatedRoute,
    private clienteService: ClientService,
    private procesoService: ProcesoService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      let idEditar=+parametro.get('idEditar');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          this.procesoService.procesosFindAll().subscribe(pro => {
            this.procesos = pro;

            this.procesos.forEach(proceso => {
              if (proceso.canvasModel.client.id == this.cliente.id) {
                this.proceso = proceso;



              }

            })
          })

        })
      }
      if(idEditar){
        this.procesoService.procesosFindById(idEditar).subscribe(data=>{
          this.proceso= data;
          this.planDeInversion= this.proceso.businessPlanFinancial.planInversion;

        })
      }
    })
  }
  eliminarActivo(a:Inversion){
    this.planDeInversion.activoFijo= this.planDeInversion.activoFijo.filter(f=>f!=a);
    this.activosFijos = this.activosFijos.filter(activo=>activo!=a);
  }
  eliminarMaquinaria(a:Inversion){
    this.planDeInversion.maquinariaEquipo= this.planDeInversion.maquinariaEquipo.filter(f=>f!=a);
    this.maquinarias = this.maquinarias.filter(activo=>activo!=a);
  }
  eliminarMueble(a:Inversion){

    this.planDeInversion.maquinariaEquipo= this.planDeInversion.maquinariaEquipo.filter(f=>f!=a);
    this.maquinarias = this.maquinarias.filter(activo=>activo!=a);
  }
  eliminarVehiculo(a:Inversion){

    this.planDeInversion.vehiculos= this.planDeInversion.vehiculos.filter(f=>f!=a);
    this.vehiculos = this.vehiculos.filter(activo=>activo!=a);
  }

  agregarActivo() {
    this.activoFijo.creditoRequerido = 0;
    this.activoFijo.totalCredito();
    this.activosFijos.push(this.activoFijo);
    this.activoFijo = new Inversion();
    this.planDeInversion.activoFijo = this.activosFijos;
    this.planDeInversion.activoCredito = 0;
    this.planDeInversion.activoPropio = 0;
    this.planDeInversion.activoInvesion = 0;
    this.planDeInversion.fijo();
    this.planDeInversion.totalPropio = 0;
    this.planDeInversion.totalInversion = 0;
    this.planDeInversion.totalCredito = 0;
    this.planDeInversion.calculoTotal();
    //this.activosFijos.push();

  }
  agregarMaquinaria() {
    this.maquinaria.creditoRequerido = 0;
    this.maquinaria.totalCredito();
    this.maquinarias.push(this.maquinaria);
    this.maquinaria = new Inversion();
    this.planDeInversion.maquinariaEquipo = this.maquinarias;
    this.planDeInversion.maquinariaPropio = 0;
    this.planDeInversion.maquinariaInversion = 0;
    this.planDeInversion.maquinariaCredito = 0;
    this.planDeInversion.maquinaria();
    this.planDeInversion.totalPropio = 0;
    this.planDeInversion.totalInversion = 0;
    this.planDeInversion.totalCredito = 0;
    this.planDeInversion.calculoTotal();
    //this.activosFijos.push();

  }
  agregarMuebles() {
    this.mueble.creditoRequerido = 0;
    this.mueble.totalCredito();
    this.muebles.push(this.mueble);
    this.mueble = new Inversion();
    this.planDeInversion.mueblesEnseres = this.muebles;
    this.planDeInversion.mueblesPropio = 0;
    this.planDeInversion.mueblesInversion = 0;
    this.planDeInversion.muebleCredito = 0;
    this.planDeInversion.muebles();
    this.planDeInversion.totalPropio = 0;
    this.planDeInversion.totalInversion = 0;
    this.planDeInversion.totalCredito = 0;
    this.planDeInversion.calculoTotal();
    //this.activosFijos.push();

  }
  agregarVehiculos() {
    this.vehiculo.creditoRequerido = 0;
    this.vehiculo.totalCredito();
    this.vehiculos.push(this.vehiculo);
    this.planDeInversion.vehiculos = this.vehiculos;
    this.vehiculo = new Inversion();
    this.planDeInversion.vehiculosPropio = 0;
    this.planDeInversion.vehiculosInversion = 0;
    this.planDeInversion.vehiculosCredito = 0;
    this.planDeInversion.vehiculoss();
    this.planDeInversion.totalPropio = 0;
    this.planDeInversion.totalInversion = 0;
    this.planDeInversion.totalCredito = 0;
    this.planDeInversion.calculoTotal();

    //this.activosFijos.push();

  }


  public guardarYsalir() {
    if(!this.proceso.businessPlanFinancial.planInversion){
      this.proceso.businessPlanFinancial.planInversion=new PlanInversion();
    }

   // this.proceso.businessPlanFinancial.planInversion=new PlanInversion();
    /*
    this.proceso.businessPlanFinancial.planInversion.activoFijo=this.activosFijos;
    this.proceso.businessPlanFinancial.planInversion.maquinariaEquipo=this.maquinarias;
    this.proceso.businessPlanFinancial.planInversion.mueblesEnseres=this.muebles;
    this.proceso.businessPlanFinancial.planInversion.vehiculos=this.vehiculos;
    */
   this.proceso.businessPlanFinancial.planInversion= this.planDeInversion;
   console.log(this.proceso);


    this.proceso.estado='Plan Financiero finalizado';

    this.procesoService.procesosUpdate(this.proceso).subscribe(data1=>{
      console.log(data1);

    })
    this.planFinancialService.inversionPut(this.proceso.businessPlanFinancial).subscribe(data=>{
      console.log(data);

    this.router.navigate(['/procesos'])
    Swal.fire('Exito', 'Plan Financiero creado con exito', 'success');

    })

  }
  public guardar() {
    if(!this.proceso.businessPlanFinancial.planInversion){
      this.proceso.businessPlanFinancial.planInversion=new PlanInversion();
    }
    this.proceso.businessPlanFinancial.planInversion= this.planDeInversion;


   // this.proceso.businessPlanFinancial.planInversion.activoFijo=this.activosFijos;
   // this.proceso.businessPlanFinancial.planInversion.maquinariaEquipo=this.maquinarias;
    //this.proceso.businessPlanFinancial.planInversion.mueblesEnseres=this.muebles;
    //this.proceso.businessPlanFinancial.planInversion.vehiculos=this.vehiculos;
   console.log(this.proceso);


    this.proceso.estado='Plan Financiero finalizado';

    this.procesoService.procesosUpdate(this.proceso).subscribe(data1=>{
      console.log(data1);

    })
    this.planFinancialService.inversionPut(this.proceso.businessPlanFinancial).subscribe(data=>{
      console.log(data);

    this.router.navigate(['/procesos'])
    Swal.fire('Exito', 'Plan Financiero creado con exito', 'success');

    })

  }

}
