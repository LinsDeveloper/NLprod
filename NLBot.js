


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
                $(".CountValues").append(`<h4>$ `+ data.authorize.balance +` `+ data.authorize.currency + `</h4>`);

                $("#botSelecione option").remove()
                const account = data.authorize.account_list
                $.each(account, function (k, v){

                    $('#botSelecione').append(`<option value=`+ k +`>`+ v.landing_company_name +`: `+ v.loginid +`</option>`);

                })

                //active symbols

                ws.send(JSON.stringify({active_symbols:'brief'}));

                ws.onmessage = function(msg) {
                    var active_symbols = JSON.parse(msg.data);


                    ws.send(JSON.stringify({balance: 1}));
                
        
                    ws.onmessage = function(msg) {
                    var balanceAccount = JSON.parse(msg.data);
                    $(".CountValues h4").remove()
                    $(".CountValues").append(`<h4>$ `+ balanceAccount.balance.balance +` `+ balanceAccount.balance.currency + `</h4>`);
                    



                    ws.send(JSON.stringify({proposal: 1,
                        amount: entrada,
                        barrier: 1,
                        basis: "stake",
                        contract_type: "DIGITOVER",
                        currency: data.authorize.currency,
                        duration: 1,
                        duration_unit: "t",
                        selected_tick: 1,
                        symbol: 'R_50'}));



                    ws.onmessage = function(msg) {
                        var proposta = JSON.parse(msg.data);
                        var idContract = proposta.proposal.id;
                        $(".titleData").prepend(`<h6>`+ proposta.proposal.date_start +`</h6>`);
                        $(".titlePreco").prepend(`<h6>`+ proposta.proposal.display_value +`</h6>`);
                        

                        

                        ws.send(JSON.stringify({buy: idContract,
                                                price: entrada}));



                        ws.onmessage = function(msg) {
                            var buyContract = JSON.parse(msg.data);
                            var idContractOpen = buyContract.buy.contract_id;
                            $(".CountValues h4").remove()
                            $(".CountValues").append(`<h4>$ `+ buyContract.buy.balance_after +` `+ balanceAccount.balance.currency + `</h4>`);

                            
                            ws.send(JSON.stringify({proposal_open_contract: 1,
                                                    contract_id: idContractOpen}));
                        
                        
                        
                            ws.onmessage = function(msg) {
                                var open = JSON.parse(msg.data);
                                $(".titleProhibited").prepend(`<h6>`+ open.proposal_open_contract.tick_stream[0].tick_display_value +`</h6>`);
                                 $(".titleExit").prepend(`<h6>`+ open.proposal_open_contract.tick_stream[0].tick_display_value +`</h6>`);
                                $(".titleRefer").prepend(`<h6>`+ open.proposal_open_contract.transaction_ids.buy +`</h6>`);
                            
                                
                                $(".titleResultado").prepend(`<h6> `+ open.proposal_open_contract.profit +`</h6>`);
                                if(open.proposal_open_contract.profit >= 0){
                                    $(".titleResultado h6").css('color', '#20b813')
                                }
                                else{
                                    $(".titleResultado h6").css('color', '#ff0000')
                                }


                                


                                setTimeout(() => {

                                    ws.send(JSON.stringify({balance: 1}));


                                    ws.onmessage = function(msg) {
                                        var balanceFinish = JSON.parse(msg.data);
                                        $(".CountValues h4").remove()
                                        $(".CountValues").append(`<h4>$ `+ balanceFinish.balance.balance +` `+ balanceFinish.balance.currency + `</h4>`);
                                        
                                        };
    
                                  }, "500")

                               



                                
                            };


                            
                        
                        };




                    };








                };
                    



                };


                };
                
               
                


 };

 
                

                    

  

            



           
        





function ExecBuy(){

    ExecBot();

   

}


