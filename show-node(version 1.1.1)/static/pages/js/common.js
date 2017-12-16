window.onload = function () {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../font/icons/svg-symbols.svg", true);
    ajax.onload = function (e) {
        document.body.insertAdjacentHTML("afterBegin", '<div style="display:none;">' + ajax.responseText + '</div>');
    }
    ajax.send();



   //cookie里面没有username时候跳转到登录页面
   if($.cookie('username')==undefined){
    window.location.href = 'https://login.issp.bjike.com/login?url=https://show.issp.bjike.com/system.html';
}

//提取公共部分  加载头部和导航
function dome(obj){
    return  `<nav class="navbar navbar-inverse navbar-fixed-top nav-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false">
                <span class="sr-only"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">
                <i>ISSP</i>平台</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <span class="glyphicon glyphicon-th-list"></span><i id="bigTitle">${obj.title}</i>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="active">
                            <a href="/system.html">个人维度</a>
                        </li>
                        <li>
                            <a href="/post.html">岗位维度</a>
                        </li>
                        <li>
                            <a href="/department.html">部门维度</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="companyName hidden-xs">北京艾佳天诚信息技术有限公司</div>
            <ul class="nav navbar-nav navbar-right choose  ">
                <li class="visible-lg">
                    <a href="/password.html">修改密码</a>
                </li>
                <li class="visible-xs visible-lg">
                    <a href="https://login.issp.bjike.com/login?url=https://show.issp.bjike.com/system.html" class="userName"><img style="width:25;height:25px" src="/images/one.gif" alt=""></a>
                </li>
                <li class="visible-lg">
                    <a>|</a>
                </li>
                <li class="visible-lg">
                    <a href="https://login.issp.bjike.com/login?url=https://show.issp.bjike.com/system.html">
                        <em>
                            <svg role="img" class="quit">
                                <use xlink:href="#quit"></use>
                            </svg>
                        </em>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    </nav>
    <nav class="nav-left hidden-xs" onmouseleave="goOut()">
    <form class="navbar-form navbar-right">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="搜索">
            <span class="input-group-btn">
                <button class="btn btn-default" type="button">
                    <span class="glyphicon glyphicon-search"></span>
                </button>
            </span>
        </div>
    </form>
    <ul class="navMenu" id="navMenu">
    
    </ul>
    <section class="other" id="otherNavMenu" onmouseleave="goOut(this)">
    
    </section>
    </nav>`
}


//以下为导航的js
function One() {}
function isFour(obj) {
    var arr = obj.four;
    var tempFour = '<ul class="other-navMenuChild">';
    for (var i = 0, len = arr.length; i < len; i++) {
        tempFour +=
            `<li>
                        <a href="${arr[i].url}" title="${arr[i].name}">${arr[i].name}</a>
                    </li>`
    }
    return tempFour += '</ul>'
}

function isThree(obj) {
    var arr = obj.three;
    var tempThree = '<ol class="other-part">';
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i].four) {
            var tempFour = isFour(arr[i]);
        }
        tempThree +=
            ` <li>
                    <a href="#" onclick="childclick(this)">
                        <span>${arr[i].name}</span>
                        <span class="glyphicon glyphicon-menu-right"></span>
                    </a>
                    ${tempFour||""}
                </li>`
    }
    return tempThree += '</ol>';
}
var liNum = 0;

function isTwo(obj) {
    var arr = obj.two;
    var temp = '<ul class="navMenu-child">';

    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].three) {
            var tempThree = isThree(arr[i]);
        }
        temp +=
            ` <li class="parentLi" onmouseover="goIn(${liNum})">
                        <a href="#">
                            <span>${arr[i].name}</span>
                            <span class="glyphicon glyphicon-menu-right"></span>
                        </a>
                    </li>`
        liNum++;
        $("#otherNavMenu").append(`${tempThree||""}`)
    }
    return temp += '</ul>'
}

One.prototype.draw = function (obj) {
    if (obj.two) {
        var temp = isTwo(obj);
    }
    var templeta =
        `<li><a href="javascript:void(0)" onclick="aclick(this)">
                    <span class="nav-text">
                    <svg role="img" class="${obj.icon}">
                    <use xlink:href="#${obj.icon}"></use>
                    </svg>${obj.name} </span>
                    <span class="glyphicon glyphicon-menu-right"></span>
                    </a>
                    ${temp || ''}
                </li>`
    return templeta;
}

function insertOne(obj, ele) {
    var oneData = new One();
    ele.append(oneData.draw(obj));
}

$(document).ready(function () {
    $.ajax({
        dataType: 'json',
        url: '../nav-left.json',
        success: function (data) {
            var dataObj = eval(data).data;
            //一层循环
            $.each(dataObj, function (n1, value) {
                insertOne(value, $('.navMenu'));
            });
        }
    });
});

function aclick(that) {
    openChild(".navMenu", ".navMenu-child", that)
}

