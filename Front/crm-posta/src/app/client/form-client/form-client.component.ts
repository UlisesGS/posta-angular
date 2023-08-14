import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
// import { Businessman } from '../businessman';
import { Municipio } from 'src/app/municipio/municipio';
import { ClientService } from '../client.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '../modal.service';
import { Ciiu } from '../ciiu';
import { AuthService } from './../../auth/auth.service';
import { Process } from 'src/app/procesos/Process';
import { ProcesoService } from 'src/app/procesos/proceso.service';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {
  municipios: Municipio[] = [];
  empresario: Client = new Client();
  cliente: Client = new Client();
  errores: any;
  enums: any;
  proceso: Process = new Process();
  procesos: Process[] = [];
  ciiu: Ciiu[] = [];

  idEditar: number


  constructor(private service: ClientService
    , private router: Router
    , public modalservice: ModalService
    , private rutaParametro: ActivatedRoute,
    private authServic: AuthService,
    private procesoService: ProcesoService) { }
  ngOnInit(): void {
    this.service.getClientsMunicipios().subscribe(data => {
      this.municipios = data;
      console.log(data);
    })
    this.service.getEnums().subscribe(data => {
      this.enums = data;
      console.log(this.enums);
    })
    this.service.getCiiu().subscribe(data => {
      this.ciiu = data;
      console.log(data);

    })
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.service.getClient(id).subscribe(data => {
          this.empresario = data; console.log(this.empresario);
          this.procesoService.procesosFindAll().subscribe(pr => {
            this.procesos = pr
            this.procesos.forEach(pro => {
              if (pro?.selfAssessment?.client?.id == this.empresario.id && pro?.processEmpresario?.client?.id == this.empresario.id) {
                this.proceso = pro
                console.log(this.proceso);

              }
            })
          })
        })
        this.idEditar = +parametro.get('idEditar');
      }
    })
  }

  public registrar() {
    this.empresario.type = "businessman";
    this.empresario.user = this.authServic.devolverUsuario(); console.log(this.empresario);
    this.service.saveBusinessman(this.empresario).subscribe(data => {
      Swal.fire('ÉXITO', `Empresario ${data.name} fue creado con exito`, 'success')
      this.cerrarModal();
      this.router.navigate(['/municipios'])
    }
      , e => {
        if (e.status == 404) {
          this.errores = e.error;
          Swal.fire('ERROR:', 'Datos Incompletos', 'error');
        }
        if (e.status == 500 || e.status == 400) {
          Swal.fire("ERROR: ", `Error en la carga del formulario`, 'error');
        }
      })


  }
  public editar() {
    console.log(this.empresario);
    this.empresario.type = "businessman";
    this.service.updateBusinessman(this.empresario).subscribe(data => {
      console.log(this.proceso);
      if (this.idEditar) {
        if (this.proceso.processEmpresario) {
          this.proceso.estado = this.proceso.estadoAnteriorEmpresario
          this.procesoService.procesosUpdate(this.proceso).subscribe()
        } else {
          this.proceso.estado = 'iniciando2'
          this.procesoService.procesosUpdate(this.proceso).subscribe()
        }
      }

      this.router.navigate(['/clients'])
      Swal.fire('Editado', `Empresario ${data.name} fue editado con exito`, 'success')
    }, e => {

      Swal.fire("Error: ", `Error al editar el contacto`, 'error');
    })
  }

  cerrarModal() {
    this.modalservice.cerrarModal();
  }

  compararMunicipio(o1: Municipio, o2: Municipio): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  compararCiu(o1: Ciiu, o2: Ciiu): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  compararCompany(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }


  public cambiarTipo() {
    this.cliente.type = "businessman";
    this.cliente.businessIdea = null;
    this.cliente.product = null;
    this.service.updateBusinessman(this.cliente).subscribe(data => {
      Swal.fire('Editado', `Empresario ${data.name} fue editado con exito`, 'success')
    }, e => {
      Swal.fire("Error: ", `Error al editar el contacto`, 'error');
    })
  }

}


