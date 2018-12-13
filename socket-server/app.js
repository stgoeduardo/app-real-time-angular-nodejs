//inicializamos una aplicación con el framework express, y así empezar los métodos del mismo
const app = require('express')();
//una vez inicializado nuestra aplicación en express, lo siguiente que haremos es
//crear nuestro servidor web para que responda cualquier petición, para eso requerimos el paquete HTTP 
//propio de node, para mas adelante crear el servidor...
const http = require('http');
//generamos una nueva instancia de http.Server, una clase NodeJs integrada con herramientas para evaluar la 
//comunicación HTTP
const server = http.createServer(app);
//requreimos la biblioteca de socket.io
const socket_io = require('socket.io');
//e inicializamos nuestro servidor de socket.io.
const io = socket_io(server);
//Para este ejemplo ocuparemos un objeto llamado "documentos" para guardar los documentos que se van a ir
//generando y editando en la aplicación web
const documents = {};

//nuestro servidor de socket.io empieza a detectar ('on') eventos, en este caso: 'connection', el cual entra
//en ejecución cuando se conecta desde el navegador a traves de la web app. El primer parámetro es el nombre del
//evento, y el segundo generalmente es un callback(devolución de llamada) ejecutada cuando se dispara el evento,
//con la carga útil del evento.
io.on('connection', socket => {
    //declaramos una variable propia de este bloque para que contenga el id previo de una sala.
    let previous_id;
    //función que realiza la unión y la salida de salas por parte de los usuarios conectados
    const safe_join = current_id =>{
        //el id anterior deja la sala
        socket.leave(previous_id);
        //se une el id nuevo (sala nueva)
        socket.join(current_id);
        //y le asignamos al id previo el nuevo id, para esperar una nueva sala(current_id)
        previous_id = current_id;
    };
    //cuando nuestra web app emita el evento 'getDoc' con el id del documento como ocarga útil...
    socket.on('getDoc', doc_id =>{
        //...se unirá a una sala nueva con ese id del documento, y...
        safe_join(doc_id);
        //...emitirá el documento almacenado solo al cliente iniciador.
        socket.emit('document', documents[doc_id]);
    });
    //cuando nuestra web app emita el evento 'addDoc' la carga útil es un objeto 'documento'...
    socket.on('addDoc', doc => {
        //...que en este momento consiste solo en una id generada para el cliente
        documents[doc.id] = doc;
        //le pedimos a nuestro socket que se una a la sala de ese id, para que cualquiera edición futura
        //se pueda transmitir a cualquier persona que esté en la misma sala...
        safe_join(doc.id);
        //...avisamos a todos los usuarios que están conectados al servidor que hay un nuevo documento para editar
        io.emit('documents', Object.keys(documents));
        //...emitirá el documento almacenado solo al cliente iniciador.
        socket.emit('document', doc);
    });
    //cuando nuestra web app emita el evento 'editDoc' la carga útil será todo el documento en su estado después
    //de cualquier pulsación de tecla...
    socket.on('editDoc', doc=>{
        //...reemplazaremos el documento existente en la 'base de datos' (nuestro objeto)...
        documents[doc.id] = doc;
        //...y luego transmitiremos el nuevo documento solo a los clientes que actualmente lo están viendo
        socket.to(doc.id).emit('document', doc);
    });
    //Al inciar nuestro servidor socket, avisamos a todos los usuarios que están conectados al servidor 
    //que hay documentos por editar (si es que lo hay)
    io.emit('documents', Object.keys(documents));
    //imprimir un aviso de que se conectó(mostramos su id) un socket exitosamente.
    console.log('Socket '+socket.id+" conectado exitosamente!");
});

//Ponemos al servidor a escuchar y recibirá cualquier clase de petición de la url: http://127.0.0.1:4444
server.listen(4444, ()=>{
    console.log('Corriendo servidor en el puerto 4444');
});