function childclick(that) {
    openChild(".other-part", ".other-navMenuChild", that)
}
// 侧边导航的子ul展开
function openChild(ele, eleChild, that) {
    $(ele + '>li>a>.glyphicon').removeClass("glyphicon-menu-down");
    if ($(that).next(eleChild).hasClass('open') == false) {
        $(ele).find(eleChild).slideUp(300);
        $(ele).find("li").removeClass("open");
        $(that).next(eleChild).addClass("open").slideDown(300);
        $(that).find(".glyphicon").addClass("glyphicon-menu-down");
    } else {
        $(that).next(eleChild).removeClass("open").slideUp(300);
    }
}

function goIn(liNum) {
    $(".other").show();
    $(".nav-left .other .other-part").hide().eq(liNum).show();
}

function goOut() {
    $(".other").hide();
}


/*******************************tab切换*********************************/
$('.addTab li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.addTab li').eq('.addTab li');
    //相同类打印 测试 判断
    //console.log($('.addTab li').index($(this)));
});


/*******************************晋升管理的tab切换*********************************/
$('.time-btn>.listTab>li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
});

/*******************************待办事项的tab切换*********************************/

$('.todo-ul>.listTab>li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
});


/*******************************公告的向上移动*********************************/
var num = 0;

//公告轮播
var timer = setInterval(function () {
    if (aru) return;
    num++;
    if (num > 4) {
        num = 0;
        $('.carousel').css({
            'top': 0,
            'transition': 'top 0s'
        }); //修改
    } else {
        $('.carousel').css({
            'top': -35 * num + "px",
            'transition': 'top 1s'
        });
    }
    $('.carousel>li').eq(num).addClass('active').siblings().removeClass('active');
}, 2000);
var aru = false;

$('.carousel').mouseenter(function () {
    aru = true;
}).mouseleave(function () {
    aru = false;
});

//待办事件轮播
var num1 = 0;
var aru1 = false;
var timer1 = setInterval(function () {
    if (aru) return;
    num1++;
    if (num1 > 4) {
        num1 = 0;
        $('.clip').css({
            'top': 0,
            'transition': 'top 0s'
        }); //修改
    } else {
        $('.clip').css({
            'top': -38 * num1 + "px",
            'transition': 'top 1s'
        });
    }
    $('.clip>li').eq(num1).addClass('active').siblings().removeClass('active');
}, 1500);
var aru1 = false;
$('.clip').mouseenter(function () {
    aru1 = true;
}).mouseleave(function () {
    aru1 = false;
});



/*========================================公告修改===============================================*/
//弹窗
function aa(elem){
    $('.msgText-aa').html("");
    var id=elem.getElementsByTagName("span")[2].innerHTML;
    $('.popup').css({'display':'block'});
    $.post('/announcement/read',{id},   //读取详情
        function (response) {
            if(response.code == 0){
                var list = response.data;
                $('.msgTitle').text(list.title);
                $('.sendUser').text(list.author);
                var content = list.publishContent;
                /* $('input').val(content)*/
                $('.msgText-aa').append(content);
                if($('.msgText-aa').find("td")){
                    $('.msgText-aa').find("td").addClass("aaaa")
                }
            }
        });
    var cc=elem.getElementsByTagName("i").length;
    if(cc>0){
        elem.getElementsByTagName("i")[0].remove();
    }else if(cc=0){
        return false;
    }
}
//修改的 点击公告弹窗

$('.close-botton').click(function(){    //修改的 关闭公告弹窗
    $('.popup').css({'display':'none'})
});

//修改中的  获取列表与总条数

myFunction();
function myFunction() {
    myVar = setInterval(bb, 10000);
}

function bb(){
    $.get('announcement/current/list/count',function(response){      //获取总条数
        if(response.code==0) {
            //公告页码
            var totalCount = response.data;
            showCount = 1;
            limit = 10;

            createTable(1, limit, totalCount);

            $('#callBackPager').extendPagination({

                totalCount: totalCount,

                showCount: showCount,

                limit: limit,

                callback: function (curr, limit, totalCount) {

                    createTable(curr, limit, totalCount);

                }

            });


            function createTable(currPage, limit, total) {

                var html = [], showNum = limit;

                if (total - (currPage * limit) < 0) showNum = total - ((currPage - 1) * limit);

                html.push(' <table class="table table-hover piece" style="margin-left: 0;">');

                html.push('</tbody></table>')
                var mainObj = $('#mainContent');

                mainObj.empty();

                mainObj.html(html.join(''));
                var page = currPage || 1;
                $.get('announcement/current/list', {page}, function (response) {  //读取列表
                    if (response.code == 0) {
                        var lists = response.data;
                        if(lists==undefined){
                            lists=[
                                {
                                    title:null,
                                    publishDate:null,
                                    id:null
                                }
                            ]
                        }
                        var html = template('bea', {lists: lists});
                        var carousel = document.querySelector('.carousel');
                        carousel.innerHTML = html;
                        var x=document.getElementsByClassName("noticea");
                        for(i=0;i<x.length;i++){
                            var dd =document.getElementsByClassName("noticea")[i].getElementsByTagName('e')[0].innerHTML;
                            if(document.getElementsByClassName("noticea")[i].getElementsByTagName('e')[0].innerHTML=="true"){
                                document.getElementsByClassName("noticea")[i].getElementsByTagName('i')[0].remove()
                            }
                        }

                    }

                })
            }
        }
    })
}
bb();
/*========================================公告修改结束===============================================*/


}