import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../proceso.service';
import { Canvas } from '../canvas';
import { SelfAssessment } from './../selfAssessment';

@Component({
  selector: 'app-autoevaluacion',
  templateUrl: './autoevaluacion.component.html',
  styleUrls: ['./autoevaluacion.component.css']
})
export class AutoevaluacionComponent implements OnInit {
  selfAssessment:SelfAssessment= new SelfAssessment();
  preguntas:any[]=[]
  canvas:Canvas= new Canvas();
  cliente: Client = new Client()
  constructor(private modalService: ModalService,
     private clienteService: ClientService,
     private rutaParametro: ActivatedRoute,
     private canvasService:ProcesoService,
     ) { }
  ngOnInit(): void {


    this.canvasService.canvasSave(this.canvas).subscribe(data=>{
    //  console.log('canvas'+data);

      this.canvas=data;

    })
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(d => {
          this.cliente = d;
          console.log(d);
          this.cliente.canvas=this.canvas;
          this.clienteService.updateBusinessman(this.cliente).subscribe(c=>{
            this.cliente=c;
          })
         // console.log(data);

        })
      }
    })
    //this.cliente.canvas=this.canvas;
    console.log(this.cliente);
/*

    //console.log(this.cliente);
*/
  }

  cerrarModalAsesoria(): void {
    this.modalService.cerrarModalAsesoria();
  }
  public guardar(){
console.log(this.preguntas);


  }

}
