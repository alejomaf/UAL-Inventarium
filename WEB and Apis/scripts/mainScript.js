async function realizarConsulta(ubicacion, consulta){
    await $.post(ubicacion, consulta,
    function(data,status){
      console.log(data);
      if(data==""||data==null||data=="Fallo") datosProcesados=null;
      else datosProcesados= JSON.parse(data);
    });
    if(datosProcesados==null) return null;
    return datosProcesados;
  }



async function insertCard(ubicacion, imagen, titulo, valores, botones, etiqueta){
  
  var marco= document.createElement("div");
    marco.setAttribute("class","mr-2 ml-2 py-3");
    marco.setAttribute("style","width: 18rem;");

  var marco1= document.createElement("div");
    marco1.setAttribute("class","card border rounded px-3 py-3");
    marco1.setAttribute("style","width: 18rem;background-color:#FDF7FF;");
  

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
    tituloMarco3.setAttribute("style","cursor:pointer");
    tituloMarco3.setAttribute("class","card-title text-dark text-center");
    tituloMarco3.textContent= titulo[0];
    tituloMarco3.setAttribute("onclick", titulo[1]);
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
      barra.textContent=valores[i];
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