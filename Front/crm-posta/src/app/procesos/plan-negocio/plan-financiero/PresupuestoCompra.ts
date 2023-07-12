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
  this.estructuraCompras.forEach(compras=>{
    this.total+=compras.totalUnitario;
  })
  this.totalAnual=(this.total*this.cantidadProducto);
}
}
