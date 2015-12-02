

export function checkPhoneNumber(phoneNumber){
    if(!phoneNumber){
        return {res: false, message: '手机号不能为空'};
    }
    if(!/1\d{10}/.test(phoneNumber.replace(' ', ''))){
        return {res: false, message: '请输入正确的手机号'};
    }

    return {res: true};
}

export function checkPassword(password){
    if(!password){
        return {res: false, message: '密码不能为空'}
    }
    if(password.replace(' ', '').length < 6 || password.replace(' ', '').length > 16){
        return {res: false, message: '请输入6-16位字符'};
    }
    return {res: true};
}

export function isPasswordsEqual(pw1, pw2){
    return pw1 === pw2;
}

export function checkCode(code){
    if(!code){
        return {res: false, message: '验证码不能为空'};
    }
    if(!/^\d{6}$/.test(code.replace(' ', ''))){
        return {res: false, message: '请输入正确的验证码格式'};
    }

    return {res: true};
}

