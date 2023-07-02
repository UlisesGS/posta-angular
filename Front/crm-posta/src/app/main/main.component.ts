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

  municicipios: Municipio[];

  clienteSeleccionado: Client;
  paginador: any;


  public value: boolean;
  public genero: string;
  public type: string;
  public modal: boolean;
  public ciu: any;
  public municipio: number;
  public termino: string;

  ngOnInit(): void {
    this.procesosService.procesosFindAllUltimo().subscribe(data=>{
      this.procesos=data;
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
          console.log(this.paginador);
        });

    })
    this.serviceClient.getClientsMunicipios().subscribe(data => {
      this.municicipios = data;
      console.log(this.municicipios);


    })
  }

  abrirModal():void{
    this.modalservice.abrirModal();
  }

  abrirModalAction(client: Client) {
    this.clienteSeleccionado = client;
    this.modalservice.abrirModalAction();
  }


}
