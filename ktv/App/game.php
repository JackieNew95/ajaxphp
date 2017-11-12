<?php

class game{
    function __construct()
    {
        $obj=new db();
        $this->mysql=$obj->mysql;
    }
    function index(){
        include 'App/views/game.html';
    }
    function select(){
        $type=$_GET['type'];
        $data=$this->mysql->query("select * from game where gtype=$type limit 0,9")->fetch_all(MYSQL_ASSOC);
        include 'App/views/gamelist.html';
    }
    function change(){
        $pages=$_GET['pages'];
        $type=$_GET['type'];
        $offset=($pages-1)*9;
        $sql="select * from game where gtype=$type limit $offset,9";
        $data=$this->mysql->query($sql)->fetch_all(MYSQL_ASSOC);
        echo json_encode($data);
    }
}