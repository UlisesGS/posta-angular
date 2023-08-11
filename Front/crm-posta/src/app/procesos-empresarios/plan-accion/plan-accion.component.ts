import { Component } from '@angular/core';
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


  procesoEmpresario: ProcessEmpresario = new ProcessEmpresario()
  //procesos:ProcessEmpresario[]=[];
  cliente: Client = new Client();
  procesos: Process[] = [];
  proceso: Process = new Process();

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
      this.clienteServicio.getClient(id).subscribe(clien => {
        this.cliente = clien;
        this.process.procesosFindAll().subscribe(data => {
          this.procesos = data;

          this.procesos.forEach(pr => {
            console.log(pr);


            if (pr.processEmpresario?.client?.id == this.cliente.id) {
              console.log(pr);

              this.proceso = pr
              this.proceso.processEmpresario.planDeAccion=new PlanDeAccion();
              this.proceso.processEmpresario.planDeAccion.lineamientosBasicos=new AreaIntervenir();
              this.proceso.processEmpresario.planDeAccion.mercadeoVentas=new AreaIntervenir();
              this.proceso.processEmpresario.planDeAccion.produccionOperaciones=new AreaIntervenir();
              this.proceso.processEmpresario.planDeAccion.talentoHumano=new AreaIntervenir();
              // para editar
              let idEditar = +parametro.get('idEditar');
              console.log('no entro al if');

              if (idEditar) {
                this.process.procesosFindById(idEditar).subscribe(data => {

                  this.proceso = data;
                  console.log(this.proceso);
                  
                  

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
        this.router.navigate(['/procesos'])
      })

    })
  }

  editar(){
    console.log(this.proceso);
  }
}
