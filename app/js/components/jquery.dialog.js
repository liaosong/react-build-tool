import $ from 'jquery';
import dialog from 'jquery-ui/dialog';


export default function Modal(options = {}){
    var self = this;
    var body = $(document.body);


    options = {
        ...options,
        modal: true,
        beforeClose: function( event, ui ) {
            if(body.hasClass('modal-open')){
                body.removeClass('modal-open')
            }
        },
        closeOnEscape: true
    }

    function init(){
        if(!body.hasClass('modal-open')){
            body.addClass('modal-open')
        }

        $(".ui-widget-overlay").click(function(e){
            if($(e.target).hasClass("ui-widget-overlay")){
                close();
            }
        });
    }

    function open(){
        self.dialog(options);
        init();

    }
    function close(){
        self.dialog( "close" );
    }

    return {open, close};
}