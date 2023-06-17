import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{
  clients:Client[];
public value:boolean;
public genero:string;
public type:string;

  constructor(private serviceClient:ClientService){

  }
  ngOnInit(): void {
    let page=0;
    this.serviceClient.getClientsPaginar(page).subscribe(client=>{
      this.clients=client.content as Client[];
    })
  }
  public cambiarCondicion(){
    if(this.value){
     this.value=false;
    }else{
      this.value=true;
    }
  }
  public filtroPorGenero(){
   console.log(this.genero);
   this.serviceClient.getClientsGender(0,this.genero).subscribe(data=>{
    this.clients= data.content;
   })


  }
  public filtroPorType(){
    this.serviceClient.getClientType(0,this.type).subscribe(data=>{
      this.clients= data.content;
    })
  }
}
