import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { CostComponent } from './costComponent';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent {

  cliente: Client = new Client()
  value:boolean;
  //Cost Component
  listaBackend: CostComponent[] = [];
  amount:number;
  nameComponent: string;


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
      amount: this.amount,
      nameComponent: this.nameComponent
    };
    this.listaBackend.push(nuevaEntidad);
    this.amount;
    this.nameComponent;
  }

}
