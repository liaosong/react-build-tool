import $ from 'jquery';

import Login from '../js/components/jquery_login';
import request from 'superagent';

function enshrines(companyId, cb){
    request.post("/api/client/enshrines").send({company: companyId})
        .end((err, res) => {
            if(err){
                return console.log(err);
            }

            if(res.body.status == 0){
                cb();
            }else{
                console.log(res.body.message);
            }
        });

}
function unEnshrines(companyId, cb){
    request.del('/api/client/enshrines/cancel')
        .send({company: companyId})
        .end((err, res) => {
            if(err){
                return console.log(err);
            }

            if(res.body.status == 0){
                cb();
            }else{
                console.log(res.body.message);
            }
        });
}

$(function(){

    $("#search").click(function(e){
        var inputVal = $("#searchText").val();
        var cityVal = $("#cityVal").val();
        location.href = encodeURI(`/search?q=${inputVal || ''}&city=${cityVal || ''}`);
    });


    $("#loginButton").click(function(e){
        Login($("#loginDialog"));
    })

    $(".c-enshrine").click(function(e){
        var self = $(this);
        var isLogin = $("#authedPhone").length > 0 ? true: false;
        if(isLogin){
            var companyId = $(e.target).prev().attr('href').split('/')[2];
            if(self.hasClass('collected')){
                //已被收藏, 取消收藏
                unEnshrines(companyId, function(){
                    self.removeClass('collected');
                    self.addClass('collect');
                });
            }else{
                //未被收藏，收藏
                enshrines(companyId, function(){
                    self.removeClass('collect');
                    self.addClass('collected');
                });
            }

        }else{
            Login($("#loginDialog"));
        }
    });

    $("#publish").click(function(e){
        var isLogin = $("#authedPhone").length > 0 ? true: false;
        var publishDialog = $("#publishDialog");
        if(isLogin){
            if(publishDialog.hasClass("tender-type-container")){
                publishDialog.modal({width: 600, height: 400}).open();
            }else{
                publishDialog.modal({width: 600, height: 240}).open();
            }
        }else{
            Login($("#loginDialog"));
        }

        var closeEle = $("#publishDialog").find(".close");
        if(closeEle){
            closeEle.click(function(e){
                $("#publishDialog").modal({width: 600, height: 400}).close();
            });
        }
    })



});