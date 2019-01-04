//banner
$(function(){
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
})
//HOT必买爆品
$(function(){
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
})
//BRAND 全球品牌划过
$(function(){
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
})
//购物车 fixed
$(function(){
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
})


//二级菜单显示隐藏
$(function(){
	$("#article-commodity-span").mouseenter(function(){
		$("#article-commodity-ul").css("display","block");
	}).mouseleave(function(){
		$("#article-commodity-ul").css("display","none");
	})
	$("#article-commodity-ul").mouseenter(function(){
		$("#article-commodity-ul").css("display","block");
	}).mouseleave(function(){
		$("#article-commodity-ul").css("display","none");
	})
})

//新品首发
$(function(){
	$.getJSON("json/data1.json?id="+new Date().getTime(), function(arr){
		var conStr = "";
		for(var i=0 ; i<arr[0].length ; i++){
			var pro=arr[0][i];
			conStr += `<li>
						<div class="newNav-img1">
							<img src="img/${pro.src1}" alt="" />
						</div>
						<div class="newNav-img2">
							<a href="${pro.a}">
								<img src="img/${pro.src2}" alt="" />
							</a>
						</div>
						<p>
							<a href="">${pro.name}</a>
						</p>
						<div class="newPicre">
							<em>￥</em><span>${pro.money}</span>
							<del>${pro.price}</del>
						</div>
					</li>`;
		}
		$(".newNav-ul").html(conStr);
		var index = 0 ;
		$("#newr").click(function(){
			index++;
			if(index===3){
				index=0
			}
			var $newNavwidth = (-$(".newNav").width()-1)*index;
			$(".newNav-ul").animate({ left : $newNavwidth },100);
		})
		$("#newl").click(function(){
			index--;
			if(index===-1){
				index=2
			}
			var $newNavwidth = (-$(".newNav").width()-1)*index;
			$(".newNav-ul").animate({ left : $newNavwidth },100);
		})
	})
})

