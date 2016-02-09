<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $request = file_get_contents('php://input');
    $request = utf8_encode($request);
    $forgot_request = json_decode($request, true);
    $forgot = (array) $forgot_request;
    var_dump($forgot);

    if ($forgot['email'] !== null && $forgot['email'] !== '') {
      $forgotEmail = $forgot['email'];

      $db = new mysqli("localhost", "root", "admin", "le-huard");
      if ($db -> connect_error) {
          http_response_code(404);
	    }
      else {
        //do this dank stuff
        //look for email in db
        $find_email_query = $db -> query("SELECT * FROM member WHERE email = '".$forgotEmail."'") or die("Error: find_email_query");
        if (mysqli_num_rows($find_email_query) > 0) {
          //email was found in db, get email and id for later
          $account = $find_email_query -> fetch_assoc();
          $accountEmail = $account['email'];
          $accountID = $account['id'];

          //generate a new password
          $characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          $length = strlen($characters);
          $randomString = "";
          for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $length - 1)];
          }
          $newPassword = substr($randomString, 0, 10);

          //hash and salt the new password
          $hashOptions = [
            'cost' => 10,
            'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM)
          ];
          $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT, $hashOptions);

          //set their new password in db
          $set_password_query = $db -> query("call updateMemberPassword('".$accountID."','"
                                                                          .$hashedPassword."')")
                                            or die("Error: set_password_query");

          //construct mail parameters
          $to = $accountEmail;
          $from = "lehuardsystem@outlook.com";
          $subject = "Forgot Password Reset";
          $message = "Your password has been reset to the following: ".$randomString.". You can log in using this password and change it to something else in your Account Settings.";
          $headers = array();
          $headers[] = ('From: '.$from);
          $headers[] = ('Bcc: '.$from);

          //send email
          if (mail($to, $subject, $message, implode("\r\n", $headers))) {
            //email created
            http_response_code(201);
          }
          else {
            //server failed to send email
            http_response_code(409);
          }
        }
        else {
          //email wasn't found in db
          http_response_code(404);
        }
      }
    }
    else {
      //form data not found
      http_response_code(404);
    }
  }
  else {
    //correct server request method not found
    http_response_code(404);
  }

?>
