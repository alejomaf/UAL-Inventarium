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
$mail->AddAddress("alejoemma@gmail.com");
//$mail->AddAddress("recipient-email@domain", "recipient-name");
//$mail->SetFrom("ualinventarium@gmail.com", "from-name");
//$mail->AddReplyTo("reply-to-email@domain", "reply-to-name");
//$mail->AddCC("cc-recipient-email@domain", "cc-recipient-name");

$mail->Subject = "Confirmación de registro de usuario";
$mail->Body = "<b>Porfavor confirme su registro de usuario</b>";
//$content = "<b>Porfavor confirme su registro de usuario</b>";


//$mail->MsgHTML($content); 
if(!$mail->Send()) {
  echo "Error while sending Email.";
  var_dump($mail);
} else {
  echo "Email sent successfully";
}

?>