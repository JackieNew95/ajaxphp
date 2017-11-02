/*window.addEventListener('load',function () {
    let dl=document.querySelector('dl');
    let search=document.querySelector('input');
    let tips=document.querySelector('.tip');
    let aside=document.querySelector('.aside');

    let info=[
        {name:'牛佳琦',tel:'17835395667',pinyin:'niujiaqi'},
        {name:'贾亚楠',tel:'17835395951',pinyin:'jiayanan'},
        {name:'张秀荣',tel:'17835395638',pinyin:'zhangxiurong'},
        {name:'赵孟茹',tel:'17835395864',pinyin:'zhaomengru'},
        {name:'郭妍',tel:'17835395680',pinyin:'guoyan'},
        {name:'陈妍',tel:'17835395928',pinyin:'chenyan'},
        {name:'郭霞霞',tel:'17835395727',pinyin:'guoxiaxia'},
        {name:'孙丹丹',tel:'17835395664',pinyin:'sundandan'},
    ];

    render(info);

    search.onkeyup=function () {
        let value=this.value.trim();
        let data=info.filter(function (element) {
            return element.pinyin.includes(value)||element.name.includes(value)||element.tel.includes(value);
        })
        render(data);
    };//输入时搜索

    function render(data) {
        aside.innerHTML='';
        dl.innerHTML='';
        let group=[];
        data.forEach((element)=>{
            let first=element.pinyin.charAt(0).toUpperCase();
            if(!group[first]){
                group[first]=[];
            }
            group[first].push(element);
        });
        let char=Object.keys(group).sort();

        char.forEach((element)=>{
            dl.innerHTML+=`<dt>${element}</dt>`;
            aside.innerHTML+=`<li>${element}</li>`;
            group[element].forEach((value)=>{
                dl.innerHTML+=`<dd> <a href="tel:${value.tel}">${value.name}</a></dd>`;
            })
        })
    }//向页面中插入数据


});*/

$(function () {
    let dl=$('dl');
    let tip=$('.tip');
    let aside=$('ul.aside');
    let search=$(':text');
    let datalist=[];

    $.ajax({
        url:'../admin/queryCall.php',
        dataType:'json',
        success:function (data) {
            datalist=data;
            render(data);
        }
    });

    search.on('input',function () {
        let value=$.trim(this.value);
        let data=datalist.filter(element=>{
            return element.aname.includes(value)||element.tel.includes(value)||element.pinyin.includes(value);
        });
        render(data);
    });

    function render(obj) {
        dl.html('');
        aside.html('');
        let ranger={};
        $.each(obj,function (index, value) {
            let firstChar=value.pinyin.charAt(0).toUpperCase();
            if(!ranger[firstChar]){
                ranger[firstChar]=[];
            }
            ranger[firstChar].push(value);
        });
        let chars=Object.keys(ranger).sort();

        tip.text(chars[0]);

        $.each(chars,function (index, value) {
            dl[0].innerHTML+=`<dt>${value}</dt>`;
            aside[0].innerHTML+=`<li>${value}</li>`;
            $.each(ranger[value],function (i, v) {
                dl[0].innerHTML+=`<dd><a href="tel:${v.tel}">${v.aname}</a></dd>`
            })
        });
    }

    window.onscroll=function () {
        let arr = [];
        let dts = $('dt');
        let heights = document.body.scrollTop + search.height();
        tip.text('');
        dts.each((index,element) => {
            arr.push(element.offsetTop);
            if (heights >= arr[index]) {
                tip.css({display:'block'});
                let t=setTimeout(()=>{
                    tip.css({display:'none'});
                    clearTimeout(t)
                },1500);
                tip.text(dts[index].innerText);
            }
        })
    }


});
