import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { CostComponent } from '../CostComponent';
import { CostStructure } from '../CostStructure';
import { ProcesoService } from '../proceso.service';
import Swal from 'sweetalert2';
import { Process } from '../Process';


@Component({
  selector: 'app-estructura-costos',
  templateUrl: './estructura-costos.component.html',
  styleUrls: ['./estructura-costos.component.css']
})
export class EstructuraCostosComponent {

  cliente: Client = new Client()
  value: boolean;
  //Cost Component
  listaBackend: CostComponent[] = [];
  listaBackend2: CostComponent[] = [];
  amount: number;
  nameComponent: string;
  amount1: number;
  nameComponent1: string;
  id: number;
  costoEntidad: CostStructure = new CostStructure;
  listaCostos: CostComponent[] = [];
  nuevaEntidad: CostComponent = new CostComponent;
  nuevaEntidad1: CostComponent = new CostComponent;
  proceso: Process = new Process;

  procesos: Process[] = [];
  constructor(private modalService: ModalService,
    private clienteService: ClientService,
    private rutaParametro: ActivatedRoute,
    private procesoService: ProcesoService,
    private router: Router,
    
  ) {
    
   }

  ngOnInit(): void {


    this.procesoService.costosTodos().subscribe(data => {
      this.listaCostos = data;
    })
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          console.log(data);
          this.procesoService.procesosFindAll().subscribe(p => {

            this.procesos = p;
            this.procesos.forEach(proceso => {
              if (proceso?.canvasModel?.client?.id == this.cliente.id) {
                this.proceso = proceso;
                
                
                // para editar
                let idEditar = +parametro.get('idEditar');
                console.log('no entro al if');
                
                if(idEditar){
                  this.procesoService.procesosFindById(idEditar).subscribe(data=>{
                    this.proceso=data;
                    this.costoEntidad=this.proceso.canvasModel.costStructure;
                    this.listaBackend = this.costoEntidad.costosVariables
                    this.listaBackend2 = this.costoEntidad.costosFijos
                    
                  })
                }

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


  cambiarCondicion() {
    if (this.value) {
      this.value = false;
    } else {
      this.value = true;
    }
  }

  agregarValor() {
    this.nuevaEntidad= new CostComponent;
     this.nuevaEntidad.amount=this.amount;
     this.nuevaEntidad.nameComponent=this.nameComponent;
     this.listaBackend.push(this.nuevaEntidad);
     console.log(this.listaBackend);

    

  }
  agregarValor1() {
    this.nuevaEntidad1= new CostComponent;
    this.nuevaEntidad1.amount = this.amount1;
    this.nuevaEntidad1.nameComponent = this.nameComponent1;
    this.listaBackend2.push(this.nuevaEntidad1);
    console.log(this.listaBackend2);

  }

  eliminarVariable(costoComponent:CostComponent){
    console.log(costoComponent);
    this.listaBackend= this.listaBackend.filter(item => item!== costoComponent)
      
  }
  eliminarFijo(costoComponent:CostComponent){
    console.log(costoComponent);
    this.listaBackend2= this.listaBackend2.filter(item => item!== costoComponent)
      
  }




  guardarYSalir() {
    //this.proceso.terminado=true;
    this.proceso.estado = 'Estructura Costos';
    this.proceso.estadoAnteriorEmprendedor= "Estructura Costos";
    this.costoEntidad.costosFijos = this.listaBackend2;
    this.costoEntidad.costosVariables = this.listaBackend;
    this.costoEntidad.totalVariable();
    this.costoEntidad.totalFijo();
    this.costoEntidad.total();
    console.log(this.costoEntidad);
    this.proceso.canvasModel.costStructure = this.costoEntidad;
    console.log(this.costoEntidad);

    this.procesoService.estructuraCostoSave(this.costoEntidad).subscribe(costo => {
      this.proceso.canvasModel.costStructure = costo;
      this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas => {
        this.procesoService.procesosUpdate(this.proceso).subscribe(data => {
          this.router.navigate(['procesos'])
          console.log(this.proceso);

          Swal.fire('Exito', 'Estructura costos creado con exito', 'success');
        })
      })
    })

  }
 
  guardar() {
    this.proceso.estado = 'Estructura Costos';
    this.proceso.estadoAnteriorEmprendedor= "Estructura Costos";
    this.costoEntidad.costosFijos = this.listaBackend2;
    this.costoEntidad.costosVariables = this.listaBackend;
    this.costoEntidad.totalVariable();
    this.costoEntidad.totalFijo();
    this.costoEntidad.total();
    console.log(this.costoEntidad);
  
    this.proceso.canvasModel.costStructure = this.costoEntidad;
  
    this.procesoService.estructuraCostoSave(this.costoEntidad).subscribe(costo => {
      console.log(costo); // Verifica la respuesta del servidor
  
      this.proceso.canvasModel.costStructure = costo; // Usa el objeto 'costo' recibido en lugar de 'this.costoEntidad'
      this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas => {
        this.procesoService.procesosUpdate(this.proceso).subscribe(data => {
          this.router.navigate(['/informacion/cliente/', this.cliente.id]);
        });
      });
    });
  }



  editarYSalir() {
    this.costoEntidad.costosFijos = this.listaBackend2;
    this.costoEntidad.costosVariables = this.listaBackend;
    this.costoEntidad.totalVariable();
    this.costoEntidad.totalFijo();
    this.costoEntidad.total();
    this.proceso.canvasModel.costStructure = this.costoEntidad;

    this.procesoService.estructuraCostoPut(this.costoEntidad).subscribe(costo => {
      this.proceso.canvasModel.costStructure = costo;
      this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas => {
        this.procesoService.procesosUpdate(this.proceso).subscribe(data => {
          this.router.navigate(['procesos'])
          

          Swal.fire('Exito', 'Estructura costos editado con exito', 'success');
        })
      })
    })

  }



  editar() {
    console.log(this.costoEntidad);
    
    this.costoEntidad.costosFijos = this.listaBackend2;
    this.costoEntidad.costosVariables = this.listaBackend;
  
    this.proceso.canvasModel.costStructure = this.costoEntidad;
  
    this.procesoService.estructuraCostoPut(this.costoEntidad).subscribe(costo => {
  
      this.proceso.canvasModel.costStructure = costo;
      this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas => {
        this.procesoService.procesosUpdate(this.proceso).subscribe(data => {
          if(this.proceso?.businessPlan?.proyectInformation){
            this.router.navigate([`/informacion/cliente/${this.cliente.id}/editar/${this.proceso.id}`])
          }else{
            this.router.navigate(['/informacion/cliente/', this.cliente.id]);
          }
        });
      });
    });
  }
  }





