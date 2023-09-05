import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientComponent } from './client/client.component';
import { CommonModule } from '@angular/common';

import { FullCalendarModule } from '@fullcalendar/angular';


import { FormsModule } from '@angular/forms'; 
import { MunicipioComponent } from './municipio/municipio.component';
import { FormClientComponent } from './client/form-client/form-client.component';
import { FormEntrepreneurComponent } from './client/form-entrepreneur/form-entrepreneur.component';
import { RegistrarComponent } from './client/registrar/registrar.component';
import { ClientDetailsComponent } from './client/client-details/client-details.component';
import { AccionComponent } from './client/accion/accion.component';
import { AsesoriaComponent } from './header/asesoria/asesoria.component';
import { UsuariolistComponent } from './usuario/usuariolist/usuariolist.component';
import { UsuarioformComponent } from './usuario/usuarioform/usuarioform.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { HeaderSuperiorComponent } from './header/header-superior/header-superior.component';


//import { CalendarModule as AngularCalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsesoriaListComponent } from './header/asesoria/asesoriaList/asesoriaList.component';
import { ProcesoListarComponent } from './procesos/proceso-listar/proceso-listar.component';
import { AccionProcesosComponent } from './procesos/accion-procesos/accion-procesos.component';
import { NuevoProcesoComponent } from './procesos/nuevo-proceso/nuevo-proceso.component';
import { AutoevaluacionComponent } from './procesos/autoevaluacion/autoevaluacion.component';
import { SegmentoComponent } from './procesos/segmento/segmento.component';
import { PropuestaDeValorComponent } from './procesos/propuesta-de-valor/propuesta-de-valor.component';
import { CanalesComponent } from './procesos/canales/canales.component';
import { RelacionesComponent } from './procesos/relaciones/relaciones.component';
import { RecursosClavesComponent } from './procesos/recursos-claves/recursos-claves.component';
import { ActividadesClavesComponent } from './procesos/actividades-claves/actividades-claves.component';
import { SociosClavesComponent } from './procesos/socios-claves/socios-claves.component';
import { IngresosComponent } from './procesos/ingresos/ingresos.component';
import { EstructuraCostosComponent } from './procesos/estructura-costos/estructura-costos.component';
import { BannerComponent } from './banner/banner.component';
import { VerProcesosComponent } from './procesos/ver-procesos/ver-procesos.component';
import { SegmentoModalComponent } from './procesos/ver-procesos/segmento-modal/segmento-modal.component';
import { PropuestaDeValorModalComponent } from './procesos/ver-procesos/propuesta-de-valor-modal/propuesta-de-valor-modal.component';
import { CanalesModalComponent } from './procesos/ver-procesos/canales-modal/canales-modal.component';
import { RelacionesModalComponent } from './procesos/ver-procesos/relaciones-modal/relaciones-modal.component';
import { RecursosClavesModalComponent } from './procesos/ver-procesos/recursos-claves-modal/recursos-claves-modal.component';
import { ActividadesClavesModalComponent } from './procesos/ver-procesos/actividades-claves-modal/actividades-claves-modal.component';
import { SociosClavesModalComponent } from './procesos/ver-procesos/socios-claves-modal/socios-claves-modal.component';
import { IngresosModalComponent } from './procesos/ver-procesos/ingresos-modal/ingresos-modal.component';
import { EstructuraCostosModalComponent } from './procesos/ver-procesos/estructura-costos-modal/estructura-costos-modal.component';

