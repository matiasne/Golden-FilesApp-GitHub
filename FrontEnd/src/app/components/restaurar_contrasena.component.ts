import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { trigger, style, transition, animate, group } from '@angular/animations';

import {UserService} from '../services/user.services';
import {User} from '../models/user';
import {GLOBAL} from '../services/global';

@Component({
	selector: 'restaurar_contrasena',
	templateUrl: '../views/restaurar_contrasena.html',
	
	animations: [
	trigger('itemAnim', [
	    transition(':enter', [
	      style({
	      		opacity: 0,
	      		transform: 'translateY(-10%)'
	      }),
	      animate(350)
	    ]),
	    transition(':leave', [
	      style({
	      		transform: 'translateY(10%)'
	      }),
	      animate(350)
	    ])
	  ])
	] 
})
export class RestaurarContrasenaComponent{

	public restaurarUser:User;
	public message:string;

	public email:string;

	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router:Router
		){
				
	}

	ngOnInit(){
		console.log('restaurar_contrasena.component.ts cargado');	
	}

	restaurarContrasena(){
		this._userService.restaurarContrasena(this.email).subscribe(
			result=>{			
				this.message = result.message;				
			},
			error =>{
				console.log(<any>error);
			}
		);
	}	
}