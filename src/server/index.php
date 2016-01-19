<?php

require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';

$app = new \Slim\App();

//$container defines where php should look for our 2 index.html files
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

// API routes should either return json data based on the Database or a header
// status signaling an insert, update or delete
$app->group('/api', function () {

    $this->get('/media', function ($request, $response, $args) {
        $response = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/src/server/api/media.json');

        return $response;
    });
    $this->put('/login', function ($request, $response, $args) {
        $credentials = $request->getParsedBody();
        if ($credentials['username'] == 'admin@admin.com' && $credentials['password'] == 'admin') {
            $session = [
              'id' => '2',
              'user' => [
                    'userId' => '2',
                    'userName' => 'admin',
                    'userRole' => 'admin',
                ],
            ];
            file_put_contents($_SERVER['DOCUMENT_ROOT'].'/src/server/api/session-state.json', json_encode($session));
            $response->getBody()->write(json_encode($session));
            return $response->withStatus(201);
        }

        return $response->withStatus(404);
    });
    $this->get('/login', function($request, $response, $args){
        $response->getBody()->write(file_get_contents($_SERVER['DOCUMENT_ROOT'].'/src/server/api/session-state.json'));
        return $response->withStatus(200);
    });
    $this->delete('/login', function($request, $response, $args) {
        // since I do not have the db yet, just replace the content of session-state.json
        // to the default viewer user session
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
