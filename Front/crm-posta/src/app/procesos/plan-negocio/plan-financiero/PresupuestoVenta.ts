import { EstructuraMercado } from "./estructuraMercado";
import { CiclicidadVentas } from './CiclicidadVentas';

export class PresupuestoVenta {
  id: number;
  estructuraMercado: EstructuraMercado[];
  totalProductos: number=0.0;
  totalCapacidadOperario: number=0.0;
  totalCapacidadInstalada: number=0.0;
  totalPrecioUnitario: number=0.0;
  totalTotal: number=0.0;
  ciclicidadVentas: CiclicidadVentas[];
  totalCalificacion: number=0.0;
  public calcular(){
    this.estructuraMercado.forEach(estructuraMercado1=>{
      this.totalProductos+=estructuraMercado1.cantidad;
      this.totalCapacidadOperario+=estructuraMercado1.capacidadInstaladaPorOperario;
      this.totalCapacidadInstalada+=estructuraMercado1.capacidadInstaladaUnidades;
      this.totalPrecioUnitario+=estructuraMercado1.precioUnitario;
      this.totalTotal+=estructuraMercado1.precioTotal;
    })
  }
  public  calculosCiclicidad(){
    this.ciclicidadVentas.forEach(ventas=>{
      this.totalCalificacion+=ventas.calificacion;

    })
    this.ciclicidadVentas.forEach(ciclicidadVenta=>{
      ciclicidadVenta.unidadesAño=((ciclicidadVenta.calificacion/this.totalCalificacion)*this.totalProductos);
      ciclicidadVenta.ventasAño=((this.totalTotal*ciclicidadVenta.unidadesAño)/this.totalProductos);
    })

  }




}
