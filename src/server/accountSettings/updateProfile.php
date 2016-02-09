<?php
session_start();

if (isset($_SESSION['LAST_ACTIVITY']) && time() - $_SESSION['LAST_ACTIVITY'] < 450) {
    if (isset($_SESSION['user_state'])) {
      $userStateID = $_SESSION['user_state']['id'];
      if ($userStateID === '0') {
        //default user state id, eject
        http_response_code(401);
      }
      else {
        $userRole = $_SESSION['user_state']['user']['userRole'];
        if ($userRole === 'viewer') {
          //default user role, eject
          http_response_code(403);
        }
        else {
          $userID = $_SESSION['user_state']['user']['userId'];

          if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $request = file_get_contents('php://input');
            $request = utf8_encode($request);
            $profile_request = json_decode($request, true);
            $profile = (array) $profile_request;

            if ($userID !== null && $userRole !== null && $profile['email'] !== null) {
              $email = trim($profile['email']);
              $about = $profile['about'];

              //connect to db
              $db = new mysqli("localhost", "root", "admin", "le-huard");
              if ($db -> connect_error) {
                  http_response_code(404);
        	    }
              else {
                  //do this dank stuff
                  //retrieve member info
                  $get_member_query = $db -> query("SELECT * FROM member WHERE id = ".$userID) or die("Error: get_member_query");
                  if (mysqli_num_rows($get_member_query) > 0) {
                    //member was found
                    if ($about !== null) {
                      $update_about_query = $db -> query("call updateMemberAbout('".$userID."','"
                                                                                   .$about."')")
                                                or die("Error: update_about_query");
                    }
                    //find current email
                    $member = $get_member_query -> fetch_assoc();
                    $memberEmail = $member['email'];
                    if ($memberEmail !== null) {
                      //check if they match
                      if ($memberEmail !== $email) {
                        //member email was found and they don't match, check if anyone else is using the new email
                        $check_emails_query = $db -> query("SELECT email FROM member WHERE email = '".$email."'") or die("Error: check_emails_query");
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
        }
      }
    }
    else {
      //user state not found
      session_destroy();
      $session = [
          'id' => '0',
          'user' => [
              'userId' => '0',
              'userName' => '',
              'userRole' => 'viewer',
          ],
      ];
      $_SESSION['user_state'] = $session;
      http_response_code(419);
    }
}
else {
  //session has expired
  session_destroy();
  $session = [
      'id' => '0',
      'user' => [
          'userId' => '0',
          'userName' => '',
          'userRole' => 'viewer',
      ],
  ];
  $_SESSION['user_state'] = $session;
  http_response_code(419);
}

?>
