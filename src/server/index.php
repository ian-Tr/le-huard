<?php


require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';

session_start();

////////////// app configuration ///////////////////////////////////////////////
// this is to get more detailed error messaged from Slim ///////////////////////
$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);

// pass the configuration on app init //////////////////////////////////////////
$app = new \Slim\App($c);

// define the $app's package dependencies inside containers ////////////////////
$container = $app->getContainer();

// Twig is to render basic html, it has other uses but we have no choice to use
// a rendering engine with Slim ////////////////////////////////////////////////
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig($_SERVER['DOCUMENT_ROOT'].'/src/client/', [
        'cache' => false,
    ]);
    $view->addExtension(new \Slim\Views\TwigExtension(
        $container['router'],
        $container['request']->getUri()
    ));

    return $view;
};

// duncan3dc\SqlClass\Sql is a data/abstraction layer class for interfacing ////
// with our db: why reinvent the wheel? ////////////////////////////////////////
$container['sql'] = function ($container) {
    duncan3dc\SqlClass\Sql::addServer('le-huard', [
        'mode' => 'mysql',
        'hostname' => '127.0.0.1',
        'username' => 'root',
        'password' => 'admin',
        'database' => 'le-huard',
    ]);
    $sql = duncan3dc\SqlClass\Sql::getInstance('le-huard');

    return $sql;
};
/////////////// end app config and container declaration //////////////////////

