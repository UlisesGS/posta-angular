import { Component, Input } from '@angular/core';
import { Process } from '../../Process';
import { ModalService } from 'src/app/client/modal.service';
import { CostComponent } from '../../CostComponent';

@Component({
  selector: 'app-estructura-costos-modal',
  templateUrl: './estructura-costos-modal.component.html',
  styleUrls: ['./estructura-costos-modal.component.css']
})
export class EstructuraCostosModalComponent {
  @Input()proceso:Process= new Process();
  listaVariable:CostComponent[];
  listaFijo:CostComponent[];
  constructor(
    private modalServide:ModalService,
  ){}

  ngOnInit(): void {
    console.log(this.proceso);
    this.listaVariable=this.proceso.canvasModel.costStructure.variableCost;
    console.log(this.listaVariable);
    
    this.listaFijo=this.proceso.canvasModel.costStructure.fixedCosts;
    console.log(this.listaFijo);
    
    
  }

  public cerrarVerMas(){
    this.modalServide.cerrarVerMas8();
  }
}
