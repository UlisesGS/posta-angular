import { Usuario } from "../usuario/usuario";
import { Canvas } from "./canvas";
import { SelfAssessment } from './selfAssessment';

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


}

