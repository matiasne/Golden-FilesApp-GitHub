import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Documento} from '../models/documento';
import {GLOBAL} from './global';

@Injectable()
export class DocumentoService{

	public url:string;

	constructor(
		public _http:Http
		){
		this.url = GLOBAL.url;
	}

	getDocumentos(id_buque,nro_viaje,id_destino,id_embarque,id_entidad,id_contrato,id_lote){		
		
		let params = 
			'id_buque='+id_buque+
			'&nro_viaje='+nro_viaje+
			'&id_destino='+id_destino+
			'&id_embarque='+id_embarque+
			'&id_entidad='+id_entidad+
			'&id_contrato='+id_contrato+
			'&id_lote='+id_lote;

		console.log(params);
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});

		return this._http.post(this.url+'consultas/documentos.php', params, {headers: headers})
						 .map(res => res.json());
	}

	getBuques(){
		

		let params = '';
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});

		return this._http.post(this.url+'consultas/buques.php', params, {headers: headers})
						 .map(res => res.json());
	}

	getViajes(id_buque){
		let params = 'id_buque='+id_buque;
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});

		return this._http.post(this.url+'consultas/viajes.php', params, {headers: headers})
						 .map(res => res.json());
	}

	getDestinos(id_buque,nro_viaje){
		let params = 'id_buque='+id_buque+'&nro_viaje='+nro_viaje;
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});

		return this._http.post(this.url+'consultas/destinos.php', params, {headers: headers})
						 .map(res => res.json());
	}

	getExportadores(id_buque,nro_viaje){
		let params = 'id_buque='+id_buque+'&nro_viaje='+nro_viaje;
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});

		return this._http.post(this.url+'consultas/exportadores.php', params, {headers: headers})
						 .map(res => res.json());
	}	

	getContratos(id_buque,nro_viaje,id_entidad){	
		
		let params = 'id_buque='+id_buque+'&nro_viaje='+nro_viaje+'&id_entidad='+id_entidad;
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});

		return this._http.post(this.url+'consultas/contratos.php', params, {headers: headers})
						 .map(res => res.json());
	}

	getEmbarques(id_buque,nro_viaje,id_entidad,id_contrato){

		let params = 'id_buque='+id_buque+'&nro_viaje='+nro_viaje+'&id_entidad='+id_entidad+'&id_contrato='+id_contrato;
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});

		return this._http.post(this.url+'consultas/embarques.php', params, {headers: headers})
						 .map(res => res.json());
	}

	getLotes(id_contrato,id_embarque){

		let params = 'id_embarque='+id_embarque+'&id_contrato='+id_contrato;
		let headers = new Headers({
			'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});

		return this._http.post(this.url+'consultas/lotes.php', params, {headers: headers})
						 .map(res => res.json());
	}

	
}
