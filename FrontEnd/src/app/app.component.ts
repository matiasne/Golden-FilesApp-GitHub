import { Component } from '@angular/core';
import {GLOBAL} from './services/global';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {DocumentoService} from './services/documento.services';
import { LoaderService } from './services/loader.services';
import {UserService} from './services/user.services';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { LoaderFadeInOutAnimation } from './animations/loaderFadeInOut.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    LoaderService,
    UserService,
    DocumentoService
  ],
  animations: [LoaderFadeInOutAnimation],
})
export class AppComponent {

  public title = 'Documentos';
  public headerColor:string;
  public objLoaderStatus: boolean;

  constructor(
  		private _route: ActivatedRoute,
		  private _router:Router,
      private loaderService: LoaderService
  	){

  	this.headerColor = GLOBAL.header_color;
  }

  ngOnInit() {
        this.loaderService.loaderStatus.subscribe((val: boolean) => {
            console.log("Loader mostrando: "+val);
            this.objLoaderStatus = val;
        }); 
    }

  
}
