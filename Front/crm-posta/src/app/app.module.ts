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
import { AutoevaluacionComponent } from './client/autoevaluacion/autoevaluacion.component';
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

const routes:Routes=[

  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'clients', component:ClientComponent},
  {path:'clients/page/:page', component:ClientComponent},
  {path:'clients/form/businessman', component:FormClientComponent},
  {path:'clients/form/entrepreneur', component:FormEntrepreneurComponent},
  {path:'clients/form/editar/businessman/:id', component:FormClientComponent},
  {path:'clients/form/editar/entrepreneur/:id', component:FormEntrepreneurComponent},
  {path:'clients/registrar', component:RegistrarComponent},
  {path:'clients/autoevaluacion', component:AutoevaluacionComponent},
  {path:'clients/details/:id', component:ClientDetailsComponent},
  {path:'clients/action/:id', component:AccionComponent},
  {path:'usuarios', component:UsuariolistComponent},
  {path:'usuarios/form', component:UsuarioformComponent},
  {path:'usuarios/form/:id', component:UsuarioformComponent},
  {path:'municipios', component:MunicipioComponent},
  {path:'login',component:LoginComponent},
  {path:'main',component:MainComponent},
  {path:'calendario',component:CalendarioComponent},
  {path:'asesorias',component:AsesoriaListComponent},

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

      PdfComponent,
      CalendarioComponent,
      AsesoriaListComponent,


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
