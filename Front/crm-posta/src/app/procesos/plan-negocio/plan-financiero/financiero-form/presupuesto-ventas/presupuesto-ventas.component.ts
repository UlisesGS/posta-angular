import { Component, OnInit } from '@angular/core';
import { BusinessPlanFinancial } from './../../BusinessPlanFinancial';
import { PlanFinancieroService } from './../../plan-financiero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { Client } from 'src/app/client/client';
import { Process } from 'src/app/procesos/Process';
import { EstructuraMercado } from '../../EstructuraMercado';
import { CiclicidadVentas } from './../../CiclicidadVentas';



import { PresupuestoVenta } from './../../PresupuestoVenta';
import Swal from 'sweetalert2';
import { EstructuraCompra } from './../../EstructuraCompras';


@Component({
  selector: 'app-presupuesto-ventas',
  templateUrl: './presupuesto-ventas.component.html',
  styleUrls: ['./presupuesto-ventas.component.css']
})
export class PresupuestoVentasComponent implements OnInit {
  icp1: number = 0;
  icp2: number = 0;
  icp3: number = 0;
  icp4: number = 0;
  valor1 = false;
  valor2 = false;
  valor3 = false;
  valor4 = false;
  valor5 = false;
  valor6 = false;
  valor7 = false;
  valor8 = false;
  valor9 = false;
  valor10 = false;
  valor11 = false;
  valor12 = false;
  enero: number;
  febrero: number;
  marzo: number;
  abril: number;
  mayo: number;
  junio: number;
  julio: number;
  agosto: number;
  septiembre: number;
  octubre: number;
  noviembre: number;
  diciembre: number;
  listaMes: number[] = [];
  totalUnidadesRequeridas: number;
  producto: string;
  cantidad: number;
  productos: string[];
  cantidades: number[];
  elementos: any[] = []; // Inicializa la lista vacía o con elementos existentes
  businessPlanFinancial: BusinessPlanFinancial = new BusinessPlanFinancial();
  cliente: Client = new Client();
  procesos: Process[] = [];
  proceso: Process = new Process();
  estructuraMercados: EstructuraMercado[] = [];
  estructuraMercado: EstructuraMercado = new EstructuraMercado;
  ciclicidad: CiclicidadVentas = new CiclicidadVentas;
  ciclicidadVentas: CiclicidadVentas[] = [];

  presupuestoVenta: PresupuestoVenta = new PresupuestoVenta();

