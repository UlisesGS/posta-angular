import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { Municipio } from 'src/app/municipio/municipio';
import { Asesoria } from 'src/app/usuario/asesoria';
import { Usuario } from 'src/app/usuario/usuario';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import Swal from 'sweetalert2';
import { SelfAssessment } from './../selfAssessment';
import { ProcesoService } from '../proceso.service';
import { Process } from '../Process';

@Component({
  selector: 'app-nuevo-proceso',
  templateUrl: './nuevo-proceso.component.html',
  styleUrls: ['./nuevo-proceso.component.css'],
})
export class NuevoProcesoComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private clientService: ClientService,
    private router: Router,
    private usuarioService: UsuarioService,
    private procesoService:ProcesoService,
  ) {}
procesos:Process[]=[];
  client: Client = new Client();
  municipio: Municipio[] = [];
  errores: any;
  condicion: boolean;
  asesoria: Asesoria = new Asesoria();
  termino: string;
  clientes: Client[] = [];
  usuario: Usuario = new Usuario();
  selfAssessment: SelfAssessment[] = [];
  habiliar:boolean=false;
  otra=0;
  ngOnInit(): void {
    this.otra=0;
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(this.usuario);

    this.condicion = false;
    this.clientService.getClientsMunicipios().subscribe((data) => {
      this.municipio = data;
    });
  }

  public registrar() {
    console.log(this.client);

    this.clientService.saveClient(this.client).subscribe(
      (data) => {
        console.log(data);
        this.client = data;
        Swal.fire(
          'Creado',
          `Cliente ${data.name} cargado con exito`,
          'success'
        );
        this.condicion = true;

        /*this.cerrarModalAsesoria();*/
      },
      (e) => {
        if (e.status == 404) {
          this.errores = e.error;
          Swal.fire('Error:', 'complete bien los datos', 'error');
          console.log(this.errores);
        }
        if (e.status == 500 || e.status == 400) {
          console.log(e);

          Swal.fire('Error: ', `Error en la carga del formulario`, 'error');
        }
      }
    );
  }

  public finalizar() {
    this.asesoria.client = this.client;
    this.asesoria.user = this.usuario;
    console.log(this.asesoria);

    this.usuarioService.asesoriaSave(this.asesoria).subscribe(
      (data) => {
        this.asesoria.advisory = data;
        Swal.fire(
          'Finalizada',
          `La asesoria de ${
            /* NOMBRE DE ASESOR */ this.client.name
          } fue creada con exito`,
          'success'
        );
        this.cerrarModalProceso();
      },
      (e) => {
        if (e.status == 404) {
          this.errores = e.error;
          Swal.fire('Error:', 'complete bien los datos', 'error');
          console.log(this.errores);
        }
        if (e.status == 500 || e.status == 400) {
          console.log(e);

          Swal.fire('Error: ', `Error en la carga del formulario`, 'error');
        }
      }
    );
  }

  cerrarModalProceso(): void {
    this.modalService.cerrarModalAsesoria();
  }
  public buscar() {
    this.clientService.buscarPorNombre(this.termino).subscribe((data) => {
      this.clientes = data;
      this.clientes = this.clientes.filter((d) => d.type !== 'businessman');
    });
  }
  public findById(id: number) {
    this.clientService.getClient(id).subscribe((data) => {


      this.client = data;
      this.condicion = true;
    });
    this.procesoService.procesosFindAll().subscribe(data=>{
      this.procesos= data;
      this.procesos.forEach(proceso=>{
        if(proceso.selfAssessment.client.id==this.client.id){
          this.cerrarModalProceso();
        this.otra=1;

          this.habiliar=false;
          Swal.fire('Error: ', 'El cliente seleccionado ya tiene un proceso', 'error');
          return;
        }
      })

        this.habiliar=true;

    })

  }
  public volver() {
    this.condicion = false;
    this.habiliar=false;
    this.otra==1;
  }
}
