import $ from 'jquery';
import Modal from '../components/jquery.dialog';

$.fn.modal = $.fn.modal? $.fn.modal: Modal;


export default function Login(JQDom){
    var loginModal = JQDom.modal({width: 320});

    loginModal.open();

    $("#phoneNumber").blur(function(){
        var val = this.value;
        console.log(val);
    });

    $("#loginForm").submit(function(){
        location.href = location.href;
        return false;
    });

    function close(){
        loginModal.close();
    }
    return {close}
}