<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableVenues extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('venues', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name')->nullable();
			$table->text('description')->nullable();
			$table->integer('venue_type_id')->unsigned();
			$table->foreign('venue_type_id')->references('id')->on('venue_types');
			$table->string('gps_latitude')->nullable();
			$table->string('gps_longitude')->nullable();
			$table->string('zip_postal_code')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('venues');
	}

}
