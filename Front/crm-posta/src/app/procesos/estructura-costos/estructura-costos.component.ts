import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { CostComponent } from '../CostComponent';
import { CostStructure } from '../CostStructure';
import { ProcesoService } from '../proceso.service';
import Swal from 'sweetalert2';
import { Process } from '../Process';

@Component({
  selector: 'app-estructura-costos',
  templateUrl: './estructura-costos.component.html',
  styleUrls: ['./estructura-costos.component.css']
})
export class EstructuraCostosComponent {

  cliente: Client = new Client()
  value:boolean;
  //Cost Component
  listaBackend: CostComponent[] = [];
  listaBackend2: CostComponent[] = [];
  amount:number;
  nameComponent: string;
  amount1:number;
  nameComponent1: string;
  id:number;
  costoEntidad:CostStructure  = new CostStructure;
  listaCostos:CostComponent[]=[];
  nuevaEntidad:CostComponent= new CostComponent;
  nuevaEntidad1:CostComponent= new CostComponent;
  proceso:Process= new Process;

  procesos:Process[]=[];
  constructor(private modalService: ModalService,
     private clienteService: ClientService,
     private rutaParametro: ActivatedRoute,
     private procesoService:ProcesoService,
     private router:Router,
     ) { }

  ngOnInit(): void {


    this.procesoService.costosTodos().subscribe(data=>{
      this.listaCostos= data;
    })
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          console.log(data);
          this.procesoService.procesosFindAll().subscribe(p=>{

            this.procesos=p;
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

  cerrarModalAsesoria(): void {
    this.modalService.cerrarModalAsesoria();
  }


  cambiarCondicion(){
    if(this.value){
      this.value=false;
     }else{
       this.value=true;
     }
  }

  agregarValor() {
    /*
    const nuevaEntidad: CostComponent = {
      id:this.id,
      amount: this.amount,
      nameComponent: this.nameComponent
    };
    this.listaBackend.push(nuevaEntidad);
    this.amount;
    this.nameComponent;
    console.log(this.listaBackend);
*/
this.nuevaEntidad.amount=this.amount;
this.listaBackend.push(this.nuevaEntidad);
console.log(this.listaBackend);


  }
  agregarValor1() {
    this.nuevaEntidad1.amount=this.amount1;
this.listaBackend2.push(this.nuevaEntidad1);
console.log(this.listaBackend2);

  }
  guardarYSalir(){
    //this.proceso.terminado=true;
    this.proceso.estado='Estructura Costos';
    this.costoEntidad.fixedCosts=this.listaBackend2;
    this.costoEntidad.variableCost= this.listaBackend;
    this.costoEntidad.totalVariable();
    this.costoEntidad.totalFijo();
    this.costoEntidad.total();
    console.log(this.costoEntidad);
    this.proceso.canvasModel.costStructure=this.costoEntidad;
    console.log(this.costoEntidad);

    this.procesoService.estructuraCostoSave(this.costoEntidad).subscribe(costo=>{
      this.proceso.canvasModel.costStructure=costo;
      this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
        this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
          this.router.navigate(['procesos'])
          console.log(this.proceso);

          Swal.fire('Exito', 'Estructura costos creado con exito', 'success');
        })
      })


    }, e=>{
      console.log(e);

      //Swal.fire('Exito: ', `${e}`, 'success');
    })


  }
  guardar(){
    //this.proceso.terminado=true;
    this.proceso.estado='Estructura Costos';
    this.costoEntidad.fixedCosts=this.listaBackend2;
    this.costoEntidad.variableCost= this.listaBackend;
    this.costoEntidad.totalVariable();
    this.costoEntidad.totalFijo();
    this.costoEntidad.total();
    console.log(this.costoEntidad);
    this.proceso.canvasModel.costStructure=this.costoEntidad;
    this.procesoService.estructuraCostoSave(this.costoEntidad).subscribe(costo=>{
      this.proceso.canvasModel.costStructure=costo;
      this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
        this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
          this.router.navigate(['/informacion/cliente/', this.cliente.id]);
          console.log(this.proceso);

          Swal.fire('Exito', 'Estructura costos creado con exito', 'success');
        })
      })


    }, e=>{
      console.log(e);

      //Swal.fire('Exito: ', `${e}`, 'success');
    })


  }




}
