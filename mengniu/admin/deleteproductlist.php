<?php
    include '../libs/db.php';
    $proid=$_GET['proid'];

    $sql="delete from productlist where proid={$proid}";
    $mysql->query($sql);

    if($mysql->affected_rows){
        $message='删除成功';
        $url='showproductlist.php';
        include 'message.html';
    }else{
        $message='删除失败';
        $url='showproductlist.php';
        include 'message.html';
    }