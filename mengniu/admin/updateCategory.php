<?php
header('Content-type:text/html;charset=utf8');
if($_SERVER['REQUEST_METHOD']=='GET'){
    include '../libs/db.php';//引入数据库链接语句
    include '../libs/function.php';//引入栏目操作语句
    $cid=$_GET['cid'];
    $obj=new unit();
    $str=$obj->cateTree(0,$mysql,'category',0,$cid);

    $cname=$obj->selectOne($mysql,'category',$cid,'cname');
    $option1=$mysql->query("select * from category")->fetch_all(MYSQL_ASSOC);

    include '../template/admin/updateCategory.html';
}else{
    include '../libs/db.php';//引入数据库链接语句
    $pid=$_POST['pid'];
    $cname=$_POST['cname'];
    $cid=$_POST['cid'];
    $templet=$_POST['templet'];

    if($templet=='introduce.php'||$templet=='contactus.php'){
        $addtemplet='addArticle1.php';
    }

    $sql="update category set cname='{$cname}',pid='{$pid}',templet='{$templet}',addtemplet='{$addtemplet}' where cid='{$cid}'";
    $mysql->query($sql);

    if($mysql->affected_rows){
        $message='修改成功';
        $url='showCategory.php';
        include 'message.html';
    }else{
        $message='修改失败';
        $url='showCategory.php';
        include 'message.html';
    }
}
