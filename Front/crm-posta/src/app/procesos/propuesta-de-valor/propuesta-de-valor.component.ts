import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';

@Component({
  selector: 'app-propuesta-de-valor',
  templateUrl: './propuesta-de-valor.component.html',
  styleUrls: ['./propuesta-de-valor.component.css']
})
export class PropuestaDeValorComponent {

  cliente: Client = new Client()
  value:boolean;
  constructor(private modalService: ModalService, private clienteService: ClientService, private rutaParametro: ActivatedRoute) { }
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
}
