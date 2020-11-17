<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <h3 id="accionModal"></h3>
    <input type="text" class="form-control" oninput="actualizarBusqueda()" id="nombreUbicacion" placeholder="Nombre de la ubicación">
    <div id="contenido">
        <ul id="lista" class="list-group">
        </ul>
    </div>

    <button type="button" id="crearUbicacion" onclick="crearUbicacion()" class="btn btn-primary btn-block">Crear ubicación</button>
   
   </div>
</div>

<script>
var activo = 1;
var activoCrear = false;
var edificioAct = "";
var plantaAct = "";
var edificios=[];
var plantas=[];
var ubicaciones=[];

var response="";
var cuadro=document.getElementById("lista");

//ORDENACIÓN
async function actualizarBusqueda(){
    if(activoCrear==true) return;
    switch(activo){
        case 1:
            cogerEdificios(); 
            break;
        case 2:
            cogerPlantas();
            break;
        case 3:
            cogerUbicaciones();
            break;
    }
}

async function cogerEdificios(){
    cuadro.innerHTML="";
    for(i=0; i< edificios.length;i++) if((edificios[i].toLowerCase()).search($("#nombreUbicacion").val().toLowerCase())!=-1){
        await anadirObjeto(edificios[i],"seleccionarPlanta('"+edificios[i]+"')");
    }
}
async function cogerPlantas(){
    cuadro.innerHTML="";
    for(i=0; i< plantas.length;i++) if((plantas[i].toLowerCase()).search($("#nombreUbicacion").val().toLowerCase())!=-1){
        await anadirObjeto(plantas[i],"seleccionarUbicacion('"+plantas[i]+"','"+edificioAct+"')");
    }
    await anadirObjeto("Volver","cargarEdificios()");
}
async function cogerUbicaciones(){
    cuadro.innerHTML="";
    for(i=0; i< ubicaciones.length;i++) if((ubicaciones[i].toLowerCase()).search($("#nombreUbicacion").val().toLowerCase())!=-1){
        await anadirObjeto(ubicaciones[i],"actualizarBoton('"+ubicaciones[i]+"');cargarEdificios();cogerId('"+ubicaciones[i]+"','"+plantaAct+"','"+edificioAct+"');");
    }
    await anadirObjeto("Volver","seleccionarPlanta('"+edificioAct+"')");
}



async function cargarEdificios(){
    $("#nombreUbicacion").val("");
    activo = 1;
    activoCrear = false;
    edificioAct = "";
    plantaAct = "";
    cuadro.innerHTML="";
    edificios=[];

    await cargarTitulo("Crear o elegir edificio");
    if(localizaciones.length==0){
        await cargarSubtitulo("//No hay ubicaciones");
        return;
    }
    for(i=0;i<localizaciones.length;i++) if(!edificios.includes(localizaciones[i].edificio)) await edificios.push(localizaciones[i].edificio);
    edificios.sort();
    for(i=0; i< edificios.length;i++) await anadirObjeto(edificios[i],"seleccionarPlanta('"+edificios[i]+"')",);
}


async function seleccionarPlanta(edificio){
    activo = 2;
    edificioAct = edificio;

    cuadro.innerHTML="";
    if(activoCrear==true) {
        await cargarTitulo("Crear planta");
        await $("#lista").append(document.createElement("br"));
        return;
    }
    else await cargarTitulo("Crear o elegir planta");
    plantas = [];

    for(i=0;i<localizaciones.length;i++) if(localizaciones[i].edificio==edificio&&!plantas.includes(localizaciones[i].planta)) await plantas.push(localizaciones[i].planta);
    
    plantas.sort(function(a, b){return a-b});
    for(i=0; i< plantas.length;i++) {
        await anadirObjeto(plantas[i],"seleccionarUbicacion('"+plantas[i]+"','"+edificio+"')");
    }
    await anadirObjeto("Volver","cargarEdificios()");
}

async function seleccionarUbicacion(planta, edificio){
    activo = 3;
    edificioAct = edificio;
    plantaAct = planta;

    cuadro.innerHTML="";
    if(activoCrear==true) {
        await cargarTitulo("Crear ubicación"); 
        await $("#lista").append(document.createElement("br"));
        return;
    }
    else await cargarTitulo("Crear o elegir ubicación");
    ubicaciones = [];

    for(i=0;i<localizaciones.length;i++) if(localizaciones[i].edificio==edificio&&localizaciones[i].planta==planta&&!ubicaciones.includes(localizaciones[i].ubicacion)) await ubicaciones.push(localizaciones[i].ubicacion);
    ubicaciones.sort();
    for(i=0; i< ubicaciones.length;i++) await anadirObjeto(ubicaciones[i],"actualizarBoton('"+ubicaciones[i]+"');cargarEdificios();cogerId('"+ubicaciones[i]+"','"+planta+"','"+edificio+"');");
    await anadirObjeto("Volver","seleccionarPlanta('"+edificio+"')");
}

async function cogerId(ubicacion, planta, edificio){
    await $("#myModal").modal("hide");
    for(i=0;i<localizaciones.length;i++) if(localizaciones[i].ubicacion==ubicacion&&localizaciones[i].planta==planta&&localizaciones[i].edificio==edificio) await botonValor.setAttribute('value',localizaciones[i].idUbicacion);
}

async function anadirObjeto(texto, accion){
    var fila=document.createElement("li");
    fila.textContent=texto;
    fila.setAttribute("class","list-group-item");
    fila.setAttribute("onclick",accion);
    await $("#lista").append(fila);
}

async function cargarTitulo(texto){
    $("#accionModal").text(texto);
}

async function cargarSubtitulo(texto){
    var titulo=document.createElement("h5");
    titulo.textContent=texto;
    await $("#lista").append(document.createElement("br"));
    await $("#lista").append(titulo);
    await $("#lista").append(document.createElement("br"));
}


async function principal(valor){
    localizaciones=await realizarConsulta("apis/busqueda/buscarUbicacion.php",{idUbicacion:"%"});
    if(valor) await cargarEdificios();
}

async function crearUbicacion(){
    activoCrear = true;
    switch(activo){
        case 1:
        if($("#nombreUbicacion").val()=="") return;
        else{
            seleccionarPlanta($("#nombreUbicacion").val()); 
            $("#nombreUbicacion").val("");
        }
            break;
        case 2:
        if($("#nombreUbicacion").val()=="") return;
        else{
            seleccionarUbicacion($("#nombreUbicacion").val(), edificioAct); 
            $("#nombreUbicacion").val("");
        }
            break;
        case 3:
        if($("#nombreUbicacion").val()=="") return;
        else {
            await generarNuevaUbicacion();
        }
            break;
    }
}

async function generarNuevaUbicacion(){
    await $.post("apis/creacion/crearUbicacion.php",{'building': edificioAct, 'floor': plantaAct, 'location': $("#nombreUbicacion").val()});
            actualizarBoton($("#nombreUbicacion").val());
            await principal(false);
            await cogerId($("#nombreUbicacion").val(),plantaAct, edificioAct);
}

async function actualizarBoton(ubicacionAct){
    $('#botonEscrito').text(edificioAct+" | "+plantaAct+" | "+ubicacionAct);
}

principal(true);

</script>
