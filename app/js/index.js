import $ from 'jquery';

import citySelecter from '../js/components/jquery_city_selecter';
import Login from '../js/components/jquery_login';
import Modal from '../js/components/jquery.dialog';

$.fn.citySelecter = citySelecter;
$.fn.modal = Modal;

$(function(){
    var citySelecterObj = $(".city-selecter").citySelecter();

    $("#search").click(function(e){
        var inputVal = $("#searchText").val();
        var cityVal = $("#cityVal").val();
        cityVal = cityVal == '不限' ? '': cityVal;
        location.href = encodeURI(`/search?q=${inputVal || ''}&city=${cityVal || ''}`);
    });


    $("#loginButton").click(function(e){
        Login($("#loginDialog"));
    })

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

    $('body').click(citySelecterObj.hidden);


});