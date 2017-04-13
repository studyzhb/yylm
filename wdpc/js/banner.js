// banner轮播图
$(function(){
    // 获取总宽度
    // var _width=$('.notice-pic>li').size()*$('.notice-pic>li').width();
    // $(".notice-pic").width(_width);
	var timer="";
	var index=0;
    console.log("轮播图");
    console.log($('.notice-pic>li').size());
	timer=setInterval(function () {
		go();
	},2000)
	function go(){
		index++;
		if(index > $('.notice-pic>li').size()-1){
		index = 0;
		}
		$('.notice-pic').stop(true,true).animate({
		'left':-$('.notice-pic>li').width()*index
		},300);
	};
})