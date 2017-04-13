$(document).ready(function () {

    $('#enviar').click(function () {
        SalvarComentario();
    });

});





function SalvarComentario() {
    document.body.style.cursor = 'wait';
    
    $.ajax({
        url: "http://rafaelwms.com.br/api/comentarios/inserir",
        data: {nome: $('#nome').val(), mensagem:$('#mensagem').val(), ip: '1.2.3.4'},
        type: "POST",
        async: true,
        cache: false,
        success: function (data) {           
            if (data.Result == undefined) {
                $.MessageBoxOK({ mensagem: data.responseText });
            } else {
                $.MessageBoxOK({ mensagem: data.Result });
            }
            document.body.style.cursor = 'default';
        },
        error: function (data) {
            if (data.Result == undefined) {
                $.MessageBoxOK({ mensagem: data.responseText });
            } else {
                $.MessageBoxOK({ mensagem: data.Result });
            }
            document.body.style.cursor = 'default';
        }
    });

}