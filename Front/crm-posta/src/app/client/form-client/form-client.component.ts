import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { Businessman } from '../businessman';
import { Municipio } from 'src/app/municipio/municipio';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {
  constructor(private service:ClientService){}
  ngOnInit(): void {
this.service.getClientsMunicipios().subscribe(data=>{
  this.municipios=data;
  console.log(data);

})


  }
  municipios:Municipio[]=[];
  empresario:Businessman = new Businessman() ;
public registrar(){
  console.log(this.empresario);

}
}
