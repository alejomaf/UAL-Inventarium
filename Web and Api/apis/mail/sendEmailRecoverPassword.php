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
$mail->AddAddress($email);
//$mail->AddAddress("recipient-email@domain", "recipient-name");
$mail->SetFrom("noreply@ualinventarium.com", "UAL-Inventarium System");
//$mail->AddReplyTo("reply-to-email@domain", "reply-to-name");
//$mail->AddCC("cc-recipient-email@domain", "cc-recipient-name");

$mail->Subject = "Recupere su clave de seguridad de usuario";
$mail->Body = "
Ha solicitado recuperar su contraseña de acceso. <br><br>

<b>Porfavor ingrese a la siguiente dirección para iniciar el proceso de recuperacion: http://localhost/UALInventarium/apis/creacion/recoverPassword.php?verify={$idVerificacion}</b>

<br><br>
Que tenga un buen día, <br>
Atte. UAL-Inventarium
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