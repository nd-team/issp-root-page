
//cookie里面没有username时候跳转到登录页面
// if($.cookie('username')==undefined){
//     window.location.href = 'https://login.issp.bjike.com/login?url=https://show.issp.bjike.com/system.html';
// }


$(window).ready(function(){   
    $('.header').html(dome({title:'岗位'}))
 })
