<!-- The Modal -->
<div id="myModal" class="modal">
  <!-- Modal content -->
  <div id="contenido" class="modal-content">
    <ul id="lista" class="list-group">
    </ul>
  </div>
</div>

<script>
$("#botonEscrito").click(function(){$("#myModal").show()});

var response="";
var cuadro=document.getElementById("contenido");

async function cargarEdificios(){
    cuadro.innerHTML="";
    await cargarTitulo("Elegir edificio");
    var edificios=[];
    for(i=0;i<localizaciones.length;i++) if(!edificios.includes(localizaciones[i].edificio)) await edificios.push(localizaciones[i].edificio);
    edificios.sort();
    for(i=0; i< edificios.length;i++) await anadirObjeto(edificios[i],"seleccionarPlanta('"+edificios[i]+"')");
}

async function seleccionarPlanta(edificio){
    cuadro.innerHTML="";
    await cargarTitulo("Elegir planta");
    var plantas=[];
    for(i=0;i<localizaciones.length;i++) if(localizaciones[i].edificio==edificio&&!plantas.includes(localizaciones[i].planta)) await plantas.push(localizaciones[i].planta);
    plantas.sort(function(a, b){return a-b});
    for(i=0; i< plantas.length;i++) {
        await anadirObjeto(plantas[i],"seleccionarUbicacion('"+plantas[i]+"','"+edificio+"')");
    }
    await anadirObjeto("Volver","cargarEdificios()");
}

async function seleccionarUbicacion(planta, edificio){
    cuadro.innerHTML="";
    await cargarTitulo("Elegir ubicación");
    var ubicaciones=[];
    for(i=0;i<localizaciones.length;i++) if(localizaciones[i].edificio==edificio&&localizaciones[i].planta==planta&&!ubicaciones.includes(localizaciones[i].ubicacion)) await ubicaciones.push(localizaciones[i].ubicacion);
    ubicaciones.sort();
    for(i=0; i< ubicaciones.length;i++) await anadirObjeto(ubicaciones[i],"$('#botonEscrito').val('"+ubicaciones[i]+"');$('#myModal').hide();cargarEdificios();cogerId('"+ubicaciones[i]+"',"+planta+",'"+edificio+"');");
    await anadirObjeto("Volver","seleccionarPlanta('"+edificio+"')");
}

function cogerId(ubicacion, planta, edificio){
    for(i=0;i<localizaciones.length;i++) if(localizaciones[i].ubicacion==ubicacion&&localizaciones[i].planta==planta&&localizaciones[i].edificio==edificio) botonValor.setAttribute('value',localizaciones[i].idUbicacion);
}

async function anadirObjeto(texto, accion){
    var fila=document.createElement("li");
    fila.textContent=texto;
    fila.setAttribute("class","list-group-item");
    fila.setAttribute("onclick",accion);
    await $("#contenido").append(fila);
}

async function cargarTitulo(texto){
    var titulo=document.createElement("h3");
    titulo.textContent=texto;
    await cuadro.appendChild(titulo);
}


async function principal(){
    localizaciones=await realizarConsulta("apis/busqueda/buscarUbicacion.php",{idUbicacion:"%"});
    await cargarEdificios();
}

principal();

</script>
