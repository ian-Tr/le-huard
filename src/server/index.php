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
    //every api routes defined inside here is accessible at /api
    $this->get('/media', function ($request, $response, $args) {
        $response = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/src/server/api/media.json');

        return $response;
    });
    $this->get('/user', function ($request, $response, $args) {
        $response = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/src/server/api/users.json');

        return $response;
    });
});

$app->run();
