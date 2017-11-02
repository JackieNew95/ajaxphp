<?php
    include 'db.php';//php页面间的引用
	
	$value=$_GET['value'];
	$info=$_GET['info'];
//	$id=$_GET['id'];
	$id=$_REQUEST['id'];
	echo $value,$info,$id;
	
	$sql="update `manager` set $info = '$value' where uid=$id";//mysql的更新语句
	echo $sql;
	$mysql->query($sql);//返回的结果集
	
	if($mysql->affected_rows){
		echo true;
	}else{
		echo false;
	}
	
?>