<?php

require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';

$app = new \Slim\App();

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
    return $this->view->render($response, '/landing-app/index.html');
});

$app->get('/admin', function($request, $response, $args) {
    return $this->view->render($response, '/admin-app/index.html');
});

// API routes should return json data based on the Database
$app->group('/api', function () {
    $this->get('/media', function ($request, $response, $args) {
        $response = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/src/server/api/media.json');
        return $response;
    });
    $this->get('/user', function ($request, $response, $args) {
        $response = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/src/server/api/users.json');
        //db query
        // determine active user
        return $response;
    });
});

$app->run();
