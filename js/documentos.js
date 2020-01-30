var html = '';

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
            let nrcoluna = i+1;
            let filename = files[i].name;
            fileNames.push(files[i].name);
            storage.ref(cpfValue+'/'+fileNames[i]).getDownloadURL().then(function(url){
                //  html += '<tr>'+'<th scope="row">'+nrcoluna+'</th>'+'<td>'+filename+'</td>'+'<td>'+'<a href="' + url + '" target="_blank" rel="noopener noreferrer">Certificado</a>'+'</td>'+'</tr>';
                //  document.getElementById('row').innerHTML = html;
                var ul = document.getElementById("list");
                var li = document.createElement("li");
                var listItem = '<a href="' + url + '" target="_blank">' +fileNames[i] + '</a>';
                li.setAttribute("class", "list-group-item")
                li.innerHTML = listItem;
                ul.appendChild(li);
                fileLinks.push(url);
            }).catch(function(error){
                console.log(error);
            }).finally(function(){
                console.log('Nome', fileNames[i]);
                console.log('Link', fileLinks[i]);
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