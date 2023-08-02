import { Indicador } from "./indicador";

export class AnalisisEconomico {
  id:number;
  ventasMes:Indicador[];
  aumentoVentas:Indicador[];
  empleosFormales:Indicador[];
  empleosInformales:Indicador[];
  empleosNuevos:Indicador[];
  empresaExportando:string[];
  ventassExportacion:Indicador[];
  diversificacionProductos:string[];
  aperturaNuevosMercados:string[];
  accesoOtrasFuentes:string[];
}
