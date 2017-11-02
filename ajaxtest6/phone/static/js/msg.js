let i=3;
let add=$('a').attr('href');
setInterval(function () {
    $('span').html(i);
    i--;
    if(i==0){
        location.href=add;
    }
},1000);
