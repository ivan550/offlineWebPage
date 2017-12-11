var postsDB = null;
var remoteDB = null;

function startDB() {
    postsDB = new PouchDB('posts');
    remoteDB = new PouchDB('http://localhost:5984/post');
    alert('Database created');
    console.log(postsDB.adapter);
    console.log("postsDB.adapter");
    loadAll();

//    console.log(document.getElementById("delete").value);
    
//        loadAll();
//PouchDB.debug.enable('*');
//console.log(pouch.adapter);
//PouchDB.debug.disable();
// returns a promise
//    postsDB.destroy();
}

function add() {
//    postsDB = new PouchDB('myDB');


//    remoteDB = new PouchDB('http://localhost:5984/post');
    /*Se obtienen los datos del formulario, el id debe ser UUID*/
    var inputData = getform();
    /*Se agregan los datos insertados en el formulario a la BD "posts" */
    postsDB
            .put(inputData)
            .then(function (response) {
                alert("Agregado con éxito");
                /*Se recuperan todos los datos*/
                loadAll();
                sync();
            }).catch(function (error) {
        console.log(error);
//        alert("Error al intentar agregar registro");
    });



}
function loadAll() {
    var count = 1;
    /*Se recuperan todos los documentos*/
    postsDB.allDocs({
        include_docs: true
    }).then(function (result) {
        console.log(result.rows);
        var outerHtml = '';
        for (var key in result.rows) {
            outerHtml += '<tr><td>' + count++ + '</td><td>' + result.rows[key].doc.tit + '</td><td>' + result.rows[key].doc.des + "</td>" + '</td><td>' + result.rows[key].doc.cat + "</td>" + '<td>' + result.rows[key].doc.usu + "</td>"+"<td><button onclick='removeDoc(this);' id='"+result.rows[key].id+"' type='button' class='btn btn-danger'>Eliminar</button></td>"+"</tr>";
        }
        console.log(outerHtml);
        document.querySelector('#elementsList').innerHTML = outerHtml;
    }).catch(function (err) {
        console.log(err);
    });
}

function sync() {
    postsDB = new PouchDB('posts');
    remoteDB = new PouchDB('http://localhost:5984/post');
    postsDB.sync(remoteDB, {
        live: true,
        retry: true
    }).on('change', function (change) {
        loadAll();
        alert("Hubo cambio");
    }).on('error', function (err) {
        // yo, we got an error! (maybe the user went offline?)
        alert("Trabajando offline");
    });
}
function replicate() {
    postsDB = new PouchDB('posts');
    remoteDB = new PouchDB('http://localhost:5984/post');
    remoteDB.replicate.to(postsDB).then(function (result) {
        // handle 'completed' result        
        loadAll();
        alert("Replicación completada");
    }).catch(function (err) {
        console.log(err);
        loadAll();
        alert("Error con el servidor de BD");
    });
}
function removeDoc(element) {
    postsDB.get(element.id).then(function (doc) {
        return postsDB.remove(doc);
    }).then(function (result) {
        sync();
        alert("Elemento borrado con éxito" + result);
    }).catch(function (err) {
        console.log(err);
    });
}

function loadFile(db) {
    var input = document.querySelector('input');
    input.addEventListener('change', function () {
        var file = input.files[0]; // file is a Blob

        db.put({
            _id: 'mydoc',
            _attachments: {
                filename: {
                    type: file.type,
                    data: file
                }
            }
        }).catch(function (err) {
            console.log(err);
        });
    });
}
function getform() {
    var id = Date.now().toString();
    return inputData = {
        tit: document.querySelector('#titulo').value,
        des: document.querySelector('#descripcion').value,
        cat: document.querySelector('#categoria').value,
        usu: document.querySelector('#usuario').value,
        _id: id
    };
}
