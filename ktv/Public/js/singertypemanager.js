$(function () {
    let tbody=$('tbody');

    if(!location.hash){
        location.hash='#add';
    }

    $(window).on('hashchange', function () {
        $('#myTab>li,.tab-pane').removeClass('active');
        $(location.hash).closest('li').addClass('active');
        $(location.hash+'-tab').addClass('active');

        if (location.hash=='#list') {
            $.ajax({
                url: '/ajaxphp/ktv/index.php/singertypemanager/show',
                dataType: 'json',
                success: function (data) {
                    render(data);
                }
            })
        }

    });
    $(window).triggerHandler('hashchange');//自动触发一次函数,刷新时不变

    function render(data) {
        let str = '';
        data.forEach(function (v) {
            str += `
                <tr id="${v['tid']}">
                    <td>
                        ${v['tid']}
                    </td>
                    <td type="tname">
                        <input type="text" value="${v['tname']}">
                    </td>
                    <td type="timg">
                        <input type="file" value="${v['timg']}">
                        <img src="${v['timg']}" alt="">
                    </td>
                    <td>
                        <button class="btn btn-danger delbtn">删除</button>
                    </td>
                </tr>
            `;
            tbody.html('');
            tbody.html(str);
        });
    }

    //////////////////////////////////////////////上传图片/////////////////////////////////////////////////////
    let upload=document.querySelector('#timg');
    let thumb=document.querySelector('#thumb');
    upload.onchange=function () {
        let data=this.files[0];
        let reader=new FileReader();
        // let image=new Image();//方法二
        reader.readAsDataURL(data);
        reader.onload=function (e) {
            thumb.src=e.target.result;//e.target.result,上传的结果
            // image.src=e.target.result;//方法二
            // $('#img').parent().after(image);//方法二
            let formdata=new FormData();
            formdata.append('file',data);
            let xml=new XMLHttpRequest();
            xml.open('post','/ajaxphp/ktv/index.php/singertypemanager/upload',true);

            xml.upload.onprogress=function (e) {//当上传过程进行中
                document.querySelector('.progress-bar').style.width=`${e.loaded/e.total*100}%`;
            };//进度条,要写在send之前

            xml.send(formdata);
            xml.onload=function () {
                $(':hidden').val(xml.response);
            };
            /*            xml.onloadend=function () {

                        }//上传结束时*/
        }
    };//单文件上传


    ///////////////////////////////////////////////////////////////////////////////////////////////////
    let submit=$(':submit');
    submit.on('click',function () {
        let data=new FormData($('form')[0]);//不需要设置表头，并且可以上传二进制的文件,传原生js对象
        // data.append('user','zhangsan');//发送单条信息，name，value
        $.ajax({
            url:'/ajaxphp/ktv/index.php/singertypemanager/insert',
            data:data,
            method:'post',
            processData:false,//使用FormData发送时需要写
            contentType:false,//使用FormData发送时需要写
            success:function (data) {
                if(data=='ok'){
                    location.href=location.pathname+'#list';
                }else if(data=='error'){
                    location.href=location.pathname+'#add';
                }
            }
        })
    });


    tbody.on('click','.delbtn',function () {
        let tr=$(this).closest('tr');
        let id=tr.attr('id');
        $.ajax({
            url:'/ajaxphp/ktv/index.php/singertypemanager/delete',
            data:{id},
            success:function (data) {
                if(data=='ok'){
                    tr.remove();
                }else if(data=='error'){
                    alert('删除失败');
                }
            }
        })
    });//删除


    tbody.on('blur','input',function () {
        let value=$(this).val();
        let type=$(this).closest('td').attr('type');
        let tid=$(this).closest('tr').attr('id');
        $.ajax({
            url:'/ajaxphp/ktv/index.php/singertypemanager/update',
            data:{value,type,tid},
            success:function (data) {
                if(data=='ok'){

                }else if(data=='error'){
                    alert('修改失败');
                }
            }
        })
    })





});