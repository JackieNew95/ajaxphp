<?php
/*
var_dump($_FILES);
array (size=1)
  'img' =>
    array (size=5)
      'name' => string 'timg.jpg' (length=8)
      'type' => string 'image/jpeg' (length=10)
      'tmp_name' => string 'D:\wamp64\tmp\phpBE89.tmp' (length=25)
      'error' => int 0
      'size' => int 23806
}*/


$file=$_FILES['img'];
if(is_uploaded_file($file['tmp_name'])){//判断是否是上传的文件
    if(!file_exists('upload')){//判断是否存在指定文件夹
        mkdir('upload');//创建文件夹
    }
    $path='upload/'.date('Y-m-d',time());//格式化日期形式,后面time()不写也会默认转换当前时间
    if(!file_exists($path)){
        mkdir($path);
    }
    $imgPath=$path.'/'.$file['name'];
    move_uploaded_file($file['tmp_name'],$imgPath);//将选定的文件复制进指定文件夹
    $src='/ajaxphp/uploadimg/'.$imgPath;//路径前加/可以自动补齐服务器名，以保证在换了服务器环境后依然可以正常运行
    echo "<img src='{$src}'>";//在页面中打印图片
}
/*var_dump($_FILES);//用来接受文件数据
echo time();//返回当前时间
echo date('Y-m-d',time());//格式化日期形式*/
