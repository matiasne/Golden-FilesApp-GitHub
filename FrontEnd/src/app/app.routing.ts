import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
//Componentes

import {HomeComponent} from './components/home.component';
import {ErrorComponent} from './components/error.component';
import {DocumentoFiltroComponent} from './components/documentos-filtro.component';
import {RegisterComponent} from './components/register.component';
import {ActivacionCompletaComponent} from './components/activacion_completa.component';
import {RestaurarContrasenaComponent} from './components/restaurar_contrasena.component';
import {CambiarContrasenaComponent} from './components/cambiar_contrasena.component';
import {AdministracionUserComponent} from './components/administracion_usuario.component';

const appRoutes:Routes = [

	{path:'', component:HomeComponent},
	{path:'home/:id_buque/:nro_viaje/:id_destino/:id_exportador/:id_contrato/:id_embarque/:id_lote', component:HomeComponent},
	{path:'home', component:HomeComponent},
	{path:'documentos', component:DocumentoFiltroComponent},
	{path:'register', component:RegisterComponent},
	{path:'activacion_completa', component: ActivacionCompletaComponent},
	{path:'restaurar_contrasena',component: RestaurarContrasenaComponent},
	{path:'cambiar_contrasena',component:CambiarContrasenaComponent},
	{path:'administracion',component:AdministracionUserComponent},
	{path:'**', component:ErrorComponent}

];

export const appRoutingProviders:any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);