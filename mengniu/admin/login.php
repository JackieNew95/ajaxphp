<?php
    header('Content-type:text/html;charset=utf8');
    if($_SERVER['REQUEST_METHOD']=='GET'){
//        显示页面
        include '../template/admin/login.html';//将另一页面引进来
    }else{
//验证用户名密码是否正确
        $user=$_POST['user'];
        $pass=$_POST['pass'];

        include '../libs/db.php';

        $sql="select * from admin where uname='{$user}'";//{}可加可不加，主要来说明包裹的是变量
        $result=$mysql->query($sql);
        $data=$result->fetch_all(1);

        for($i=0;$i<count($data);$i++){
            if($data[$i]['upass']==$pass){
                if($data[$i]['upass']==$pass){
                    header('Location:main.php');//页面间跳转，不是引进来，而是改了路径
                    exit;
                }else{
                    echo '用户名不存在';
                }
            }else{
                echo '密码错误';
            }
        }
        $message='登录失败';
        $url='login.php';
        include 'message.html';//如果要传数据，则用包含include，不能用跳转header，包含是两个页面有联系，跳转之后两个页面就没有联系了，无法使用变量


    }

//        print_r();//可以输出数组
//    $_SERVER全局变量，是数组，
?>