var Router = require('koa-router');
var path = require('path');
var sendfile = require('koa-sendfile');
var server = require(path.resolve('koa/servers/index.js'));
var config = require(path.resolve('plugins/read-config.js'));
var fetch = require('node-fetch');//url转发
module.exports = function(){
    var router = new Router();
    //获取列表页面
    router.get('/login', function *(){
        yield (sendfile(this, path.resolve('static/login.html')));
        if(!this.status){
            this.throw(404);
        }
    }).get('/index', function *(){
        yield (sendfile(this, path.resolve('static/index.html')));
        if(!this.status){
            this.throw(404);
        }
    }).get('/register', function *(){
        yield (sendfile(this, path.resolve('static/register.html')));
        if(!this.status){
            this.throw(404);
        }
    }).get('/repass', function *(){
        yield (sendfile(this, path.resolve('static/repass.html')));
        if(!this.status){
            this.throw(404);
        }
    }).get('/market', function *(){
        yield (sendfile(this, path.resolve('static/market.html')));
        if(!this.status){
            this.throw(404);
        }
    }).get('/opportunity', function *(){
        yield (sendfile(this, path.resolve('static/opportunity.html')));
        if(!this.status){
            this.throw(404);
        }
    }).get('/bussprog', function *(){
        yield (sendfile(this, path.resolve('static/bussprog.html')));
        if(!this.status){
            this.throw(404);
        }
    }).get('/plan', function *(){
        yield (sendfile(this, path.resolve('static/plan.html')));
        if(!this.status){
            this.throw(404);
        }
    }).get('/user/publickey', function*(){
        var $self = this;
        yield (server().publickey()
            .then((parsedBody) =>{
            var responseText = JSON.parse(parsedBody);
        $self.body = responseText;
    }).catch((error) =>{
            $self.set('Content-Type','application/json;charset=utf-8');
        $self.body=error.error;
        console.error(error.error);
    }));
    }).post('/user/login', function*(){
        var $self = this;
        var user = $self.request.body;
        yield (server().userlogin(user)
            .then((parsedBody) =>{
            var responseText = JSON.parse(parsedBody);
                if(responseText.code == 0){
                    var token = responseText.data;
                    $self.body = responseText;
                    $self.cookies.set('token', token, {maxAge : 1000 * 60 * 60 * 24 * 7});
                }else if(responseText.code == 1){
                    $self.set('Content-Type','application/json;charset=utf-8');
                    $self.body = responseText;
                }
        }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
        }));
    }).get('/user/logout', function*(){
        var $self = this;
        var token = {token:$self.cookies.get('token')};
        var urlRed = this.request.query;
        yield (server().logout(token)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                if(responseText.code==0){
                    $self.cookies.set('token', '');
                    $self.cookies.set('username', '');
                    this.redirect(`http://${urlRed.absurl}/#!${urlRed.hash}`);
                }
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/user/register', function*(){
        var $self = this;
        var user = $self.request.body;
        yield (server().userRegister(user)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/user/repass', function*(){
        var $self = this;
        var user = $self.request.body;
        yield (server().userRepass(user)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/user/Verify', function*(){
        var $self = this;
        var user = $self.request.body;
        yield (server().userVerify(user)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    });
    return router;
};
