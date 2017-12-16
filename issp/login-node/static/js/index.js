/**
 * Created by Bjike on 2017/9/25.
 */
var ok1=false;
var ok2=false;
var ok3=false;
var userName = {}
$(function(){
    $('input[name="phone"]').on('input propertychange',function(){
        reg=/^1[34578]{1}\d{9}$/;//验证手机正则
       if(reg.test($(this).val())){
            ok1 = true;
            $(this).next().empty();
        }
        else {
            ok1 = false;
            $(this).next().html("请输入正确的手机号!").removeClass('state1').addClass('state3');
        }
        if(ok1 == true){
            $(".login-button input").removeClass("submitError");
            $(".login-button input").addClass("submitUser");
            userName["phone"] = $(this).val();
        }else{
            $(".login-button input").removeClass("submitUser");
            $(".login-button input").addClass("submitError");
        }
    });


    //密码栏
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
    /*确认密码*/
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

    $.ajax({
        type:"post",
        url:"/user/register",
        data:userName,
        success:function(msg){
            console.log(msg)
        }
    });

}
function codecomplete(){
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
    if($('input[name="phone"]').val() == ''){
        $('input[name="phone"]').next().text("请输入您的手机号").removeClass('state1').addClass('state3');
    }
    if(ok1 == true){
        $(".page1").css("display","none");
        $(".page2").css("display","block");
        $(".page3").css("display","none");
        $(".ball-two").removeClass("ball-white").addClass("ball-blue");
    }
}

function stepSecond(){
    var code = {};
    code["code"] = $('.code').val();
    code.phoneNumber = userName.phone;
    console.log(123123)
    $.ajax({
        type:"post",
        url:"/user/Verify",
        data:code,
        success:function(msg){
            console.info(msg)
            if( msg.code == 0){
                $(".page1").css("display","none");
                $(".page2").css("display","none");
                $(".page3").css("display","block");
                $(".ball-three").removeClass("ball-white").addClass("ball-blue");
            }else{
                $(".input-tip").html(msg.msg).css("color","red")
            }
        }
    });

}

function stepThird(){
    if(ok3 == true){
        var top = ($(window).height() - $(".mask-wrap").height())/2;
        var left = ($(window).width() - $(".mask-wrap").width())/2;
        var scrollTop = $(document).scrollTop();
        var scrollLeft = $(document).scrollLeft();
        $(".mask-wrap").css( { position : 'absolute', 'top' : top + scrollTop, left : left + scrollLeft } )

        $(".mask-wrap").css("display","block");
        document.body.style.overflow='hidden';
        document.body.style.height='100%';
        document.documentElement.style.overflow='hidden';
        userName["password"] = $("input[name='repass']").val();
        $.ajax({
            type:"post",
            url:"/user/register",
            data:{},
            success:function(msg){
                console.log(msg)
            }
        });
        setTimeout(function(){
            window.location.href = "/login"
        },3000)
    }
};