<?php
header('Content-type:text/html;charset=utf8');
if($_SERVER['REQUEST_METHOD']=='GET'){
    include '../libs/db.php';//引入数据库链接语句
    include '../libs/function.php';//引入栏目操作语句
    $obj=new unit();
    if(empty($_GET['cid'])){
        $str=$obj->showArticle2($mysql,'detailpage');
    }else{
        $cid=$_GET['cid'];
        $str=$obj->showArticle1($mysql,'detailpage',$cid);
    }
    include '../template/admin/showArticle1.html';
}

