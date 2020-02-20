import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.services';
import {DocumentoService} from '../services/documento.services';
import {Documento} from '../models/documento';
import {GLOBAL} from '../services/global';
import {User} from '../models/user';

import {LoaderService } from '../services/loader.services';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';

import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';

@Component({
	selector: 'documentos-filtro',
	templateUrl: '../views/documentos-filtro.html',
	
	animations: [fadeInOutAnimation] 
})
export class DocumentoFiltroComponent{

	public titulo:string;
	public message:string;

	public selected_buque_id:string = "null";
	public selected_viaje_nro:string = "null";
	public selected_destino_id:string = "null";
	public selected_exportador_id:string = "null";
	public selected_contrato_id:string= "null";
	public selected_embarque_id:string="null";
	public selected_lote_id:string="null";

	public buques:string[];
	public viajes:string[];
	public destinos:string[];
	public exportadores:string[];
	public contratos:string[];
	public embarques:string[];
	public lotes:string[];

	public categoria_tipo_documentos:string[];
	public categoria_contrato_documentos:string[];
	public categoria_embarque_documentos:string[];
	
	public documentos:Documento[];

	public usuarioAdmin:boolean;

	public actualUser:User;



	constructor(
		private _documentoService: DocumentoService,
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router:Router,
		private loaderService: LoaderService
		){		
			
	}

	ngOnInit(){

		console.log('documentos-filtro.component.ts cargado');	

		this.actualUser = this._userService.actualUser;

		console.log(this.actualUser);
		
		this._documentoService.getBuques().subscribe(
			result=>{
				if(result)
				this.buques = result.data;
				console.log(result.data);
			},
			error =>{
				console.log(<any>error);
			}
		);	

		console.log("Parametros precargados: ")
		if(localStorage.getItem('id_buque')!= 'undefined'){
			
			this.selected_buque_id = localStorage.getItem('id_buque');
			console.log("id_buque:"+this.selected_buque_id);
			this.onChangeBuques();
		}	

		if(localStorage.getItem('nro_viaje')!= 'undefined'){
			
			this.selected_viaje_nro = localStorage.getItem('nro_viaje');
			console.log("nro_viaje:"+this.selected_viaje_nro);
			this.onChangeViajes();
		}

		if(localStorage.getItem('id_destino')!= 'undefined'){
			
			this.selected_destino_id = localStorage.getItem('id_destino');
			console.log("id_destino:"+this.selected_destino_id);
			this.onChangeDestinos();
		}

		if(localStorage.getItem('id_exportador')!= 'undefined'){
			this.selected_exportador_id = localStorage.getItem('id_exportador');
			console.log("id_exportador:"+this.selected_exportador_id);
			this.onChangeExportadores();
		}

		if(localStorage.getItem('id_contrato')!= 'undefined'){
			this.selected_contrato_id = localStorage.getItem('id_contrato');
			console.log("id_contrato:"+this.selected_contrato_id);
			this.onChangeContratos();
		}

		if(localStorage.getItem('id_embarque')!= 'undefined'){
			this.selected_embarque_id = localStorage.getItem('id_embarque');
			console.log("id_embarque:"+this.selected_embarque_id);
			this.onChangeEmbarques();
		}

		/*if(localStorage.getItem('id_lote')!= 'undefined'){
			this.selected_lote_id = localStorage.getItem('id_lote');
			console.log("id_lote:"+this.selected_lote_id);
			this.onChangeLotes();
		}*/

		
		
		
		
	}

	onChangeBuques(){    	

    	this.viajes = [];
    	this.destinos = [];
    	this.exportadores = [];
    	this.contratos = [];
    	this.embarques =[];
    	this.documentos =[];

		this.loaderService.displayLoader(true);

		console.log(this.selected_buque_id);
		
		
    	this._documentoService.getViajes(this.selected_buque_id).subscribe(
			result=>{
				console.log(result.data);
				this.viajes = result.data;
				this.loaderService.displayLoader(false);	
			},
			error =>{
				console.log(<any>error);
				this.viajes = [];
				this.loaderService.displayLoader(false);					
			}
		);
	}

	onChangeViajes(){

    	this.destinos = [];
    	this.exportadores = [];
    	this.contratos = [];
    	this.embarques =[];
    	this.documentos =[];

		this.loaderService.displayLoader(true);	    	
    	this._documentoService.getDestinos(this.selected_buque_id,this.selected_viaje_nro).subscribe(
			result=>{
				console.log(result.data);
				this.destinos = result.data;
				this.loaderService.displayLoader(false);				
			},
			error =>{
				this.destinos = [];
				this.loaderService.displayLoader(false);					
			}
		);

		this.loaderService.displayLoader(true);	    	
    	this._documentoService.getExportadores(this.selected_buque_id,this.selected_viaje_nro).subscribe(
			result=>{
				console.log(result.data);
				this.exportadores = result.data;
				this.loaderService.displayLoader(false);				
			},
			error =>{
				this.exportadores = [];
				this.loaderService.displayLoader(false);					
			}
		);
	}

	onChangeDestinos(){

    	this.exportadores = [];
    	this.contratos = [];
    	this.embarques =[];
    	this.documentos =[];

		this.loaderService.displayLoader(true);	    	
    	this._documentoService.getExportadores(this.selected_buque_id,this.selected_viaje_nro).subscribe(
			result=>{
				console.log(result.data);
				this.exportadores = result.data;
				this.loaderService.displayLoader(false);				
			},
			error =>{
				this.exportadores = [];
				this.loaderService.displayLoader(false);					
			}
		);

    	this.mostrarContratos();
		this.mostrarDocumentos();
	}

