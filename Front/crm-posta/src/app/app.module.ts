import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';




import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientComponent } from './client/client.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { MunicipioComponent } from './municipio/municipio.component';
import { FormClientComponent } from './client/form-client/form-client.component';
import { FormEntrepreneurComponent } from './client/form-entrepreneur/form-entrepreneur.component';
import { RegistrarComponent } from './client/registrar/registrar.component';
import { AutoevaluacionComponent } from './client/autoevaluacion/autoevaluacion.component';
import { ClientDetailsComponent } from './client/client-details/client-details.component';
<<<<<<< HEAD
import { UsuariolistComponent } from './usuario/usuariolist/usuariolist.component';
import { UsuarioformComponent } from './usuario/usuarioform/usuarioform.component';
=======
import { PaginatorComponent } from './paginator/paginator.component';
>>>>>>> 5271719ffb2afee28a17e590bed1f3186d00e3a5


const routes:Routes=[
  {path:'', redirectTo:'/clients', pathMatch:'full'},
  {path:'clients', component:ClientComponent},
  {path:'clients/page/:page', component:ClientComponent},
  {path:'clients/form/businessman', component:FormClientComponent},
  {path:'clients/form/entrepreneur', component:FormEntrepreneurComponent},
  {path:'clients/registrar', component:RegistrarComponent},
  {path:'clients/autoevaluacion', component:AutoevaluacionComponent},
  {path:'clients/details/:id', component:ClientDetailsComponent},
  {path:'usuarios', component:UsuariolistComponent},

  {path:'usuarios/form', component:UsuarioformComponent},
  {path:'usuarios/form/:id', component:UsuarioformComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientComponent,
    UserComponent,
    MunicipioComponent,
    FormClientComponent,
    FormEntrepreneurComponent,
    RegistrarComponent,
    AutoevaluacionComponent,
    ClientDetailsComponent,
<<<<<<< HEAD
    UsuariolistComponent,
    UsuarioformComponent
=======
    PaginatorComponent
>>>>>>> 5271719ffb2afee28a17e590bed1f3186d00e3a5
  ],
  imports: [
  BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
