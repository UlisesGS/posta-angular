import { Component, OnInit } from '@angular/core';
import { ProcessEmpresario } from '../process-empresario';
import { Diagnostico } from '../diagnostico';
import { ConceptoGenerales } from '../concepto-generales';
import { lastDayOfDecade, parseJSON } from 'date-fns';
import { ProcessEmpresarioService } from './../process-empresario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { Usuario } from 'src/app/usuario/usuario';
import { ClientService } from 'src/app/client/client.service';
import Swal from 'sweetalert2';
import { DiagnosticoEmpresarial } from '../diagnostico-empresarial';


@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {
  //para llenar guardemos todo
  procesos: ProcessEmpresario = new ProcessEmpresario();
  // esto es para mapear el diagnostico
  diagnostico: Diagnostico = new Diagnostico();
  conceptoGenerales: ConceptoGenerales = new ConceptoGenerales();
  concepto: ConceptoGenerales[] = [new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales, new ConceptoGenerales];
  estrategicas: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  produc: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  operacion: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  calidada: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  inovaciones: number[] = [0, 1, 2, 3];
  financieras: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  logisticas: number[] = [0, 1, 2, 3, 4, 5];
  digitales: number[] = [0, 1, 2, 3, 4];
  ambientales: number[] = [0, 2, 3, 4, 5, 6, 7, 8]
  intelectuales: number[] = [0, 1, 2, 3, 4];
  procesoEmpresario: ProcessEmpresario = new ProcessEmpresario()
  cliente: Client = new Client();
  usuario: Usuario = new Usuario();
  constructor(private clienteService: ClientService, private processEmpresarioService: ProcessEmpresarioService, private ruta: Router, private parametro: ActivatedRoute) { }
  ngOnInit(): void {
    this.consolidado=true;
    this.processEmpresarioService.procesoEmpresarioFindById(1).subscribe(data=>{
      this.procesoEmpresario=data;
    })
    this.procesoEmpresario.diagnosticoEmpresarial= new DiagnosticoEmpresarial();
    this.procesoEmpresario.diagnosticoEmpresarial.diagnostico= new Diagnostico();
    //console.log(this.concepto.length);
    this.parametro.paramMap.subscribe(p => {
      let id = +p.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          this.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
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



  sacarTotales() {

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
    console.log(this.diagnostico);
    this.procesoEmpresario.client = this.cliente
    this.procesoEmpresario.diagnosticoEmpresarial.diagnostico = this.diagnostico;
    this.procesoEmpresario.user = this.usuario;
    this.procesoEmpresario.estado = 'Diagnostico'
    console.log(this.procesoEmpresario);
   // this.procesoEmpresario.diagnosticoEmpresarial.diagnostico.totales

    //llamar al back para que saque todos los totales
    this.processEmpresarioService.procesoEmpresarioSave(this.procesoEmpresario).subscribe(data => {
      this.procesoEmpresario=data;
      this.consolidado=true;
      Swal.fire('Exito:', 'El Diagnostico de Empresario fue creado con exito', 'success');
    })


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
}
