<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('global_deployment_stats', function (Blueprint $table) {
            $table->id();
            $table->string('region'); // Asia, Europe, etc.
            $table->string('country_code'); // US, IN, etc.
            $table->integer('manpower_count')->default(0);
            $table->integer('active_properties')->default(0);
            $table->integer('guest_traffic')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('global_deployment_stats');
    }
};
