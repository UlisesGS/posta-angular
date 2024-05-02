import { Component, Input } from '@angular/core';
import { ProcessEmpresarioService } from '../process-empresario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { ProcessEmpresario } from '../process-empresario';
import { Client } from 'src/app/client/client';
import { Process } from 'src/app/procesos/Process';
import Swal from 'sweetalert2';
import { PlanDeAccion } from '../plan-de-accion';
import { AreaIntervenir } from '../area-intervenir';

@Component({
  selector: 'app-plan-accion',
  templateUrl: './plan-accion.component.html',
  styleUrls: ['./plan-accion.component.css']
})
export class PlanAccionComponent {
  @Input()idVer:number;

  procesoEmpresario: ProcessEmpresario = new ProcessEmpresario()
  //procesos:ProcessEmpresario[]=[];
  cliente: Client = new Client();
  procesos: Process[] = [];
  proceso: Process = new Process();
  idEditar1:number;
  constructor(
    private procesoEmpresarioservice: ProcessEmpresarioService,
    private ruta: ActivatedRoute,
    private clienteServicio: ClientService,
    private process: ProcesoService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    //this.procesoEmpresario.diagnosticoEmpresarial.analisisResultados.
   
    
    this.ruta.paramMap.subscribe(parametro => {
      let id = + parametro.get('id')
      this.idEditar1= + parametro.get('idEditar1');
      this.clienteServicio.getClient(id).subscribe(clien => {
        this.cliente = clien;
        this.process.procesosFindAll().subscribe(data => {
          this.procesos = data;

          this.procesos.forEach(pr => {
            if (pr.processEmpresario?.client?.id == this.cliente.id) {
              this.proceso = pr
              this.proceso.processEmpresario.planDeAccion=new PlanDeAccion();
              this.proceso.processEmpresario.planDeAccion.lineamientosBasicos=new AreaIntervenir();
              this.proceso.processEmpresario.planDeAccion.mercadeoVentas=new AreaIntervenir();
              this.proceso.processEmpresario.planDeAccion.produccionOperaciones=new AreaIntervenir();
              this.proceso.processEmpresario.planDeAccion.talentoHumano=new AreaIntervenir();
              this.proceso.processEmpresario.planDeAccion.registroMarcas=new AreaIntervenir();
              this.proceso.processEmpresario.planDeAccion.noContemplados=new AreaIntervenir();
              // para editar
              let idEditar = +parametro.get('idEditar');
              console.log('no entro al if');
              if(this.idEditar1){
                this.process.procesosFindById(this.idEditar1).subscribe(data => {
                  this.proceso = data;
                  
                })
              }
              if (idEditar) {
                this.process.procesosFindById(idEditar).subscribe(data => {
                  this.proceso = data;
                  
                })
              }
              this.idVer=+parametro.get('idVer');
              if (this.idVer) {
               
                
                this.process.procesosFindById(this.idVer).subscribe(data => {
                  this.proceso = data;
                 
                  
                })
              }
            }
          })






        })
      })
    })
  }



  guardar() {

   this.procesoEmpresarioservice.procesoEmpresarioSave(this.proceso).subscribe(data => {
      this.proceso.estado = 'Plan Accion';
      this.proceso.estadoAnteriorEmpresario = 'Plan Accion';
      this.process.procesosUpdate(this.proceso).subscribe(p => {
        Swal.fire('Exito', 'El plan de Accion fue creado con exito', 'success');
        this.router.navigate(['/procesos'])
      })

    })
  }

  editar(){
    this.procesoEmpresarioservice.updatePlanDeAccion(this.proceso).subscribe(data=>{
      if(this.idEditar1){
        this.router.navigate([`/empresario/accion/cliente/${this.cliente.id}/ver/${this.proceso.id}`])
        Swal.fire('Exito', 'El plan de Accion fue editado con exito', 'success')
      }else{
        this.router.navigate(['/procesos']);
        Swal.fire('Exito', 'El plan de Accion fue editado con exito', 'success')
      }
    
     
    })
  }
}
