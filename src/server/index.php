<?php
require 'vendor/autoload.php';
use Illuminate\Database\Capsule\Manager as Capsule;

date_default_timezone_set('Asia/Manila');

// Slim API.
$app = new \Slim\App();

// Configure ORM.
$capsule = new Capsule;
$capsule->addConnection([
  'driver'    => 'mysql',
  'host'      => 'localhost',
  'database'  => 'is226',
  'username'  => 'root',
  'password'  => '',
  'charset'   => 'utf8',
  'collation' => 'utf8_unicode_ci',
  'prefix'    => '',
]);
$capsule->setAsGlobal();
$capsule->bootEloquent();

// Serve our application bundled by webpack.
$app->get('/', function() {
  echo file_get_contents('dist/index.html');
});

require_once('routes.php');

$app->run();
