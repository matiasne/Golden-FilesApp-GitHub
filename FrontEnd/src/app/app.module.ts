import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Rutas

import {routing, appRoutingProviders} from './app.routing';

//Componentes

import {AppComponent } from './app.component';
import {HomeComponent} from './components/home.component';
import {ErrorComponent} from './components/error.component';
import {DocumentoFiltroComponent} from './components/documentos-filtro.component';
import {LoginComponent} from './components/login.component';
import {RegisterComponent} from './components/register.component';
import {ActivacionCompletaComponent} from './components/activacion_completa.component';
import {RestaurarContrasenaComponent} from './components/restaurar_contrasena.component';
import {CambiarContrasenaComponent} from './components/cambiar_contrasena.component';
import {AdministracionUserComponent} from './components/administracion_usuario.component';

import { LoaderService } from './services/loader.services';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    DocumentoFiltroComponent,
    ActivacionCompletaComponent,
    CambiarContrasenaComponent,
    RestaurarContrasenaComponent,
    AdministracionUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
