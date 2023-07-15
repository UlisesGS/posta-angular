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


@Component({
  selector: 'app-presupuesto-ventas',
  templateUrl: './presupuesto-ventas.component.html',
  styleUrls: ['./presupuesto-ventas.component.css']
})
export class PresupuestoVentasComponent implements OnInit {
/*
  enero:number;
  febrero:number;
  marzo:number;
  abril:number;
  mayo:number;
  junio:number;
  julio:number;
  agosto:number;
  septiembre:number;
  octubre:number;
  noviembre:number;
  diciembre:number;
  */
 listaMes:number[]=[];
  totalUnidadesRequeridas:number;
  valorEnero=false;
  producto:string;
  cantidad:number;
  productos:string[];
  cantidades:number[];
  elementos: any[] = []; // Inicializa la lista vacía o con elementos existentes
  businessPlanFinancial:BusinessPlanFinancial= new BusinessPlanFinancial();
  cliente:Client= new Client();
  procesos:Process[]=[];
  proceso:Process= new Process();
  estructuraMercados:EstructuraMercado[]=[];
  estructuraMercado:EstructuraMercado = new EstructuraMercado;
  ciclicidad:CiclicidadVentas= new CiclicidadVentas;
  ciclicidadVentas:CiclicidadVentas[]=[];

  presupuestoVenta:PresupuestoVenta=new PresupuestoVenta();

  constructor(
    private planFinancieroService:PlanFinancieroService,
    private rutaParametro:ActivatedRoute,
    private clienteService:ClientService,
    private procesoService:ProcesoService,
    private router:Router,

    ){}
  ngOnInit(): void {
    this.presupuestoVenta.ciclicidadVentas= [];
this.estructuraMercado.cantidad
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          this.procesoService.procesosFindAll().subscribe(pro => {
            this.procesos=pro;

            this.procesos.forEach(proceso=>{
              if(proceso.canvasModel.client.id==this.cliente.id){
                this.proceso=proceso;

              }
            })
          })

        })
      }
    })
  }
  agregarFila() {

    /* agregarFila() {
  const nuevoElemento = { nombre: '', ventas: '' };

    this.estructuraMercado= new EstructuraMercado()
this.estructuraMercado.cantidad=this.cantidad;
this.estructuraMercado.producto=this.producto;
   // this.elementos.push({ nombre: '', ventas: '' });
this.presupuestoVenta.addElementos(this.estructuraMercado);
console.log(this.presupuestoVenta);


   }


  // Verificar si el nuevo elemento ya existe en la lista
  const elementoExistente = this.elementos.find(item => item.nombre === nuevoElemento.nombre && item.ventas === nuevoElemento.ventas);

  // Agregar el nuevo elemento solo si no existe en la lista
  if (!elementoExistente) {
    this.elementos.push(nuevoElemento);
  }
} */
   // this.elementos.push({ nombre: '', ventas: '


   this.estructuraMercado = new EstructuraMercado();
   this.estructuraMercado.cantidad=this.cantidad;
   this.estructuraMercado.producto=this.producto;
   this.estructuraMercados.push(this.estructuraMercado);
   this.presupuestoVenta.estructuraMercado=this.estructuraMercados;


//console.log(this.estructuraMercados);




/*

   this.estructuraMercado.cantidad=this.cantidad[];
   this.estructuraMercado.producto=this.producto[];
    this.businessPlanFinancial.presupuestoVenta.estructuraMercado.push(this.estructuraMercado);
    */

  }

  public llenarHoras(){


    this.presupuestoVenta.estructuraMercado.forEach(e=>{
      e.calculos();


    })



    console.log(this.presupuestoVenta);

    /* CALCULAR  */
  }

  public llenarCiclicidad(e:any,mes:string){
  /*
    this.presupuestoVenta.calculosCiclicidad();
    console.log(this.presupuestoVenta);
*/

    console.log(e.target.value);
if(mes==='enero'){


  this.ciclicidad.calificacion=+e.target.value
  this.ciclicidad.mes=mes;

this.presupuestoVenta.ciclicidadVentas.forEach(c=>{
  if(c.mes==mes){
    console.log('for each');

    this.valorEnero=true;
    c.calificacion= +e.target.value;
    this.presupuestoVenta.ciclicidadVentas[0]=c;
  }
})

if(this.valorEnero==false){
  console.log('inicial');


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

  public llenarTipo(e:string){
    this.estructuraMercado.tipo=e;
   console.log(this.estructuraMercado);
   console.log(`mostrando ${e}`);



  }

r

  public guardar(){
    this.proceso.estado='Presupuesto Venta';
    console.log(this.proceso);

    this.businessPlanFinancial.presupuestoVenta=this.presupuestoVenta;
      this.planFinancieroService.planFinancialSave(this.businessPlanFinancial).subscribe(plan=>{
      this.businessPlanFinancial=plan;
      this.proceso.businessPlanFinancial=this.businessPlanFinancial;
      this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
        this.proceso=pro;
       this.router.navigate([`compras/cliente/${this.proceso.canvasModel.client.id}`]);
      })
    })


  }
  public guardarYsalir(){

    this.proceso.estado='Presupuesto Venta';
    console.log(this.proceso);

    this.businessPlanFinancial.presupuestoVenta=this.presupuestoVenta;
      this.planFinancieroService.planFinancialSave(this.businessPlanFinancial).subscribe(plan=>{
      this.businessPlanFinancial=plan;
      this.proceso.businessPlanFinancial=this.businessPlanFinancial;
      this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
        this.proceso=pro;
       this.router.navigate(['procesos']);
      })
    })



  }
  ver(){
    console.log(this.presupuestoVenta);

  }
}
