/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.

 * */
$(document).ready(function(){
   
   $('#formMensagem').submit(function (e){
    e.preventDefault();
    $('#acao').val('enviar');
    
    $.ajax({
    
        url: 'fachadamsg.php',
        type: 'post',
        dataType: 'html',
        data:{
            'acao': $('#acao').val(),
            'nome': $('#nome').val(),
            'mensagem': $('#mensagem').val(),
            'ip': $('#ip').val()
        }
            
    }).done(function (data){
        
        alert(data);
        
        $('#nome').val('');
        $('#mensagem').val('');
    });        
});
   
   
$('#frmProcura').submit(function (e){
    e.preventDefault();
    $('#cuca').val('procurar');
    
    $.ajax({
    
        url: 'fachadamsg.php',
        type: 'post',
        dataType: 'html',
        data:{
            'acao': $('#cuca').val(),
            'email': $('#email').val()
        }
            
    }).done(function (data){
        
        $('#lista').html(data);
        $('#cuca').val('');
        $('#email').val('');
    });        
}); 
   
$('#btnTodos').click(function (e){
    e.preventDefault();
    $('#listinha').val('listar');
    
    $.ajax({
    
        url: 'fachadamsg.php',
        type: 'post',
        dataType: 'html',
        data:{
            'acao': $('#listinha').val()
        }
            
    }).done(function (data){        
        $('#listaTodos').html(data);
        $('#listinha').val('');
    });        
});    
   
    
    
    
});



