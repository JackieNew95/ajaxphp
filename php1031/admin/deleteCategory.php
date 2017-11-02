<?php
    include '../libs/db.php';
    $cid=$_GET['cid'];

    $sql="select * from category where pid={$cid}";
    if($mysql->query($sql)->fetch_assoc()){
        $message='存在子栏目，不允许删除';
        $url='showCategory.php';
        include 'message.html';
        exit;
    }
    $sql="delete from category where cid={$cid}";
    $mysql->query($sql);
    if($mysql->affected_rows){
        $message='删除成功';
        $url='showCategory.php';
        include 'message.html';
    }else{
        $message='删除失败';
        $url='showCategory.php';
        include 'message.html';
    }