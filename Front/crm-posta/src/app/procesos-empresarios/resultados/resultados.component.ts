import { Component, OnInit } from '@angular/core';
import { ProcessEmpresario } from '../process-empresario';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProcessEmpresarioService } from '../process-empresario.service';
import { Client } from 'src/app/client/client';
import { lastDayOfDecade } from 'date-fns';
import { AnalisisResultados } from '../analisis-resultados';
import { Process } from 'src/app/procesos/Process';
import { ProcesoService } from 'src/app/procesos/proceso.service';

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
              this.proceso.processEmpresario.diagnosticoEmpresarial.analisisResultados=new AnalisisResultados();
          }
        })
          
          

          
          

        })
      })
    })
  }

  


  guardar(){
    this.procesoEmpresarioservice.procesoEmpresarioSave(this.proceso).subscribe(data=>{
      console.log(data);
      this.proceso.estado='Resultados'

      this.process.procesosUpdate(this.proceso).subscribe(dato=>{

      })

      this.router.navigate(['/empresario/economico/cliente/',this.cliente.id]);

    
    })

    

  }


  guardarYcontinuar(){

  }
}