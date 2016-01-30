<?php
  session_start();
  $userID = $_SESSION['user_state']['user']['userId'];
  $userRole = $_SESSION['user_state']['user']['userRole'];

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $request = file_get_contents('php://input');
    $request = utf8_encode($request);
    $profile_request = json_decode($request, true);
    $profile = (array) $profile_request;

    if ($userID !== null && $userRole !== null && $profile['email'] !== null) {
      $email = trim($profile['email']);
      $about = trim($profile['about']);

      //connect to db
      $db = new mysqli("localhost", "root", "admin", "le-huard");
      if ($db -> connect_error) {
          http_response_code(404);
	    }
      else {
          //do this dank stuff
          $get_member_query = $db -> query("SELECT * FROM member WHERE id = ".$userID) or die("Error: get_member_query");
          if (mysqli_num_rows($get_member_query) > 0) {
            //member was found
            if ($about !== null) {
              $update_about_query = query("call updateMemberAbout('".$userID."','"
                                                                    .$about."')")
                                        or die("Error: update_email_query");
            }
            //find current email
            $member = $get_member_query -> fetch_assoc();
            $memberEmail = $member['email'];
            if ($memberEmail !== null) {
              //check if they match
              if ($memberEmail !== $email) {
                //member email was found and they don't match, check if anyone else is using the new email
                $check_emails_query = $db -> query("SELECT email FROM member WHERE email = ".$email) or die("Error: check_emails_query");
                if (mysqli_num_rows($check_emails_query) > 0) {
                  //email is already in use
                  http_response_code(409);
                }
                else {
                  //email is not already in use, change for new one
                  $update_email_query = $db -> query("call updateMemberEmail('".$userID."','"
                                                                               .$email."')")
                                                    or die("Error: update_email_query");

                  //email updated
                  http_response_code(201);
                }
              }
              else {
                //email didn't change, do nothing more
                http_response_code(201);
              }
            }
            else {
              //member email was not retrieved from db
              http_response_code(404);
            }
          }
          else {
            //member not found in db
            http_response_code(404);
          }
      }
    }
    else {
      //app user state not found
      http_response_code(404);
    }
  }
  else {
    //correct server request method not found
    http_response_code(404);
  }

?>
