import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client/client.service';
import { ModalService } from '../client/modal.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Client } from '../client/client';
import { Municipio } from '../municipio/municipio';
import { Observable, tap } from 'rxjs';
import { Process } from '../procesos/Process';
import { ProcesoService } from '../procesos/proceso.service';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private serviceClient: ClientService,
    public modalservice: ModalService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public procesosService:ProcesoService,) { }
    procesos:Process[]=[];
  clients: Client[];
  client: Client;
  usuario:Usuario= new Usuario();
  municicipios: Municipio[];

  clienteSeleccionado: Client;
  procesoSeleccionado: Process;
  paginador: any;


  public value: boolean;
  public genero: string;
  public type: string;
  public modal: boolean;
  public ciu: any;
  public municipio: number;
  public termino: string;

  ngOnInit(): void {
this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.procesosService.procesosFindAllUltimo().subscribe(data=>{
      console.log(this.usuario);

      this.procesos=data;
      if(this.usuario.role!='ADMIN'){
        this.procesos= this.procesos.filter(f=>f?.user?.id==this.usuario?.id);
      }

    })
    this.modal = false;

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }
      this.serviceClient.getClientsByTime(page)
        .pipe(
          tap(response => {
            console.log('ClientesComponent: tap 3');
            (response.content as Client[]).forEach(cliente => console.log(cliente.name));
          })
        ).subscribe(response => {


          this.clients = response.content as Client[];
          this.paginador = response;

          if(this.usuario.role!='ADMIN'){
            this.clients= this.clients.filter(f=>f.user.id==this.usuario.id);
          }
        //  console.log(this.paginador);

        });

    })
    this.serviceClient.getClientsMunicipios().subscribe(data => {
      this.municicipios = data;
      //console.log(this.municicipios);


    })
   
    
  }

  abrirModal():void{
    this.modalservice.abrirModal();
  }

  abrirModalAction(client: Client) {
    this.clienteSeleccionado = client;
    this.modalservice.abrirModalAction();
  }
  abrirModalActionProceso(process: Process) {
    this.procesoSeleccionado = process;
    this.modalservice.abrirModalPocesos();
  }


}
