var paginaActual=0;
var numPaginas=0;

async function realizarConsulta(ubicacion, consulta){
    await $.post(ubicacion, consulta,
    function(data,status){
      //console.log(data);
      if(data==""||data==null||data=="Fallo") datosProcesados=null;
      else datosProcesados= JSON.parse(data);
    });
    if(datosProcesados==null) return null;
    return datosProcesados;
  }

async function insertCard(ubicacion, imagen, titulo, valores, botones, etiqueta, tamano){
  
  var marco= document.createElement("div");
  marco.setAttribute("class","mr-2 ml-2 py-3");
  
  var marco1= document.createElement("div");
  marco1.setAttribute("class","card border rounded px-3 py-3");

  if(tamano==null){
      marco.setAttribute("style","width: 18rem;");
      marco1.setAttribute("style","width: 18rem;background-color:#FDF7FF;");
  }else{
    marco.setAttribute("style","width: "+tamano+"rem;");
    marco1.setAttribute("style","width: "+tamano+"rem;background-color:#FDF7FF;");
  }

  //Insert image
  if(imagen!=null){
    var marco2= document.createElement("div");
    marco2.setAttribute("style","width= 100%; height: 230px;");
    var imagenAux= document.createElement("img");
    imagenAux.setAttribute("class","card-img-top rounded-circle");

    imagenAux.setAttribute("src",imagen);
    marco2.append(imagenAux);
    marco1.append(marco2);
  }

  //Insert title
  if(titulo!=null) {
    var marco3= document.createElement("div");
    marco3.setAttribute("style","width= 100%;");
    marco3.setAttribute("class","card-body list-group-item-primary border");
    var tituloMarco3= document.createElement("h5");
    if(titulo[1]!=null){
      tituloMarco3.setAttribute("style","cursor:pointer");
      tituloMarco3.setAttribute("class","card-title text-dark text-center");
      tituloMarco3.setAttribute("onclick", titulo[1]);
    }
    tituloMarco3.textContent= titulo[0];
    marco3.append(tituloMarco3);    
    marco1.append(marco3);
  }

  //Insert list
  if(valores!=null){
    var lista= document.createElement("ul");
    lista.setAttribute("class","list-group list-group-flush");
    for(i=0;i<valores.length;i++){
      var barra=document.createElement("li");
      barra.setAttribute("class","list-group-item bg-light");
      if(valores[i].includes(":",0)){
        valoresDivididos = valores[i].split(":");
        if(valoresDivididos.length>2) {
          var negrita = document.createElement("b");
          negrita.textContent = valoresDivididos[0];
          var textoNormal = document.createElement("a");
          textoNormal.textContent = ": "+valores[i].substring(valoresDivididos[0].length+1,valores[i].length+1);
          barra.append(negrita);
          barra.append(textoNormal);
        }else{
          var negrita = document.createElement("b");
          negrita.textContent = valoresDivididos[0];
          var textoNormal = document.createElement("a");
          textoNormal.textContent = ": " + valoresDivididos[1];
          barra.append(negrita);
          barra.append(textoNormal);
        }
      }else{
        barra.textContent=valores[i];
      }
      lista.append(barra);
    }  
    marco1.append(lista);
  }

  //Insert buttons
  if(botones!=null){
    var marco4= document.createElement("div");
    marco4.setAttribute("class","card-body");

    for(const [key, value] of Object.entries(botones)){
      var botonAux= document.createElement("button");
      botonAux.textContent= key;
      botonAux.setAttribute("onclick", value);
      botonAux.setAttribute("class","btn btn-block btn-primary");
      marco4.append(botonAux);
    }

    marco1.append(marco4);
  }

  //Insert tag
  if(etiqueta!=null){
    var marco5=document.createElement("li");
    marco5.setAttribute("class","list-group-item list-group-item-primary font-weight-bold text-center");
    marco5.textContent=etiqueta;
    marco1.append(marco5);
  }

  marco.append(marco1);
  ubicacion.append(marco);
}

