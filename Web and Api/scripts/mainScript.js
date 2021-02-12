var paginaActual = 0;
var numPaginas = 0;

async function realizarConsulta(ubicacion, consulta) {
  var datosProcesados = null;
  if (consulta == null) {
    await $.post(ubicacion,
      function (data, status) {
        //console.log(data);
        if (data == "" || data == null || data == "Fallo") datosProcesados = null;
        else datosProcesados = JSON.parse(data);
      });
  } else {
    await $.post(ubicacion, consulta,
      function (data, status) {
        //console.log(data);
        if (data == "" || data == null || data == "Fallo") datosProcesados = null;
        else datosProcesados = JSON.parse(data);
      });
  }
  if (datosProcesados == null) return null;
  return datosProcesados;
}

async function insertCard(ubicacion, imagen, titulo, valores, botones, etiqueta, tamano) {

  var marco = document.createElement("div");
  marco.setAttribute("class", "mr-2 ml-2 py-3");

  var marco1 = document.createElement("div");
  marco1.setAttribute("class", "card border rounded px-3 py-3");

  if (tamano == null) {
    marco.setAttribute("style", "width: 18rem;");
    marco1.setAttribute("style", "width: 18rem;background-color:#FDF7FF;");
  } else {
    marco.setAttribute("style", "width: " + tamano + "rem;");
    marco1.setAttribute("style", "width: " + tamano + "rem;background-color:#FDF7FF;");
  }

  //Insert image
  if (imagen != null) {
    var marco2 = document.createElement("div");
    marco2.setAttribute("style", "width= 100%; height: 230px;");
    var imagenAux = document.createElement("img");
    imagenAux.setAttribute("class", "card-img-top rounded-circle");

    imagenAux.setAttribute("src", imagen);
    marco2.append(imagenAux);
    marco1.append(marco2);
  }

  //Insert title
  if (titulo != null) {
    var marco3 = document.createElement("div");
    marco3.setAttribute("style", "width= 100%;");
    marco3.setAttribute("class", "card-body list-group-item-primary border");
    var tituloMarco3 = document.createElement("h5");
    if (titulo[1] != null) {
      tituloMarco3.setAttribute("style", "cursor:pointer");
      tituloMarco3.setAttribute("class", "card-title text-dark text-center");
      tituloMarco3.setAttribute("onclick", titulo[1]);
    }
    tituloMarco3.textContent = titulo[0];
    marco3.append(tituloMarco3);
    marco1.append(marco3);
  }

  //Insert list
  if (valores != null) {
    var lista = document.createElement("ul");
    lista.setAttribute("class", "list-group list-group-flush");
    for (i = 0; i < valores.length; i++) {
      var barra = document.createElement("li");
      barra.setAttribute("class", "list-group-item bg-light");
      if (valores[i].includes(":", 0)) {
        valoresDivididos = valores[i].split(":");
        if (valoresDivididos.length > 2) {
          var negrita = document.createElement("b");
          negrita.textContent = valoresDivididos[0];
          var textoNormal = document.createElement("a");
          textoNormal.textContent = ": " + valores[i].substring(valoresDivididos[0].length + 1, valores[i].length + 1);
          barra.append(negrita);
          barra.append(textoNormal);
        } else {
          var negrita = document.createElement("b");
          negrita.textContent = valoresDivididos[0];
          var textoNormal = document.createElement("a");
          textoNormal.textContent = ": " + valoresDivididos[1];
          barra.append(negrita);
          barra.append(textoNormal);
        }
      } else {
        barra.textContent = valores[i];
      }
      lista.append(barra);
    }
    marco1.append(lista);
  }

  //Insert buttons
  if (botones != null) {
    var marco4 = document.createElement("div");
    marco4.setAttribute("class", "card-body");

    for (const [key, value] of Object.entries(botones)) {
      var botonAux = document.createElement("button");
      botonAux.textContent = key;
      botonAux.setAttribute("onclick", value);
      botonAux.setAttribute("class", "btn btn-block btn-primary");
      marco4.append(botonAux);
    }

    marco1.append(marco4);
  }

  //Insert tag
  if (etiqueta != null) {
    var marco5 = document.createElement("li");
    marco5.setAttribute("class", "list-group-item list-group-item-primary font-weight-bold text-center");
    marco5.textContent = etiqueta;
    marco1.append(marco5);
  }

  marco.append(marco1);
  ubicacion.append(marco);
}

async function quitarModal(modalObject) {
  await modalObject.modal('hide');
  await $(".modal-backdrop").remove();
  await $("body").removeClass("modal-open");
}

