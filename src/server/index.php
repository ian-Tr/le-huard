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
            'id' => '1',
            'user' => [
                'userId' => '1',
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
        if ($status === 419) {
            return $response->withStatus($status);
        }
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
        if ($status === 419) {
            return $response->withStatus($status);
        }
        // this line gets the credentials entered in the connection form as associative array
        // $credentials = [
        //     username => value,
        //     password => value
        // ]
        $credentials = $request->getParsedBody();
        // instead of this hard coded line we need to  querry the database to find
        // if the user is valid
        if ($credentials['username'] == 'admin@admin.com' && $credentials['password'] == 'admin') {
            // if the user is found and valid create a new $_SESSION with
            // the user info as follows
            $session = [
              'id' => '2',
              'user' => [
                    'userId' => '2',
                    'userName' => 'admin',
                    'userRole' => 'admin',
                ],
            ];
            $_SESSION['user_state'] = $session;
            // encode the associative array
            $response->getBody()->write(json_encode($session));
            // always return with right status
            return $response->withStatus(201);
        }

        return $response->withStatus(404);
    });
    $this->get('/login', function ($request, $response, $args) {
        if ($status === 419) {
            return $response->withStatus($status);
        }
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
            'id' => '1',
            'user' => [
                'userId' => '1',
                'userName' => '',
                'userRole' => 'viewer',
            ],
        ];
        $_SESSION[user_state] = $session;
        $response->getBody()->write(json_encode($session));

        return $response->withStatus(200);
    });
});

$app->run();
