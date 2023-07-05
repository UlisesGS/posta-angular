import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { CostComponent } from '../CostComponent';
import { CostStructure } from '../CostStructure';
import { ProcesoService } from '../proceso.service';
import Swal from 'sweetalert2';

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
  listaBackend2: CostComponent[] = [];
  amount:number;
  nameComponent: string;
  amount1:number;
  nameComponent1: string;
  id:number;
  costoEntidad:CostStructure  = new CostStructure;



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
  agregarValor1() {
    const nuevaEntidad1: CostComponent = {
      id:this.id,
      amount: this.amount1,
      nameComponent: this.nameComponent1
    };
    this.listaBackend2.push(nuevaEntidad1);

  }
  guardar(){
    this.costoEntidad.fixedCosts=this.listaBackend2;
    this.costoEntidad.variableCost= this.listaBackend;
    this.costoEntidad.totalVariable();
    this.costoEntidad.totalFijo();
    this.costoEntidad.total();
    console.log(this.costoEntidad);
    this.procesoService.estructuraCostoSave(this.costoEntidad).subscribe(data=>{
      Swal.fire('Exito: ', 'Guardada con exito', 'success');
    }, e=>{
      console.log(e);

      //Swal.fire('Exito: ', `${e}`, 'success');
    })


  }




}
