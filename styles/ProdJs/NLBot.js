
var lucro = []
var sum = 0;



function callBot(id){


    var isHidden = $(".btn-connect-desc").is(":hidden");
    if(isHidden === true){
        alert('Para operar é necessário conectar-se na corretora!');
        return
    }



    var isHidden = $("#summaryStopButton").is(":hidden");
    if(isHidden === false){
        
        $('#summaryStopButton').hide()
        $('#summaryRunButton').show()
        $(".rocket").removeClass('animar');
        $('.box::before').removeClass('ativar');
        $(".scene i").remove();
        $(".tableBot").removeClass('sombrafixa');
        $(".box").css("opacity", 0.7);
        alert("Ao escolher outro robô, é preciso parar a operação atual.")
        
        return
    }


    ajaxDados('/TrocaBots','{"id": '+ id + '}', '', 'ResultBot');


}






var barrier;
var basis;
var contract_type;
var duration;
var duration_unit;
var selected_tick;
var symbol;
var martingale;
var tokenReal;
var tokenVirtual;
var escolhaToken;




var aux = [];



function mostraAlerta(elemento){

    
    
    if(tokenReal == 0){
        escolhaToken = tokenVirtual;
    }
    
    if(tokenReal != 0 && elemento.value == 1){
        escolhaToken = tokenReal;

    }

    if(tokenReal != 0 && elemento.value == 2){
        escolhaToken = tokenVirtual;
        
    }






         var ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=32595');

        //Autenticação TOKEN

            ws.onopen = function(evt) {
                ws.send(JSON.stringify({authorize: escolhaToken == undefined ? tokenVirtual : escolhaToken}));
            };


            

            

            ws.onmessage = function(msg) {
                var data = JSON.parse(msg.data);
                $(".CountValues h4").remove()
                $(".CountValues").append(`<h4>$ `+ data.authorize.balance +` `+ data.authorize.currency + `</h4>`);

                $("#botSelecione option").remove()
                const account = data.authorize.account_list
                $.each(account, function (k, v){

                    $('#botSelecione').append(`<option onchange="javascript:mostraAlerta(elemento`+ k +`);" value=`+ k +`>`+ v.landing_company_name +`: `+ v.loginid +`</option>`);

                })


                }




}





