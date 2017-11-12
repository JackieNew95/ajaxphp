<?php
    class router{
        static function run(){

        // 判断是否传入了路径和方法
            if (!isset($_SERVER['PATH_INFO'])||$_SERVER['PATH_INFO']=='/'){
            //如果传入的路径方法都没有，或者传入的只有/，则设定默认值为：
                $model='login';
                $fn='index';
            }else{
            // 只传了路径没有传方法，或者都传了
                $pathinfo=explode('/',substr($_SERVER['PATH_INFO'],1));
                    /*explode将字符串打散成数组，substr，剪切字符串（哪个，起始，结束），
                    因为$_SERVER['PATH_INFO']会把/也获取上，直接切开的话第一个为空值，所以不要第一个/，所以start1；
                    最后截成两个数组，第一个为模块，第二个为方法*/
                $model=$pathinfo[0];
                $fn=isset($pathinfo[1])?$pathinfo[1]:'index';//判断是否传了方法
            }

        // 判断路径和方法是否存在
            if (file_exists("App/{$model}.php")){
            //路径存在，引进该页面
                include 'App/'.$model.'.php';

                if(class_exists($model)){
                //路径存在，类也存在(类名正确),实例化该类（与页面同名）
                    $page=new $model();

                    if (method_exists($page,$fn)){
                    //路径存在，类存在，方法也存在，调用该方法
                        $page->$fn();

                    }else{
                    //路径存在，类存在，方法不存在,引进404页面
                        include "App/views/404.html";
                    }
                }else{
                //路径存在，类不存在(类名不正确),引进404页面
                    include "App/views/404.html";
                }
            }else{
            //路径不存在，引进404页面
                include "App/views/404.html";
            }
        }
    }