import { BrowserModule } from '@angular/platform-browser';//necesario para cualquier app, es para renderizarse en
//el navegador, propio de angular
import { NgModule } from '@angular/core';//modulo de angular, es un conjunto código dedicado a un ámbito concreto
//de la aplicación
import { FormsModule } from '@angular/forms';//Exporta los proveedores y las directivas requeridas para formularios
//controlados por plantilla

//nuestros componentes
import { AppComponent } from './app.component';//el principal
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentComponent } from './components/document/document.component';

//importamos nuestro modulo de socket y configuración del mismo.
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

//variable que tendrá la configuración del socket, en este caso url del servidor...
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

//nuestro decorador que recibe un objeto de metadatos que definen el módulo
@NgModule({
  //las vistas que pertenecen al módulo
  declarations: [
    AppComponent,
    DocumentListComponent,
    DocumentComponent
  ],
  //otros modulos de angular que son requeridas para este módulo
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  //los servicios que necesita este modulo, y que estarán disponibles para toda la aplicación
  providers: [],
  //define la vista raíz, utilizado solo por el root module (modulo raíz)
  bootstrap: [AppComponent]
})

export class AppModule { }
