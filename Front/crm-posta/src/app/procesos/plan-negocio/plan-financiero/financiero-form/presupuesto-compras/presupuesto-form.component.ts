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
  subto:number=0;
  subto1:number=0;
  nombreP: string;
  materiaPrima: string[] = [];
  unidadesDeMedida: string[] = [];
  valorUnitario: number[] = [];
  cantidadUnidad: number[] = [];
  totalUnitario: number[] = [];
  cantidadP: number = 0;
  idEditar: number;
  idVer:number;
  cliente: Client = new Client;
  procesos: Process[] = [];
  proceso: Process = new Process;
  estructuraCompra: EstructuraCompra = new EstructuraCompra()
  estructuraCompra2: EstructuraCompra = new EstructuraCompra()
  estructuraCompras: EstructuraCompra[] = []
  otrosInsumos: EstructuraCompra[] = []
  insumos:EstructuraCompra=new EstructuraCompra();
  presupuestoCompra: PresupuestoCompra = new PresupuestoCompra();
  constructor(private rutaParametro: ActivatedRoute,
    private clienteService: ClientService,
    private procesoService: ProcesoService,
    private planFinancialService: PlanFinancieroService,
    private router: Router) { }
  ngOnInit(): void {
   
    
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      this.idVer = +parametro.get('idVer1');
      
      this.idEditar = + parametro.get('idEditar');
if(this.idVer){
  this.procesoService.procesosFindAll().subscribe(data => {
    this.procesos = data;
    this.procesos.forEach(p => {
      if (p.id == this.idVer) {
        this.proceso = p;
       this.proceso.businessPlanFinancial.presupuestoCompra = p.businessPlanFinancial.presupuestoCompra
              
        this.proceso.businessPlanFinancial.presupuestoCompra.forEach(pro => {
          
          this.totalUnitarios = pro.total
          this.totalAnuales = pro.totalAnual
          this.estructuraCompras=pro.estructuraCompras
          this.otrosInsumos=pro.otrosInsumos
        })
        
      }
    })
  })
}
if (this.idEditar) {

  this.procesoService.procesosFindAll().subscribe(data => {
    this.procesos = data;
    this.procesos.forEach(p => {
      if (p.id == this.idEditar) {
        this.proceso = p;
        this.proceso.businessPlanFinancial.presupuestoCompra = p.businessPlanFinancial.presupuestoCompra
              
        this.proceso.businessPlanFinancial.presupuestoCompra.forEach(pro => {
          console.log(pro.estructuraCompras);
          this.totalUnitarios = pro.total
          this.totalAnuales = pro.totalAnual
          this.estructuraCompras=pro.estructuraCompras
        })
        
      }
    })
  })
}
     
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          if (this.idEditar || this.idVer) {
         console.log('dentro del id ver o editar');
         
          }else{
            this.procesoService.procesosFindAll().subscribe(pro => {
              this.procesos = pro;
              this.procesos.forEach(proceso => {
                if (proceso?.canvasModel?.client?.id == this.cliente.id) {
                  this.proceso = proceso;
                  proceso.businessPlanFinancial.presupuestoVenta.estructuraMercado.forEach(mercado => {
                    this.crearPresupuestoCompra(mercado);
                    this.cantidadP += 1;
                  })

                }

              })
            })
          }

        })
      }

    })
  }
 
  elementos: any[] = []; // Inicializa la lista vacía o con elementos existentes

  sacarFila1(presupuestoCompra: PresupuestoCompra, e: EstructuraCompra) {  ;
    this.proceso.businessPlanFinancial.presupuestoCompra.forEach(pre => {
      pre.otrosInsumos = pre.otrosInsumos.filter(estructura => estructura != e);
      this.otrosInsumos = this.otrosInsumos.filter(a=>a !=e);
    })
    this.sacarTotales();
  }
  sacarFila(presupuestoCompra: PresupuestoCompra, e: EstructuraCompra) {  ;
    this.proceso.businessPlanFinancial.presupuestoCompra.forEach(pre => {
      pre.estructuraCompras = pre.estructuraCompras.filter(estructura => estructura != e);
      this.estructuraCompras = this.estructuraCompras.filter(a=>a !=e);
    })
    this.sacarTotales();
  }
  public sacarTotales(){
    this.totalUnitarios = 0
    this.totalAnuales = 0
   
    this.proceso.businessPlanFinancial.presupuestoCompra.forEach(compra => {
      console.log("Hola");
      compra.total=0;
      compra.totalAnual=0;
      compra.subtotal=0;
      this.estructuraCompras.forEach(compras=>{
        compra.subtotal+=compras.totalUnitario;
      })
      
      this.totalUnitarios=compra.subtotal+compra.subtotal2;//
      compra.total=this.totalUnitarios;//
      compra.totalAnual=(compra.total*compra.cantidadProducto);
      this.totalAnuales=compra.totalAnual;
    })
    
  }
  public sacarTotales1(){
    this.totalUnitarios = 0
    this.totalAnuales = 0
    
    this.proceso.businessPlanFinancial.presupuestoCompra.forEach(compra => {
      compra.total=0;
      compra.totalAnual=0;
      compra.subtotal2=0;
      this.otrosInsumos.forEach(compras=>{
        compra.subtotal2+=compras.totalUnitario;
      })
      this.totalUnitarios=compra.subtotal+compra.subtotal2;//
      compra.total=this.totalUnitarios;//
      compra.totalAnual=(compra.total*compra.cantidadProducto);
      this.totalAnuales=compra.totalAnual; 
    })
  }
  agregarFila(producto: string) {
    
    this.proceso.businessPlanFinancial.presupuestoCompra.forEach(compra => {
      if (compra.nombreProcucto == producto) {
        this.nombreP = compra.nombreProcucto
        
        this.estructuraCompra.totalUnitario = this.estructuraCompra.valorUnitario * this.estructuraCompra.cantidadUbnidad;
        if (compra.estructuraCompras == null) {
          compra.estructuraCompras = [];
        }
        compra.estructuraCompras.push(this.estructuraCompra);
        
      
    
      }
      this.sacarTotales();
    
    })
   
    this.nombreP = this.presupuestoCompra.nombreProcucto
    //this.estructuraCompras = []; esta pija lo rompe
    this.estructuraCompra = new EstructuraCompra();
  }
  agregarFila1(producto: string) {
    
    this.proceso.businessPlanFinancial.presupuestoCompra.forEach(compra => {
      if (compra.nombreProcucto == producto) {
        this.nombreP = compra.nombreProcucto
       
        this.insumos.totalUnitario = this.insumos.valorUnitario * this.insumos.cantidadUbnidad;
        if (compra.otrosInsumos == null) {
          compra.otrosInsumos = [];
        }
        compra.otrosInsumos.push(this.insumos);
        
      
    
      }
      this.sacarTotales1();
    
    })
   
    this.nombreP = this.presupuestoCompra.nombreProcucto
    //this.otrosInsumos = []; esta pija lo rompe
    this.insumos = new EstructuraCompra();
  }

  public crearPresupuestoCompra(estructuraMercado: EstructuraMercado) {
    this.presupuestoCompra = new PresupuestoCompra();
    this.presupuestoCompra.cantidadProducto = estructuraMercado.cantidad;
    this.presupuestoCompra.nombreProcucto = estructuraMercado.producto;
    this.presupuestoCompra.tipoProducto = estructuraMercado.tipo;
    this.proceso.businessPlanFinancial.presupuestoCompra.push(this.presupuestoCompra);
  }
  public guardarYsalir() {
    let cond:boolean=false;
    this.proceso?.businessPlanFinancial?.presupuestoCompra.forEach(c=>{
      if(!c.estructuraCompras){
        cond=true;
      }
    })
    if(cond){
      Swal.fire('ERROR', 'Materias Primas sin Contenido', 'error');
    }else{
      this.proceso.estado = 'Presupuesto Compra';
      this.proceso.estadoAnteriorEmprendedor = 'Presupuesto Compra';
      this.procesoService.procesosUpdate(this.proceso).subscribe(data1 => {
      })
      this.planFinancialService.comprasPut(this.proceso.businessPlanFinancial).subscribe(data => {
        this.router.navigate(['/procesos'])
        Swal.fire('Exito', 'Presupuesto Compra creada con exito', 'success');
      })
    }
   
   
  }

  public guardar() {
    let cond:boolean=false;
    this.proceso?.businessPlanFinancial?.presupuestoCompra.forEach(c=>{
      if(!c.estructuraCompras){
        cond=true;
      }
    })
    if(cond){
      Swal.fire('ERROR', 'Materias Primas sin Contenido', 'error');
    }else{
      this.proceso.estado = 'Presupuesto Compra'
    this.proceso.estadoAnteriorEmprendedor = 'Presupuesto Compra';
    this.procesoService.procesosUpdate(this.proceso).subscribe(data1 => {
    })
    this.planFinancialService.comprasPut(this.proceso.businessPlanFinancial).subscribe(data => {
      this.router.navigate(['gastos/cliente/', this.cliente.id])
    })
    }
  }

  editar() {
    let cond:boolean=false;
    this.proceso?.businessPlanFinancial?.presupuestoCompra.forEach(c=>{
      if(c.estructuraCompras.length===0){
        cond=true;
      }
    })
    if(cond){
      Swal.fire('ERROR', 'Materias Primas sin Contenido', 'error');
    }else{
       this.procesoService.procesosUpdate(this.proceso).subscribe(data1 => {
     })
     this.planFinancialService.comprasPut(this.proceso.businessPlanFinancial).subscribe(data => {
       if(this.proceso?.businessPlanFinancial?.gastoCosto){
         this.router.navigate([`/gastos/cliente/${this.cliente.id}/editar/${this.proceso.id}`])
       }else{
         this.router.navigate(['/gastos/cliente/', this.cliente.id]);
       }
     })
    } 
  }

  editarYsalir() {
    let cond:boolean=false;
    this.proceso?.businessPlanFinancial?.presupuestoCompra.forEach(c=>{
      if(c.estructuraCompras.length===0){
        cond=true;
      }
    })
    if(cond){
      Swal.fire('ERROR', 'Materias Primas sin Contenido', 'error');
    }else{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data1 => {
      })
      this.planFinancialService.comprasPut(this.proceso.businessPlanFinancial).subscribe(data => {
        if(this.idVer){
          Swal.fire('Exito', 'Presupuesto Compra Editado con exito', 'success');
        }else{
          this.router.navigate(['/procesos'])
          Swal.fire('Exito', 'Presupuesto Compra Editado con exito', 'success');
        }
      
      })
    } 
  }
}
