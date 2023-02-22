


function ExecBot(){


        alert("⚠️ATENÇÃO⚠️  O ROBÔ NÃO POSSUI  ✅STOP GAIN |❌STOP LOSS  - TODA A OPERAÇÃO SERÁ GERENCIADA MANUALMENTE. (ASSISTA O VÍDEO NO MENU PRINCIPAL) ⚜️NEVER LOSS⚜️");
      
    

        var entrada = prompt("✅ CONTRATO INICIAL MÍNIMO ✅");

        
        var ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=32595');

        //Autenticação TOKEN

            ws.onopen = function(evt) {
                ws.send(JSON.stringify({authorize:'a1-gklp0uA7jCGLMfI1DfFXJz6P169Kq'}));
            };

            ws.onmessage = function(msg) {
                var data = JSON.parse(msg.data);
                $(".CountValues h4").remove()
                $(".CountValues").append(`<h4>$ `+ data.authorize.balance +` `+ data.authorize.currency + `</h4>`)

                $("#botSelecione option").remove()
                const account = data.authorize.account_list
                $.each(account, function (k, v){

                    $('#botSelecione').append(`<option value=`+ k +`>`+ v.landing_company_name +`: `+ v.loginid +`</option>`)

                })


                ws.send(JSON.stringify({active_symbols:'brief'}));
                
            
                ws.onmessage = function(msg) {
                    var symbols = JSON.parse(msg.data);
                    console.log(symbols.active_symbols[70])
                    
                    };


                
                };

 
                

                    

            

            



           
        
}




function ExecBuy(){

    ExecBot();

   



}




    







