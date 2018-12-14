# Editor de Texto en Tiempo Real con Angular 7, Node.js, Express.js y Socket.io

Aplicación que crea, edita y muestra documentos en tiempo real para uno o muchos usuarios con Angular7, Node.js, Epxress.js y Socket.io
Entonces, descargue el proyecto y siga los siguientes pasos para ejecutarlo:

## Servidor

Primero, abra una nueva terminal y acceda a la carpeta socket-server para ejecutar lo siguiente:
```bash
npm install
```

Después de eso, ejecute el comando:
```bash
app node.js
```

El servidor empezará a ejecutarse en http://127.0.0.1:4444, y esperaremos las conexiones que surjan.

## Aplicación Web

Teniendo nuestro servidor en ejecución, lo que sigues es abrir de nueva cuenta otra terminarl, acceder a la carpeta socket-app y ejecutar lo siguiente:
```bash
ng serve
```
Nuestra aplicación web estaría ejecutandose en http://localhost:4200. Con esto tendríamos nuestro servidor ejecutandose y nuestra aplicación lista para empezar a editar documentos en tiempo real :).

Los pasos para llevar a cabo este proyecto están descritos en el siguiente [documento](https://drive.google.com/open?id=1UZjmulPDoZqJvanGZlKad2L6z25TQoVa), descarguelo y siga paso a paso para mejor comprensión.

*NOTA: Este ejemplo fue tomado de la página de [Alligator](https://alligator.io/angular/socket-io/).*


