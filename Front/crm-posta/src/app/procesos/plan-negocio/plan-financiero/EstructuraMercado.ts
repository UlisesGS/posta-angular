export class EstructuraMercado {
  id: number;
  producto: string;
  cantidad: number;
  tipo: string;
  horasOperario: number;
  unidadHoraHombre: any=0.0;
  capacidadInstaladaPorOperario: number=0.0;
  tiempoDecicacion: number;
  capacidadInstaladaUnidades: number=0.0;
  precioUnitario: number;
  precioTotal: number=0.0;
  public calculos(){
    this.unidadHoraHombre=(0.99*this.cantidad)/this.horasOperario;
    this.capacidadInstaladaPorOperario=this.horasOperario*this.unidadHoraHombre;
    this.capacidadInstaladaUnidades=this.capacidadInstaladaPorOperario*this.tiempoDecicacion;
    this.precioTotal=this.precioUnitario*this.cantidad;
}
public addElementos(cantidad,producto){
  this.producto=producto
  this.cantidad=cantidad;
}
}
