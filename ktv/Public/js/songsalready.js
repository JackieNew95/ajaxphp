$(function () {
    let myScroll = new IScroll('.main',{
        click:true
    });
    let data=JSON.parse(localStorage.songslist);
    let list=$('.list');
    $.ajax({
        url:'/ajaxphp/ktv/index.php/sing/songsalreadydata',
        data:{'sid':`${data[0]['sid']}`},
        success:function (singerdata) {
            data.forEach(element=>{
                element.simg=JSON.parse(singerdata)['simg'];
            });
            render(data);
        }
    });

    list.on('click','.top',function () {
        let gid=$(this).parent().closest('li').attr('gid');
        data.forEach((element,index)=>{
            if(element['gid']==gid){
                let temp=data.splice(index,1)[0];
                data.unshift(temp);

                render(data);
                localStorage.songslist=JSON.stringify(data);
            }
        })
    });

    list.on('click','.del',function () {
        let gid=$(this).parent().closest('li').attr('gid');
        data.forEach((element,index)=>{
            if(element['gid']==gid){
                data.splice(index,1);
                render(data);
                localStorage.songslist=JSON.stringify(data);
            }
        })
    });

    function render(data) {
        $('header>a:eq(1)').text(`共${data.length}首`);
        let str='';
        for(let i=0;i<data.length;i++){
            str+=`
                <li gid="${data[i]['gid']}">
                    <a href="/ajaxphp/ktv/index.php/sing/songslist?sid=${data[i]['sid']}">
                        <img src="${data[i]['simg']}" alt="">
                    </a>
                    <div>
                        <a href="/ajaxphp/ktv/index.php/sing/play?gid=${data[i]['gid']}&sid=${data[i]['sid']}">
                            <b>${data[i]['gname']} - ${JSON.parse(localStorage.songslist)[i]['sname']}</b>
                            <span>${data[i]['gtime']}</span>
                        </a>
                    </div>
                    <ul class="btn">
                        <li class="del"></li>
                        <li class="top"></li>
                    </ul>
                </li>
            `
        }
        $('.list').empty();
        $('.list').html(str);
    }


});
