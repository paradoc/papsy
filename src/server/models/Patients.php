<?php

use Illuminate\Database\Eloquent\Model as Model;

/**
 * Class Patients
 * @author paradoc
 */
class Patients extends Model
{
  protected $primaryKey = 'id';

  /**
   * undocumented function
   *
   * @return void
   */
  public function appointments()
  {
    return $this->hasMany('Appointments', 'patient_id');
  }
}
