import $ from 'jquery';

import citySelecter from '../js/components/jquery_city_selecter';
import Login from '../js/components/jquery_login';
import Modal from '../js/components/jquery.dialog';

$.fn.citySelecter = citySelecter;
$.fn.modal = Modal;

$(function(){
    $(".city-selecter").citySelecter();

    $("#search").click(function(e){
        var inputVal = $("#searchText").val();
        var cityVal = $("#cityVal").val();
        location.href = encodeURI(`/search?q=${inputVal || ''}&city=${cityVal || ''}`);
    });


    $("#loginButton").click(function(e){
        Login($("#loginDialog"));
    })
});