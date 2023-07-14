export class EstructuraMercado {
  id: number;
  producto: string;
  cantidad: number;
  tipo: string;
  horasOperario: number;
  unidadHoraHombre: number;
  capacidadInstaladaPorOperario: number;
  tiempoDecicacion: number;
  capacidadInstaladaUnidades: number;
  precioUnitario: number;
  precioTotal: number;
  public calculos(){
    console.log(this.horasOperario);
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
