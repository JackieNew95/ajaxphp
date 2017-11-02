<?php
    header('Content-type:text/html;charset=utf8');//告诉浏览器用utf8显示PHP文件

    $mysql=new mysqli('localhost','root','','ajaxtest',3306);//主机名，账号，密码，数据库名，端口号

    $mysql->query('set names utf8');//查询字符集转换成utf8编码

    if($mysql->connect_errno){//连接失败
        echo '数据库连接失败，失败信息'.$mysql->connect_errno;
        exit ;//终止执行下列语句
    }