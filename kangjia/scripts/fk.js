$(function(){
    /*  付款  */
	new Fk_jg();
})
function Fk_jg(){
	var arr = eval($.cookie('xx'));
    var tz = $.cookie('tz');
    if(tz == 2){
            /*    如果是从购物车进行结算获取信息    */
            $.ajax({
            url:'../data/sp_list.json',
            type:'GET',
            success:function(res){
                var sc_str = $.cookie('goods');
                if(sc_str){
                    var sc_obj = eval(sc_str);
                    var sc_num = 0 ;
                    var sum = 0;
                    var html = ''; 
                    for(var i in sc_obj){                   
                        sum+=parseInt(res[sc_obj[i].id].jg)*sc_obj[i].num;
                        sc_num += Number(sc_obj[i].num);
                    }
                    html = '<p><span>订单号：161227191646006</span><span>订单商品数量：'+sc_num+'</span><span class="span-section"> 收货人：'+arr[5]+'</span><span class="span-section"> 手机：'+arr[6]+'</span></p><p><span>收货信息：'+arr[0]+''+arr[1]+''+arr[2]+''+arr[3]+'</span></p><p><span>邮编：'+arr[4]+'任意时间,任意时间段</span></p><p class="zg-jg"><span>应付金额：￥'+sum+'.00</span></p>' 
                    $('.fk-tj').html(html);
                }
            }
        })
    }else if(tz == 1){
        /*    如果是从详情页进行结算获取信息    */
        $.ajax({
            url:'../data/sp_list.json',
            type:'GET',
            success:function(res){
                var gm = $.cookie('gm');
                var sl = $.cookie('sl');
                    html = '<p><span>订单号：161227191646006</span><span>订单商品数量：'+sl+'</span><span class="span-section"> 收货人：'+arr[5]+'</span><span class="span-section"> 手机：'+arr[6]+'</span></p><p><span>收货信息：'+arr[0]+''+arr[1]+''+arr[2]+''+arr[3]+'</span></p><p><span>邮编：'+arr[4]+'任意时间,任意时间段</span></p><p class="zg-jg"><span>应付金额：￥'+parseInt(res[gm].jg)*sl+'.00</span></p>' 
                    $('.fk-tj').html(html);
                }
        })
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
                    }
                }
            })
        }
}






