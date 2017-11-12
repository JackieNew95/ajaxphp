<?php
    include '../libs/db.php';
    $did=$_GET['did'];

    $sql="delete from detailpage where did={$did}";
    $mysql->query($sql);
    if($mysql->affected_rows){
        $message='删除成功';
        $url='showArticle1.php';
        include 'message.html';
    }else{
        $message='删除失败';
        $url='showArticle1.php';
        include 'message.html';
    }