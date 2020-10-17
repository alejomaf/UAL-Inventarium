
<script>

window.onclick = function(event) {
  if (event.target == modalGroupObject||event.target == modal) {
    modalGroupObject.style.display = "none";
    modal.style.display = "none";
  }
}

</script>
<div class="d-sm-inline-flex" id="mainAddObject">

</div>

<script>
var objetoT;
var selectObject=-1;
var nombreGrupoObjeto;

var marca="";
var modelo="";
var imagen="";
//cargarGrupoObjetos();

function cambiarObjeto(objeto){
    $("#mainAddObject").empty();
    $("#mainAddObject").load(objeto);
}

cambiarObjeto("parts/addObject/selectType.php");

function seleccionarObjeto(tipo){
    objetoT=tipo;
    cambiarObjeto("parts/addObject/selectCreateObject.php");
}

function crearSeleccionarObjeto(tipo){
    nombreGrupoObjeto=$('#grupoDeObjetos').val();

    if(tipo==-1)  cambiarObjeto("parts/addObject/uploadImage.php");
    else  cambiarObjeto("parts/addObject/numberOfObjects.php");
}

function cogerImagen(){
    if($("#fotoDelObjeto").val()=="") return;
    
    imagen=$("#fotoDelObjeto").val();
    marca=$("#marcaDelObjeto").val();
    modelo=$("#modeloDelObjeto").val();

    crearGrupoDeObjetos();
}

function crearGrupoDeObjetos(){
    var form_data = new FormData(document.getElementById("pasarDatos"));
    form_data.append("nombre",nombreGrupoObjeto);
    form_data.append("cantidadDisponible",0);
    form_data.append("cantidad",0);
    form_data.append("tipo", objetoT);

    $.ajax({
        url : "apis/creacion/crearGrupoDeObjetos.php", 
        type : 'POST',
        data : form_data,
        cache : false,
        processData: false,  // tell jQuery not to process the data
        contentType: false,
        success : function(resp){
        }
    });
}

function crearObjetos(){
    if($("#botonValor").val()=="") return;
    else {
        
    }
}



</script>