<?php
    header('Content-type:text/html;charset:utf8');

    include '../index/header.php';

    include '../libs/db.php';

    $sql="select * from category where pid=0";
    $data=$mysql->query($sql)->fetch_all(MYSQL_ASSOC);
    include '../template/index/index.html';