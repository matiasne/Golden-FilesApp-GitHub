import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';

import {UserService} from '../services/user.services';
import {LoaderService } from '../services/loader.services';
import {GLOBAL} from '../services/global';

@Component({
	selector: 'login',
	templateUrl: '../views/login.html',	
	animations: [fadeInOutAnimation]	
})
export class LoginComponent{

	public message:string;
	public nombre:string;
	public contrasena:string;

	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router:Router,
		private loaderService: LoaderService
		){
				
	}

	ngOnInit(){
		console.log('login.component.ts cargado');
		this.loaderService.displayLoader(false); 
	}

	login(){
		
		this._userService.login(this.nombre,this.contrasena,true).subscribe(
			result=>{			
							
				if(result.code == "204"){
					this.message = result.data;					
				}
				else{
					
					localStorage.setItem('token',result.data);
					this._router.navigate(['documentos']);
					this.obtenerDatosUsuario();											
				}
			},
			error =>{
				this.message = "error";
				console.log(<any>error);
			}
		);
	}

	obtenerDatosUsuario(){
		this._userService.obtenerDatosUsuario().subscribe(
			result=>{			
				if(result.code == "204"){
					this.message = result.message;					
				}
				else{		
					console.log(result);			
					this._userService.actualUser.nombre = result.data.nombre;
					this._userService.actualUser.permiso = result.data.permiso;
					this._userService.actualUser.activo = result.data.activo;
					this._userService.actualUser.admin = result.data.admin;											
				}
			},
			error =>{
				this.message = "error";
				console.log(<any>error);
			}
		);
	}
}