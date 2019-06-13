const REGEX_MOBILE_EXACT = new RegExp(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/)
const EMAIL_REGEX = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/)
const ADDRESS = "http://192.168.1.101:8080/api/v1"

function isMatch(regex, input){
    return (input!==undefined)&&(input.length>0)&&(regex.exec(input)!=null)
}

export function isPhone(input){
    return isMatch(REGEX_MOBILE_EXACT, input)
}

export function isEmail(input){
    return isMatch(EMAIL_REGEX, input)
}

export function timeStamp2Date(timestamp) {
  var time = new Date(timestamp);
  var y = time.getFullYear();
  var m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
  var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
  return y + "." + m + "." + d
}

export default {
  ADDRESS
}
