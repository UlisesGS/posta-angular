import { Component } from '@angular/core';
import { ProcessEmpresario } from '../process-empresario';
import { Client } from 'src/app/client/client';
import { Process } from 'src/app/procesos/Process';
import { ProcessEmpresarioService } from '../process-empresario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { AnalisisEconomico } from '../analisis-economico';
import { Indicador } from './../indicador';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-economico',
  templateUrl: './economico.component.html',
  styleUrls: ['./economico.component.css']
})
export class EconomicoComponent {


  procesoEmpresario:ProcessEmpresario= new ProcessEmpresario()
//procesos:ProcessEmpresario[]=[];
cliente:Client= new Client();
procesos:Process[]=[];
proceso:Process = new Process();
indicador1:Indicador = new Indicador();
indicador2:Indicador= new Indicador();
indicador3:Indicador = new Indicador();
indicador4:Indicador = new Indicador();
indicador5:Indicador = new Indicador();
indicador6:Indicador = new Indicador();
indicador7:Indicador = new Indicador();
indicador8:Indicador = new Indicador();
indicador9:Indicador = new Indicador();
indicador10:Indicador = new Indicador();
analisisEconomico:AnalisisEconomico = new AnalisisEconomico();

  constructor(
    private procesoEmpresarioservice: ProcessEmpresarioService,
    private ruta:ActivatedRoute,
    private clienteServicio:ClientService,
    private process:ProcesoService,
    private router:Router,
    ){}
  ngOnInit(): void {
    //this.procesoEmpresario.diagnosticoEmpresarial.analisisResultados.
this.ruta.paramMap.subscribe(parametro=>{
  let id = + parametro.get('id')
  this.clienteServicio.getClient(id).subscribe(clien=>{
    this.cliente= clien;
    this.process.procesosFindAll().subscribe(data=>{
      this.procesos= data;

      this.procesos.forEach(pr=>{
        console.log(pr);


          if(pr.processEmpresario?.client?.id == this.cliente.id){
            console.log(pr);

              this.proceso=pr
              this.proceso.processEmpresario.diagnosticoEmpresarial.analisisEconomico=new AnalisisEconomico();
          }
        })






        })
      })
    })
  }


  guardar(){
this.analisisEconomico.ventasMes=this.indicador1;
this.analisisEconomico.aumentoVentas=this.indicador2;
this.analisisEconomico.empleosFormales=this.indicador3;
this.analisisEconomico.empleosInformales=this.indicador4;
this.analisisEconomico.empleosNuevos=this.indicador5;
//si no
this.analisisEconomico.empresaExportando=this.indicador6;
this.analisisEconomico.ventassExportacion=this.indicador7;
//sino todo lo que sigue
this.analisisEconomico.diversificacionProductos=this.indicador8;
this.analisisEconomico.aperturaNuevosMercados=this.indicador9;
this.analisisEconomico.accesoOtrasFuentes=this.indicador10;
console.log(this.analisisEconomico);
this.proceso.processEmpresario.diagnosticoEmpresarial.analisisEconomico= this.analisisEconomico;
console.log(this.proceso);
this.procesoEmpresarioservice.procesoEmpresarioSave(this.proceso).subscribe(data=>{
 // this.proceso = data;
 this.proceso.estado='Economico';
  this.process.procesosUpdate(this.proceso).subscribe(p=>{
    Swal.fire('Exito', 'Analisis Economico creado con exito', 'success');
    this.router.navigate(['/procesos'])
  })

})




  }
}
