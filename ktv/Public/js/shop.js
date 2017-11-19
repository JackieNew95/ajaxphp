$(function () {
    let myScroll = new IScroll('.winelist');
    let myScroll1 = new IScroll('.snacklist');
    let lis=$('header>ul>li');
    let wrapper=$('.wrapper');
    let winelist=$('.winelist>.main');
    let snacklist=$('.snacklist>.main');
    let snacklistData=[];
    let winelistData=[];


    lis.on('click',function () {
        lis.removeClass('active');
        wrapper.removeClass('active');
        $(this).addClass('active');
        wrapper.eq($(this).index()).addClass('active');
    });

    $.ajax('/ajaxphp/ktv/index.php/shop/query',{
        method:'post',
        dataType:'json',
        success:function (data) {
            winelistData=data.filter(element=>{ return element.stype==1;});
            snacklistData=data.filter(element=>{ return element.stype==2;});
            render(winelist,winelistData);
            render(snacklist,snacklistData);
        }
    });


    ////////////////////////////////////////////////购物车加////////////////////////////////////////////////////////////
    let subtract=$('.subtract');
    let plus=$('.plus');
    let unitnum=$('.unitnum');
    let totalPrice=$('.totalPrice');
    let wineNum=$('.wineNum');
    let snackNum=$('.snackNum');
    let choose=$('.choose');
    let more=$('.more');

    let chooseList=[];

    wrapper.on('click','.plus',function () {
        let goods=JSON.parse($(this).closest('li').attr('data'));
        let v=chooseList.filter(element=>element.sid==goods.sid);
        if(v.length){
            v[0].num++;
            $(this).prev().html(v[0].num);
        }else {
            goods.num=1;
            $(this).prev().html(1);
            chooseList.push(goods);
        }
        totalPrice.text(calcTotalPrice());
        wineNum.text(calcwineNum());
        snackNum.text(calcsnackNum());

        renderChooseList(chooseList.slice(0,3));//截取已选商品列表的前三个
        if(isShow()){
            more.addClass('active');
        }else {
            more.removeClass('active');
        }
    });
    ////////////////////////////////////////////////购物车减///////////////////////////////////////////////////////
    wrapper.on('click','.subtract',function () {
        let goods=JSON.parse($(this).closest('li').attr('data'));
        let v=chooseList.filter(element=>element.sid==goods.sid);
        if(v.length){
            v[0].num--;
            if(!v[0].num){
                chooseList=chooseList.filter(element=>element.sid!=goods.sid);
            }
            $(this).next().html(v[0].num);
        }//先判断chooselist中是否存在该项，再判断该项的num是否为0,为了同步数量减少和“已选”的出现和消失
        totalPrice.text(calcTotalPrice());
        wineNum.text(calcwineNum());
        snackNum.text(calcsnackNum());

        renderChooseList(chooseList.slice(0,3));//截取已选商品列表的前三个
        if(isShow()){
            more.addClass('active');
        }else {
            more.removeClass('active');
        }
    });
    ////////////////////////////////////////////////更多////////////////////////////////////////////////////////////
    function isShow() {
        return $('div',choose).length==3?true:false;
    }
    ////////////////////////////////////////////////已选////////////////////////////////////////////////////////////
    function renderChooseList(data) {
        choose.empty();
        for(let i=0;i<data.length;i++){
            $('<div>').html(`${data[i]['sname']}${data[i]['num']}${danwei(data[i]['stype'])}`).appendTo(choose);
        }
    }
    ////////////////////////////////////////////////总计////////////////////////////////////////////////////////////
    function calcTotalPrice() {
        let num=0;
        chooseList.forEach(element=>{
            num+=element.price*element.num;
        });
        return '合计:'+num.toFixed(2);//保留两位小数，四舍五入
    }
    function calcwineNum() {
        let num=0;
        chooseList.filter(ele=>ele.stype==1).forEach(element=>{
            num+=element.num;
        });
        return num;
    }
    function calcsnackNum() {
        let num=0;
        chooseList.filter(ele=>ele.stype==2).forEach(element=>{
            num+=element.num;
        });
        return num;
    }
    ////////////////////////////////////////////////选好了//////////////////////////////////////////////////////////
    let chooseOkBtn=$('.money>button');
    chooseOkBtn.on('click',function (e) {
        e.preventDefault();
        localStorage.setItem('shop',JSON.stringify(chooseList));
        location.href='/ajaxphp/ktv/index.php/shop/shopSure';
    });
    ////////////////////////////////////////////////功能模块//////////////////////////////////////////////////////////

    function render(obj,data) {
        obj.empty();
        let str='';
        for(let i=0;i<data.length;i++){
            str+=`
                <li data='${JSON.stringify(data[i])}'><!--要写单引号，否则错误配对-->
                <div class="left">
                    <img src="${data[i]['img']}" alt="">
                </div>
                <div class="right">
                    <div class="top">
                        <span>${data[i]['sname']}</span>
                        <div class="hot">
                            ${hot(data[i]['hot'])}
                        </div>
                        <div class="middle">
                            <span>¥</span>
                            <b>${data[i]['price']}</b>
                            <i>${danwei(data[i]['stype'])+'/'}</i>
                        </div>
                    </div>
                    <div class="bottom">
                        <em class="subtract"></em>
                        <span class="unitnum">00</span>
                        <em class="plus"></em>
                    </div>
                </div>
            </li>
            `;
        }
        obj.html(str);
        myScroll = new IScroll('.winelist');
        myScroll1 = new IScroll('.snacklist');
    }
    function hot(num) {
        let str='';
        for(let i=0;i<num;i++){
            str+=`
                    <i></i>
                 `
        }
        return str;
    }
    function danwei(num) {
        if(num==1){
            return '瓶';
        }
        if(num==2){
            return '袋';
        }
    }



});