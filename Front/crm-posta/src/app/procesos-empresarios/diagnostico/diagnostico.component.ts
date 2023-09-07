import { Component, OnInit } from '@angular/core';
import { ProcessEmpresario } from '../process-empresario';
import { Diagnostico } from '../diagnostico';
import { ConceptoGenerales } from '../concepto-generales';
import { isThisISOWeek, lastDayOfDecade, parseJSON } from 'date-fns';
import { ProcessEmpresarioService } from './../process-empresario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { Usuario } from 'src/app/usuario/usuario';
import { ClientService } from 'src/app/client/client.service';
import Swal from 'sweetalert2';
import { DiagnosticoEmpresarial } from '../diagnostico-empresarial';
import { Process } from 'src/app/procesos/Process';
import { ProcesoService } from 'src/app/procesos/proceso.service';



@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {
  idEditar:number;
  idVer:number;
  total:number=0;
  //para llenar guardemos todo
  procesos: ProcessEmpresario = new ProcessEmpresario();
  // esto es para mapear el diagnostico
  diagnostico: Diagnostico = new Diagnostico();
  conceptoGenerales: ConceptoGenerales = new ConceptoGenerales();
  procesosS:Process[]=[];
  procesosSS:Process[]=[];
  proceso:Process=new Process();
  concepto: ConceptoGenerales[] = [new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales];
  estrategicas: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  produc: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  operacion: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  calidada: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  inovaciones: number[] = [1, 1, 1, 1];
  financieras: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  logisticas: number[] = [1, 1, 1, 1, 1, 1];
  digitales: number[] = [1, 1, 1, 1, 1];
  ambientales: number[] = [1, 1, 1, 1, 1, 1, 1, 1]
  intelectuales: number[] = [1, 1, 1, 1, 1,1];
  procesoEmpresario: ProcessEmpresario = new ProcessEmpresario()
  cliente: Client = new Client();
  usuario: Usuario = new Usuario();
  idEditar1:number;
  constructor(private clienteService: ClientService, private processEmpresarioService: ProcessEmpresarioService, private ruta: Router, private parametro: ActivatedRoute, private process:ProcesoService) { }
  ngOnInit(): void {
  
    this.procesoEmpresario.diagnosticoEmpresarial= new DiagnosticoEmpresarial();
    this.procesoEmpresario.diagnosticoEmpresarial.diagnostico= new Diagnostico();
    this.proceso=new Process();
    this.proceso.processEmpresario = new ProcessEmpresario();
    this.proceso.processEmpresario.diagnosticoEmpresarial = new DiagnosticoEmpresarial();
    this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico= new  Diagnostico();
    
    this.parametro.paramMap.subscribe(p => {
      let id = +p.get('id');
      this.idEditar1 = + p.get('idEditar1');

      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          this.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
          this.process.procesosFindAll().subscribe(pro => {
            
            this.procesosSS=pro;
            this.procesosSS.forEach(proceso=>{
              if(proceso?.selfAssessment?.client?.id==this.cliente.id){

                this.proceso=proceso;
                }

              })
            })
          // para editar
           this.idEditar = +p.get('idEditar');
            //para ver
            this.idVer = +p.get('idVer');
          if(this.idEditar1){
            //console.log('entro en el editar1');
           this.traerSegunElId(this.idEditar1);
        }
          if(this.idEditar){
         //  console.log('entro en el editar');
           
            
            this.traerSegunElId(this.idEditar)
          }
          if(this.idVer){
           
           this.traerSegunElId(this.idVer) 
          }

        })
      }
    })

    this.diagnostico.conceptosGenerales = []
  }
  conceptos: boolean = false;
  gestion: boolean = false;
  productividad: boolean = false;
  operacional: boolean = false;
  calidad: boolean = false;

  innovacion: boolean = false;
  financiero: boolean = false;
  logistica: boolean = false;
  digital: boolean = false;
  ambiental: boolean = false;
  intelectual: boolean = false;
  consolidado: boolean = false;

