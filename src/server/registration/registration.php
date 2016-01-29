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
            //username already exists
            http_response_code(409);
          }
          else {
            //check if email exists
            $check_email_query = $db -> query("SELECT * FROM member WHERE email = '".$newUser['email']."'") or die("Error: check_email_query");
            if (mysqli_num_rows($check_email_query) > 0) {
              //email already exists
              http_response_code(409);
            }
            else {
              //username and email don't already exist, insert new user into db
              $insert_member_query = $db -> query("call setMember('".$newUser['role']."','"
                                                                   .$newUser['username']."','"
                                                                   .$newUser['password']."','"
                                                                   .$newUser['email']."')")
                                                  or die("Error: insert_member_query");
              //new member inserted
              http_response_code(201);
            }
          }
      }
    } else {
        //form values not found
        http_response_code(404);
    }
  }
  else {
    //correct server request method not found
    http_response_code(404);
  }

?>
