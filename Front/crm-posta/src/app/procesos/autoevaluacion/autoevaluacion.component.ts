import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../proceso.service';
import { Canvas } from '../canvas';
import { SelfAssessment } from './../selfAssessment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autoevaluacion',
  templateUrl: './autoevaluacion.component.html',
  styleUrls: ['./autoevaluacion.component.css']
})
export class AutoevaluacionComponent implements OnInit {
  selfAssessment:SelfAssessment= new SelfAssessment();
  preguntas:any[]=[]
  canvasModel:Canvas= new Canvas();
  cliente: Client = new Client()
  constructor(private modalService: ModalService,
     private clienteService: ClientService,
     private rutaParametro: ActivatedRoute,
     private canvasService:ProcesoService,
     ) { }
  ngOnInit(): void {


    this.canvasService.canvasSave(this.canvasModel).subscribe(data=>{
    //  console.log('canvas'+data);

      this.canvasModel=data;

    })
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(d => {
          this.cliente = d;
          console.log(d);
          this.cliente.canvasModel=this.canvasModel;
          this.clienteService.updateBusinessman(this.cliente).subscribe(c=>{
            this.cliente=c;
            console.log("canvas guardado"+c);

          })
         console.log(this.cliente);


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
  public guardar(){
console.log(this.preguntas);
this.selfAssessment.client=this.cliente;
this.selfAssessment.selfAssessment=this.preguntas;
console.log(this.selfAssessment);
this.clienteService.guardarPreguntas(this.selfAssessment).subscribe(data=>{
  Swal.fire('Exito:', 'La autoevaluacion fue guardada con exito', 'success');
})



  }

}
