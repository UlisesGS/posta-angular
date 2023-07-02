import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { Municipio } from 'src/app/municipio/municipio';
import { ProcesoService } from './../proceso.service';
import { Process } from '../Process';

@Component({
  selector: 'app-proceso-listar',
  templateUrl: './proceso-listar.component.html',
  styleUrls: ['./proceso-listar.component.css']
})
export class ProcesoListarComponent implements OnInit {
  value:boolean;
  paginador:any;
  procesos:Process[]=[];
  clientes:Client[]=[];
  clientesProceso:Client[]=[];
  municipios:Municipio[];
  procesoSeleccionado: Process;
  constructor(
    public modal:ModalService,
    private clienteService:ClientService,
    private procesoService:ProcesoService
    ){

  }
  ngOnInit(): void {
this.clienteService.getClientsMunicipios().subscribe(data=>{
  //console.log(data);

  this.municipios=data;
})
/*
this.clienteService.clienteListarTodos().subscribe(data=>{
 // console.log(data);

  this.clientes=data;
  console.log(this.clientes);
  this.clientes.forEach(cliente=>{
    if(cliente.canvasModel==null){
      console.log('es null');

    }else{
      this.clientesProceso.push(cliente);
    }


  })
  console.log(this.clientesProceso);
 //this.clientes= this.clientes.filter(cliente=>cliente.canvasModel==null);
})
*/
this.procesoService.procesosFindAll().subscribe(data=>{
  this.procesos=data;
  console.log(this.procesos);

})



  }
  public cambiarCondicion(){
    if(this.value){
      this.value=false;
      this.todos();
     }else{
       this.value=true;
     }
  }
 public abrirModalAction(proceso:Process){
  this.procesoSeleccionado=proceso;
this.modal.abrirModalPocesos();
  }
  public todos(){}
  public reiniciarFiltro(){
  //  this.genero = undefined;
  //  this.type = undefined;
 //   this.municipio = undefined;
    this.value=false; /* SI LO DEJAS EN TRUE NO MUESTRA LA PAGINACION */
    this.todos();
  }
  public abrirModalNuevoProceso(){

    this.modal.abrirModalAsesoria();
  }
}
