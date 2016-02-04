<?php

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $request = file_get_contents('php://input');
    $request = utf8_encode($request);
    $contact_request = json_decode($request, true);
    $contact = (array) $contact_request;

    if ($contact !== null && $contact['email'] !== '' && $contact['subject'] !== '' && $contact['message'] !== '') {
      $db = new mysqli("localhost", "root", "admin", "le-huard");
      if ($db -> connect_error) {
          http_response_code(404);
	    }
      else {
        //do this dank stuff
        //get Alex's email
        $get_alex_query = $db -> query("SELECT * FROM member WHERE id = 1") or die("Error: get_alex_query");
        if (mysqli_num_rows($get_alex_query) > 0) {
          //alex email was found
          $alex = $get_alex_query -> fetch_assoc();
          $alexEmail = $alex['email'];
          //construct mail parameters
          //$to = $alexEmail;
          $to = "ianthetremblay2@gmail.com";
          $from = $contact['email'];
          $subject = $contact['subject'];
          $message = $contact['message'];
          $headers = array();
          $headers[] = ('From: '.$from);
          $headers[] = ('Bcc: '.$from);

          //send email
          if (mail($to, $subject, $message, implode("\r\n", $headers))) {
            //email sent
            http_response_code(201);
          }
          else {
            //email failed
            http_response_code(409);
          }
        }
        else {
          //alex not found in db
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
