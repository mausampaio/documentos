function search() {
    var cpf = document.getElementById('inputCPF').value;
    validation(cpf);
}

function validation(cpfValue) {
    var storage = firebase.storage();
    //Retorna uma promisse que será processada 
    storage.ref().child(cpfValue).listAll().then(function(todosArquivos){
        if(todosArquivos.items.length >= 1){
            listFiles(cpfValue);
            next(cpfValue);
        } else {
            alert('CPF não encontrado');
        }        
    }).catch(function(error){
        console.log('ERRO', error);
    });
}

function listFiles(cpfValue) {
    document.getElementById('tituloDocumentos').innerHTML = 'Certificados de: ' + cpfValue;
    var storage = firebase.storage();
    var files;
    var fileNames = [];
    var fileLinks = [];
    storage.ref().child(cpfValue).listAll().then(function(todosArquivos){
        files = todosArquivos.items;
        for(let i = 0; i<files.length; i++){
            fileNames.push(files[i].name);
            storage.ref(cpfValue+'/'+fileNames).getDownloadURL().then(function(url){
                document.getElementById('certificado').innerHTML = '<a href="'+url+'" target="_blank" rel="noopener noreferrer">Certificado</a>'
            });            
        }
    });
}

function next(cpfValue) {
    document.getElementById('busca').setAttribute("class", "ocultar");
    document.getElementById('resultado').removeAttribute("class", "ocultar");
}

function back() {
    document.getElementById('busca').removeAttribute("class", "ocultar");
    document.getElementById('resultado').setAttribute("class", "ocultar");
    document.getElementById('inputCPF').value = '';
}