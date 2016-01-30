<?php
  session_start();
  $userID = $_SESSION['user_state']['user']['userId'];

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $request = file_get_contents('php://input');
    $request = utf8_encode($request);
    $password_request = json_decode($request, true);
    $password = (array) $password_request;

    if ($userID !== null && $password['password'] !== null) {
      $password = trim($password['password']);

      //connect to db
      $db = new mysqli("localhost", "root", "admin", "le-huard");
      if ($db -> connect_error) {
          http_response_code(404);
	    }
      else {
          //do this dank stuff
          //validate if current password is correct
          $get_member_query = $db -> query("SELECT * FROM member WHERE id = ".$userID) or die("Error: get_member_query");
          if (mysqli_num_rows($get_member_query) > 0) {
            //member was found, find current password
            $member = $get_member_query -> fetch_assoc();
            $memberPW = $member['password'];
            //check for data states and if passwords match
            if ($memberPW !== null && $password !== null && $memberPW === $password) {
                //current password given and current password found are the same, replace with new password
                $delete_account_query = $db -> query("call deleteMember('".$userID."')")
                                                or die("Error: delete_account_query");

                //account deleted
                http_response_code(201);
            }
            else {
                //the given current password conflicted with password in db
                http_response_code(409);
            }
          }
          else {
              //member not found in db
              http_response_code(404);
          }
      }
    }
    else {
        //form values not found
        http_response_code(404);
    }
  }
  else {
    //correct server request method not found
    http_response_code(404);
  }

?>