  constructor(
    private planFinancieroService: PlanFinancieroService,
    private rutaParametro: ActivatedRoute,
    private clienteService: ClientService,
    private procesoService: ProcesoService,
    private router: Router,

  ) { }
  ngOnInit(): void {
    this.presupuestoVenta.ciclicidadVentas = [];
    this.estructuraMercado.cantidad
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
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
      let idEditar = +parametro.get('idEditar');
      if (idEditar){
        this.procesoService.procesosFindById(idEditar).subscribe(data=>{
          console.log(data);


          this.proceso= data;
          this.proceso.businessPlanFinancial.presupuestoVenta.ciclicidadVentas.forEach(c=>{
            this.listaMes.push(c.calificacion);
          })
          this.presupuestoVenta=this.proceso.businessPlanFinancial.presupuestoVenta;
          console.log(this.presupuestoVenta);
          this.businessPlanFinancial= this.proceso.businessPlanFinancial;

        })
      }
    })

  }
  agregarFila() {




    this.estructuraMercado = new EstructuraMercado();
    this.estructuraMercado.cantidad = this.cantidad;
    this.estructuraMercado.producto = this.producto;
   // this.estructuraMercados.push(this.estructuraMercado);
   // this.presupuestoVenta.estructuraMercado = this.estructuraMercados;
this.presupuestoVenta.estructuraMercado.push(this.estructuraMercado)
this.cantidad=0;
this,this.producto=""
  }
  sacarItem(estructuraMercado:EstructuraMercado){
    console.log(estructuraMercado);

  //lista = lista.filter(item => item !== elementoAEliminar);
  this.presupuestoVenta.estructuraMercado=this.presupuestoVenta.estructuraMercado.filter(item => item!== estructuraMercado);
  this.cantidad=0;
  this,this.producto=""

}
  //separa miles y dos decimales
  formatNumberWithTwoDecimals(value: number): string {
    const formattedValue = value.toFixed(2); // Redondear a dos decimales
    return Number(formattedValue).toLocaleString(); // Agregar separador de miles
  }

  public llenarHoras() {
console.log(this.presupuestoVenta.estructuraMercado);

    this.presupuestoVenta.totalCapacidadOperario = 0;
    this.presupuestoVenta.totalCapacidadInstalada = 0;
    this.totalUnidadesRequeridas = 0;
    this.presupuestoVenta.totalPrecioUnitario = 0;
    this.presupuestoVenta.totalProductos = 0;
    this.presupuestoVenta.totalPrecioUnitario = 0;
    this.presupuestoVenta.totalTotal = 0;
    this.presupuestoVenta.estructuraMercado.forEach(e => {




      /* esto es una prueba para editar
       this.unidadHoraHombre=(0.99*this.cantidad)/this.horasOperario;
    this.capacidadInstaladaPorOperario=this.horasOperario*this.unidadHoraHombre;
    this.capacidadInstaladaUnidades=this.capacidadInstaladaPorOperario*this.tiempoDecicacion;
    this.precioTotal=this.precioUnitario*this.cantidad;
      */
     // e.calculos();
     e.unidadHoraHombre=(0.99 * e.cantidad/e.horasOperario);
     e.capacidadInstaladaPorOperario= e.horasOperario * e.unidadHoraHombre;
     e.capacidadInstaladaUnidades=e.capacidadInstaladaPorOperario*e.tiempoDecicacion;
     e.precioTotal = e.precioUnitario* e.cantidad;

      console.log(this.presupuestoVenta.totalCapacidadOperario);

      this.presupuestoVenta.totalCapacidadOperario += e.capacidadInstaladaPorOperario;
      this.presupuestoVenta.totalCapacidadInstalada += e.capacidadInstaladaUnidades;
      this.totalUnidadesRequeridas += e.cantidad;
      this.presupuestoVenta.totalProductos += e.cantidad;
      this.presupuestoVenta.totalPrecioUnitario += e.precioUnitario;
      this.presupuestoVenta.totalTotal += e.precioTotal;

    })
if(this.presupuestoVenta.id){

}else{
      this.presupuestoVenta.estructuraMercado.forEach(e => {
   //     e.calculos();

      })

    }
console.log(this.presupuestoVenta.totalCapacidadInstalada);

      console.log(this.presupuestoVenta);

      /* CALCULAR  */
      
  }


