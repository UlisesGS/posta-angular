import { Component } from '@angular/core';
import { PlanFinancieroService } from '../../plan-financiero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { Client } from 'src/app/client/client';
import { Process } from 'src/app/procesos/Process';
import { Personal } from '../../Personal';
import { RequerimientosPersonal } from '../../RequerimientosPersonal';
import { OtrosCostos } from '../../OtrosCostos';
import { GastoCosto } from '../../GastoCosto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presupuesto-gasto',
  templateUrl: './presupuesto-gasto.component.html',
  styleUrls: ['./presupuesto-gasto.component.css'],
})
export class PresupuestoGastoComponent {
  materiaPrima1: Personal[] = []; // Inicializa la lista vacía o con elementos existentes
  materia1: Personal = new Personal();
  materiaPrima2: Personal[] = [];
  materia2: Personal = new Personal();
  materiaPrima3: Personal[] = [];
  materia3: Personal = new Personal();

  operativosLista: OtrosCostos[] = [];
  operativos: OtrosCostos = new OtrosCostos();
  administrativosLista: OtrosCostos[] = [];
  administrativos: OtrosCostos = new OtrosCostos();
  ventasLista: OtrosCostos[] = [];
  ventasL: OtrosCostos = new OtrosCostos();

  operativo: RequerimientosPersonal = new RequerimientosPersonal();
  administrativo: RequerimientosPersonal = new RequerimientosPersonal();
  ventas: RequerimientosPersonal = new RequerimientosPersonal();

  cliente: Client = new Client();
  procesos: Process[] = [];
  proceso: Process = new Process();
  idEditar: number;
  gastoCosto: GastoCosto = new GastoCosto();
  idVer:number;

  constructor(
    private planFinancialService: PlanFinancieroService,
    private rutaParametro: ActivatedRoute,
    private clienteService: ClientService,
    private procesoService: ProcesoService,
    private router: Router
  ) {}

