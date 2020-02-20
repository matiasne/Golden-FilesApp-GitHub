import {Component} from '@angular/core';
import {LoginComponent} from './login.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../services/user.services';

@Component({
	selector: 'home',
	templateUrl: '../views/home.html',
	
})

export class HomeComponent{
	public titulo:string;

	constructor(
		public _route: ActivatedRoute,
		private _router:Router,
		private _userService: UserService,
	){
		this.titulo = 'Pagina Principal';
	}

	ngOnInit(){
		console.log('se ha cargado el componente home.component.ts');

		this._route.params.forEach((params: Params) => {
			
			//Cargo valores por defecto
			localStorage.setItem('id_buque', params['id_buque']);
			localStorage.setItem('nro_viaje', params['nro_viaje']);
			localStorage.setItem('id_destino', params['id_destino']);
			localStorage.setItem('id_exportador', params['id_exportador']);
			localStorage.setItem('id_contrato', params['id_contrato']);
			localStorage.setItem('id_embarque', params['id_embarque']);
			localStorage.setItem('id_lote', params['id_lote']);	
			  

			console.log("Parametros precargados: ")
			console.log("id_buque:"+localStorage.getItem('id_buque'));			
			
			console.log("nro_viaje:"+localStorage.getItem('nro_viaje'));		
			console.log("id_destino:"+localStorage.getItem('id_destino'));		

			console.log("id_exportador:"+localStorage.getItem('id_exportador'));
				
			console.log("id_contrato:"+localStorage.getItem('id_contrato'));
				
			console.log("id_embarque:"+localStorage.getItem('id_embarque'));
				
			console.log("id_lote:"+localStorage.getItem('id_lote'));
			
		
		})

		this._userService.obtenerDatosUsuario().subscribe(
			result=>{			
				if(result.code == "200"){
										
				
					console.log(result);			
					this._userService.actualUser.nombre = result.data.nombre;
					this._userService.actualUser.permiso = result.data.permiso;
					this._userService.actualUser.activo = result.data.activo;
					this._userService.actualUser.admin = result.data.admin;
					this._router.navigate(['documentos']);											
				}
			},
			error =>{
				
			}
		);
	}
}