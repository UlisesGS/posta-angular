import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { Entrepreneur } from '../entrepreneur';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../modal.service';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit{
  client:Client;
  verContacto:boolean;

  constructor(private serviceClient:ClientService, 
    private activate:ActivatedRoute){

  }

  ngOnInit(): void {
    this.activate.paramMap.subscribe(data=>{
      let id:number= +data.get('id');
      if(id){
        this.serviceClient.getClient(id).subscribe(data=>{
          this.client=data;
        })
      }
      
    })
  }



  }

  

