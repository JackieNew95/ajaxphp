$(function () {
    let myscroll=new IScroll('.main',{
        click:true
    });
    let list=$('.list');

    let mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        effect : 'coverflow',
    });

    $.ajax({
        url:'/ajaxphp/ktv/index.php/sing/paihangsearch',
        success:function (singerdata) {
            render(JSON.parse(singerdata));
        }
    });
    function render(data) {
        let str='';
        for(let i=0;i<data.length;i++){
            str+=`
                <li sid="${data[i]['sid']}">
                    <a href="/ajaxphp/ktv/index.php/sing/songslist?sid=${data[i]['sid']}">
                        <img src="${data[i]['simg']}" alt="">
                    </a>
                    <div>
                        <a href="/ajaxphp/ktv/index.php/sing/songslist?sid=${data[i]['sid']}">
                            <b>${data[i]['sname']} - ${data[i]['englishname']}</b>
                            <span>点击量：${data[i]['hits']}</span>
                        </a>
                    </div>
                </li>
            `
        }
        $('.list').empty();
        $('.list').html(str);
        myscroll.refresh();
    }
});