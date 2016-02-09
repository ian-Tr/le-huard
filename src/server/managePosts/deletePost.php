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
        if ($userRole === 'viewer' || $userRole === 'member') {
          //default user role, eject
          http_response_code(403);
        }
        else {
          if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $request = file_get_contents('php://input');
            $request = utf8_encode($request);
            $post_request = json_decode($request, true);
            $post = (array) $post_request;

            if ($userRole !== null && $userRole === 'admin' && $post['id'] !== null) {
              //connect to db
              $db = new mysqli("localhost", "root", "admin", "le-huard");
              if ($db -> connect_error) {
                  http_response_code(404);
        	    }
              else {
                  //do this dank stuff
                  //verify post exists in db
                  $get_post_query = $db -> query("SELECT * FROM post WHERE id = '".$post['id']."'") or die("Error: get_post_query");
                  if (mysqli_num_rows($get_post_query) > 0) {
                    //post was found, delete it
                    $delete_post_query = $db -> query("call deletePost('".$post['id']."')")
                                                      or die("Error: delete_post_query");

                    //post deleted
                    http_response_code(201);
                  }
                  else {
                    //post not found in db
                    http_response_code(404);
                  }
              }
            }
            else {
              //app userRole not admin or postId not found
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
