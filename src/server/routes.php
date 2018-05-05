<?php

require_once('handlers/Appointments.php');

$not_implemented = function($request, $response, $args)
{
  $method = $request->getMethod();
  $message = "This endpoint of type $method has not been implemented yet.";

  return $response->withStatus(200)
    ->withHeader('Content-Type', 'application/json')
    ->write(json_encode($message));
};

$app->group('/api/v1/appointments', function() {
  global $not_implemented;

  // Routing logic for /appointments
  $this->map(['GET', 'POST'], '', function($req, $res, $args) {
    switch ($req->getMethod()) {
      case 'GET':
        return AppointmentsHandler::get($req, $res, $args);
      case 'POST':
        return AppointmentsHandler::post($req, $res, $args);
    };
  });

  // Routing logic for /appointments/:id
  $this->map(['GET', 'PATCH'], '/{id}', function($req, $res, $args) {
    switch ($req->getMethod()) {
      case 'GET':
        return AppointmentsHandler::get_id($req, $res, $args);
      case 'PATCH':
        return AppointmentsHandler::patch_id($req, $res, $args);
    };
  });

  $this->get('/by-date/{date}', function($req, $res, $args) {
    return AppointmentsHandler::get_by_date($req, $res, $args);
  });

  $this->patch('/{id}/confirm', function($req, $res, $args) {
    return AppointmentsHandler::confirm($req, $res, $args);
  });

  $this->patch('/{id}/reject', function($req, $res, $args) {
    return AppointmentsHandler::reject($req, $res, $args);
  });

  $this->delete('/{secret}/cancel', function($req, $res, $args) {
    return AppointmentsHandler::cancel($req, $res, $args);
  });
});
