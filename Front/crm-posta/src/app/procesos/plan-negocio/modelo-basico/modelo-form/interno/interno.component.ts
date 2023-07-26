import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { Process } from 'src/app/procesos/Process';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { BusinessPlan } from './../../BusinessPlan';
import { InternalExternalAnalysis } from '../../InternalExternalAnalysis';
import { ModeloBasicoService } from './../../modelo-basico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interno',
  templateUrl: './interno.component.html',
  styleUrls: ['./interno.component.css']
})
export class InternoComponent {
  businessPlan:BusinessPlan= new BusinessPlan();
  internalExternalAnalysis:InternalExternalAnalysis= new InternalExternalAnalysis()
  cliente: Client = new Client();
  value:boolean;
  procesos:Process[]=[];
  proceso:Process= new Process();
  idVer1: number;

  constructor(private modalService: ModalService,
    private clienteService: ClientService,
    private rutaParametro: ActivatedRoute,
    private procesoService:ProcesoService,
    private modeloBasicoService: ModeloBasicoService,
    private router:Router) { }
    ngOnInit(): void {
      this.rutaParametro.paramMap.subscribe(parametro => {
        let id = +parametro.get('id');
        this.idVer1 = +parametro.get('idVer1');
        if (id) {
          this.clienteService.getClient(id).subscribe(data => {
            this.cliente = data;
            //console.log(data);
            this.procesoService.procesosFindAll().subscribe(pro => {
              this.procesos=pro;

              this.procesos.forEach(proceso=>{
                if(proceso.canvasModel.client.id==this.cliente.id){
                  this.proceso=proceso;
                  this.proceso.businessPlan=proceso.businessPlan;
                  console.log(this.proceso);


                     //para ver
                if (this.idVer1) {
                  this.procesoService.procesosFindById(this.idVer1).subscribe(data => {
                    this.proceso = data;
                    this.internalExternalAnalysis = this.proceso.businessPlan.analisis;
                    console.log(this.internalExternalAnalysis);

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
      this.modeloBasicoService.planSaveAnalisis(this.internalExternalAnalysis).subscribe(data=>{
        this.businessPlan.analisis=data;
        this.proceso.businessPlan.analisis=data;
        this.proceso.estado='Analisis Interno/Externo';
        console.log(this.proceso);

        // en el proximo cambiar a put hdp
        console.log(this.businessPlan);

        this.modeloBasicoService.planUpdateBusinessPlan(this.proceso.businessPlan).subscribe(plan=>{
          this.businessPlan=plan;
          this.proceso.businessPlan=this.businessPlan;
          this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
            this.proceso=pro;
            this.router.navigate([`dofa/cliente/${this.proceso.canvasModel.client.id}`]);
          })
        })
      })

        }
        guardarYsalir(){

          this.modeloBasicoService.planSaveAnalisis(this.internalExternalAnalysis).subscribe(data=>{
            this.businessPlan.analisis=data;
            this.proceso.businessPlan.analisis=data;
            this.proceso.estado='Analisis Interno/Externo';
            console.log(this.proceso);
            // en el proximo cambiar a put hdp
          //  console.log(this.businessPlan);

            this.modeloBasicoService.planUpdateBusinessPlan(this.proceso.businessPlan).subscribe(plan=>{
              this.businessPlan=plan;
              this.proceso.businessPlan=this.businessPlan;
              this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
                this.proceso=pro;
                this.router.navigate(['/procesos']);
                Swal.fire('Exito', 'Analisis interno y externo creada con exito', 'success');
              //  this.router.navigate([`dofa/cliente/${this.proceso.canvasModel.client.id}`]);
              })
            })
          })

        }
}
