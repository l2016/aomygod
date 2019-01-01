//banner
function bannerPlay(){
	var timer=null,
		index=0,
		$uList=$("#banner ul li"),//大图
		$banLeft=$(".ban_left"),//角
		$banRight=$(".ban_right"),//角
		$oList=$("#banner ol li");//下圆
	timer = setInterval( autoPlay , 3000 );//定时器轮播
	function autoPlay(){
		index++;
		if( index==$oList.size() ){
			index=0;
		}
		$uList.eq(index).stop().fadeIn(1500).siblings().stop().fadeOut(1500);//淡入淡出轮播
		$oList.eq(index).addClass("ban_1").siblings().removeClass("ban_1");//下圆轮播
	}
	
	$oList.mouseenter(function(){//移入下圆
		clearInterval(timer);//鼠标移入停止定时器
		index=$(this).index()-1;//改变下标
		autoPlay();
	}).mouseleave(function(){
		timer=setInterval( autoPlay , 3000 );//移除启动定时器
	})
	//角点击
	$("#banner").mouseenter(function(){//移入移出角显示隐藏
		$(".ban_LR").show();
	}).mouseleave(function() {
		$(".ban_LR").hide();
	})
	$banLeft.click(function(){//角点击
		clearInterval(timer);//停止定时器
		index--;//下标
		if(index<0){
			index=$uList.length-1;
		}
		$uList.eq(index).fadeIn(1500).siblings().fadeOut(1500);//点击后淡入淡出
		$oList.eq(index).addClass("ban_1").siblings().removeClass("ban_1");//下圆轮播
		setTimeout((timer=setInterval( autoPlay , 3000 )),2000);//2秒后启动定时器
	})
	$banRight.click(function(){//角点击
		clearInterval(timer);
		index++;
		if(index>$uList.length-1){
			index=0;
		}
		$uList.eq(index).fadeIn(1500).siblings().fadeOut(1500);
		$oList.eq(index).addClass("ban_1").siblings().removeClass("ban_1");
		setTimeout((timer=setInterval( autoPlay , 3000 )),2000);
	})
}
bannerPlay();
//HOT必买爆品
function hotPlay(){
	$.ajax({
		type:"get",
		url:"json/data.json",
		async:true,
		success:function(arr){
			getData(arr);
			$(".sec-content-ul li").mouseenter(function(){
				$(".sec-content-l").eq($(this).index()).find("img").stop().animate({'width':'256px','height':'256px','top':'-11px','left':'-11px'},500);
			}).mouseleave(function(){
				$(".sec-content-l").eq($(this).index()).find("img").stop().animate({'width':'234px','height':'234px','top':0,'left':0},500);
			})
		}
	})
	function getData(arr){
		var conStr = "";
		for(var i=0 ; i<arr.length ; i++){
			var pro=arr[i];
			conStr += `<li>
					<div class="sec-content-l">
						<a href=""><img src="img/${pro.src}"/></a>
					</div>
					<div class="sec-content-r">
						<p><i style="background-position:${pro.style};"></i><span>澳大利亚品牌</span></p>
						<p>${pro.name}</p>
						<p>${pro.introduce}</p>
						<div class="sec-content-r-yis">
							<span>已售<b>${pro.sell}</b>件</span><b class="sec-content-r-jiao"></b>
						</div>
						<div class="sec-content-r-price">
							<span class="sec-r-price">${pro.money}</span>
							<del>${pro.price}</del>
							<a href="${pro.a}"><span class="sec-msq">马上抢</span></a>
						</div>
					</div>
				</li>`;
		}
		$(".sec-content-ul").html(conStr);
	}
}
hotPlay();
//BRAND 全球品牌划过
$("#sec-bra-r ul li").mouseenter(function(){
	$(this).addClass("sec-bra-r-li").siblings().removeClass();
	$("#sec-bra-r ol").eq($(this).index()).addClass("sec-bra-r-ol").siblings().removeClass();
})
$("#sec-bra-r ol li").mouseenter(function(){
	$(this).children("span").stop().animate({"opacity":"0.2"},500);
}).mouseleave(function(){
	$(this).children("span").stop().animate({"opacity":0},500);
})
//母婴用品 美妆 划过
$(".baby-l-img").mouseenter(function(){
	$(this).find("img").stop().animate({'width':'242px','height':'414px','top':'-19px','left':'-11px'},300);
}).mouseleave(function(){
	$(this).find("img").stop().animate({'width':'220px','height':'376px','top':'0','left':'0'},300);
})
$(".baby-r").mouseenter(function(){
	$(this).find("img").stop().animate({'width':'440px','height':'550px','top':'-25px','left':'-20px'},300);
}).mouseleave(function(){
	$(this).find("img").stop().animate({'width':'400px','height':'500px','top':'0','left':'0'},300);
})
$(".baby-c ul li").mouseenter(function(){
	$(this).find("img").stop().animate({'left':'40px'},300);
}).mouseleave(function(){
	$(this).find("img").stop().animate({'left':'50px'},300);
})
//购物车 fixed
$("#shopCart-cart").click(function(){
	var $left = $(this).parent().offset().left;
	if( parseInt($left+40) === $(window).width()){
		$(this).parent().animate({'right':'275'},500);
	}else{
		$(this).parent().animate({'right':'0'},500);
	}
	
})



$(".glyphicon-remove").click(function(){
	$(this).parent().parent().css('display','none');
})
$("#shopCart-top").click(function(){//返回头部
	$("html,body").animate({"scrollTop":0},1000);
})
//楼梯
function scrollPlay(){
	var $h=$(".sec-top").offset().top - 10,
		$aside=$("aside").offset().top - 450;
	$(window).scroll(function(){
		var $t=$(document).scrollTop();
		if($t>$h){
			$("#LoutiNav").css("display","block");
		}else{
			$("#LoutiNav").css("display","none")
		}
		if($t>$aside){
			var $left=$("#LoutiNav").offset().left,
				$top=$("#LoutiNav").offset().top;
			$("#LoutiNav").css({"position":"absolute","top":$top,"left":$left});
		}else{
			$("#LoutiNav").css({"position":"fixed","top":"","left":""});
		}
	})
	//点击
	var $ulist=$("#LoutiNav ul li:not(.lilast)");
	$ulist.click(function(){
		var $index=$(this).index();
		var $lout=$(".lout");
		var $ctop = $lout.eq($index).offset().top;
		$("html,body").animate({"scrollTop":$ctop},1000);
	})
}
scrollPlay();