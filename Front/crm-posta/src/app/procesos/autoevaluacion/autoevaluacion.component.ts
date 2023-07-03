import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../proceso.service';
import { Canvas } from '../canvas';
import { SelfAssessment } from './../selfAssessment';
import Swal from 'sweetalert2';
import { Process } from '../Process';

@Component({
  selector: 'app-autoevaluacion',
  templateUrl: './autoevaluacion.component.html',
  styleUrls: ['./autoevaluacion.component.css']
})
export class AutoevaluacionComponent implements OnInit {
  selfAssessment: SelfAssessment = new SelfAssessment();
  preguntas: any[] = [];
  canvasModel: Canvas = new Canvas();
  cliente: Client = new Client();
  proceso: Process = new Process();
  constructor(private modalService: ModalService,
    private clienteService: ClientService,
    private rutaParametro: ActivatedRoute,
    private canvasService: ProcesoService,
    private router:Router,

  ) { }
  ngOnInit(): void {




    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(d => {
          this.cliente = d;
          this.canvasModel.client = this.cliente
          //agregue recien
          this.canvasService.canvasSave(this.canvasModel).subscribe(canvas => {
            //console.log('canvas'+data);

            this.canvasModel = canvas;
            this.proceso.canvasModel = this.canvasModel;
            this.proceso.estado = 'iniciando';
            this.proceso.user=JSON.parse(localStorage.getItem('usuario'));
            this.canvasService.procesosSave(this.proceso).subscribe(data => {
              this.proceso = data;
            })

          });

        })
      }
    })










    //this.cliente.canvas=this.canvas;
    // console.log(this.cliente);
    /*

        //console.log(this.cliente);
    */
  }

  cerrarModalAsesoria(): void {
    this.modalService.cerrarModalAsesoria();
  }
  public guardar() {
    console.log(this.preguntas);
    this.selfAssessment.client = this.cliente;
    this.selfAssessment.selfAssessment = this.preguntas;
    console.log(this.selfAssessment);
    this.clienteService.guardarPreguntas(this.selfAssessment).subscribe(data => {
      console.log(data);

      this.proceso.selfAssessment=data;
      console.log(this.proceso);
      this.proceso.estado="AutoEvaluación";
      this.canvasService.procesosUpdate(this.proceso).subscribe(d=>{
      })

    })



  }


  public guardarYsalir() {
    console.log(this.preguntas);
    this.selfAssessment.client = this.cliente;
    this.selfAssessment.selfAssessment = this.preguntas;
    console.log(this.selfAssessment);
    this.clienteService.guardarPreguntas(this.selfAssessment).subscribe(data => {
      console.log(data);

      this.proceso.selfAssessment=data;
      console.log(this.proceso);
      this.proceso.estado="AutoEvaluación";
      this.canvasService.procesosUpdate(this.proceso).subscribe(d=>{
        this.router.navigate(['procesos']);
        Swal.fire('Exito:', 'La autoevaluación fue guardada con éxito', 'success');
      })

    })



  }

}
