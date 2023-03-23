function loginRequest(token){

    
   

   
    var obj={DstokenOne: `${token}`};
    var toUrl = "/AtualizaAutenticacao";
    var method="POST";

    
    WebService.Init(obj, toUrl, CallBack, method);




    function CallBack(response){


        console.log(response);
        


        
    }


}



















