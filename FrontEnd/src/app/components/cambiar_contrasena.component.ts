import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.services';
import {GLOBAL} from '../services/global';

@Component({
	selector: 'cambiar_contrasena',
	templateUrl: '../views/cambiar_contrasena.html',	
})
export class CambiarContrasenaComponent{

	public message:string;
	public id:string;
	public contrasena:string;
	public confirm_contrasena:string

	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router:Router
		){
				
	}

	ngOnInit(){
		console.log('restaurar_contrasena.component.ts cargado');	

		this._route
	      .queryParams
	      .subscribe(params => {
	          this.id = params['id'];
	      });
	    console.log(this.id);
	}

	cambiarContrasena(){
		this._userService.cambiarContrasena(this.id,this.contrasena,this.confirm_contrasena).subscribe(
			result=>{			
				this.message = result.message;				
			},
			error =>{
				console.log(<any>error);
			}
		);
	}	
}