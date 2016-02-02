import {cities} from '../global_data'

export default function citySelecter(){
    var cityContainer = this.find('.city-container');
    var self = this;

    function show(){
        cityContainer.addClass('show');
    }
    function hidden(){
        cityContainer.removeClass('show');
    }

    function init(){
        var defaultVal = self.find(".value").val();
        var clitiesHtml = cities.map(function(item){
            if(defaultVal === item){
                return `<li class="selected">${item}</li>`;
            }else{
                return `<li>${item}</li>`;
            }

        });
        cityContainer.html(clitiesHtml.join(''));

    }

    function setSelected(val){
        self.find(".value").val(val);
    }

    this.click(function(e){
        var isOpen = cityContainer.hasClass('show');
        if(e.target.nodeName === 'LI'){
            setSelected(e.target.innerHTML);
            hidden(e);
        }
        else if(isOpen){
            e.stopPropagation();
        }else{
            init();
            show();
        }

    });
}