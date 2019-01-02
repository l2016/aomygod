(function(){
	var cookieStr = getCookie('registorUser') ? getCookie('registorUser') : '';
	var cookieObj = convertCookieStrToObj(cookieStr);
	var flagTel=null;// 用户名 手机号
	$("#uname").blur(function(){
		var $unameTxt = $("#uname").val();
		var reg = /^1\d{10}$/;
		if($unameTxt in cookieObj){
			$("#s1").html(`<i class="iconfont">&#xe667;</i>用户已存在`);
			return;
		}
		if(reg.test($unameTxt)){
			$("#s1").css("display","none");
			flagTel=true;
		}else{
			$("#s1").css("display","block");
			$("#s1").html(`<i class="iconfont">&#xe667;</i>用户名输入格式不正确！`);
			flagTel=false;
		}
	})
	var flagPwd=null;//密码
	$("#upwd").blur(function(){
		var reg=/^[a-zA-Z0-9]{6,16}$/;
		var reg1=/^[0-9]{6,16}$/;
		var reg2=/^[a-zA-Z]{6,16}$/;
		var $pwdTxt=$("#upwd").val();
		if(reg1.test($pwdTxt)){
			$("#s2").html(`<i class="iconfont">&#xe667;</i>密码不能由纯数字组成`);
			return;
		}
		if(reg2.test($pwdTxt)){
			$("#s2").html(`<i class="iconfont">&#xe667;</i>密码不能由纯字母组成`);
			return;
		}
		if(reg.test($pwdTxt)){
			$("#s2").css("display","none");
			flagPwd=true;
		}else{
			$("#s2").css("display","block");
			$("#s2").html(`<i class="iconfont">&#xe667;</i>密码由6-20个数字字母组成`);
			flagPwd=false;
		}
	})
	//验证码
	$("#yzm").html(yzm());
	$("#box-exchange").click(function(){
		$("#yzm").html(yzm());
	})
	var flagYanzs=null;
	$("#uyzm").blur(function(){
		if( $("#uyzm").val() ===$("#yzm").html() ){
			$("#s3").css("display","none");
			flagYanzs=true;
		}else{
			$("#s3").css("display","block");
			$("#s3").html(`<i class="iconfont">&#xe667;</i>验证码不一致`);
			flagYanzs=false;
		}		
	})
	$("form").submit(function(){
		if(flagTel&&flagPwd&&flagYanzs){
			//存cookie
			var uname = $("#uname").val();
			var pwd = $("#upwd").val();
			
			cookieObj[uname] = pwd;
			cookieStr = convertObjToCookieStr(cookieObj);
			createCookie('registorUser',cookieStr,7);
			return true;
		}else{
			alert("注册不合法");
			return false;
		}
	})
	//将cookie字符串转为对象
	function convertCookieStrToObj(str){
		if(!str){
			return {};
		}
		var arr = str.split(',');
		console.log(arr);
		var obj = {};
		for(var i = 0;i < arr.length;i ++){
			var list = arr[i].split(':');
			obj[list[0]] = list[1];
		}
		return obj;
	}
	//将对象转为cookie字符串
	function convertObjToCookieStr(obj){
		var str = '';
		for(var i in obj){
			var pwd = obj[i];
			if(str){
				str += ',';
			}
			str += i + ':' + pwd;
		}
		return str;
	}
})()