function ResultBot(data){


    barrier = data[0].barrier;
    basis = data[0].basis; 
    contract_type = data[0].contract_type; 
    duration = data[0].duration; 
    duration_unit = data[0].duration_unit; 
    symbol = data[0].symbol; 
    martingale = data[0].martingale; 
    tokenVirtual = data[0].tokenVirtual;
    tokenReal = data[0].tokenReal;
    
    


    $('.botEscolha h4').remove();
    $('.botEscolha').append(`<h4>`+ data[0].robo+ `</h4>`);


         var ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=32595');

        //Autenticação TOKEN

            ws.onopen = function(evt) {
                ws.send(JSON.stringify({authorize: escolhaToken == undefined ? tokenVirtual : escolhaToken}));
            };


           

            

            ws.onmessage = function(msg) {
                var data = JSON.parse(msg.data);
                $(".CountValues h4").remove()
                $(".CountValues").append(`<h4>$ `+ data.authorize.balance +` `+ data.authorize.currency + `</h4>`);

                $("#botSelecione option").remove()
                const account = data.authorize.account_list
                $.each(account, function (k, v){

                    $('#botSelecione').append(`<option onchange="changeFunc(`+ k +`);" value=`+ k +`>`+ v.landing_company_name +`: `+ v.loginid +`</option>`);

                })


                }



    
    


}






    function entrada(){



        var isHidden = $(".btn-connect-desc").is(":hidden");
        if(isHidden === true){
            alert('Para operar é necessário conectar-se na corretora!');
            $('#summaryStopButton').hide()
            $('#summaryRunButton').show()
            $(".rocket").removeClass('animar');
            $('.box::before').removeClass('ativar');
            $(".scene i").remove();
            $(".tableBot").removeClass('sombrafixa');
            $(".box").css("opacity", 0.7);
            return
        }


        var resultNone = $('.titleResultado h6').first().text()
        if(resultNone != ''){
            aux.length = 1;
       }



        if(barrier == undefined){
            alert("Escolha um robô para operar.");
            $('#summaryStopButton').hide()
            $('#summaryRunButton').show()
            $(".rocket").removeClass('animar');
            $('.box::before').removeClass('ativar');
            $(".scene i").remove();
            $(".tableBot").removeClass('sombrafixa');
            $(".box").css("opacity", 0.7);
            return
        }

        


        alert("⚠️ATENÇÃO⚠️  Este robô não tem stop loss ❌ e nem stop gain ✅. 🔹 Opere com sua estratégia, não com a sua emoção. 💎 NEVER LOSS 💎");
                

        var entrada = prompt("✅ CONTRATO INICIAL MÍNIMO ✅");


        setTimeout(() => {


             ExecBot()


          }, 3000);
       

        



            


            function ExecBot(){


                    var isHidden = $("#summaryStopButton").is(":hidden");
                    if(isHidden === true){
                        return
                    }

               




                    $(".line").css({"background-color":"#45f3ff", "width": "0%" })
                    
                    $("#circle2").css({"background-color":"#27282b", "border": "0.25em solid #27282b", "z-index":"1"})
                    $("#circle3").css({"background-color":"#27282b", "border": "0.25em solid #27282b", "z-index":"1"})
                  



                    
                
                    
                    
                    var valPerda = $('.titleResultado h6').first().text()
                    var preco = $('.titlePreco h6').first().text()
                    if(valPerda != ''){


                        var transformado = parseFloat(valPerda);
                        var transformadoPreco = parseFloat(preco);
                        if(transformado < 0 && aux.length == 0){

                                
                                var entradanova =  parseFloat(transformadoPreco.toFixed(2)) + (martingale * transformadoPreco.toFixed(2));

                        }

                        if(transformado < 0 && aux.length == 1){

                            aux.length = 0;

                        }

                    }

                    

                    
                        

                    
                    var ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=32595');

                    //Autenticação TOKEN

                        ws.onopen = function(evt) {
                            ws.send(JSON.stringify({authorize: escolhaToken == undefined ? tokenVirtual : escolhaToken}));
                        };


                        $("#circle1").css({"background-color":"#45f3ff", "border": "0.25em solid #45f3ff", "z-index":"1000"})

                        

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
                                    amount: (entradanova == undefined ? entrada : entradanova.toFixed(2)),
                                    barrier: barrier,
                                    basis: basis,
                                    contract_type: contract_type,
                                    currency: data.authorize.currency,
                                    duration: duration,
                                    duration_unit: duration_unit,
                                    selected_tick: selected_tick,
                                    symbol: symbol}));



                                ws.onmessage = function(msg) {
                                    var proposta = JSON.parse(msg.data);
                                    var idContract = proposta.proposal.id;
                                    var timestamp = new Date(proposta.proposal.date_start*1000);
                                    $(".titleData").prepend(`<h6>`+ timestamp.toLocaleDateString("pt-BR") +`</h6>`);
                                    $(".titleRefer").prepend(`<h6> - </h6>`);
                                    $(".titleProhibited").prepend(`<h6> - </h6>`);
                                    $(".titleExit").prepend(`<h6> - </h6>`);
                                    $(".titlePreco").prepend(`<h6>`+ proposta.proposal.display_value +`</h6>`);
                                    $(".titleResultado").prepend(`<h6> - </h6>`);
                                    

                                    

                                    ws.send(JSON.stringify({buy: idContract,
                                                            price: (entradanova == undefined ? entrada : entradanova.toFixed(2))}));



                                    ws.onmessage = function(msg) {
                                        var buyContract = JSON.parse(msg.data);
                                        var idContractOpen = buyContract.buy.contract_id;
                                        $(".CountValues h4").remove()
                                        $(".CountValues").append(`<h4>$ `+ buyContract.buy.balance_after +` `+ balanceAccount.balance.currency + `</h4>`);
                                        $("#circle2").css({"background-color":"#45f3ff", "border": "0.25em solid #45f3ff", "z-index":"1000"})
                                        $(".line").css({"background-color":"#45f3ff", "width": "50%"})

                                        setTimeout(() => {

                                        ws.send(JSON.stringify({proposal_open_contract: 1,
                                                                contract_id: idContractOpen}));
                                    
                                    
                                    
                                        ws.onmessage = function(msg) {
                                            var open = JSON.parse(msg.data);
                                            
                                            setTimeout(() => {
                                            
                                            if(open.proposal_open_contract.bid_price != 0){

                                                $(".titleRefer h6").first().remove();
                                                $(".titleProhibited h6").first().remove();
                                                $(".titleExit h6").first().remove();
                                                $(".titleResultado h6").first().remove();
                                                $(".titleRefer").prepend(`<h6>`+ open.proposal_open_contract.transaction_ids.buy +`</h6>`);
                                                $(".titleResultado").prepend(`<h6>`+ open.proposal_open_contract.profit.toFixed(2) +`</h6>`);
                                                $(".titleProhibited").prepend(`<h6>`+ open.proposal_open_contract.current_spot +`</h6>`);
                                                $(".titleExit").prepend(`<h6>`+ open.proposal_open_contract.current_spot +`</h6>`);
                                                $(".titleResultado h6").first().css('color', '#20b813')
                                                
                                                lucro.push(open.proposal_open_contract.profit)
                                                var sum = 0;
                                                for(var i = 0; i < lucro.length; i++){
                                                    sum += lucro[i];
                                                }


                                                var ganho = 0;
                                                for (var i = 0; i < lucro.length; i++) {
                                                    if (lucro[i] > 0){
                                                        ganho++;
                                                    }
                                                        
                                                }
                                                

                                                if(sum >= 0){
                                                    $(".CountUp h4").remove()
                                                    $(".CountUp").append(`<h4>$ `+ sum.toFixed(2) + `</h4>`);
                                                    $(".CountUp h4").css('color', '#20b813')
                                                }
                                                else{
                                                    $(".CountUp h4").remove()
                                                    $(".CountUp").append(`<h4>$ `+ sum.toFixed(2) + `</h4>`);
                                                    $(".CountUp h4").css('color', '#ff0000')
                                                }


                                                $("#won").html(ganho)
                                                $("#circle3").css({"background-color":"#45f3ff", "border": "0.25em solid #45f3ff", "z-index":"1000"})
                                                $(".line").css({"background-color":"#45f3ff", "width": "100%"})
                                            }
                                            else{
                                                $(".titleRefer h6").first().remove();
                                                $(".titleProhibited h6").first().remove();
                                                $(".titleExit h6").first().remove();
                                                $(".titleResultado h6").first().remove();
                                                $(".titleRefer").prepend(`<h6>`+ open.proposal_open_contract.transaction_ids.buy +`</h6>`);
                                                $(".titleResultado").prepend(`<h6>-`+ open.proposal_open_contract.buy_price.toFixed(2) +`</h6>`);
                                                $(".titleProhibited").prepend(`<h6>`+ open.proposal_open_contract.current_spot +`</h6>`);
                                                $(".titleExit").prepend(`<h6>`+ open.proposal_open_contract.current_spot +`</h6>`);
                                                $(".titleResultado h6").first().css('color', '#ff0000')

                                                lucro.push(open.proposal_open_contract.profit)
                                                var sum = 0;
                                                for(var i = 0; i < lucro.length; i++){
                                                    sum += lucro[i];
                                                }


                                                var perdas = 0;
                                                for (var i = 0; i < lucro.length; i++) {
                                                    if (lucro[i] < 0){
                                                        perdas++;
                                                    }
                                                        
                                                }



                                                if(sum < 0){
                                                    $(".CountUp h4").remove()
                                                    $(".CountUp").append(`<h4>$ `+ sum.toFixed(2) + `</h4>`);
                                                    $(".CountUp h4").css('color', '#ff0000')
                                                }
                                                else{
                                                    $(".CountUp h4").remove()
                                                    $(".CountUp").append(`<h4>$ `+ sum.toFixed(2) + `</h4>`);
                                                    $(".CountUp h4").css('color', '#20b813')
                                                }
                                                

                                                

                                                $("#lost").html(perdas)
                                                $("#circle3").css({"background-color":"#45f3ff", "border": "0.25em solid #45f3ff", "z-index":"1000"})
                                                $(".line").css({"background-color":"#45f3ff", "width": "100%"})

                                            }


                                            


                                            }, 400)


                                            setTimeout(() => {

                                                ws.send(JSON.stringify({balance: 1}));


                                                ws.onmessage = function(msg) {
                                                    var balanceFinish = JSON.parse(msg.data);
                                                    $(".CountValues h4").remove()
                                                    $(".CountValues").append(`<h4>$ `+ balanceFinish.balance.balance +` `+ balanceFinish.balance.currency + `</h4>`);
                                                    
                                                    };



                                                    setTimeout(() => {

                                                        ws.send(JSON.stringify({balance: 1}));
                    
                    
                                                        ws.onmessage = function(msg) {
                                                            var balanceFinish = JSON.parse(msg.data);
                                                            $(".CountValues h4").remove()
                                                            $(".CountValues").append(`<h4>$ `+ balanceFinish.balance.balance +` `+ balanceFinish.balance.currency + `</h4>`);



                                                            ExecBot()
                                                            
                                                            };
                    
                    
                    
                                                        
                        
                                                    }, 1500)



                                                
                
                                            }, 1000)






                                            
                                        };

                                    }, 2000)

                                        
                                    
                                    };




                                };








                            };


                            
                                



                            };



                        


                            };


                            


                        
                            
                        
                            


                    






            };













    
                    

                        

    }

            



           
        





function ExecBuy(){

    ExecBot();

   

}


