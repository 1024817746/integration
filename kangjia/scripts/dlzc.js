$(function(){
	/*  注册  */
	new Zc();
	/*  登录   */
	new Delu();
})
function Zc(){
	this.$aput = $('#zhuce').find('li').find('input');
	this.$apa = $('#zhuce').find('li').find('.pa');
	this.$but = $('#zhuce').find('button')
	this.pd = false;
	//console.log(this.$but)  csww
	var that = this;
	//console.log(this.$apa)
	var atj = [0,0,0,0]
	//console.log(this.$aput)  csww
	//console.log(this.$aput.eq(3).nextAll('i'))  csww
	/*  验证码获取  */ 
	this.$aput.eq(3).nextAll('i').on('click',function(){
		var arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9']
		//console.log(arr.length)
		var a = arr[Math.round(Math.random()*35)] 
		var b = arr[Math.round(Math.random()*35)]
		var c = arr[Math.round(Math.random()*35)]
		var d = arr[Math.round(Math.random()*35)]
		$(this).prev().val(a+b+c+d)
	})
	this.$aput.eq(3).nextAll('i').triggerHandler('click')
	/*   密码强度   */
	this.$aput.eq(1).on('blur',function(){
		//console.log(1)
		var str_a = $(this).val()
		var l = str_a.length;
		if(l>=6&&l<=10){
			$('.qd_a').find('span').remove();
			$('.qd_a').append('<span style="color: #ff0000";>弱</span>')
			$('.qd_b').find('i').eq(0).css('background','#ff0000').siblings().css('background','#ddd')
		}else if(l>=10&&l<=15){
			$('.qd_a').find('span').remove();
			$('.qd_a').append('<span style="color: #ff9326";>中</span>')
			$('.qd_b').find('i').eq(1).css('background','#ff9326').siblings().css('background','#ddd')
		}else if(l>=15&&l<=20){
			$('.qd_a').find('span').remove();
			$('.qd_a').append('<span style="color: #00d900";>强</span>')
			$('.qd_b').find('i').eq(2).css('background','#00d900').siblings().css('background','#ddd')
		}
	})
	//this.$aput.eq(1).triggerHandler('focus')

	this.$but.on('click',function(){
		//console.log(1)
		/*    账号注册框验证    */
		that.$aput.eq(0).on('blur',function(){
		var str = $(this).val();
		//console.log(str);csww
		var reg=/\w{6,20}/i;
		if(reg.test(str)){
			that.$apa.eq(0).css('display','none');
			atj[0] = 1;
		}else{
			that.$apa.eq(0).css('display','block');
			atj[0] = 0;
		}
	})
	that.$aput.eq(0).triggerHandler('blur')
	/*    密码框验证   */
	that.$aput.eq(1).on('blur',function(){
		var str = $(this).val();
		//console.log(str);csww
		var reg=/\w{6,20}/i;
		if(reg.test(str)){
			that.$apa.eq(1).css('display','none');
			atj[1] = 1;
		}else{
			that.$apa.eq(1).css('display','block');
			atj[1] = 0;
		}
	})
	that.$aput.eq(1).triggerHandler('blur')
	/*  确认密码验证  */
	that.$aput.eq(2).on('blur',function(){
		var stra = $(this).val();
		var strb = $(this).parents('li').prev().find('input').val(); 
		//console.log(strb) csww
		if(stra == strb){
			that.$apa.eq(2).css('display','none');
			atj[2] = 1;
		}else{
			that.$apa.eq(2).css('display','block');
			atj[2] = 0;
		}
	})
	that.$aput.eq(2).triggerHandler('blur')
	/*  验证码验证  */
	that.$aput.eq(3).on('blur',function(){
		var stra = $(this).val();
		var strb = $(this).next().val(); 
		//console.log(strb) csww
		if(stra == strb){
			that.$apa.eq(3).css('display','none');
			atj[3] = 1;
		}else{
			that.$apa.eq(3).css('display','block');
			atj[3] = 0;
		}
	})
	that.$aput.eq(3).triggerHandler('blur')
			if(atj[0] == 1&&atj[1] == 1&&atj[2] == 1&&atj[3] == 1){
				that.pd = true;
			}else{
				that.pd = false;
			}
			//console.log(that.pd)
			yh_zc(that.pd,that);
	})
	
}
/*  账号注册与跳转  */
function yh_zc(pd,that){
	//console.log(pd)
	if(pd){
				var userid = that.$aput.eq(0).val();
				var password = that.$aput.eq(1).val();
				$.ajax({
				url:'http://datainfo.duapp.com/shopdata/userinfo.php',
				data:{
					status:'register',
					userID:userid,
					password:password
					},
				type:'POST',
				success:function(res){
					switch(res){
							case '0':$('.yz_yz').html('该用户名已被使用');break;
							case '1':window.location.href='denglu.html';break;
							case '2':$('.yz_yz').html('数据库报错');break;
						}
				}

			})
		}else{
		 	$('.yz_yz').html('请合法注册')
		}
}


/*  登录  */
function Delu(){
	//console.log(1) csww
	this.$aput = $('#denglu').find('li').find('input');
	//console.log(this.$aput)
	this.$pb = $('#denglu').find('li').find('.pb');
	this.$but = $('#denglu').find('button')
	this.pd = false;
	var that = this
		/*  验证码获取  */
		this.$aput.eq(2).nextAll('i').on('click',function(){
			var arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9']
			//console.log(arr.length)
			var a = arr[Math.round(Math.random()*35)] 
			var b = arr[Math.round(Math.random()*35)]
			var c = arr[Math.round(Math.random()*35)]
			var d = arr[Math.round(Math.random()*35)]
			$(this).prev().val(a+b+c+d)
		})
		this.$aput.eq(2).nextAll('i').triggerHandler('click')
	$('.x_btn').on('click',function(){
		that.$aput.eq(2).on('blur',function(){
			var stra = $(this).val();
			var strb = $(this).next().val(); 
			//console.log(strb) csww
			if(stra == strb){
				that.$pb.css('display','none');
				that.pd = true;
			}else{
				that.$pb.css('display','block');
				that.pd = false;
			}
		})
		that.$aput.eq(2).triggerHandler('blur')
	//console.log(that.pd)  csww
	/*  登录成功与跳转  */
		if(that.$aput.eq(0).val()!=''&&that.$aput.eq(1).val()!=''&&that.pd){
			var userid = that.$aput.eq(0).val();
			var password = that.$aput.eq(1).val();
			$.ajax({
				url:'http://datainfo.duapp.com/shopdata/userinfo.php',
				data:{
					status:'login',
					userID:userid,
					password:password
				},
				type:'POST',
				success:function(res){
					//console.log(res)
					switch(res){

							case '0':$('.yz_dl').html('用户不存在');break;
							case '2':$('.yz_dl').html('密码不对');break;
							default:$.cookie('name',userid,{path:'/'}) 
							window.location.href='../index.html';break;
						}
				}

			})
		}else{
			$('.yz_dl').html('请合法输入')
		}
	
	})
}







