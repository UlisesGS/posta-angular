import { Inversion } from "./Inversion";

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
  activoInvesion:number=0.0;
  activoPropio:number=0.0;
  public fijo(){
    this.activoFijo.forEach(fijo=>{
      this.activoCredito+=fijo.creditoRequerido;
      this.activoInvesion+=fijo.inversionRequerida;
      this.activoPropio+=fijo.aportesPropios;
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
    console.log('hola calculo');
    
    this.totalPropio=(this.maquinariaPropio+this.mueblesPropio+this.vehiculosPropio+this.activoPropio);
    this.totalInversion=(this.maquinariaInversion+this.mueblesInversion+this.vehiculosInversion+this.activoInvesion);
    this.totalCredito=(this.totalInversion-this.totalPropio);
  }

}
