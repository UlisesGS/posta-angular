import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../proceso.service';
import { Process } from '../Process';
import { KeyActivities } from '../KeyActivities';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividades-claves',
  templateUrl: './actividades-claves.component.html',
  styleUrls: ['./actividades-claves.component.css']
})
export class ActividadesClavesComponent {

  keyActivities: KeyActivities=new KeyActivities();
  cliente: Client = new Client();
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
              if(proceso.canvasModel.client.id==this.cliente.id){
                this.proceso=proceso;
                
                // para editar
                let idEditar = +parametro.get('idEditar');
                console.log('no entro al if');
                
                if(idEditar){
                  this.procesoService.procesosFindById(idEditar).subscribe(data=>{
                    this.proceso=data;
                    this.keyActivities=this.proceso.canvasModel.keyActivities;
                    console.log(this.keyActivities);
                    
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
    this.proceso.estado='Actividades Claves';
    console.log(this.proceso);
    this.proceso.canvasModel.keyActivities=this.keyActivities
    console.log(this.keyActivities);
    console.log(this.proceso);


   this.procesoService.actividadesClavesSave(this.proceso.canvasModel.keyActivities).subscribe(pro=>{
    this.proceso.canvasModel.keyActivities=pro;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['sociosClaves/cliente/', this.cliente.id])
      })
    })
   })
  }


  public guardarYsalir(){
    this.proceso.estado='Actividades Claves';
    console.log(this.proceso);
    this.proceso.canvasModel.keyActivities=this.keyActivities
    console.log(this.keyActivities);
    console.log(this.proceso);


   this.procesoService.actividadesClavesSave(this.proceso.canvasModel.keyActivities).subscribe(pro=>{
    this.proceso.canvasModel.keyActivities=pro;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['procesos'])
        Swal.fire('Exito', 'Actividades claves creada con exito', 'success');

      })
    })
   })
  }


  public editar(){
    this.proceso.estado='Actividades Claves';
    console.log(this.proceso);
    this.proceso.canvasModel.keyActivities=this.keyActivities
    console.log(this.keyActivities);
    console.log(this.proceso);


   this.procesoService.actividadesClavesPut(this.proceso.canvasModel.keyActivities).subscribe(pro=>{
    this.proceso.canvasModel.keyActivities=pro;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['sociosClaves/cliente/', this.cliente.id])
      })
    })
   })
  }


  public editarYsalir(){
    this.proceso.estado='Actividades Claves';
    console.log(this.proceso);
    this.proceso.canvasModel.keyActivities=this.keyActivities
    console.log(this.keyActivities);
    console.log(this.proceso);


   this.procesoService.actividadesClavesPut(this.proceso.canvasModel.keyActivities).subscribe(pro=>{
    this.proceso.canvasModel.keyActivities=pro;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['procesos'])
        Swal.fire('Exito', 'Actividades claves eidtadas con exito', 'success');
      })
    })
   })
  }
}
