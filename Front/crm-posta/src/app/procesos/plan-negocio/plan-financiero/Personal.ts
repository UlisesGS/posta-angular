export class Personal {
  id: number;
  cargo: string;
  salarioMensual: number;
  salariaAnual: number=0.0;
  public anual(){
    this.salariaAnual=(this.salarioMensual*12);
}
}