//热销爆款
$(function(){
	$.getJSON("json/data1.json?id="+new Date().getTime(), function(arr){
		var conStr = "";
		for(var i=0 ; i<arr[1].length ; i++){
			var pro=arr[1][i];
			conStr += `<li>
						<div class="faddish-div">
							<a href="">
								<img src="img/${pro.src}" alt="" />
							</a>
							<p>
								<a href="">${pro.name}</a>
							</p>
							<div class="faddish-picre">
								<em>￥</em><span>${pro.money}</span>
								<del>${pro.price}</del>
							</div>
							<div class="faddish-shopping">
								加入购物车
							</div>
						</div>
					</li>`;
		}
		$(".nav-list1").html(conStr);	
		$(".nav-list1 li").mouseenter(function(){
			$(this).find(".faddish-div").stop().animate({'position': 'absolute','height' : 425},300,function(){
				$(this).find(".faddish-shopping").css({'display':'block','z-index':10});
			});
		}).mouseleave(function(){
			$(this).find(".faddish-shopping").css({'display':'none','z-index':''});
			$(this).find(".faddish-div").stop().animate({'position': '','height' : 372},100,function(){});
		})
	})
})
//婴幼儿奶粉
$(function(){
	$.getJSON("json/data1.json?id="+new Date().getTime(), function(arr){
		var conStr = "";
		for(var i=0 ; i<arr[2].length ; i++){
			var pro=arr[2][i];
			conStr += `<li>
						<div class="faddish-div">
							<a href="">
								<img src="img/${pro.src}" alt="" />
							</a>
							<p>
								<a href="">${pro.name}</a>
							</p>
							<div class="faddish-picre">
								<em>￥</em><span>${pro.money}</span>
								<del>${pro.price}</del>
							</div>
							<div class="faddish-shopping">
								加入购物车
							</div>
						</div>
					</li>`;
		}
		$(".nav-list2").html(conStr);	
		$(".nav-list2 li").mouseenter(function(){
			$(this).find(".faddish-div").stop().animate({'position': 'absolute','height' : 425},300,function(){
				$(this).find(".faddish-shopping").css({'display':'block','z-index':10});
			});
		}).mouseleave(function(){
			$(this).find(".faddish-shopping").css({'display':'none','z-index':''});
			$(this).find(".faddish-div").stop().animate({'position': '','height' : 372},100,function(){});
		})
	})
})
//纸尿裤
$(function(){
	$.getJSON("json/data1.json?id="+new Date().getTime(), function(arr){
		var conStr = "";
		for(var i=0 ; i<arr[3].length ; i++){
			var pro=arr[3][i];
			conStr += `<li>
						<div class="faddish-div">
							<a href="">
								<img src="img/${pro.src}" alt="" />
							</a>
							<p>
								<a href="">${pro.name}</a>
							</p>
							<div class="faddish-picre">
								<em>￥</em><span>${pro.money}</span>
								<del>${pro.price}</del>
							</div>
							<div class="faddish-shopping">
								加入购物车
							</div>
						</div>
					</li>`;
		}
		$(".nav-list3").html(conStr);	
		$(".nav-list3 li").mouseenter(function(){
			$(this).find(".faddish-div").stop().animate({'position': 'absolute','height' : 425},300,function(){
				$(this).find(".faddish-shopping").css({'display':'block','z-index':10});
			});
		}).mouseleave(function(){
			$(this).find(".faddish-shopping").css({'display':'none','z-index':''});
			$(this).find(".faddish-div").stop().animate({'position': '','height' : 372},100,function(){});
		})
	})
})
//营养辅食
$(".nav-list4 li").mouseenter(function(){
	$(this).find(".faddish-div").stop().animate({'position': 'absolute','height' : 425},300,function(){
		$(this).find(".faddish-shopping").css({'display':'block','z-index':10});
	});
}).mouseleave(function(){
	$(this).find(".faddish-shopping").css({'display':'none','z-index':''});
	$(this).find(".faddish-div").stop().animate({'position': '','height' : 372},100,function(){});
})
//清洁洗护
$(function(){
	$.getJSON("json/data1.json?id="+new Date().getTime(), function(arr){
		var conStr = "";
		for(var i=0 ; i<arr[4].length ; i++){
			var pro=arr[4][i];
			conStr += `<li>
						<div class="faddish-div">
							<a href="">
								<img src="img/${pro.src}" alt="" />
							</a>
							<p>
								<a href="">${pro.name}</a>
							</p>
							<div class="faddish-picre">
								<em>￥</em><span>${pro.money}</span>
								<del>${pro.price}</del>
							</div>
							<div class="faddish-shopping">
								加入购物车
							</div>
						</div>
					</li>`;
		}
		$(".nav-list5").html(conStr);	
		$(".nav-list5 li").mouseenter(function(){
			$(this).find(".faddish-div").stop().animate({'position': 'absolute','height' : 425},300,function(){
				$(this).find(".faddish-shopping").css({'display':'block','z-index':10});
			});
		}).mouseleave(function(){
			$(this).find(".faddish-shopping").css({'display':'none','z-index':''});
			$(this).find(".faddish-div").stop().animate({'position': '','height' : 372},100,function(){});
		})
	})
})
//喂养餐具
$(function(){
	$.getJSON("json/data1.json?id="+new Date().getTime(), function(arr){
		var conStr = "";
		for(var i=0 ; i<arr[5].length ; i++){
			var pro=arr[5][i];
			conStr += `<li>
						<div class="faddish-div">
							<a href="">
								<img src="img/${pro.src}" alt="" />
							</a>
							<p>
								<a href="">${pro.name}</a>
							</p>
							<div class="faddish-picre">
								<em>￥</em><span>${pro.money}</span>
								<del>${pro.price}</del>
							</div>
							<div class="faddish-shopping">
								加入购物车
							</div>
						</div>
					</li>`;
		}
		$(".nav-list6").html(conStr);	
		$(".nav-list6 li").mouseenter(function(){
			$(this).find(".faddish-div").stop().animate({'position': 'absolute','height' : 425},300,function(){
				$(this).find(".faddish-shopping").css({'display':'block','z-index':10});
			});
		}).mouseleave(function(){
			$(this).find(".faddish-shopping").css({'display':'none','z-index':''});
			$(this).find(".faddish-div").stop().animate({'position': '','height' : 372},100,function(){});
		})
	})
})
//玩具出行
$(function(){
	$.getJSON("json/data1.json?id="+new Date().getTime(), function(arr){
		var conStr = "";
		for(var i=0 ; i<arr[6].length ; i++){
			var pro=arr[6][i];
			conStr += `<li>
						<div class="faddish-div">
							<a href="">
								<img src="img/${pro.src}" alt="" />
							</a>
							<p>
								<a href="">${pro.name}</a>
							</p>
							<div class="faddish-picre">
								<em>￥</em><span>${pro.money}</span>
								<del>${pro.price}</del>
							</div>
							<div class="faddish-shopping">
								加入购物车
							</div>
						</div>
					</li>`;
		}
		$(".nav-list7").html(conStr);	
		$(".nav-list7 li").mouseenter(function(){
			$(this).find(".faddish-div").stop().animate({'position': 'absolute','height' : 425},300,function(){
				$(this).find(".faddish-shopping").css({'display':'block','z-index':10});
			});
		}).mouseleave(function(){
			$(this).find(".faddish-shopping").css({'display':'none','z-index':''});
			$(this).find(".faddish-div").stop().animate({'position': '','height' : 372},100,function(){});
		})
	})
})
//妈妈专区
$(function(){
	$.getJSON("json/data1.json?id="+new Date().getTime(), function(arr){
		var conStr = "";
		for(var i=0 ; i<arr[7].length ; i++){
			var pro=arr[7][i];
			conStr += `<li>
						<div class="faddish-div">
							<a href="">
								<img src="img/${pro.src}" alt="" />
							</a>
							<p>
								<a href="">${pro.name}</a>
							</p>
							<div class="faddish-picre">
								<em>￥</em><span>${pro.money}</span>
								<del>${pro.price}</del>
							</div>
							<div class="faddish-shopping">
								加入购物车
							</div>
						</div>
					</li>`;
		}
		$(".nav-list8").html(conStr);	
		$(".nav-list8 li").mouseenter(function(){
			$(this).find(".faddish-div").stop().animate({'position': 'absolute','height' : 425},300,function(){
				$(this).find(".faddish-shopping").css({'display':'block','z-index':10});
			});
		}).mouseleave(function(){
			$(this).find(".faddish-shopping").css({'display':'none','z-index':''});
			$(this).find(".faddish-div").stop().animate({'position': '','height' : 372},100,function(){});
		})
	})
})
//楼梯
$(function(){
	var $H = $(".louti-top").offset().top - 20;
	$(window).scroll(function(){
		var $top = $(document).scrollTop();
		console.log($top)
		if($top>$H){
			$("#lou-ti-nav").css('display','block');
		}else{
			$("#lou-ti-nav").css('display','none');
		}
		if($top>16550){
			var $tLeft = $("#lou-ti-nav").offset().left,
				$ttop = $("#lou-ti-nav").offset().top;
			$("#lou-ti-nav").css({'position':'absolute','top':$ttop,'left':$tLeft});
		}else{
			$("#lou-ti-nav").css({'position':'fixed','top':'','left':''});
		}
	})
	var $olist = $("#lou-ti-nav li");
	$olist.click(function(){
		var $newProduct = $(".newProduct");
		var $otop = $newProduct.eq($(this).index()).offset().top;
		$("html,body").animate({'scrollTop':$otop},1000);
	})
})
