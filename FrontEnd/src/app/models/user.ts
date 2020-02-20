export class User{
	constructor(
		public nombre:string,
		public email:string,
		public activo:boolean,
		public permiso:boolean,
		public admin:boolean,
		){
	}
}