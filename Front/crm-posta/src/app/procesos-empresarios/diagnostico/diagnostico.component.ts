import { Component } from '@angular/core';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent {
  conceptos:boolean=false;
  gestion:boolean=false;
  productividad:boolean=false;
  operacional:boolean=false;
  calidad:boolean=false;



  condicionConceptos(){
    if(this.conceptos){
      this.conceptos=false;
    }else{
      this.conceptos=true;
    }
  }
  condicionGestion(){
    if(this.gestion){
      this.gestion=false;
    }else{
      this.gestion=true;
    }
  }
  condicionProductividad(){
    if(this.productividad){
      this.productividad=false;
    }else{
      this.productividad=true;
    }
  }
  condicionOperacional(){
    if(this.operacional){
      this.operacional=false;
    }else{
      this.operacional=true;
    }
  }
  condicionCalidad(){
    if(this.calidad){
      this.calidad=false;
    }else{
      this.calidad=true;
    }
  }
}