  ngOnInit(): void {

    
    this.rutaParametro.paramMap.subscribe((parametro) => {
      let id = +parametro.get('id');
      this.idVer = +parametro.get('idVer1');
      this.idEditar = +parametro.get('idEditar');

      if (id) {
        this.clienteService.getClient(id).subscribe((data) => {
          this.cliente = data;
          this.procesoService.procesosFindAll().subscribe((pro) => {
            this.procesos = pro;

            this.procesos.forEach((proceso) => {
              if (proceso?.canvasModel?.client?.id == this.cliente.id) {
                this.proceso = proceso;
                console.log(proceso);
                if (this.idEditar) {
                  this.gastoCosto= this.proceso.businessPlanFinancial.gastoCosto;
                  this.administrativo =
                    this.proceso.businessPlanFinancial.gastoCosto.administrativo;
                  this.operativo =
                    this.proceso.businessPlanFinancial.gastoCosto.operativo;
                  this.ventas =
                    this.proceso.businessPlanFinancial.gastoCosto.comercialVentas;
                 
                }
                if (this.idVer) {
                  this.gastoCosto= this.proceso.businessPlanFinancial.gastoCosto;
                  this.administrativo =
                    this.proceso.businessPlanFinancial.gastoCosto.administrativo;
                  this.operativo =
                    this.proceso.businessPlanFinancial.gastoCosto.operativo;
                  this.ventas =
                    this.proceso.businessPlanFinancial.gastoCosto.comercialVentas;
                 
                }

              }
            });
          });
        });
      }
    });
  }
  sacarAdministrativo(administrativo: Personal) {
    this.administrativo.personal = this.administrativo.personal.filter(
      (o) => o != administrativo
    );
this.ponerEnCero(this.administrativo);
this.parafiscalesCalculos(this.administrativo);
    console.log(administrativo);

    //this.administrativo.parafiscalesCalculos()
  }
  sacarOperativo(operativo: Personal) {
    this.operativo.personal = this.operativo.personal.filter(
      (o) => o != operativo
    );
    this.ponerEnCero(this.operativo);
    this.parafiscalesCalculos(this.operativo);
    console.log(this.operativo);
    //this.materiaPrima1 = this.materiaPrima1.filter(f=>f!=operativo);

    //this.operativo.parafiscalesCalculos()
  }
  sacarVentas(venta: Personal) {
    this.ventas.personal = this.ventas.personal.filter((o) => o != venta);
    this.ponerEnCero(this.ventas);
    this.parafiscalesCalculos(this.ventas);
    //this.parafiscalesCalculos(this.ventas);
  }
  sacarOperativoCostos(operativoCosto: OtrosCostos) {
    this.operativo.costos = this.operativo.costos.filter(
      (f) => f != operativoCosto
    );
    this.totalCostos(this.operativo);
  //  this.ponerEnCero(this.operativo)
  }
  sacarVentaCostos(ventaCosto: OtrosCostos) {
    console.log(ventaCosto);
    this.ventas.costos = this.ventas.costos.filter((f) => f != ventaCosto);
    this.totalCostos(this.ventas);
  }
  sacarAdministrativoCostos(administrativoCosto: OtrosCostos) {
    console.log(administrativoCosto);

    this.administrativo.costos = this.administrativo.costos.filter(
      (f) => f != administrativoCosto
    );
    this.totalCostos(this.administrativo);
  }
  public parafiscalesCalculos(p:RequerimientosPersonal) {
    p.personal.forEach(personal1=>{
      p.subTotal += personal1.salarioMensual;
      p.subTotalAnual += personal1.salariaAnual;
    })

    //Parafiscales Mensuales
    p.parafiscales = (p.subTotal * 0.04);
    p.seguridadSocial = (p.subTotal * 0.205);
    p.cesantias = (p.subTotal * 0.0833);
    p.interesesCesantias = (p.cesantias * 0.0012);
    p.primaServicios = (p.subTotal * 0.0833);
    p.vacaciones = (p.subTotal * 0.0417);
    // Parafiscales Anuales
    p.totalParafiscales = p.parafiscales * 12;
    p.totalSeguridadSocial = p.seguridadSocial * 12;
    p.totalCesantias = p.cesantias * 12;
    p.totalInteresesCesantias = p.interesesCesantias * 12;
    p.totalPrimaServicios = p.primaServicios * 12;
    p.totalVacaciones = p.vacaciones * 12;
    //Totales sumas
    p.totalMensual = (p.subTotal + p.parafiscales + p.seguridadSocial + p.cesantias + p.interesesCesantias + p.primaServicios + p.vacaciones);
    p.totalAnual = (p.subTotalAnual + p.totalParafiscales + p.totalSeguridadSocial + p.totalCesantias + p.totalInteresesCesantias + p.totalPrimaServicios + p.totalVacaciones);

}

public  totalCostos(r:RequerimientosPersonal){
  r.totalCostoMensual=0 ;
  r.totalCostoAnual=0;
    r.costos.forEach(costo=>{
      r.totalCostoMensual+=costo.gastoMensual;
      r.totalCostoAnual+=costo.gastoAnual;
    })

    }
  ponerEnCero(r: RequerimientosPersonal){



  r.subTotal=0 ;
  r.subTotalAnual=0 ;
  r.parafiscales=0 ;
  r.totalParafiscales=0 ;
  r.seguridadSocial=0 ;
  r.totalSeguridadSocial=0 ;
  r.cesantias=0 ;
  r.totalCesantias=0 ;
  r.interesesCesantias=0 ;
  r.totalInteresesCesantias=0 ;
  r.primaServicios=0 ;
  r.totalPrimaServicios=0 ;
  r.vacaciones=0 ;
  r.totalVacaciones=0 ;
  r.totalMensual=0 ;
  r.totalAnual=0 ;



  }

