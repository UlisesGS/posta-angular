import { CostComponent } from "./CostComponent";

export class CostStructure {
id:number;
variableCost:CostComponent[];
fixedCosts:CostComponent[];
totalVariableCosts:number=0;

totalfixedCosts:number=0;
totalCost:number=0;

totalVariable(){
  this.variableCost.forEach(variable=>{
    this.totalVariableCosts+=variable.amount;
  })
}
totalFijo(){
  this.fixedCosts.forEach(fixed=>{
    this.totalfixedCosts+=fixed.amount;
  })
}
total(){
  this.totalCost=this.totalVariableCosts+this.totalfixedCosts
}

}
