<?php
	/*
	//	$arr=array(''=>,);//另一种声明数组的格式
	//	索引数组  关联数组
	$arr=[1,2,3,4];
	$arr1=[0=>1,1=>2];//???
	*/
	
	//语言
	$web = [
		['title'=>'js语言','content'=>'单线程异步机制'],
		['title'=>'html语言','content'=>'超文本标记语言'],
		['title'=>'css','content'=>'层叠样式表'],
		['title'=>'jQuery语言','content'=>'js库事件，dom，动画，exercise']
	];//这是一个关联数组
	
	//新闻
	$news=[
		['title'=>'十九大召开','content'=>'李克强总理主持召开'],
		['title'=>'生活','content'=>'车限号，公交免费'],
		['title'=>'引力波','content'=>'中国发现新引力波信号']
	];//
	
	//体育
	$pe=[
		['title'=>'NBA','content'=>'新赛季开战'],
		['title'=>'孙杨','content'=>'夺冠'],
		['title'=>'湖人','content'=>'失利']
	];//
	

/*	if($_GET['name']=='pe'){
		echo json_encode($pe);
	}else if($_GET['name']=='web'){
		echo json_encode($web);//输出的是字符串
	}else if($_GET['name']=='news'){
		echo json_encode($news);//输出的是字符串
	}//get方式*/
	
	if($_POST['name']=='pe'){
		echo json_encode($pe);
	}else if($_POST['name']=='web'){
		echo json_encode($web);//输出的是字符串
	}else if($_POST['name']=='news'){
		echo json_encode($news);//输出的是字符串
	}//post方式
	



//	var_dump($_GET['name']);//$_GET接受,名字的发送接受方式要一样，结果是数组    var_dump打印
?>