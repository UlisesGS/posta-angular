import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { Process } from 'src/app/procesos/Process';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { DofaAnalisis } from './../../DofaAnalisis';
import { BusinessPlan } from './../../BusinessPlan';
import { ModeloBasicoService } from '../../modelo-basico.service';

@Component({
  selector: 'app-dofa',
  templateUrl: './dofa.component.html',
  styleUrls: ['./dofa.component.css']
})
export class DofaComponent {
  cliente: Client = new Client();
  value:boolean;
  procesos:Process[]=[];
  proceso:Process= new Process();
  dofaAnalisis:DofaAnalisis= new DofaAnalisis();
  businessPlan:BusinessPlan= new BusinessPlan();
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
                  console.log(this.proceso);

                }
              })
            })

          })
        }
      })
    }
    guardar(){
      this.modeloBasicoService.planSaveDofa(this.dofaAnalisis).subscribe(data=>{
        this.businessPlan.dofaAnalisis=data;
        this.proceso.businessPlan.dofaAnalisis=data;
        this.proceso.estado='Analisis Dofa';
        console.log(this.proceso);

        // en el proximo cambiar a put hdp
        //console.log(this.businessPlan);

        this.modeloBasicoService.planUpdateBusinessPlan(this.proceso.businessPlan).subscribe(plan=>{
          this.businessPlan=plan;
          this.proceso.businessPlan=this.businessPlan;
          this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
            this.proceso=pro;
            this.router.navigate([`conclusion/cliente/${this.proceso.canvasModel.client.id}`]);
          })
        })
      })

        }
        guardarYsalir(){

          this.modeloBasicoService.planSaveDofa(this.dofaAnalisis).subscribe(data=>{
            this.businessPlan.dofaAnalisis=data;
            this.proceso.businessPlan.dofaAnalisis=data;
            this.proceso.estado='Analisis Dofa';
            console.log(this.proceso);
            // en el proximo cambiar a put hdp
          //  console.log(this.businessPlan);

            this.modeloBasicoService.planUpdateBusinessPlan(this.proceso.businessPlan).subscribe(plan=>{
              this.businessPlan=plan;
              this.proceso.businessPlan=this.businessPlan;
              this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
                this.proceso=pro;
                this.router.navigate(['/procesos']);
              //  this.router.navigate([`dofa/cliente/${this.proceso.canvasModel.client.id}`]);
              })
            })
          })

        }
}
