import $ from 'jquery';

import citySelecter from '../js/components/jquery_city_selecter';
import Login from '../js/components/jquery_login';
import Modal from '../js/components/jquery.dialog';

$.fn.citySelecter = citySelecter;
$.fn.modal = Modal;

const carouselImgs = [
    '/images/banner_img.jpg',
    '/images/banner_img2.jpg',
    '/images/banner_img3.jpg',
    '/images/banner_img4.jpg',
];

$(function(){
    var citySelecterObj = $(".city-selecter").citySelecter();

    var carousel = $("#carousel");

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


    //carousel header background

    function loadImg(url){
        var deferred = $.Deferred();
        var img = new Image();
        img.onload = function(){
            deferred.resolve(url + "加载完毕");
        }
        img.onerror = function(){
            deferred.reject("图片" + url + "加载失败");
        }
        img.src = url;

        return deferred;
    }

    function loadImgs(){
        var promises = carouselImgs.map(function(item){
            return loadImg(item);
        })
        $.when.apply(this, promises).done(function(){
            carousel.addClass("carousel");
        }).fail(function(err){
            console.log(err);
        });

    }

    loadImgs();


});