function anadirColumna(){
    if(objetoT!=0) return;
  
    contador++;
  
    var fila=document.createElement("input");
    fila.setAttribute("type","text");
    fila.setAttribute("class","form-control");
    fila.setAttribute("placeholder","Ingrese el código de inventario del objeto "+contador);
    fila.setAttribute("id","filaInventario"+contador);
    fila.required=true;
  
    codigoInventario.appendChild(fila);
  }
  
function borrarColumna(){
    if(objetoT!=0) return;
    if(contador==1) return;

    var aux=document.getElementById("filaInventario"+contador)
    codigoInventario.removeChild(aux);

    contador--;
}

function resetValues(){

formularioCrearObjeto.setAttribute("style","display:block");

    $("#fotoDelObjeto").val("");
    $("#botonEscrito").val("");
    $("#botonValor").val("");
    $("#botonEscritoGroupObject").val("");
    $("#botonValorGroupObject").val("");
    $("#marcaDelObjeto").val("");
    $( "#modeloDelObjeto" ).val("");
    $("#mejorasEnElEquipo").val("");
    codigoInventario.innerHTML="";
    postSeleccion.setAttribute("style","display:none");

    numeroObjetos.value=1;
    contador=0;

    
    cargarGrupoObjetos();
}


function seleccionarInventario(){
    objetoT=0;
    resetValues();

    codigoInventario.setAttribute("type","show");
    botonInventario.disabled=true;
    botonFungible.disabled=false;
    anadirColumna();
}

function seleccionarFungible(){
    objetoT=1;
    resetValues();

    codigoInventario.setAttribute("type","hidden");
    botonInventario.disabled=false;
    botonFungible.disabled=true;
}

function crearObjeto(){
    postSeleccion.setAttribute("style","");
    crearObjetos=1;
}
function seleccionarObjeto(){
    postSeleccion.setAttribute("style","display:none");
    crearObjetos=0;
}