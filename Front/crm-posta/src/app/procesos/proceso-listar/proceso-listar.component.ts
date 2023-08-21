import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { Municipio } from 'src/app/municipio/municipio';
import { ProcesoService } from './../proceso.service';
import { Process } from '../Process';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Usuario } from 'src/app/usuario/usuario';

@Component({
  selector: 'app-proceso-listar',
  templateUrl: './proceso-listar.component.html',
  styleUrls: ['./proceso-listar.component.css']
})
export class ProcesoListarComponent implements OnInit {
  usuario:Usuario= new Usuario();
  value:boolean;
  paginador:any;
  procesos:Process[]=[];
  clientes:Client[]=[];
  clientesProceso:Client[]=[];
  municipios:Municipio[];
  procesoSeleccionado: Process;
  termino:string;
  type:string;
  terminado:boolean;
  estado:string;
  proceso: Process;
  constructor(
    public modal:ModalService,
    private clienteService:ClientService,
    private procesoService:ProcesoService,
    public activatedRoute:ActivatedRoute
    ){

  }
  ngOnInit(): void {
this.usuario= JSON.parse(localStorage.getItem('usuario'));


this.clienteService.getClientsMunicipios().subscribe(data=>{
  //console.log(data);

  this.municipios=data;
})
this.todosPaginacion();

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
  public todos(){
    this.procesoService.procesosFindAll().subscribe(data=>{
      this.procesos=data;
      if(this.usuario.role!='ADMIN'){
        this.procesos = this.procesos.filter(f=>f.user?.id==this.usuario?.id);
      }

      console.log(this.procesos);

    })
  }
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
  public filtroPortype(){
    console.log(this.type);

    this.procesoService.procesoFindByType(this.type).subscribe(data=>{
      console.log(this.type);


      console.log(data);
      this.procesos=data;
      if(this.usuario.role!='ADMIN'){
        this.procesos = this.procesos.filter(f=>f.user?.id==this.usuario?.id);
      }

    })
  }
  public filtroPortermiando(){



  if(this.terminado!==undefined){
    this.procesoService.procesoFindByTermiando(this.terminado).subscribe(data=>{
      this.procesos=data;
      if(this.usuario.role!='ADMIN'){
        this.procesos = this.procesos.filter(f=>f.user?.id==this.usuario?.id);
      }

    })
  }

  }
  public filtroPorEstado(){


    this.procesoService.procesoFindByEstado(this.estado).subscribe(data=>{
      this.procesos=data;
      if(this.usuario.role!='ADMIN'){
        this.procesos = this.procesos.filter(f=>f.user?.id==this.usuario?.id);
      }

    })
  }
  public buscar(){

    if(this.termino!==""){   
      this.procesoService.procesoFindByNombre(this.termino).subscribe(data=>{
        this.procesos=data;
        if(this.usuario.role!='ADMIN'){
          this.procesos = this.procesos.filter(f=>f.user?.id==this.usuario?.id);
        }
      })
    }
  }


  public todosPaginacion(){
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }
      this.procesoService.procesosPaginacion(page)

      // .pipe(
      //   tap(response => {
      //     console.log('ClientesComponent: tap 3');
      //     (response.content as Process[]).forEach(proceso => console.log(proceso));
      //   })
       .subscribe(response => {

        console.log(response);
        

        this.procesos = response.content as Process[];
        this.paginador = response;
        console.log(this.procesos);
        if(this.usuario.role!='ADMIN'){
          this.procesos = this.procesos.filter(f=>f.user?.id==this.usuario?.id);
        }

      });

  })
  }
}