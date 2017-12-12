Prototipo de una aplicación web de registro sencilla, la cual trabaja de manera offline es decir, cuando existan problemas con la red o el servidor la aplicación permite al usuario seguir haciendo registro de datos. De manera que cuando se resuelvan los problemas con la red y/o el servidor, los datos de registro permanezcan íntegros en el servidor.	

Para su funcionamiento es necesario instalar un servidor PouchDB:

//instalar node js:
npm install

//Instalar el servidor PouchDB:
npm install -g pouchdb-server

//iniciar Servidor:
pouchdb-server --port 5984

//Monitoreo de PouchDB:
localhost:5984/_utils/
