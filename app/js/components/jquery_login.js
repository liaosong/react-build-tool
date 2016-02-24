import $ from 'jquery';
import Modal from '../components/jquery.dialog';
import request from 'superagent';

$.fn.modal = $.fn.modal? $.fn.modal: Modal;


export default function Login(JQDom){
    var loginModal = JQDom.modal({width: 280});

    loginModal.open();

    function checkPhoneNumber(val){
        var tipEle = $("#phoneTips");
        if(!val){
            tipEle.html("手机号码不能为空");
            return false;
        }
        if(!/1\d{10}/.test(val.replace(' ', ''))){
            tipEle.html("请输入正确的手机号");
            return false;
        }
        tipEle.html("");
        return true;

    }

    function checkPassword(val){
        var tipEle = $("#passwordTips");
        if(!val){
            tipEle.html("密码不能为空");
            return false;
        }
        if(val.replace(' ', '').length < 6 || val.replace(' ', '').length > 16){
            tipEle.html("密码长度为6-16位");
            return false;
        }
        tipEle.html("");
        return true;
    }

    $("#phoneNumber").blur(function(){
        var val = this.value;
        checkPhoneNumber(val);
    });
    $("#password").blur(function(){
        var val = this.value;
        checkPassword(val);
    });

    $("#loginForm").submit(function(e){
        e.preventDefault();
        var phoneNumber = $("#phoneNumber").val();
        var password = $("#password").val();
        if(checkPhoneNumber(phoneNumber) && checkPassword(password)){
            request
                .post('/api/client/web_login')
                .send({phone_number: phoneNumber, password: password})
                .set('Accept', 'application/json')
                .end(function(err, res){
                    if(err){
                        return console.log(err);
                    }

                    if(res.body.status == 0){
                        location.href = location.href;
                    }else{
                        $("#loginTips").html(res.body.message);
                    }

                });

        }else{
            return false;
        }

    });



    function close(){
        loginModal.close();
    }
    return {close}
}