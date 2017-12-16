var request = require('request-promise');
var path = require('path');
var config = require(path.resolve('plugins/read-config.js'));
var form = require(path.resolve('plugins/form.js'));
module.exports = function(){
    this.publickey = function(){
        var options = {
            method : 'get',
            timeout : 3000,
            uri : config()['rurl'] + '/public/v1/key',
        };
        return request(options);
    };
    this.userlogin = function(data){
        var options = {
            method : 'POST',
            timeout : 3000,
            uri : config()['rurl'] + `/v1/login`,
            form:data
        };
        return request(options);
    };
    this.logout = function(argvs){
        var options = {
            method : 'GET',
            timeout : 3000,
            uri : config()['rurl'] + `/v1/sign-out/${argvs.token}`,
            form:argvs
        };
        return request(options);
    };
    this.userRegister = function(argvs){
        var options = {
            method : 'GET',
            timeout : 3000,
            uri : config()['rurl'] + `/v2/sendSmsCode/${argvs.phone}`
        };
        return request(options);
    };
    this.userVerify = function(argvs){
        var options = {
            method : 'POST',
            timeout : 3000,
            uri : config()['rurl'] + `/v2/verifyCode`,
            form:argvs
        };
        return request(options);
    };
    this.userRepass = function(argvs){
        var options = {
            method : 'GET',
            timeout : 3000,
            uri : config()['rurl'] + `/v2/sendSmsCode/${argvs.phone}`,
            form:argvs
        };
        return request(options);
    };
    return this;
}