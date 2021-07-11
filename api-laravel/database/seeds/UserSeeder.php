<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Mess Bazar',
            'email' => 'messbazar@gmail.com',
            'password' => Hash::make('12345678'),
			'address1'=>'Farm View Market',
            'address2'=>'Tejgaon, Dhaka',
            'city'=>'Dhaka',
            'mobile'=>'01905793801',
            'user_type'=>'admin'
        ]);
    }
}
