import { Component, OnInit } from '@angular/core';
import { Entrepreneur } from '../entrepreneur';

@Component({
  selector: 'app-form-entrepreneur',
  templateUrl: './form-entrepreneur.component.html',
  styleUrls: ['./form-entrepreneur.component.css']
})
export class FormEntrepreneurComponent implements OnInit {
  emprendedor:Entrepreneur= new Entrepreneur();
  constructor(){}
  ngOnInit(): void {

  }

public registrar(){
  console.log(this.emprendedor);

}


}