compararTipo(){

}


  /* CALCULAR  */
  compararMunicipio(o1: CiclicidadVentas, o2: CiclicidadVentas):boolean{
    this.listaMes

    if(o1 === undefined && o2 === undefined){
      return true;
    }

     return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  public llenarCiclicidad(e: any, mes: string) {
    /*
      this.presupuestoVenta.calculosCiclicidad();
      console.log(this.presupuestoVenta);
  */
    this.ciclicidad = new CiclicidadVentas();
    console.log(e.target.value);
    console.log(mes);

    if (mes === 'enero') {
      this.ciclicidad.calificacion = +e.target.value
      this.ciclicidad.mes = mes;

      this.presupuestoVenta.ciclicidadVentas.forEach(c => {
        if (c.mes == mes) {
          this.presupuestoVenta.totalCalificacion = 0;
          console.log('for each');

          this.valor1 = true;
          c.calificacion = +e.target.value;
          this.presupuestoVenta.ciclicidadVentas[0] = c;
          console.log(this.presupuestoVenta.ciclicidadVentas[0]);

          this.presupuestoVenta.calculosCiclicidad();
        }
      })
      if (this.valor1 == false) {
        console.log('inicial');
        this.presupuestoVenta.ciclicidadVentas.push(this.ciclicidad);
        this.presupuestoVenta.calculosCiclicidad();
      }
    }




    if (mes === 'febrero') {
      this.ciclicidad.calificacion = +e.target.value
      this.ciclicidad.mes = mes;
      this.presupuestoVenta.ciclicidadVentas.forEach(c => {
        if (c.mes == mes) {
          this.presupuestoVenta.totalCalificacion = 0;


          this.valor2 = true;
          c.calificacion = +e.target.value;
          this.presupuestoVenta.ciclicidadVentas[1] = c;
          this.presupuestoVenta.calculosCiclicidad();
        }
      })
      if (this.valor2 == false) {
        console.log('inicial');
        this.presupuestoVenta.ciclicidadVentas.push(this.ciclicidad);
        this.presupuestoVenta.calculosCiclicidad();
      }
    }




    if (mes === 'marzo') {
      this.ciclicidad.calificacion = +e.target.value
      this.ciclicidad.mes = mes;
      this.presupuestoVenta.ciclicidadVentas.forEach(c => {
        if (c.mes == mes) {
          this.presupuestoVenta.totalCalificacion = 0;


          this.valor3 = true;
          c.calificacion = +e.target.value;
          this.presupuestoVenta.ciclicidadVentas[2] = c;
          this.presupuestoVenta.calculosCiclicidad();
        }
      })
      if (this.valor3 == false) {

        this.presupuestoVenta.ciclicidadVentas.push(this.ciclicidad);
        this.presupuestoVenta.calculosCiclicidad();
      }
    }




    if (mes === 'abril') {
      this.ciclicidad.calificacion = +e.target.value
      this.ciclicidad.mes = mes;
      this.presupuestoVenta.ciclicidadVentas.forEach(c => {
        if (c.mes == mes) {
          this.presupuestoVenta.totalCalificacion = 0;


          this.valor4 = true;
          c.calificacion = +e.target.value;
          this.presupuestoVenta.ciclicidadVentas[3] = c;
          this.presupuestoVenta.calculosCiclicidad();
        }
      })
      if (this.valor4 == false) {

        this.presupuestoVenta.ciclicidadVentas.push(this.ciclicidad);
        this.presupuestoVenta.calculosCiclicidad();
      }
    }
    if (mes === 'mayo') {
      this.ciclicidad.calificacion = +e.target.value
      this.ciclicidad.mes = mes;
      this.presupuestoVenta.ciclicidadVentas.forEach(c => {
        if (c.mes == mes) {
          this.presupuestoVenta.totalCalificacion = 0;


          this.valor5 = true;
          c.calificacion = +e.target.value;
          this.presupuestoVenta.ciclicidadVentas[4] = c;
          this.presupuestoVenta.calculosCiclicidad();
        }
      })
      if (this.valor5 == false) {

        this.presupuestoVenta.ciclicidadVentas.push(this.ciclicidad);
        this.presupuestoVenta.calculosCiclicidad();
      }
    }
    if (mes === 'junio') {
      this.ciclicidad.calificacion = +e.target.value
      this.ciclicidad.mes = mes;
      this.presupuestoVenta.ciclicidadVentas.forEach(c => {
        if (c.mes == mes) {
          this.presupuestoVenta.totalCalificacion = 0;


          this.valor6 = true;
          c.calificacion = +e.target.value;
          this.presupuestoVenta.ciclicidadVentas[5] = c;
          this.presupuestoVenta.calculosCiclicidad();
        }
      })
      if (this.valor6 == false) {

        this.presupuestoVenta.ciclicidadVentas.push(this.ciclicidad);
        this.presupuestoVenta.calculosCiclicidad();
      }
    }
    if (mes === 'julio') {
      this.ciclicidad.calificacion = +e.target.value
      this.ciclicidad.mes = mes;
      this.presupuestoVenta.ciclicidadVentas.forEach(c => {
        if (c.mes == mes) {
          this.presupuestoVenta.totalCalificacion = 0;


          this.valor7 = true;
          c.calificacion = +e.target.value;
          this.presupuestoVenta.ciclicidadVentas[6] = c;
          this.presupuestoVenta.calculosCiclicidad();
        }
      })
      if (this.valor7 == false) {

        this.presupuestoVenta.ciclicidadVentas.push(this.ciclicidad);
        this.presupuestoVenta.calculosCiclicidad();
      }
    }
    if (mes === 'agosto') {
      this.ciclicidad.calificacion = +e.target.value
      this.ciclicidad.mes = mes;
      this.presupuestoVenta.ciclicidadVentas.forEach(c => {
        if (c.mes == mes) {
          this.presupuestoVenta.totalCalificacion = 0;


          this.valor8 = true;
          c.calificacion = +e.target.value;
          this.presupuestoVenta.ciclicidadVentas[7] = c;
          this.presupuestoVenta.calculosCiclicidad();
        }
      })
      if (this.valor8 == false) {

        this.presupuestoVenta.ciclicidadVentas.push(this.ciclicidad);
        this.presupuestoVenta.calculosCiclicidad();
      }
    }
    if (mes === 'septiembre') {
      this.ciclicidad.calificacion = +e.target.value
      this.ciclicidad.mes = mes;
      this.presupuestoVenta.ciclicidadVentas.forEach(c => {
        if (c.mes == mes) {
          this.presupuestoVenta.totalCalificacion = 0;


          this.valor9 = true;
          c.calificacion = +e.target.value;
          this.presupuestoVenta.ciclicidadVentas[8] = c;
          this.presupuestoVenta.calculosCiclicidad();
        }
      })
      if (this.valor9 == false) {

        this.presupuestoVenta.ciclicidadVentas.push(this.ciclicidad);
        this.presupuestoVenta.calculosCiclicidad();
      }
    }
    if (mes === 'octubre') {
      this.ciclicidad.calificacion = +e.target.value
      this.ciclicidad.mes = mes;
      this.presupuestoVenta.ciclicidadVentas.forEach(c => {
        if (c.mes == mes) {
          this.presupuestoVenta.totalCalificacion = 0;


          this.valor10 = true;
          c.calificacion = +e.target.value;
          this.presupuestoVenta.ciclicidadVentas[9] = c;
          this.presupuestoVenta.calculosCiclicidad();
        }
      })
      if (this.valor10 == false) {

        this.presupuestoVenta.ciclicidadVentas.push(this.ciclicidad);
        this.presupuestoVenta.calculosCiclicidad();
      }
    }
    if (mes === 'noviembre') {
      this.ciclicidad.calificacion = +e.target.value
      this.ciclicidad.mes = mes;
      this.presupuestoVenta.ciclicidadVentas.forEach(c => {
        if (c.mes == mes) {
          this.presupuestoVenta.totalCalificacion = 0;


          this.valor11 = true;
          c.calificacion = +e.target.value;
          this.presupuestoVenta.ciclicidadVentas[10] = c;
          this.presupuestoVenta.calculosCiclicidad();
        }
      })
      if (this.valor11 == false) {

        this.presupuestoVenta.ciclicidadVentas.push(this.ciclicidad);
        this.presupuestoVenta.calculosCiclicidad();
      }
    }
    if (mes === 'diciembre') {
      this.ciclicidad.calificacion = +e.target.value
      this.ciclicidad.mes = mes;
      this.presupuestoVenta.ciclicidadVentas.forEach(c => {
        if (c.mes == mes) {
          this.presupuestoVenta.totalCalificacion = 0;


          this.valor12 = true;
          c.calificacion = +e.target.value;
          this.presupuestoVenta.ciclicidadVentas[11] = c;
          this.presupuestoVenta.calculosCiclicidad();
        }
      })
      if (this.valor12 == false) {

        this.presupuestoVenta.ciclicidadVentas.push(this.ciclicidad);
        this.presupuestoVenta.calculosCiclicidad();
      }
    }
    // this.ciclicidad = new CiclicidadVentas();

    //  this.ciclicidad.calificacion = +e.target.value;
    //  console.log(`dos ${this.ciclicidad.calificacion}`);

    // this.ciclicidadVentas.push(this.ciclicidad);
    // console.log(`dos ${this.ciclicidadVentas}`);
    // this.presupuestoVenta.ciclicidadVentas.push(this.ciclicidad)
    //  console.log(this.presupuestoVenta.ciclicidadVentas);
    //this.presupuestoVenta.calculosCiclicidad();
    //this.presupuestoVenta.ciclicidadVentas=this.ciclicidadVentas
    console.log(this.presupuestoVenta);


    /*
        this.presupuestoVenta.ciclicidadVentas.forEach(ventas=>{


          /*this.presupuestoVenta.totalCalificacion=();*/

    /*   console.log(`tres ${this.presupuestoVenta.totalCalificacion}`);
     })
     */
    /* this.presupuestoVenta.ciclicidadVentas.forEach(ciclicidadVenta=>{
       ciclicidadVenta.unidadesAño=((ciclicidadVenta.calificacion/this.presupuestoVenta.totalCalificacion)*this.presupuestoVenta.totalProductos);
       ciclicidadVenta.ventasAño=((this.presupuestoVenta.totalTotal*ciclicidadVenta.unidadesAño)/this.presupuestoVenta.totalProductos);
     })*/




  }

  public llenarTipo(e: string) {
    this.estructuraMercado.tipo = e;
    console.log(this.estructuraMercado);
    console.log(`mostrando ${e}`);



  }
  public llenaripc1() {
    let cien: number = 100
    this.icp1 = 0;
    this.icp1 = this.businessPlanFinancial.ipc1 + cien
  }
  public llenaripc2() {
    let cien: number = 100
    this.icp2 = 0;
    this.icp2 = this.businessPlanFinancial.ipc2 + cien
  }
  public llenaripc3() {
    let cien: number = 100
    this.icp3 = 0;
    this.icp3= this.businessPlanFinancial.ipc3 + cien
  }
  public llenaripc4() {
    let cien: number = 100
    this.icp4 = 0;
    this.icp4 = this.businessPlanFinancial.ipc4 + cien
    console.log(this.businessPlanFinancial);

  }

  public guardar() {
    this.proceso.estado = 'Presupuesto Venta';
    console.log(this.proceso);

    this.businessPlanFinancial.presupuestoVenta = this.presupuestoVenta;

    this.planFinancieroService.planFinancialSave(this.businessPlanFinancial).subscribe(plan => {
      this.businessPlanFinancial = plan;
      this.proceso.businessPlanFinancial = this.businessPlanFinancial;
      this.procesoService.procesosUpdate(this.proceso).subscribe(pro => {
        this.proceso = pro;
        this.router.navigate([`compras/cliente/${this.proceso.canvasModel.client.id}`]);
      })
    })




  }




  public guardarYsalir() {

    this.proceso.estado = 'Presupuesto Venta';
    console.log(this.proceso);

    this.businessPlanFinancial.presupuestoVenta = this.presupuestoVenta;
    this.planFinancieroService.planFinancialSave(this.businessPlanFinancial).subscribe(plan => {
      this.businessPlanFinancial = plan;
      this.proceso.businessPlanFinancial = this.businessPlanFinancial;
      this.procesoService.procesosUpdate(this.proceso).subscribe(pro => {
        this.proceso = pro;
        this.router.navigate(['procesos']);
        Swal.fire('Exito', 'Presupuesto Venta creada con exito', 'success');
      })
    })



  }
  editarYsalir(){
    // no esta modificando
    //this.proceso.estado = 'Presupuesto Venta';
    console.log(this.proceso);

    this.businessPlanFinancial.presupuestoVenta = this.presupuestoVenta;
    this.planFinancieroService.planFinancialSave(this.businessPlanFinancial).subscribe(plan => {
      this.businessPlanFinancial = plan;
      this.proceso.businessPlanFinancial = this.businessPlanFinancial;
      this.procesoService.procesosUpdate(this.proceso).subscribe(pro => {
        this.proceso = pro;
        this.router.navigate(['procesos']);
        Swal.fire('Exito', 'Presupuesto Venta creada con exito', 'success');
      })
    })

  }
  editar(){
    // no esta modificando
  //  this.proceso.estado = 'Presupuesto Venta';
    console.log(this.proceso);

    this.businessPlanFinancial.presupuestoVenta = this.presupuestoVenta;

    this.planFinancieroService.planFinancialSave(this.businessPlanFinancial).subscribe(plan => {
      this.businessPlanFinancial = plan;
      this.proceso.businessPlanFinancial = this.businessPlanFinancial;
      this.procesoService.procesosUpdate(this.proceso).subscribe(pro => {
        this.proceso = pro;
        this.router.navigate([`compras/cliente/${this.proceso.canvasModel.client.id}`]);
      })
    })
  }
}
