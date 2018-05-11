<?php

require_once('models/Appointments.php');
require_once('models/Patients.php');
require_once('sms.php');

use Illuminate\Database\Eloquent\ModelNotFoundException as NotFound;

/**
 * Class AppointmentsHandler
 * @author paradoc
 */
class AppointmentsHandler
{
  /**
   * undocumented function
   *
   * @return void
   */
  public static function get($req, $res, $args)
  {
    $date = $req->getQueryParam('on');
    $status = $req->getQueryParam('s');
    $doctor = $req->getQueryParam('d');

    $conditions = [];

    if ($date) {
      array_push($conditions, ['schedule_from', 'like', $date.'%']);
    }

    if ($status) {
      array_push($conditions, ['status', '=', $status]);
    }

    if ($doctor) {
      array_push($conditions, ['doctor_id', '=', $doctor]);
    }

    if (count($conditions) > 0) {
      return $res->withJson(Appointments::where($conditions)->get());
    }

    return $res->withJson(Appointments::all());
  }

  /**
   * undocumented function
   *
   * @return void
   */
  public static function get_view($req, $res, $args)
  {
    $appointment = Appointments::with([
        'treatment:id,name',
        'doctor:id,name',
      ])
      ->where('secret', $args['secret'])
      ->get();

    return $res->withJson($appointment);
  }

  /**
   * undocumented function
   *
   * @return void
   */
  public static function get_admin_view($req, $res, $args)
  {
    $appointments = Appointments::with([
        'patient:id,last_name,first_name',
        'treatment:id,name',
      ])
      ->where('doctor_id', $req->getQueryParam('d'))
      ->where('status', 'requested')->get();

    return $res->withJson($appointments);
  }

  /**
   * undocumented function
   *
   * @return void
   */
  public static function get_id($req, $res, $args)
  {
    try {
      $data = Appointments::findOrFail($args['id']);
      return $res->withJson($data);
    } catch (NotFound $e) {
      throw new \Slim\Exception\NotFoundException($req, $res);
    }
  }

  /**
   * undocumented function
   *
   * @return void
   */
  public static function post($req, $res, $args)
  {
    $input = $req->getParsedBody();
    $patient = Patients::find($input['patient_id']);
    $secret = sha1($patient->mobile . time());
    $schedule_from = $input['schedule_from'];

    $appointment = Appointments::create([
      'patient_id' => $input['patient_id'],
      'doctor_id' => $input['doctor_id'],
      'treatment_id' => $input['treatment_id'],
      'schedule_from' => $schedule_from,
      'secret' => $secret,
    ]);

    // Send SMS callback.
    AppointmentsHandler::notify($patient->mobile, $secret);

    return $res->withJson($appointment);
  }

  /**
   * undocumented function
   *
   * @return void
   */
  public static function patch($req, $res, $args)
  {
    $data = $req->getParsedBody();
    $response = Appointments::where('id', $args['id'])
      ->where('secret', $data['secret'])
      ->update([
        'schedule_from' => $data['schedule_from'],
        'doctor_id' => $data['doctor_id'],
        'treatment_id' => $data['treatment_id'],
      ]);

    return $res->withJson($response);
  }

  /**
   * undocumented function
   *
   * @return void
   */
  public static function patch_id($req, $res, $args)
  {
    try {
      $input = $req->getParsedBody();
      $data = Appointments::findOrFail($args['id']);

      if ($input['secret'] !== $data['secret']) {
        throw new \Slim\Exception\NotFoundException($req, $res);
      }

      $new_updates = array();

      foreach ($input as $key => $value) {
        $new_updates[$key] = $value;
      }

      $data->update($new_updates);

      return $res->withJson($data);
    } catch (NotFound $e) {
      throw new \Slim\Exception\NotFoundException($req, $res);
    }
  }

  /**
   * undocumented function
   *
   * @return void
   */
  public static function confirm($req, $res, $args)
  {
    try {
      $data = Appointments::findOrFail($args['id']);

      $data->status = 'confirmed';
      $data->save();

      return $res->withJson($data);
    } catch (NotFound $e) {
      throw new \Slim\Exception\NotFoundException($req, $res);
    }
  }

  /**
   * undocumented function
   *
   * @return void
   */
  public static function reject($req, $res, $args)
  {
    try {
      $data = Appointments::findOrFail($args['id']);

      $data->status = 'rejected';
      $data->save();

      return $res->withJson($data);
    } catch (NotFound $e) {
      throw new \Slim\Exception\NotFoundException($req, $res);
    }
  }

  /**
   * undocumented function
   *
   * @return void
   */
  public static function cancel($req, $res, $args)
  {
    $secret = $args['secret'];
    return Appointments::where('secret', '=', $secret)->delete();
  }

  /**
   * undocumented function
   *
   * @return void
   */
  private static function notify($number, $secret)
  {
    $message = "Hi there! Your appointment request will be processed soon. ";
    $message .= "If you want to change your appointment details, please visit ";
    $message .= "http://mjcoprada.ga/papsy/#/view/" . $secret;

    SemaphoreSMS::send($number, $message);
  }
}
