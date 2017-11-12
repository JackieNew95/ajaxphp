<?php
if($_SERVER['REQUEST_METHOD']=='GET'){
    include '../libs/db.php';
    $proid=$_REQUEST['proid'];
    $sql="select * from productlist where proid=$proid";
    $data=$mysql->query($sql)->fetch_assoc();

    include '../template/admin/updateproductlist.html';

}else {
    include '../libs/db.php';

    $proid = $_POST['proid'];
    $prolink = $_POST['prolink'];
    $proname = $_FILES['proname']['name'];

    if (is_uploaded_file($_FILES['proname']['tmp_name'])) {//判断是否是上传的文件
        if (!file_exists('../static/img/index/product')) {//判断是否存在指定文件夹
            mkdir('../static/img/index/product');//创建文件夹
        }
        move_uploaded_file($_FILES['proname']['tmp_name'], '../static/img/index/product/'.$proname);//将选定的文件复制进指定文件夹
    }

    $sql="update `productlist` set `proname`='{$proname}', `prolink`='{$prolink}' where proid=$proid";

    $mysql->query($sql);
    if($mysql->affected_rows){
        $message='更新成功';
        $url='showproductlist.php';
    }else{
        $message='更新失败';
        $url='showproductlist.php';
    }
    include 'message.html';
}