async function quitarModal(modalObject){
  await modalObject.modal('hide');
  await $(".modal-backdrop").remove();
  await $("body").removeClass("modal-open");
}

async function insertCardRequest(ubicacion, imagen, titulo, botones, etiqueta, tamano){

  var marco= document.createElement("div");
  marco.setAttribute("class","mr-2 ml-2 py-3");
  
  var marco1= document.createElement("div");
  marco1.setAttribute("class","card border rounded px-3 py-3");

  if(tamano==null){
      marco.setAttribute("style","width: 18rem;");
      marco1.setAttribute("style","width: 18rem;background-color:#FDF7FF;");
  }else{
    marco.setAttribute("style","width: "+tamano+"rem;");
    marco1.setAttribute("style","width: "+tamano+"rem;background-color:#FDF7FF;");
  }

  //Insert image
  if(imagen!=null){
    var marco2= document.createElement("div");
    marco2.setAttribute("style","width= 100%; height: 230px;");
    var imagenAux= document.createElement("img");
    imagenAux.setAttribute("class","card-img-top rounded-circle");

    imagenAux.setAttribute("src",imagen);
    marco2.append(imagenAux);
    marco1.append(marco2);
  }

  //Insert title
  if(titulo!=null) {
    var marco3= document.createElement("div");
    marco3.setAttribute("style","width= 100%;");
    marco3.setAttribute("class","card-body list-group-item-primary border");
    var tituloMarco3= document.createElement("h5");
    if(titulo[1]!=null){
      tituloMarco3.setAttribute("style","cursor:pointer");
      tituloMarco3.setAttribute("class","card-title text-dark text-center");
      tituloMarco3.setAttribute("onclick", titulo[1]);
    }
    tituloMarco3.textContent= titulo[0];
    marco3.append(tituloMarco3);    
    marco1.append(marco3);
  }

  //Insert buttons
  if(botones!=null){
    for(const [key, value] of Object.entries(botones)){
      var lista= document.createElement("ul");
      lista.setAttribute("class","list-group list-group-flush");
      
      for(const [key2, value2] of Object.entries(value)){
        var barra=document.createElement("li");
        barra.setAttribute("class","list-group-item active");
        barra.textContent=key2;
        lista.append(barra);
        var barraAux=document.createElement("li");
        var barra=document.createElement("a");
        barraAux.setAttribute("class","list-group-item bg-light");
        barra.textContent=value2[0][0];
        barra.setAttribute("href", value2[0][1]);
        barraAux.append(barra);
        lista.append(barraAux);
      }
      marco1.append(lista);
    }
  }

  //Insert tag
  if(etiqueta!=null){
    var marco5=document.createElement("li");
    marco5.setAttribute("class","list-group-item list-group-item-primary font-weight-bold text-center");
    marco5.textContent=etiqueta;
    marco1.append(marco5);
  }

  marco.append(marco1);
  ubicacion.append(marco);

}

/*function insertarPaginacion(ubicacion, totalObjetos, objetosPorPagina){
  var navigator= document.createElement("nav");
  var navigatorCenter= document.createElement("ul");
  navigatorCenter.setAttribute("class","pagination justify-content-center");

  if(totalObjetos%objetosPorPagina==0) numPaginas=totalObjetos/objetosPorPagina;
  else numPaginas=totalObjetos/objetosPorPagina+1;

  for(g=0; g<numPaginas;g++){
    if(g==0){
      var pagina= document.createElement("li");
      pagina.setAttribute("class","page-item disabled");
      var texto=document.createElement("a");
      texto.setAttribute("class","page-link");
      texto.setAttribute("style","cursor:pointer");
      texto.innerHTML = "Página anterior";
      pagina.append(texto);
      CONTINUAR HACIENDO!!!!!
    }

  }

  var marco1= document.createElement("div");
  marco1.setAttribute("class","card border rounded px-3 py-3");

  <nav>
  <ul class="pagination justify-content-center">
    <li class="page-item disabled">
      <a class="page-link" href="#" tabindex="-1">Página anterior</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Página siguiente</a>
    </li>
  </ul>
</nav>
}*/