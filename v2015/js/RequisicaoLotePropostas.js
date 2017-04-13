//#Constantes
var mgs_erro_sem_filtro = 'É necessário selecionar ao menos um campo de filtro.';
var mgs_sem_resultados = '<div class="status-resultado-busca" id="semresultado">Não há resultados.</div>';
var msg_lote_suspenso_ou_cancelado = 'Não é possível obter registros de abastecimento de lotes com status Suspenso ou Cancelado.'

//#Inicialização da ConsultarLotesPropostas
$(document).ready(function () {
    $('#DataCriacao').mask('99/99/9999');
    $("#DataCriacao").datepicker({ showOn: "both", dateFormat: "dd/mm/yy" });

    $('#DetalheLote').hide();

    DesabilitaBotoes();

    $("img[name*='btnDetalheLote']").die('click').live('click', function () {
        var Tr = $(this).closest("tr");        
        var idLote = $(Tr).find("td").eq(1).text();
        Detalhar(idLote);
    });

    $('#btnOkDetalheLote').die('click').live('click', function () {
        $("#DetalheLote").dialog('destroy');
    });

    $("img[name*='btnAbastecimentoLote']").die('click').live('click', function () {
        var Tr = $(this).closest("tr");
        var st = $(Tr).find("td").eq(9).text();
        if (st == 'Liberado' || st == 'Reativado') {
            var idLote = $(Tr).find("td").eq(1).text();
            window.location.href = "../Abastecimento/index?idLote=" + idLote;
        }
        else {
            $("#Loading").show();
            $.MessageBoxOK({ mensagem: msg_lote_suspenso_ou_cancelado });
            $("#Loading").fadeOut();
        }
    });

    $("img[name*='btnRetiradaProdutor']").die('click').live('click', function () {
        var Tr = $(this).closest("tr");
        var st = $(Tr).find("td").eq(9).text();
        if (st == 'Liberado' || st == 'Reativado') {
            var idLote = $(Tr).find("td").eq(1).text();
            window.location.href = "../Estoque/RegistrarRetirada?lote=" + idLote;
        }
    });

    $('#btnPesquisar').die('click').live("click", function () {
        if (ValidarPesquisaSemFiltro()) {
            Pesquisar();
        } else {
            CriticarAusenciaDeFiltro();
        }
    });

    $('#btnSuspenderLotes').die('click').live("click", function () {
        AlterarStatus(2);
    });

    $('#btnReativarLotes').die('click').live("click", function () {
        AlterarStatus(0);
    });

    $('#btnCancelarLotes').die('click').live("click", function () {
        AlterarStatus(3);
    });

    function HabilitarBotoes(habilitar, status) {
        switch (status) {
            case "Reativado":
                if (habilitar) {
                    $('#btnSuspenderLotes').removeAttr('disabled');
                    $('#btnCancelarLotes').removeAttr('disabled');
                } else {
                    $('#btnSuspenderLotes').attr('disabled', 'disabled');
                    $('#btnCancelarLotes').attr('disabled', 'disabled');
                }
                break;
            case "Suspenso":
                if (habilitar) {
                    $('#btnReativarLotes').removeAttr('disabled');
                    $('#btnCancelarLotes').removeAttr('disabled');
                } else {
                    $('#btnReativarLotes').attr('disabled', 'disabled');
                    $('#btnCancelarLotes').attr('disabled', 'disabled');
                }
                break;
            case "Liberado":
                if (habilitar) {
                    $('#btnSuspenderLotes').removeAttr('disabled');
                    $('#btnCancelarLotes').removeAttr('disabled');
                } else {
                    $('#btnSuspenderLotes').attr('disabled', 'disabled');
                    $('#btnCancelarLotes').attr('disabled', 'disabled');
                }
        }
    }


    $('.checkLote').die("click").live("click", function () {

        var Tr = $(this).closest("tr");
        var status = $(Tr).find("td").eq(9).text()
        var bReturn = true;

        if ($(this).is(":checked")) {
            if (StatusSelecionado == "") {
                StatusSelecionado = status;
            }
            if (StatusSelecionado != status) {
                $.MessageBoxOK({ mensagem: 'Lote selecionado com status diferente dos demais.' });
                bReturn = false;
            }
        }

        if (bReturn) {
            SalvarCheckBox(this);
            if (!($(this).is(":checked"))) {
                if (IDs.length <= 0) {
                    StatusSelecionado = "";
                    HabilitarBotoes(false, status);
                }
            } else {
                HabilitarBotoes(true, status);
            }
        } else {
            return false;
        }

    });

    ValidacoesView()

});


//#Seleção dos Lotes no Grid
var IDs = new Array();
var StatusSelecionado = "";

function ManterCheckboxSelecionadoAposPaginacao(idDomCheckbox, array) {
    for (var i = 0; i < array.length; i++) {
        $("#" + idDomCheckbox + array[i]).attr("checked", true);
    }
}

