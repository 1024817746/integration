$(function(){
	new Sp_list();
})
function Sp_list(){
        getMsg(20)
        /*     获取所有商品每页20个    */
        function getMsg(num){
            $.ajax({
                url:'../data/sp_list.json',
                type:'GET',
                dataType:'json',
                success:function(data){
                    //1.计算分页数量
                    var showNum=num;
                    var dataL=data.length;
                    var pageNum=Math.ceil(dataL/showNum);
                    $('#Pagination').pagination(pageNum,{
                        num_edge_entries: 1, //边缘页数
                        num_display_entries: 3, //主体页数
                        items_per_page: 1, //每页显示1项
                        prev_text: "上一页",
                        next_text: "下一页",
                        callback:function(index){
                            var html='';       
                            for(var i = showNum*index; i < showNum*index+showNum;i++){
                                if(i<dataL){
                                	if((i+1)%4==0){
                                		html+='<li class="right"><div class="gwc"><p class="sc"><img src="../images/sp_list/sc.png"> 收藏</p><p id="'+data[i].id+'" class="gWc_tj"><img src="../images/sp_list/gwc.png"> 加入购物车</p></div><div class="sp_img"><a href="##"><img src="../'+data[i].img+'"></a></div><div class="sp_sj"><h3 class="goods-name"><a href="##">'+data[i].name+'</a></h3></div><div class="sp_jj"><p>'+data[i].xn+'</p><p class="pb">'+data[i].hd+'</p><p class="jg">￥'+data[i].jg+'</p></div></li>'
                                	}else{
                                		html+='<li><div class="gwc"><p class="sc"><img src="../images/sp_list/sc.png"> 收藏</p><p id="'+data[i].id+'" class="gWc_tj"><img src="../images/sp_list/gwc.png"> 加入购物车</p></div><div class="sp_img"><a href="##"><img src="../'+data[i].img+'"></a></div><div class="sp_sj"><h3 class="goods-name"><a href="##">'+data[i].name+'</a></h3></div><div class="sp_jj"><p>'+data[i].xn+'</p><p class="pb">'+data[i].hd+'</p><p class="jg">￥'+data[i].jg+'</p></div></li>'
                                	}
                                        
                                }
                            }
                            $('#sP_list').html(html)
                            gwc_yr();
                            sP_xq();
                        }
                    })
                    
                }
            })

        }
        /*     购物车    */
        /*     存cookie    */
       function gwc_yr(){
            sc_msg()
            $aLi = $('#sP_list').find('li');
            //console.log(this.$aLi)  csww
            $aLi.on('mouseenter',function(){
                //console.log(1)
                $(this).find('.gwc').css('visibility','visible')
            })
            $aLi.on('mouseleave',function(){
                $(this).find('.gwc').css('visibility','hidden')
            })
            $('#sP_list').find('.gWc_tj').on('click',function(){
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
                //console.log($.cookie('goods'))
                sc_car();
                sc_msg(); 
            })
            
       }
       /*     购物车商品数量    */
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
       /*     显示商品    */
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
         /*  跳转商品详情页  */
        function sP_xq(){
            $('#sP_list').find('li').find('.sp_img').on('click',function(){
               
                var id=$(this).prev('.gwc').find('.gWc_tj').attr('id')
                console.log(id)
                $.cookie('id',id);
                window.location.href='sp_xqing.html'
            })
        }
                           
                                                                                                    
}

	



















