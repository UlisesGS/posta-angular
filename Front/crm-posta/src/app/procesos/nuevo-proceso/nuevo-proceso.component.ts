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
    private procesoService: ProcesoService,
  ) { }
  procesos: Process[];
  client: Client = new Client();
  municipio: Municipio[] = [];
  errores: any;
  condicion: boolean;
  asesoria: Asesoria = new Asesoria();
  termino: string;
  clientes: Client[] = [];
  usuario: Usuario = new Usuario();
  selfAssessment: SelfAssessment[] = [];
  habiliar: boolean = false;
  otra = 0;
  ngOnInit(): void {
    this.otra = 0;
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

   if (this.termino != "") {
    this.clientService.buscarPorNombre(this.termino).subscribe((data) => {
      this.clientes = data;
      if(this.usuario.role!='ADMIN'){
        this.clientes= this.clientes.filter(f=>f.user.id==this.usuario.id);
        

      }
      //   this.clientes = this.clientes.filter((d) => d.type !== 'businessman');
    });
   }

  }
  public findById(id: number) {
    this.clientService.getClient(id).subscribe((data) => {
      this.client = data;
      this.condicion = true;
      /*if(this.client.type==='entrepreneur'){
        console.log('entrepreneur');



        this.condicion = true;
      }else{



        Swal.fire('Reparacion', 'Esta etapa se encuentra en reparacion', 'info');
        this.cerrarModalProceso();
      }*/


    });
    /*
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
*/
  }
  public volver() {
    this.condicion = false;
    this.habiliar = false;
    this.otra == 1;
  }
  llevar() {
    //  console.log('hola');
    let bool: boolean = false;
    console.log(this.client);
    let id = this.client.id;
    this.procesoService.procesosFindAll().subscribe(pro => {
      this.procesos = pro;
      console.log(pro);
      this.procesos.forEach(p => {

        if (p.selfAssessment?.client?.id == this.client.id) {
          console.log('entro al if ');
          bool = true;
          this.cerrarModalProceso()
          Swal.fire('Error', 'El cliente seleccionado ya tiene un proceso asignado', 'error');

        }

      })
      if (bool == false) {
        this.cerrarModalProceso();
        if (this.client.type === 'entrepreneur') {
          this.router.navigate(['/autoevaluacion/cliente/', this.client.id]);
        } else {
          this.router.navigate(['/empresario/diagnostico/cliente/', this.client.id])

        }




      }


      //  pro.canvasModel.client.id===this.client.id?


    })







    /*
    console.log(this.client);

    let contador=0;
  //  [routerLink]="['/autoevaluacion/cliente/', client.id]"
  if(this.client.type==='entrepreneur'){
    console.log(this.procesos);
    this.procesoService.procesosFindAll().subscribe(data=>{
      this.procesos= data;
      console.log(data);
      console.log(this.client);

this.procesos.map(p=>p.canvasModel.client.id===this.client.id?
  contador++:'')
})
if(contador===0){
  this.router.navigate(['/autoevaluacion/cliente/', this.client.id])
}else{
  Swal.fire('Error', 'El cliente ya tiene un proceso asignado', 'error');
}

    }
 */
  }

}
