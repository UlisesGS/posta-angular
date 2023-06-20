import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { Businessman } from '../businessman';
import { Municipio } from 'src/app/municipio/municipio';
import { ClientService } from '../client.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {
  municipios:Municipio[]=[];
  empresario:Businessman = new Businessman() ;
  errores:any;
  enums:any;

  constructor(private service:ClientService,private router:Router){}
  ngOnInit(): void {
this.service.getClientsMunicipios().subscribe(data=>{
  this.municipios=data;
  console.log(data);
})
this.service.getEnums().subscribe(data=>{
  this.enums=data;
console.log(this.enums);

})

  }

public registrar(){

  console.log(this.empresario);
  this.service.saveBusinessman(this.empresario).subscribe(data=>{
    Swal.fire('Creado', `Empresario ${data.name} fue creado con exito`, 'success')
    this.router.navigate[('/clients')]
  },e=>{
    if(e.status==404){
      this.errores=e.error;
      Swal.fire('Error:', 'complete bien los datos', 'error');
     console.log(this.errores);


    }
    if(e.status==500 || e.status==400){
      console.log(e);

      Swal.fire("Error: ", `Error en la carga del formulario`, 'error');
    }

  })

}
}
