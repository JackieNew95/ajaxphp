$(function () {
    let myScroll = new IScroll('.wrapper',{
        click:true
    });//配置项
    let list=$('.main');
    let data=JSON.parse(localStorage.shop);
    let totalNum=$('header>p>span');
    let totalPrice=$('.totalPrice');
    let wrapper=$('.wrapper');
    let shopSure=$('.shopSure');

    ////////////////////////////////////////////////购物车加///////////////////////////////////////////////////////
    wrapper.on('click','.plus',function () {
        let goods=JSON.parse($(this).closest('li').attr('data'));
        let v=data.filter(element=>element.sid==goods.sid);

        v[0].num++;
        $(this).prev().html(v[0].num);//该商品件数

        localStorage.shop=JSON.stringify(data);

        totalPrice.text(calcTotalPrice());//总价
        totalNum.text(`共${calctotalNum()}件`);//总数
        $(this).parent().next().find('.itemPrice').text((v[0].num*v[0].price).toFixed(2));//单件商品价格

    });

    ////////////////////////////////////////////////购物车减///////////////////////////////////////////////////////
    wrapper.on('click','.subtract',function () {
        let goods=JSON.parse($(this).closest('li').attr('data'));
        let v=data.filter(element=>element.sid==goods.sid);

        if(v.length){
            v[0].num--;
            if(!v[0].num){
                data=data.filter(ele=>ele.sid!=goods.sid);
                $(this).closest('li').animate({marginLeft:'-100%'}).queue(function () {
                    $(this).closest('li').remove();
                    myScroll.refresh();//重新计算高度
                });
                localStorage.shop=JSON.stringify(data);
            }
            $(this).next().html(v[0].num);
        }

        totalPrice.text(calcTotalPrice());//总价
        totalNum.text(`共${calctotalNum()}件`);//总数
        $(this).parent().next().find('.itemPrice').text((v[0].num*v[0].price).toFixed(2));//单件商品价格

    });

    ////////////////////////////////////////////////总计////////////////////////////////////////////////////////////
    totalPrice.text(calcTotalPrice());//总价
    totalNum.text(`共${calctotalNum()}件`);//总数

    function calcTotalPrice() {
        let num=0;
        data.forEach(element=>{
            num+=element.price*element.num;
        });
        return num.toFixed(2);//保留两位小数，四舍五入
    }
    function calctotalNum() {
        let num=0;
        data.forEach(element=>{
            num+=element.num;
        });
        return num;
    }

    ////////////////////////////////////////////////插入////////////////////////////////////////////////////////////
    render(list,data);

    function render(obj,data) {
        obj.empty();
        let str='';
        for(let i=0;i<data.length;i++){
            str+=`
            <li data='${JSON.stringify(data[i])}'>
                <div class="mleft">
                    <img src="${data[i]['img']}" alt="">
                </div>
                <div class="mright">
                    <div class="top">
                        <b>${data[i]['sname']}</b>
                        <span>${data[i]['description']}</span>
                        <i>${data[i]['ssize']}</i>
                    </div>
                    <div class="bottom">
                        <div class="bleft">
                            <i class="subtract"></i>
                            <span class="unitnum">${data[i]['num']}</span>
                            <i class="plus"></i>
                        </div>
                        <div class="bright">
                            <b class="itemPrice">${(data[i]['num']*data[i]['price']).toFixed(2)}</b>
                            <span>RMB</span>
                        </div>
                    </div>
                </div>
            </li>
            `;
        }
        obj.html(str);
        let myScroll = new IScroll('.wrapper');
    }

    ////////////////////////////////////////////////插入////////////////////////////////////////////////////////////
    shopSure.on('click',function () {
        let newarr=[];
        data.forEach(element=>{
            let obj={sid:element.sid,count:element.num,total:(element.price*element.num).toFixed(2)};
            newarr.push(obj);//方法一
   /*         let {sid,num,price}=element;//解构赋值
            newarr.push({sid,num,price});//json简写，方法二：ES6中新方法*/
        });

        $.ajax('/ajaxphp/ktv/index.php/shop/submit',{
            data:{order:JSON.stringify(newarr)},
            method:'get',
            success:function (data) {
                if(data=='ok'){
                    location.href='/ajaxphp/ktv/index.php/shop/orderSuccess';
                }else if(data=='error'){
                    alert('提交失败!');
                }
            }
        });
        return false;
    })
});
