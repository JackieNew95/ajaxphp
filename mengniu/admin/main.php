<?php
include '../libs/db.php';
$sql="select * from category";
$data=$mysql->query($sql)->fetch_all(MYSQL_ASSOC);
include '../template/admin/main.html';
