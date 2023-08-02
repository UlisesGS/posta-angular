import { Component } from '@angular/core';
import { ProcessEmpresario } from '../process-empresario';
import { Client } from 'src/app/client/client';
import { Process } from 'src/app/procesos/Process';
import { ProcessEmpresarioService } from '../process-empresario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { AnalisisEconomico } from '../analisis-economico';
import { Indicador } from './../indicador';

@Component({
  selector: 'app-economico',
  templateUrl: './economico.component.html',
  styleUrls: ['./economico.component.css']
})
export class EconomicoComponent {


  procesoEmpresario:ProcessEmpresario= new ProcessEmpresario()
//procesos:ProcessEmpresario[]=[];
cliente:Client= new Client();
procesos:Process[]=[];
proceso:Process = new Process();
indicador1:Indicador = new Indicador();
indicador2:Indicador= new Indicador();
indicador3:Indicador = new Indicador();
indicador4:Indicador = new Indicador();
indicador5:Indicador = new Indicador();
indicador6:Indicador = new Indicador();
indicador7:Indicador = new Indicador();
  constructor(
    private procesoEmpresarioservice: ProcessEmpresarioService,
    private ruta:ActivatedRoute,
    private clienteServicio:ClientService,
    private process:ProcesoService,
    private router:Router,
    ){}
  ngOnInit(): void {
    //this.procesoEmpresario.diagnosticoEmpresarial.analisisResultados.
this.ruta.paramMap.subscribe(parametro=>{
  let id = + parametro.get('id')
  this.clienteServicio.getClient(id).subscribe(clien=>{
    this.cliente= clien;
    this.process.procesosFindAll().subscribe(data=>{
      this.procesos= data;

      this.procesos.forEach(pr=>{
        console.log(pr);


          if(pr.processEmpresario?.client?.id == this.cliente.id){
            console.log(pr);

              this.proceso=pr
              this.proceso.processEmpresario.diagnosticoEmpresarial.analisisEconomico=new AnalisisEconomico();
          }
        })






        })
      })
    })
  }


  guardar(){

console.log(this.indicador1);
console.log(this.indicador2);


  }
}
