export class OtrosCostos {
  id: number;
  concepto: String;
  gastoMensual: number;
  gastoAnual: number=0.0;
  public  anual() {
    this.gastoAnual = (this.gastoMensual * 12);
}
}