  agregarFila() {
    console.log(this.operativo);

    this.materia1.anual();

    //this.materiaPrima1.push(this.materia1);
    // console.log(this.materiaPrima1);
    if (this.operativo.personal == null) {
      this.operativo.personal = [];
    }

    this.operativo.personal.push(this.materia1);
    this.materia1 = new Personal();
    this.ponerEnCero(this.operativo);
    this.operativo.subTotal = 0;
    this.operativo.subTotalAnual = 0;

    //console.log(this.operativo);

   this.parafiscalesCalculos(this.operativo);
    this.gastoCosto.operativo = this.operativo;
    console.log(this.gastoCosto);

    // console.log(this.operativo);
  }
  agregarFila1() {
    this.materia2.anual();
    if (this.administrativo.personal == null) {
      this.administrativo.personal = [];
    }

    //this.materiaPrima2.push(this.materia2);

    this.administrativo.personal.push(this.materia2);
    this.materia2 = new Personal();
    this.ponerEnCero(this.administrativo);
    this.administrativo.subTotal = 0;
    this.administrativo.subTotalAnual = 0;
    console.log(this.administrativo);


    this.parafiscalesCalculos(this.administrativo);


    this.gastoCosto.administrativo = this.administrativo;
    console.log(this.gastoCosto);
  }
  agregarFila2() {
    this.materia3.anual();
    if (this.ventas.personal == null) {
      this.ventas.personal = [];
    }
    this.ventas.personal.push(this.materia3);
    this.materia3 = new Personal();
    this.ponerEnCero(this.ventas);
    this.ventas.subTotal = 0;
    this.ventas.subTotalAnual = 0;

    this.parafiscalesCalculos(this.ventas);

    this.gastoCosto.comercialVentas = this.ventas;

    //  this.proceso.businessPlanFinancial.gastoCosto.comercialVentas=this.gastoCosto.comercialVentas;

    console.log(this.gastoCosto);

    this.materia3 = new Personal();
  }







  agregarCostoOperativo() {
    this.operativos.anual();
    if (this.operativo.costos == null) {
      this.operativo.costos = [];
    }
    this.operativo.costos.push(this.operativos);
    this.operativos = new OtrosCostos();
    this.operativo.totalCostoMensual = 0;
    this.operativo.totalCostoAnual = 0;
  this.totalCostos(this.operativo);
    this.gastoCosto.operativo = this.operativo;
  }

  agregarGastoAdministrativo() {
    this.administrativos.anual();
    if (this.administrativo.costos == null) {
      this.administrativo.costos = [];
    }
    this.administrativo.costos.push(this.administrativos);
    this.administrativos = new OtrosCostos();
    this.administrativo.totalCostoMensual = 0;
    this.administrativo.totalCostoAnual = 0;
    this.totalCostos(this.administrativo);
    this.gastoCosto.administrativo = this.administrativo; console.log(this.gastoCosto);
  }

  agregarGastoVenta() {
    this.ventasL.anual();
    if (this.ventas.costos == null) {
      this.ventas.costos = [];
    }
    this.ventas.costos.push(this.ventasL);
    this.ventasL = new OtrosCostos();
    this.ventas.totalCostoMensual = 0;
    this.ventas.totalCostoAnual = 0;

    this.totalCostos(this.ventas);

    this.gastoCosto.comercialVentas = this.ventas;
    console.log(this.gastoCosto);

  }

