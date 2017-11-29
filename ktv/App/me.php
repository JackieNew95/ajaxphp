<?php
    class me{
        function __construct()
        {
            $obj=new db();
            $this->mysql=$obj->mysql;
        }
        function index(){
            include 'App/views/me.html';
        }

    }