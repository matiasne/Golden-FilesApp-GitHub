import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';

import {UserService} from '../services/user.services';
import {LoaderService } from '../services/loader.services';
import {GLOBAL} from '../services/global';

@Component({
	selector: 'register',
	templateUrl: '../views/register.html',
	
	animations: [fadeInOutAnimation],
})
export class RegisterComponent{

	public message:string;

	public nombre:string;
	public email:string;
	public contrasena:string;
	public confirm_contrasena:string;

	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router:Router,
		private loaderService: LoaderService
		){
					
	}

	ngOnInit(){
		console.log('register.component.ts cargado');	
		this.loaderService.displayLoader(false);		
	}

	signup(){            
		this.loaderService.displayLoader(true);
		this._userService.signup(this.nombre,this.email,this.contrasena,this.confirm_contrasena).subscribe(
			result=>{				
				
				if(result.status == "error"){
					this.message = result.message;
				}
				else{
					alert("Para terminar el registro de su usuario verifique su casilla de correo haciendo click en el enlace que acabamos de enviarle");
					this._router.navigate(['/']);
				}
				this.loaderService.displayLoader(false);
			},
			error =>{
				console.log(<any>error);
				this.loaderService.displayLoader(false);
			}
			
		);
		//this.loaderService.displayLoader(false); // enable spinner
	}	
}