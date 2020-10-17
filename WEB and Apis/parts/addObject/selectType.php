<div id="inventario" class="card rounded" style="cursor:pointer; width: 18rem;">
  <img class="card-img-top" src="images/essentials/inventario.png" alt="Card image cap">
  <div class="card-body">
    <p class="card-text">+ Inventario, luego editaré la imagen</p>
  </div>
</div>

<div id="fungible" class="card rounded" style="cursor:pointer; width: 18rem;">
  <img class="card-img-top" src="images/essentials/fungible.png" alt="Card image cap">
  <div class="card-body">
    <p class="card-text">+ Fungible, luego editaré la imagen</p>
  </div>
</div>




<script>


$('#inventario').click(function(){
    seleccionarObjeto(0);
});
$("#fungible").click(function(){
    seleccionarObjeto(1);
});

</script>