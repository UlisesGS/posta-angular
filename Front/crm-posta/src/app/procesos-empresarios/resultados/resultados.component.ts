import { Component, OnInit } from '@angular/core';
import { ProcessEmpresario } from '../process-empresario';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProcessEmpresarioService } from '../process-empresario.service';
import { Client } from 'src/app/client/client';
import { lastDayOfDecade } from 'date-fns';
import { AnalisisResultados } from '../analisis-resultados';
import { Process } from 'src/app/procesos/Process';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit{
procesoEmpresario:ProcessEmpresario= new ProcessEmpresario()
//procesos:ProcessEmpresario[]=[];
cliente:Client= new Client();
procesos:Process[]=[];
proceso:Process = new Process();
  constructor(private procesoEmpresarioservice: ProcessEmpresarioService,
    private ruta:ActivatedRoute,
    private clienteServicio:ClientService,
private router:Router,
    ){}
  ngOnInit(): void {
    //this.procesoEmpresario.diagnosticoEmpresarial.analisisResultados.
this.ruta.paramMap.subscribe(parametro=>{
  let id = + parametro.get('id')
  this.clienteServicio.getClient(id).subscribe(clien=>{
    this.cliente= clien;
    this.procesoEmpresarioservice.procesoEmpresarioFindAll().subscribe(data=>{
      this.procesos= data;
      this.procesos.forEach(p=>{
        if(p.processEmpresario.client.id=this.cliente.id){
          this.proceso= p;

          this.procesoEmpresario = this.proceso.processEmpresario;
          this.procesoEmpresario.diagnosticoEmpresarial.analisisResultados=new AnalisisResultados();
          console.log('hola');

          console.log(p);

        }
      })
    })
  })
})
  }


  guardar(){

    console.log(this.procesoEmpresario.diagnosticoEmpresarial.analisisResultados);
    this.procesoEmpresarioservice.procesoEmpresarioSave(this.procesoEmpresario).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/empresario/economico/cliente/',this.cliente.id]);
    })

  }


  guardarYcontinuar(){

  }
}
