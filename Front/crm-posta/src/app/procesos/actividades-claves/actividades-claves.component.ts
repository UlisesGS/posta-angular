import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { ProcesoService } from '../proceso.service';
import { Process } from '../Process';
import { KeyActivities } from '../KeyActivities';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividades-claves',
  templateUrl: './actividades-claves.component.html',
  styleUrls: ['./actividades-claves.component.css']
})
export class ActividadesClavesComponent {

  keyActivities: KeyActivities = new KeyActivities();
  cliente: Client = new Client();
  value: boolean;
  procesos: Process[] = [];
  proceso: Process = new Process();
  constructor(private modalService: ModalService,
    private clienteService: ClientService,
    private rutaParametro: ActivatedRoute,
    private procesoService: ProcesoService,
    private router: Router) { }
  ngOnInit(): void {
    this.rutaParametro.paramMap.subscribe(parametro => {
      const id = +parametro.get('id');
      const idEditar = +parametro.get('idEditar');

      if (id) {
        this.clienteService.getClient(id).subscribe(clienteData => {
          this.cliente = clienteData;

          this.procesoService.procesosFindAll().subscribe(procesos => {
            this.procesos = procesos;

            this.proceso = this.procesos.find(proceso => proceso?.canvasModel?.client?.id === this.cliente.id);

            if (this.proceso) {
              if (idEditar) {
                this.procesoService.procesosFindById(idEditar).subscribe(data => {
                  this.proceso = data;
                  this.keyActivities = this.proceso.canvasModel.keyActivities;
                });
              }
            }
          });
        });
      }
    });
  }

  cerrarModalAsesoria(): void {
    this.modalService.cerrarModalAsesoria();
  }

  cambiarCondicion() {
    this.value = !this.value;
  }

  // guardar() {
  //   this.actualizarProcesoAndRedirect('Actividades Claves', 'Actividades claves creada con exito');
  // }

  guardarYsalir() {
    this.actualizarProcesoAndRedirect('Actividades Claves', 'Actividades claves creada con exito', 'procesos');
  }

  editar() {
    this.actualizarProcesoAndRedirect('Actividades Claves');
  }

  editarYsalir() {
    this.actualizarProcesoAndRedirect('Actividades Claves', 'Actividades claves editadas con exito', 'procesos');
  }

  private actualizarProcesoAndRedirect(estado: string, successMessage?: string, redirectPath?: string) {
    this.proceso.estado = estado;
    this.proceso.estadoAnteriorEmprendedor = estado;
    this.proceso.canvasModel.keyActivities = this.keyActivities;

    this.procesoService.actividadesClavesSave(this.proceso.canvasModel.keyActivities).subscribe(pro => {
      this.proceso.canvasModel.keyActivities = pro;
      this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas => {
        this.procesoService.procesosUpdate(this.proceso).subscribe(data => {
          if (redirectPath) {
            this.router.navigate([redirectPath]);
          }
          if (successMessage) {
            Swal.fire('Exito', successMessage, 'success');
          }
        });
      });
    });
  }


  // ngOnInit(): void {
  //   this.rutaParametro.paramMap.subscribe(parametro => {
  //     let id = +parametro.get('id');
  //     if (id) {
  //       this.clienteService.getClient(id).subscribe(data => {
  //         this.cliente = data;
  //         this.procesoService.procesosFindAll().subscribe(pro => {
  //           this.procesos=pro;

  //           this.procesos.forEach(proceso=>{
  //             if(proceso?.canvasModel?.client?.id==this.cliente.id){
  //               this.proceso=proceso;

  //               // para editar
  //               let idEditar = +parametro.get('idEditar');

  //               if(idEditar){
  //                 this.procesoService.procesosFindById(idEditar).subscribe(data=>{
  //                   this.proceso=data;
  //                   this.keyActivities=this.proceso.canvasModel.keyActivities;

  //                 })
  //               }

  //             }
  //           })
  //         })

  //       })
  //     }
  //   })
  // }

  // cerrarModalAsesoria(): void {
  //   this.modalService.cerrarModalAsesoria();
  // }


  // cambiarCondicion(){
  //   if(this.value){
  //     this.value=false;
  //    }else{
  //      this.value=true;
  //    }
  // }


   public guardar(){
     this.proceso.estado='Actividades Claves';
     this.proceso.estadoAnteriorEmprendedor='Actividades Claves'
     this.proceso.canvasModel.keyActivities=this.keyActivities


    this.procesoService.actividadesClavesSave(this.proceso.canvasModel.keyActivities).subscribe(pro=>{
     this.proceso.canvasModel.keyActivities=pro;
     this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
       this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
         this.router.navigate(['sociosClaves/cliente/', this.cliente.id])
       })
     })
    })
  }


  // public guardarYsalir(){
  //   this.proceso.estado='Actividades Claves';
  //   this.proceso.estadoAnteriorEmprendedor='Actividades Claves'
  //   this.proceso.canvasModel.keyActivities=this.keyActivities


  //  this.procesoService.actividadesClavesSave(this.proceso.canvasModel.keyActivities).subscribe(pro=>{
  //   this.proceso.canvasModel.keyActivities=pro;
  //   this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
  //     this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
  //       this.router.navigate(['procesos'])
  //       Swal.fire('Exito', 'Actividades claves creada con exito', 'success');

  //     })
  //   })
  //  })
  // }


  // public editar(){
  //   this.proceso.estado='Actividades Claves';
  //   this.proceso.canvasModel.keyActivities=this.keyActivities


  //  this.procesoService.actividadesClavesPut(this.proceso.canvasModel.keyActivities).subscribe(pro=>{
  //   this.proceso.canvasModel.keyActivities=pro;
  //   this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
  //     this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
  //       if(this.proceso.canvasModel.keyPartners){
  //         this.router.navigate([`/sociosClaves/cliente/${this.cliente.id}/editar/${this.proceso.id}`])
  //       }else{
  //         this.router.navigate(['/sociosClaves/cliente/', this.cliente.id])
  //       }
  //     })
  //   })
  //  })
  // }


  // public editarYsalir(){
  //   this.proceso.estado='Actividades Claves';
  //   this.proceso.canvasModel.keyActivities=this.keyActivities


  //  this.procesoService.actividadesClavesPut(this.proceso.canvasModel.keyActivities).subscribe(pro=>{
  //   this.proceso.canvasModel.keyActivities=pro;
  //   this.procesoService.canvasUpdate(this.proceso.canvasModel).subscribe(canvas=>{
  //     this.procesoService.procesosUpdate(this.proceso).subscribe(data=>{
  //       this.router.navigate(['procesos'])
  //       Swal.fire('Exito', 'Actividades claves eidtadas con exito', 'success');
  //     })
  //   })
  //  })
  // }
}
