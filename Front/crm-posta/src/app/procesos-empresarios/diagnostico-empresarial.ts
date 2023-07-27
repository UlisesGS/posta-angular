import { AnalisisEconomico } from "./analisis-economico";
import { AnalisisResultados } from "./analisis-resultados";
import { Diagnostico } from "./diagnostico";

export class DiagnosticoEmpresarial {
id:number;
diagnostico:Diagnostico;
analisisResultados:AnalisisResultados;
analisisEconomico:AnalisisEconomico;
}
