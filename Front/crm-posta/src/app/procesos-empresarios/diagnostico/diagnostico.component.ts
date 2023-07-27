import { Component, OnInit } from '@angular/core';
import { ProcessEmpresario } from '../process-empresario';
import { Diagnostico } from '../diagnostico';
import { ConceptoGenerales } from '../concepto-generales';
import { lastDayOfDecade } from 'date-fns';


@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit{
  //para llenar guardemos todo
  procesos:ProcessEmpresario = new ProcessEmpresario();
  // esto es para mapear el diagnostico
  diagnostico:Diagnostico= new Diagnostico();
  conceptoGenerales:ConceptoGenerales= new ConceptoGenerales();
  concepto:ConceptoGenerales[]=[new ConceptoGenerales, new ConceptoGenerales,new ConceptoGenerales, new ConceptoGenerales,new ConceptoGenerales, new ConceptoGenerales,new ConceptoGenerales, new ConceptoGenerales,new ConceptoGenerales, new ConceptoGenerales,new ConceptoGenerales, new ConceptoGenerales,new ConceptoGenerales, new ConceptoGenerales,new ConceptoGenerales, new ConceptoGenerales,new ConceptoGenerales, new ConceptoGenerales,new ConceptoGenerales, new ConceptoGenerales,new ConceptoGenerales, new ConceptoGenerales,new ConceptoGenerales];
  ngOnInit(): void {
//console.log(this.concepto.length);

this.diagnostico.conceptosGenerales=[]
  }
  conceptos:boolean=false;
  gestion:boolean=false;
  productividad:boolean=false;
  operacional:boolean=false;
  calidad:boolean=false;

  verDiagnostico(){
    console.log(this.concepto);

  }


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
