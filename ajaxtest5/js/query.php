<?php
    include 'db.php';//php页面间的引用

	$sql="select * from student";//mysql的查询语句
	$result=$mysql->query($sql);//返回的结果集
	$data=$result->fetch_all(MYSQL_ASSOC);//将返回的结果集转换为关联数组,等于写fetch_all(1)，版本原因

//	var_dump($data);//打印到页面中
	echo json_encode($data);//返回json类型的数据
?>