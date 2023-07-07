import { Component, OnInit } from '@angular/core';
import { Process } from '../Process';
import { ActivatedRoute } from '@angular/router';
import { ProcesoService } from '../proceso.service';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';

@Component({
  selector: 'app-ver-procesos',
  templateUrl: './ver-procesos.component.html',
  styleUrls: ['./ver-procesos.component.css']
})
export class VerProcesosComponent implements OnInit {
  client: Client = new Client;
  procesoSeleccionado : Process;
  proceso: Process = new Process();
  valor:boolean=false;
  bool1:boolean=false;
  constructor(
    private rutaPorParametro: ActivatedRoute,
    private procesoService: ProcesoService,
    private clienteService: ClientService,
    public modalService:ModalService) { }

  ngOnInit(): void {
    this.rutaPorParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.procesoService.procesosFindById(id).subscribe(data => {
          this.proceso = data;
          console.log(this.proceso);
          this.clienteService.getClient(this.proceso.canvasModel.client.id).subscribe(data => {
            this.client = data;
          })

        })
      }
    })
  }


  public abrirAesoria(){
    this.modalService.abrirModalAsesoria();
  }

  public abrirVerMasSegmento(proceso:Process, bool:boolean) {
    this.bool1=bool;
    this.procesoSeleccionado=proceso;
    this.modalService.abrirVerMas();
  }


  public abrirVerMasPropuesta(proceso:Process, bool:boolean) {
    this.bool1=bool;
    this.procesoSeleccionado=proceso;
    this.modalService.abrirVerMas1();
  }


  public abrirVerMasCanales(proceso:Process, bool:boolean) {
    this.bool1=bool;
    this.procesoSeleccionado=proceso;
    this.modalService.abrirVerMas2();
  }


  public abrirVerMasRelaciones(proceso:Process,bool:boolean) {
    this.bool1=bool;
    this.procesoSeleccionado=proceso;
    this.modalService.abrirVerMas3();
  }


  public abrirVerMasRecursosClaves(proceso:Process,bool:boolean) {
    this.bool1=bool;
    this.procesoSeleccionado=proceso;
    this.modalService.abrirVerMas4();
  }


  public abrirVerMasActividadesClaves(proceso:Process,bool:boolean) {
    this.bool1=bool;
    this.procesoSeleccionado=proceso;
    this.modalService.abrirVerMas5();
  }


  public abrirVerMasSociosClaves(proceso:Process,bool:boolean) {
    this.bool1=bool;
    this.procesoSeleccionado=proceso;
    this.modalService.abrirVerMas6();
  }


  public abrirVerMasIngresos(proceso:Process, bool:boolean) {
    this.bool1=bool;
    this.procesoSeleccionado=proceso;
    this.modalService.abrirVerMas7();
  }


  public abrirVerMasEstructuraCostos(proceso:Process,bool:boolean) {
    this.bool1=bool;
    this.procesoSeleccionado=proceso;
    this.modalService.abrirVerMas8();
  }
}