async function insertCardRequest(ubicacion, imagen, titulo, botones, etiqueta, tamano, boton) {

  var marco = document.createElement("div");
  marco.setAttribute("class", "mr-2 ml-2 py-3");

  var marco1 = document.createElement("div");
  marco1.setAttribute("class", "card border rounded px-3 py-3");

  if (tamano == null) {
    marco.setAttribute("style", "width: 18rem;");
    marco1.setAttribute("style", "width: 18rem;background-color:#FDF7FF;");
  } else {
    marco.setAttribute("style", "width: " + tamano + "rem;");
    marco1.setAttribute("style", "width: " + tamano + "rem;background-color:#FDF7FF;");
  }

  //Insert image
  if (imagen != null) {
    var marco2 = document.createElement("div");
    marco2.setAttribute("style", "width= 100%; height: 230px;");
    var imagenAux = document.createElement("img");
    imagenAux.setAttribute("class", "card-img-top rounded-circle");

    imagenAux.setAttribute("src", imagen);
    marco2.append(imagenAux);
    marco1.append(marco2);
  }

  //Insert title
  if (titulo != null) {
    var marco3 = document.createElement("div");
    marco3.setAttribute("style", "width= 100%;");
    marco3.setAttribute("class", "card-body list-group-item-primary border");
    var tituloMarco3 = document.createElement("h5");
    if (titulo[1] != null) {
      tituloMarco3.setAttribute("style", "cursor:pointer");
      tituloMarco3.setAttribute("class", "card-title text-dark text-center");
      tituloMarco3.setAttribute("onclick", titulo[1]);
    }
    tituloMarco3.textContent = titulo[0];
    marco3.append(tituloMarco3);
    marco1.append(marco3);
  }

  //Insert buttons
  if (botones != null) {
    for (const [key, value] of Object.entries(botones)) {

      var lista = document.createElement("ul");
      lista.setAttribute("class", "list-group list-group-flush");

      for (const [key2, value2] of Object.entries(value)) {

        var barra = document.createElement("li");
        barra.setAttribute("class", "list-group-item active");
        barra.textContent = key2;
        lista.append(barra);

        value2.forEach(function (filasContenido) {
          var barraAux = document.createElement("li");
          var barra = document.createElement("a");
          barraAux.setAttribute("class", "list-group-item bg-light");
          barra.textContent = filasContenido[0];
          barra.setAttribute("href", filasContenido[1]);
          barraAux.append(barra);
          lista.append(barraAux);
        });
      }
      marco1.append(lista);
    }
  }

  if (boton != null) {
    var marco4 = document.createElement("div");
    marco4.setAttribute("class", "card-body");

    for (const [key, value] of Object.entries(boton)) {
      var botonAux = document.createElement("button");
      botonAux.textContent = key;
      botonAux.setAttribute("onclick", value);
      botonAux.setAttribute("class", "btn btn-block btn-primary");
      marco4.append(botonAux);
    }

    marco1.append(marco4);
  }

  //Insert tag
  if (etiqueta != null) {
    var marco5 = document.createElement("li");
    marco5.setAttribute("class", "list-group-item list-group-item-primary font-weight-bold text-center");
    marco5.textContent = etiqueta;
    marco1.append(marco5);
  }

  marco.append(marco1);
  ubicacion.append(marco);

}
async function aquiNoHayNada(ubicacion) {
  insertCardLink(ubicacion, null, null, "fa fa-tree", null, "Aquí no hay nada");
}
async function elObjetoNoExiste(ubicacion) {
  insertCardLink(ubicacion, null, null, "fa fa-tree", null, "El objeto no existe o ha sido eliminado");
}
async function elUsuarioNoExiste(ubicacion) {
  insertCardLink(ubicacion, null, null, "fa fa-tree", null, "El usuario no existe o ha sido eliminado");
}
async function insertCardLink(ubicacion, tituloBoton, enlace, imagenTexto, numero, texto) {
  var cartaFinal = $(document.createElement('div'));
  var carta = $(document.createElement('div'));
  carta.attr("class", "card bg-light mx-2 my-2 position-sticky");
  carta.attr("style", "width:18rem;");

  //Creo el botón
  if (tituloBoton != null) {
    var cuerpoBoton = $(document.createElement('div'));
    var boton = $(document.createElement('a'));
    boton.text(tituloBoton);
    if (enlace.charAt(0) == "#") {
      boton.attr("href", enlace);
    }
    else {
      boton.attr("href", location.hash);
      boton.attr("onclick", enlace);
    }
    boton.attr("class", "btn btn-primary btn-block");
    cuerpoBoton.append(boton);
    cuerpoBoton.attr("class", "card-body");
  }

  //Creo la imagen
  var cuerpoImagen = $(document.createElement('div'));
  cuerpoImagen.attr("class", "align-self-center");
  var spanImagen = $(document.createElement('span'));
  spanImagen.attr("style", "font-size:200px;");
  var imagen = $(document.createElement('i'));
  imagen.attr("class", imagenTexto);
  spanImagen.append(imagen);
  cuerpoImagen.append(spanImagen);

  if (numero != null) {
    //Creo el contador
    var cuerpoContador = $(document.createElement('div'));
    cuerpoContador.attr("class", "align-self-start");
    var contenidoContador = $(document.createElement('div'));
    contenidoContador.attr("class", "px-4 mx-2 my-2 bg-warning text-white rounded-circle font-weight-bold position-absolute");
    contenidoContador.attr("style", "font-size:40px;");
    contenidoContador.text(numero);
    cuerpoContador.append(contenidoContador);
  }

  //Creo el botón
  if (texto != null) {
    carta.attr("class", "card mx-2 my-2 position-sticky bg-info");
    var cuerpoTexto = $(document.createElement('div'));
    var textoEscrito = $(document.createElement('h3'));
    textoEscrito.text(texto);
    //boton.attr("href", enlace);
    textoEscrito.attr("class", "text-center font-weight-bold");
    cuerpoTexto.append(textoEscrito);
    cuerpoTexto.attr("class", "card-body");
  }

  if (numero != null) carta.append(cuerpoContador);
  carta.append(cuerpoImagen);
  if (tituloBoton != null) carta.append(cuerpoBoton);
  if (texto != null) carta.append(cuerpoTexto);

  ubicacion.append(carta);
}

