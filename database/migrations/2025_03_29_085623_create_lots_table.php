<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lots', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('auction_id');
            $table->integer('order');
            $table->float('starting_price');
            $table->float('increment');
            $table->string('title');
            $table->string('photo');
            $table->tinyText('description')->nullable();
            $table->dateTime('end_date');

            $table->timestamps();

            $table->foreign('auction_id')->references('id')->on('auctions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lots');
    }
};
