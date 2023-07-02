import { Component, OnInit } from '@angular/core';
import { Process } from '../Process';
import { ActivatedRoute } from '@angular/router';
import { ProcesoService } from '../proceso.service';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';

@Component({
  selector: 'app-ver-procesos',
  templateUrl: './ver-procesos.component.html',
  styleUrls: ['./ver-procesos.component.css']
})
export class VerProcesosComponent implements OnInit {
  client:Client = new Client;
proceso:Process= new Process();
  constructor(private rutaPorParametro: ActivatedRoute,
    private procesoService:ProcesoService, private clienteService:ClientService){}
  ngOnInit(): void {
this.rutaPorParametro.paramMap.subscribe(parametro=>{
  let id = +parametro.get('id');
  if(id){
    this.procesoService.procesosFindById(id).subscribe(data=>{
      this.proceso= data;
      console.log(this.proceso);
this.clienteService.getClient(this.proceso.canvasModel.client.id).subscribe(data=>{
  this.client=data;
})

    })
  }
})
  }

}