/////////////////////////////////// ROUTES /////////////////////////////////////
// when accessing the root of the website we should return the angul app at ////
// index.html and let it handle its own routes /////////////////////////////////
$app->get('/', function ($request, $response, $args) {
    // check if session timedout
    if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 900)) {
        // last request was more than 30 minutes ago
        echo 'session was destroyed';
        session_unset();     // unset $_SESSION variable for the run-time
        session_destroy();   // destroy session data in storage
        // put defaults in session
        $session = [
            'id' => '1',
            'user' => [
                'userId' => '1',
                'userName' => '',
                'userRole' => 'viewer',
            ],
        ];
        $_SESSION['user_state'] = $session;
    }
    // put defaults in session on first time visit
    if (!isset($_SESSION['user_state']) && empty($_SESSION['user_state'])) {
        $session = [
            'id' => '0',
            'user' => [
                'userId' => '0',
                'userName' => '',
                'userRole' => 'viewer',
            ],
        ];
        $_SESSION['user_state'] = $session;
    }
    // set last activity time
    $_SESSION['LAST_ACTIVITY'] = time();
    // serve the angular app ///////////////////////////////////////////////////
    return $this->view->render($response, '/app/index.html');
});
////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// API ///////////////////////////////////////////
// API routes should either return json data based on the Database or a header
// status code
//
// POST (create): 201 created, 404 not found, 409 conflict (already exists)
// GET (read): 200 ok, 404 not found
// PUT (update): 200 ok, 204 no content, 404 not found,
// DELETE (delete): 200 ok, 404 not found
//
// we also need to check for authorization and authentication on each call
// 401: AUTH_EVENTS.notAuthenticated
// 403: AUTH_EVENTS.notAuthorized
// 419: AUTH_EVENTS.sessionTimeout
// 440: AUTH_EVENTS.sessionTimeout (IE only)
$app->group('/api', function () {
    $status = 200;
    // check if session timedout
    if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 900)) {
        // last request was more than 30 minutes ago
        echo 'session was destroyed';
        session_unset();     // unset $_SESSION variable for the run-time
        session_destroy();   // destroy session data in storage
        // put defaults in session
        $session = [
            'id' => '1',
            'user' => [
                'userId' => '1',
                'userName' => '',
                'userRole' => 'viewer',
            ],
        ];
        $_SESSION['user_state'] = $session;
        $status = 419;
    }
    // set last activity time
    $_SESSION['LAST_ACTIVITY'] = time();

    ////////////////////////////////////////////////////////////////////////////
    // /API/MEDIA /////////////////////////////////////////////////////////////
    // returns the info on the post and media angular needs in it's views /////
    ///////////////////////////////////////////////////////////////////////////
    $this->get('/media', function ($request, $response, $args) {
        // if ($status === 419) {
        //     return $response->withStatus($status);
        // }
        $db = $this->sql;
        if ($db) {
            $result = $db->query('call getPostMedia');
            if ($result) {
                while ($row = $result->fetch()) {
                    $media[] = $row;
                }
                if ($media) {
                    $response->getBody()->write(json_encode($media));

                    return $response->withStatus(200);
                }
            }
        }

        return $response->withStatus(404);
    });
    ///////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////
    // /API/LOGIN //////////////////////////////////////////////////////////////
    // validates the user credentials against the db and creates a $_SESSION ///
    // don't worry about security just yet so no need to hash & salt the ///////
    // password ////////////////////////////////////////////////////////////////
    $this->post('/login', function ($request, $response, $args) {
        // if ($status === 419) {
        //     return $response->withStatus($status);
        // }
        $credentials = $request->getParsedBody();
        $db = $this->sql;
        if ($db) {
            $result = $db->query('call getMember');
            if ($result) {
                while ($row = $result->fetch()) {
                    $users[] = $row;
                }
                if ($users) {
                    foreach ($users as $user) {
                        if ($credentials['username'] === $user['email']) {
                            // valid username
                            if ($credentials['password'] === $user['password']) {
                                // valid password
                                $session = [
                                    'id' => $user['id'],
                                    'user' => [
                                        'userId' => $user['id'],
                                        'userName' => $user['username'],
                                        'userRole' => $user['role']
                                    ],
                                ];
                                $_SESSION['user_state'] = $session;
                                $response->getBody()->write(json_encode($session));
                                return $response->withStatus(201);
                            }
                        }
                    }
                    $error = [
                        'reason' => 'invalid credentials.'
                    ];
                    $response->getBody()->write(json_encode($error));
                    return $response->withStatus(404);
                }
            }
        }
        return $response->withStatus(404);
    });
    $this->get('/login', function ($request, $response, $args) {
        // return the session_state in json format
        if (!isset($_SESSION['user_state']) && empty($_SESSION['user_state'])) {
            $session = [
                'id' => '1',
                'user' => [
                    'userId' => '1',
                    'userName' => '',
                    'userRole' => 'viewer',
                ],
            ];
            $_SESSION['user_state'] = $session;
        }
        $session = $_SESSION['user_state'];
        $response->getBody()->write(json_encode($session));
        return $response->withStatus(200);
    });
    $this->delete('/login', function ($request, $response, $args) {
        // default $_SESSION should be this, so when we call delete
        // we should actually juste update the $_SESSION with those values
        $session = [
            'id' => '0',
            'user' => [
                'userId' => '0',
                'userName' => '',
                'userRole' => 'viewer',
            ],
        ];
        $_SESSION[user_state] = $session;
        $response->getBody()->write(json_encode($session));

        return $response->withStatus(200);
    });
    ///////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////
    // /API/USERS //////////////////////////////////////////////////////////////
    // returns the list of all users from the db ///////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    $this->get('/users', function($request, $response, $args) {
        // check if session timed out
        // if ($status === 419) {
        //     return $response->withStatus($status);
        // }
        $db = $this->sql;
        if ($db) {
            $result = $db->query('call getMembers');
            if ($result) {
                while ($row = $result->fetch()) {
                    $users[] = $row;
                }
                if ($users) {
                    $response->getBody()->write(json_encode($users));

                    return $response->withStatus(200);
                }
            }
        }

        return $response->withStatus(404);
    });
    $this->delete('/user{id}', function($request, $response, $args) {
        $userId = $args['id'];
        $db = $this->sql;
        if ($db) {
            $result = $db->query('call deleteMember('.$userId.')');
            if ($result) {
                $response->getBody()->write(json_encode($userId));
                return $response->withStatus(200);
            }
        }
        return $response->withStatus(404);
    });
    $this->post('/post', function($request, $response, $args) {
        $userId = $_SESSION['user_state']['user']['userId'];
        $filename = $_FILES['file']['name'];
        $title = $_POST['title'];
        $type = $_POST['type'];
        $medium = ($type === 'Film') ? 'Film' : 'Photo';
        $spec = $_POST['spec'];
        $date = $_POST['date'];
        if ($spec) {
          $destination = '/src/client/photos/'.$type.'/'.$spec.'/'.$filename;
        } else {
          $destination = '/src/client/photos/'.$type.'/'.$filename;
        }
        $db = $this->sql;
        if ($db) {
            if ($destination) {
                try {
                    $media_inserted = $db->query('call setMedia(?)', [$destination]);
                    try {
                        $mediaId = $db->query('call getMediaUrl(?)', [$destination]);
                        while ($row = $mediaId->fetch()) {
                            $id = $row['id'];
                        }
                        $mediaId->free();
                        $db->next_result();
                        try {
                            $post_inserted = $db->query('call setPost(?, ?, ?, ?, ?, ?, ?)', [$userId, $id, $medium, $type, $spec, $title, $date]);
                            $success = move_uploaded_file($_FILES['file']['tmp_name'], $_SERVER['DOCUMENT_ROOT'].$destination);
                            if ($success) {
                                return $response->withStatus(201);
                            } else {
                                var_dump($_FILES['file']['tmp_name']);
                                $response->getBody()->write('could not move uploaded file');
                                return $response->withStatus(404);
                            }
                        }
                        catch (Exception $e) {
                          $response->getBody()->write('post already exists'.$e->getMessage());
                          return $response->withStatus(409);
                        }
                    }
                    catch (Exception $e) {
                        $response->getBody()->write('media not found');
                        return $response->withStatus(404);
                    }

                }
                catch(Exception $e) {
                    $response->getBody()->write('media already exists');
                    return $response->withStatus(409);
                }
            }
        }
        $response->getBody()->write('connection couldn\'t be established with server');
        return $response->withStatus(404);
    });
});

$app->run();
