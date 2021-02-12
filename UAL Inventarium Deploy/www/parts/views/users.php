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

  var departamento="";
  switch(usuario.departamento){
    case "0": departamento="Departamento de informática"; break;
    case "1": departamento="Departamento: Ingeniería de sistemas y automática"; break;
    case "2": departamento="Departamento: Lenguaje y sistemas informáticos"; break;
    case "3": departamento="Departamento: Ciencias de la computación e inteligencia artificial"; break; 
    case "4": departamento="Departamento: Arquitectura y tecnología de computadores"; break;
  }

  insertCard($("#variableArea"), null, [usuario.nombre,"location.hash='#usuario-"+usuario.idUsuario+"';"], ["Correo electrónico: "+usuario.correoElectronico,departamento,"Teléfono: "+usuario.telefono], null ,rango);
}
cargarUsuarios();

</script>