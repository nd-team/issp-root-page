window.onload = function () {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../font/icons/svg-symbols.svg", true);
    ajax.onload = function (e) {
        document.body.insertAdjacentHTML("afterBegin", '<div style="display:none;">' + ajax.responseText + '</div>');
    };
    ajax.send();
    //cookie里面没有username时候跳转到登录页面
    // if($.cookie('username')==undefined){
    //     window.location.href = 'https://login.issp.bjike.com/login?url=https://show.issp.bjike.com/system.html';
    // }
      $('.moveLi>li>a').hover(function () {
         $(this).parent().addClass('active').siblings().removeClass('active');
      });
      
      $('#quickClick').on('click',function () {
          $('#picture-mask').show();
          $('.quickDiv').show();
          $('html').css('overflow','hidden');
      });
      $('.btn_cancal,.clo').click(function () {
          $('#picture-mask').hide();
          $('.quickDiv').hide();
          $('html').css('overflow','inherit');
      });
};
