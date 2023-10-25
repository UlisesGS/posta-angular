import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/client/client.service';
import { ProcessEmpresarioService } from '../process-empresario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { Client } from 'src/app/client/client';
import { Usuario } from 'src/app/usuario/usuario';
import { Process } from 'src/app/procesos/Process';
import { ConceptoGenerales } from '../concepto-generales';
import { Indicador } from '../indicador';

@Component({
  selector: 'app-ver-completo',
  templateUrl: './ver-completo.component.html',
  styleUrls: ['./ver-completo.component.css']
})
export class VerCompletoComponent implements OnInit {

  cliente: Client = new Client();
  usuario: Usuario = new Usuario();
  proceso: Process = new Process();
  procesos: Process[] = [];
  concepto: ConceptoGenerales[]
  estrategicas: number[]
  produc: number[]
  operacion: number[]
  calidada: number[]
  inovaciones: number[]
  financieras: number[]
  logisticas: number[]
  digitales: number[]
  ambientales: number[]
  intelectuales: number[]

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

  indicador1: Indicador = new Indicador();
  indicador2: Indicador = new Indicador();
  indicador3: Indicador = new Indicador();
  indicador4: Indicador = new Indicador();
  indicador5: Indicador = new Indicador();
  indicador6: Indicador = new Indicador();
  indicador7: Indicador = new Indicador();
  indicador8: Indicador = new Indicador();
  indicador9: Indicador = new Indicador();
  indicador10: Indicador = new Indicador();

  constructor(
    private clienteService: ClientService,
    private processEmpresarioService: ProcessEmpresarioService,
    private ruta: Router,
    private parametro: ActivatedRoute,
    private process: ProcesoService) { }

  ngOnInit(): void {
    this.parametro.paramMap.subscribe(p => {
      let id = +p.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          this.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
          this.process.procesosFindAll().subscribe(pro => {
            this.procesos = pro;
            this.procesos.forEach(proceso => {
              if (proceso?.processEmpresario?.client?.id == this.cliente.id) {
                this.proceso = proceso;
                this.concepto = proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.conceptosGenerales
                this.estrategicas = proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionEstrategica
                this.produc = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionProductividad
                this.operacion = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionOperacional
                this.calidada = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionCalidad
                this.inovaciones = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionInnovacion
                this.financieras = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionFinanciera
                this.logisticas = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionLogistica
                this.digitales = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionDigital
                this.ambientales = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionAmbiental
                this.intelectuales = this.proceso.processEmpresario.diagnosticoEmpresarial.diagnostico.gestionIntelectual

                this.indicador1=this.proceso.processEmpresario.diagnosticoEmpresarial.analisisEconomico.ventasMes;
    this.indicador2=this.proceso.processEmpresario.diagnosticoEmpresarial.analisisEconomico.aumentoVentas;
    this.indicador3=this.proceso.processEmpresario.diagnosticoEmpresarial.analisisEconomico.empleosFormales;
    this.indicador4=this.proceso.processEmpresario.diagnosticoEmpresarial.analisisEconomico.empleosInformales;
    this.indicador5=this.proceso.processEmpresario.diagnosticoEmpresarial.analisisEconomico.empleosNuevos;
    this.indicador6=this.proceso.processEmpresario.diagnosticoEmpresarial.analisisEconomico.empresaExportando;
    this.indicador7=this.proceso.processEmpresario.diagnosticoEmpresarial.analisisEconomico.ventassExportacion;
    this.indicador8=this.proceso.processEmpresario.diagnosticoEmpresarial.analisisEconomico.diversificacionProductos;
    this.indicador9=this.proceso.processEmpresario.diagnosticoEmpresarial.analisisEconomico.aperturaNuevosMercados;
    this.indicador10=this.proceso.processEmpresario.diagnosticoEmpresarial.analisisEconomico.accesoOtrasFuentes;
              }
            })
          })
        })
      }
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
