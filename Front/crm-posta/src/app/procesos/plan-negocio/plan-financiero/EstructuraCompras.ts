export class EstructuraCompra {
  id: number;
  materiaPrima: string;
  tipo: string;
  valorUnitario: number;
  cantidadUbnidad: number;
  totalUnitario:number=0.0;
  public  calculoTotal(){
    this.totalUnitario=(this.valorUnitario*this.cantidadUbnidad);
}

}
