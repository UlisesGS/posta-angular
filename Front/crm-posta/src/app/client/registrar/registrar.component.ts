import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit{
  public emprendedor:boolean;
  public empresario:boolean;
  public valor:string;
  constructor(public modalservice:ModalService){

  }
  ngOnInit(): void {
   // this.emprendedor=false;
    this.valor="a"

  }
  public cambiarForm(){
    if(this.emprendedor){
      this.empresario=false;
    }else{
      this.empresario=true;
    }
    console.log(this.emprendedor);
    console.log(this.empresario);

   }

   cerrarModal(){
    this.modalservice.cerrarModal()
  }


  }


