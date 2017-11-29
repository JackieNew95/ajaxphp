$(function () {
    let myscroll = new IScroll('.main',{click:true});
    let lrcwrapper=$('.lrc');
    let lyric=[];
    let audio=$('#audio')[0];
    let jindu=$('.jindu');//进度条
    let volume=$('.volume');//音量
    let songslist=JSON.parse(localStorage.songslist);//已点歌曲列表
    let gid=location.search.split('&')[0].split('=')[1];
    let sid=location.search.split('&')[1].split('=')[1];

    loading();
///////////////////////////页面加载请求数据///////////////////////////////////////////////
    function loading() {
        $.ajax({
            url:'/ajaxphp/ktv/index.php/sing/playsearch',
            data:{gid,sid},
            success:function (data) {
                render(JSON.parse(data));
                lrcrequest(JSON.parse(data));
            }
        });
    }

///////////////////////////播放、暂停///////////////////////////////////////////////
    $('.play').on('click',function () {
        if(audio.paused){
            audio.play();
        }else {
            audio.pause();
        }
        $(audio).attr('autoplay',false);
        $(this).toggleClass('active');
    });
///////////////////////////上一首///////////////////////////////////////////////
    $('.prev').on('click',function () {
        let index=0;
        for(let i=0;i<songslist.length;i++){
            if(songslist[i]['gid']==gid){
                index=i-1;
            }
        }
        if(index<0){
            index=songslist.length-1;
        }
        gid=songslist[index]['gid'];
        loading();
        if(!audio.paused){
            $(audio).attr('autoplay',true);
        }
    });

///////////////////////////下一首///////////////////////////////////////////////
    $('.next').on('click',function () {
        let index=0;
        for(let i=0;i<songslist.length;i++){
            if(songslist[i]['gid']==gid){
                index=i+1;
            }
        }
        if(index>songslist.length-1){
            index=0;
        }
        gid=songslist[index]['gid'];
        loading();
        if(!audio.paused){
            $(audio).attr('autoplay',true);
        }
    });

///////////////////////////重唱///////////////////////////////////////////////
    $('.replay').on('click',function (){
        audio.currentTime=0;
    });
////////////////////////////循环模式/////////////////////////////////////////////////////////
    let model=0;//0列表循环 1单曲循环 2随机播放
    $('.model').on('click',function () {
        model++;
        if (model>2){
            model=0;
        }
        if(model==0){
            $(this).css({backgroundImage: 'url(/ajaxphp/ktv/Public/img/gc9.png)'})
        }
        if(model==1){
            $(this).css({backgroundImage: 'url(/ajaxphp/ktv/Public/img/gc8.png)'})
        }
        if(model==2){
            $(this).css({backgroundImage: 'url(/ajaxphp/ktv/Public/img/gc10.png)'})
        }
        $(this).attr('value',model);
    });

    function playmodel(model) {
        if(model==0){
            $('.next').triggerHandler("click");
            $(audio).attr('loop',false);
            $(audio).attr('autoplay',true);
        }
        if(model==2){
            let index=Math.floor(Math.random()*songslist.length);
            while(songslist[index]['gid']==gid){
                index=Math.floor(Math.random()*songslist.length);
            }
            gid=songslist[index]['gid'];
            $(audio).attr('loop',false);
            if(audio.paused){
                loading();
                $(audio).attr('autoplay',true);
            }
        }
        if(model==1){
            $(audio).attr('loop',true);
        }
    }

///////////////////////////////////////////播放时/////////////////////////////////////////////////////////////////
    audio.ontimeupdate=function () {
        let ct=audio.currentTime;//当前播放时间
        let tt=audio.duration;//歌曲总时间
        ///////////////////////////歌词同步//////////////////////////////
        let temp=[];
        let length=lrcwrapper.find('li').length;
        lrcwrapper.find('li').each((index,element)=>{
            let lrctime=timeModel2($(element).attr('time'));
            $(element).css({fontSize:'0.24rem',color:'#FFFFFF'});
            if(lrctime<ct){
                temp=[];
                temp.push(element,index);
            }
        });
        $(temp[0]).css({fontSize:'0.35rem',color:'#00ebff'});
        let h=temp[0].offsetHeight;
        let i = 0;
        if(temp[1]<5){
            i=0;
        }else {
            i=temp[1]-5;
        }
        myscroll.scrollTo(0,-1*i*h,0,true);
        ////////////////////////////播放模式//////////////////////////////////////
        if((ct/tt).toFixed(2)==0.99){
            playmodel($('.model').attr('value'));
        }
        ///////////////////////////////进度条///////////////////////////////////
        jindu.find('span').css({width:`${(ct / tt)*100}%`});//播放进度映射
        jindu.prev().text(timeModel1(ct));
        jindu.next().text(timeModel1(tt));

    };
///////////////////////////////////////进度条///////////////////////////////////////////
    jindu.on('click',function (e) {
        let cx=e.offsetX;
        let w=this.offsetWidth;
        let bili=(cx/w).toFixed(2);
        jindu.find('span').css({width:bili*100+'%'});
        audio.currentTime=audio.duration*bili;//进度条控制播放
    });

///////////////////////////////////////音量///////////////////////////////////////////
    volume.on('click',function (e) {
        let cx=e.offsetX;
        let w=this.offsetWidth;
        let bili=(cx/w).toFixed(2);
        volume.find('span').css({width:bili*100+'%'});
        audio.volume=1;
        audio.volume=audio.volume*bili;//进度条控制播放
    });



///////////////////////////格式化时间///////////////////////////////////////////////
    function timeModel1(time) {
        // let h=Math.floor(time/60/60)<10?'0'+Math.floor(time/60/60):Math.floor(time/60/60);
        let m=Math.floor(time/60)<10?'0'+Math.floor(time/60):Math.floor(time/60);
        let s=Math.floor(time%60)<10?'0'+Math.floor(time%60):Math.floor(time%60);
        // return `${h}:${m}:${s}`;
        return `${m}:${s}`;
    }
    function timeModel2(time) {
        if(time){
            let lrctime=time.split(':');
            return lrctime[0]*60+lrctime[1]*1;
        }
    }


///////////////////////////处理歌词///////////////////////////////////////////////
    function lrcrequest(data) {
        $.ajax({
            url:`/ajaxphp/ktv/Public/lrc/${data[0]['sname']}${data[1]['gname']}.json`,
            success:function (data) {
                let value=data['lrc']['lyric'].split('\n');
                let temp=[];
                for(let i = 0;i<value.length;i++){
                    let time=value[i].substr(1,5);
                    let geci=value[i].substr(value[i].indexOf(']')*1+1);
                    temp.push({time,geci});
                }
                lyric.push(temp);
                renderlrc(lyric.pop());
            }
        });
    }
    function renderlrc(data) {
        let str='';
        for (let i=0;i<data.length;i++){
            str+=`
                <li time="${data[i]['time']}">${data[i]['geci']}</li>
            `
        }
        lrcwrapper.html('');
        lrcwrapper.html(str);
        myscroll.refresh();
    }
});
///////////////////////////插入页面元素///////////////////////////////////////////////
    function render(data) {
        $('body').css({background:`url(${data[0]['simg']}) center / cover no-repeat`});
        $('.top>p').html(data[1]['gname']);
        $('#audio').attr('src',data[1]['song']);
    }