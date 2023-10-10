import { EstructuraCompra } from "./EstructuraCompras";

export class PresupuestoCompra {
  id:number;
nombreProcucto:string;
tipoProducto:string;
cantidadProducto:number;
estructuraCompras:EstructuraCompra[];
otrosInsumos:EstructuraCompra[];
subtotal:number=0.0;
subtotal2:number=0.0;
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

}
