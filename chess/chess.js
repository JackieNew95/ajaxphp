$(function () {
    let hei={};//存放黑子落处
    let bai={};//存放白子落处
    let kongbai={};//记录未落子处
    let isAi=true;//是否人机对战

    $('.ai').css({border:'2px solid #fff'});
    $('.model').on('click',function (e) {
        let btn=$(e.target);
        if(btn[0].className=='ai'){
            btn.css({border:'2px solid #fff'});
            btn.siblings('h4').css({border:'none'});
            $(this).css({border:'none'});
            isAi=true;
        }
        if(btn[0].className=='man'){
            btn.css({border:'2px solid #fff'});
            btn.siblings('h4').css({border:'none'});
            $(this).css({border:'none'});
            isAi=false;
        }
    });

   for(let i=0;i<15;i++){
       $('<div>').addClass('heng').appendTo('.qipan');
       $('<span>').addClass('shu').appendTo('.qipan');
       for (let j=0;j<15;j++){
           kongbai[i+'-'+j]={x:i,y:j};
           $('<li>').addClass('qizi').attr('id',i+'-'+j).data('pos',{x:i,y:j}).appendTo('.qipan');
       }
   }

   let flag=true;//指示黑白
   $('.qipan .qizi').on('click',function () {
       if($(this).hasClass('hei')||$(this).hasClass('bai')){
           return;
       }
       let data=$(this).data('pos');
       if(flag){
           $(this).addClass('hei');
           hei[data.x+"-"+data.y]=true;
           delete kongbai[data.x+"-"+data.y];
           if(panduan(data,hei)>=5){
                alert("黑方胜");
               $('.qipan .qizi').off();
           }
           if(isAi){
               let pos=ai();
               $(`#${pos.x}-${pos.y}`).addClass('bai');
               bai[pos.x+"-"+pos.y]=true;
               delete kongbai[pos.x+"-"+pos.y];
               if(panduan(pos,bai)>=5){
                   alert("白方胜");
                   $('.qipan .qizi').off();
               }
               return;
           }
       }else {
           $(this).addClass('bai');
           bai[data.x+"-"+data.y]=true;
           delete kongbai[data.x+"-"+data.y];
           if(panduan(data,bai)>=5){
               alert("白方胜");
               $('.qipan .qizi').off();
           }
       }
       flag=!flag;
   });


   function ai() {
       let maxbai=-Infinity,maxhei=-Infinity;//白子、黑子得分
       let zuobiaob=null,zuobiaoh=null;//白子、黑子坐标
       for(let i in kongbai){
           let score=panduan(kongbai[i],bai);
           if(score>maxbai){
               maxbai=score;
               zuobiaob=kongbai[i];
           }
       }
       for(let i in kongbai){
           let score=panduan(kongbai[i],hei);
           if(score>maxhei){
               maxhei=score;
               zuobiaoh=kongbai[i];
           }
       }
       return (maxbai>=maxhei)?zuobiaob:zuobiaoh;
   }


    function panduan(pos,obj) {
        let heng=1,shu=1,zx=1,yx=1;//统计各方向(横\竖\左斜\右斜)上本颜色相连棋子的数量

        let i=pos.x,j=pos.y+1;

        while (obj[i+'-'+j]){
            heng++;
            j++;
        }
        j=pos.y-1;
        while (obj[i+'-'+j]){
            heng++;
            j--;
        }
        //横

        i=pos.x+1;
        j=pos.y;
        while (obj[i+'-'+j]){
            shu++;
            i++;
        }
        i=pos.x-1;
        while (obj[i+'-'+j]){
            shu++;
            i--;
        }
        //竖

        i=pos.x+1;
        j=pos.y+1;
        while (obj[i+'-'+j]){
            zx++;
            i++;
            j++;
        }
        i=pos.x-1;
        j=pos.y-1;
        while (obj[i+'-'+j]){
            zx++;
            i--;
            j--;
        }
        //左斜

        i=pos.x+1;
        j=pos.y-1;
        while (obj[i+'-'+j]){
            yx++;
            i++;
            j--;
        }
        i=pos.x-1;
        j=pos.y+1;
        while (obj[i+'-'+j]){
            yx++;
            i--;
            j++;
        }

        //右斜
        return Math.max(heng,shu,zx,yx);
    }
});


