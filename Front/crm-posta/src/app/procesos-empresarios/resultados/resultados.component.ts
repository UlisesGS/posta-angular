import { Component, OnInit } from '@angular/core';
import { ProcessEmpresario } from '../process-empresario';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProcessEmpresarioService } from '../process-empresario.service';
import { Client } from 'src/app/client/client';
import { lastDayOfDecade } from 'date-fns';
import { AnalisisResultados } from '../analisis-resultados';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit{
procesoEmpresario:ProcessEmpresario= new ProcessEmpresario()
procesos:ProcessEmpresario[]=[];
cliente:Client= new Client();
  constructor(private procesoEmpresarioservice: ProcessEmpresarioService,private ruta:ActivatedRoute, private clienteServicio:ClientService){}
  ngOnInit(): void {
this.ruta.paramMap.subscribe(parametro=>{
  let id = + parametro.get('id')
  this.clienteServicio.getClient(id).subscribe(clien=>{
    this.cliente= clien;
    this.procesoEmpresarioservice.procesoEmpresarioFindAll().subscribe(data=>{
      this.procesos= data;
      this.procesos.forEach(p=>{
        if(p.client.id=this.cliente.id){
          this.procesoEmpresario= p;
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
    //this.procesoEmpresarioservice.
    
  }


  guardarYcontinuar(){

  }
}
