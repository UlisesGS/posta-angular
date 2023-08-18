import { Component, HostListener, Input, OnInit, SimpleChanges, ɵdetectChanges } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { Observable, Subscription, fromEvent, tap } from 'rxjs';
import { ModalService } from './modal.service';
import { ActivatedRoute } from '@angular/router';
import { Municipio } from '../municipio/municipio';
import { AuthService } from '../auth/auth.service';
import { BusquedaService } from '../busqueda.service';
import { ProcesoService } from './../procesos/proceso.service';
import { Process } from '../procesos/Process';
import { Usuario } from '../usuario/usuario';



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {




  datosFiltrados: string;

  usuario: Usuario = new Usuario();
  procesos: Process[] = [];
  proceso: Process = new Process();
  clients: Client[];
  client: Client = new Client();

  municicipios: Municipio[];

  clienteSeleccionado: Client;
  paginador: any;

  condicion: boolean = false;
  public value: boolean;
  public genero: string;
  public type: string;
  public modal: boolean;
  public ciu: any;
  public municipio: number;
  public termino: string;
  exite: boolean;
  active:boolean;




  constructor(private serviceClient: ClientService,
    public modalservice: ModalService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public busquedaService: BusquedaService,
    public procesoService: ProcesoService,
  ) { }


  ngOnInit(): void {

    this.filtrarDato()
    this.modal = false;

    this.usuario = JSON.parse(localStorage.getItem('usuario'));

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }
      this.serviceClient.getClientsPaginar(page)
        .pipe(
          tap(response => {
            console.log('ClientesComponent: tap 3');
            (response.content as Client[]).forEach(cliente => console.log(cliente.name));
          })
        ).subscribe(response => {
          this.clients = response.content as Client[];
          this.paginador = response;

          if(this.usuario.role!='ADMIN'){
            this.clients= this.clients.filter(c=>c?.user?.id==this.usuario?.id);

          }
        });

    })
    this.serviceClient.getClientsMunicipios().subscribe(data => {
      this.municicipios = data;
      console.log(this.municicipios);


    })
    this.condicion = false;
    this.procesoService.procesosFindAll().subscribe(lista => {
      this.procesos = lista;
      console.log(this.procesos);


    })
  }
  buscarNav() {


    })
    this.serviceClient.getClientsMunicipios().subscribe(data => {
      this.municicipios = data;
      console.log(this.municicipios);


/*<<<<<<< juanma
    })
    this.condicion = false;
    this.procesoService.procesosFindAll().subscribe(lista => {
      this.procesos = lista;
      console.log(this.procesos);


    })
  }
  buscarNav() {
    console.log(this.busquedaService.getTermino());
      this.serviceClient.buscarPorNombre(this.busquedaService.getTermino()).subscribe(data => {
        this.clients = data;
        this.exite = false

      }, e => {
        console.log(e);
        this.exite = true
      })
  }

  public buscar() {

    console.log("buscar" + this.termino);

    if(this.termino!==""){

      this.serviceClient.buscarPorNombre(this.termino).subscribe(data => {
        this.clients = data;
      })
    }
=======*/

    this.serviceClient.buscarPorNombre(this.busquedaService.getTermino()).subscribe(data => {
      this.clients = data;
      if(this.usuario.role!='ADMIN'){
        this.clients= this.clients.filter(c=>c?.user?.id==this.usuario?.id);

      }
      this.exite = false

    }, e => {
      console.log(e);

      this.exite = true
    })


  }

  public buscar() {

    console.log("buscar" + this.termino);

    this.serviceClient.buscarPorNombre(this.termino).subscribe(data => {
      this.clients = data;
      if(this.usuario.role!='ADMIN'){
        this.clients= this.clients.filter(c=>c?.user?.id==this.usuario?.id);

      }
    })
//>>>>>>> master
    // en el html {{busquedaService.getTermino().length>0  && busquedaService.getTermino().length!=0?buscar(busquedaService.getTermino()):""}}
  }

  public todos() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }
      this.serviceClient.getClientsPaginar(page)
        .pipe(
          tap(response => {
            console.log('ClientesComponent: tap 3');
            (response.content as Client[]).forEach(cliente => console.log(cliente.name));
          })
        ).subscribe(response => {
          console.log(response);

          this.clients = response.content as Client[];
          this.paginador = response;
          if(this.usuario.role!='ADMIN'){
            this.clients= this.clients.filter(c=>c?.user?.id==this.usuario?.id);

          }
        });

    })
  }



  public reiniciarFiltro() {
    this.genero = undefined;
    this.type = undefined;
    this.municipio = undefined;
    this.value = false; /* SI LO DEJAS EN TRUE NO MUESTRA LA PAGINACION */
    this.todos();
  }


  public cambiarCondicion() {
    if (this.value) {
      this.value = false;
      this.todos();
    } else {
      this.value = true;
    }
  }
  public filtroPorGenero() {
    console.log(this.genero);
    this.serviceClient.getClientsGender(0, this.genero).subscribe(data => {
      this.clients = data.content;
      if(this.usuario.role!='ADMIN'){
        this.clients= this.clients.filter(c=>c?.user?.id==this.usuario?.id);

      }
    })


  }
  public filtroPorType() {
    this.serviceClient.getClientType(0, this.type).subscribe(data => {
      this.clients = data.content;
      if(this.usuario.role!='ADMIN'){
        this.clients= this.clients.filter(c=>c?.user?.id==this.usuario?.id);


      }
    })
  }
  public ClientsDelete(id:number): void{
    console.log(id);

    this.serviceClient.ClientsDelete(id).subscribe( data => {
      console.log(data);

      this.todos();
    })
  }


  public findByState(){
    
    
    this.serviceClient.findByState(this.active).subscribe(date=>{
      console.log(date);
      
      this.clients=date;

    })

  }


  abrirModal(): void {
    this.modalservice.abrirModal();
  }

  abrirModalAction(client: Client, procesos: Process[]) {
    /*this.procesoService.procesosFindAll().subscribe(data=>{
      this.procesos= data;

    })*/
    this.clienteSeleccionado = client;



    this.modalservice.abrirModalAction();

  }
  public filtrarPorMunicipio() {
    console.log(this.municipio);


   if(this.municipio!==undefined){

     this.serviceClient.getClientsMunicipiosPage(0, this.municipio).subscribe(data => {
       this.clients = data.content;
       console.log(data);
 
     })
   }

  }
  filtrarDato() {
    this.datosFiltrados = this.busquedaService.getTermino();
    console.log(this.datosFiltrados);


  }


}
