import {Component} from '@angular/core';

@Component({
	selector: 'activacion_completa',
	templateUrl: '../views/activacion_completa.html'
})

export class ActivacionCompletaComponent{
	public titulo:string;

	contructor(){
		
	}

	ngOnInit(){
		console.log('Componente activacion_completa.component.ts cargado');
	}
}