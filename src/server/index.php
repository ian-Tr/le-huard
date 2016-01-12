<?php

require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';

$app = new \Slim\Slim(array(
    'templates.path' => $_SERVER['DOCUMENT_ROOT'].'/src/client',
));

$app->get('/', function () use ($app) {
    $app->render('index.html');
});

$app->get('/api/media', 'getMedia');

$app->run();

function getMedia()
{
    header('Content-Type: application/json');
    $file = $_SERVER['DOCUMENT_ROOT'].'/src/server/api/media.json';
    $media = file_get_contents($file);
    echo ($media);
}
