<?php

use Illuminate\Database\Eloquent\Model as Model;

/**
 * Class Doctors
 * @author paradoc
 */
class Doctors extends Model
{
  protected $hidden = array('password', 'secret', 'username');
}
