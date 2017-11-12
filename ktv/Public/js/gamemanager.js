$(function () {
    let tbody=$('tbody');

    if(!location.hash){
        location.hash='#add';
        // location.href=location.pathname+'#add';//另一种设置方法
    }

    $(window).on('hashchange',function () {//当hash改变时触发
        $('#myTab>li,.tab-pane').removeClass('active');
        $(location.hash).closest('li').addClass('active');//hash值刚好等于id名，所以就可以这样获取了
        $(location.hash+'-tab').addClass('active');

        if(location.hash=='#list'){
            $.ajax({
                url:'/ajaxphp/ktv/index.php/gamemanager/show',
                dataType:'json',
                success:function (data) {
                    render(data);
                }
            })
        }//点击“查看”的话，从数据库中读取数据
    });

    $(window).triggerHandler('hashchange');//自动触发一次函数

    ////////////////////////////////////////////////////////////////////////////////

    let submit=$(':submit');

    submit.on('click',function () {
        let data=$('form').serialize();//结果是一个查询字符串
        $.ajax({
            url:'/ajaxphp/ktv/index.php/gamemanager/insert?'+data,
            success:function (data) {
                if(data=='ok'){
                    location.href=location.pathname+'#list';
                }else if(data=='error'){
                    location.href=location.pathname+'#add';
                }
            }
        })
    });//点击提交，插入一则数据

    ////////////////////////////////////////////////////////////////////////////////

    function render(data) {
        let str='';
        data.forEach(function (v) {
            str+=`
                <tr id="${v['gid']}">
                    <td>
                        ${v['gid']}
                    </td>
                    <td type="gname">
                        <input type="text" value="${v['gname']}">
                    </td>
                    <td type="gtype">
                        <input type="text" value="${v['gtype']}">
                    </td>
                    <td>
                        <button class="btn btn-danger delbtn">删除</button>
                    </td>
                </tr>
            `
        });
        tbody.empty();
        tbody.html(str);
    }//查看

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    tbody.on('click','.delbtn',function () {
        let tr=$(this).closest('tr');
        let id=tr.attr('id');
        $.ajax({
            url:'/ajaxphp/ktv/index.php/gamemanager/delete',
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
            url:'/ajaxphp/ktv/index.php/gamemanager/update',
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