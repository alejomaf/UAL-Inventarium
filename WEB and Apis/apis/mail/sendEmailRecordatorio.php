<?php

require 'PHPMailer/PHPMailerAutoload.php';



$mail = new PHPMailer();
$mail->IsSMTP();
$mail->Mailer = "smtp";

$mail->SMTPDebug  = 1;  
$mail->SMTPAuth   = TRUE;
$mail->SMTPSecure = "tls";
$mail->Port       = 587;
$mail->Host       = "smtp.gmail.com";
$mail->Username   = "ualinventarium@gmail.com";
$mail->Password   = '20elMejor1nv$nt@riado$WAL20';

$mail->IsHTML(true);
$mail->AddAddress($_POST["emailEnvio"]);
//$mail->AddAddress("recipient-email@domain", "recipient-name");
$mail->SetFrom("noreply@ualinventarium.com", "UAL-Inventarium System");
//$mail->AddReplyTo("reply-to-email@domain", "reply-to-name");
//$mail->AddCC("cc-recipient-email@domain", "cc-recipient-name");

$mail->Subject = "Objeto pendiente de devolucion";
$mail->Body = "
Usted tiene un objeto pendiente de devolver. <br>

<b>Por favor, póngase en contacto con un técnico y devuélvale el objeto.</b>

<br><br>
Disculpe las molestias, <br>
Atte. UAL Inventarium
<br><br><br><br>
Este correo ha sido generado automáticamente, por favor, no conteste.
";
//$content = "<b>Porfavor confirme su registro de usuario</b>";


//$mail->MsgHTML($content); 
if(!$mail->Send()) {
  echo "Error while sending Email.";
  var_dump($mail);
} else {
  echo "Email sent successfully";
}

?>