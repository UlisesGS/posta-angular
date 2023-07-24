import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/client/client';
import { Process } from '../../Process';
import { ClientService } from 'src/app/client/client.service';
import { ProcesoService } from '../../proceso.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-puntaje',
  templateUrl: './ver-puntaje.component.html',
  styleUrls: ['./ver-puntaje.component.css']
})
export class VerPuntajeComponent implements OnInit {
  cliente: Client = new Client();
  proceso: Process = new Process();
  procesos: Process [];

  constructor(private clientService:ClientService,
    private procesoService:ProcesoService,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(parametro=>{
      let id=+parametro.get('id')
      if(id){
        this.clientService.getClient(id).subscribe(data=>{
          this.cliente=data;
          this.procesoService.procesosFindAll().subscribe(procesos=>{
            this.procesos=procesos;
            this.procesos.forEach(p=>{
              if(p.selfAssessment?.client?.id==this.cliente?.id){
                this.proceso=p;
                console.log(this.proceso);
                
              }
              
            })
          })
        })
      }
    })
    
  }
}
