const app = require('koa')();//koa web应用
const path = require('path');//路径
const router = require("koa-router")();//路由中间件
const session = require('koa-session');//cookie
const koaBody = require('koa-body');
const json = require('koa-json');
const cors = require('koa-cors');
const staticCache = require('koa-static-cache');
const config = require(path.resolve('plugins/read-config.js'));
const routersPath = '/koa/routers/';
const port = process.env.PORT ||80;

app.use(cors());//跨域请求,用于与browsesync调试
app.keys = ['feedback'];//session加密值
app.use(session(app));//使用cookie
app.use(koaBody());//必需要路由用之前使用,不然获取不到表单
router.get('/', function *(next) {//根路由
    this.redirect('/index');//重写向到登录页面
    this.status = 301;
});
/*
 //  "aurl": "http://192.168.0.57:51506"   待办事件
 //  "aurl": "http://192.168.0.57:51506"   反馈
 //  "aurl": "http://192.168.0.57:51506"   公告
 //  "aurl": "http://192.168.0.57:51506"   任务分配
 //  "aurl": "http://192.168.0.57:51506"   管理提成
 //  "aurl": "http://192.168.0.57:51506"   出车记录
 //  "aurl": "http://192.168.0.57:51506"   油卡充值
 //  "aurl": "http://192.168.0.57:51506"   考勤

 //"rurl": "https://grenade.issp.bjike.com:8080",            //官网
 //"burl": "https://businessproject.issp.bjike.com:8080",    //商务合同
 //"curl": "https://user.issp.bjike.com:8080",               //用户模块
 //"durl": "https://lendreimbursement.issp.bjike.com:8080", //借款报销
 //"vurl": "https://organize.issp.bjike.com:8080",           //组织结构
 //"turl": "https://taskallotment.issp.bjike.com:8080",      //任务分配
 //"furl": "https://announcement.issp.bjike.com:8080",       //公告
 //"aurl": "http://192.168.0.57:51506"

 */

//============路由===========
app.use(require(path.join(__dirname,routersPath,'index.js'))().routes());//列表路由
app.use(router.routes());

//============静态文件资源===========
app.use(staticCache(path.join(__dirname, './static/pages'), {
    maxAge: 10 * 60 * 60
}));
app.listen(port, function () {
    console.log('koa server listening on port ' + port);
});