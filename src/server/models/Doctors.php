<?php

use Illuminate\Database\Eloquent\Model as Model;

/**
 * Class Doctors
 * @author paradoc
 */
class Doctors extends Model
{
  protected $primaryKey = 'id';
  protected $hidden = array('password', 'secret', 'username');

  /**
   * undocumented function
   *
   * @return void
   */
  public function appointments()
  {
    return $this->hasMany('Appointments', 'doctor_id');
  }
}
