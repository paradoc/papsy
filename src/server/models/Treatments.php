<?php

use Illuminate\Database\Eloquent\Model as Model;

/**
 * Class Treatments
 * @author paradoc
 */
class Treatments extends Model
{
  protected $primaryKey = 'id';

  /**
   * undocumented function
   *
   * @return void
   */
  public function appointments()
  {
    return $this->hasMany('Appointments', 'treatment_id');
  }
}
