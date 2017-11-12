$(function () {
   let uname=$('#uname');//方法一、二、三
   let upass=$('#upass');//方法一、二、三
   let sub=$(':submit');//方法一、二、三
   let form=$('form');//方法二、三
   sub.on('click',function () {
       // let data={uname:uname.val(),upass:upass.val()};//方法一
       // let data=form.serialize();//方法三

       let data=form.serializeArray();//方法二
            // 0: {name: "uname", value: "admin"}
            // 1: {name: "upass", value: "admin"}
       let obj={};//方法二
       $.each(data,function (index, ele) {
           obj[ele.name]=ele.value;
       });

       $.ajax({
           url:'/ajaxphp/ktv/index.php/login/check',//方法一、方法二
           // data:data,//方法一
           data:obj,//方法二
           // url:'/ajaxphp/ktv/index.php/login/check?'+data,//方法三
           success:function (data) {
               if(data=='ok'){
                   location.href='/ajaxphp/ktv/index.php/gamemanager/index'
               }else if(data=='error'){
                   alert('fail');
               }
           }
       });
       return false;//阻止默认事件
   })
});