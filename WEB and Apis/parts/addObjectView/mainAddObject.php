<div class="row justify-content-center" id="mainAddObject">

</div>

<script>
    var objetoT;
    var selectObject = -1;
    var nombreGrupoObjeto;

    var marca = "";
    var modelo = "";
    var imagen = "";
    var ubicacion = "";
    var numeroObjetos = 0;
    var contadorObjetos = 0;


    //Main fuction, the user can select the item that he wants to create

    function selectType() {
        limpiarZona($("#mainAddObject"));
        insertCardLink($("#mainAddObject"), "Añadir inventario", "seleccionarObjeto(0)", "fa fa-cube", null);
        insertCardLink($("#mainAddObject"), "Añadir fungible", "seleccionarObjeto(1)", "fa fa-bolt", null);
        insertCardLink($("#mainAddObject"), "Añadir kit", "seleccionarObjeto(2)", "fa fa-archive", null);
    }

    //Function initialization

    selectType();

    //The user select the item that he want to create

    function seleccionarObjeto(tipo) {
        objetoT = tipo;
        cambiarObjetoCreacion("parts/addObject/selectCreateObject.php");
    }

    //The user clicks in the creation button, the method works depending if the object group was created or not

    async function crearSeleccionarObjeto(tipo) {
        nombreGrupoObjeto = $('#grupoDeObjetos').val();
        selectObject = tipo;
        await quitarModal($('#botonEscritoGroupObject'))

        if (tipo == -1) {
            //If the object is being created right now 
            await cambiarObjetoCreacion("parts/addObject/uploadImage.php");
        } else {
            //If the object has been created and the user wants to add new elements
            await cambiarObjetoCreacion("parts/addObject/numberOfObjects.php");
        }
    }


    //We get the values when we are creating the object group

    function cogerImagen() {
        if ($("#fotoDelObjeto").val() == "") return;

        imagen = $("#fotoDelObjeto").val();
        marca = $("#marcaDelObjeto").val();
        modelo = $("#modeloDelObjeto").val();

        crearGrupoDeObjetos();
    }

    //We create the objects group

    async function crearGrupoDeObjetos() {
        var form_data = new FormData(document.getElementById("pasarDatos"));
        form_data.append("nombre", nombreGrupoObjeto);
        form_data.append("cantidadDisponible", 0);
        form_data.append("cantidad", 0);
        form_data.append("tipo", objetoT);

        await $.ajax({
            url: "apis/creacion/crearGrupoDeObjetos.php",
            type: 'POST',
            data: form_data,
            cache: false,
            processData: false, // tell jQuery not to process the data
            contentType: false,
            success: function(resp) {}
        });
        await principalGroupObject();

        selectType();
    }

    //We create the objects

    function crearObjetos() {
        if ($("#botonValor").val() == "") return;
        else {
            ubicacion = $("#botonValor").val();
            numeroObjetos = $("#quantity").val();
            crearObjeto();
        }
    }

    //We create the object
    
    async function crearObjeto() {
        if (contadorObjetos != numeroObjetos) {
            contadorObjetos++;
            await cambiarObjetoCreacion("parts/addObject/mejoras.php");
        } else {
            numeroObjetos = 0;
            contadorObjetos = 0;
            await selectType();
        }
    }

    async function generar() {
        mejoras = await $("#mejorasEnElEquipo").val();
        codigo = await $("#codigo").val();
        organizativa = await $("#organizativa").val();
        etiqueta = await $("#etiqueta").val();
        observaciones = await $("#observaciones").val();
        fechaAdquisicion = await $("#fechaAdquisicion").val();
        if ($("#codigo").val() == "") {
            console.log("falta el codigo " + etiqueta + " " + organizativa + " " + observaciones);
            return;
        }

        await $.post("apis/creacion/crearObjeto.php", {
            'grupoObjetos': selectObject,
            'ubicacion': ubicacion,
            'mejorasEquipo': mejoras,
            'codigo': codigo,
            'etiqueta': etiqueta,
            'organizativa': organizativa,
            'observaciones': observaciones,
            'fechaAdquisicion': fechaAdquisicion
        });

        crearObjeto();
    }

    async function saltarCreaciones() {
        for (i = 0; i < numeroObjetos; i++) {

            mejoras = await $("#mejorasEnElEquipo").val();

            await realizarConsulta("apis/creacion/crearObjeto.php", {
                'grupoObjetos': selectObject,
                'ubicacion': ubicacion,
                'mejorasEquipo': mejoras,
                'organizativa': 0,
                'codigo': -1
            });

        }

        numeroObjetos = 0;
        contadorObjetos = 0;
        await selectType();
    }

    async function cambiarObjetoCreacion(objeto) {
        $("#mainAddObject").empty().hide().fadeIn('50');
        $("#mainAddObject").hide().load(objeto).fadeIn('300');
    }
</script>