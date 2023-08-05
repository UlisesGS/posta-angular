import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { CustomerRelationships } from './../CustomerRelationships';
import { Process } from '../Process';
import { ProcesoService } from '../proceso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relaciones',
  templateUrl: './relaciones.component.html',
  styleUrls: ['./relaciones.component.css']
})
export class RelacionesComponent {

  customerRelationships:CustomerRelationships= new CustomerRelationships();
  proceso:Process= new Process();

  procesos:Process[]=[];
  cliente: Client = new Client();
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
                    this.customerRelationships=this.proceso.canvasModel.customerRelationships;
                    console.log(this.customerRelationships);
                    
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
    this.proceso.estado='Relación con los Clientes';
    console.log(this.proceso);
    this.proceso.canvasModel.customerRelationships=this.customerRelationships
   this.procesoService.relacionesSave(this.proceso.canvasModel.customerRelationships).subscribe(relacion=>{
    this.proceso.canvasModel.customerRelationships=relacion;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        // [routerLink]="['/recursosClaves/cliente/', cliente.id]"
        this.router.navigate(['/recursosClaves/cliente/', this.cliente.id])
      })
    })
   })
  }


  public guardarYsalir(){
    this.proceso.estado='Relación con los Clientes';
    console.log(this.proceso);
    this.proceso.canvasModel.customerRelationships=this.customerRelationships
   this.procesoService.relacionesSave(this.proceso.canvasModel.customerRelationships).subscribe(relacion=>{
    this.proceso.canvasModel.customerRelationships=relacion;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['procesos'])
        Swal.fire('Exito', 'Relacion creada con exito', 'success');
      })
    })
   })
  }



  public editar(){

    console.log(this.proceso);
    this.proceso.canvasModel.customerRelationships=this.customerRelationships
   this.procesoService.relacionesPut(this.proceso.canvasModel.customerRelationships).subscribe(relacion=>{
    this.proceso.canvasModel.customerRelationships=relacion;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        if(this.proceso.canvasModel.keyRecources){
          this.router.navigate([`/recursosClaves/cliente/${this.cliente.id}/editar/${this.proceso.id}`])
        }else{
          this.router.navigate(['/recursosClaves/cliente/', this.cliente.id])
        }
      })
    })
   })
  }


  public editarYsalir(){

    console.log(this.proceso);
    this.proceso.canvasModel.customerRelationships=this.customerRelationships
   this.procesoService.relacionesPut(this.proceso.canvasModel.customerRelationships).subscribe(relacion=>{
    this.proceso.canvasModel.customerRelationships=relacion;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['procesos'])
        Swal.fire('Exito', 'Relacion editada con exito', 'success');
      })
    })
   })
  }
}
