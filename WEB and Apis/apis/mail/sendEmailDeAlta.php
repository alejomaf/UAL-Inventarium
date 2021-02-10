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

$mail->Subject = "Ha sido dado de alta en UAL-Inventarium";
$mail->Body = "
Ha sido de alta en UAL-Inventarium. <br>

<b>Puede disfrutar de su nueva cuenta de UAL-Inventarium en la siguiente dirección: http://localhost/UALInventarium/login.php</b>

<br><br>
Cualquier duda que le surja no dude contactar con un técnico.
<br><br>
Muchas gracias por unirse, <br>
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