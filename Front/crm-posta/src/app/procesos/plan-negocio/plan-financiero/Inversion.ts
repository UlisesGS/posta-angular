export class Inversion {
  id: number;
  tipo: string;
  aportesPropios: number;
  inversionRequerida: number;
  creditoRequerido: number=0.0;
  public  totalCredito(){
    this.creditoRequerido=this.inversionRequerida-this.aportesPropios;
}
}
