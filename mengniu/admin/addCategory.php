<?php
header('Content-type:text/html;charset=utf8');
if($_SERVER['REQUEST_METHOD']=='GET'){
    include '../libs/db.php';//引入数据库链接语句
    include '../libs/function.php';//引入栏目操作语句
    $cate=new unit();
    $option=$cate->cateTree(0,$mysql,'category',0);
    $option1=$mysql->query("select * from category")->fetch_all(MYSQL_ASSOC);
    include '../template/admin/addCategory.html';
}else{
    include '../libs/db.php';//引入数据库链接语句
    $pid=$_POST['pid'];
    $cname=$_POST['cname'];
    $templet=$_POST['templet'];

    if($templet=='introduce.php'||$templet=='contactus.php'){
        $addtemplet='addArticle1.php';
    }
    if($pid=0){
        $addtemplet='addnavcontent.php';
    }

    $sql="insert into category(pid,cname,templet,addtemplet)value('{$pid}','{$cname}','{$templet}','{$addtemplet}')";
    $mysql->query($sql);
    if($mysql->affected_rows){
        $message='添加成功';
        $url='showCategory.php';
//        echo "<script>alert('success!');</script>";//js、php混排
    }else{
        $message='添加失败';
        $url='addCategory.php';
//        echo "<script>alert('fail!');</script>";
    }
    include 'message.html';
}
