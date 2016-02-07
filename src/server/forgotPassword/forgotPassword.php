<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $request = file_get_contents('php://input');
    $request = utf8_encode($request);
    $forgot_request = json_decode($request, true);
    $forgot = (array) $forgot_request;
    echo "server request";
    var_dump($forgot);
    var_dump($forgot['email']);

    if ($forgot['email'] !== null && $forgot['email'] !== '') {
      $forgotEmail = $forgot['email'];
      echo "nulls";
      $db = new mysqli("localhost", "root", "admin", "le-huard");
      if ($db -> connect_error) {
        echo "db";
          http_response_code(404);
	    }
      else {
        echo "dank";
        //do this dank stuff
        //look for email in db
        var_dump($forgotEmail);
        $find_email_query = $db -> query("SELECT * FROM member WHERE email = '".$forgotEmail."'") or die("Error: find_email_query");
        if (mysqli_num_rows($find_email_query) > 0) {
          echo "email found";
          //email was found in db
          $account = $find_email_query -> fetch_assoc();
          $accountEmail = $account['email'];
          $accountPassword =

          $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
          $characterLength = strlen($characters);
          $randomString = '';
          for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
          }
          var_dump($characterLength);
          var_dump($randomString);

          //construct mail parameters
          $to = $accountEmail;
          $from = $contact['email'];
          $subject = $contact['subject'];
          $message = $contact['message'];
          $headers = array();
          $headers[] = ('From: '.$from);
          $headers[] = ('Bcc: '.$from);

          /*
          //send email
          if (mail($to, $subject, $message, implode("\r\n", $headers))) {
            //email sent
            http_response_code(201);
          }
          else {
            //server failed to send email
            http_response_code(409);
          }
          */

        }
        else {
          //email wasn't found in db
          echo "email not found";
          http_response_code(404);
        }
      }
    }
    else {
      echo "form data";
      //form data not found
      http_response_code(404);
    }
  }
  else {
    echo "server request";
    //correct server request method not found
    http_response_code(404);
  }

?>
