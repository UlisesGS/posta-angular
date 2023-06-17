import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { Businessman } from '../businessman';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {

  }
  empresario:Businessman = new Businessman() ;
public registrar(){
  console.log(this.empresario);

}
}
