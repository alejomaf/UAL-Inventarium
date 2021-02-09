<div class="card" style="width: 22rem;">
  <div class="card-body">
    <h5 class="card-title">
    Ingresar datos
    </h5>
    <div class="form-group">
    <div class="alert alert-warning">
        <a>Debes subir el archivo Excel respetando la estructura expuesta</a>.
      </div>
      <label class="font-weight-bold">Archivo excel XLSX o XLS*</label>
      <input type="file" id="fileUpload" accept=".xlsx, .xls"name="excel" class="form-control-file" required>
      <pre id="jsonData"></pre>
    </div><button class="btn btn-block btn-primary" id="uploadExcel">Insertar datos</button>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.3/xlsx.full.min.js"></script>
<!--script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js"></script-->

<script>
var jsonObject;
var rowObject;
    var selectedFile;
    document
    .getElementById("fileUpload")
      .addEventListener("change", function(event) {
        selectedFile = event.target.files[0];
      });
    document
      .getElementById("uploadExcel")
      .addEventListener("click", function() {
        if (selectedFile) {
          console.log("hi");
          var fileReader = new FileReader();
          fileReader.onload = function(event) {
            var data = event.target.result;

            var workbook = XLSX.read(data, {
              type: "binary"
            });
            workbook.SheetNames.forEach(sheet => {
                rowObject = XLSX.utils.sheet_to_row_object_array(
                workbook.Sheets[sheet]
              );
                jsonObject = JSON.stringify(rowObject);
              document.getElementById("jsonData").innerHTML = jsonObject;
              console.log(jsonObject);
            });
          };
          fileReader.readAsBinaryString(selectedFile);
        }
      });

async function procesarDatos(objetosProcesados){
    var objetoAnterior="";
    var idObjetoAnterior="";

    for(i=0;i<objetosProcesados.length;i++){
        var etiqueta=null;
        var marca=null;
        var modelo=null;
        var codigoInventario=0;
        var ubicacion=3;
        var fechaAdquisicion= cogerFecha(null);
        var observaciones= null;
        var tipo=0;
        if(objetosProcesados[i].nombre==objetoAnterior){
            if(objetosProcesados[i].etiqueta!=undefined) etiqueta= objetosProcesados[i].etiqueta;
            if(objetosProcesados[i].codigoInventario!=undefined&&objetosProcesados[i].codigoInventario!="no inventariable") codigo= objetosProcesados[i].codigoInventario;
            if(objetosProcesados[i].ubicacion=="Laboratorio Cite IV") ubicacion=4;
            else if(objetosProcesados[i].ubicacion=="Despacho 1.13 Cite III") ubicacion=5;
            if(objetosProcesados[i].fechaAdquisicion!=undefined){
                if(objetosProcesados[i].fechaAdquisicion=="Noviembre 2019") fechaAdquisicion=cogerFecha("2019-11-01");
                else if(objetosProcesados[i].fechaAdquisicion=="Diciembre 2019") fechaAdquisicion=cogerFecha("2019-12-01");
                else if(objetosProcesados[i].fechaAdquisicion=="Febrero 2020") fechaAdquisicion=cogerFecha("2020-02-01");
                else fechaAdquisicion=cogerFecha(objetosProcesados[i].fechaAdquisicion+"-01-01");
            }
            if(objetosProcesados[i].observaciones!=undefined) observaciones= objetosProcesados[i].observaciones;
            await crearObjeto(idObjetoAnterior,null,codigo,1,etiqueta,observaciones,fechaAdquisicion,ubicacion);
        }else{
            if(objetosProcesados[i].modelo!=undefined) modelo= objetosProcesados[i].modelo;
            if(objetosProcesados[i].marca!=undefined) marca= objetosProcesados[i].marca;
            if(objetosProcesados[i].codigo!=undefined||objetosProcesados[i].codigo=="no inventariable") tipo=1;
            idObjetoAnterior= await crearGrupoDeObjetos(objetosProcesados[i].nombre,marca,modelo,tipo);
            objetoAnterior= await objetosProcesados[i].nombre;
            if(objetosProcesados[i].ubicacion=="Laboratorio Cite IV") ubicacion=4;
            else if(objetosProcesados[i].ubicacion=="Despacho 1.13 Cite III") ubicacion=5;

            var cantidad= await parseInt(objetosProcesados[i].cantidad);

            for(j=0;j<cantidad;j++){
                if(objetosProcesados[i].etiqueta!=undefined) etiqueta= objetosProcesados[i].etiqueta;
                if(objetosProcesados[i].codigoInventario!=undefined&&objetosProcesados[i].codigoInventario!="no inventariable") codigo= objetosProcesados[i].codigoInventario;
                if(objetosProcesados[i].fechaAdquisicion!=undefined){
                    if(objetosProcesados[i].fechaAdquisicion=="Noviembre 2019") fechaAdquisicion=cogerFecha("2019-11-01");
                    else if(objetosProcesados[i].fechaAdquisicion=="Diciembre 2019") fechaAdquisicion=cogerFecha("2019-12-01");
                    else if(objetosProcesados[i].fechaAdquisicion=="Febrero 2020") fechaAdquisicion=cogerFecha("2020-02-01");
                    else fechaAdquisicion=cogerFecha(objetosProcesados[i].fechaAdquisicion+"-01-01");
                }
                if(objetosProcesados[i].observaciones!=undefined) observaciones= objetosProcesados[i].observaciones;
                await crearObjeto(idObjetoAnterior,null,codigo,1,etiqueta,observaciones,fechaAdquisicion,ubicacion);
            }
        }
    }
}

function cogerFecha(fecha){
    return fecha;
}

async function crearGrupoDeObjetos(nombre, marca, modelo, tipo){
    var form_data = new FormData();
    form_data.append("nombre",nombre);
    if(marca!=null) form_data.append("marca",marca);
    if(modelo!=null) form_data.append("modelo",modelo);
    form_data.append("cantidadDisponible",0);
    form_data.append("cantidad",0);
    form_data.append("tipo", tipo);

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
    var objetosGroup=await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", {nombre: "%"});
    return await objetosGroup[objetosGroup.length-1].idGrupoObjetos;
}

async function crearObjeto(groupObject, mejorasEnElEquipo, codigo, organizativa, etiqueta, observaciones, fechaAdquisicion,ubicacion){
    var objeto={};
    if(mejorasEnElEquipo!=null) objeto.mejorasEquipo=mejorasEnElEquipo;
    if(etiqueta!=null) objeto.etiqueta=etiqueta;
    if(observaciones!=null) objeto.observaciones=observaciones;
    objeto.grupoObjetos=groupObject;
    objeto.codigo=codigo;
    objeto.organizativa=organizativa;
    objeto.ubicacion=ubicacion;
    objeto.fechaAdquisicion=fechaAdquisicion;
    console.log(objeto);
    await $.post("apis/creacion/crearObjeto.php",objeto);
}
</script>