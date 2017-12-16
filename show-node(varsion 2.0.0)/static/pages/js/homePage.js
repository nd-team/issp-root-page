 function goLogin() {
     var abs = 'https://show.issp.bjike.com/system.html';
     window.location.href = 'https://login.issp.bjike.com/login?url=' + abs
 }

 $('.goTo').click(function () {
     var abs = 'https://show.issp.bjike.com/system.html';
     window.location.href = 'https://login.issp.bjike.com/login?url=' + abs
 })

 $('.navbar-fixed-top .navbar-nav li').click(function () {
     $('.navbar-fixed-top .navbar-nav li').removeClass('active');
     $(this).addClass('active');
     $('.collapse').removeClass('in');
 })




 function sideGo() {
     var i = 0;
     setInterval(function () {
         $('.ass').eq(i).addClass('img' + i);
         $('.ass').eq(i).html('<img src=../images/homePage/' + (i + 1) + '.png>');
         i++;
     }, 500);
 }
 $(window).scroll(function () {
     if ($(window).scrollTop() >= 4960) {
         sideGo();
     }
 });
