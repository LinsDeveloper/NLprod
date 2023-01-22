function loginRequest(){

    
    event.preventDefault()

    let username = document.getElementById("username").value;
    let password = document.getElementById("inputpassword").value;


    var obj={"username": username, "password" : password};
    var toUrl = "http://localhost:8090/login";
    var method="POST";

    
    WebService.Init(obj, toUrl, CallBack, method);




    function CallBack(response){
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
        else {
            window.location.href = "http://127.0.0.1:5502/inicial.html";
    
        }
    }


}



