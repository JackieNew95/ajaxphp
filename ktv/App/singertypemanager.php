<?php
class singertypemanager{
    function __construct()
    {
        $obj=new db();
        $this->mysql=$obj->mysql;
    }

    function index(){
        $title='分类管理';
        include 'App/views/singertypemanager.html';
    }

    function show(){
        $data=$this->mysql->query("select * from singertype")->fetch_all(MYSQL_ASSOC);
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
        $data=$this->mysql->query("insert into singertype $str");
        if($this->mysql->affected_rows>0){
            echo 'ok';
        }else{
            echo 'error';
        }
    }

    function delete(){
        $tid=$_GET['id'];
        $this->mysql->query("delete from singertype where tid=$tid");
        if($this->mysql->affected_rows>0){
            echo 'ok';
        }else{
            echo 'error';
        }
    }

    function update(){
        $value=$_GET['value'];
        $type=$_GET['type'];
        $tid=$_GET['tid'];
        $this->mysql->query("update singertype set $type='{$value}' where tid=$tid");
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