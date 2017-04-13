<html><head>
    <link rel="icon" href="favicon.ico">
    <title>Artístico - Rafael WMS' HP</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css\pingendo.css" rel="stylesheet" type="text/css">
  </head><body id="bodypage">
    <div class="navbar navbar-default navbar-static-top" id="mainmenu">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-ex-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand"><span>Rafael WMS' HP</span></a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-ex-collapse">
          <ul class="nav navbar-nav navbar-right" id="navigation">
            <li id="menu_apresentacao">
              <a href="index.html"><i class="fa fa-fw fa-home"></i>Apresentação</a>
            </li>
            <li id="menu_prof">
              <a href="profissional.html"><i class="fa fa-fw fa-briefcase"></i>&nbsp;Profissional</a>
            </li>
            <li class="">
              <a href="artistico.html"><i class="fa fa-fw fa-music"></i>&nbsp;Artístico</a>
            </li>
            <li class="active">
              <a href="contato.php"><i class="fa fa-fw fa-envelope"></i>&nbsp;Contato</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section" id="apresentacao">
      <div class="container">
        <div class="row">
          <h2 class="text-warning">Contato</h2>
          <p class="lead">Reserve um pequeno instante para deixar uma solicitação, advertência,
            elogio. Sua opnião é importante, contribuindo para nosso crescimento em
            conjunto. Muito grato pela sua visita. Atenciosamente: Rafael WMS.</p>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">
            <a class="btn btn-warning" data-toggle="modal" data-target="#mdlEnviar" id="btnModalEnviar"><i class="fa fa-fw fa-pencil-square"></i>Escrever Comentário</a>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <a class="btn btn-warning" data-toggle="modal" data-target="#mdlProcura"><i class="fa fa-fw fa-search"></i>Meus Comentários</a>
          </div>
        </div>
      </div>
    </div>
    <div class="section text-center">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <a class="btn btn-warning" data-toggle="modal" data-target="#mdlTodos" id="btnTodos"><i class="fa fa-fw fa-eye"></i>&nbsp;Todos os Comentários</a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="mdlEnviar">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title text-warning">Enviar comentário</h4>
          </div>
          <div class="modal-body">
            <p class="text-muted">ATENÇÃO: Seu e-mail não será utilizado para qualquer tipo de divulgação.</p>
            <form role="form" class="text-right" id="formMensagem">
              <div class="form-group has-warning">
                <input class="form-control" id="nome" placeholder="Digite seu email..." type="email">
              </div>
              <div class="form-group has-warning has-feedback">
                <input class="form-control" id="mensagem" placeholder="Digite uma mensagem..." type="text">
              </div>
              <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
              <input type="hidden" name="ip" value="144.36.76.65" id="ip" --="">
              <input type="hidden" id="acao">
              <input type="submit" class="btn btn-warning" value="Enviar Comentário">
              </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="mdlProcura">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title text-warning">Visualizar Comentários</h4>
          </div>
          <div class="modal-body">
            <form role="form" id="frmProcura">
              <input type="hidden" id="cuca">
              <div class="form-group">
                <div class="input-group">
                  <input type="email" class="form-control" placeholder="Digite seu email..." id="email">
                  <span class="input-group-btn">
                    <input class="btn btn-warning" type="submit" value="Procurar">
                  </span>
                </div>
              </div>
            </form>
            <ol class="list-unstyled text-muted" id="lista"></ol>
          </div>
          <div class="modal-footer">
            <a class="btn btn-default" data-dismiss="modal">Fechar</a>
          </div>
        </div>
      </div>
    </div>
    <footer class="section section-warning">
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <h1>Rafael WMS</h1>
            <p>2015 © By Rafael WMS&nbsp;</p>
          </div>
          <div class="col-sm-6">
            <p class="text-muted text-right">
              <br>Encontre-me nas Redes Sociais:
              <br>
            </p>
            <div class="row">
              <div class="col-md-12 hidden-xs text-right">
                <a href="https://twitter.com/rafaelwmsa"><i class="fa fa-3x fa-fw fa-twitter-square text-muted"></i></a>
                <a href="https://br.linkedin.com/pub/rafael-wanderley-marques-de-sá/50/76/613"><i class="fa fa-3x fa-fw text-muted fa-linkedin-square"></i></a>
                <a href="https://www.facebook.com/rafael.wms"><i class="fa fa-3x fa-fw text-muted edin-square fa-facebook-square"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <div class="modal fade" id="mdlTodos">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title text-warning">Todos os Comentários</h4>
          </div>
          <div class="modal-body">
              <input type="hidden" id="listinha">
            <p class="text-muted">
              <ul id="listaTodos" class="text-muted">

              </ul></p>
          </div>
          <div class="modal-footer">
            <a class="btn btn-default" data-dismiss="modal">Fechar</a>
          </div>
        </div>
      </div>
    </div>
    <script type="text/javascript" src="js/wmsenvio.js"></script>

</body></html>