<?php
    include 'db.php';//php页面间的引用

    $sql="insert into student (name,sex,age,classes,address,tel) values ('','',0,'','','')";

    $mysql->query($sql);
    echo $mysql->insert_id;//获取并返回插入的id值
