$(function(){
    /*  购物车  */
	new GWC()
})
function GWC(){
	sc_car();
	sc_msg();
	sp_big();
     /*  商品总数量  */
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
        /*  小购物车  */
       function sc_msg(){
            $.ajax({
                url:'../data/sp_list.json',
                type:'GET',
                success:function(res){
                    var sc_str = $.cookie('goods');
                    //console.log(sc_str)
                    if(sc_str){
                        var sc_obj = eval(sc_str);
                        //console.log(1)
                        //console.log(sc_obj)
                        var sc_num = 0 ;
                        var html = ''; 
                        for(var i in sc_obj){                   
                            html += '<li><div class="gw_img"><img src="../'+res[sc_obj[i].id].img+'"></div><div class="gw_mz">'+res[sc_obj[i].id].name+'</div><div class="gw_jg"><span>￥'+res[sc_obj[i].id].jg+'~'+sc_obj[i].num+'</span><a id="'+res[sc_obj[i].id].id+'" class="AAA" href="##">移除</a></div>'
                        }
                        $('#gwc_LA').html(html);
                        sp_X_yc(sc_obj)
                        sp_gw_zjg(sc_obj,res);
                    }
                }
            })
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
                $('.sp_g-zjg').html('')
            }
        }
         /*  购物车商品获取以及生成列表  */
		function sp_big(){
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
                            html += '<li><div class="gwc_sp_img"><img src="../'+res[sc_obj[i].id].img+'"></div><div class="gwc_sp_mz">'+res[sc_obj[i].id].name+'</div><div class="gwc_sp_jg">￥'+res[sc_obj[i].id].jg+'</div><div class="gwc_sp_sl"><a class="a1 sl-j" href="##">-</a><input type="text" value="'+sc_obj[i].num+'"><a class="sl-ja" href="##">+</a></div><div class="gwc_sp_xj">￥'+parseInt(res[sc_obj[i].id].jg)*sc_obj[i].num+'.00</div><div class="gwc_sp_cz"><a id="'+res[sc_obj[i].id].id+'" class="sp_big_yc" href="##">移除</a></div></li><div style="clear: both;"></div>'
                        }
                        $('#gwc_sp_big').html(html);
                        sp_big_yc(sc_obj);
                        sp_zjg(sc_obj,res);
                        tz_xqy();
                        sp_sl_jj(sc_obj);
                        k_gwc();
                    }
                }
            })
            //console.log(1) 
		}
         /*  判断购物车为空  */
        k_gwc();
        function k_gwc(){
            //console.log(1)
            //console.log($('sp_g-zjg').html())
            if($('.sp-zjg').html()==''){
                $('.sp-zjg').html('<span style="color: #ff0000;">购物车为空</span>')
                $('.sp_g-zjg').html('<span style="color: #ff0000;">购物车为空</span>')
            }
        }
         /*  购物车每件商品的数量通过加减号操作  */
        function sp_sl_jj(sc_obj){
            $('.sl-ja').on('click',function(){
                var id = $(this).parent().nextAll('.gwc_sp_cz').find('a').attr('id')
                //console.log(id)
                //console.log(sc_obj[0].num)
                for(var i in sc_obj){
                    if(sc_obj[i].id == id){
                        sc_obj[i].num+=1;  
                    }
                }
                var cookieStr = JSON.stringify(sc_obj);
                $.cookie('goods',cookieStr,{path:'/'});
                sp_big();
                sc_msg(); 
            })

            $('.sl-j').on('click',function(){
                //console.log(1)
                var id = $(this).parent().nextAll('.gwc_sp_cz').find('a').attr('id')
                //console.log(id)
                //console.log(sc_obj[0].num)
                for(var i in sc_obj){
                    if(sc_obj[i].id == id){
                        if(sc_obj[i].num <= 1){
                            break;
                        }
                        sc_obj[i].num = sc_obj[i].num-1;  
                    }
                }
                var cookieStr = JSON.stringify(sc_obj);
                $.cookie('goods',cookieStr,{path:'/'});
                sp_big();
                sc_msg(); 
            })
            sc_car();
        }
         /*  购物车商品总价格及结算按钮  */
        function sp_zjg(sc_obj,res){
            var sum = 0;
            for(var i in sc_obj){
                //console.log(sc_obj[i].num)
                sum+=parseInt(res[sc_obj[i].id].jg)*sc_obj[i].num;
                //console.log(sum)
            }
            $('.sp-zjg').html('<span>商品总价格：￥</span>'+sum)
            $('.sp-qjs').html('<button>下单结算</button>')
            if(sc_obj.length == 0){
                    $('.sp-zjg').html('');
                    $('.sp-qjs').html('')
                }
            Sp_tz();
        }
         /*  购物车跳转到结算页  */
        function Sp_tz(){
            $('.sp-qjs').find('button').on('click',function(){
                $.cookie('tz',2,{path:'/'})
            window.location.href='jS.html';
        })
        }
         /*  购物车跳转到详情页  */
        function tz_xqy(){
            $('.gwc_sp_img').on('click',function(){
                var id = $(this).nextAll('.gwc_sp_cz').find('a').attr('id');
                //console.log($(this).nextAll('.gwc_sp_cz').find('a').attr('id'))
                $.cookie('id',id)
                window.location.href='sp_xqing.html'
            })
        }


        /*     商品移除     */
		function sp_big_yc(sc_obj){
			//console.log(sc_obj[0].id)
			$('#gwc_sp_big').find('.sp_big_yc').on('click',function(){
				var id = parseInt(this.id);
				//console.log(id)  csww
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
				sp_big();

			}) 
			sc_msg();
			sc_car();
			if(sc_obj.length == 0){
               		//console.log(1)
               		$.cookie('goods',null,{path:'/'});
               		 $('#gwc_LA').html('');
                     $('.sp-zjg').html('');
                     $('.sp_g-zjg').html('');
               	}
            //k_gwc();    
		}
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
                sp_big();
                sc_msg();
            })
            sc_car();
            if(sc_obj.length == 0){
                    //console.log(1)
                    $.cookie('goods',null,{path:'/'});
                    $('#gwc_LA').html('');
                    $('#gwc_sp_big').html('');
                    $('.sp-zjg').html('');
                    $('.sp_g-zjg').html('');
                }
        }
}





