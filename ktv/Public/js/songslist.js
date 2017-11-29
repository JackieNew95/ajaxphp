$(function () {
    let myScroll = new IScroll('.main',{
        click:true
    });
    let datalist=[];
    if (localStorage.songslist){
        let datalist=JSON.parse(localStorage.songslist);
    }

    if(localStorage.songslist){
        let data=JSON.parse(localStorage.songslist);
        let num=$('.list>li');
        for(let i=0;i<data.length;i++){
            for(let j=0;j<num.length;j++){
                if(data[i]['gid']==JSON.parse($(num[j]).attr('songdata'))['gid']){
                    $(num[j]).find('em').addClass('choose');
                }
            }
        }
        datalist=data;
    }

    $('.list').on('click', 'em', function () {
        let tops=$(this).offset().top;
        let lefts=$(this).offset().left;
        let songs=JSON.parse($(this).closest('li').attr('songdata'));
        songs.sname=$(this).closest('li').attr('singername');
        if($(this).hasClass('choose')){
            datalist=datalist.filter(ele=>ele.gid != songs['gid']);
        }else {
            datalist.push(songs);
            $('<div>').addClass('movetips').appendTo(document.body).css({'left':lefts,'top':tops}).animate({'left':$('.top>a:eq(1)').offset().left,'top':$('.top>a:eq(1)').offset().top}).queue(function () {
                $(this).remove();
            })
        }
        localStorage.setItem('songslist',JSON.stringify(datalist));
        $(this).toggleClass('choose');

    });

});
