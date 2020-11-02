<!DOCTYPE html>
<?php include "parts/head.html";?>

<body>
<div class="container">
  <div class="row align-items-center">
      <div id="variableArea" class="col align-self-center">
  
</div>
</div>
</div>

</body>
</html>

<script>
function cambiarObjeto(objeto){
    $("#variableArea").empty().hide().fadeIn('50');
    $("#variableArea").hide().load(objeto).fadeIn('300');
}

cambiarObjeto("login.php");

</script>
