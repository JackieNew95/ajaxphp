<?php
include '../libs/db.php';
$navid=$_GET['navid'];

$sql="delete from navpage where navid={$navid}";
$mysql->query($sql);
if($mysql->affected_rows){
    $message='删除成功';
    $url='shownavcontent.php';
    include 'message.html';
}else{
    $message='删除失败';
    $url='shownavcontent.php';
    include 'message.html';
}