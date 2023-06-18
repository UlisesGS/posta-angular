import { Component, OnInit } from '@angular/core';
import { Entrepreneur } from '../entrepreneur';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { Municipio } from 'src/app/municipio/municipio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-entrepreneur',
  templateUrl: './form-entrepreneur.component.html',
  styleUrls: ['./form-entrepreneur.component.css']
})
export class FormEntrepreneurComponent implements OnInit {
  constructor(private clientService:ClientService,private router:Router){}
  emprendedor:Entrepreneur= new Entrepreneur();
  municipios:Municipio[]=[];

  ngOnInit(): void {
    this.clientService.getClientsMunicipios().subscribe(data=>{
      this.municipios=data;
      console.log(data);
    
    })
  }
public registrar(){
  console.log(this.emprendedor);
  this.clientService.saveEntrepreneur(this.emprendedor).subscribe(data=>{
    Swal.fire(`Creado`, `Emprendedor ${data.name} fue creado con exito`, `success`)
    this.router.navigate[('/clients')]
  },e=>{
    

  })

}


}
