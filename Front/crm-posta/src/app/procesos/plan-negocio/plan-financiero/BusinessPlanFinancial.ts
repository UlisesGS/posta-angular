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
/*
private Double IPC1;
private Double IPC2;
private Double IPC3;
private Double IPC4;
*/
IPC1:number=0;
IPC2:number=0;
IPC3:number=0;
IPC4:number=0;
ipc1:number=0;
ipc2:number=0;
ipc3:number=0;
ipc4:number=0;
public cuentas(){
  this.presupuestoCompra.forEach(p=>{
    this.totalPresupuestoCompra+=p.totalAnual;
  })
}
}
