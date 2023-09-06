import { Component, OnInit } from '@angular/core';
import { DetallesComponent } from './../../../../client/detalles/detalles.component';
import { Client } from 'src/app/client/client';
import { Process } from 'src/app/procesos/Process';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';


@Component({
  selector: 'app-modelo-lista',
  templateUrl: './modelo-lista.component.html',
  styleUrls: ['./modelo-lista.component.css']
})
export class ModeloListaComponent implements OnInit{

  
    cliente: Client = new Client();
    procesos: Process[];
    proceso: Process = new Process();
    procesoSeleccionado: Process;
  
    autoB:string;
    canvasB:string;
    negociosB:string;
    financieroB:string;
  
    tipoVer:string;
  
    informacion:boolean=false;
    analisis:boolean=false;
    dofa:boolean=false;
    conclusion:boolean=false;
  
    constructor(
      private procesoService: ProcesoService,
      private rutaParametro: ActivatedRoute,
      private clienteService: ClientService,
      public modalService: ModalService,
      
    ) { }
  ngOnInit(): void {
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      let idVer=+parametro.get('idVer');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          console.log(data);
          this.procesoService.procesosFindAll().subscribe(pro => {
            this.procesos = pro;

            this.procesos.forEach(proceso => {
              
              if (proceso?.canvasModel?.client?.id == this.cliente.id) {
                this.proceso = proceso;
                
                
                
              }
            })
          })

        })
      }
      if (idVer) {
   
        
        this.clienteService.getClient(idVer).subscribe(data => {
          this.cliente = data;
          console.log(data);
          this.procesoService.procesosFindAll().subscribe(pro => {
            this.procesos = pro;

            this.procesos.forEach(proceso => {
              
              if (proceso.canvasModel.client.id == this.cliente.id) {
                this.proceso = proceso;
                
                
                
              }
            })
          })

        })
      }

    })
    
  }

  condicionInformacion(){
    if(this.informacion){
      this.informacion=false;
    }else{
      this.informacion=true;
    }
  }
  condicionAnalisis(){
    if(this.analisis){
      this.analisis=false;
    }else{
      this.analisis=true;
    }
  }
  condicionDofa(){
    if(this.dofa){
      this.dofa=false;
    }else{
      this.dofa=true;
    }
  }
  condicionConclusion(){
    if(this.conclusion){
      this.conclusion=false;
    }else{
      this.conclusion=true;
    }
  }

}
