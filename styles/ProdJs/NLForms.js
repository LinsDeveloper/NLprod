function ajaxDados(metodo, dados, elementostatus,funcao){
    
    $.ajax({
        crossOrigin: true,
        url: metodo,
        cache: false,
        type: 'post',
        data: dados,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        beforeSend: function () {

            $('.remove').remove()
            elementostatus === '' ? false : $('#' + elementostatus).append('<span class="spinner-border spinner-border-sm mr-1 remove" role="status" aria-hidden="true" style="margin-left:.5rem!important"></span>');

            elementostatus === '' ? false : $('#' + elementostatus).prop("disabled", true);
        },
        success: function (result) {
            $('.remove').remove()
            elementostatus === '' ? false : $('#' + elementostatus).prop("disabled", false);
            window[funcao](result)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            elementostatus === '' ? false : $('#' + elementostatus).prop("disabled", false);
            console.log(XMLHttpRequest.status)
            console.log(textStatus)
            console.log(errorThrown)
            if (XMLHttpRequest.status == '404') {
               
                alert('Verificar conexão com a internet ?' + XMLHttpRequest.status, {
                    closeText: "Fechar"
            });
            }
            else {
                alert('Verificar conexão com a internet ?' + XMLHttpRequest.status, {
                    closeText: "Fechar"
                });
            }
           
        }
    })

}