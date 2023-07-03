import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../proceso.service';
import { Process } from '../Process';
import { KeyPartners } from '../KeyPartners';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-socios-claves',
  templateUrl: './socios-claves.component.html',
  styleUrls: ['./socios-claves.component.css']
})
export class SociosClavesComponent {

  keyPartners:KeyPartners=new KeyPartners();
  cliente: Client = new Client()
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
    this.proceso.estado='Socios Claves';
    console.log(this.proceso);
    this.proceso.canvasModel.keyPartners=this.keyPartners
    
    
   this.procesoService.sociosClavesSave(this.proceso.canvasModel.keyPartners).subscribe(pro=>{
    this.proceso.canvasModel.keyPartners=pro;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        
      })
    })
   })
  }


  public guardarYsalir(){
    this.proceso.estado='Socios Claves';
    console.log(this.proceso);
    this.proceso.canvasModel.keyPartners=this.keyPartners
    
    
   this.procesoService.sociosClavesSave(this.proceso.canvasModel.keyPartners).subscribe(pro=>{
    this.proceso.canvasModel.keyPartners=pro;
    this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
      this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
        this.router.navigate(['procesos'])
        Swal.fire('Exito', 'Socios claves creada con exito', 'success');
        
      })
    })
   })
  }
}
