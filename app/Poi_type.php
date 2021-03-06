<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Poi_type extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'poi_types';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [''];

}
