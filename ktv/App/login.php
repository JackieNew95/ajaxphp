<?php
    class login{
        function __construct()
        {
            $obj=new db();
            $this->mysql=$obj->mysql;
        }
        function index(){
            include 'App/views/login.html';
        }
        function check(){
            $uname=$_REQUEST['uname'];
            $upass=$_REQUEST['upass'];
            $data=$this->mysql->query("select * from admin where uname='{$uname}'")->fetch_all(MYSQL_ASSOC);

            for($i=0;$i<count($data);$i++){
                if ($data[$i]['upass']==$upass){
                    echo 'ok';
                    exit;
                }
            }
            echo 'error';
        }
    }