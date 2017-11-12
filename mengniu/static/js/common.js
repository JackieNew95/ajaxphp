// 导航开始
let nav1=$('.nav1');//每个导航项
let navbglogo=$('.nav_bg_logo');//logo背景颜色
let navbglist=$('.nav_bg_list');//列表背景颜色
let navbgcolor=['#2A9B38','#FF972D','#FF6155','#49C0E3','#00A244'];//主题色
let navbgtop=['63','169','275','381','487'];//列表背景颜色位置
let navitemi=$('.nav_item>u>i');//每个导航的图标
let navitemb=$('.nav_item>u>b');//每个导航的标题
let navitemby=[72,88,103,118,132];//每个导航标题的高度
let navitembyb=[3,-12,-28,-43,-57];//每个导航标题原来的高度
// let flag=0;//哪个页面

nav1.on('mouseenter',function () {
	let index=nav1.index(this);
    navbglist.css({top:navbgtop[index]+'px',background:navbgcolor[index]});//列表项的背景颜色、位置
    navbglogo.css({background:navbgcolor[index]});//logo颜色
	$('.sub_nav_wrap',this).css({display:'block'});
	$('.sub_nav',this).css({background:navbgcolor[index],left:0});
	$('ul',this).css({display:'block'});
	$('li',this).css({left:0});
	if(flag!=index){
        $(this).css({background:'#ffffff'});
        $('.nav_item',this).css({borderBottom:'1px solid transparent'});
        $('.nav_item',$(this).prev()).css({borderBottom:'1px solid transparent'});
/*        $($('.nav_item')[flag]).css({borderBottom:'1px solid transparent'});
        $($('.nav1')[flag]).prev().find($('.nav_item')).css({borderBottom:'1px solid transparent'});*/
        navitemi.eq(index).css({backgroundPositionX:'-45px'});
        navitemb.eq(index).css({backgroundPositionY:`${-1*navitemby[index]}px`})
	}
});
nav1.on('mouseleave',function () {
    let index=nav1.index(this);
    $('.sub_nav',this).css({background:'none',left:'-93px'});
    $('.sub_nav_wrap',this).css({display:'none'});
    $('ul',this).css({display:'none'});
    $('li',this).css({left:'-93px'});
    if(flag==index){
        $('.nav_item',this).css({borderBottom:`1px solid ${navbgcolor[flag]}`});
        $('.nav_item',$(this).prev()).css({borderBottom:`1px solid ${navbgcolor[flag]}`});

    }else if(index==flag-1){
        $('.nav_item',this).css({borderBottom:`1px solid ${navbgcolor[flag]}`});
        $('.nav_item',$(this).prev()).css({borderBottom:'1px solid #898A87'});
        $(this).css({background:'none'});
        navitemi.eq(index).css({backgroundPositionX:'0'});
        navitemb.eq(index).css({backgroundPositionY:`${navitembyb[index]}px`})
    }else if(index==flag+1){
        $('.nav_item',this).css({borderBottom:'1px solid #898A87'});
        $('.nav_item',$(this).prev()).css({borderBottom:`1px solid ${navbgcolor[flag]}`});
        $(this).css({background:'none'});
        navitemi.eq(index).css({backgroundPositionX:'0'});
        navitemb.eq(index).css({backgroundPositionY:`${navitembyb[index]}px`})
    }else if(flag!=index) {
        $(this).css({background:'none'});
        $('.nav_item',this).css({borderBottom:'1px solid #898A87'});
        $('.nav_item',$(this).prev()).css({borderBottom:'1px solid #898A87'});
        navitemi.eq(index).css({backgroundPositionX:'0'});
        navitemb.eq(index).css({backgroundPositionY:`${navitembyb[index]}px`})
    }
});

$($('.nav_item')[flag]).css({borderBottom:`1px solid ${navbgcolor[flag]}`});
$($('.nav1')[flag]).prev().find($('.nav_item')).css({borderBottom:`1px solid ${navbgcolor[flag]}`});
navbglist.css({top:navbgtop[flag]+'px',background:navbgcolor[flag]});
//初始化列表背景和颜色

$('.nav').on('mouseleave',function () {
    navbglogo.css({background:navbgcolor[flag]});
    navbglist.css({top:navbgtop[flag]+'px',background:navbgcolor[flag]});
});//移出整体后
$('.sub_nav').css({height:innerHeight+'px'});
$('.sub_nav_wrap').each(function (index,ele) {
	$(ele).css({height:innerHeight+'px',top:`${-1*navbgtop[index]-107}px`});
});
