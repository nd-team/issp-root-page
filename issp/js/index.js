/**
 * Created by Bjike on 2017/9/25.
 */
var ok1=false;
var ok2=false;
var ok3=false;
var ok4=false;
$(function(){

    // 验证用户名
    // $('input[name="username"]').blur(function(){
    //     console.log($(this).val());
    //     if($(this).val().length = 11 && $(this).val()!=''){
    //         $(this).next().text('输入成功').removeClass('state1').addClass('state4');
    //         ok1=true;
    //     }else{
    //         $(this).next().text('手机号应该为11位数字').removeClass('state1').addClass('state3');
    //     }
    //
    // });
    $('input[name="username"]').on('input propertychange',function(){
        // console.log($(this).val())
        reg=/^1[34578]{1}\d{9}$/;//验证手机正则(输入前7位至11位)

       if(reg.test($(this).val())){
            ok1 = true;
            $(this).next().empty();
        }
        else {
            ok1 = false;
            $(this).next().html("请输入正确的手机号!").removeClass('state1').addClass('state3');

        }
        // console.log(ok1)
        if(ok1 == true){
            console.log(222)
            $(".login-button input").removeClass("submitError");
            $(".login-button input").addClass("submitUser");
        }else{
            $(".login-button input").removeClass("submitUser");
            $(".login-button input").addClass("submitError");
        }
    });

    /*//验证密码
    $('input[name="password"]').focus(function(){
        $(this).next().text('密码应该为6-20位之间').removeClass('state1').addClass('state2');
    }).blur(function(){
        if($(this).val().length >= 6 && $(this).val().length <=20 && $(this).val()!=''){
            $(this).next().text('输入成功').removeClass('state1').addClass('state4');
            ok2=true;
        }else{
            $(this).next().text('密码应该为6-20位之间').removeClass('state1').addClass('state3');
        }

    });

    //验证确认密码
    $('input[name="repass"]').focus(function(){
        $(this).next().text('输入的确认密码要和上面的密码一致,规则也要相同').removeClass('state1').addClass('state2');
    }).blur(function(){
        if($(this).val().length >= 6 && $(this).val().length <=20 && $(this).val()!='' && $(this).val() == $('input[name="password"]').val()){
            $(this).next().text('输入成功').removeClass('state1').addClass('state4');
            ok3=true;
        }else{
            $(this).next().text('输入的确认密码要和上面的密码一致,规则也要相同').removeClass('state1').addClass('state3');
        }

    });*/
    //密码栏失去焦点
    $('input[name="passward"]').on('input propertychange',function(){
        reg1 =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,22}$/;
        if(!reg1.test($(this).val())){
            $(this).next().text("格式有误，请输入6~20位的数字、字母！").removeClass('state1').addClass('state3');
        }
        else {
            ok2 = true;
            $(this).next().empty();
        }
    });
    /*确认密码失去焦点*/
    $('input[name="repass"]').on('input propertychange',function(){
        var pwd1=$('input[name="passward"]').val();
        var pwd2=$(this).val();
        console.log(pwd1);
        console.log(pwd2);
        if(pwd1!=pwd2){
            ok3 = false
            $(this).next().text("两次密码输入不一致！").removeClass('state1').addClass('state3');
        } else {
            ok3 = true;
            $(this).next().empty();
        }
        if(ok3 == true){
            console.log(222)
            $(".passward-button input").removeClass("submitError");
            $(".passward-button input").addClass("submitUser");
        }else{
            $(".passward-button input").removeClass("submitUser");
            $(".passward-button input").addClass("submitError");
        }
    });
    $('.phone input').on('input propertychange',function(){
        if($(this).val() != ""){

            $(".identify-button input").removeClass("submitError");
            $(".identify-button input").addClass("submitUser");
        }else{
            $(".identify-button input").removeClass("submitUser");
            $(".identify-button input").addClass("submitError");
        }


    });

})
//获取短信验证码
var validCode=true;
function getcode(){
    $(".input-tip").css("display","block");
    // console.log(222)
    var time=60;
    var code=$(".getcode");
    if (validCode) {
        validCode=false;
        code.removeClass("getcode-start");
        code.addClass("getcode-end");
        var t=setInterval(function  () {
            time--;
            code.html(time+"秒");
            if (time==0) {
                clearInterval(t);
                code.html("重新获取");
                validCode=true;
                code.removeClass("getcode-end");
                code.addClass("getcode-start");
            }
        },1000)
    }

}
function codecomplete(){
    console.log(222)
    if($(".code").val()!= ""){
        $(".identify-button input").removeClass("submitError");
        $(".identify-button input").addClass("submitUser");
    }else{
        $(".identify-button input").removeClass("submitUser");
        $(".identify-button input").addClass("submitError");
    }
}
function submitUser(){
    var user = $(".user").val();
    var passward = $(".passward").val();
    if(user != ""&&passward !=""){
        console.log(222);
        $(".login-button input").removeClass("submitError");
        $(".login-button input").addClass("submitUser");
    }else{
        $(".login-button input").removeClass("submitUser");
        $(".login-button input").addClass("submitError");
    }
}
function stepFirst(){
    if($('input[name="username"]').val() == ''){
        $('input[name="username"]').next().text("请输入您的手机号").removeClass('state1').addClass('state3');
    }
    if(ok1 == true){
        $(".page1").css("display","none");
        $(".page2").css("display","block");
        $(".page3").css("display","none");
        $(".ball-two").removeClass("ball-white").addClass("ball-blue");
    }
}
function stepSecond(){
    $(".page1").css("display","none");
    $(".page2").css("display","none");
    $(".page3").css("display","block");
    $(".ball-three").removeClass("ball-white").addClass("ball-blue");
}
var winHeight = "";
$(window).scroll(function(){
    //获取当前页面的顶端到页面顶端的距离
    winHeight = $(window).scrollTop();
});
function stepThird(){
    if(ok3 == true){
        // $(".mask-wrap").css("height",$(window).height());
        // $(".mask-wrap").css("top",winHeight);

        var top = ($(window).height() - $(".mask-wrap").height())/2;
        var left = ($(window).width() - $(".mask-wrap").width())/2;
        var scrollTop = $(document).scrollTop();
        var scrollLeft = $(document).scrollLeft();
        $(".mask-wrap").css( { position : 'absolute', 'top' : top + scrollTop, left : left + scrollLeft } )

        $(".mask-wrap").css("display","block");
        document.body.style.overflow='hidden';
        document.body.style.height='100%';
        document.documentElement.style.overflow='hidden';
        setTimeout(function(){
            window.location.href = "index.html"
        },3000)
    }
};