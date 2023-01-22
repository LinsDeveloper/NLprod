function loginRequest(){

    


    var obj={};
    var toUrl = "http://localhost:8090/login";
    var method="POST";

    
    WebService.Init(obj, toUrl, CallBack, method);




var CallBack = function(resposta){

    dados = JSON.stringify(resposta);
    console.log(dados);
}

}





function respostalogin(resposta) {

    if (resposta.d.erro !== "ok") {
        $('#dretorno').css("visibility", "visible")
        $('#retorno').html(resposta.d.erro)
        return true
    }
    else {
        $('.modal').modal('hide');

    }

}