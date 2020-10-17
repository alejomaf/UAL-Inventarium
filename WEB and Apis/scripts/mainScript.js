async function realizarConsulta(ubicacion, consulta){
    await $.post(ubicacion, consulta,
    function(data,status){
      if(data=="") datosProcesados=null;
      else datosProcesados= JSON.parse(data);
    });
    if(datosProcesados==null) return null;
    return datosProcesados;
  }