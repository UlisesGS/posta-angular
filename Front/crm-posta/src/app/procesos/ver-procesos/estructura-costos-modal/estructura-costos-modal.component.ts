import { Component, Input } from '@angular/core';
import { Process } from '../../Process';
import { ModalService } from 'src/app/client/modal.service';
import { CostComponent } from '../../CostComponent';
import { ProcesoService } from '../../proceso.service';
import Swal from 'sweetalert2';
import { CostStructure } from '../../CostStructure';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estructura-costos-modal',
  templateUrl: './estructura-costos-modal.component.html',
  styleUrls: ['./estructura-costos-modal.component.css']
})
export class EstructuraCostosModalComponent {
  @Input()proceso:Process= new Process();
  @Input()bool:boolean;

  listaVariable:CostComponent[];
  listaFijo:CostComponent[];

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



  constructor(
    private modalServide:ModalService,
    private procesoService:ProcesoService,
    private route:Router,
  ){}

  ngOnInit(): void {
    this.listaVariable=this.proceso.canvasModel.costStructure.costosVariables;
    this.listaFijo=this.proceso.canvasModel.costStructure.costosFijos;
  }

  public cerrarVerMas(){
    this.modalServide.cerrarVerMas8();
  }
  public editar(){
    this.procesoService.estructuraCostoPut(this.proceso.canvasModel.costStructure).subscribe(dato=>{
    this.modalServide.cerrarVerMas8();
    this.route.navigate(["/procesos"])
    Swal.fire('Editado ', 'La estructura de costos fue editada', 'success');
    })
  }

  ver(){
    console.log(this.proceso);
    
  }
  eliminarVariable(costoComponent:CostComponent){
    console.log(costoComponent);
    this.proceso.canvasModel.costStructure.costosVariables= this.proceso.canvasModel.costStructure.costosVariables.filter(item => item!== costoComponent)
      
  }
  eliminarFijo(costoComponent:CostComponent){
    console.log(costoComponent);
    this.proceso.canvasModel.costStructure.costosFijos= this.proceso.canvasModel.costStructure.costosFijos.filter(item => item!== costoComponent)
      
  }
  agregarValor() {
    this.nuevaEntidad= new CostComponent;
     this.nuevaEntidad.amount=this.amount;
     this.nuevaEntidad.nameComponent=this.nameComponent;
     this.proceso.canvasModel.costStructure.costosVariables.push(this.nuevaEntidad);
     console.log(this.proceso.canvasModel.costStructure.costosVariables);

    

  }
  agregarValor1() {
    this.nuevaEntidad1= new CostComponent;
    this.nuevaEntidad1.amount = this.amount1;
    this.nuevaEntidad1.nameComponent = this.nameComponent1;
    this.proceso.canvasModel.costStructure.costosFijos.push(this.nuevaEntidad1);
    console.log(this.proceso.canvasModel.costStructure.costosFijos);

  }

}
