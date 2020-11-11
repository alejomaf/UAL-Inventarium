async function cargarUsuarios(){
    usersGroup=await realizarConsulta("apis/busqueda/buscarUsuario.php", {name: "%"});

    for(l=0;l<usersGroup.length;l++){
      if (usersGroup[l].rango!=-1) await anadirUsuario(usersGroup[l]);
    }

}

async function anadirUsuario(usuario){
  if(usersGroup[i].rango==0) rango= "Técnico";
  else rango= "Profesor";

  titulo = [];
  titulo.push(await usuario.nombre);
  titulo.push("location.hash='#usuario-"+await usuario.idUsuario+";");

  valores = [];
  valores.push("Correo electrónico: "+await usuario.correoElectronico);
  valores.push("Departamento: "+await usuario.departamento);
  valores.push("Teléfono: "+await usuario.telefono);

  await insertCard($("#variableArea"), null, titulo, valores, null ,rango);
}
cargarUsuarios();