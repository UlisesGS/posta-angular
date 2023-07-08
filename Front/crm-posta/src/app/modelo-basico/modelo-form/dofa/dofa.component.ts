import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { Process } from 'src/app/procesos/Process';
import { ProcesoService } from 'src/app/procesos/proceso.service';

@Component({
  selector: 'app-dofa',
  templateUrl: './dofa.component.html',
  styleUrls: ['./dofa.component.css']
})
export class DofaComponent {
  cliente: Client = new Client();
  value:boolean;
  procesos:Process[]=[];
  proceso:Process= new Process();

  constructor(private modalService: ModalService,
    private clienteService: ClientService,
    private rutaParametro: ActivatedRoute,
    private procesoService:ProcesoService,
    private router:Router) { }
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
