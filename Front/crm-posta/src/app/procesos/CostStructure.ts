import { CostComponent } from "./CostComponent";

export class CostStructure {
id:number;
costosVariables:CostComponent[];
costosFijos:CostComponent[];
totalCostosVariables:number=0;

totalCostosFijos:number=0;
totalCostos:number=0;

totalVariable(){
  this.costosVariables.forEach(variable=>{
    this.totalCostosVariables+=variable.amount;
  })
}
totalFijo(){
  this.costosFijos.forEach(fixed=>{
    this.totalCostosFijos+=fixed.amount;
  })
}
total(){
  this.totalCostos=this.totalCostosVariables+this.totalCostosFijos
}

}
