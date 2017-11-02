<?php
    include 'db.php';//引用php文件

    $user=$_POST['user'];
    $pass=$_POST['pass'];
    //接收login.php发来的值

    $sql="select * from manager";
    $result=$mysql->query($sql);
    $data=$result->fetch_all(1);
    //获取数据库中的信息

    for($i=0;$i<count($data);$i++){//遍历数据库的结果，count()用来获取数组长度
        if($data[$i]['uname']==$user && $data[$i]['upass']==$pass){//比较获得的值和数据库对应的值
            $message = '登录成功';
            $url='main.php';
            include 'message.html';
            exit();
        }
    }
    $message='登录失败';
    $url='loginn.scss.php';
    include 'message.html';
