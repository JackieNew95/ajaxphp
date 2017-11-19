<?php
class singermanager{
    function __construct()
    {
        $obj=new db();
        $this->mysql=$obj->mysql;
    }

    function index(){
        $title='歌手管理';
        $result=$this->mysql->query("select * from singertype")->fetch_all(MYSQL_ASSOC);

        include 'App/views/singermanager.html';
    }

    function show(){
        $data=$this->mysql->query("select * from singers")->fetch_all(MYSQL_ASSOC);
        echo json_encode($data);
    }

    function insert(){
        $data1=$_POST;
        $keys=array_keys($data1);
        $str='(';
        for($i=0;$i<count($data1);$i++){
            $str .=$keys[$i].',';
        }
        $str=substr($str,0,-1).') values (';
        foreach ($data1 as $v){
            $str .="'{$v}',";
        }
        $str =substr($str,0,-1).')';
        $data=$this->mysql->query("insert into singers $str");
        if($this->mysql->affected_rows>0){
            echo 'ok';
        }else{
            echo 'error';
        }
    }

    function delete(){
        $sid=$_GET['id'];
        $this->mysql->query("delete from singers where sid=$sid");
        if($this->mysql->affected_rows>0){
            echo 'ok';
        }else{
            echo 'error';
        }
    }

    function update(){
        $value=$_GET['value'];
        $type=$_GET['type'];
        $sid=$_GET['sid'];
        $this->mysql->query("update singers set $type='{$value}' where sid=$sid");
        if($this->mysql->affected_rows>0){
            echo 'ok';
        }else{
            echo 'error';
        }
    }

    function upload(){
        if(is_uploaded_file($_FILES['file']['tmp_name'])){
            if(!file_exists('Public/upload')){
                mkdir('Public/upload');
            }
            $date=date('y-m-d');
            if(!file_exists('Public/upload/'.$date)){
                mkdir('Public/upload/'.$date);
            }
            $path='Public/upload/'.$date.'/'.$_FILES['file']['name'];
            if(move_uploaded_file($_FILES['file']['tmp_name'],$path)){
                echo '/ajaxphp/ktv/'.$path;
            };
        }
    }//单文件上传



}