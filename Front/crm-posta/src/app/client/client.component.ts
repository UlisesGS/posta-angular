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


  constructor(private serviceClient:ClientService){

  }
  ngOnInit(): void {
    let page=0;
    this.serviceClient.getClientsPaginar(page).subscribe(client=>{
      this.clients=client.content as Client[];
    })
  }
}
