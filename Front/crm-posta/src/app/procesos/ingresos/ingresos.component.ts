import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import Swal from 'sweetalert2';
import { Process } from '../Process';
import { ProcesoService } from '../proceso.service';
import { RevenueStreams } from '../RevenueStreams';


@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit{

  revenueStreams:RevenueStreams= new RevenueStreams();
  proceso:Process= new Process;

  procesos:Process[]=[];
  cliente: Client = new Client()
  value:boolean;
  constructor(private modalService: ModalService,
     private clienteService: ClientService,
      private rutaParametro: ActivatedRoute,
      private procesoService:ProcesoService,
      private router:Router,
      ) { }

  ngOnInit(): void {
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          console.log(data);
          this.procesoService.procesosFindAll().subscribe(p=>{

            this.procesos=p;
            this.procesos.forEach(proceso=>{
              if(proceso?.canvasModel?.client?.id==this.cliente.id){
                this.proceso=proceso;
                
                // para editar
                let idEditar = +parametro.get('idEditar');
                console.log('no entro al if');
                
                if(idEditar){
                  this.procesoService.procesosFindById(idEditar).subscribe(data=>{
                    this.proceso=data;
                    this.revenueStreams=this.proceso.canvasModel.revenueStreams;
                    console.log(this.revenueStreams);
                    
                  })
                }

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
  public guardar(){
    this.proceso.estado='Ingresos';
    console.log(this.proceso);
    this.proceso.canvasModel.revenueStreams=this.revenueStreams
   this.procesoService.ingresosSave(this.proceso.canvasModel.revenueStreams).subscribe(valor=>{
    this.proceso.canvasModel.revenueStreams=valor;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        // [routerLink]="['/estructuraCostos/cliente/', cliente.id]"
        this.router.navigate(['/estructuraCostos/cliente/', this.cliente.id])
      })
    })
   })
  }


  public guardarYsalir(){
    this.proceso.estado='Ingresos';
    console.log(this.proceso);
    this.proceso.canvasModel.revenueStreams=this.revenueStreams
   this.procesoService.ingresosSave(this.proceso.canvasModel.revenueStreams).subscribe(valor=>{
    this.proceso.canvasModel.revenueStreams=valor;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['procesos'])
        Swal.fire('Exito', 'Propuesta de Valor creada con exito', 'success');
      })
    })
   })
  }




  public editar(){

    console.log(this.proceso);
    this.proceso.canvasModel.revenueStreams=this.revenueStreams
   this.procesoService.ingresosPut(this.proceso.canvasModel.revenueStreams).subscribe(valor=>{
    this.proceso.canvasModel.revenueStreams=valor;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        if(this.proceso.canvasModel.costStructure){
          this.router.navigate([`/estructuraCostos/cliente/${this.cliente.id}/editar/${this.proceso.id}`])
        }else{
          this.router.navigate(['/estructuraCostos/cliente/', this.cliente.id])
        }
      })
    })
   })
  }


  public editarYsalir(){

    console.log(this.proceso);
    this.proceso.canvasModel.revenueStreams=this.revenueStreams
   this.procesoService.ingresosPut(this.proceso.canvasModel.revenueStreams).subscribe(valor=>{
    this.proceso.canvasModel.revenueStreams=valor;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['procesos'])
        Swal.fire('Exito', 'Propuesta de Valor editada con exito', 'success');
      })
    })
   })
  }


}
