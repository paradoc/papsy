<?php

/**
 * Class SemaphoreSMS
 * @author paradoc
 */
class SemaphoreSMS
{
  /**
   * undocumented function
   *
   * @return void
   */
  public static function send($number, $message)
  {
    $api_url = 'http://api.semaphore.co/api/v4/messages';
    $api_key = '375ab33ac1f1b23ab1276f84e68b5cf0';

    $body = array(
      "apikey" => "$api_key",
      "number" => "$number",
      "message" => "$message",
      // "sendername" => "PApSy",
    );

    // Initiate cURL.
    $ch = curl_init($api_url);

    // Tell cURL that we want to send a POST request.
    curl_setopt($ch, CURLOPT_POST, 1);

    // Attach our encoded JSON to the POST fields.
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));

    // Set the content type to application/json.
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
      'Content-Type: application/json',
      'Accept: application/json',
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
  }
}

