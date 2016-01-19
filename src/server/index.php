<?php

require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';

$app = new \Slim\App();

//$container defines where php should look for then angular index.html file
$container = $app->getContainer();

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

// when accessing the root of the website we should return the portfolio app at index.html
// and let it handle its own routes
$app->get('/', function ($request, $response, $args) {
    return $this->view->render($response, '/app/index.html');
});

// API routes should either return json data based on the Database or a header status code
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

    // returns the content of the media.json file
    // needs to return a json_encoded associative array containing
    // all information on all posts
    $this->get('/media', function ($request, $response, $args) {
        $response = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/src/server/api/media.json');

        return $response;
    });

    // validates the user credentials against the db and creates a $_SESSION
    // don't worry about security just yet so no need to hash & salt the password
    $this->post('/login', function ($request, $response, $args) {
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
            file_put_contents($_SERVER['DOCUMENT_ROOT'].'/src/server/api/session-state.json', json_encode($session));
            // encode the associative array
            $response->getBody()->write(json_encode($session));
            // always return with right status
            return $response->withStatus(201);
        }

        return $response->withStatus(404);
    });
    $this->put('/login', function ($request, $response, $args) {
        // return the session_state in json format
        $response->getBody()->write(file_get_contents($_SERVER['DOCUMENT_ROOT'].'/src/server/api/session-state.json'));

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
        file_put_contents($_SERVER['DOCUMENT_ROOT'].'/src/server/api/session-state.json', json_encode($session));
        $response->getBody()->write(json_encode($session));

        return $response->withStatus(200);
    });
});

$app->run();
