<?php

require_once('models/Appointments.php');
require_once('models/Patients.php');

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
    return $res->withJson(Appointments::all());
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
  public static function get_by_date($req, $res, $args)
  {
    $data = Appointments::whereDate('schedule_from', $args['date'])->get();
    return $res->withJson($data);
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

    $appointment = Appointments::create([
      'patient_id' => $input['patient_id'],
      'doctor_id' => $input['doctor_id'],
      'treatment_id' => $input['treatment_id'],
      'schedule_from' => $input['schedule_from'],
      'secret' => $secret,
    ]);

    return $res->withJson($appointment);
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

      // TODO(): actual implementation here

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
    return null;
  }

  /**
   * undocumented function
   *
   * @return void
   */
  public static function reject($req, $res, $args)
  {
    return null;
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
}
