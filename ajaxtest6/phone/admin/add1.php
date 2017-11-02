<?php
    include 'db.php';//php页面间的引用

    $sql="insert into maillist (aname,pinyin,tel) values ('','','')";

    $mysql->query($sql);
    echo $mysql->insert_id;//获取并返回插入的id值
