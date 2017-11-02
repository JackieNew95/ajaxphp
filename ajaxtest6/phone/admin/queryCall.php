<?php
    include 'db.php';

    $sql="select * from maillist";

    $result=$mysql->query($sql);

    $data=$result->fetch_all(1);

    echo json_encode($data);

?>
