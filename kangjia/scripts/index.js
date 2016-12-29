$(function(){
	//console.log(1) csww
	/*   微信的移入移出   */
	new WX('#wx','#ewm');
	/*   登录注册的移入移出   */
	new DLZC('.dLzc','.dlzc');
	/*   头部其他部分的移入移出   */
	new DH();
	/*   搜索框焦点事件   */
	new SouSuo();
	/*   轮播图   */
	new LunBo();
	/*   轮播图右边列表页移入移出事件   */
	new Banner_list();
	/*      商品轮播     */
	new Sp_lunbo();
	/*      新闻内容轮播     */
	new New_lunbo();
	/*      footer部分的移入移出     */
	new Footer_weixin();
	/*  侧边栏  */
	new Ceb();
	/*      购物车的移入移出     */
	new Gwc();
	/*  用户账号的显示与清除  */
	new Yh()
})
/*   微信的移入移出   */
function WX(id_a,id_b){
	this.$wx = $(id_a);
	this.$ewm = $(id_b);
	var that = this;
	this.$wx.on('mouseenter',function(){
		that.fn_enter()
	})
	this.$wx.on('mouseleave',function(){
		that.fn_leave()
	})
}
WX.prototype.fn_enter = function(){
	this.$ewm.stop().slideDown();
}
WX.prototype.fn_leave = function(){
	this.$ewm.stop().slideUp();
}
/*   登录注册的移入移出   */
function DLZC(id_a,id_b){
	this.$dLzc = $(id_a);
	this.$dlzc = $(id_b);
	var that = this;
	this.$dLzc.on('mouseenter',function(){
		that.fn_enter()
	})
	this.$dLzc.on('mouseleave',function(){
		that.fn_leave()
	})
}
DLZC.prototype.fn_enter = function(){
	this.$dlzc.stop().fadeIn();
}
DLZC.prototype.fn_leave = function(){
	this.$dlzc.stop().fadeOut();
}
/*   头部其他部分的移入移出   */
function DH(){
	this.$aA = $('.dLzc').nextAll().find('a');
	//console.log(this.$aA)  csww
	var that = this;
	this.$aA.on('mouseenter',function(){
		$(this).css('color','#fff')
	})
	this.$aA.on('mouseleave',function(){
		$(this).css('color','#bbb')
	})
}
/*   搜索框焦点事件   */
function SouSuo(){
	$('.ss_put').on('focus',function(){
		$('.ds').css('display','none')
	})
	$('.ss_put').on('blur',function(){
		$('.ds').css('display','block')
	})
}
/*   轮播图效果   */
function LunBo(){
	this.$b_l = $('#banner_l');
	this.$b_r = $('#banner_r');
	this.$aI = $('#banner_b').find('i');
	//console.log(this.$aI)  获取到i
	this.$aLi = $('.banner').find('li');
	this.$b_z = $('#b_z');
	this.index = 0;
	//console.log(this.$aLi)  获取到li
	var that = this
	/*   轮播图左右按键事件  */
	this.$b_r.on('click',function(){
		that.fn_click_r();
	})
	this.$b_l.on('click',function(){
		that.fn_click_l();
	})
	this.$b_r.on('mouseover',function(){
		that.$b_r.addClass('b_r');
	})
	this.$b_r.on('mouseout',function(){
		that.$b_r.removeClass('b_r');
	})
	this.$b_l.on('mouseover',function(){
		that.$b_l.addClass('b_l');
	})
	this.$b_l.on('mouseout',function(){
		that.$b_l.removeClass('b_l');
	})
	/*   轮播图下面按钮移入移出事件  */
	for(var i = 0 ;i < this.$aI.length;i++){
		this.$aI.eq(i).get(0).index = i;
		this.$aI.on('mouseover',function(){
			//console.log(this.index)  成功获取下标
			that.$aLi.eq(this.index).stop().fadeIn().siblings().fadeOut();
			that.$aI.eq(this.index).addClass('i_a').siblings().removeClass();
		})
	}
	/*   轮播图定时器   */ 
	this.timer = setInterval(function(){
		that.fn_click_r();
	},2000)
	this.$b_z.on('mouseenter',function(){
		clearInterval(that.timer)
	})
	this.$b_z.on('mouseleave',function(){
		clearInterval(that.timer)
		that.timer = setInterval(function(){
			that.fn_click_r();
		},2000)
	})
}
/*   轮播图原型对象   */
LunBo.prototype.fn_click_r = function(){
	if(this.index < this.$aLi.length-1){
		this.index++;
	}else{
		this.index = 0;
	}
	//console.log(this.index)  csww
	this.$aLi.eq(this.index).stop().fadeIn().siblings().fadeOut();
	this.$aI.eq(this.index).addClass('i_a').siblings().removeClass();
}
LunBo.prototype.fn_click_l = function(){
	if(this.index > 0){
		this.index--;
	}else{
		this.index = this.$aLi.length-1;
	}
	//console.log(this.index)  csww
	this.$aLi.eq(this.index).stop().fadeIn().siblings().fadeOut();
	this.$aI.eq(this.index).addClass('i_a').siblings().removeClass();
}
/*   轮播图右边列表页移入移出事件   */
function Banner_list(){
	this.$aLi = $('#banner_lt').find('li');
	var taht = this;
	//console.log(this.$aLi)  可以获取li
	this.$aLi.on('mouseenter',function(){
		$(this).addClass('red');
		$(this).find('.banner_list_r').show();
	})
	this.$aLi.on('mouseleave',function(){
		$(this).removeClass('red');
		$(this).find('.banner_list_r').hide();
	})
}
/*      商品轮播     */
function Sp_lunbo(){
	this.$sp_lb_l = $('.sp_lunbo').find('.lb_r_left');
	this.$sp_lb_r = $('.sp_lunbo').find('.lb_r_right');
	this.index = 0;
	var that = this;
	this.$sp_lb_l.on('click',function(){
		if(that.index == 1){
			that.index--;
		}else{
			return 0;
		}
		$('.sp_lb_bot').find('ul').stop().animate({
				marginLeft:-that.index*1200
			})
	})
	this.$sp_lb_r.on('click',function(){
		if(that.index == 0){
			that.index++;
		}else{
			return 0;
		}
		$('.sp_lb_bot').find('ul').stop().animate({
				marginLeft:-that.index*1200
			})
	})
	$('.sp_lb_right').on('mouseenter',function(){
		clearInterval(that.timer)
	})
	$('.sp_lb_right').on('mouseleave',function(){
			clearInterval(that.timer)
			this.timer = setInterval(function(){
			if(that.index == 0){
				that.index++;
			}else{
				that.index--
			}
			$('.sp_lb_bot').find('ul').stop().animate({
					marginLeft:-that.index*1200
				})
		},5000)
	})
	this.timer = setInterval(function(){
		if(that.index == 0){
			that.index++;
		}else{
			that.index--
		}
		$('.sp_lb_bot').find('ul').stop().animate({
				marginLeft:-that.index*1200
			})
	},5000)
}
/*      新闻内容轮播     */
function New_lunbo(){
	this.$new = $('.news_bottom_right');
	this.$left = $('.prev');
	this.$right = $('.next');
	this.aLi = this.$new.find('li');
	var that = this;
	//console.log(this.aLi)  csww
	this.index = 0;
	this.$right.on('click',function(){
		that.fn_click_r();
	})
	this.$left.on('click',function(){
		that.fn_click_l();
	})
	this.$new.on('mouseenter',function(){
		clearInterval(that.timer)
	})
	this.$new.on('mouseleave',function(){
		clearInterval(that.timer)
		that.timer = setInterval(function(){
			that.fn_click_r();
		},2000)
	})
	this.timer = setInterval(function(){
		that.fn_click_r();
	},2000)
}
/*      新闻内容轮播原型对象     */
New_lunbo.prototype.fn_click_r = function(){
	var that = this;
	if(this.index < this.aLi.length-1){
			this.index++;
		}else{
			this.$new.find('ul').css('marginLeft','0')
			this.index = 1
		}
		this.$new.find('ul').stop().animate({
					marginLeft:-that.index*460
			})
}
New_lunbo.prototype.fn_click_l = function(){
	var that = this;
	if(this.index > 0){
			this.index--;
		}else{
			this.$new.find('ul').css('marginLeft','-920px')
			this.index =1;
		}
		this.$new.find('ul').stop().animate({
					marginLeft:-that.index*460
			})
}
/*      footer部分的移入移出     */
function Footer_weixin(){
	$('.footer_top_jS').on('mouseenter',function(){
		$(this).find('.footer_ewm').stop().fadeIn();
	})
	$('.footer_top_jS').on('mouseleave',function(){
		$(this).find('.footer_ewm').stop().fadeOut();
	})
}
 /*  侧边栏 返回顶部等  */
