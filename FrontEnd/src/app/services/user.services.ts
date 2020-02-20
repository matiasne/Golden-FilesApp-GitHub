import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {GLOBAL} from './global';

@Injectable()
export class UserService{

	public url:string;
	public actualUser:User;

	constructor(
		public _http:Http
		){
		this.url = GLOBAL.url;	
		this.actualUser = new User("","",false,false,false);	
	}

	login(usuario,password,recordar){
		let params = 'usuario='+usuario+'&password='+password;
		console.log(params);
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});

		return this._http.post(this.url+'login.php', params, {headers: headers})
						 .map(res => 
						 	res.json()
						 	
						 );
	}	


	obtenerDatosUsuario(){
		let params = 'token='+localStorage.getItem('token');
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});
		return this._http.post(this.url+'user.init.php', params, {headers: headers})
						 .map(res => 
						 	res.json()
						 	
						 );
	}	

	logout(){
		localStorage.setItem('token','0');
	}

	signup(usuario,email,password,confirm_password){
		let params = 'usuario='+usuario+'&password='+password+'&email='+email+'&confirm_password='+confirm_password;
		console.log(params);
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});

		return this._http.post(this.url+'signup.php', params, {headers: headers})
						 .map(res => res.json());
	}

	restaurarContrasena(email){
		let params = 'email='+email;
		console.log(params);
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});
		return this._http.post(this.url+'restaurarContrasena.php', params, {headers: headers})
						 .map(res => res.json());
	}

	cambiarContrasena(id,password,confirm_password){
		let params = 'id='+id+'&password='+password+'&confirm_password='+confirm_password;
		console.log(params);
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});
		return this._http.post(this.url+'cambiarContrasena.php', params, {headers: headers})
						 .map(res => res.json());
	}

	buscarUsuario(email){
		let params = 'email='+email;
		console.log(params);
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});
		return this._http.post(this.url+'busquedaUsuarioByMail.php', params, {headers: headers})
						 .map(res => res.json());
	}

	actualizarPermisos(email,activo,permiso,admin){
		let params = 'email='+email+'&activo='+activo+'&permiso='+permiso+'&admin='+admin;
		console.log(params);
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});
		return this._http.post(this.url+'updatePermisosUser.php', params, {headers: headers})
						 .map(res => res.json());
	}

	/*getPermisos(email){
		let params = 'email='+email;
		console.log(params);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+'isUserAdmin.php', params, {headers: headers})
						 .map(res => res.json());
	}*/

	
}