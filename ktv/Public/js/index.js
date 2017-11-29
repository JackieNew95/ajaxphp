$(function () {
   let uname=$('#uname');//方法一、二、三
   let upass=$('#upass');//方法一、二、三
   let sub=$(':submit');//方法一、二、三
   let form=$('form');//方法二、三

///////////////////////////////////////正则验证/////////////////////////////////////////////////////////
   let trimReg=/^\s*|\s*$/g;
   let username=/^[a-zA-Z]{3,20}$/;
   let password=/^\w{5,20}$/;

   /////////////////////////////方法一////////////////////////////
   /*let flagu=false;
   let flagp=false;
   $('input').on('blur',function () {
       let value=$(this).val().trim();
       if(this.id=='uname'){
           if(!value.length){
               $(this).next().html('请输入用户名！');
           }else if(!username.test(value)){
               $(this).next().html('用户名格式不符！');
           }else {
               $(this).next().html('');
               flagu=true;
           }
       }
       if(this.id=='upass'){
           if(!value.length){
               $(this).next().html('请输入密码！');
           }else if(!password.test(value)){
               $(this).next().html('密码格式不符！');
           }else {
               $(this).next().html('');
               flagp=true;
           }
       }
   });*/
    /////////////////////////////方法二////////////////////////////
    $('input,textarea,select').on('blur',function () {
        let me=$(this);
        let validate=me.attr('data-validate');
        // let value=me.val().trim();
        let value=me.val().replace(trimReg,'');//利用正则前后去空
        if(validate){
            let arr=validate.split(';');
            for(let i=0;i<arr.length;i++){
                let validateArr=arr[i].split(':');
                if(!validateType(value,validateArr[0])){
                    //显示提示
                    $(this).parent().find('.form-tips').remove();
                    $('<span>').addClass('form-tips').insertAfter(this).text(validateArr[1]);
                    break;
                }else {
                    $(this).parent().find('.form-tips').remove();
                }
            }
        }
    });

    function validateType(value,type) {
        switch (type){
            case 'require':
                // return !!value.length;
                return /[^(^\s*|\s*$)]/.test(value);//验证是否非空
                break;
            case 'user':
                return username.test(value);
                break;
            case 'pass':
                return password.test(value);
                break;
            case 'qq':
                return /[1-9]\d{4,9}/.test(value);
                break;
        }
    }

/////////////////////////////////////////登录验证///////////////////////////////////////////////////////
   sub.on('click',function () {
       // if(flagu&&flagp){//正则验证方法一
       $('input').trigger('blur');
       let length=$('form .form-tips').length;
       if(length){
           return;
       }

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
       // }else {//正则验证方法一
       //     return;//正则验证方法一
       // }//正则验证方法一

       return false;//阻止默认事件
   })
});