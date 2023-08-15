
import { CiclicidadVentas } from './CiclicidadVentas';
import { EstructuraMercado } from './EstructuraMercado';



export class PresupuestoVenta {
  id: number;
  estructuraMercado: EstructuraMercado[]=[];
  totalProductos: number=0.0;
  totalCapacidadOperario: number=0.0;
  totalCapacidadInstalada: number=0.0;
  totalPrecioUnitario: number=0.0;
  totalTotal: number=0.0;
  ciclicidadVentas: CiclicidadVentas[];
  totalCalificacion: number=0.0;
  totalUnidadesAno:number=0.0;
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
      // this.totalUnidadesAno+=

    })
    this.totalUnidadesAno=0;
    this.ciclicidadVentas.forEach(ciclicidadVenta=>{
      ciclicidadVenta.unidadesAnio=((ciclicidadVenta.calificacion/this.totalCalificacion)*this.totalProductos);
      ciclicidadVenta.ventasAnio=((this.totalTotal*ciclicidadVenta.unidadesAnio)/this.totalProductos);
      this.totalUnidadesAno+=ciclicidadVenta.unidadesAnio;
    })

  }
public addElementos(estructuraMercado:EstructuraMercado){
  this.estructuraMercado.push(estructuraMercado);
}



}
