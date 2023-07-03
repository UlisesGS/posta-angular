import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import Swal from 'sweetalert2';
import { ProcesoService } from '../proceso.service';
import { Process } from '../Process';
import { ValuePropositions } from './../ValuePropositions';

@Component({
  selector: 'app-propuesta-de-valor',
  templateUrl: './propuesta-de-valor.component.html',
  styleUrls: ['./propuesta-de-valor.component.css']
})
export class PropuestaDeValorComponent {

  valuePropositions:ValuePropositions= new ValuePropositions();
  proceso:Process= new Process;

  procesos:Process[]=[];
  cliente: Client = new Client()
  value:boolean;
  constructor(private modalService: ModalService,
     private clienteService: ClientService,
      private rutaParametro: ActivatedRoute,
      private procesoService:ProcesoService,
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
    this.proceso.estado='Propuesta de Valor';
    console.log(this.proceso);
    this.proceso.canvasModel.valuePropositions=this.valuePropositions
   this.procesoService.propuestaValorSave(this.proceso.canvasModel.valuePropositions).subscribe(valor=>{
    this.proceso.canvasModel.valuePropositions=valor;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        Swal.fire('Exito', 'Propuesta de Valor creada con exito', 'success');
      })
    })
   })
  }
}
