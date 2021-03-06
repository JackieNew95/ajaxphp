<?php
class songsmanager{
    function __construct()
    {
        $obj=new db();
        $this->mysql=$obj->mysql;
    }

    function index(){
        $title='歌曲管理';
        $result=$this->mysql->query("select * from singers")->fetch_all(MYSQL_ASSOC);

        include 'App/views/songsmanager.html';
    }

    function show(){
        $data=$this->mysql->query("select * from songs")->fetch_all(MYSQL_ASSOC);
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
        $data=$this->mysql->query("insert into songs $str");
        if($this->mysql->affected_rows>0){
            echo 'ok';
        }else{
            echo 'error';
        }
    }

    function delete(){
        $gid=$_GET['id'];
        $this->mysql->query("delete from songs where gid=$gid");
        if($this->mysql->affected_rows>0){
            echo 'ok';
        }else{
            echo 'error';
        }
    }

    function update(){
        $value=$_GET['value'];
        $type=$_GET['type'];
        $gid=$_GET['gid'];
        $this->mysql->query("update songs set $type='{$value}' where gid=$gid");
        if($this->mysql->affected_rows>0){
            echo 'ok';
        }else{
            echo 'error';
        }
    }

    function uploadfile(){
        if (is_uploaded_file($_FILES['file']['tmp_name'])){
            if(!file_exists('Public/songs')){
                mkdir('Public/songs');
            }
            $type=explode('/',$_FILES['file']['type'])[1];
            $data=date('y-m-d');
            $path='Public/songs/'.$data.time().rand(1,100).'.'.$type;
            if (move_uploaded_file($_FILES['file']['tmp_name'],$path)){
                echo '/ajaxphp/ktv/'.$path;
            }
        }

    }

}