import $ from 'jquery';

import citySelecter from '../js/components/jquery_city_selecter';

$.fn.citySelecter = citySelecter;

$(function(){
    $(".city-selecter").citySelecter();

    //$(".city-selecter").click(function(){
    //    var cityContainer = $(this).find('.city-container');
    //    function show(){
    //        cityContainer.addClass('show');
    //    }
    //    function hidden(){
    //        cityContainer.removeClass('show');
    //    }
    //
    //    cityContainer.find("li").click(function(e){
    //        e.stopPropagation();
    //        hidden();
    //    })
    //    show();
    //});
});