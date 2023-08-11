import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../proceso.service';
import { Process } from '../Process';
import { KeyPartners } from '../KeyPartners';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-socios-claves',
  templateUrl: './socios-claves.component.html',
  styleUrls: ['./socios-claves.component.css']
})
export class SociosClavesComponent {

  keyPartners:KeyPartners=new KeyPartners();
  cliente: Client = new Client()
  value:boolean;
  procesos:Process[]=[];
  proceso:Process= new Process();
  constructor(private modalService: ModalService,
     private clienteService: ClientService,
     private rutaParametro: ActivatedRoute,
     private procesoService:ProcesoService,
     private router:Router) { }

  ngOnInit(): void {
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          console.log(data);
          this.procesoService.procesosFindAll().subscribe(pro => {
            this.procesos=pro;

            this.procesos.forEach(proceso=>{
              if(proceso?.canvasModel?.client?.id==this.cliente.id){
                this.proceso=proceso;
                
                
                // para editar
                let idEditar = +parametro.get('idEditar');
                console.log('no entro al if');
                
                if(idEditar){
                  this.procesoService.procesosFindById(idEditar).subscribe(data=>{
                    this.proceso=data;
                    this.keyPartners=this.proceso.canvasModel.keyPartners;
                    console.log(this.keyPartners);
                    
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
    this.proceso.estado='Socios Claves';
    this.proceso.estadoAnteriorEmprendedor='Socios Claves';
    console.log(this.proceso);
    this.proceso.canvasModel.keyPartners=this.keyPartners


   this.procesoService.sociosClavesSave(this.proceso.canvasModel.keyPartners).subscribe(pro=>{
    this.proceso.canvasModel.keyPartners=pro;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        //[routerLink]="['/ingresos/cliente/', cliente.id]"
        this.router.navigate(['/ingresos/cliente/', this.cliente.id])

      })
    })
   })
  }


  public guardarYsalir(){
    this.proceso.estado='Socios Claves';
    this.proceso.estadoAnteriorEmprendedor='Socios Claves';
    console.log(this.proceso);
    this.proceso.canvasModel.keyPartners=this.keyPartners


   this.procesoService.sociosClavesSave(this.proceso.canvasModel.keyPartners).subscribe(pro=>{
    this.proceso.canvasModel.keyPartners=pro;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['procesos'])
        Swal.fire('Exito', 'Socios claves creado con exito', 'success');

      })
    })
   })
  }




  public editar(){

    console.log(this.proceso);
    this.proceso.canvasModel.keyPartners=this.keyPartners


   this.procesoService.sociosClavesPut(this.proceso.canvasModel.keyPartners).subscribe(pro=>{
    this.proceso.canvasModel.keyPartners=pro;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        if(this.proceso.canvasModel.revenueStreams){
          this.router.navigate([`/ingresos/cliente/${this.cliente.id}/editar/${this.proceso.id}`])
        }else{
          this.router.navigate(['/ingresos/cliente/', this.cliente.id])
        }

      })
    })
   })
  }


  public editarYsalir(){

    console.log(this.proceso);
    this.proceso.canvasModel.keyPartners=this.keyPartners


   this.procesoService.sociosClavesPut(this.proceso.canvasModel.keyPartners).subscribe(pro=>{
    this.proceso.canvasModel.keyPartners=pro;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['procesos'])
        Swal.fire('Exito', 'Socios claves editados con exito', 'success');

      })
    })
   })
  }
}
