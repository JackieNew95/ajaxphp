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
    include '../template/admin/addproductlist.html';
}else {
    include '../libs/db.php';

    $cid = $_POST['cid'];
    $prolink = $_POST['prolink'];
    $proname = $_FILES['proname']['name'];

    if (is_uploaded_file($_FILES['proname']['tmp_name'])) {//判断是否是上传的文件
        if (!file_exists('../static/img/index/product')) {//判断是否存在指定文件夹
            mkdir('../static/img/index/product');//创建文件夹
        }
        move_uploaded_file($_FILES['proname']['tmp_name'], '../static/img/index/product/'.$proname);//将选定的文件复制进指定文件夹
    }

    $sql="INSERT INTO `productlist`(`cid`, `proname`, `prolink`) VALUES ($cid,'{$proname}','{$prolink}')";
    $mysql->query($sql);
    if($mysql->affected_rows){
        $message='添加成功';
        $url='showproductlist.php';
    }else{
        $message='添加失败';
        $url='addproductlist.php';
    }
    include 'message.html';
}
