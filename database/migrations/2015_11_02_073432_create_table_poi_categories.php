<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablePoiCategories extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('poi_categories', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name'); // fashion, food, electronic, shoes, clothing, jewelry, beauty, home, description
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
		Schema::drop('poi_categories');
	}

}
