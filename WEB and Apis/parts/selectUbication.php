<!-- The Modal -->
<div id="myModal" class="modal">
  <!-- Modal content -->
  <div id="botones" class="modal-content">
    <span class="close">&times;</span>
    <ul class="list-group">
    </ul>
  </div>

</div>
<script>
var response="";
var cuadro=document.getElementById("botones");
var boton=document.getElementById("botonEscrito");
var botonValor=document.getElementById("botonValor");
var objetos=[];

/**
    Definicion de atributos al empezar
 */

async function cogerAtributos(){

await $.post("apis/busqueda/buscarUbicacion.php",
{
    ubicacion:" ",
    edificio: " "
},
function(data,status){
    response=data;
});

}

async function descomponer(){
    await cogerAtributos();
    objeto= await JSON.parse(response);

    return objeto;
}


async function cargarEdificios(){
    cuadro.innerHTML="";

    cargarTitulo("Elegir edificio");

    var edificios=[];

    for(i=0;i<objetos.length;i++){
        if(!edificios.includes(objetos[i].edificio))
        edificios.push(objetos[i].edificio);
    }

    edificios.sort();

    for(i=0; i< edificios.length;i++){
        anadirObjeto(edificios[i],"seleccionarPlanta('"+edificios[i]+"')");
    }
}

function seleccionarPlanta(edificio){
    cuadro.innerHTML="";

    cargarTitulo("Elegir planta");
    
    var plantas=[];

    for(i=0;i<objetos.length;i++){
        if(objetos[i].edificio==edificio&&!plantas.includes(objetos[i].planta))
        plantas.push(objetos[i].planta);
    }

    plantas.sort(function(a, b){return a-b});

    for(i=0; i< plantas.length;i++){
        anadirObjeto(plantas[i],"seleccionarUbicacion('"+plantas[i]+"','"+edificio+"')");
    }
    anadirObjeto("Volver","cargarEdificios()");
}

function seleccionarUbicacion(planta, edificio){
    cuadro.innerHTML="";

    cargarTitulo("Elegir ubicación");
    
    var ubicaciones=[];

    for(i=0;i<objetos.length;i++){
        if(objetos[i].edificio==edificio&&objetos[i].planta==planta&&!ubicaciones.includes(objetos[i].ubicacion))
        ubicaciones.push(objetos[i].ubicacion);
    }

    ubicaciones.sort();

    for(i=0; i< ubicaciones.length;i++){
        anadirObjeto(ubicaciones[i],"$('#botonEscrito').val('"+ubicaciones[i]+"');modal.style.display = 'none';cargarEdificios();cogerId('"+ubicaciones[i]+"',"+planta+",'"+edificio+"');");
    }
    anadirObjeto("Volver","seleccionarPlanta('"+edificio+"')");
}

function cogerId(ubicacion, planta, edificio){
    for(i=0;i<objetos.length;i++){
        if(objetos[i].ubicacion==ubicacion&&objetos[i].planta==planta&&objetos[i].edificio==edificio) botonValor.setAttribute('value',objetos[i].idUbicacion);
    } 
}

function anadirObjeto(texto, accion){

    var fila=document.createElement("li");
    fila.textContent=texto;
    fila.setAttribute("class","list-group-item");
    fila.setAttribute("onclick",accion);
    cuadro.appendChild(fila);

}

function cargarTitulo(texto){

    var titulo=document.createElement("h3");
    titulo.textContent=texto;
    cuadro.appendChild(titulo);
}


async function principal(){
    //Hacer método en la clase main
    objetos=await descomponer();
    cargarEdificios();
}

principal();
</script>

<script>
  // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

</script>