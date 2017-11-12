<?php
//让类和文件名一样,好判断

class gamemanager{
    function __construct()
    {
        $obj=new db();
        $this->mysql=$obj->mysql;
    }

    function index(){
        include 'App/views/gamemanager.html';
    }
    function insert(){
        $gname=$_GET['gname'];
        $gtype=$_GET['gtype'];
        $this->mysql->query("insert into game (gname,gtype) values ('{$gname}','{$gtype}')");
        if($this->mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    function show(){
//        $data=$this->mysql->query("select * from game order by gtype asc")->fetch_all(MYSQL_ASSOC);
        $data=$this->mysql->query("select * from game")->fetch_all(MYSQL_ASSOC);
        echo json_encode($data);
    }
    function delete(){
        $ids=$_GET['id'];
        $this->mysql->query("delete from game where gid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    function update(){
        $value=$_GET['value'];
        $type=$_GET['type'];
        $gid=$_GET['gid'];

        $this->mysql->query("update game set $type='{$value}' where gid=$gid");

        if($this->mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
}