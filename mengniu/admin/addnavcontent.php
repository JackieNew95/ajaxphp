<?php
if($_SERVER['REQUEST_METHOD']=='GET'){
    include '../libs/db.php';
    $cid=$_REQUEST['cid'];
    $sql1="select * from category where cid=$cid";
    $data1=$mysql->query($sql1)->fetch_assoc();
    $cname=$data1['cname'];
    include '../template/admin/addnavcontent.html';
}else {
    include '../libs/db.php';

    $cid = $_POST['cid'];
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

    $sql="INSERT INTO `navpage`(`cid`, `ctitle`, `cslogan`, `cimg`) VALUES ($cid,'{$ctitle}','{$cslogan}','{$cimg}')";
    $mysql->query($sql);
    if($mysql->affected_rows){
        $message='添加成功';
        $url='shownavcontent.php';
    }else{
        $message='添加失败';
        $url='addnavcontent.php';
    }
    include 'message.html';
}
