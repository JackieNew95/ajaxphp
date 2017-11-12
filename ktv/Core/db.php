<?php
class db{
    public $mysql;
    function __construct()
    {
        $this->config();
    }

    function config(){
        $this->mysql=new mysqli('localhost','root','','ktv',3306);
        //还有一种pdo连接数据库的方法，去查
        $this->mysql->query('set names utf8');

        if($this->mysql->connect_errno){
            echo '数据库连接失败，错误信息：'.$this->mysql->connect_errno;
            exit;
        }
    }
}
