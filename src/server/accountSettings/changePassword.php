<?php
  session_start();
  $userID = $_SESSION['user_state']['user']['userId'];

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $request = file_get_contents('php://input');
    $request = utf8_encode($request);
    $passwords_request = json_decode($request, true);
    $passwords = (array) $passwords_request;

    if ($userID !== null && $passwords['currentPassword'] !== null && $passwords['newPassword'] !== null) {
      $currentPassword = trim($passwords['currentPassword']);
      $newPassword = trim($passwords['newPassword']);

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
            //verify data states and verify that they match
            if ($memberPW !== null && $currentPassword !== null && $memberPW === $currentPassword) {
                //current password given and current password found are the same, replace with new password
                $change_password_query = $db -> query("call updateMemberPassword('".$userID."','"
                                                                                   .$newPassword."')")
                                                  or die("Error: change_password_query");
                //new password set
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
