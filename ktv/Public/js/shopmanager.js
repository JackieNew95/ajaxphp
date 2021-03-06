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
                url: '/ajaxphp/ktv/index.php/shopmanager/show',
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
                <tr id="${v['sid']}">
                    <td>
                        ${v['sid']}
                    </td>
                    <td type="sname">
                        <input type="text" value="${v['sname']}">
                    </td>
                    <td type="description">
                        <input type="text" value="${v['description']}">
                    </td>
                    <td type="price">
                        <input type="text" value="${v['price']}">
                    </td>
                    <td type="stype">
                        <input type="text" value="${v['stype']}">
                    </td>
                    <td type="ssize">
                        <input type="text" value="${v['ssize']}">
                    </td>
                    <td type="hot">
                        <input type="text" value="${v['hot']}">
                    </td>
                    <td type="img">
                        <input type="file" value="${v['img']}">
                        <img src="${v['img']}" alt="">
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
    let upload=document.querySelector('#img');
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
            xml.open('post','/ajaxphp/ktv/index.php/shopmanager/upload',true);

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

/*    let imgType=['png','gif','jpg','jpeg'];
    let size=5*1024*1024;
    let hidden=document.querySelector('[type=hidden]');
    upload.onchange=function () {
        [...this.files].forEach((element,index)=>{
            let eType=element.type.split('/')[1];
            if (!(element.size<=size&&imgType.includes(eType))){
                alert('请检查文件大小及类型！');
                return;
            }
            let reader=new FileReader();
            reader.readAsDataURL(element);
            reader.onload=function (e) {
                let imgs=new Image();
                imgs.src=e.target.result;
                let imgBox=document.querySelector('.imgBox');
                imgBox.appendChild(imgs);
            };
            let data=new FormData();
            data.append('file',element);
            let xml=new XMLHttpRequest();
            xml.upload.onprogress=function (e) {//当上传过程进行中
                document.querySelectorAll('.progress-bar')[index].style.width=`${e.loaded/e.total*100}%`;
            };//进度条,要写在send之前

            xml.onload=function () {
                hidden.value+=xml.response+',';
            };
            xml.open('post','/ajaxphp/ktv/index.php/shopmanager/upload',true);
            xml.send(data);
        })
    };*///多文件上传


    ///////////////////////////////////////////////////////////////////////////////////////////////////
    let submit=$(':submit');
    submit.on('click',function () {
        let data=new FormData($('form')[0]);//不需要设置表头，并且可以上传二进制的文件,传原生js对象
        // data.append('user','zhangsan');//发送单条信息，name，value
        $.ajax({
            url:'/ajaxphp/ktv/index.php/shopmanager/insert',
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
            url:'/ajaxphp/ktv/index.php/shopmanager/delete',
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
        let sid=$(this).closest('tr').attr('id');
        $.ajax({
            url:'/ajaxphp/ktv/index.php/shopmanager/update',
            data:{value,type,sid},
            success:function (data) {
                if(data=='ok'){

                }else if(data=='error'){
                    alert('修改失败');
                }
            }
        })
    })





});