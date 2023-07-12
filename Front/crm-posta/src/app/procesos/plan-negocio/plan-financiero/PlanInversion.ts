import { Inversion } from "./inversion";

export class PlanInversion {
  id: number;
  activoFijo: Inversion[];
  activoCredito: number=0.0;
  maquinariaEquipo: Inversion[];
  maquinariaPropio: number=0.0;
  maquinariaInversion: number=0.0;
  maquinariaCredito: number=0.0;
  mueblesEnseres:Inversion[];
  mueblesPropio: number=0.0;
  mueblesInversion: number=0.0;
  muebleCredito: number=0.0;
  vehiculos: Inversion[];
  vehiculosPropio: number=0.0;
  vehiculosInversion: number=0.0;
  vehiculosCredito: number=0.0;
  totalPropio: number=0.0;
  totalInversion: number=0.0;
  totalCredito: number=0.0;
  public fijo(){
    this.activoFijo.forEach(fijo=>{
      this.activoCredito+=fijo.creditoRequerido;
    })
  }
  public maquinaria(){
    this.maquinariaEquipo.forEach(equipo=>{
      this.maquinariaPropio+=equipo.aportesPropios;
      this.maquinariaInversion+=equipo.inversionRequerida;
      this.maquinariaCredito+=equipo.creditoRequerido;
    })

  }
  public muebles(){
this.mueblesEnseres.forEach(enseres=>{
  this.mueblesPropio+=enseres.aportesPropios;
  this.mueblesInversion+=enseres.inversionRequerida;
  this.muebleCredito+=enseres.creditoRequerido;
})
  }
  public vehiculoss(){
this.vehiculos.forEach(v=>{
  this.vehiculosPropio+=v.aportesPropios;
  this.vehiculosInversion+=v.inversionRequerida;
  this.vehiculosCredito+=v.creditoRequerido;
})
  }
  public calculoTotal(){
    this.totalPropio=(this.maquinariaPropio+this.mueblesPropio+this.vehiculosPropio);
    this.totalInversion=(this.maquinariaInversion+this.mueblesInversion+this.vehiculosInversion);
    this.totalCredito=(this.activoCredito+this.totalPropio+this.totalInversion+this.totalCredito);
  }

}
