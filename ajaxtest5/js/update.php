<?php
    include 'db.php';//php页面间的引用
	
	$value=$_GET['value'];
	$info=$_GET['info'];
	$id=$_GET['id'];
	
	$sql="update student set $info = '$value' where id=$id";//mysql的更新语句
	
	$mysql->query($sql);//返回的结果集
	
	if($mysql->affected_rows){
		echo true;
	}else{
		echo false;
	}
	
?>