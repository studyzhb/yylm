$(function(){
    $(".b-nav li").click(function(){
        // 商家信息
         var _index=$(this).index();
         $(this).addClass('color-red').siblings().removeClass('color-red');
         $('.b-message .b-message-info').eq(_index).show().siblings().hide();

        //  用户评价
        $(".progNav li").click(function(){
            var _indexs=$(this).index();
            $(this).addClass("bgcolor").siblings().removeClass("bgcolor");
            $(".eval-content .content-info").eq(_indexs).show().siblings().hide();
        })
    });
    // 住宿页面
    $(".areaChoice li").click(function(){
        $(this).addClass("color-bg").siblings().removeClass("color-bg");
    });
    $(".sortNav li").click(function(){
        $(this).addClass("color-red").siblings().removeClass("color-red");
    });
   
});