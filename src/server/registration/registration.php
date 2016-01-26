<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $request = file_get_contents('php://input');
    $request = utf8_encode($request);
    $user_request = json_decode($request, true);
    $user = (array) $user_request;

    if ($user['username'] !== null && $user['email'] !== null && $user['password'] !== null) {
      $username = trim($user['username']);
      $email = trim($user['email']);
      $password = trim($user['password']);
      //$password_confirmation = trim($_POST['password_confirmation']);
      $newUser = array ('role' => 'member',
                        'username' => $username,
                        'email' => $email,
                        'password' => $password,
                      );


      //connect to db
      $db = new mysqli("localhost", "root", "admin", "le-huard");
      if ($db -> connect_error) {
          http_response_code(404);
	    }
      else {
          //do this dank stuff

          //check if username exists
          $check_username_query = $db -> query("SELECT * FROM member WHERE username = '".$newUser['username']."'") or die("Error: check_username_query");
          if (mysqli_num_rows($check_username_query) > 0) {
            //return the 409
            http_response_code(409);
          }
          else {
            //username doesn't exist
            //check if email exists
            $check_email_query = $db -> query("SELECT * FROM member WHERE email = '".$newUser['email']."'") or die("Error: check_email_query");
            if (mysqli_num_rows($check_email_query) > 0) {
              http_response_code(409);
            }
            else {
              //email doesn't exist, insert new user into db
              $insert_member_query = $db -> query("call setMember('".$newUser['role']."','"
                                                                   .$newUser['username']."','"
                                                                   .$newUser['password']."','"
                                                                   .$newUser['email']."')")
                                                  or die("Error: insert_member_query");
              http_response_code(201);
              //header("location:/#/connection");
              //exit();
            }

          }
      }
    } else {
        http_response_code(404);
        //mysqli_close($db);
    }
  }
  else {
    http_response_code(404);
  }

?>
