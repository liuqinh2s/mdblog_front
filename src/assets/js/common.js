const REGEX_MOBILE_EXACT = new RegExp(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/)
const EMAIL_REGEX = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/)

function isMatch(regex, input){
    return (input!==undefined)&&(input.length>0)&&(regex.exec(input)!=null)
}

export function isPhone(input){
    return isMatch(REGEX_MOBILE_EXACT, input)
}

export function isEmail(input){
    return isMatch(EMAIL_REGEX, input)
}