function SalvarCheckBox(obj) {
    var id = ($(obj).attr("Id")).split("_")[1];
    if ($(obj).is(":checked")) {
        ArmazenarIds(id, IDs);
    } else {
        RemoverIds(id, IDs);
    }
}

function MarcarTodosCheckbox(classeDomCheckbox) {
    $(classeDomCheckbox).each(function () {
        $(this).attr('checked', true);
    })
}

function DesmarcarTodosCheckbox(classeDomCheckbox) {
    $(classeDomCheckbox).each(function () {
        $(this).attr('checked', false);
    })
}

function ArmazenarIds(id, array) {
    var qtdRegistro = array.length;
    var registroExiste = false;
    if (qtdRegistro > 0) {
        for (var i = 0; i < qtdRegistro; i++) {
            if (array[i] == id) {
                registroExiste = true;
                break;
            }
        }
        if (!registroExiste) {
            array.push(id);
        }
    } else {
        array.push(id);
    }
}

function RemoverIds(id, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == id) {
            array.splice(i, 1);
        }
    }
}


//#Ações da View
function AlterarStatus(status) {

    $("#Loading").show();
    document.body.style.cursor = 'wait';

    var url = "";
    switch (status) {
        case 0: //Reativado
            url = "ReativarLotesPropostas";
            break;
        case 2: //Suspenso
            url = "SuspenderLotesPropostas";
            break;
        case 3: //Cancelado
            url = "CancelarLotesPropostas";
            break;
    }

    var dados = JSON.stringify({ IdsLotes: IDs });

    $.ajax({
        url: "../LotePropostas/" + url,
        dataType: "json",
        data: dados,
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        async: true,
        cache: false,
        success: function (data) {

            if (data.Result == undefined) {
                $.MessageBoxOK({ mensagem: data.responseText });
            } else {
                $.MessageBoxOK({ mensagem: data.Result });
            }

            Pesquisar();

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


function Pesquisar() {
    $("#Loading").show();
    document.body.style.cursor = 'wait';

    IDs = new Array();

    $.ajax({
        url: "../LotePropostas/ConsultarLote",
        data: $('#formConsultarLotesPropostas').serialize(),
        type: "GET",
        async: true,
        cache: false,
        success: function (data) {
            $('#gridResultado').html(data);
            IDs = new Array();
            StatusSelecionado = "";
            DesabilitaBotoes();
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

function CriticarAusenciaDeFiltro() {
    var data = mgs_sem_resultados;
    $('#gridResultado').html(data);
    IDs = new Array();
    StatusSelecionado = "";
    $.MessageBoxOK({ mensagem: mgs_erro_sem_filtro });
}


function Detalhar(idLote) {
    $("#Loading").show();
    document.body.style.cursor = 'wait';

    $.ajax({
        url: "../LotePropostas/DetalharLote?idLotePropostas=" + idLote,
        data: $('#frmInfoLote').serialize(),
        type: "GET",
        async: true,
        cache: false,
        success: function (data) {

            $('#DetalheLote').html(data);
            $('#DetalheLote :text').attr('readonly', true);
            $('#DetalheLote').dialog({
                modal: true,
                width: 600,
                resizable: false,
                title: "Detalhes do Lote",
            })

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

function DesabilitaBotoes() {
    $('#btnSuspenderLotes').attr('disabled', 'disabled');
    $('#btnReativarLotes').attr('disabled', 'disabled');
    $('#btnCancelarLotes').attr('disabled', 'disabled');
}


//Validações da View
function ValidacoesView() {

    var validacao = new Validacao();

    $('#DataCriacao').val('');
    $('#RangeDe').val('');
    $('#RangeAte').val('');
    $('#Id').val('');

    function LimparTextBox(elementoDom) {
        $(elementoDom).val('');
    }


    $('#Descricao').keypress(function (e) {
        if (this.value.length >= 50) {
            return false;
        }
    });

    $('#CodigoRM').keypress(function (e) {
        if (this.value.length >= 20) {
            return false;
        }
    });

    $(".valor").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
}

function ValidarPesquisaSemFiltro() {
    var retorno = true;

    var idlote = $('#Id').val();
    var statuslote = $('#StatusLote').val();
    var idfornecedor = $('#IdFornecedor').val();
    var idoperadora = $('#IdOperadora').val();
    var idgestora = $('#IdGestora').val();
    var rangede = $('#RangeDe').val();
    var rangeate = $('#RangeAte').val();
    var datacriacao = $('#DataCriacao').val();
    if (
        (idlote == null || idlote <= 0) &&
        (statuslote == 4) &&
        (idfornecedor <= 0) &&
        (idoperadora <= 0) &&
        (idgestora <= 0) &&
        (rangede == null || rangede <= 0) &&
        (rangeate == null || rangeate <= 0) &&
        (datacriacao == null || datacriacao == '')
       ) {
        retorno = false;
    }
    return retorno;
}