  public guardarYsalir() {
    this.proceso.businessPlanFinancial.gastoCosto = new GastoCosto();
    let condOper:boolean=false;
    let condAdmi:boolean=false;
    let condVenta:boolean=false;
    let condCostoO:boolean=false;
    let condGastoA:boolean=false;
    let condGastoV:boolean=false;
    if(!this.operativo?.personal){  
      this.operativo.personal=[]
      condOper=true;
    }
    if(!this.administrativo?.personal){
      this.administrativo.personal=[]
      condAdmi=true;
    }
    if(!this.ventas?.personal){
      this.ventas.personal=[]
      condVenta=true;
    }
    if(!this.operativo.costos){
      this.operativo.costos=[]
      condCostoO=true;
    }
    if(!this.administrativo.costos){
      this.administrativo.costos=[]
      condGastoA=true;
    }
    if(!this.ventas.costos){
      this.ventas.costos=[]
      condGastoV=true;
    }

  /*  if(condOper){
    //  Swal.fire('ERROR','Personal Operativo Vacio','error');
    this.operativo.personal=[]
    }else if(condAdmi){
    //  Swal.fire('ERROR','Personal Administrativo Vacio','error');
    this.administrativo.personal=[]
    }else if(condVenta){
    //  Swal.fire('ERROR','Personal de Ventas Vacio','error');
    this.ventas.personal=[]
    }else if(condCostoO){
      this.operativo.costos=[]
     // Swal.fire('ERROR','Costos Operativos Vacios','error');
    }else if(condGastoA){
      this.administrativo.costos=[]
     // Swal.fire('ERROR','Gastos Administrativos Vacios','error');
    }else if(condGastoV){
      this.ventas.costos=[]
     // Swal.fire('ERROR','Gastos de Ventas Vacios','error');
    }else{*/
      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas =
      this.gastoCosto.comercialVentas;
    this.proceso.businessPlanFinancial.gastoCosto.operativo =
      this.gastoCosto.operativo;
    this.proceso.businessPlanFinancial.gastoCosto.administrativo =
      this.gastoCosto.administrativo;

    console.log(this.proceso);

    this.proceso.estado = 'Presupuesto Gastos/Costos';
    this.proceso.estadoAnteriorEmprendedor = 'Presupuesto Gastos/Costos';

    this.procesoService.procesosUpdate(this.proceso).subscribe((data1) => {
      console.log(data1);
    });
    this.planFinancialService
      .gastosPut(this.proceso.businessPlanFinancial)
      .subscribe((data) => {
        console.log(data);

        this.router.navigate(['/procesos']);
        Swal.fire(
          'Exito',
          'Presupuesto Gastos/Costos creado con exito',
          'success'
        );
      });

    //}

    
  }
  public listaVacia(){
    let condOper:boolean=false;
    let condAdmi:boolean=false;
    let condVenta:boolean=false;
    let condCostoO:boolean=false;
    let condGastoA:boolean=false;
    let condGastoV:boolean=false;
    if(!this.operativo?.personal){  
      this.operativo.personal=[]
      condOper=true;
    }
    if(!this.administrativo?.personal){
      this.administrativo.personal=[]
      condAdmi=true;
    }
    if(!this.ventas?.personal){
      this.ventas.personal=[]
      condVenta=true;
    }
    if(!this.operativo.costos){
      this.operativo.costos=[]
      condCostoO=true;
    }
    if(!this.administrativo.costos){
      this.administrativo.costos=[]
      condGastoA=true;
    }
    if(!this.ventas.costos){
      this.ventas.costos=[]
      condGastoV=true;
    }
  }
  public guardar() {
    this.proceso.businessPlanFinancial.gastoCosto = new GastoCosto();
    
    let condOper:boolean=false;
    let condAdmi:boolean=false;
    let condVenta:boolean=false;
    let condCostoO:boolean=false;
    let condGastoA:boolean=false;
    let condGastoV:boolean=false;
    console.log(this.gastoCosto);
    if(!this.operativo?.personal){  
      console.log(this.gastoCosto);
      this.proceso.businessPlanFinancial.gastoCosto.operativo = new RequerimientosPersonal();
      this.proceso.businessPlanFinancial.gastoCosto.operativo.personal = [];
      let per = new Personal()
      
     this.proceso.businessPlanFinancial.gastoCosto.operativo.subTotal = 0;
     this.proceso.businessPlanFinancial.gastoCosto.operativo.subTotalAnual = 0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.parafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalParafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.seguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalSeguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.cesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.interesesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalInteresesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.primaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalPrimaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.vacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalVacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalMensual=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalAnual=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalCostoMensual=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalCostoAnual=0;
   
   
   per.cargo='SIN INFORMAR'
   per.salarioMensual=0;
   per.salariaAnual=0;

   this.proceso.businessPlanFinancial.gastoCosto.operativo.personal.push(per)

   

   console.log(this.proceso);

      condOper=true;
    }



    
    if(!this.administrativo?.personal){

      this.proceso.businessPlanFinancial.gastoCosto.administrativo = new RequerimientosPersonal();
      this.proceso.businessPlanFinancial.gastoCosto.administrativo.personal = [];
      let per = new Personal()

      this.proceso.businessPlanFinancial.gastoCosto.administrativo.subTotal = 0.0;
     this.proceso.businessPlanFinancial.gastoCosto.administrativo.subTotalAnual = 0.0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.parafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalParafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.seguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalSeguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.cesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.interesesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalInteresesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.primaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalPrimaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.vacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalVacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalMensual=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalAnual=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalCostoMensual=0.0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalCostoAnual=0.0;
   
    per.cargo='SIN INFORMAR'
    per.salarioMensual=0;
    per.salariaAnual=0;

    this.proceso.businessPlanFinancial.gastoCosto.administrativo.personal.push(per)
      condAdmi=true;
      console.log(this.proceso);
    }
    if(!this.ventas?.personal){

      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas = new RequerimientosPersonal();
      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.personal = [];
      let per = new Personal()

      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.subTotal = 0.0;
     this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.subTotalAnual = 0.0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.parafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalParafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.seguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalSeguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.cesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.interesesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalInteresesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.primaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalPrimaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.vacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalVacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalMensual=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalAnual=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalCostoMensual=0.0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalCostoAnual=0.0;
   
    per.cargo='SIN INFORMAR'
    per.salarioMensual=0;
    per.salariaAnual=0;

    this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.personal.push(per)
      condVenta=true;
      console.log(this.proceso);
    }
    if(!this.operativo.costos){
      console.log(this.proceso);
      let co = new OtrosCostos()
      this.proceso.businessPlanFinancial.gastoCosto.operativo.costos = [];
        co.concepto='SINF INFORMAR'
        co.gastoMensual=0;
        co.gastoAnual=0;
        this.proceso.businessPlanFinancial.gastoCosto.operativo.costos.push(co)
      condCostoO=true;
      console.log(this.proceso);
    }
    if(!this.administrativo.costos){
      let co = new OtrosCostos()
      this.proceso.businessPlanFinancial.gastoCosto.administrativo.costos = [];
        co.concepto='SINF INFORMAR'
        co.gastoMensual=0;
        co.gastoAnual=0;
        this.proceso.businessPlanFinancial.gastoCosto.administrativo.costos.push(co)
      condGastoA=true;
      console.log(this.proceso);
    }
    if(!this.ventas.costos){
      let co = new OtrosCostos()
      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.costos = [];
        co.concepto='SINF INFORMAR'
        co.gastoMensual=0;
        co.gastoAnual=0;
        this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.costos.push(co)
      condGastoV=true;
    }

    if(!this.proceso.businessPlanFinancial.gastoCosto.operativo ){
     this.proceso.businessPlanFinancial.gastoCosto.operativo = this.gastoCosto.operativo;
    }
    if(!this.proceso.businessPlanFinancial.gastoCosto.administrativo){
     this.proceso.businessPlanFinancial.gastoCosto.administrativo = this.gastoCosto.administrativo;
    }
    if(!this.proceso.businessPlanFinancial.gastoCosto.comercialVentas){
      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas = this.gastoCosto.comercialVentas;
    }
     /* */
    
      
     console.log(this.proceso);

     this.proceso.estado = 'Presupuesto Gastos/Costos';
     this.proceso.estadoAnteriorEmprendedor = 'Presupuesto Gastos/Costos';

     this.procesoService.procesosUpdate(this.proceso).subscribe((data1) => {
       console.log(data1);
     });

     this.planFinancialService
       .gastosPut(this.proceso.businessPlanFinancial)
       .subscribe((data) => {
         console.log(data);

         this.router.navigate(['inversion/cliente/', this.cliente.id]);
       });
    }
    
    
  




