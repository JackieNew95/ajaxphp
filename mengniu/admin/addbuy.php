<?php
if($_SERVER['REQUEST_METHOD']=='GET'){
    include '../libs/db.php';
    $cid=$_REQUEST['cid'];
    $sql1="select * from category where cid=$cid";
    $data1=$mysql->query($sql1)->fetch_assoc();
    $cname=$data1['cname'];
    $pid=$data1['pid'];
    $sql2="select * from category where cid=$pid";
    $data2=$mysql->query($sql2)->fetch_assoc();
    $pname=$data2['cname'];
    include '../template/admin/addbuy.html';
}else {
    include '../libs/db.php';

    $cid = $_POST['cid'];
    $link = $_POST['link'];

    $sql="INSERT INTO `buy`(`cid`, `link`) VALUES ($cid,'{$link}')";
    $mysql->query($sql);
    if($mysql->affected_rows){
        $message='添加成功';
        $url='showbuy.php';
    }else{
        $message='添加失败';
        $url='addbuy.php';
    }
    include 'message.html';
}
