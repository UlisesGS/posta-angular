import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { CustomerSegments } from '../CustomerSegments';

import { Process } from '../Process';
import { ProcesoService } from '../proceso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-segmento',
  templateUrl: './segmento.component.html',
  styleUrls: ['./segmento.component.css']
})
export class SegmentoComponent implements OnInit {
/*
export class CustomerSegments {
  id:number;
  demograficas:string;
  geograficas:string;
  psicograficas:string;
  comportanmiento:string;

}
*/
  customerSegments:CustomerSegments= new CustomerSegments();
  proceso:Process= new Process;

  procesos:Process[]=[];
  cliente: Client = new Client()
  value:boolean;
  constructor(private modalService: ModalService,
     private clienteService: ClientService,
      private rutaParametro: ActivatedRoute,
      private procesoService:ProcesoService,
      private router:Router,
      ) { }

  ngOnInit(): void {
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          console.log(data);
          this.procesoService.procesosFindAll().subscribe(p=>{

            this.procesos=p;
            this.procesos.forEach(proceso=>{
              if(proceso.canvasModel.client.id==this.cliente.id){
                this.proceso=proceso;
                console.log(proceso);

              }
            })
          })
        })
      } 
    })
  }

  cerrarModalAsesoria(): void {
    this.modalService.cerrarModalAsesoria();
  }


  cambiarCondicion(){
    if(this.value){
      this.value=false;
     }else{
       this.value=true;
     }
  }
  public guardar(){
    this.proceso.estado='Segmento de Clientes';
    console.log(this.proceso);
    this.proceso.canvasModel.customerSegments=this.customerSegments
   this.procesoService.segmentoSave(this.proceso.canvasModel.customerSegments).subscribe(segmento=>{
    this.proceso.canvasModel.customerSegments=segmento;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['/propuestaDeValor/cliente/', this.cliente.id])
      })
    })
   })
  }


  public guardarYsalir(){
    this.proceso.estado='Segmento de Clientes';
    console.log(this.proceso);
    this.proceso.canvasModel.customerSegments=this.customerSegments
   this.procesoService.segmentoSave(this.proceso.canvasModel.customerSegments).subscribe(segmento=>{
    this.proceso.canvasModel.customerSegments=segmento;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['procesos'])
        Swal.fire('Exito', 'Segmento creado con exito', 'success');
      })
    })
   })
  }
}
