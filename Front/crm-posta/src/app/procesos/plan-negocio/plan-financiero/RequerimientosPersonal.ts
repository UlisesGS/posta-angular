import { OtrosCostos } from "./OtrosCostos";
import { Personal } from "./Personal";

export class RequerimientosPersonal {
  id: number;
  personal: Personal[];
  subTotal: number=0.0;
  subTotalAnual: number=0.0;
  parafiscales: number=0.0;
  totalParafiscales: number=0.0;
  seguridadSocial: number;
  totalSeguridadSocial: number;
  cesantias: number;
  totalCesantias: number;
  interesesCesantias: number;
  totalInteresesCesantias: number;
  primaServicios: number;
  totalPrimaServicios: number;
  vacaciones: number;
  totalVacaciones: number;
  totalMensual: number;
  totalAnual: number;
  costos: OtrosCostos[];
  totalCostoMensual: number=0.0;
  totalCostoAnual:number=0.0;
  public parafiscalesCalculos() {
    this.personal.forEach(personal1=>{
      this.subTotal += personal1.salarioMensual;
      this.subTotalAnual += personal1.salariaAnual;
    })

    //Parafiscales Mensuales
    this.parafiscales = (this.subTotal * 0.04);
    this.seguridadSocial = (this.subTotal * 0.205);
    this.cesantias = (this.subTotal * 0.0833);
    this.interesesCesantias = (this.cesantias * 0.0012);
    this.primaServicios = (this.subTotal * 0.0833);
    this.vacaciones = (this.subTotal * 0.0417);
    // Parafiscales Anuales
    this.totalParafiscales = this.parafiscales * 12;
    this.totalSeguridadSocial = this.seguridadSocial * 12;
    this.totalCesantias = this.cesantias * 12;
    this.totalInteresesCesantias = this.interesesCesantias * 12;
    this.totalPrimaServicios = this.primaServicios * 12;
    this.totalVacaciones = this.vacaciones * 12;
    //Totales sumas
    this.totalMensual = (this.subTotal + this.parafiscales + this.seguridadSocial + this.cesantias + this.interesesCesantias + this.primaServicios + this.vacaciones);
    this.totalAnual = (this.subTotalAnual + this.totalParafiscales + this.totalSeguridadSocial + this.totalCesantias + this.totalInteresesCesantias + this.totalPrimaServicios + this.totalVacaciones);

}
public  totalCostos(){
    this.costos.forEach(costo=>{
      this.totalCostoMensual+=costo.gastoMensual;
      this.totalCostoAnual+=costo.gastoAnual;
    })

    }
}


