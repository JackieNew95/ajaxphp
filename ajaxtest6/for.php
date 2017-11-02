<?php
    header("Content-type:text/html;");
    $arr=[1,2,3,4,5];
    $news=[
        'title'=>'新闻',
        'content'=>'内容'
    ];
    for($i=0;$i<count($arr);$i++){
        echo $arr[$i];
    }
    //普通数组遍历
    foreach ($news as $value){
        echo $value;
    }
    //关联数组遍历方法一

    foreach ($news as $index=>$value){
        echo $index,$value;
    }
    //关联数组遍历方法二