  public editarYsalir() {
   this.listaVacia()
    this.proceso.businessPlanFinancial.gastoCosto = new GastoCosto();


    if(!this.operativo?.personal){  
      console.log(this.gastoCosto);
      this.proceso.businessPlanFinancial.gastoCosto.operativo = new RequerimientosPersonal();
      this.proceso.businessPlanFinancial.gastoCosto.operativo.personal = [];
      let per = new Personal()
      
     this.proceso.businessPlanFinancial.gastoCosto.operativo.subTotal = 0;
     this.proceso.businessPlanFinancial.gastoCosto.operativo.subTotalAnual = 0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.parafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalParafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.seguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalSeguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.cesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.interesesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalInteresesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.primaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalPrimaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.vacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalVacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalMensual=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalAnual=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalCostoMensual=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalCostoAnual=0;
   
   
   per.cargo='SIN INFORMAR'
   per.salarioMensual=0;
   per.salariaAnual=0;

   this.proceso.businessPlanFinancial.gastoCosto.operativo.personal.push(per)

   

   console.log(this.proceso);
    }



    
    if(!this.administrativo?.personal){

      this.proceso.businessPlanFinancial.gastoCosto.administrativo = new RequerimientosPersonal();
      this.proceso.businessPlanFinancial.gastoCosto.administrativo.personal = [];
      let per = new Personal()

      this.proceso.businessPlanFinancial.gastoCosto.administrativo.subTotal = 0.0;
     this.proceso.businessPlanFinancial.gastoCosto.administrativo.subTotalAnual = 0.0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.parafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalParafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.seguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalSeguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.cesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.interesesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalInteresesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.primaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalPrimaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.vacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalVacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalMensual=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalAnual=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalCostoMensual=0.0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalCostoAnual=0.0;
   
    per.cargo='SIN INFORMAR'
    per.salarioMensual=0;
    per.salariaAnual=0;

    this.proceso.businessPlanFinancial.gastoCosto.administrativo.personal.push(per)
      console.log(this.proceso);
    }
    if(!this.ventas?.personal){

      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas = new RequerimientosPersonal();
      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.personal = [];
      let per = new Personal()

      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.subTotal = 0.0;
     this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.subTotalAnual = 0.0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.parafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalParafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.seguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalSeguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.cesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.interesesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalInteresesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.primaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalPrimaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.vacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalVacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalMensual=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalAnual=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalCostoMensual=0.0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalCostoAnual=0.0;
   
    per.cargo='SIN INFORMAR'
    per.salarioMensual=0;
    per.salariaAnual=0;

    this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.personal.push(per)
      console.log(this.proceso);
    }
    if(!this.operativo.costos){
      console.log(this.proceso);
      let co = new OtrosCostos()
      this.proceso.businessPlanFinancial.gastoCosto.operativo.costos = [];
        co.concepto='SINF INFORMAR'
        co.gastoMensual=0;
        co.gastoAnual=0;
        this.proceso.businessPlanFinancial.gastoCosto.operativo.costos.push(co)
      console.log(this.proceso);
    }
    if(!this.administrativo.costos){
      let co = new OtrosCostos()
      this.proceso.businessPlanFinancial.gastoCosto.administrativo.costos = [];
        co.concepto='SINF INFORMAR'
        co.gastoMensual=0;
        co.gastoAnual=0;
        this.proceso.businessPlanFinancial.gastoCosto.administrativo.costos.push(co)
      console.log(this.proceso);
    }
    if(!this.ventas.costos){
      let co = new OtrosCostos()
      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.costos = [];
        co.concepto='SINF INFORMAR'
        co.gastoMensual=0;
        co.gastoAnual=0;
        this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.costos.push(co)
    }

    if(!this.proceso.businessPlanFinancial.gastoCosto.operativo ){
     this.proceso.businessPlanFinancial.gastoCosto.operativo = this.gastoCosto.operativo;
    }
    if(!this.proceso.businessPlanFinancial.gastoCosto.administrativo){
     this.proceso.businessPlanFinancial.gastoCosto.administrativo = this.gastoCosto.administrativo;
    }
    if(!this.proceso.businessPlanFinancial.gastoCosto.comercialVentas){
      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas = this.gastoCosto.comercialVentas;
    }






    this.proceso.businessPlanFinancial.gastoCosto.comercialVentas =
      this.gastoCosto.comercialVentas;
    this.proceso.businessPlanFinancial.gastoCosto.operativo =
      this.gastoCosto.operativo;
    this.proceso.businessPlanFinancial.gastoCosto.administrativo =
      this.gastoCosto.administrativo;
    this.procesoService.procesosUpdate(this.proceso).subscribe((data1) => {
      
    });
    this.planFinancialService
      .gastosPut(this.proceso.businessPlanFinancial)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/procesos']);
        Swal.fire(
          'Exito',
          'Presupuesto Gastos/Costos editado con exito',
          'success'
        );
      });
  }








  public editar() {
    this.listaVacia()
    console.log(this.gastoCosto);
    this.proceso.businessPlanFinancial.gastoCosto = new GastoCosto();
    
    console.log(this.operativo.personal);
    
    if(!this.operativo?.personal){  
      console.log(this.gastoCosto);
      this.proceso.businessPlanFinancial.gastoCosto.operativo = new RequerimientosPersonal();
      this.proceso.businessPlanFinancial.gastoCosto.operativo.personal = [];
      let per = new Personal()
      
     this.proceso.businessPlanFinancial.gastoCosto.operativo.subTotal = 0;
     this.proceso.businessPlanFinancial.gastoCosto.operativo.subTotalAnual = 0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.parafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalParafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.seguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalSeguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.cesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.interesesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalInteresesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.primaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalPrimaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.vacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalVacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalMensual=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalAnual=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalCostoMensual=0;
   this.proceso.businessPlanFinancial.gastoCosto.operativo.totalCostoAnual=0;
   
   
   per.cargo='SIN INFORMAR'
   per.salarioMensual=0;
   per.salariaAnual=0;

   this.proceso.businessPlanFinancial.gastoCosto.operativo.personal.push(per)

   

   console.log(this.proceso);
    }



    
    if(!this.administrativo?.personal){

      this.proceso.businessPlanFinancial.gastoCosto.administrativo = new RequerimientosPersonal();
      this.proceso.businessPlanFinancial.gastoCosto.administrativo.personal = [];
      let per = new Personal()

      this.proceso.businessPlanFinancial.gastoCosto.administrativo.subTotal = 0.0;
     this.proceso.businessPlanFinancial.gastoCosto.administrativo.subTotalAnual = 0.0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.parafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalParafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.seguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalSeguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.cesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.interesesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalInteresesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.primaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalPrimaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.vacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalVacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalMensual=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalAnual=0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalCostoMensual=0.0;
   this.proceso.businessPlanFinancial.gastoCosto.administrativo.totalCostoAnual=0.0;
   
    per.cargo='SIN INFORMAR'
    per.salarioMensual=0;
    per.salariaAnual=0;

    this.proceso.businessPlanFinancial.gastoCosto.administrativo.personal.push(per)
      console.log(this.proceso);
    }
    if(!this.ventas?.personal){

      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas = new RequerimientosPersonal();
      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.personal = [];
      let per = new Personal()

      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.subTotal = 0.0;
     this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.subTotalAnual = 0.0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.parafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalParafiscales=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.seguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalSeguridadSocial=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.cesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.interesesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalInteresesCesantias=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.primaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalPrimaServicios=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.vacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalVacaciones=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalMensual=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalAnual=0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalCostoMensual=0.0;
   this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.totalCostoAnual=0.0;
   
    per.cargo='SIN INFORMAR'
    per.salarioMensual=0;
    per.salariaAnual=0;

    this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.personal.push(per)
      console.log(this.proceso);
    }
    if(!this.operativo.costos){
      console.log(this.proceso);
      let co = new OtrosCostos()
      this.proceso.businessPlanFinancial.gastoCosto.operativo.costos = [];
        co.concepto='SINF INFORMAR'
        co.gastoMensual=0;
        co.gastoAnual=0;
        this.proceso.businessPlanFinancial.gastoCosto.operativo.costos.push(co)
      console.log(this.proceso);
    }
    if(!this.administrativo.costos){
      let co = new OtrosCostos()
      this.proceso.businessPlanFinancial.gastoCosto.administrativo.costos = [];
        co.concepto='SINF INFORMAR'
        co.gastoMensual=0;
        co.gastoAnual=0;
        this.proceso.businessPlanFinancial.gastoCosto.administrativo.costos.push(co)
      console.log(this.proceso);
    }
    if(!this.ventas.costos){
      let co = new OtrosCostos()
      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.costos = [];
        co.concepto='SINF INFORMAR'
        co.gastoMensual=0;
        co.gastoAnual=0;
        this.proceso.businessPlanFinancial.gastoCosto.comercialVentas.costos.push(co)
    }

    if(!this.proceso.businessPlanFinancial.gastoCosto.operativo ){
     this.proceso.businessPlanFinancial.gastoCosto.operativo = this.gastoCosto.operativo;
    }
    if(!this.proceso.businessPlanFinancial.gastoCosto.administrativo){
     this.proceso.businessPlanFinancial.gastoCosto.administrativo = this.gastoCosto.administrativo;
    }
    if(!this.proceso.businessPlanFinancial.gastoCosto.comercialVentas){
      this.proceso.businessPlanFinancial.gastoCosto.comercialVentas = this.gastoCosto.comercialVentas;
    }



    console.log(this.proceso);

    //this.proceso.estado = 'Presupuesto Gastos/Costos';

    this.procesoService.procesosUpdate(this.proceso).subscribe((data1) => {
      console.log(data1);
    });

    this.planFinancialService
      .gastosPut(this.proceso.businessPlanFinancial)
      .subscribe((data) => {
        console.log(data);
if(this.proceso.businessPlanFinancial.planInversion){
  this.router.navigate(['inversion/cliente/', this.cliente.id,'editar',this.proceso.id]);
}else{
  this.router.navigate(['inversion/cliente/', this.cliente.id]);
}

      });
  }
}
