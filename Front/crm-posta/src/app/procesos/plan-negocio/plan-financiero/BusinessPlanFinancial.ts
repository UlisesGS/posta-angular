import { GastoCosto } from "./GastoCosto";
import { PresupuestoCompra } from "./PresupuestoCompra";
import { PresupuestoVenta } from "./PresupuestoVenta";
import { PlanInversion } from './PlanInversion';

export class BusinessPlanFinancial {
  id:number;
presupuestoVenta:PresupuestoVenta;
presupuestoCompra:PresupuestoCompra[];
totalPresupuestoCompra:number=0.0;
gastoCosto:GastoCosto;
planInversion:PlanInversion;

public cuentas(){
  this.presupuestoCompra.forEach(p=>{
    this.totalPresupuestoCompra+=p.totalAnual;
  })
}
}
