import { Component, OnInit } from '@angular/core';
// import { Entrepreneur } from '../entrepreneur';
import { ClientService } from '../client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipio } from 'src/app/municipio/municipio';
import Swal from 'sweetalert2';
import { ModalService } from '../modal.service';
import { Client } from '../client';


@Component({
  selector: 'app-form-entrepreneur',
  templateUrl: './form-entrepreneur.component.html',
  styleUrls: ['./form-entrepreneur.component.css']
})
export class FormEntrepreneurComponent implements OnInit {
  constructor(private clientService:ClientService
    ,private router:Router
    , public modalservice:ModalService
    , private rutaParametro:ActivatedRoute
    ){}
  emprendedor:Client= new Client();
  municipios:Municipio[]=[];
  errores:any;


  ngOnInit(): void {
    this.clientService.getClientsMunicipios().subscribe(data=>{
      this.municipios=data;
      console.log(data);

    })
    this.rutaParametro.paramMap.subscribe(parametro=>{
      let id = +parametro.get('id');
      if(id){
        this.clientService.getClient(id).subscribe(data=>{
          this.emprendedor=data;
        })
      }
    })

  }
public registrar(){
  this.emprendedor.type="entrepreneur";
  this.emprendedor.user= JSON.parse(localStorage.getItem('usuario'))
  console.log(this.emprendedor);
  this.clientService.saveEntrepreneur(this.emprendedor).subscribe(data=>{
    Swal.fire(`ÉXITO`, `Emprendedor ${data.name} fue creado con exito`, `success`)

    this.cerrarModal();
    this.router.navigate(['/municipios'])
  },e=>{
    if(e.status==404){
      this.errores=e.error;
      Swal.fire('ERROR:', 'Datos Incompletos', 'error');
     console.log(this.errores);


    }
    if(e.status==500 || e.status==400){
      console.log(e);

      Swal.fire("ERROR: ", `Error en la carga del formulario`, 'error');
    }




  })


}
cerrarModal(){
  this.modalservice.cerrarModal();
}
public editar(){
  this.emprendedor.type="entrepreneur";
  this.clientService.updateEntrepreneur(this.emprendedor).subscribe(data=>{
    this.router.navigate(['/clients'])
    Swal.fire(`Editado`, `Emprendedor ${data.name} fue editado con exito`, `success`)

  },e=>{
    console.log(e);

    Swal.fire("Error: ", `Error en la carga del formulario`, 'error');
  })

}
compararMunicipio(o1: Municipio, o2: Municipio):boolean{

  if(o1 === undefined && o2 === undefined){
    return true;
  }

   return o1 && o2 ? o1.id === o2.id : o1 === o2;
}

}
