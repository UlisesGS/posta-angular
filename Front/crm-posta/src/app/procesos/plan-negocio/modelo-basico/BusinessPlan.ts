import { DofaAnalisis } from "./DofaAnalisis";
import { InternalExternalAnalysis } from "./InternalExternalAnalysis";
import { ProyectInformation } from "./ProyectInformation";




export class BusinessPlan{
    id:number;
    proyectInformation:ProyectInformation;
    analisis:InternalExternalAnalysis;
    dofaAnalisis:DofaAnalisis;
    conclusion:string;
}