continuar(){
  if(this.proceso.processEmpresario.diagnosticoEmpresarial.analisisResultados){
    this.ruta.navigate([`/resultados/empresario/${this.cliente.id}/editar/${this.proceso.id}`])
  }else{
    this.ruta.navigate(['/empresario/resultados/cliente/', this.cliente.id])
  }
}

  sacarTotales() {
    this.total=0;

    this.diagnostico.conceptosGenerales = this.concepto;
    this.diagnostico.gestionEstrategica = this.estrategicas;
    this.diagnostico.gestionProductividad = this.produc;
    this.diagnostico.gestionOperacional = this.operacion;
    this.diagnostico.gestionCalidad = this.calidada;
    this.diagnostico.gestionInnovacion = this.inovaciones;
    this.diagnostico.gestionFinanciera = this.financieras;
    this.diagnostico.gestionLogistica = this.logisticas;
    this.diagnostico.gestionDigital = this.digitales;
    this.diagnostico.gestionAmbiental = this.ambientales;
    this.diagnostico.gestionIntelectual = this.intelectuales;
    this.procesoEmpresario.client = this.cliente
    this.procesoEmpresario.diagnosticoEmpresarial.diagnostico = this.diagnostico;
    this.procesoEmpresario.user = this.usuario;
   // this.procesoEmpresario.diagnosticoEmpresarial.diagnostico.totales
    this.proceso.processEmpresario=this.procesoEmpresario

    console.log(this.proceso);
    this.proceso.client=this.cliente;
    //llamar al back para que saque todos los totales
    
    this.processEmpresarioService.procesoEmpresarioSave(this.proceso).subscribe(data => {
      this.proceso.processEmpresario=data;

      this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.totales.forEach(t=>{
        this.total+=t;
      })
      this.total=this.total/10;
      this.proceso.user=this.usuario;
      this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.total=this.total;
      this.consolidado=true;
      this.proceso.cambio=true;
      //this.procesoEmpresario.estado = 'Diagnostico'
      this.proceso.estado= 'Diagnostico';
      this.proceso.estadoAnteriorEmpresario= 'Diagnostico';
      this.proceso.cambio=true;
      this.process.procesosSave(this.proceso).subscribe(dato=>{
        console.log(dato);

      })
      Swal.fire('Exito:', 'El Diagnostico de Empresario fue creado con exito', 'success');
    })


  }



  sacarTotalesCambiarTipo() {
    console.log("entre a este");
    
    this.total=0;

    this.diagnostico.conceptosGenerales = this.concepto;
    this.diagnostico.gestionEstrategica = this.estrategicas;
    this.diagnostico.gestionProductividad = this.produc;
    this.diagnostico.gestionOperacional = this.operacion;
    this.diagnostico.gestionCalidad = this.calidada;
    this.diagnostico.gestionInnovacion = this.inovaciones;
    this.diagnostico.gestionFinanciera = this.financieras;
    this.diagnostico.gestionLogistica = this.logisticas;
    this.diagnostico.gestionDigital = this.digitales;
    this.diagnostico.gestionAmbiental = this.ambientales;
    this.diagnostico.gestionIntelectual = this.intelectuales;
    this.procesoEmpresario.client = this.cliente
    this.procesoEmpresario.diagnosticoEmpresarial.diagnostico = this.diagnostico;
    this.procesoEmpresario.user = this.usuario;
   // this.procesoEmpresario.diagnosticoEmpresarial.diagnostico.totales
    this.proceso.processEmpresario=this.procesoEmpresario

   
    
    //llamar al back para que saque todos los totales
   
    this.processEmpresarioService.procesoEmpresarioSave(this.proceso).subscribe(data => {
      this.proceso.processEmpresario=data;

      this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.totales.forEach(t=>{
        this.total+=t;
      })
      this.total=this.total/10;
      this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.total=this.total;

      this.consolidado=true;
      //this.procesoEmpresario.estado = 'Diagnostico'
      this.proceso.estado= 'Diagnostico';
      this.proceso.estadoAnteriorEmpresario= 'Diagnostico';
      this.proceso.cambio=true;
      this.process.procesosUpdate(this.proceso).subscribe(dato=>{
        console.log(dato);

      })
      Swal.fire('Exito:', 'El Diagnostico de Empresario fue creado con exito', 'success');
    })


  }
