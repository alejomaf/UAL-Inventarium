<script>
  /*-------------------USUARIOS---------------------*/

  async function cargarUsuarios() {
    usersGroup = await realizarConsulta("apis/busqueda/buscarUsuario.php", {
      rank: -1
    });

    if (usersGroup == null) {
      aquiNoHayNada($("#variableArea"));
      return;
    } else {
      for (j = 0; j < usersGroup.length; j++) {
        if (usersGroup[j].rango == -1) await anadirUsuario(usersGroup[j]);
      }
    }
    if ($("#variableArea").children().length==1){
            aquiNoHayNada($("#variableArea"));
    }
  }

  async function aceptarUsuario(idUsuario) {
    await realizarConsulta("apis/modificacion/modificarUsuario.php", {
      'idUsuario': idUsuario,
      'rank': 1
    });
    await cargarPagina();
  }

  async function rechazarUsuario(idUsuario) {
    await realizarConsulta("apis/modificacion/modificarUsuario.php", {
      'idUsuario': idUsuario,
      'rank': -3
    });
    await cargarPagina();
  }

  function anadirUsuario(usuario) {
    insertCard($("#variableArea"), null, [usuario.nombre, "location.hash='#usuario-" + usuario.idUsuario + "';"], ["Correo electrónico: " + usuario.correoElectronico, "Departamento: " + usuario.departamento, "Teléfono: " + usuario.telefono], {
      'Aceptar usuario': 'aceptarUsuario(' + usuario.idUsuario + ');',
      'Denegar usuario': 'rechazarUsuario(' + usuario.idUsuario + ');'
    }, "Profesor", 22);
  }
  cargarUsuarios();
</script>