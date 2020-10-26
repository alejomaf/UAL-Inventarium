async function cargarUsuarios(){
    usersGroup=await realizarConsulta("apis/busqueda/buscarUsuario.php", {name: "%"});

    for(i=0;i<usersGroup.length;i++){
      if (usersGroup[i].rango!=-1) await anadirUsuario(usersGroup[i]);
    }

}

function anadirUsuario(usuario){
  if(usersGroup[i].rango==0) rango= "Técnico";
  else rango= "Profesor";

  insertCard($("#variableArea"), null, [usuario.nombre,"location.hash='#usuario-"+usuario.idUsuario+";"], ["Correo electrónico: "+usuario.correoElectronico,"Departamento: "+usuario.departamento,"Teléfono: "+usuario.telefono], null ,rango);
}
cargarUsuarios();