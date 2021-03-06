<?php
session_start();

if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY']) < 450) {
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
                    //post was found
                    $record = $get_post_query -> fetch_assoc();
                    $mediaID = $record['media_id'];
                    $medium = $record['medium'];

                    //update post info
                    $update_post_query = $db -> query("call updatePost('".$post['id']."','"
                                                                         .$post['medium']."','"
                                                                         .$post['medium_type']."','"
                                                                         .$post['medium_spec']."','"
                                                                         .$post['title']."','"
                                                                         .$post['media_date']."')")
                                                      or die("Error: update_post_query");

                    //find media record
                    $get_url_query = $db -> query("SELECT * FROM media WHERE id = '".$mediaID."'") or die("Error: get_url_query");
                    if (mysqli_num_rows($get_url_query) > 0) {
                      //media record found, get url
                      $media = $get_url_query -> fetch_assoc();
                      $oldUrl = $media['url'];

                        //move file
                        $extension = pathinfo($oldUrl, PATHINFO_EXTENSION);
                        $newUrl = "/src/client/photos/".$post['medium_type']."/".$post['medium_spec']."/".$post['title'].".".$extension;
                        rename($_SERVER['DOCUMENT_ROOT'].$oldUrl, $_SERVER['DOCUMENT_ROOT'].$newUrl);

                        //update media url
                        $update_media_query = $db -> query("call updateMedia('".$mediaID."','"
                                                                              .$newUrl."')")
                                                          or die("Error: update_media_query");

                        //post updated
                        http_response_code(201);

                    }
                    else {
                      //media not found
                      http_response_code(404);
                    }
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
