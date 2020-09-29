<form id="redireccion" action="user.php" name="redireccion" method="post" style="display:none;"><input id="valorRedireccion" type="text" name="page" value="" /></form>
<script>
var redireccionPagina=document.getElementById("redireccion");
var tipoPagina=document.getElementById("valorRedireccion");
window.onhashchange = function () {
    switch(location.hash){
        case "#anadirObjeto": 
            break;
        case "#objetos":
            break;
        case "#solicitudes":
            break;
        case "#usuarios":
            break;
        case "#equiposConfigurados":
            break;
        case "#panelAdministrador":
            break;
    }
    if (location.hash === "#anadirObjeto") {
        $('#valorRedireccion').val(0);
        redireccionPagina.submit();
    }
};
</script>
<?php 
if(isset($_POST['page'])&&$_POST['page']!=""){ 

    $pagina=$_POST['page'];    

    switch($pagina){

        case 0:
            include "parts/addObject.php";
        break;
        case 1:
        break;
        case 2:
        break;
        case 3:
        break;
        case 4:
        break;
        case 5:
        break;
    }
} else include "parts/addObject.php";
?>