$(function () {
   let change=$('.change');
   let type=location.search.slice(-1);//获取当前页面的查询
   let main=$('.main');

   main.on('click','li',function () {
       if($('.main>li.active').length==2){
           change.addClass('active');
       }
       $(this).css({transform: 'rotateY(360deg)'});
   });
    main.on('webkitTransitionEnd','li',function () {//事件：动画过渡完成时
        $(this).addClass('active');
   });
    //此部分实现翻转效果

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let pages=1;
    $('header').on('click','.change.active',function () {
        pages++;
        $.ajax({
            url:'/ajaxphp/ktv/index.php/game/change',
            dataType:'json',
            data:{pages,type},
            success:function (data) {
                if(data.length==0){
                    data.gname='没有了';
                }
                render(data);
            }
        });
    });
    //此部分实现换一批

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let buttons=$('button');
    buttons.on('click',function () {
        buttons.removeClass('active');
        $(this).addClass('active');
        type=$(this).attr('type');
        pages=1;
        $.ajax({
            url:'/ajaxphp/ktv/index.php/game/change',
            dataType:'json',
            data:{type,pages:1},
            success:function (data) {
                render(data);
            }
        })
    });
    //此部分实现游戏种类切换

    $(buttons[0]).triggerHandler('click');

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function render(data) {
        main.empty();
        change.removeClass('active');
        data.forEach(v=>{
            $('<li>').html(v.gname).prependTo(main);
        })
    }
    //此部分实现数据插入
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
});