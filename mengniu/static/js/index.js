let flag=0;//哪个页面

$('.banner_item').css({height:`${innerHeight}px`});//初始化每页的高度
$('.page_wrap').css({height:`${innerHeight}px`});
let vscroller=$('.vscroller');
let scrollerpageb=$('.scroller_page b');
let waterdrops=$('.water_drop');
let page=0;
setTimeout(fn,1000);
vscroller.on('mousewheel',function (e) {
    if(e.originalEvent.wheelDelta==-120){
        if(page>=0&&page<4){
            page++;
            vscroller.css({transform:`translateY(${innerHeight*-page}px)`});
            setTimeout(fn,500);
        }
    }else if(e.originalEvent.wheelDelta==120){
        if(page>0&&page<=4){
            page--;
            vscroller.css({transform:`translateY(${innerHeight*-page}px)`});
            setTimeout(fn,500);
        }
    }
    scrollerpageb.css({backgroundPositionX:'100%'});
    scrollerpageb[page].style.backgroundPositionX='0';// 点
});
function fn() {
    waterdrops.css({top:`${-200*page}px`});
}
