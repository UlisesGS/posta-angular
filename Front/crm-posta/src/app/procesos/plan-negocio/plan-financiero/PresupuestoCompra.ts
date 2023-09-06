import { EstructuraCompra } from "./EstructuraCompras";

export class PresupuestoCompra {
  id:number;
nombreProcucto:string;
tipoProducto:string;
cantidadProducto:number;
estructuraCompras:EstructuraCompra[];
total:number=0.0;
totalAnual:number=0.0;
/*
 public void sacarTotales(){

        for (EstructuraCompras estructuraCompra : estructuraCompras) {
            this.total+=estructuraCompra.getTotalUnitario();
        }
        this.totalAnual=(this.total*this.cantidadProducto);
    }
*/
public sacarTotales(){
  this.total=0;
  this.totalAnual=0;
  this.estructuraCompras.forEach(c=>{
    this.total+=c.totalUnitario;
  })
  this.totalAnual=(this.total*this.cantidadProducto);
}
}
