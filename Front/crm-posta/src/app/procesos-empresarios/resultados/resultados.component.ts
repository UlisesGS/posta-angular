import { Component, Input, OnInit } from '@angular/core';
import { ProcessEmpresario } from '../process-empresario';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProcessEmpresarioService } from '../process-empresario.service';
import { Client } from 'src/app/client/client';
import { lastDayOfDecade } from 'date-fns';
import { AnalisisResultados } from '../analisis-resultados';
import { Process } from 'src/app/procesos/Process';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { DiagnosticoEmpresarial } from '../diagnostico-empresarial';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  @Input()idVer:number;
  procesoEmpresario: ProcessEmpresario = new ProcessEmpresario()
  cliente: Client = new Client();
  procesos: Process[] = [];
  proceso: Process = new Process();
  constructor(private procesoEmpresarioservice: ProcessEmpresarioService,
    private ruta: ActivatedRoute,
    private clienteServicio: ClientService,
    private process: ProcesoService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    
    this.ruta.paramMap.subscribe(parametro => {
      let id = + parametro.get('id')
      this.clienteServicio.getClient(id).subscribe(clien => {
        this.cliente = clien;
        this.process.procesosFindAll().subscribe(data => {
          this.procesos = data;
          this.procesos.forEach(pr => {
            if (pr.processEmpresario?.client?.id == this.cliente.id) {
              this.proceso = pr
              this.proceso.processEmpresario.diagnosticoEmpresarial.analisisResultados = new AnalisisResultados();
              // para editar
              let idEditar = +parametro.get('idEditar');
              if (idEditar) {
                this.proceso = new Process()
                this.proceso.processEmpresario = new ProcessEmpresario();
                this.proceso.processEmpresario.diagnosticoEmpresarial = new DiagnosticoEmpresarial();
                this.proceso.processEmpresario.diagnosticoEmpresarial.analisisResultados = new AnalisisResultados();
                this.process.procesosFindById(idEditar).subscribe(data => {
                  this.proceso = data;
                })
              }
              //Para Ver
              if (this.idVer) {
                this.proceso = new Process()
                this.proceso.processEmpresario = new ProcessEmpresario();
                this.proceso.processEmpresario.diagnosticoEmpresarial = new DiagnosticoEmpresarial();
                this.proceso.processEmpresario.diagnosticoEmpresarial.analisisResultados = new AnalisisResultados();
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
    this.procesoEmpresarioservice.procesoEmpresarioSave(this.proceso).subscribe(data => { console.log(data);
      this.proceso.estado = 'Resultados'
      this.process.procesosUpdate(this.proceso).subscribe(dato => {
      })
      this.router.navigate(['/procesos']);
      Swal.fire('Exito', 'Analisis Resultados creados con exito', 'success');
    })
  }


  guardarYcontinuar() {
    this.procesoEmpresarioservice.procesoEmpresarioSave(this.proceso).subscribe(data => { console.log(data);
      this.proceso.estado = 'Resultados'
      this.process.procesosUpdate(this.proceso).subscribe(dato => {
      })
      this.router.navigate(['/empresario/economico/cliente/', this.cliente.id]);
    })
  }

  editar() {
    this.procesoEmpresarioservice.updateProcesoResultado(this.proceso).subscribe(data => {
    })

    this.router.navigate([`/procesos`])
    Swal.fire('Exito', 'Analisis Resultados editados con exito', 'success');
  }



  editarYcontinuar() {
    this.procesoEmpresarioservice.updateProcesoResultado(this.proceso).subscribe(data => {
    })
    if (this.proceso.processEmpresario.diagnosticoEmpresarial.analisisEconomico) {
      this.router.navigate([`/economico/empresario/${this.cliente.id}/editar/${this.proceso.id}`])
    } else {
      this.router.navigate(['/empresario/economico/cliente/', this.cliente.id])
    }
  }
}
