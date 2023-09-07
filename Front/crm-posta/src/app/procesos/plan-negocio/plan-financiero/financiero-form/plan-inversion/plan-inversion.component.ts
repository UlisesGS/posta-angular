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
  idVer:number;
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
      this.idVer =+parametro.get('idVer1');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          this.procesoService.procesosFindAll().subscribe(pro => {
            this.procesos = pro;

            this.procesos.forEach(proceso => {
              if (proceso?.canvasModel?.client?.id == this.cliente.id) {
                this.proceso = proceso;
              }

            })
          })

        })
      }
      if(idEditar){
        
        this.procesoService.procesosFindById(idEditar).subscribe(data=>{
          this.proceso= data;
          this.planDeInversion = new PlanInversion()
          this.planDeInversion= this.proceso.businessPlanFinancial.planInversion;
          this.activosFijos=this.proceso.businessPlanFinancial.planInversion.activoFijo

        })
      }
      if(this.idVer){
        this.procesoService.procesosFindById(this.idVer).subscribe(data=>{
          this.proceso= data;
          this.planDeInversion = new PlanInversion()
          this.planDeInversion= this.proceso.businessPlanFinancial.planInversion;
          this.activosFijos=this.proceso.businessPlanFinancial.planInversion.activoFijo
      
          

        })
      }
    })
  }
  eliminarActivo(a:Inversion){
    console.log(a);
    console.log(this.planDeInversion);
    console.log(this.activosFijos);
    
    this.planDeInversion.activoPropio-=a.aportesPropios;
    this.planDeInversion.activoInvesion-=a.inversionRequerida;
    this.planDeInversion.activoCredito-=a.creditoRequerido;
   // this.planDeInversion.calculoTotal;
   this.calculoTotal()
    this.planDeInversion.activoFijo= this.planDeInversion.activoFijo.filter(f=>f!=a);
    this.activosFijos = this.activosFijos.filter(activo=>activo!=a);
  }
  eliminarMaquinaria(a:Inversion){
    this.planDeInversion.maquinariaPropio-=a.aportesPropios;
    this.planDeInversion.maquinariaInversion-=a.inversionRequerida;
    this.planDeInversion.maquinariaCredito-=a.creditoRequerido;
    this.calculoTotal()
    this.planDeInversion.maquinariaEquipo= this.planDeInversion.maquinariaEquipo.filter(f=>f!=a);
    this.maquinarias = this.maquinarias.filter(activo=>activo!=a);
  }
  eliminarMueble(a:Inversion){
    this.planDeInversion.mueblesPropio-=a.aportesPropios;
    this.planDeInversion.mueblesInversion-=a.inversionRequerida;
    this.planDeInversion.muebleCredito-=a.creditoRequerido;
    this.calculoTotal()
    this.planDeInversion.mueblesEnseres= this.planDeInversion.mueblesEnseres.filter(f=>f!=a);
    this.muebles = this.muebles.filter(activo=>activo!=a);
  }
  eliminarVehiculo(a:Inversion){
    this.planDeInversion.vehiculosPropio-=a.aportesPropios;
    this.planDeInversion.vehiculosInversion-=a.inversionRequerida;
    this.planDeInversion.vehiculosCredito-=a.creditoRequerido;
    this.calculoTotal()
    this.planDeInversion.vehiculos= this.planDeInversion.vehiculos.filter(f=>f!=a);
    this.vehiculos = this.vehiculos.filter(activo=>activo!=a);
  }

  

  agregarActivo() {
    this.activoFijo.creditoRequerido = 0;
    this.activoFijo.totalCredito;
    this.activosFijos.push(this.activoFijo);
    this.activoFijo = new Inversion();
    this.planDeInversion.activoFijo = this.activosFijos;
    this.planDeInversion.activoCredito = 0;
    this.planDeInversion.activoPropio = 0;
    this.planDeInversion.activoInvesion = 0;
    //this.planDeInversion.fijo;
    this.fijo();
    this.planDeInversion.totalPropio = 0;
    this.planDeInversion.totalInversion = 0;
    this.planDeInversion.totalCredito = 0;
    this.calculoTotal()
    //this.planDeInversion.calculoTotal;
    //this.activosFijos.push();

  }
  agregarMaquinaria() {

    
    this.maquinaria.creditoRequerido = 0;
    this.maquinaria.totalCredito;
    this.maquinarias.push(this.maquinaria);
    this.maquinaria = new Inversion();
    this.planDeInversion.maquinariaEquipo = this.maquinarias;
    this.planDeInversion.maquinariaPropio = 0;
    this.planDeInversion.maquinariaInversion = 0;
    this.planDeInversion.maquinariaCredito = 0;
    this.maquinariaCalculo()
    this.planDeInversion.totalPropio = 0;
    this.planDeInversion.totalInversion = 0;
    this.planDeInversion.totalCredito = 0;
    this.calculoTotal()
    //this.activosFijos.push();

  }
  agregarMuebles() {
    this.mueble.creditoRequerido = 0;
    this.mueble.totalCredito;
    this.muebles.push(this.mueble);
    this.mueble = new Inversion();
    this.planDeInversion.mueblesEnseres = this.muebles;
    this.planDeInversion.mueblesPropio = 0;
    this.planDeInversion.mueblesInversion = 0;
    this.planDeInversion.muebleCredito = 0;
    this.mueblesCalculos()
    this.planDeInversion.totalPropio = 0;
    this.planDeInversion.totalInversion = 0;
    this.planDeInversion.totalCredito = 0;
    this.calculoTotal()
    //this.activosFijos.push();

  }
  agregarVehiculos() {
    this.vehiculo.creditoRequerido = 0;
    this.vehiculo.totalCredito;
    this.vehiculos.push(this.vehiculo);
    this.planDeInversion.vehiculos = this.vehiculos;
    this.vehiculo = new Inversion;
    this.planDeInversion.vehiculosPropio = 0;
    this.planDeInversion.vehiculosInversion = 0;
    this.planDeInversion.vehiculosCredito = 0;
   this.vehiculosCalculos()
    this.planDeInversion.totalPropio = 0;
    this.planDeInversion.totalInversion = 0;
    this.planDeInversion.totalCredito = 0;
    this.calculoTotal()

    //this.activosFijos.push();

  }


  public guardarYsalir() {
    let condFijo:boolean=false;
    let condMaquina:boolean=false;
    let condMueble:boolean=false;
    let condVehiculo:boolean=false;
    if(!this.planDeInversion.activoFijo){
      condFijo=true;
    }
    if(!this.planDeInversion.maquinariaEquipo){
      condMaquina=true;
    }
    if(!this.planDeInversion.mueblesEnseres){
      condMueble=true;
    }
    if(!this.planDeInversion.vehiculos){
      condVehiculo=true;
    }

    if(condFijo){
      Swal.fire('ERROR','Activos Fijos Vacio','error');
    }else if(condMaquina){
      Swal.fire('ERROR','Maquinaria y Equipamiento Vacio','error');
    }else if(condMueble){
      Swal.fire('ERROR','Muebles y Enseres Vacio','error');
    }else if(condVehiculo){
      Swal.fire('ERROR','Vehículos Vacio','error');
    }else{
      if(!this.proceso.businessPlanFinancial.planInversion){
        this.proceso.businessPlanFinancial.planInversion=new PlanInversion();
      }
     this.proceso.businessPlanFinancial.planInversion= this.planDeInversion;
      this.proceso.estado='Plan Financiero finalizado';
      this.proceso.estadoAnteriorEmprendedor='Plan Financiero finalizado';
      this.procesoService.procesosUpdate(this.proceso).subscribe(data1=>{
      })
      this.planFinancialService.inversionPut(this.proceso.businessPlanFinancial).subscribe(data=>{
      if(this.idVer){
        Swal.fire('Exito', 'Plan Financiero creado con exito', 'success');
      }else{
        this.router.navigate(['/procesos'])
        Swal.fire('Exito', 'Plan Financiero creado con exito', 'success');
      }
       
      })
    }


    

  }
  public guardar() {

    let condFijo:boolean=false;
    let condMaquina:boolean=false;
    let condMueble:boolean=false;
    let condVehiculo:boolean=false;
    if(!this.planDeInversion.activoFijo){
      condFijo=true;
    }
    if(!this.planDeInversion.maquinariaEquipo){
      condMaquina=true;
    }
    if(!this.planDeInversion.mueblesEnseres){
      condMueble=true;
    }
    if(!this.planDeInversion.vehiculos){
      condVehiculo=true;
    }

    if(condFijo){
      Swal.fire('ERROR','Activos Fijos Vacio','error');
    }else if(condMaquina){
      Swal.fire('ERROR','Maquinaria y Equipamiento Vacio','error');
    }else if(condMueble){
      Swal.fire('ERROR','Muebles y Enseres Vacio','error');
    }else if(condVehiculo){
      Swal.fire('ERROR','Vehículos Vacio','error');
    }else{
      if(!this.proceso.businessPlanFinancial.planInversion){
        this.proceso.businessPlanFinancial.planInversion=new PlanInversion();
      }
      this.proceso.businessPlanFinancial.planInversion= this.planDeInversion;
      this.proceso.estado='Plan Financiero finalizado';
      this.proceso.estadoAnteriorEmprendedor='Plan Financiero finalizado';
      this.procesoService.procesosUpdate(this.proceso).subscribe(data1=>{
      })
      this.planFinancialService.inversionPut(this.proceso.businessPlanFinancial).subscribe(data=>{
      this.router.navigate(['/procesos'])
      Swal.fire('Exito', 'Plan Financiero creado con exito', 'success');
  
      })
    }


   

  }
  public fijo(){
    this.planDeInversion.activoFijo.forEach(fijo=>{
      this.planDeInversion.activoCredito+=fijo.creditoRequerido;
      this.planDeInversion.activoInvesion+=fijo.inversionRequerida;
      this.planDeInversion.activoPropio+=fijo.aportesPropios;

    })
  }
  public maquinariaCalculo(){
    this.planDeInversion.maquinariaEquipo.forEach(equipo=>{
      this.planDeInversion.maquinariaPropio+=equipo.aportesPropios;
      this.planDeInversion.maquinariaInversion+=equipo.inversionRequerida;
      this.planDeInversion.maquinariaCredito+=equipo.creditoRequerido;
    })

  }
  public mueblesCalculos(){
    this.planDeInversion.mueblesEnseres.forEach(enseres=>{
      this.planDeInversion.mueblesPropio+=enseres.aportesPropios;
      this.planDeInversion.mueblesInversion+=enseres.inversionRequerida;
      this.planDeInversion.muebleCredito+=enseres.creditoRequerido;
    })
      }
      public vehiculosCalculos(){
        this.planDeInversion.vehiculos.forEach(v=>{
          this.planDeInversion.vehiculosPropio+=v.aportesPropios;
          this.planDeInversion.vehiculosInversion+=v.inversionRequerida;
          this.planDeInversion.vehiculosCredito+=v.creditoRequerido;
        })
          }
  public calculoTotal(){
      
    this.planDeInversion.totalPropio=(this.planDeInversion.maquinariaPropio+this.planDeInversion.mueblesPropio+this.planDeInversion.vehiculosPropio+this.planDeInversion.activoPropio);
    this.planDeInversion.totalInversion=(this.planDeInversion.maquinariaInversion+this.planDeInversion.mueblesInversion+this.planDeInversion.vehiculosInversion+this.planDeInversion.activoInvesion);
    this.planDeInversion.totalCredito=(this.planDeInversion.totalInversion-this.planDeInversion.totalPropio);
  }
  // calculos de la entidad
  /*
   public fijo(){
    this.activoFijo.forEach(fijo=>{
      this.activoCredito+=fijo.creditoRequerido;
      this.activoInvesion+=fijo.inversionRequerida;
      this.activoPropio+=fijo.aportesPropios;
    })
  }
  public maquinaria(){
    this.maquinariaEquipo.forEach(equipo=>{
      this.maquinariaPropio+=equipo.aportesPropios;
      this.maquinariaInversion+=equipo.inversionRequerida;
      this.maquinariaCredito+=equipo.creditoRequerido;
    })

  }
  public muebles(){
this.mueblesEnseres.forEach(enseres=>{
  this.mueblesPropio+=enseres.aportesPropios;
  this.mueblesInversion+=enseres.inversionRequerida;
  this.muebleCredito+=enseres.creditoRequerido;
})
  }
  public vehiculoss(){
this.vehiculos.forEach(v=>{
  this.vehiculosPropio+=v.aportesPropios;
  this.vehiculosInversion+=v.inversionRequerida;
  this.vehiculosCredito+=v.creditoRequerido;
})
  }
  public calculoTotal(){
    console.log('hola calculo');
    
    this.totalPropio=(this.maquinariaPropio+this.mueblesPropio+this.vehiculosPropio+this.activoPropio);
    this.totalInversion=(this.maquinariaInversion+this.mueblesInversion+this.vehiculosInversion+this.activoInvesion);
    this.totalCredito=(this.totalInversion-this.totalPropio);
  }*/

}
