import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { Process } from 'src/app/procesos/Process';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {
cliente:Client=new Client();
procesos:Process[];
proceso:Process=new Process();


constructor(private procesoService:ProcesoService, private rutaParametro:ActivatedRoute,
  private clienteService:ClientService){}


ngOnInit(): void {
  this.rutaParametro.paramMap.subscribe(parametro => {
    let id = +parametro.get('id');
    if (id) {
      this.clienteService.getClient(id).subscribe(data => {
        this.cliente = data;
        console.log(data);
        this.procesoService.procesosFindAll().subscribe(pro => {
          this.procesos=pro;

          this.procesos.forEach(proceso=>{
            if(proceso.canvasModel.client.id==this.cliente.id){
              this.proceso=proceso;
              console.log(this.proceso);

            }
          })
        })

      })
    }
  })
}
}
