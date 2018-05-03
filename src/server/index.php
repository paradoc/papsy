<?php
require 'vendor/autoload.php';

$app = new \Slim\App();

$app->get('/api/v1/hello/{name}', function($request, $response, $args) {
  $name = $args['name'];
  echo "Hello, $name";
});

$app->get('/', function() {
  echo file_get_contents('dist/index.html');
});

$app->run();
