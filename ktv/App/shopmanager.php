<?php
class shopmanager{
    function __construct()
    {
        $obj=new db();
        $this->mysql=$obj->mysql;
    }
    function index(){
        include 'App/views/shopmanager.html';
    }
    function add(){
        echo 'add';
    }
    function del(){
        echo 'del';
    }
}