<?php
/*
 * 后台
 * 用户管理                   商店管理                       游戏管理                     歌曲管理
 * user                        shop                           gamemanager                         songs
 * 添加、删除、修改      添加、删除、修改、查看         添加、删除、修改            添、删、改
 * add
 *
 *
 * 路由：
 *
 *
 * localhost/ajaxphp/ktv/index.php
 *
 * localhost/ajaxphp/ktv/index.php/shop/delete       去游戏模块执行删除操作
 *
* */

include 'Core/Debug.php';//引进查错文件
include 'Core/db.php';//引进数据库连接文件
include 'Core/router.php';//引进路由文件

router::run();
//调用run()函数,只有在该方法使用static 关键字时可以用以上形式调用，否则需要先实例化该类，然后再用普通格式调用
