<?php include "modifyUser.php";?>
<script>
    var usuarioActivo;

    async function anadirBarra(ubicacion, texto1, texto2) {
        var barraAuxiliar = $("#barra").clone();

        $("#izquierda").text(texto1);
        $("#derecha").text(texto2);

        $("#barra").clone().appendTo(ubicacion);

        $("#copiarBarra").children("#barra").remove();
        $("#copiarBarra").append(barraAuxiliar);
    }

    async function cargarUsuarios() {
        usersGroup = await realizarConsulta("apis/busqueda/buscarUsuario.php", {
            idUsuario: aux
        });

        if (usersGroup == null) {
            elUsuarioNoExiste($("#variableArea"));
            return;
        }
        usuarioActivo = usersGroup[0];

        anadirUsuario(usersGroup[0]);
    }

    async function anadirUsuario(usuario) {
        var valores = [];
        var titulo = [];
        var botones = {};

        var departamento="";
        switch(usuario.departamento){
            case "0": departamento="Departamento de informática"; break;
            case "1": departamento="Departamento: Ingeniería de sistemas y automática"; break;
            case "2": departamento="Departamento: Lenguaje y sistemas informáticos"; break;
            case "3": departamento="Departamento: Ciencias de la computación e inteligencia artificial"; break; 
            case "4": departamento="Departamento: Arquitectura y tecnología de computadores"; break;
        }
        
        valores.push("Correo electrónico: " + usuario.correoElectronico);
        valores.push(departamento);
        valores.push("Teléfono: " + usuario.telefono);

        titulo.push(usuario.nombre);
        titulo.push(null);

        var etiqueta = "";
        var rango = <?php echo $_SESSION['rango'];?>; 

        if(rango==0){
        switch (usuario.rango) {
            case '-3':
                etiqueta = "Baneado";
                if (<?php echo $_SESSION['idUsuario']; ?> == 1) {
                    botones["Desbanear"] = "desbanearUsuario();";
                }
                break;
            case '-2':
                etiqueta = "Registro rechazado";
                botones["Dar de alta"] = "aceptarUsuario();";
                break;
            case '-1':
                etiqueta = "Registro pendiente de aprobación";
                botones["Dar de alta"] = "aceptarUsuario();";
                botones["Rechazar registro"] = "rechazarUsuario();";
                break;
            case '0':
                etiqueta = "Técnico";
                if (<?php echo $_SESSION['idUsuario']; ?> == 1) {
                    botones["Banear"] = "banearUsuario();";
                    botones["Dejar de ser técnico"] = "quitarTecnico();";
                }
                break;
            case '1':
                etiqueta = "Profesor";
                botones["Banear"] = "banearUsuario();";
                if (<?php echo $_SESSION['idUsuario']; ?> == 1) {
                    botones["Convertir en técnico"] = "convertirTecnico();";
                }
                break;
        }
        botones["Modificar usuario"]="showModalModificarUsuario();";
    }



        insertCard($("#variableArea"), null, titulo, valores, botones, etiqueta, 22);
        insertCard($("#variableArea"), null, ["Préstamos y solicitudes de "+usuario.nombre,null], null, {"Ver préstamos":"location.hash='prestamos-"+usuario.idUsuario+"';"}, null, 22);
    }

    async function aceptarUsuario() {
        await realizarConsulta("apis/modificacion/modificarUsuario.php", {
            'idUsuario': aux,
            'rank': 1,
            'emailEnvio': usuarioActivo.correoElectronico
        });
        await cargarPagina();
    }

    async function rechazarUsuario() {
        await realizarConsulta("apis/modificacion/modificarUsuario.php", {
            'idUsuario': aux,
            'rank': -2
        });
        await cargarPagina();
    }

    async function convertirTecnico() {
        if (<?php echo $_SESSION['idUsuario']; ?> == 1) {
            await realizarConsulta("apis/modificacion/modificarUsuario.php", {
                'idUsuario': aux,
                'rank': 0
            });
            await cargarPagina();
        }
    }

    async function quitarTecnico() {
        if (<?php echo $_SESSION['idUsuario']; ?> == 1) {
            await realizarConsulta("apis/modificacion/modificarUsuario.php", {
                'idUsuario': aux,
                'rank': 1
            });
            await cargarPagina();
        }
    }

    async function banearUsuario() {
        if (<?php echo $_SESSION['rango']; ?> == 0) {
            if (usuarioActivo.rango != 0 || <?php echo $_SESSION['idUsuario']; ?> == 1) {
                await realizarConsulta("apis/modificacion/modificarUsuario.php", {
                    'idUsuario': aux,
                    'rank': -3
                });
                await cargarPagina();
            }
        }
    }

    async function desbanearUsuario() {
        if (<?php echo $_SESSION['rango']; ?> == 0) {
            if (usuarioActivo.rango != 0 || <?php echo $_SESSION['idUsuario']; ?> == 1) {
                await realizarConsulta("apis/modificacion/modificarUsuario.php", {
                    'idUsuario': aux,
                    'rank': 1
                });
                await cargarPagina();
            }
        }
    }

    cargarUsuarios();
</script>