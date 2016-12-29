$(function(){
	 /*  活动页  */
	new Ewm();
})
function Ewm(){
	$('.header_left').find('a').on('mouseenter',function(){
		$(this).find('img').css('display','block')
	})
	$('.header_left').find('a').on('mouseleave',function(){
		$(this).find('img').css('display','none')
	})
	$('#fanhui').on('click',function(){
		$(document).scrollTop(0)
	})
}