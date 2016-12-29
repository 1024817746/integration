$(function(){
     /*  商品详情  */
	new sP_xq();
    new xQ_cs();
})
function sP_xq(){
     /*  获取商品id  */
	var id = parseInt($.cookie('id'));
	var a = 0;
	//console.log(id)
    /*  获取商品数据  */
	$.ajax({
		url:'../data/sp_xq.json',
        type:'GET',
        dataType:'json',
        success:function(data){
        	var html = '';
        	//console.log(data[0].id)
        	for(var i = 0 ;i < data.length; i ++){
        		if(data[i].id == id){
        			a=i;
        			html = '<div class="xq_img"><div class="img_big"><img src="../'+data[i].img1+'"><div class="img_big_zzc"></div><div class="img_big_top"></div></div><div class="img_fd"><img src="../'+data[i].img1+'"></div><div class="img_sma"><div class="sma"><img src="../'+data[i].img1+'"></div><div class="sma"><img src="../'+data[i].img2+'"></div></div></div><div class="xq_right"><div class="xq_r_top"><h2>'+data[i].name+'</h2><p>'+data[i].xn+'<span>'+data[i].hd+'</span></p></div><div calss="xq_r_bot"><div class="xq_bot_jg">价格：<span>￥'+data[i].jg+'</span></div></div><div class="xq_r_js"><p>货品编号：P584522AA02635<span>品牌： KKTV</span></p><p>观看距离：2米-2.5米<span>屏幕尺寸：40-43英寸</span></p><p>产品品类：4K电视<span>分辨率：超高清4K(3840*2160)</span></p></div><div class="xq_r_gm"><ul><li><p class="pa">数量：</p><p class="pb"><a id="sp-jh" href="##">-</a><input type="text" value="1"><a id="sp-jha" href="##">+</a><span>台</span></p></li><div style="clear: both;"></div><li><button class="btna">立即购买</button><button id="'+data[i].id+'" class="btnb" >加入购物车</button></li></ul></div></div>'
        		}
        	}
        	$('#xQ').html(html)
        	//console.log(a)
        	gwc_jr();
        	xq_fdj(data,a);
        	sp_xq_sl();
            sp_Gm();
        }
	})
     /*  跳转到结算页  */
    function sp_Gm(){
        $('.btna').on('click',function(){
            //console.log(1)
            var id = $(this).next().attr('id');
            var val = parseInt($('.xq_r_gm').find('input').val());
            //console.log(id)
            $.cookie('gm',id,{path:'/'})
            $.cookie('sl',val)
            $.cookie('tz',1,{path:'/'})
             window.location.href='jS.html'
        })
    }
     /*  商品数量  */
	function sp_xq_sl(){
		$('#sp-jh').on('click',function(){
			var val = parseInt($(this).next().val());
			if(val == 1){
				return 0;
			}else{
				val--
			}
			$(this).next().val(val)
		})
		$('#sp-jha').on('click',function(){
			var val = parseInt($(this).prev().val());
			
			val++
			
			$(this).prev().val(val)
		})
	}
     /*  加入购物车  */
	function gwc_jr(){
		$('#xQ').find('.btnb').on('click',function(){
			//console.log(this.id)
			var id = this.id;
                var first = $.cookie('goods')==null?true:false;
                var same = false;
                if(first){
                    $.cookie('goods','[{id:'+id+',num:1}]',{path:'/'});
                }else{
                    var str = $.cookie('goods');
                    //console.log(str)
                    var arr = eval(str);
                    //console.log(arr);
                    for(var attr in arr){
                        if(arr[attr].id == id){
                            arr[attr].num = arr[attr].num + 1;  
                            var cookieStr = JSON.stringify(arr);
                            $.cookie('goods',cookieStr,{path:'/'});
                            same = true;
                        }
                    }
                    if(!same){
                        var obj  = {id:id,num:1};
                        arr.push(obj);
                        var cookieStr = JSON.stringify(arr);
                        $.cookie('goods',cookieStr,{path:'/'});
                    }
                }
                sc_car();
                sc_msg();
		})
	}
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
    sc_msg();
     function sc_msg(){
            $.ajax({
                url:'../data/sp_list.json',
                type:'GET',
                success:function(res){
                    var sc_str = $.cookie('goods');
                    if(sc_str){
                        var sc_obj = eval(sc_str);
                        var sc_num = 0 ;
                        var html = ''; 
                        for(var i in sc_obj){                   
                            html += '<li><div class="gw_img"><img src="../'+res[sc_obj[i].id].img+'"></div><div class="gw_mz">'+res[sc_obj[i].id].name+'</div><div class="gw_jg"><span>￥'+res[sc_obj[i].id].jg+'~'+sc_obj[i].num+'</span><a id="'+res[sc_obj[i].id].id+'" class="AAA" href="##">移除</a></div>'
                        }
                        $('#gwc_LA').html(html);
                        sp_X_yc(sc_obj);
                        sp_gw_zjg(sc_obj,res);
                        k_gwc();
                    }
                }
            })
        }
         /*  购物车为空  */
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
        /*     移除商品    */
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
         /*  商品图片放大镜  */
        function xq_fdj(data,a){
        	$('.img_sma').find('.sma').eq(0).on('mouseenter',function(){
        		$(this).css('border-color','#ff0000').siblings().css('border-color','#999')
        		$('.img_big').find('img').remove();
        		$('.img_big').append('<img src="../'+data[a].img1+'">')
        		$('.img_fd').find('img').remove();
        		$('.img_fd').append('<img src="../'+data[a].img1+'">')
        	})
        	$('.img_sma').find('.sma').eq(1).on('mouseenter',function(){
        		$(this).css('border-color','#ff0000').siblings().css('border-color','#999')
        		$('.img_big').find('img').remove();
        		$('.img_big').append('<img src="../'+data[a].img2+'">')
        		$('.img_fd').find('img').remove();
        		$('.img_fd').append('<img src="../'+data[a].img2+'">')
        	})
            /*  商品移入小图片显示对应大图  */
	        $('.img_big').on('mouseenter',function(){
				$(this).find('.img_big_top').css('display','block')
				$('.img_fd').css('display','block')
			})
			$('.img_big').on('mouseleave',function(){
				$(this).find('.img_big_top').css('display','none')
				$('.img_fd').css('display','none')
			})
             /*  大图上小方块移动放大镜显示相应位置  */
			$('.img_big_zzc').on('mousemove',function(event){
				var evt = event||window.event;
				var w = $(this).next().innerWidth();
				//console.log(w)
				var left = evt.offsetX-w/2;
				if(left < 0){
					left = 0;
				}else if(left > $(this).innerWidth()-w){
					left = $(this).innerWidth()-w
				}
				$(this).next().css('left',left+'px')
				var h = $(this).next().innerHeight();
				var top = evt.offsetY-h/2;
				if(top < 0){
					top = 0;
				}else if(top > $(this).innerHeight()-h){
					top = $(this).innerHeight()-h
				}
				$(this).next().css('top',top+'px')
				var proportionX=left/($(this).innerWidth()-w);
				var proportionY=top/($(this).innerHeight()-h);
				//console.log($('.img_fd').find('img'))
				var big_left =  -proportionX*($('.img_fd').find('img').innerWidth() - $('.img_fd').innerWidth())+'px';
				var big_top =  -proportionY*($('.img_fd').find('img').innerHeight() - $('.img_fd').innerHeight())+'px';
				//console.log(big_top)
				$('.img_fd').find('img').css('left',big_left)
				$('.img_fd').find('img').css('top',big_top)

			})
		}

}
 /*  详情页对商品的详细介绍  */
function xQ_cs(){
    $('.sp-xq-top').find('span').eq(0).on('click',function(){
        $('.xq-tu').css('display','block');
        $('.xq-cs').css('display','none');
    })
     $('.sp-xq-top').find('span').eq(1).on('click',function(){
        $('.xq-tu').css('display','none');
        $('.xq-cs').css('display','block');
    })
}








