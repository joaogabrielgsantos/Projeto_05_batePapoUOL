let usuario = [];

function cadastrarNome() {
    let username = prompt ("Nos informe seu username");
    usuario.push({name: username})
    console.log(usuario)
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", usuario[0]);
    promise.then (processarResposta);
    promise.catch (tratarErro);

    function processarResposta (response) {
        console.log("deu certo")
        console.log (response)
    }
    function tratarErro (errada) {
        alert ("[ERRO] Já temos um usuário com esse username!")
        cadastrarNome()
    }

}
cadastrarNome()

function manterConexao(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", usuario[0]);
    promise.then (processarResposta);
    promise.catch(tratarFalha);
    function processarResposta (response) {
        console.log("tá mantendo a conexão")
        console.log (response)
    }
    function tratarFalha (errada) {
        console.log ("deu ruim na conexão")
        window.location.reload()
    }

}
setInterval(manterConexao, 5000)

function buscarMensagem () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then (processarResposta);
    function processarResposta (response) {
        let mensagens = response.data;
        for (let i = 0; i < mensagens.length; i++) {
            const element = mensagens[i];
            const lista = document.querySelector(".content")
            if (element.type === "status") {
                lista.innerHTML += `<li class="status">
                <p><span>(${element.time})</span> <strong>${element.from}</strong> ${element.text}</p>
            </li>`
            } if (element.type === "message"){
                lista.innerHTML +=`<li class="message">
                <p><span>(${element.time})</span> <strong>${element.from}</strong> para <strong>${element.to}</strong>: ${element.text}</p>
            </li>`
            } if (element.type === "private_message"){
                lista.innerHTML += `<li class="private_message">
                <p><span>(${element.time})</span> <strong>${element.from}</strong> reservadamente para <strong>${element.to}</strong>: ${element.text}</p>
            </li>`            
            }
            const elementoQueQueroQueApareca = document.querySelector('li:last-child');
            elementoQueQueroQueApareca.scrollIntoView();           
        }
    }    
}

buscarMensagem ()

function enviarMensagem (){
    let texto = document.querySelector("textarea").value
    let dadosEnvio = [{from: usuario[0].name , to: "Todos" , text: texto , type: "message"}]
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", dadosEnvio[0]);
    promise.then (processarResposta);
    promise.catch(tratarFalha);
    function processarResposta (response) {
        console.log("mensagem enviada")
        document.querySelector("textarea").value = "";
        
    }
    function tratarFalha (errada) {
        window.location.reload()
    }

}