async function generarModal(ubicacion, idModal, titulo, texto, boton1, boton2, ubicacionBoton, botonModal) {

  var modalFade = $(document.createElement('div'));
  modalFade.attr("class", "modal fade");
  modalFade.attr("id", idModal);
  modalFade.attr("tabindex", "-1");
  modalFade.attr("role", "dialog");

  var modalDialog = $(document.createElement('div'));
  modalDialog.attr("class", "modal-dialog modal-dialog-centered");
  modalDialog.attr("role", "document");

  var modalContent = $(document.createElement('div'));
  modalContent.attr("class", "modal-content ");
  modalContent.attr("style", "width: 24rem;");

  var modalHeader = $(document.createElement('div'));
  modalHeader.attr("class", "modal-header");

  var modalTitle = $(document.createElement('h5'));
  modalTitle.text(titulo);
  modalTitle.attr("class", "modal-title");

  var buttonExit = $(document.createElement('button'));
  buttonExit.attr("type", "button");
  buttonExit.attr("class", "close");
  buttonExit.attr("data-dismiss", "modal");
  buttonExit.attr("aria-label", "close");

  var spanButtonExit = $(document.createElement('span'));
  spanButtonExit.attr("aria-hidden", "true");
  spanButtonExit.html("&times;");

  buttonExit.append(spanButtonExit);

  modalHeader.append(modalTitle);
  modalHeader.append(buttonExit);

  var modalBody = $(document.createElement('div'));
  modalBody.attr("class", "modal-body");

  var textoModalBody = $(document.createElement('p'));
  textoModalBody.text(texto);

  modalBody.append(textoModalBody);

  var modalFooter = $(document.createElement('div'));
  modalFooter.attr("class", "d-flex");

  var buttonClose = $(document.createElement('button'));
  buttonClose.attr("type", "button");
  buttonClose.attr("class", "btn btn-secondary btn-block my-1 mx-1");
  buttonClose.attr("data-dismiss", "modal");
  buttonClose.text(boton1);

  var buttonConfirm = $(document.createElement('button'));
  buttonConfirm.attr("type", "button");
  buttonConfirm.attr("class", "btn btn-primary btn-block my-1 mx-1");
  buttonConfirm.text(boton2[0]);
  buttonConfirm.attr("onclick", boton2[1]);

  modalFooter.append(buttonClose);
  modalFooter.append(buttonConfirm);

  modalContent.append(modalHeader);
  modalContent.append(modalBody);
  modalContent.append(modalFooter);

  modalDialog.append(modalContent);
  modalFade.append(modalDialog);

  ubicacion.append(modalFade);

  var buttonOpenModal = $(document.createElement('button'));
  buttonOpenModal.attr("type", "button");
  buttonOpenModal.attr("class", "btn btn-primary btn-block my-1");
  buttonOpenModal.attr("data-toggle", "modal");
  buttonOpenModal.attr("data-target", "#" + idModal);
  buttonOpenModal.text(botonModal);
  buttonOpenModal.attr("onclick", "$('#" + idModal + "').modal('show')");
  buttonOpenModal.attr("id", "button" + idModal);

  ubicacionBoton.append(buttonOpenModal);
}

