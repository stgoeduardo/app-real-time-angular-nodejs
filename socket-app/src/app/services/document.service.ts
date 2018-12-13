import { Injectable } from '@angular/core';//para que este servicio pueda ser inyectada dinamicamente
//a quien lo solicite
import { Socket } from 'ngx-socket-io';//importamos nuestro socket
import { Document } from '../models/document';//importamos nuestro modelo documet
//haciendo este servicio inyectable
@Injectable({
  //especificando el modulo(en este caso es la raíz) para cuyo alcance se configurará este servicio
  providedIn: 'root'
})
export class DocumentService {
  //guardará el evento 'document' emitido por el servidor de socket de tipo Document y se tratará 
  //acá como un observable
  currentDocument = this.socket.fromEvent<Document>('document');
  //guardará el evento 'documents' emitido por el servidor de socket de tipo arreglo de string y
  //se tratará acá como un observable
  documents = this.socket.fromEvent<string[]>('documents');
  //declarando socket como dependencia
  constructor(private socket: Socket) { }

  //método que devuelve el documento solicitado por el id...
  getDocument(id: string){
    //este metódo emite el evento 'getDoc' con el id indicado para que nuestro servidor de socket lo cache y
    //realize la acción que tiene para este evento, que es la de mostrar el documento solicitado.
    this.socket.emit('getDoc', id);
  }
  //método que crea un nuevo documento
  newDocument(){
    //este metódo emite el evento 'addDoc' con una nueva instancia de nuestra clase (modelo) document para que
    //nuestro servidor de socket lo cache, lo guarde en el objeto de todos los documentos y avise a todos los usuarios
    //que hay un nuevo documento el cual ya pueden editar
    this.socket.emit('addDoc', { id: this.docId(), doc: ''});
  }
  //metódo que edita un documento en particular
  editDocument(document: Document){
    //este metódo emite el evento 'editDoc' con el documento actual, para que nuestro servidor de socket lo 
    //cache y guarde al instante todo lo que va escribiendose en el documento
    this.socket.emit('editDoc', document);
  }

  //método privado que genera una cadena aleatoria, la cual representa el id de cada documento nuevo que se genera
  private docId(){
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0 ; i < 5 ; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}