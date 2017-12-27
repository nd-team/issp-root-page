var Router = require('koa-router');
var path = require('path');
var sendfile = require('koa-sendfile');
var server = require(path.resolve('koa/servers/index.js'));
var config = require(path.resolve('plugins/read-config.js'));
var uploadFile = require(path.resolve('plugins/uploadFile.js'));
var urlEncode = require(path.resolve('plugins/urlEncode.js'));
var fileType = require(path.resolve('plugins/fileType.js'));
var fetch = require('node-fetch');//url转发
module.exports = function(){
    var router = new Router();
    //获取列表页面
    router.get('/index', function *(){
        yield (sendfile(this, path.resolve('static/index.html')));
        if(!this.status){
            this.throw(404);
        }
    });
    router.get('/positiondetailuser/userName/userinfo', function*(){ //获取用户名和编号
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        data.userName = $self.cookies.get('username');
        yield (server().getNameDat(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/reimburseshape/todayWeekNum', function*(){ //获取报销周数
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().getWeek(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/reimburseshape/todayQuaryNum', function*(){ //获取季度
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().getQuary(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).post('/reimburseshape/monWeek/collect', function*(){ //报销汇总
        var $self = this;
        var data = $self.request.body;
        data.userToken = $self.cookies.get('token');
        yield (server().collectBorr(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/siginmanage/weekCollectFigure', function*(){ //地区合同周汇总
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().getContactWeekCollect(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/siginmanage/monthCollectFigure', function*(){ //地区合同月汇总
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().getContactMonthCollect(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/siginmanage/quarterCollectFigure', function*(){ //地区合同季度汇总
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().getContactQuarterCollect(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/siginmanage/yearCollectFigure', function*(){ //地区合同年汇总
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().getContactYearCollect(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).post('/update/pwd', function*(){ //修改密码
        var $self = this;
        var data = $self.request.body;
        data.userToken = $self.cookies.get('token');
        yield (server().modifyPassword(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
        /*******************************公告****************************************/
    }).get('/announcement/current/list', function*(){ //获取当前用户必读且未读的公告列表
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().getrequiredReads(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/announcement/current/list/count', function*(){ //必读且未读公告总条数
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().getrequiredCount(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/downLoadFile', function*(){//下载文件 通告
        var $self = this;
        var count = $self.request.query;
        var data = {
            path:count.path.split('&')[0]
        };
        yield (fetch(config()['furl']+`/announcement/v1/downloadFile${urlEncode(data,true)}`, {
            method : 'GET',
            headers : {'userToken' : $self.cookies.get('token')}
        }).then((res)=>{
            fileType(count,this);
            return res.buffer();
        }).then(function(data){
            $self.body = data;
        }));
    }).post('/announcement/read', function*(){ //读取公告
        var $self = this;
        var data = $self.request.body;
        data.userToken = $self.cookies.get('token');
        yield (server().getRead(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
        /*******************************任务分配管理****************************************/
    }).get('/task/collectFigure', function*(){ //汇总
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().taskCollect(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/preferential', function*(){  //下载apk
            yield (sendfile(this, path.resolve('static/android-release.apk')));
    }).get('/even/evenCount', function*(){ // 个人详情的待办事件
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().evenCount(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/feedback/feedBackCount', function*(){ // 个人详情的反馈总数
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().feedBackCount(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/notice/noticeCount', function*(){ // 个人详情的公告总数
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().noticeCount(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/task/taskCount', function*(){ // 个人详情的任务分配总数
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().taskCount(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/mag/magCount', function*(){ // 管理提成的总数
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().magCount(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/car/carCount', function*(){ // 出车记录的总数
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().carCount(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/oil/oilCount', function*(){ // 油卡充值的总数
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().oilCount(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/check/lateCount', function*(){ // 个人详情迟到的考勤总数
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().lateCount(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/check/wordCount', function*(){ // 个人详情加班的考勤总数
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().workCount(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/check/leaveCount', function*(){ // 个人详情请假的考勤总数
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().leaveCount(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/quick/list', function*(){ //获取快捷导航的列表
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().quickList(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/quick/edit', function*(){ //获取快捷导航的列表
        var $self = this;
        var data = $self.request.query;
        data.userToken = $self.cookies.get('token');
        yield (server().quickEditList(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    })

    return router;

};
