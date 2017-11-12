<?php
if($_SERVER['REQUEST_METHOD']=='GET'){
    include '../libs/db.php';
    $navid=$_REQUEST['navid'];
    $cid=$_REQUEST['cid'];
    $sql1="select * from category where cid=$cid";
    $data1=$mysql->query($sql1)->fetch_assoc();
    $cname=$data1['cname'];

    $sql2="select * from navpage where navid=$navid";
    $data2=$mysql->query($sql2)->fetch_assoc();
    $ctitle=$data2['ctitle'];
    $cslogan=$data2['cslogan'];
    $cimg=$data2['cimg'];

    include '../template/admin/updatenavcontent.html';
}else {
    include '../libs/db.php';

    $cid = $_POST['cid'];
    $navid = $_POST['navid'];
    $ctitle = $_FILES['ctitle']['name'];
    $cslogan = $_FILES['cslogan']['name'];
    $cimg = $_FILES['cimg']['name'];

    if (is_uploaded_file($_FILES['ctitle']['tmp_name'])) {//判断是否是上传的文件
        if (!file_exists('../static/img/index/nav/'.$cid)) {//判断是否存在指定文件夹
            mkdir('../static/img/index/nav/'.$cid);//创建文件夹
        }
        move_uploaded_file($_FILES['ctitle']['tmp_name'], '../static/img/index/nav/'.$cid.'/'.$ctitle);//将选定的文件复制进指定文件夹
    }
    if (is_uploaded_file($_FILES['cslogan']['tmp_name'])) {//判断是否是上传的文件
        if (!file_exists('../static/img/index/nav/'.$cid)) {//判断是否存在指定文件夹
            mkdir('../static/img/index/nav/'.$cid);//创建文件夹
        }
        move_uploaded_file($_FILES['cslogan']['tmp_name'], '../static/img/index/nav/'.$cid.'/'.$cslogan);//将选定的文件复制进指定文件夹
    }
    if (is_uploaded_file($_FILES['cimg']['tmp_name'])) {//判断是否是上传的文件
        if (!file_exists('../static/img/index/nav/'.$cid)) {//判断是否存在指定文件夹
            mkdir('../static/img/index/nav/'.$cid);//创建文件夹
        }
        move_uploaded_file($_FILES['cimg']['tmp_name'], '../static/img/index/nav/'.$cid.'/'.$cimg);//将选定的文件复制进指定文件夹
    }

    $sql="update `navpage` set `navid`=$navid,`cid`=$cid, `ctitle`='{$ctitle}', `cslogan`='{$cslogan}', `cimg`='{$cimg}' where navid=$navid";
    $mysql->query($sql);
    if($mysql->affected_rows){
        $message='修改成功';
        $url='shownavcontent.php';
    }else{
        $message='修改失败';
        $url='shownavcontent.php';
    }
    include 'message.html';
}
