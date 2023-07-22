import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientComponent } from './client/client.component';

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

import { CalendarioComponent } from './calendario/calendario.component';
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
import { ModeloBasicoComponent } from './modelo-basico/modelo-basico.component';
import { ModeloListaComponent } from './modelo-basico/modelo-lista/modelo-lista.component';
import { ModeloFormComponent } from './modelo-basico/modelo-form/modelo-form.component';




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

const routes:Routes=[

  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'clients', component:ClientComponent},
  {path:'clients/page/:page', component:ClientComponent},
  {path:'clients/form/businessman', component:FormClientComponent},
  {path:'clients/form/entrepreneur', component:FormEntrepreneurComponent},
  {path:'clients/form/editar/businessman/:id', component:FormClientComponent},
  {path:'clients/form/editar/entrepreneur/:id', component:FormEntrepreneurComponent},
  {path:'clients/registrar', component:RegistrarComponent},
  {path:'autoevaluacion/cliente/:id', component:AutoevaluacionComponent},
  {path:'clients/details/:id', component:DetallesComponent},
  {path:'clients/action/:id', component:AccionComponent},
  {path:'usuarios', component:UsuariolistComponent},
  {path:'usuarios/form', component:UsuarioformComponent},
  {path:'usuarios/form/:id', component:UsuarioformComponent},
  {path:'municipios', component:MunicipioComponent},
  {path:'login',component:LoginComponent},
  {path:'main',component:MainComponent},
  {path:'calendario',component:CalendarioComponent},
  {path:'asesorias',component:AsesoriaListComponent},
  {path:'procesos',component:ProcesoListarComponent},
  {path:'segmento/cliente/:id',component:SegmentoComponent},
  {path:'propuestaDeValor/cliente/:id',component:PropuestaDeValorComponent},
  {path:'canales/cliente/:id',component:CanalesComponent},
  {path:'relaciones/cliente/:id',component:RelacionesComponent},
  {path:'recursosClaves/cliente/:id',component:RecursosClavesComponent},
  {path:'actividadesClaves/cliente/:id',component:ActividadesClavesComponent},
  {path:'sociosClaves/cliente/:id',component:SociosClavesComponent},
  {path:'ingresos/cliente/:id',component:IngresosComponent},
  {path:'estructuraCostos/cliente/:id',component:EstructuraCostosComponent},
  {path:'procesos/ver/:id',component:VerProcesosComponent},
  {path:'informacion/cliente/:id',component:InformacionComponent},
  {path:'interno/cliente/:id',component:InternoComponent},
  {path:'dofa/cliente/:id',component:DofaComponent},
  {path:'conclusion/cliente/:id',component:ConclusionComponent},
  {path:'proceso/page/:page',component:ProcesoListarComponent},
  //Plan Financiero
  {path:'ventas/cliente/:id',component:PresupuestoVentasComponent},
  {path:'compras/cliente/:id',component:PresupuestoFormComponent},
  {path:'gastos/cliente/:id',component:PresupuestoGastoComponent},
  {path:'inversion/cliente/:id',component:PlanInversionComponent},
  // para editar
  // canvas
  {path:'segmento/cliente/:id/editar/:idEditar',component:SegmentoComponent},
  {path:'propuestaDeValor/cliente/:id/editar/:idEditar',component:PropuestaDeValorComponent},
  {path:'canales/cliente/:id/editar/:idEditar',component:CanalesComponent},
  {path:'relaciones/cliente/:id/editar/:idEditar',component:RelacionesComponent},
  {path:'recursosClaves/cliente/:id/editar/:idEditar',component:RecursosClavesComponent},
  {path:'actividadesClaves/cliente/:id/editar/:idEditar',component:ActividadesClavesComponent},
  {path:'sociosClaves/cliente/:id/editar/:idEditar',component:SociosClavesComponent},
  {path:'ingresos/cliente/:id/editar/:idEditar',component:IngresosComponent},
  {path:'estructuraCostos/cliente/:id/editar/:idEditar',component:EstructuraCostosComponent},
// plan basico
  {path:'informacion/cliente/:id/editar/:idEditar',component:InformacionComponent},
  {path:'interno/cliente/:id/editar/:idEditar',component:InternoComponent},
  {path:'dofa/cliente/:id/editar/:idEditar',component:DofaComponent},
  {path:'conclusion/cliente/:id/editar/:idEditar',component:ConclusionComponent},
// plan financiero

  {path:'ventas/cliente/:id/editar/:idEditar',component:PresupuestoVentasComponent},
  {path:'compras/cliente/:id/editar/:idEditar',component:PresupuestoFormComponent},
  {path:'gastos/cliente/:id/editar/:idEditar',component:PresupuestoGastoComponent},
  {path:'inversion/cliente/:id/editar/:idEditar',component:PlanInversionComponent},
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

      CalendarioComponent,
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
      ModeloBasicoComponent,
      ModeloListaComponent,
      ModeloFormComponent,
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



   ],
  imports: [
  BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
