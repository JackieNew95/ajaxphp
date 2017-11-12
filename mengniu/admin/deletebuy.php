<?php
include '../libs/db.php';
$bid=$_GET['bid'];

$sql="delete from buy where bid={$bid}";
$mysql->query($sql);
if($mysql->affected_rows){
    $message='删除成功';
    $url='showbuy.php';
    include 'message.html';
}else{
    $message='删除失败';
    $url='showbuy.php';
    include 'message.html';
}