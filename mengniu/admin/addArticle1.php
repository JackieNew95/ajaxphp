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
    include '../template/admin/addArticle1.html';
}else {
    include '../libs/db.php';

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

    $sql="INSERT INTO `detailpage`(`cid`, `dtitle`, `dbg`, `atitle`, `acontent`, `aimg`) VALUES ($cid,'{$dtitle}','{$dbg}','{$atitle}','{$acontent}','{$aimg}')";
    $mysql->query($sql);
    if($mysql->affected_rows){
        $message='添加成功';
        $url='showArticle1.php';
    }else{
        $message='添加失败';
        $url='addArticle1.php';
    }
    include 'message.html';
}
