/*用export把方法暴露出来*/
/*设置cookie*/
export function setCookie(cname, cvalue, expire) {
  let date = new Date();
  date.setSeconds(date.getSeconds() + expire);
  document.cookie = cname + "=" + escape(cvalue) + "; expires=" + date.toGMTString();
  console.log(document.cookie)
}

/*获取cookie*/
export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  console.log("ca");
  console.log(ca);
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}

/*删除cookie*/
export function delCookie(cname) {
  setCookie(cname, "", -1)
}
