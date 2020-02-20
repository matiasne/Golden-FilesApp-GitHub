import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';

import {UserService} from '../services/user.services';
import {LoaderService } from '../services/loader.services';
import {User} from '../models/user';
import {GLOBAL} from '../services/global';

@Component({
	selector: 'administracion_usuario',
	templateUrl: '../views/administracion_usuario.html',	
	animations: [fadeInOutAnimation]	
})
export class AdministracionUserComponent{

	public searchUser:User;
	public message:string;
	public email:string;

	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router:Router,
		private loaderService: LoaderService
		){
		this.searchUser = new User("","",false,false,false); //Cuidado siempre me olvido de iniciar el objeto				
	}

	ngOnInit(){
		console.log('administracion_usuario.component.ts cargado');
		this.loaderService.displayLoader(false); // enable spinner	
	}

	buscarUsuario(){
		
		this._userService.buscarUsuario(this.email).subscribe(
			result=>{				
				
				if(result.status == "error"){
					this.message = result.message;					
				}
				else{
					console.log(result.data);
					this.searchUser = result.data;				
				}
			},
			error =>{
				console.log(<any>error);
			}
		);
	}

	setActivo(){
		if(this.searchUser.activo)
			this.searchUser.activo = false;
		else
			this.searchUser.activo = true;
	}

	setPermiso(){
		if(this.searchUser.permiso)
			this.searchUser.permiso = false;
		else
			this.searchUser.permiso = true;
	}

	setAdministrador(){
		if(this.searchUser.admin)
			this.searchUser.admin = false;
		else
			this.searchUser.admin = true;
	}

	guardarCambios(){
		this._userService.actualizarPermisos(this.searchUser.email,this.searchUser.activo,this.searchUser.permiso,this.searchUser.admin).subscribe(
			result=>{			
				this.message = result.message;				
			},
			error =>{
				console.log(error);
			}
		);
	}
}