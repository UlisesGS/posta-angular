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
  styleUrls: ['./presupuesto-gasto.component.css']
})
export class PresupuestoGastoComponent {

  materiaPrima1: Personal[] = []; // Inicializa la lista vacía o con elementos existentes
  materia1:Personal=new Personal();
  materiaPrima2: Personal[] = [];
  materia2:Personal=new Personal();
  materiaPrima3: Personal[] = [];
  materia3:Personal=new Personal();



  operativosLista:OtrosCostos[]=[];
  operativos:OtrosCostos=new OtrosCostos();
  administrativosLista:OtrosCostos[]=[];
  administrativos:OtrosCostos=new OtrosCostos();
  ventasLista:OtrosCostos[]=[];
  ventasL:OtrosCostos=new OtrosCostos();


  operativo:RequerimientosPersonal=new RequerimientosPersonal();
  administrativo:RequerimientosPersonal=new RequerimientosPersonal();
  ventas:RequerimientosPersonal=new RequerimientosPersonal();

  cliente:Client=new Client();
  procesos:Process[]=[];
  proceso:Process= new Process();

  gastoCosto:GastoCosto=new GastoCosto();

  constructor(
    private planFinancialService:PlanFinancieroService,
    private rutaParametro:ActivatedRoute,
    private clienteService:ClientService,
    private procesoService:ProcesoService,
    private router:Router,
  ){}


  ngOnInit(): void {

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
                    console.log(proceso);



                  }

                })
              })

            })
          }
        })
  }


  agregarFila() {

    this.materia1.anual();

    this.materiaPrima1.push(this.materia1);
    console.log(this.materiaPrima1);

    this.operativo.personal=this.materiaPrima1;

    this.operativo.subTotal=0;
    this.operativo.subTotalAnual=0;

    this.operativo.parafiscalesCalculos();
    this.gastoCosto.operativo=this.operativo


    console.log(this.operativo);

    this.materia1=new Personal();
  }
  agregarFila1() {



    this.materia2.anual();

    this.materiaPrima2.push(this.materia2);

    this.administrativo.personal=this.materiaPrima2;

    this.administrativo.subTotal=0;
    this.administrativo.subTotalAnual=0;

    this.administrativo.parafiscalesCalculos();

    this.gastoCosto.administrativo=this.administrativo;



    this.materia2=new Personal();
  }
  agregarFila2() {
    this.materia3.anual();

    this.materiaPrima3.push(this.materia3);

    this.ventas.personal=this.materiaPrima3;

    this.ventas.subTotal=0;
    this.ventas.subTotalAnual=0;

    this.ventas.parafiscalesCalculos();

    this.gastoCosto.comercialVentas=this.ventas;

  //  this.proceso.businessPlanFinancial.gastoCosto.comercialVentas=this.gastoCosto.comercialVentas;

    console.log(this.proceso);


    this.materia3=new Personal();
  }



  agregarCostoOperativo() {

    this.operativos.anual();

    this.operativosLista.push(this.operativos);

    this.operativo.costos=this.operativosLista;

    this.operativo.totalCostoMensual=0;
    this.operativo.totalCostoAnual=0;

    this.operativo.totalCostos();

    this.gastoCosto.operativo=this.operativo

    this.operativos=new OtrosCostos();
  }
  agregarGastoAdministrativo() {
    this.administrativos.anual();

    this.administrativosLista.push(this.administrativos);

    this.administrativo.costos=this.administrativosLista;

    this.administrativo.totalCostoMensual=0;
    this.administrativo.totalCostoAnual=0;

    this.administrativo.totalCostos();

    this.gastoCosto.administrativo=this.administrativo

    this.administrativos=new OtrosCostos();
  }
  agregarGastoVenta() {
    this.ventasL.anual();

    this.ventasLista.push(this.ventasL);

    this.ventas.costos=this.ventasLista;

    this.ventas.totalCostoMensual=0;
    this.ventas.totalCostoAnual=0;

    this.ventas.totalCostos();

    this.gastoCosto.comercialVentas=this.ventas

    this.ventasL=new OtrosCostos();
  }



  public guardarYsalir(){
    this.proceso.businessPlanFinancial.gastoCosto=new GastoCosto();
    this.proceso.businessPlanFinancial.gastoCosto.comercialVentas=this.gastoCosto.comercialVentas;
    this.proceso.businessPlanFinancial.gastoCosto.operativo=this.gastoCosto.operativo;
    this.proceso.businessPlanFinancial.gastoCosto.administrativo=this.gastoCosto.administrativo;

   console.log(this.proceso);


    this.proceso.estado='Presupuesto Gastos/Costos';

    this.procesoService.procesosUpdate(this.proceso).subscribe(data1=>{
      console.log(data1);

    })
    this.planFinancialService.gastosPut(this.proceso.businessPlanFinancial).subscribe(data=>{
      console.log(data);

    this.router.navigate(['/procesos'])
    Swal.fire('Exito', 'Presupuesto Gastos/Costos creado con exito', 'success');

    })

  }
  public guardar(){
    this.proceso.businessPlanFinancial.gastoCosto=new GastoCosto();
    this.proceso.businessPlanFinancial.gastoCosto.comercialVentas=this.gastoCosto.comercialVentas;
    this.proceso.businessPlanFinancial.gastoCosto.operativo=this.gastoCosto.operativo;
    this.proceso.businessPlanFinancial.gastoCosto.administrativo=this.gastoCosto.administrativo;
   console.log(this.proceso);

    this.proceso.estado='Presupuesto Gastos/Costos'

    this.procesoService.procesosUpdate(this.proceso).subscribe(data1=>{
      console.log(data1);

    })

    this.planFinancialService.gastosPut(this.proceso.businessPlanFinancial).subscribe(data=>{
      console.log(data);

    this.router.navigate(['inversion/cliente/',this.cliente.id])

    })

  }

}

