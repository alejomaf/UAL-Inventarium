<script>
/*-------------------USUARIOS---------------------*/

async function cargarUsuarios(){
    usersGroup=await realizarConsulta("apis/busqueda/buscarUsuario.php", {name: "%"});

    for(j=0;j<usersGroup.length;j++){
      if (usersGroup[j].rango!=-1) await anadirUsuario(usersGroup[j]);
    }

}

function anadirUsuario(usuario){
  if(usuario.rango==0) rango= "Técnico";
  else rango= "Profesor";

  insertCard($("#variableArea"), null, [usuario.nombre,"location.hash='#usuario-"+usuario.idUsuario+"';"], ["Correo electrónico: "+usuario.correoElectronico,"Departamento: "+usuario.departamento,"Teléfono: "+usuario.telefono], null ,rango);
}
cargarUsuarios();

</script>