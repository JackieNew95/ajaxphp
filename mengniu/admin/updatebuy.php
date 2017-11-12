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

    $bid=$_REQUEST['bid'];
    $sql3="select * from buy where bid=$bid";
    $data3=$mysql->query($sql3)->fetch_assoc();
    $link=$data3['link'];

    include '../template/admin/updatebuy.html';
}else {
    include '../libs/db.php';

    $bid = $_POST['bid'];
    $link = $_POST['link'];
    $sql="UPDATE `buy` SET `link`='{$link}' where bid=$bid";
    $mysql->query($sql);

    if($mysql->affected_rows){
        $message='修改成功';
        $url='showbuy.php';
    }else{
        $message='修改失败';
        $url='addbuy.php';
    }
    include 'message.html';
}
