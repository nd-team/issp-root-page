$('.moveLi>li>a').hover(function () {
   $(this).parent().addClass('active').siblings().removeClass('active');
});
