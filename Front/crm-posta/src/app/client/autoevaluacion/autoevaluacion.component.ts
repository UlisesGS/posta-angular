import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../client';

@Component({
  selector: 'app-autoevaluacion',
  templateUrl: './autoevaluacion.component.html',
  styleUrls: ['./autoevaluacion.component.css']
})
export class AutoevaluacionComponent implements OnInit {
  cliente:Client= new Client()
  constructor(private clienteService:ClientService, private rutaParametro:ActivatedRoute){}
  ngOnInit(): void {
this.rutaParametro.paramMap.subscribe(parametro=>{
  let id = +parametro.get('id');
  if (id){
    this.clienteService.getClient(id).subscribe(data=>{
this.cliente= data;
console.log(data);

    })
  }
})
  }

}