async function generarModalAccion(ubicacion, idModal, titulo, texto, boton1, boton2, ubicacionBoton, botonModal, imagen, entradas) {

  var modalFade = $(document.createElement('div'));
  modalFade.attr("class", "modal fade");
  modalFade.attr("id", idModal);
  modalFade.attr("tabindex", "-1");
  modalFade.attr("role", "dialog");

  var modalDialog = $(document.createElement('div'));
  modalDialog.attr("class", "modal-dialog modal-dialog-centered");
  modalDialog.attr("role", "document");

  var modalContent = $(document.createElement('div'));
  modalContent.attr("class", "modal-content ");
  modalContent.attr("style", "width: 24rem;");

  var modalHeader = $(document.createElement('div'));
  modalHeader.attr("class", "modal-header");

  var modalTitle = $(document.createElement('h5'));
  modalTitle.text(titulo);
  modalTitle.attr("class", "modal-title");

  var buttonExit = $(document.createElement('button'));
  buttonExit.attr("type", "button");
  buttonExit.attr("class", "close");
  buttonExit.attr("data-dismiss", "modal");
  buttonExit.attr("aria-label", "close");

  var spanButtonExit = $(document.createElement('span'));
  spanButtonExit.attr("aria-hidden", "true");
  spanButtonExit.html("&times;");

  buttonExit.append(spanButtonExit);

  modalHeader.append(modalTitle);
  modalHeader.append(buttonExit);

  var modalBody = $(document.createElement('div'));
  modalBody.attr("class", "modal-body");

  var textoModalBody = $(document.createElement('p'));
  textoModalBody.text(texto);

  modalBody.append(textoModalBody);

  var modalFooter = $(document.createElement('div'));
  modalFooter.attr("class", "d-flex");

  var buttonClose = $(document.createElement('button'));
  buttonClose.attr("type", "button");
  buttonClose.attr("class", "btn btn-secondary btn-block my-1 mx-1");
  buttonClose.attr("data-dismiss", "modal");
  buttonClose.text(boton1);

  var buttonConfirm = $(document.createElement('button'));
  buttonConfirm.attr("type", "button");
  buttonConfirm.attr("class", "btn btn-primary btn-block my-1 mx-1");
  buttonConfirm.text(boton2[0]);
  buttonConfirm.attr("onclick", boton2[1]);

  modalFooter.append(buttonClose);
  modalFooter.append(buttonConfirm);

  modalContent.append(modalHeader);
  modalContent.append(modalBody);
  modalContent.append(modalFooter);

  modalDialog.append(modalContent);
  modalFade.append(modalDialog);

  ubicacion.append(modalFade);

  var buttonOpenModal = $(document.createElement('button'));
  buttonOpenModal.attr("type", "button");
  buttonOpenModal.attr("class", "btn btn-primary btn-block my-1");
  buttonOpenModal.attr("data-toggle", "modal");
  buttonOpenModal.attr("data-target", "#" + idModal);
  buttonOpenModal.text(botonModal);
  buttonOpenModal.attr("onclick", "$('#" + idModal + "').modal('show')");
  buttonOpenModal.attr("id", "button" + idModal);

  ubicacionBoton.append(buttonOpenModal);

  //Insert buttons
  if (botones != null) {
    for (const [key, value] of Object.entries(botones)) {
      var lista = document.createElement("ul");
      lista.setAttribute("class", "list-group list-group-flush");

      for (const [key2, value2] of Object.entries(value)) {
        var barra = document.createElement("li");
        barra.setAttribute("class", "list-group-item active");
        barra.textContent = key2;
        lista.append(barra);
        var barraAux = document.createElement("li");
        var barra = document.createElement("a");
        barraAux.setAttribute("class", "list-group-item bg-light");
        barra.textContent = value2[0][0];
        barra.setAttribute("href", value2[0][1]);
        barraAux.append(barra);
        lista.append(barraAux);
      }
      marco1.append(lista);
    }
  }


}

async function addDivAlert(ubicacion, mensaje, tipo) {
  var modalAlert = $(document.createElement('div'));
  modalAlert.attr("class", "alert alert-" + tipo);
  modalAlert.attr("role", "alert");

  var mensajeAlert = $(document.createElement('p'));
  mensajeAlert.attr("class", "font-weight-bold");
  mensajeAlert.text(mensaje);

  modalAlert.append(mensajeAlert);

  ubicacion.append(modalAlert);
}

async function addInput(nombreObjeto, tipo, texto, ubicacion, extras) {

  switch (tipo) {
    case 0:
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
  }


  var modalFade = $(document.createElement('div'));
  modalFade.attr("class", "modal fade");
  modalFade.attr("id", idModal);
  modalFade.attr("tabindex", "-1");
  modalFade.attr("role", "dialog");


}

function getUbicacionTexto(ubicacion) {
  return ubicacion.edificio + " | " + ubicacion.planta + " | " + ubicacion.ubicacion;
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