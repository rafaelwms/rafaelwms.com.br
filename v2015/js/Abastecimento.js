var mgs_erro_parametros = 'Parâmetros com valores incorretos.';
var mgs_erro_parametro_rangede = 'Necessário informar o valor do Range De.';
var mgs_erro_parametro_rangeate = 'Necessário informar o valor do5 Range Até.';
var mgs_erro_rangeate_menor_que_rangede = 'O valor do Range Até está menor que o valor do Range De.';
var mgs_movimento_invalido_desabastecimento = 'Desabastecimento não permitido.';
var mgs_movimento_invalido_abastecimento = 'Abastecimento não permitido.';


var mensagem_concatenada = '';

//Carregamento da View
$(document).ready(function () {

    $(".radiobutton").die('click').live('click', function () {
        AlternarRadioButtons();
    });

    $("#btnAbastecer").die('click').live('click',function () {
        if (ValidarValores(true)) {
            SalvarAbastecimento(true);
        }
        else {
            $.MessageBoxOK({ mensagem: mensagem_concatenada });
        }
        mensagem_concatenada = '';
    });

    $("#btnDesabastecer").die('click').live('click',function () {
        if (ValidarValores(false)) {
            SalvarAbastecimento(false);
        }
        else {
            $.MessageBoxOK({ mensagem: mensagem_concatenada });
        }
        mensagem_concatenada = '';
    });

    mensagem_concatenada = '';

    $('#Quantidade').val($('#Pendentes').val());

    AlternarRadioButtons();
    AtualizarTotal();
    ValidacoesView()
    ListarAbastecimentos();

});


//Métodos de Ação da tela
function ListarAbastecimentos() {
    var IdLote = $('#IdLotePropostas').val();
    $.ajax({
        url: "../Abastecimento/ListarAbastecimentos",
        data: { idLote: IdLote, page: 0},
        type: "GET",
        async: true,
        cache: false,
        success: function (data) {
            $('#gridResultados').html(data);
            document.body.style.cursor = 'default';
            $("#Loading").fadeOut();
        },
        error: function (data) {
            if (data.Result == undefined) {
                $.MessageBoxOK({ mensagem: data.responseText });
            } else {
                $.MessageBoxOK({ mensagem: data.Result });
            }
            document.body.style.cursor = 'default';
            $("#Loading").fadeOut();
        }
    });
}


function SalvarAbastecimento(tipoMov) {
    $("#Loading").show();
    document.body.style.cursor = 'wait';
    $('#TipoMovimento').val(tipoMov);
    
    $.ajax({
        url: "../Abastecimento/SalvarAbastecimento",
        data: $('#formDadosAbastecimento').serialize(),
        type: "POST",
        async: true,
        cache: false,
        success: function (data) {           
            if (data.Result == undefined) {
                $.MessageBoxOK({ mensagem: data.responseText });
            } else {
                AtualizarLote();
                ListarAbastecimentos();
                $.MessageBoxOK({ mensagem: data.Result });
            }
            document.body.style.cursor = 'default';
            $("#Loading").fadeOut();
        },
        error: function (data) {
            if (data.Result == undefined) {
                $.MessageBoxOK({ mensagem: data.responseText });
            } else {
                $.MessageBoxOK({ mensagem: data.Result });
            }
            document.body.style.cursor = 'default';
            $("#Loading").fadeOut();
        }
    });

}


//Métodos de comportamento dos campos
function AlternarRadioButtons() {

    if ($('#rdbTotal').is(":checked")) {
        $('#RangeDe').val($('#LoteRangeDe').val());
        $('#RangeAte').val($('#LoteRangeAte').val());
        $('#RangeDe').attr('readonly', true);
        $('#RangeAte').attr('readonly', true);
    } else {
        $('#RangeDe').removeAttr('readonly');
        $('#RangeAte').removeAttr('readonly');
    }
    AtualizarTotal();
}

function AtualizarLote() {
    var IdLote = $('#Lote_Id').val();
    $.ajax({
        url: "../Abastecimento/DetalharLote",
        data: { idLote: IdLote },
        type: "GET",
        async: true,
        cache: false,
        success: function (data) {
            $('#Pendentes').val(data[0]);
            $('#Quantidade').val(data[0]);
            $('#Recebidas').val(data[1]);
        },
        error: function (data) {
            alert(data);
        }
    });
}

function AtualizarTotal() {
    var rangede = $('#RangeDe').val();
    var rangeate = $('#RangeAte').val();
    if (rangede != '' && rangeate != '') {
        var subtracao = (rangeate - rangede + 1);
        $('#TotalPropostas').val(subtracao);
    }
    else {
        $('#TotalPropostas').val('');
    }
}

//Métodos de validações da View
function ValidacoesView() {

    $(".valor").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    $('.valor').keyup(function () {

        var rangede = $('#RangeDe').val();
        var rangeate = $('#RangeAte').val();
        var subtracao = (rangeate - rangede + 1);

        if (subtracao <= 0) {
            $('#TotalPropostas').val('');
        } else {
            $('#TotalPropostas').val(subtracao);
        }
    });

}


function ValidarValores(operacao) {

    var retorno = true;
    var rangede = $('#RangeDe').val();
    var rangeate = $('#RangeAte').val();
    var movimento = ((rangeate - rangede) +1);
    var pendentes = $('#Pendentes').val();
    var recebidas = $('#Recebidas').val();

    if (rangede == '' ){
        mensagem_concatenada = mgs_erro_parametro_rangede;
        retorno = false;
    }
                        
    if(rangeate == ''){
        mensagem_concatenada += '</br>' + mgs_erro_parametro_rangede;
        retorno = false;
    }

    if(movimento <= 0){
        mensagem_concatenada += '</br>' + mgs_erro_rangeate_menor_que_rangede;
        retorno = false;
    }

    if((operacao == true) && movimento > pendentes){
        mensagem_concatenada += '</br>' + mgs_movimento_invalido_abastecimento;
        retorno = false;
    }

    if ((operacao == false) && movimento > recebidas) {
        mensagem_concatenada += '</br>' + mgs_movimento_invalido_desabastecimento;
        retorno = false;
    }
    
    return retorno;
}