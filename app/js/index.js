import $ from 'jquery';

import citySelecter from '../js/components/jquery_city_selecter';

import dialog from 'jquery-ui/dialog';

$.fn.citySelecter = citySelecter;

$(function(){
    $(".city-selecter").citySelecter();

    $("#search").click(function(e){
        var inputVal = $("#searchText").val();
        var cityVal = $("#cityVal").val();
        location.href = encodeURI(`/search?q=${inputVal || ''}&city=${cityVal || ''}`);
    });

    $("#dialog").dialog({modal: true});
});