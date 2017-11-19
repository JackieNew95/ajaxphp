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
                url: '/ajaxphp/ktv/index.php/songsmanager/show',
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
                <tr id="${v['gid']}">
                    <td>
                        ${v['gid']}
                    </td>
                    <td type="gname">
                        <input type="text" value="${v['gname']}">
                    </td>
                    <td type="gtime">
                        <input type="text" value="${v['gtime']}">
                    </td>
                    <td type="sid">
                        <input type="text" value="${v['sid']}">
                    </td>
                    <td type="lyric">
                        <input type="text" value="${v['lyric']}">
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    let submit=$(':submit');
    submit.on('click',function () {
        let data=new FormData($('form')[0]);//不需要设置表头，并且可以上传二进制的文件,传原生js对象
        // data.append('user','zhangsan');//发送单条信息，name，value
        $.ajax({
            url:'/ajaxphp/ktv/index.php/songsmanager/insert',
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
            url:'/ajaxphp/ktv/index.php/songsmanager/delete',
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
        let gid=$(this).closest('tr').attr('id');
        $.ajax({
            url:'/ajaxphp/ktv/index.php/songsmanager/update',
            data:{value,type,gid},
            success:function (data) {
                if(data=='ok'){

                }else if(data=='error'){
                    alert('修改失败');
                }
            }
        })
    })





});