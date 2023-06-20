import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { Observable } from 'rxjs';
import { ModalService } from './modal.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{
  clients:Client[];
  client:Client;
public value:boolean;
public genero:string;
public type:string;
public modal:boolean;
public ciu:any;


  constructor(private serviceClient:ClientService, 
    public modalservice:ModalService){}

  ngOnInit(): void {
    this.modal=false;
    let page=0;
    this.serviceClient.getClientsPaginar(page).subscribe(client=>{
      this.clients=client.content as Client[];
    })
    /*
    this.serviceClient.traerCiu().subscribe(data=>{
      this.ciu= data;
      console.log(data);

    })
    */
this.ciu=this.serviceClient.ciu

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

  
  abrirModal():void{
    this.modalservice.abrirModal();
  }
}
