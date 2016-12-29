$(function(){
     /*  购物车商品计算  */
	new Js_sp();
})
function Js_sp(){
    var tz = $.cookie('tz')
    if(tz == 2){
         /*  如果是从购物车跳转获取结算信息  */
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
                        html += '<li><div class="gwc_sp_img"><img src="../'+res[sc_obj[i].id].img+'"></div><div class="gwc_sp_mz">'+res[sc_obj[i].id].name+'</div><div class="gwc_sp_jg">￥'+res[sc_obj[i].id].jg+'</div><div class="gwc_sp_sl">'+sc_obj[i].num+'</div><div class="gwc_sp_xj">￥'+parseInt(res[sc_obj[i].id].jg)*sc_obj[i].num+'.00</div><div style="clear: both;"></div>'
                    }
                    $('#gwc_sp_big').html(html);
                    sp_zjg(sc_obj,res);
                }
            }
        })
    }else if(tz == 1){
         /*  如果是从详情页跳转获取信息  */
         $.ajax({
            url:'../data/sp_list.json',
            type:'GET',
            success:function(res){
                var gm = $.cookie('gm');
                var sl = $.cookie('sl')
                    var sc_num = 0 ;
                    var html = '';                    
                    html = '<li><div class="gwc_sp_img"><img src="../'+res[gm].img+'"></div><div class="gwc_sp_mz">'+res[gm].name+'</div><div class="gwc_sp_jg">￥'+res[gm].jg+'</div><div class="gwc_sp_sl">'+sl+'</div><div class="gwc_sp_xj">￥'+parseInt(res[gm].jg)*sl+'.00</div><div style="clear: both;"></div>'
                    $('#gwc_sp_big').html(html);
                    sp_zjg_a(res,gm,sl);
            }
        })
    }
     /*  商品数量  */
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
                    }
                }
            })
        }
         /*  商品总价格  */
     function sp_zjg_a(res,gm,sl){
            var sum = 0;
                //console.log(sc_obj[i].num)
                sum=parseInt(res[gm].jg)*sl;
                //console.log(sum)
            $('.sp-zjg').html('<span>总金额：￥</span>'+sum)
        }
     function sp_zjg(sc_obj,res){
            var sum = 0;
            for(var i in sc_obj){
                //console.log(sc_obj[i].num)
                sum+=parseInt(res[sc_obj[i].id].jg)*sc_obj[i].num;
                //console.log(sum)
            }
            $('.sp-zjg').html('<span>总金额：￥</span>'+sum)
        }

    $('#but-a').on('click',function(){
        var aPut = $('.main-xx').find('input');
        var arr = [];
        for(var i = 0;i < aPut.length-1;i ++){
            arr.push(aPut.eq(i).val())
        }
        
        //console.log(aPut)
        if(arr[0]!=''&&arr[1]!=''&&arr[2]&&arr[3]!=''&&arr[5]!=''&&arr[6]!=''){
            $('.xx-jc').css('display','none')
            cunc(arr,aPut)
        }else{
            $('.xx-jc').css('display','block')
            return 0;
        }
       
    })
     /*  存储订单信息  */
    function cunc(arr){
        var cookieStr = JSON.stringify(arr);
        //console.log(arr)
        $.cookie('xx',cookieStr,{path:'/'})
        $('.main-xx').find('ul').css('display','none')
        $('.main-xx').find('.xx-a').css('display','block')
        $('.xx-a').html('<span>'+arr[0]+'</span><span>'+arr[1]+'</span><span>'+arr[2]+'</span><span>'+arr[3]+'</span><span>'+arr[4]+'</span><span>'+arr[5]+'</span><span>'+arr[6]+'</span><span>修改</span>')
        xx_xg();
    }
     /*  信息修改  */
    function xx_xg(){
        $('.xx-a').find('span').eq(7).on('click',function(){
            $.cookie('xx',null,{path:'/'})
            $('.main-xx').find('ul').css('display','block')
            $('.main-xx').find('.xx-a').css('display','none')
        })
    }
     /*  信息获取  */  
    xx_hq()  
    function xx_hq(){
        var arr = eval($.cookie('xx'))
        //console.log(arr==null)
        if(arr == null){
            $('.main-xx').find('ul').css('display','block')
            $('.main-xx').find('.xx-a').css('display','none')
        }else{
            $('.main-xx').find('ul').css('display','none')
            $('.main-xx').find('.xx-a').css('display','block')
            $('.xx-a').html('<span>'+arr[0]+'</span><span>'+arr[1]+'</span><span>'+arr[2]+'</span><span>'+arr[3]+'</span><span>'+arr[4]+'</span><span>'+arr[5]+'</span><span>'+arr[6]+'</span><span>修改</span>')
        }
        xx_xg();
    }
     /*  跳转付款页  */
    da_tj();
	function da_tj(){
        $('#but').on('click',function(){
            console.log(1)
            var arr = eval($.cookie('xx'))
            if(arr == null){
                $('.dd-tj').css('display','none')
                $('.xx-ts').css('display','block')
            }else{
                $('.xx-ts').css('display','none')
                $('.dd-tj').css('display','block')
                setTimeout(function(){
                    window.location.href='fk.html'
                },500)
                
            }
        })
    }







}































