
//提取公共部分
$(document).ready(function(){
    $(".header").load("page/footer.html");
});
//后面的代码
$(function () {
    $('.navMenu>li>a').on('click', function () {
        var parent = $(this).parent().parent(); //获取最外层ul
        var labeul = $(this).parent("li").find(".navMenu-child") //获取当前a的内部ul
        $('.navMenu>li>a>.glyphicon').removeClass("glyphicon-menu-down");
        if ($(this).parent().hasClass('open') == false) {
            //展开未展开
            parent.find('.navMenu-child').slideUp(300);
            parent.find("li").removeClass("open")
            $(this).parent("li").addClass("open").find(labeul).slideDown(300);
            $(this).find(".glyphicon").addClass("glyphicon-menu-down");
        } else {
            $(this).parent("li").removeClass("open").find(labeul).slideUp(300);
        }
    });
    $('.navMenu-child>a').hover(function(){
        $(this).next('ul').css('display','none');
    })
});

/*******************************晋升管理的tab切换*********************************/
$('.time-btn>.listTab>li').click(function () {
   $(this).addClass('active').siblings().removeClass('active');
});

/*******************************公告的向上移动*********************************/
   var num = 0;
   var num1 = 0;
   //公告轮播
   var timer = setInterval(function () {
       if(aru)return;
       num ++;
       if(num > 4){
           num =0;
           $('.carousel').css({'top':0,'transition':'top 0s'});   //修改
       }else{
           $('.carousel').css({'top':-35*num + "px",'transition':'top 1s'});
       }
       $('.carousel>li').eq(num).addClass('active').siblings().removeClass('active');
   },2000);
   var aru = false;
   var aru1 = false;
   $('.carousel').mouseenter(function () {
       aru = true;
   }).mouseleave(function () {
       aru = false;
   });
   //待办事件轮播
    var timer1 = setInterval(function () {
        if(aru)return;
        num1 ++;
        if(num1 > 4){
            num1 =0;
            $('.clip').css({'top':0,'transition':'top 0s'});   //修改
        }else{
            $('.clip').css({'top':-38*num1 + "px",'transition':'top 1s'});
        }
        $('.clip>li').eq(num1).addClass('active').siblings().removeClass('active');
    },1500);
    var aru = false;
    $('.clip').mouseenter(function () {
        aru1 = true;
    }).mouseleave(function () {
        aru1 = false;
    });

/*******************************待办事项的tab切换*********************************/

$('.todo-ul>.listTab>li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
});


/*******************************tab切换*********************************/


$('.addTab li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.addTab li').eq('.addTab li');
    console.log($('.addTab li').index($(this)));

});