	onChangeExportadores(){

    	this.contratos = [];
    	this.embarques =[];
    	this.documentos =[];

		
    	this.mostrarContratos();
		this.mostrarDocumentos();
	}

	mostrarContratos(){

		this.loaderService.displayLoader(true);	    	
    	this._documentoService.getContratos(this.selected_buque_id,this.selected_viaje_nro,this.selected_exportador_id).subscribe(
			result=>{
				console.log(result.data);
				this.contratos = result.data;
				this.loaderService.displayLoader(false);				
			},
			error =>{
				console.log(error.data);
				this.contratos = [];
				this.loaderService.displayLoader(false);					
			}
		);
	}

	onChangeContratos(){

    	this.embarques =[];
    	this.documentos =[];

		this.loaderService.displayLoader(true);	    	
		
		this._documentoService.getEmbarques(this.selected_buque_id,this.selected_viaje_nro,this.selected_exportador_id,this.selected_contrato_id).subscribe(
			result=>{
				console.log(result.data);
				this.embarques = result.data;
				this.loaderService.displayLoader(false);				
			},
			error =>{
				this.embarques = [];
				this.loaderService.displayLoader(false);					
			}
		);

		this.mostrarDocumentos();
	}  
	

	onChangeEmbarques() {
		
		console.log("Cambio Embarques");
    	this.documentos =[];
		this.loaderService.displayLoader(true);	    	
    	this._documentoService.getLotes(this.selected_contrato_id,this.selected_embarque_id).subscribe(
			result=>{
				console.log(result.data);
				this.lotes = result.data;
				this.loaderService.displayLoader(false);				
			},
			error =>{
				console.log(error);
				this.lotes = [];
				this.loaderService.displayLoader(false);					
			}
		);
		
		this.mostrarDocumentos();
	}
	
	onChangeLotes() {	    
	    this.mostrarDocumentos();
	}


	mostrarDocumentos(){
		
		
		console.log("antes: "+this.documentos);

		this._documentoService.getDocumentos(
				this.selected_buque_id,
				this.selected_viaje_nro,
				this.selected_destino_id,
				this.selected_embarque_id,
				this.selected_exportador_id,
				this.selected_contrato_id,
				this.selected_lote_id
				).subscribe(
			result=>{

				console.log(result.data);

				this.obtenerCategorias(result.data);
				this.documentos = result.data;
				

				this.documentos.forEach(function(doc){						
					var nombre = doc.DS_RUTA.substr(doc.DS_RUTA.length - 20); // => "Tabs1"
					doc['nombre'] = nombre;
				});

				


			},
			error =>{
				this.documentos = [];
				this.categoria_tipo_documentos = [];
				this.categoria_contrato_documentos = [];
				this.categoria_embarque_documentos = [];
			}
		);
	}

	//Obtengo las diferentes categorias existentes en el array de objetos
	obtenerCategorias(data){
		

		//Obtiene los tipos de documentos 
		this.categoria_tipo_documentos = [];
		var result = data.map(function(a) {return a.DC_TIPO_DOC;});
		
		var n = []; 
		for(var i = 0; i < result.length; i++) 
		{
			if (n.indexOf(result[i]) == -1) n.push(result[i]);
		}
		this.categoria_tipo_documentos = n;
		//console.log(this.categoria_tipo_documentos);

		this.categoria_contrato_documentos = [];
		var result = data.map(function(a) {return a.ID_CONTRATO_TERCERO;});
		
		var n = []; 
		for(var i = 0; i < result.length; i++) 
		{
			if (n.indexOf(result[i]) == -1) n.push(result[i]);
		}
		this.categoria_contrato_documentos = n;
		//console.log(this.categoria_tipo_documentos);


		this.categoria_embarque_documentos = [];
		var result = data.map(function(a) {return a.NO_EMBARQUE_SIM;});
		
		var n = []; 
		for(var i = 0; i < result.length; i++) 
		{
			if (n.indexOf(result[i]) == -1) n.push(result[i]);
		}
		this.categoria_embarque_documentos = n;
		//console.log(this.categoria_tipo_documentos);
	}

	descargarArchivo(file){
		window.open(file);
	}

	descargarTodos(){

		var zip = new JSZip();
		this.loaderService.displayLoader(true);	

		for(var i = 0; i < this.documentos.length; i++) 
		{
			zip.file(this.documentos[i].nombre, this.urlToPromise(this.documentos[i].DS_RUTA), {binary:true});
		}

		zip.generateAsync({type:"blob"})
				.then(function(content) {
					// see FileSaver.js
					
					saveAs(content, "files.zip");
				});

		this.loaderService.displayLoader(false);	
		
				
	}


	urlToPromise(url) {
		return new Promise(function(resolve, reject) {
			JSZipUtils.getBinaryContent(url, function (err, data) {
				if(err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}

	agregarZip(zip,data,i){

		

		
			
		
	}

	logOut(){

	  	this._userService.logout();
		this._router.navigate(['home']);
	 }

	 gotoAdmin(){
	 	this._router.navigate(['administracion']);
	 }
}