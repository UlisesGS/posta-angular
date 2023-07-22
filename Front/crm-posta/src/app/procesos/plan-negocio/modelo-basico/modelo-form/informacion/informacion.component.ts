import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { Process } from 'src/app/procesos/Process';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { BusinessPlan } from './../../BusinessPlan';
import { ProyectInformation } from './../../ProyectInformation';
import { ModeloBasicoService } from './../../modelo-basico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent {


  cliente: Client = new Client();
  value:boolean;
  procesos:Process[]=[];
  proceso:Process= new Process();
  businessPlan:BusinessPlan= new BusinessPlan();
  proyectInformation:ProyectInformation= new ProyectInformation();

  constructor(private modalService: ModalService,
    private clienteService: ClientService,
    private rutaParametro: ActivatedRoute,
    private procesoService:ProcesoService,
    private modeloBasicoService:ModeloBasicoService,
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
                    this.proyectInformation=this.proceso.businessPlan.proyectInformation;
                    console.log(this.proyectInformation);
                    
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


  guardar(){

this.modeloBasicoService.planSaveProyect(this.proyectInformation).subscribe(data=>{
  this.businessPlan.proyectInformation=data;
  // en el proximo cambiar a put hdp
  console.log(this.businessPlan);
  this.proceso.estado='Informacion Proyecto'
  this.modeloBasicoService.planSaveBusinessPlan(this.businessPlan).subscribe(plan=>{
    this.businessPlan=plan;
    this.proceso.businessPlan=this.businessPlan;
    this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
      this.proceso=pro;

      this.router.navigate([`interno/cliente/${this.proceso.canvasModel.client.id}`]);
    })
  })
})

  }
  guardarYsalir(){
    this.modeloBasicoService.planSaveProyect(this.proyectInformation).subscribe(data=>{
      this.businessPlan.proyectInformation=data;
      // en el proximo cambiar a put hdp
      console.log(this.businessPlan);
      this.proceso.estado='Informacion Proyecto'
      this.modeloBasicoService.planSaveBusinessPlan(this.businessPlan).subscribe(plan=>{
        this.businessPlan=plan;
        this.proceso.businessPlan=this.businessPlan;
        this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
          this.proceso=pro;
        //  this.router.navigate([`interno/cliente/${this.proceso.canvasModel.client.id}`]);
        this.router.navigate(['/procesos']);
        Swal.fire('Exito', 'Informacion del Proyecto creada con exito', 'success');
        })
      })
    })

  }

/*------------------------------------------------------------------------------------------------------------------------*/
/*  REVISAR. EN TODOS LOS NGMODEL EN LA PAGINA ME MUESTRA EN TODOS HOLA, MIENTRAS QUE EL JSON HAY TRES QUE DICEN CHAU  */
/*------------------------------------------------------------------------------------------------------------------------*/
  editar(){

    this.modeloBasicoService.planUpdateProyect(this.proyectInformation).subscribe(data=>{
      this.businessPlan.proyectInformation=data;
      // en el proximo cambiar a put hdp
      console.log(this.businessPlan);
      this.proceso.estado='Informacion Proyecto'
      this.modeloBasicoService.planUpdateBusinessPlan(this.businessPlan).subscribe(plan=>{
        this.businessPlan=plan;
        this.proceso.businessPlan=this.businessPlan;
        this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
          this.proceso=pro;
    
          this.router.navigate([`interno/cliente/${this.proceso.canvasModel.client.id}`]);
        })
      })
    })
    
      }
      editarYsalir(){
        this.modeloBasicoService.planUpdateProyect(this.proyectInformation).subscribe(data=>{
          this.businessPlan.proyectInformation=data;
          // en el proximo cambiar a put hdp
          console.log(this.businessPlan);
          this.proceso.estado='Informacion Proyecto'
          this.modeloBasicoService.planUpdateBusinessPlan(this.businessPlan).subscribe(plan=>{
            this.businessPlan=plan;
            this.proceso.businessPlan=this.businessPlan;
            this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
              this.proceso=pro;
            //  this.router.navigate([`interno/cliente/${this.proceso.canvasModel.client.id}`]);
            this.router.navigate(['/procesos']);
            Swal.fire('Exito', 'Informacion del Proyecto creada con exito', 'success');
            })
          })
        })
    
      }
}
