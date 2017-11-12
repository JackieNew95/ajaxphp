<?php
if($_SERVER['REQUEST_METHOD']=='GET'){
    include '../libs/db.php';

    $did=$_REQUEST['did'];
    $sql="select * from detailpage where did=$did";
    $data=$mysql->query($sql)->fetch_assoc();

    $dtitle=$data['dtitle'];
    $dbg=$data['dbg'];
    $atitle=$data['atitle'];
    $acontent=$data['acontent'];
    $aimg=$data['aimg'];
    $cid=$data['cid'];

    $sql1="select * from category where cid=$cid";
    $data1=$mysql->query($sql1)->fetch_assoc();
    $cname=$data1['cname'];
    $pid=$data1['pid'];

    $sql2="select * from category where cid=$pid";
    $data2=$mysql->query($sql2)->fetch_assoc();
    $pname=$data2['cname'];

    include '../template/admin/updateArticle1.html';
}else {
    include '../libs/db.php';

    $did=$_POST['did'];
    $cid = $_POST['cid'];
    $atitle = $_POST['atitle'];
    $acontent = $_POST['acontent'];
    $dtitle = $_FILES['dtitle']['name'];
    $dbg = $_FILES['dbg']['name'];
    $aimg = $_FILES['aimg']['name'];

    if (is_uploaded_file($_FILES['dtitle']['tmp_name'])) {//判断是否是上传的文件
        if (!file_exists('../static/img/index/detailcontent')) {//判断是否存在指定文件夹
            mkdir('../static/img/index/detailcontent');//创建文件夹
        }
        move_uploaded_file($_FILES['dtitle']['tmp_name'], '../static/img/index/detailcontent/'.$dtitle);//将选定的文件复制进指定文件夹
    }
    if (is_uploaded_file($_FILES['dbg']['tmp_name'])) {//判断是否是上传的文件
        if (!file_exists('../static/img/index/detailcontent')) {//判断是否存在指定文件夹
            mkdir('../static/img/index/detailcontent');//创建文件夹
        }
        move_uploaded_file($_FILES['dbg']['tmp_name'], '../static/img/index/detailcontent/'.$dbg);//将选定的文件复制进指定文件夹
    }
    if (is_uploaded_file($_FILES['aimg']['tmp_name'])) {//判断是否是上传的文件
        if (!file_exists('../static/img/index/detailcontent')) {//判断是否存在指定文件夹
            mkdir('../static/img/index/detailcontent');//创建文件夹
        }
        move_uploaded_file($_FILES['aimg']['tmp_name'], '../static/img/index/detailcontent/'.$aimg);//将选定的文件复制进指定文件夹
    }

    $sql="update `detailpage` set `cid`=$cid,`dtitle`='{$dtitle}',`dbg`='{$dbg}',`atitle`='{$atitle}',`acontent`='{$acontent}', `aimg`='{$aimg}' where did=$did";
    $mysql->query($sql);
    if($mysql->affected_rows){
        $message='修改成功';
        $url='showArticle1.php';
    }else{
        $message='修改失败';
        $url='showArticle1.php';
    }
    include 'message.html';
}