function Ceb(){
	this.$share = $('#acd_share');
	this.$ap = this.$share.find('p');
	this.$wx = $('#wxfw');
	this.$wx_fu = $('#wx_fu');
	this.$fh = $('#fanhui');         
	var that = this;
	var clas_a;
	//console.log(this.$ap)  csww
	this.$ap.on('mouseenter',function(){
		clas = $(this).attr('class');
		//console.log(clas)  csww
		$(this).removeClass().addClass('acdhover')
		$(this).html($(this).attr('title'))
	})
	this.$ap.on('mouseleave',function(){
		//console.log(clas)  csww
		$(this).removeClass('acdhover').addClass(clas)
		$(this).html('')
	})
	this.$wx.on('mouseenter',function(){
		that.$wx_fu.stop().fadeIn();
	})
	this.$wx.on('mouseleave',function(){
		that.$wx_fu.stop().fadeOut();
	})
	this.$fh.on('click',function(){
		$(document).scrollTop(0)
	})
}
 /*  购物车  */
function Gwc(){
	$('#gwc_La').on('mouseenter',function(){
		$(this).find('.gwc_la').css('display','block')
	})
	$('#gwc_La').on('mouseleave',function(){
		$(this).find('.gwc_la').css('display','none')
	})
	sc_car();
	sc_msg();
	 /*  购物车商品数量  */
	function sc_car(){
        var sc_str = $.cookie('goods');
            if(sc_str){
                var sc_obj = eval(sc_str);
                var sc_num = 0 ; 
                for(var i in sc_obj){
                    sc_num += Number(sc_obj[i].num);
                }
                $('#gwc_La').find('b').html(sc_num);
            }
       }
        /*  购物车数据获取  */
       function sc_msg(){
            $.ajax({
                url:'data/sp_list.json',
                type:'GET',
                success:function(res){
                    var sc_str = $.cookie('goods');
                    if(sc_str){
                        var sc_obj = eval(sc_str);
                        var sc_num = 0 ;
                        var html = ''; 
                        for(var i in sc_obj){                   
                            html += '<li><div class="gw_img"><img src="'+res[sc_obj[i].id].img+'"></div><div class="gw_mz">'+res[sc_obj[i].id].name+'</div><div class="gw_jg"><span>￥'+res[sc_obj[i].id].jg+'~'+sc_obj[i].num+'</span><a id="'+res[sc_obj[i].id].id+'" class="AAA" href="##">移除</a></div>'
                        }
                        $('#gwc_LA').html(html);
                        sp_X_yc(sc_obj);
                        sp_gw_zjg(sc_obj,res);
                        sp_tz_xq();
                        k_gwc();
                    }
                }
            })
        }
         /*  点击图片跳转到详情页  */
        function sp_tz_xq(){
            $('.gw_img').on('click',function(){
                var id = $(this).nextAll('.gw_jg').find('a').attr('id');
                console.log(id)
                $.cookie('id',id)
                window.location.href='html/sp_xqing.html'
            })
        }

         /*  判断购物车为空  */
        k_gwc();
        function k_gwc(){
            //console.log(1)
            //console.log($('sp_g-zjg').html())
            if($('.sp_g-zjg').html()==''){
                $('.sp_g-zjg').html('<span style="color: #ff0000;">购物车为空</span>')
            }
        }

         /*  购物车商品总价格  */
        function sp_gw_zjg(sc_obj,res){
        	var sum = 0;
            for(var i in sc_obj){
                //console.log(sc_obj[i].num)
                sum+=parseInt(res[sc_obj[i].id].jg)*sc_obj[i].num;
                //console.log(sum)
            }
            $('.sp_g-zjg').html('<span>商品总价格：</span><span class="zjg_sty">￥'+sum+'</sapn>')
            if(sc_obj.length == 0){
                     $('.sp_g-zjg').html('');
                }
        }

         /*  购物车商品移除  */
        function sp_X_yc(sc_obj){
        	//console.log(1)
			//console.log(sc_obj[0].id)
			$('#gwc_LA').find('.AAA').on('click',function(){
				var id = parseInt(this.id);
				//console.log(id)  
				//console.log(sc_obj)
				//console.log(id)
				for(var i in sc_obj){
					if(sc_obj[i].id == id){
						sc_obj.splice(i,1) 	
					}
				}
				var cookieStr = JSON.stringify(sc_obj);
                $.cookie('goods',cookieStr,{path:'/'});
                //console.log(sc_obj.length)
				//console.log(sc_obj)
				sc_msg();
			}) 
			sc_car();
			if(sc_obj.length == 0){
               		//console.log(1)
               		$.cookie('goods',null,{path:'/'});
               		$('#gwc_LA').html('');
               	}
		}
}
 /*  显示用户登录后的账号  */
function Yh(){
	var yh = $.cookie('name');
	//console.log(yh)
	 /*  判断当前是否有账号  */
	if(yh){
		$('.dl_yhm').append('<span>用户'+yh+'</span>')
	}
	
	$('.dl_yhm').on('mouseenter',function(){
		//console.log(1)
		if(yh){
			$('.yh-tc').css('display','block')
		}else{
			$('.yh-tc').css('display','none')
		}
		
	})
	$('.dl_yhm').on('mouseleave',function(){
		//console.log(1)
			$('.yh-tc').css('display','none')
	})
	 /*  点击退出清除账号  */
	$('#btn-a').on('click',function(){
		$.cookie('name',null,{path:'/'});
		window.location.reload(true);
	})
}






