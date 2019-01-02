//创建cookie
function createCookie(key,value,expires){
	var cookieText = encodeURIComponent(key) + '=' + encodeURIComponent(value) + ';path=/'; //'key=value;path=/'
	//判断是不是数字
	if(typeof expires === 'number' && expires >= 0){
		var date = new Date();
		date.setDate(date.getDate() + expires);
		cookieText += ';expires=' + date; //'key=value;path=/;expires=' + 日期对象
	}
	//创建cookie
	document.cookie = cookieText;
}
//获取cookie
function cookie(key){
	var cookieKey = encodeURIComponent(key) + '=';
	var start = document.cookie.indexOf(cookieKey);
	if(start != -1){
		var end = document.cookie.indexOf(';',start);
		if(end === -1){
			end = document.cookie.length;
		}
		var cookieValue = decodeURIComponent(document.cookie.substring(start + cookieKey.length,end));
		return cookieValue;
	}
}
function getCookie(key){
	var arr = document.cookie.split('; ');
	for(var i = 0,len = arr.length;i < len;i ++){
		var list = arr[i].split('=');
		if(encodeURIComponent(key) === list[0]){
			return decodeURIComponent(list[1]);
		}
	}
}
//删除cookie
function removeCookie(key){
	document.cookie = encodeURIComponent(key) + "=;expires=" + new Date(0) + ';path=/';
}