import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { Process } from 'src/app/procesos/Process';
import { ProcesoService } from 'src/app/procesos/proceso.service';

@Component({
  selector: 'app-ver-financiero',
  templateUrl: './ver-financiero.component.html',
  styleUrls: ['./ver-financiero.component.css']
})
export class VerFinancieroComponent implements OnInit {
  venta: boolean = false;
  compra: boolean = false;
  gasto: boolean = false;
  inversion: boolean = false;
  cliente: Client = new Client;
  proceso:Process = new Process;
  constructor(private clienteService:ClientService, private procesoService:ProcesoService,private rutaParametro:ActivatedRoute) {

  }

  ngOnInit(): void {
 
  this.rutaParametro.paramMap.subscribe(parametro=>{
    let id =+ parametro.get('id');
    let idVer=+ parametro.get('idVer1')
    if (id){
      this.clienteService.getClient(id).subscribe(data=>{
        this.cliente= data;
      
      })


    }
    if(idVer){
      this.procesoService.procesosFindById(idVer).subscribe(d=>{
        this.proceso = d;
      })
    }
  })    

  }
  condicionVenta() {
    if (this.venta) {
      this.venta = false;
    } else {
      this.venta = true;
    }
  }
  condicionCompra() {
    if (this.compra) {
      this.compra = false;
    } else {
      this.compra = true;
    }
  }
  condicionGasto() {
    if (this.gasto) {
      this.gasto = false;
    } else {
      this.gasto = true;
    }
  }
  condicionInversion() {
    if (this.inversion) {
      this.inversion = false;
    } else {
      this.inversion = true;
    }
  }

}
