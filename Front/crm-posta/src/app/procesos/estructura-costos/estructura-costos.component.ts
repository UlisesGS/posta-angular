import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { CostComponent } from '../CostComponent';

@Component({
  selector: 'app-estructura-costos',
  templateUrl: './estructura-costos.component.html',
  styleUrls: ['./estructura-costos.component.css']
})
export class EstructuraCostosComponent {

  cliente: Client = new Client()
  value:boolean;
  //Cost Component
  listaBackend: CostComponent[] = [];
  amount:number;
  nameComponent: string;
  id:number;



  constructor(private modalService: ModalService,
     private clienteService: ClientService,
     private rutaParametro: ActivatedRoute) { }

  ngOnInit(): void {
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          console.log(data);

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

  agregarValor() {
    const nuevaEntidad: CostComponent = {
      id:this.id,
      amount: this.amount,
      nameComponent: this.nameComponent
    };
    this.listaBackend.push(nuevaEntidad);
    this.amount;
    this.nameComponent;
  }



}