import { PaginacionComponent } from './procesos/proceso-listar/paginacion/paginacion.component';
import { InformacionComponent } from './procesos/plan-negocio/modelo-basico/modelo-form/informacion/informacion.component';
import { InternoComponent } from './procesos/plan-negocio/modelo-basico/modelo-form/interno/interno.component';
import { DofaComponent } from './procesos/plan-negocio/modelo-basico/modelo-form/dofa/dofa.component';
import { ConclusionComponent } from './procesos/plan-negocio/modelo-basico/modelo-form/conclusion/conclusion.component';
import { PlanFinancieroComponent } from './procesos/plan-negocio/plan-financiero/plan-financiero.component';
import { FinancieroFormComponent } from './procesos/plan-negocio/plan-financiero/financiero-form/financiero-form.component';
import { PresupuestoVentasComponent } from './procesos/plan-negocio/plan-financiero/financiero-form/presupuesto-ventas/presupuesto-ventas.component';
import { PresupuestoFormComponent } from './procesos/plan-negocio/plan-financiero/financiero-form/presupuesto-compras/presupuesto-form.component';
import { PresupuestoGastoComponent } from './procesos/plan-negocio/plan-financiero/financiero-form/presupuesto-gasto/presupuesto-gasto.component';
import { DetallesComponent } from './client/detalles/detalles.component';
import { PlanInversionComponent } from './procesos/plan-negocio/plan-financiero/financiero-form/plan-inversion/plan-inversion.component';
import { ModalDetallesComponent } from './client/detalles/modal-detalles/modal-detalles.component';
import { VerPuntajeComponent } from './procesos/autoevaluacion/ver-puntaje/ver-puntaje.component';
import { ModeloListaComponent } from './procesos/plan-negocio/modelo-basico/modelo-lista/modelo-lista.component';
import { ProcesosEmpresariosComponent } from './procesos-empresarios/procesos-empresarios.component';
import { DiagnosticoComponent } from './procesos-empresarios/diagnostico/diagnostico.component';
import { ResultadosComponent } from './procesos-empresarios/resultados/resultados.component';
import { EconomicoComponent } from './procesos-empresarios/economico/economico.component';

import { AuthGuard } from './usuario/guards/auth.guard';
import { AdminGuard } from './usuario/guards/admin.guard';
import { TokenInterceptor } from './usuario/interceptors/token.interceptor';
import { AuthInterceptor } from './usuario/interceptors/auth.interceptor';



import { PlanAccionComponent } from './procesos-empresarios/plan-accion/plan-accion.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { CalendarioComponent } from './calendario/calendario.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PanelComponent } from './usuario/panel/panel.component';
import { RecargaComponent } from './header/asesoria/asesoriaList/recarga/recarga.component';
import { UsuarioRecargarComponent } from './usuario/usuariolist/usuario-recargar/usuario-recargar.component';
import { ReportesComponent } from './reportes/reportes.component';
import { VerFinancieroComponent } from './procesos/plan-negocio/plan-financiero/ver-financiero/ver-financiero.component';


