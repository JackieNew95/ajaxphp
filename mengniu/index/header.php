<?php
    include '../libs/db.php';

    $sql="select * from category where pid=0";
    $data=$mysql->query($sql)->fetch_all(MYSQL_ASSOC);

    include '../template/index/header.html';
