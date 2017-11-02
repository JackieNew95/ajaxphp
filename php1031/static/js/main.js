$(function () {
    $('.leftnav h2').on('click',function () {
        $(this).toggleClass('on');
        $(this).next('ul').slideToggle();
    })
});