const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },




  { path: 'clients', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'clients/page/:page', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'clients/form/businessman', component: FormClientComponent, canActivate: [AuthGuard] },
  { path: 'clients/form/entrepreneur', component: FormEntrepreneurComponent, canActivate: [AuthGuard] },
  { path: 'clients/form/editar/businessman/:id', component: FormClientComponent, canActivate: [AuthGuard] },
  { path: 'clients/form/editar/entrepreneur/:id', component: FormEntrepreneurComponent, canActivate: [AuthGuard] },

  
  { path: 'clients/form/editar/businessman/:id/:idEditar', component: FormClientComponent, canActivate: [AuthGuard] },
  { path: 'clients/form/editar/entrepreneur/:id/:idEditar', component: FormEntrepreneurComponent, canActivate: [AuthGuard] },

  { path: 'clients/registrar', component: RegistrarComponent , canActivate: [AuthGuard]},
  { path: 'autoevaluacion/cliente/:id', component: AutoevaluacionComponent, canActivate: [AuthGuard] },
  { path: 'clients/details/:id', component: DetallesComponent, canActivate: [AuthGuard] },
  { path: 'clients/action/:id', component: AccionComponent , canActivate: [AuthGuard]},
  { path: 'usuarios', component: UsuariolistComponent,  canActivate: [AuthGuard,AdminGuard] },
  { path: 'panel/:id', component: PanelComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/form', component: UsuarioformComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/form/:id', component: UsuarioformComponent , canActivate: [AuthGuard]},
  { path: 'municipios', component: MunicipioComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent , canActivate: [AuthGuard]},
  { path: 'calendario', component: CalendarioComponent , canActivate: [AuthGuard]},
  { path: 'asesorias', component: AsesoriaListComponent , canActivate: [AuthGuard]},
  { path: 'procesos', component: ProcesoListarComponent , canActivate: [AuthGuard]},
  { path: 'puntajeAutoevaluacion/cliente/:id', component: VerPuntajeComponent , canActivate: [AuthGuard]},

  //Modelo Canvas
  { path: 'segmento/cliente/:id', component: SegmentoComponent, canActivate: [AuthGuard] },
  { path: 'propuestaDeValor/cliente/:id', component: PropuestaDeValorComponent, canActivate: [AuthGuard] },
  { path: 'canales/cliente/:id', component: CanalesComponent , canActivate: [AuthGuard]},
  { path: 'relaciones/cliente/:id', component: RelacionesComponent , canActivate: [AuthGuard]},
  { path: 'recursosClaves/cliente/:id', component: RecursosClavesComponent, canActivate: [AuthGuard] },
  { path: 'actividadesClaves/cliente/:id', component: ActividadesClavesComponent, canActivate: [AuthGuard] },
  { path: 'sociosClaves/cliente/:id', component: SociosClavesComponent, canActivate: [AuthGuard] },
  { path: 'ingresos/cliente/:id', component: IngresosComponent, canActivate: [AuthGuard] },
  { path: 'estructuraCostos/cliente/:id', component: EstructuraCostosComponent, canActivate: [AuthGuard] },

  { path: 'procesos/ver/:id', component: VerProcesosComponent, canActivate: [AuthGuard] },


  //Plan de Negocios
  { path: 'informacion/cliente/:id', component: InformacionComponent, canActivate: [AuthGuard] },
  { path: 'interno/cliente/:id', component: InternoComponent, canActivate: [AuthGuard] },
  { path: 'dofa/cliente/:id', component: DofaComponent, canActivate: [AuthGuard] },
  { path: 'conclusion/cliente/:id', component: ConclusionComponent, canActivate: [AuthGuard] },
  { path: 'proceso/page/:page', component: ProcesoListarComponent , canActivate: [AuthGuard]},
  //Plan Financiero
  { path: 'ventas/cliente/:id', component: PresupuestoVentasComponent, canActivate: [AuthGuard] },
  { path: 'compras/cliente/:id', component: PresupuestoFormComponent, canActivate: [AuthGuard] },
  { path: 'gastos/cliente/:id', component: PresupuestoGastoComponent , canActivate: [AuthGuard]},
  { path: 'inversion/cliente/:id', component: PlanInversionComponent , canActivate: [AuthGuard]},


  // para editar
  // canvas
  { path: 'segmento/cliente/:id/editar/:idEditar', component: SegmentoComponent , canActivate: [AuthGuard]},
  { path: 'propuestaDeValor/cliente/:id/editar/:idEditar', component: PropuestaDeValorComponent, canActivate: [AuthGuard] },
  { path: 'canales/cliente/:id/editar/:idEditar', component: CanalesComponent, canActivate: [AuthGuard] },
  { path: 'relaciones/cliente/:id/editar/:idEditar', component: RelacionesComponent , canActivate: [AuthGuard]},
  { path: 'recursosClaves/cliente/:id/editar/:idEditar', component: RecursosClavesComponent, canActivate: [AuthGuard] },
  { path: 'actividadesClaves/cliente/:id/editar/:idEditar', component: ActividadesClavesComponent, canActivate: [AuthGuard] },
  { path: 'sociosClaves/cliente/:id/editar/:idEditar', component: SociosClavesComponent, canActivate: [AuthGuard] },
  { path: 'ingresos/cliente/:id/editar/:idEditar', component: IngresosComponent, canActivate: [AuthGuard] },
  { path: 'estructuraCostos/cliente/:id/editar/:idEditar', component: EstructuraCostosComponent, canActivate: [AuthGuard] },
  // plan basico
  { path: 'informacion/cliente/:id/editar/:idEditar', component: InformacionComponent , canActivate: [AuthGuard]},
  { path: 'interno/cliente/:id/editar/:idEditar', component: InternoComponent , canActivate: [AuthGuard]},
  { path: 'dofa/cliente/:id/editar/:idEditar', component: DofaComponent, canActivate: [AuthGuard] },
  { path: 'conclusion/cliente/:id/editar/:idEditar', component: ConclusionComponent, canActivate: [AuthGuard] },
  // plan financiero

  { path: 'ventas/cliente/:id/editar/:idEditar', component: PresupuestoVentasComponent, canActivate: [AuthGuard] },
  { path: 'compras/cliente/:id/editar/:idEditar', component: PresupuestoFormComponent , canActivate: [AuthGuard]},
  { path: 'gastos/cliente/:id/editar/:idEditar', component: PresupuestoGastoComponent , canActivate: [AuthGuard]},
  { path: 'inversion/cliente/:id/editar/:idEditar', component: PlanInversionComponent , canActivate: [AuthGuard]},

  // para ver
  // canvas
  { path: 'puntajeAutoevaluacion/ver/:idVer', component: VerPuntajeComponent, canActivate: [AuthGuard] },
  { path: 'procesos/verLienzo/:idVer', component: VerProcesosComponent, canActivate: [AuthGuard] },
  { path: 'segmento/cliente/:id/ver/:idVer', component: SegmentoComponent , canActivate: [AuthGuard]},
  { path: 'propuestaDeValor/cliente/:id/ver/:idVer', component: PropuestaDeValorComponent, canActivate: [AuthGuard] },
  { path: 'canales/cliente/:id/ver/:idVer', component: CanalesComponent , canActivate: [AuthGuard]},
  { path: 'relaciones/cliente/:id/ver/:idVer', component: RelacionesComponent , canActivate: [AuthGuard]},
  { path: 'recursosClaves/cliente/:id/ver/:idVer', component: RecursosClavesComponent, canActivate: [AuthGuard] },
  { path: 'actividadesClaves/cliente/:id/ver/:idVer', component: ActividadesClavesComponent, canActivate: [AuthGuard] },
  { path: 'sociosClaves/cliente/:id/ver/:idVer', component: SociosClavesComponent , canActivate: [AuthGuard]},
  { path: 'ingresos/cliente/:id/ver/:idVer', component: IngresosComponent , canActivate: [AuthGuard]},
  { path: 'estructuraCostos/cliente/:id/ver/:idVer', component: EstructuraCostosComponent , canActivate: [AuthGuard]},
  // plan basico

  { path: 'clients/:id/verBasico/:idVer1', component: ModeloListaComponent , canActivate: [AuthGuard]},

  { path: 'informacion/cliente/:id/ver/:idVer', component: InformacionComponent , canActivate: [AuthGuard]},
  { path: 'interno/cliente/:id/ver/:idVer', component: InternoComponent , canActivate: [AuthGuard]},
  { path: 'dofa/cliente/:id/ver/:idVer', component: DofaComponent , canActivate: [AuthGuard]},
  { path: 'conclusion/cliente/:id/ver/:idVer', component: ConclusionComponent, canActivate: [AuthGuard] },
  // plan financiero


  { path: 'ventas/cliente/:id/ver/:idVer', component: PresupuestoVentasComponent, canActivate: [AuthGuard] },
  { path: 'compras/cliente/:id/ver/:idVer', component: PresupuestoFormComponent, canActivate: [AuthGuard] },
  { path: 'gastos/cliente/:id/ver/:idVer', component: PresupuestoGastoComponent , canActivate: [AuthGuard]},
  { path: 'inversion/cliente/:id/ver/:idVer', component: PlanInversionComponent , canActivate: [AuthGuard]},
  // para ver
  { path: 'planFinancieroVer/:id/ver/:idVer1', component:VerFinancieroComponent , canActivate: [AuthGuard]},


  //Diagnostico Empresarial

  { path: 'empresario/diagnostico', component: DiagnosticoComponent, canActivate: [AuthGuard] },
  { path: 'empresario/diagnostico/cliente/:id', component: DiagnosticoComponent, canActivate: [AuthGuard] },
  { path: 'empresario/resultados', component: ResultadosComponent , canActivate: [AuthGuard]},
  { path: 'empresario/resultados/cliente/:id', component: ResultadosComponent , canActivate: [AuthGuard]},
  { path: 'empresario/economico', component: EconomicoComponent , canActivate: [AuthGuard]},
  { path: 'empresario/economico/cliente/:id', component: EconomicoComponent , canActivate: [AuthGuard]},
  { path: 'empresario/accion', component: PlanAccionComponent, canActivate: [AuthGuard] },
  { path: 'empresario/accion/cliente/:id', component: PlanAccionComponent, canActivate: [AuthGuard] },

  { path: 'diagnostico/empresario/:id/editar/:idEditar', component: DiagnosticoComponent },
  { path: 'resultados/empresario/:id/editar/:idEditar', component: ResultadosComponent },
  { path: 'economico/empresario/:id/editar/:idEditar', component: EconomicoComponent },
  



  //para editar
  //Plan de Accion
  { path: 'accion/empresario/:id/editar/:idEditar', component: PlanAccionComponent,canActivate: [AuthGuard] },

  //Para Ver
  { path: 'diagnostico/empresario/:id/ver/:idVer', component: DiagnosticoComponent,canActivate: [AuthGuard]  },
  { path: 'accion/empresario/:id/ver/:idVer', component: PlanAccionComponent,canActivate: [AuthGuard]  },
  { path: 'resultados/empresario/:id/ver/:idVer', component: ResultadosComponent,canActivate: [AuthGuard]  },
  { path: 'empresario/accion/cliente/:id/ver/:idVer', component: PlanAccionComponent,canActivate: [AuthGuard]  },
  //Mensajes
  { path: 'mensajes', component: MensajesComponent,canActivate: [AuthGuard] },

  //Calendario

  { path: 'calendario', component: CalendarioComponent,canActivate: [AuthGuard] },



  //recarga asesoria en asesoria
  { path: 'recarga', component: RecargaComponent,canActivate: [AuthGuard]  },
  { path: 'recarga/usuario', component: UsuarioRecargarComponent,canActivate: [AuthGuard]  },
  { path: 'reportes', component: ReportesComponent,canActivate: [AuthGuard]  },

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientComponent,

    MunicipioComponent,
    FormClientComponent,
    FormEntrepreneurComponent,
    RegistrarComponent,
    AutoevaluacionComponent,
    ClientDetailsComponent,
    AccionComponent,
    AsesoriaComponent,
    UsuariolistComponent,
    UsuarioformComponent,
    PaginatorComponent,
    LoginComponent,
    MainComponent,
    HeaderSuperiorComponent,


    AsesoriaListComponent,
    ProcesoListarComponent,
    AccionProcesosComponent,
    NuevoProcesoComponent,
    SegmentoComponent,
    PropuestaDeValorComponent,
    CanalesComponent,
    RelacionesComponent,
    RecursosClavesComponent,
    ActividadesClavesComponent,
    SociosClavesComponent,
    IngresosComponent,
    EstructuraCostosComponent,
    BannerComponent,
    VerProcesosComponent,
    SegmentoModalComponent,
    PropuestaDeValorModalComponent,
    CanalesModalComponent,
    RelacionesModalComponent,
    RecursosClavesModalComponent,
    ActividadesClavesModalComponent,
    SociosClavesModalComponent,
    IngresosModalComponent,
    EstructuraCostosModalComponent,

    InformacionComponent,
    InternoComponent,
    DofaComponent,
    ConclusionComponent,
    PaginacionComponent,
    PlanFinancieroComponent,
    FinancieroFormComponent,
    PresupuestoVentasComponent,
    PresupuestoFormComponent,
    PresupuestoGastoComponent,
    DetallesComponent,
    PlanInversionComponent,
    ModalDetallesComponent,
    VerPuntajeComponent,
    ModeloListaComponent,
    ProcesosEmpresariosComponent,
    DiagnosticoComponent,
    ResultadosComponent,
    EconomicoComponent,

    PlanAccionComponent,
    MensajesComponent,
    CalendarioComponent,

    PanelComponent,
    RecargaComponent,
    UsuarioRecargarComponent,
    ReportesComponent,
    VerFinancieroComponent,



  ],

  imports: [


  BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    FullCalendarModule,
    NgbModule,



  ],


  providers: [

    {provide: HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi: true},
    {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi: true}

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
