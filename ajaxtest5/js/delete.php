<?php
    include 'db.php';//php页面间的引用

	$id=$_REQUEST['id'];

	$sql="delete from student where id=$id";//mysql的更新语句

	$mysql->query($sql);//运行sql语句,返回的结果集
	
	if($mysql->affected_rows){
		echo true;
	}else{
		echo false;
	}
	
?>