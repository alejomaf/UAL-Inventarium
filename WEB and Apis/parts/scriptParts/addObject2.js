var formularioCrearObjeto=document.getElementById("formularioCrearObjeto");
var postSeleccion=document.getElementById("postSeleccion");
var botonInventario=document.getElementById("objetoInventario");
var numeroObjetos=document.getElementById("quantity");
var botonFungible=document.getElementById("objetoFungible");
var codigoInventario=document.getElementById("codigoDelInventario");
var objetoT=-1;
var contador=0;
var crearObjetos=0;





//Boton incremental
  $(document).ready(function(){
var quantitiy=0;
   $('.quantity-right-plus').click(function(e){
        
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity').val());
        
        // If is not undefined
            
            $('#quantity').val(quantity + 1);

          
            // Increment
        
    });

     $('.quantity-left-minus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity').val());
        
        // If is not undefined
      
            // Increment
            if(quantity>1){
            $('#quantity').val(quantity - 1);
            }
    });
    
});
// When the user clicks anywhere outside of the modalGroupObject, close it
window.onclick = function(event) {
  if (event.target == modalGroupObject||event.target == modal) {
    modalGroupObject.style.display = "none";
    modal.style.display = "none";
  }
}