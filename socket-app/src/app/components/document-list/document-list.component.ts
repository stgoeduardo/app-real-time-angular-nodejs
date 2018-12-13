//importamos el módulo para componentes(son los bloques básicos de construcción de las páginas web en angular), 
//Clase OnInit: Es el primer método que se ejecuta después de lanzar el constructor de la clase del componente, y 
//Clase OnDestroy: Se ejecuta justo antes de eliminar la instancia de nu componente
import { Component, OnInit, OnDestroy } from '@angular/core';
//importamos la clase observable y un objeto tipo subscription para suscribirse a nuestro observable
//Observable: Ofrece beneficios significativos sobre otras técnicas para el manejo de eventos, la programación
//asíncrona y el manejo de múltiples valores
import { Observable, Subscription } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';//importamos nuestro servicio
//declarampos la función @component para recibir un objeto componente, teniendo como principales 3 opciones de
//configuración:
@Component({
  //selector: un selector css que le dice a Angular que cree e inserte una instancia de este componente donde 
  //encuentre la etiqueta correspondiente en la plantilla HTML
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',//templateUrl: básicamente la ruta en donde está la plantilla HTML de este componente
  styleUrls: ['./document-list.component.scss']//styleUrls: las rutas de los estilos de este componente
})
//implementamos nuestras interfaces OnInit y OnDestroy
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Observable<string[]>;//secuencia de TODOS los documentos disponibles(un observable de tipo string[]).
  currentDoc: string;//id del documento seleccionado actualmente. La lista de documentos necesitan saber en qué
  //documento estamos para que podamos resaltar ese ID en el sidenav.
  private _docSub: Subscription;//es una referencia a la suscripción que nos da el documento actual seleccionado
  //nuestro constructor, declarando nuestro servicio
  constructor(private documentService: DocumentService) { }
  //se ejecuta después del constructor, se ejecuta solo una vez, a menos que des F5
  ngOnInit() {
    this.documents = this.documentService.documents;//obteniendo todos los documentos disponibles
    //suscribiendose para obtener el documento actual, mediante el id del mismo, y esperar el cambio de documento
    //para emitir, avisar a todo aquel que use este observable, y ejercer el cambio
    this._docSub = this.documentService.currentDocument.subscribe(doc => this.currentDoc = doc.id);
  }
  //se ejecuta cuando se abandona al componente
  ngOnDestroy(){
    this._docSub.unsubscribe();//cancelando la suscripción
  }
  //método que carga un documento que fue seleccionado de la lista, mediante su id
  loadDoc(id: string){
    this.documentService.getDocument(id);//activamos el evento (para el servidor de socket) getDoc, que devuelve el documento seleccionado para editar
  }
  //método que crea un nuevo documento
  newDoc(){
    //activamos el evento (para el servidor de socket ) addDoc, que crea un nuevo documento (crea una nueva sala, 
    //guarda el documento en nuestro objeto)
    this.documentService.newDocument();
  }
}
