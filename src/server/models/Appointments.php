<?php

use Illuminate\Database\Eloquent\Model as Model;

/**
 * Class Appointments
 * @author yourname
 */
class Appointments extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'patient_id',
    'doctor_id',
    'treatment_id',
    'schedule_from',
    'secret',
    'status',
  ];

  protected $primaryKey = 'id';

  /**
   * undocumented function
   *
   * @return void
   */
  public function doctor()
  {
    return $this->belongsTo('Doctors');
  }

  /**
   * undocumented function
   *
   * @return void
   */
  public function treatment()
  {
    return $this->belongsTo('Treatments');
  }

  /**
   * undocumented function
   *
   * @return void
   */
  public function patient()
  {
    return $this->belongsTo('Patients');
  }
}
