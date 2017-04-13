<?php

include 'db.php';

if(strcasecmp('enviar', $_POST['acao']) == 0){
    
    $nome = $_POST['nome'];
    $mensagem = $_POST['mensagem'];
    $origem = $_POST['ip'];
    $html = '';
    
    	$sql = "INSERT INTO COMENTARIOS (NOME, MENSAGEM, DATA, ORIGEM) VALUES (:nome, :mensagem, NOW(), :origem)";
	try {
		$db = getDB();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("nome", $nome);
		$stmt->bindParam("mensagem", $mensagem);
		$stmt->bindParam("origem", $origem);
		$stmt->execute();
		$db = null;
                $html  =  'Nome: '.$nome;
                $html .=  "\n";
                $html .=  'Mensagem: '. $mensagem;
                $html .=  "\n\nObrigado pela atenção.";
        } catch(PDOException $e) {
	    $html = "Erro ao processar o comentário.";
	}
   echo $html;
}

if(strcasecmp('procurar', $_POST['acao']) == 0){
        
        $email = $_POST['email'];
        $html = '';
        $sql = "SELECT nome, mensagem, data, origem FROM COMENTARIOS WHERE nome = :email ORDER BY data";
	try {
		$db = getDB();
                $stmt = $db->prepare($sql);  
		$stmt->bindParam("email", $email);
		$stmt->execute();  
		$comments = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
                
	if(count($comments) > 0){            
            foreach ($comments as $value) {
            $html .= '<li><b>Data:</b>'.' '.$value->data.' - <b>Ip:</b>'.' '.$value->origem.'</li>';  
            $html .= '<li><b>Email:</b>'.' '.$value->nome.'</li>';
            $html .= '<li><b>Mensagem:</b>'.' '.$value->mensagem.'</li><br/>';  
            }
        }else{
           $html .= '<li>Sem Resultados.</li>';
        }
        
	} catch(PDOException $e) {
           $html = "Erro ao processar a busca.";
	}
        echo $html;
}

if(strcasecmp('listar', $_POST['acao']) == 0){
        
        $email = $_POST['email'];
        $html = '';
        $sql = "SELECT mensagem, data FROM COMENTARIOS ORDER BY data";
	try {
		$db = getDB();
        $stmt = $db->prepare($sql);  
		$stmt->execute();  
		$comments = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
                
	if(count($comments) > 0){            
            foreach ($comments as $value) {
            $html .= '<li><b>Data:</b>'.' '.$value->data.'</li>';  
            $html .= '<li><b>Mensagem:</b>'.' '.$value->mensagem.'</li><br/>';  
            }
        }else{
           $html .= '<li>Sem comentários. :P</li>';
        }
        
	} catch(PDOException $e) {
           $html = "Erro ao processar a lista.";
	}
        echo $html;
}
