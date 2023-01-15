



var WebService = (function(){



    var SendData = (obj,toUrl,method) =>{

        return (new Promise((resolve, reject)=>{

            $.ajax({
                url: toUrl,
                data: obj,
                dataType: "json",
                method: method,
                error: function(response){
                    console.log("Error on Server. Epic Fail! | WebService.js");
                    reject();

                },
                success: function(response){
                    if (typeof(response) == "undefined"){
                        reject();
                    }

                    



                    console.log("Sucess on request response to server! | WebService.js");
                    if (response.success){
                        resolve(response);
                    }else{
                        resolve(response);
                    }
                }
            })

        })
     );

    }




    var Send = (obj,toUrl,CallBack,method)=>{
        SendData(obj,toUrl,method).then((response)=>{

            if (typeof(response.success) == "undefined"){
                console.log("Response object is missin the property [bool:success]");
                CallBack(response);
                return;
            }

            if(response.success){
                CallBack(response);
            }else{
                console.log("Deu problema no retorno do WebService");
            }

        }).catch((e)=>{
           console.log("Retorno Inválido do Servidor");
           console.log(e);  
        });
    }

    return({
        Init:Send
    });

})();