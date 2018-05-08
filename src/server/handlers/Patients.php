<?php

require_once('models/Patients.php');

/**
 * Class Patients
 * @author paradoc
 */
class PatientsHandler
{
  /**
   * undocumented function
   *
   * @return void
   */
  public static function get($req, $res, $args)
  {
    $params = $req->getQueryParams('c');
    $contact = '';

    if (array_key_exists('c', $params)) {
      $contact = $params['c'];
    }

    if ($contact !== '') {
      return $res->withJson(Patients::where('mobile', $contact)
        ->orWhere('email', $contact)
        ->get());
    }

    return $res->withJson(Patients::all());
  }
}
