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
        if ($userRole === 'viewer' || $userRole === 'admin') {
          //default user role, eject
          http_response_code(403);
        }
        else {
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
                    if ($password !== null && $memberPW !== null && password_verify($password, $memberPW)) {
                        //current password given and current password found are the same, replace with new password
                        $delete_account_query = $db -> query("call deleteMember('".$userID."')")
                                                        or die("Error: delete_account_query");


                        //account deleted, set user state to default
                        $session = [
                            'id' => '0',
                            'user' => [
                                'userId' => '0',
                                'userName' => '',
                                'userRole' => 'viewer',
                            ],
                        ];
                        $_SESSION['user_state'] = $session;

                        http_response_code(200);
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
