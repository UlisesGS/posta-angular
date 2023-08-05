import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../proceso.service';
import { Process } from '../Process';
import { KeyRecources } from '../KeyRecources';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recursos-claves',
  templateUrl: './recursos-claves.component.html',
  styleUrls: ['./recursos-claves.component.css']
})
export class RecursosClavesComponent {

  keyRecources:KeyRecources=new KeyRecources();
  cliente: Client = new Client();
  procesos:Process[]=[];
  proceso:Process= new Process();
  value:boolean;
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
                    this.keyRecources=this.proceso.canvasModel.keyRecources;
                    console.log(this.keyRecources);
                    
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
    this.proceso.estado='Recursos Claves';
    console.log(this.proceso);
    this.proceso.canvasModel.keyRecources=this.keyRecources
   this.procesoService.recursosClavesSave(this.proceso.canvasModel.keyRecources).subscribe(pro=>{
    this.proceso.canvasModel.keyRecources=pro;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
       // [routerLink]="['/actividadesClaves/cliente/', cliente.id]"
      this.router.navigate(['/actividadesClaves/cliente/', this.cliente.id])
      })
    })
   })
  }


  public guardarYsalir(){
    this.proceso.estado='Recursos Claves';
    console.log(this.proceso);
    this.proceso.canvasModel.keyRecources=this.keyRecources
   this.procesoService.recursosClavesSave(this.proceso.canvasModel.keyRecources).subscribe(pro=>{
    this.proceso.canvasModel.keyRecources=pro;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['procesos'])
        Swal.fire('Exito', 'Recursos Claves creada con exito', 'success');
      })
    })
   })
  }


  public editar(){

    console.log(this.proceso);
    this.proceso.canvasModel.keyRecources=this.keyRecources
   this.procesoService.recursosClavesPut(this.proceso.canvasModel.keyRecources).subscribe(pro=>{
    this.proceso.canvasModel.keyRecources=pro;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        if(this.proceso.canvasModel.keyActivities){
          this.router.navigate([`/actividadesClaves/cliente/${this.cliente.id}/editar/${this.proceso.id}`])
        }else{
          this.router.navigate(['/actividadesClaves/cliente/', this.cliente.id])
        }
      })
    })
   })
  }


  public editarYsalir(){

    console.log(this.proceso);
    this.proceso.canvasModel.keyRecources=this.keyRecources
   this.procesoService.recursosClavesPut(this.proceso.canvasModel.keyRecources).subscribe(pro=>{
    this.proceso.canvasModel.keyRecources=pro;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['procesos'])
        Swal.fire('Exito', 'Recursos Claves editada con exito', 'success');
      })
    })
   })
  }
}
