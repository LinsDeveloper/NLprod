function loginRequest(){

    
   

   
    var obj={};
    var toUrl = "/statusAuhenticate";
    var method="POST";

    
    WebService.Init(obj, toUrl, CallBack, method);




    function CallBack(response){
        console.log(response);
        if (response.erro !== false) {
            $('#messageid').css("visibility", "visible")
            $('#imagemLogo').css("top", "0px")
            $('.titlelogin').css("top", "0px")
            setTimeout(() => {
                $('#messageid').css("visibility", "hidden")
                $('#imagemLogo').css("top", "50px")
                $('.titlelogin').css("top", "50px")
              }, "4000")
            return true
        }
        
    }


}





$("#btnRequest").click(function() {
    loginRequest()
  });














