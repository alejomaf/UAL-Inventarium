
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

function selectType(){
    limpiarZona($("#mainAddObject"));
    insertCard($("#mainAddObject"), "images/essentials/inventario.png", null, null, {"Añadir inventario":"seleccionarObjeto(0);"},null,22);
    insertCard($("#mainAddObject"), "images/essentials/fungible.png", null, null, {"Añadir fungible":"seleccionarObjeto(1);"},null,22);
}

selectType();

function seleccionarObjeto(tipo){
    objetoT=tipo;
    cambiarObjetoCreacion("parts/addObject/selectCreateObject.php");
}

async function crearSeleccionarObjeto(tipo){
    nombreGrupoObjeto=$('#grupoDeObjetos').val();
    selectObject= tipo;
    await quitarModal($('#botonEscritoGroupObject'))

    if(tipo==-1) await cambiarObjetoCreacion("parts/addObject/uploadImage.php");
    else await cambiarObjetoCreacion("parts/addObject/numberOfObjects.php");
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
    await principalGroupObject();

    limpiarZona($("#variableArea"));
    selectType();
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
        await cambiarObjetoCreacion("parts/addObject/mejoras.php");
    }else{
        numeroObjetos=0;
        contadorObjetos=0;
        await selectType();
    }
}

async function generar(){
    mejoras=await $("#mejorasEnElEquipo").val();
    codigo= await $("#codigo").val();
    organizativa= await $("#organizativa").val();
    etiqueta= await $("#etiqueta").val();
    observaciones= await $("#observaciones").val();
    if($("#codigo").val()=="") {console.log("falta el codigo "+etiqueta+" "+organizativa+" "+observaciones); return;}

    await $.post("apis/creacion/crearObjeto.php",{'grupoObjetos': selectObject, 'ubicacion': ubicacion, 'mejorasEquipo':mejoras, 'codigo':codigo, 'etiqueta':etiqueta, 'organizativa':organizativa, 'observaciones':observaciones});

    crearObjeto();
}

async function saltarCreaciones(){
    for(i=0;i<numeroObjetos;i++){
    
    mejoras=await $("#mejorasEnElEquipo").val();

    await realizarConsulta("apis/creacion/crearObjeto.php",{'grupoObjetos': selectObject, 'ubicacion': ubicacion, 'mejorasEquipo':mejoras, 'organizativa':0, 'codigo':-1});
    
    }

    numeroObjetos=0;
    contadorObjetos=0;
    await cselectType();
}

function cambiarObjetoCreacion(objeto){
    $("#mainAddObject").empty().hide().fadeIn('50');
    $("#mainAddObject").hide().load(objeto).fadeIn('300');
}

</script>