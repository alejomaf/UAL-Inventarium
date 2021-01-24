<script>
  /*-------------------USUARIOS---------------------*/

  async function cargarUsuarios() {
    usersGroup = await realizarConsulta("apis/busqueda/buscarUsuario.php", {
      rank: -1
    });

    if (usersGroup == null) {
      aquiNoHayNada($("#variableArea"));
    } else {
      for (j = 0; j < usersGroup.length; j++) {
        if (usersGroup[j].rango == -1) await anadirUsuario(usersGroup[j]);
      }
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
      'rank': -2
    });
    await cargarPagina();
  }

  function anadirUsuario(usuario) {
    if (usuario.rango == 0) rango = "Técnico";
    else rango = "Profesor";

    insertCard($("#variableArea"), null, [usuario.nombre, "location.hash='#usuario-" + usuario.idUsuario + "';"], ["Correo electrónico: " + usuario.correoElectronico, "Departamento: " + usuario.departamento, "Teléfono: " + usuario.telefono], {
      'Aceptar usuario': 'aceptarUsuario(' + usuario.idUsuario + ');',
      'Denegar usuario': 'rechazarUsuario(' + usuario.idUsuario + ');'
    }, rango, null);
  }
  cargarUsuarios();
</script>