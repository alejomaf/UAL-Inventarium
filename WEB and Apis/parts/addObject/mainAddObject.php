
<script>

window.onclick = function(event) {
  if (event.target == modalGroupObject||event.target == modal) {
    modalGroupObject.style.display = "none";
    modal.style.display = "none";
  }
}

</script>
<div class="row justify-content-center" id="mainAddObject">

</div>

<script>
var objetoT;
var selectObject=-1;
var nombreGrupoObjeto;

var marca="";
var modelo="";
var imagen="";
var ubicacion="";
var numeroObjetos=0;
var contadorObjetos=0;
//cargarGrupoObjetos();

insertCard($("#variableArea"), "images/essentials/inventario.png", null, null, {"Añadir inventario":"seleccionarObjeto(0);"},null);
insertCard($("#variableArea"), "images/essentials/fungible.png", null, null, {"Añadir fungible":"seleccionarObjeto(1);"},null);

function seleccionarObjeto(tipo){
    objetoT=tipo;
    cambiarObjeto("parts/addObject/selectCreateObject.php");
}

function crearSeleccionarObjeto(tipo){
    nombreGrupoObjeto=$('#grupoDeObjetos').val();
    selectObject= tipo;

    if(tipo==-1) cambiarObjeto("parts/addObject/uploadImage.php");
    else cambiarObjeto("parts/addObject/numberOfObjects.php");
}

function cogerImagen(){
    if($("#fotoDelObjeto").val()=="") return;
    
    imagen=$("#fotoDelObjeto").val();
    marca=$("#marcaDelObjeto").val();
    modelo=$("#modeloDelObjeto").val();

    crearGrupoDeObjetos();
}

async function crearGrupoDeObjetos(){
    var form_data = new FormData(document.getElementById("pasarDatos"));
    form_data.append("nombre",nombreGrupoObjeto);
    form_data.append("cantidadDisponible",0);
    form_data.append("cantidad",0);
    form_data.append("tipo", objetoT);

    await $.ajax({
        url : "apis/creacion/crearGrupoDeObjetos.php", 
        type : 'POST',
        data : form_data,
        cache : false,
        processData: false,  // tell jQuery not to process the data
        contentType: false,
        success : function(resp){
        }
    });

    await cambiarObjeto("parts/addObject/selectType.php");
}

function crearObjetos(){
    if($("#botonValor").val()=="") return;
    else {
        ubicacion=$("#botonValor").val();
        numeroObjetos=$("#quantity").val();
        crearObjeto();
    }
}

async function crearObjeto(){
    if(contadorObjetos!=numeroObjetos){
        contadorObjetos++;
        cambiarObjeto("parts/addObject/mejoras.php");
    }else{
        cambiarObjeto("parts/addObject/selectType.php");
    }
}

async function generar(){
    mejoras=$("#mejorasEnElEquipo").val();
    codigo= $("#codigo").val();
    if($("#codigo").val()=="") {console.log("falta el codigo"); return;}

    await $.post("apis/creacion/crearObjeto.php",{grupoObjetos: selectObject, ubicacion: ubicacion, mejorasEquipo:mejoras, codigo:codigo},
    function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
  });


    await crearObjeto();
}

async function saltarCreaciones(){
    for(i=0;i<numeroObjetos;i++){
    
    mejoras=$("#mejorasEnElEquipo").val();

    await $.post("apis/creacion/crearObjeto.php",{grupoObjetos: selectObject, ubicacion: ubicacion, mejorasEquipo:mejoras, codigo:-1});
    
    }

    await cambiarObjeto("parts/addObject/selectType.php");
}


</script>