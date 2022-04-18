let usuario = [];
let mensagens = [];

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
        console.log("tá mantendo a conxão")
        console.log (response)
    }
    function tratarFalha (errada) {
        console.log ("deu ruim na conexão")
    }

}
setInterval(manterConexao, 5000)

function buscarMensagem () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then (processarResposta);
    promise.catch(tratarFalha);
    function processarResposta (response) {
        let mensagens = response;
        escreverMensagens()
    }
    function tratarFalha (errada) {
        console.log("deu merda com as mensagens")
    }
}
setInterval (buscarMensagem, 3000)
