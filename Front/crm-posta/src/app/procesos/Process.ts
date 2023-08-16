import { Usuario } from "../usuario/usuario";
import { Canvas } from "./canvas";
import { SelfAssessment } from './selfAssessment';
import { BusinessPlan } from './plan-negocio/modelo-basico/BusinessPlan';
import { BusinessPlanFinancial } from "./plan-negocio/plan-financiero/BusinessPlanFinancial";
import { ProcessEmpresario } from "../procesos-empresarios/process-empresario";
import { Client } from "../client/client";

/*}
@OneToOne
    private SelfAssessment selfAssessment;
    @OneToOne
    private CanvasModel canvasModel;


    @ManyToOne
    private User user;
    private String estado;
*/
export class Process {
  id:number;
  canvasModel:Canvas;

  selfAssessment:SelfAssessment;
  user:Usuario;
  estado:string;
  terminado:boolean;
  fechaAlta:string;
  businessPlan:BusinessPlan;
  businessPlanFinancial:BusinessPlanFinancial;
  documentoCompromiso:string;
  encuestaSatisfaccion:string;
  actaCierre:string;
  impacto:string;
  processEmpresario:ProcessEmpresario;
  estadoAnteriorEmprendedor:string;
  estadoAnteriorEmpresario:string;
  fechaFinalizacion:Date;
  client:Client;
  updatedate:Date;


}

