import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { Businessman } from '../businessman';
import { Municipio } from 'src/app/municipio/municipio';
import { ClientService } from '../client.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {
  municipios: Municipio[] = [];
  empresario: Businessman = new Businessman();
  errores: any;
  enums: any;
  

  constructor(private service: ClientService
    , private router: Router
    , public modalservice: ModalService
    , private rutaParametro: ActivatedRoute) { }
  ngOnInit(): void {
    this.service.getClientsMunicipios().subscribe(data => {
      this.municipios = data;
      console.log(data);
    })
    this.service.getEnums().subscribe(data => {
      this.enums = data;
      console.log(this.enums);


    })
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.service.getClient(id).subscribe(data => {
          this.empresario = data;
          //this.empresario.municipio=data.municipio;
        })
      }
    })
  }

  public registrar() {

    console.log(this.empresario);
    this.service.saveBusinessman(this.empresario).subscribe(data => {
      Swal.fire('Creado', `Empresario ${data.name} fue creado con exito`, 'success')

      this.cerrarModal();
      this.router.navigate(['/municipios'])
    }
    , e => {
      if (e.status == 404) {
        this.errores = e.error;
        Swal.fire('Error:', 'complete bien los datos', 'error');
        console.log(this.errores);


      }
      if (e.status == 500 || e.status == 400) {
        console.log(e);

        Swal.fire("Error: ", `Error en la carga del formulario`, 'error');
      }


    })


  }
  public editar() {
    console.log(this.empresario);


    this.service.updateBusinessman(this.empresario).subscribe(data => {
      this.router.navigate(['/clients'])
      Swal.fire('Editado', `Empresario ${data.name} fue editado con exito`, 'success')


      //this.cerrarModal();


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



}


