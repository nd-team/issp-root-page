optionPromote = {
    tooltip:{
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        top: '24%',
        lineStyle:{
            color: '#3e4245',
        },
    },
    legend: {
        data:['技能晋升', '管理等级晋升'],
        // 定位  left center right   ;
        // 定位   top  center bottom
        left: '30px',
        top: 'top',
        textStyle: {
            color: '#fff',
        },
        icon:'circle', //显示的形状
        padding: 20,
        itemWidth: 18, // 图例图形宽度
        itemHeight: 18,
        itemGap:25, //间距
    },
    calculable : true,
    xAxis : [
        {
            type : 'value',
            boundaryGap : [0, 0.01],
            axisPointer: {
                type: 'shadow'
            },
            axisLabel: {
                textStyle: {
                    color: '#c2c2c2', //坐标值得具体的颜色
                },

            },
            axisLine: {
                lineStyle: {
                    color: '#3e4245',
                },
            },
            splitLine: {
                show: false, //显示隐藏网格线
                //  改变轴线颜色
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#3e4245']
                }
            },
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : ['晋升次数','当前管理等级'],
            axisLabel: {
                textStyle: {
                    color: '#c2c2c2', //坐标值得具体的颜色
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#3e4245',
                }
            },
            splitLine: {
                show: true,
                //  改变轴线颜色
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#3e4245']
                }
            }
        }
    ],
    series : [
        { // For shadow
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#3e4245',
                    barBorderRadius: [0, 5, 5, 0],  //（顺时针左上，右上，右下，左下）圆角
                }
            },
            barGap:'-100%',
            barCategoryGap:'55%',
            data: dataShadow,
        },
        {
            barWidth: '15%',
            name:'技能晋升',
            type:'bar',
            data:[5, 8],
            z: 3,
            itemStyle: {
                normal: {
                    //控制渐变的颜色
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#fa49b7'
                    }, {
                        offset: 1,
                        color: '#6841ed'
                    }]),
                    barBorderRadius: [0, 5, 5, 0],  //（顺时针左上，右上，右下，左下）圆角
                }
            }
        },
        {
            barWidth: '15%',
            name:'管理等级晋升',
            type:'bar',
            data:[10,20],
            z: 3,
            itemStyle: {
                normal: {
                    //控制渐变的颜色
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#01dafb'
                    }, {
                        offset: 1,
                        color: '#0094e0'
                    }]),
                    barBorderRadius: [0, 5, 5, 0],  //（顺时针左上，右上，右下，左下）圆角
                },
            }
        }
    ]
};





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