traerSegunElId(idProceso:number){
  this.process.procesosFindById(idProceso).subscribe(data=>{
    this.total=0;
    this.proceso=data;
    this.procesoEmpresario=this.proceso.processEmpresario
    this.diagnostico=this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico
    this.procesoEmpresario.diagnosticoEmpresarial=this.proceso.processEmpresario.diagnosticoEmpresarial
    this.procesoEmpresario.diagnosticoEmpresarial.diagnostico=this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico
    this.concepto = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.conceptosGenerales
    this.estrategicas = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionEstrategica
    this.produc = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionProductividad
    this.operacion = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionOperacional
    this.calidada = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionCalidad
    this.inovaciones = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionInnovacion
    this.financieras = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionFinanciera
    this.logisticas = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionLogistica
    this.digitales = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionDigital
    this.ambientales = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionAmbiental
    this.intelectuales = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionIntelectual
    this.consolidado=true;
    this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.totales.forEach(t=>{
      this.total+=t;
      
    })
    this.total=this.total/10;
  }) 
}


  editar(){
    this.total=0;
    console.log(this.estrategicas);
    
    this.diagnostico.conceptosGenerales = this.concepto;
    this.diagnostico.gestionEstrategica = this.estrategicas;
    this.diagnostico.gestionProductividad = this.produc;
    this.diagnostico.gestionOperacional = this.operacion;
    this.diagnostico.gestionCalidad = this.calidada;
    this.diagnostico.gestionInnovacion = this.inovaciones;
    this.diagnostico.gestionFinanciera = this.financieras;
    this.diagnostico.gestionLogistica = this.logisticas;
    this.diagnostico.gestionDigital = this.digitales;
    this.diagnostico.gestionAmbiental = this.ambientales;
    this.diagnostico.gestionIntelectual = this.intelectuales;
    this.procesoEmpresario.client = this.cliente
    this.procesoEmpresario.diagnosticoEmpresarial.diagnostico = this.diagnostico;
    this.procesoEmpresario.user = this.usuario;
   // this.procesoEmpresario.diagnosticoEmpresarial.diagnostico.totales
    this.proceso.processEmpresario=this.procesoEmpresario

    console.log(this.proceso);
    this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.totales.forEach(t=>{
      this.total+=t;
    })
    this.total=this.total/10;
    this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.total=this.total;
    
    //llamar al back para que saque todos los totales
    this.processEmpresarioService.updateProcesoDiagnostico(this.proceso).subscribe(data=>{
      console.log(data);
      
    })
      
   if (this.idEditar1){
    this.ruta.navigate([`/diagnostico/empresario/${this.cliente.id}/ver/${this.proceso.id}`]);
    Swal.fire('Exito:', 'El Diagnostico de Empresario fue editado con exito', 'success');
   }else{
    if(this.proceso.processEmpresario.diagnosticoEmpresarial.analisisResultados){
      this.ruta.navigate([`/resultados/empresario/${this.cliente.id}/editar/${this.proceso.id}`])
      Swal.fire('Exito:', 'El Diagnostico de Empresario fue editado con exito', 'success');
    }else{
      this.ruta.navigate(['/empresario/resultados/cliente/', this.cliente.id])
      Swal.fire('Exito:', 'El Diagnostico de Empresario fue editado con exito', 'success');
    }
   }

   
  }



  condicionConceptos() {
    if (this.conceptos) {
      this.conceptos = false;
    } else {
      this.conceptos = true;
    }
  }
  condicionGestion() {
    if (this.gestion) {
      this.gestion = false;
    } else {
      this.gestion = true;
    }
  }
  condicionProductividad() {
    if (this.productividad) {
      this.productividad = false;
    } else {
      this.productividad = true;
    }
  }
  condicionOperacional() {
    if (this.operacional) {
      this.operacional = false;
    } else {
      this.operacional = true;
    }
  }
  condicionCalidad() {
    if (this.calidad) {
      this.calidad = false;
    } else {
      this.calidad = true;
    }
  }
  condicionInnovacion() {
    if (this.innovacion) {
      this.innovacion = false;
    } else {
      this.innovacion = true;
    }
  }
  condicionFinanciero() {
    if (this.financiero) {
      this.financiero = false;
    } else {
      this.financiero = true;
    }
  }
  condicionLogistica() {
    if (this.logistica) {
      this.logistica = false;
    } else {
      this.logistica = true;
    }
  }
  condicionDigitalizacion() {
    if (this.digital) {
      this.digital = false;
    } else {
      this.digital = true;
    }
  }
  condicionAmbiental() {
    if (this.ambiental) {
      this.ambiental = false;
    } else {
      this.ambiental = true;
    }
  }
  condicionIntelectual() {
    if (this.intelectual) {
      this.intelectual = false;
    } else {
      this.intelectual = true;
    }
  }
  condicionConsolidado() {
    if (this.consolidado) {
      this.consolidado = false;
    } else {
      this.consolidado = true;
    }
  }
  // esto estaba en el html
  /*
  <div>
          <span class="left-align">CONSOLIDADO </span><i class="fa-solid fa-caret-down fa-xl right-align" type="button"
            (click)="condicionConsolidado()"></i>
        </div>
  */
}
