import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import { Subscription } from 'rxjs';
//importamos el modelo del documento
import { Document } from 'src/app/models/document';
//importamos el operador startWith que, hace que el observable emita un valor la primera vez que se abre la app
import { startWith } from 'rxjs/operators';
//nuestra función componente
@Component({
  selector: 'app-document',//nuestro selector (etiqueta)
  templateUrl: './document.component.html',//la ubicación de nuestra plantilla HTML
  styleUrls: ['./document.component.scss']//la ubicación de nuestro archivo de estilos
})

export class DocumentComponent implements OnInit, OnDestroy {//implementamos las interfaces de oninit y ondestroy
  //objeto document
  document: Document;
  //suscripción al observable que nos da el documento actual y esperar los cambios que se vayan dando, y emitirlos
  private _docSub: Subscription;
  //nuestro servicio
  constructor(private documentService: DocumentService) { }
  //se ejecuta después del constructor, se ejecuta solo una vez, a menos que des F5
  ngOnInit() {
    //nos suscribimos la primera vez para obtener el documento actual, además de mandar un mensaje inicial
    //al usuario cuando este abra la app....
    this._docSub = this.documentService.currentDocument.pipe(
      startWith({ id: '', doc: 'Selecciona un documento existente o cree uno nuevo para empezar a ver la magia :3'})
    ).subscribe(document => this.document = document);
  }
  //se ejecuta cuando se abandona al componente
  ngOnDestroy(){
    this._docSub.unsubscribe();//cancelando la suscripción
  }
  //método que edita un documento cada vez que el usuario teclee
  editDoc(){
    //activamos el evento (hacia el servidor de socket) editDoc, que edita en tiempo real el documento seleccionado
    //y se lo hace saber a todo aquel que está conectado
    this.documentService.editDocument(this.document);
  }
}