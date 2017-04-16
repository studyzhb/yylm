
	
	var w=$('.shop-content').width();
	var h=$('.shop-content').height();
	
	$('.wd-nav-area').on('click','li a',function() {
        console.log('click');
		var url=$(this).data('url');
        
		showIframe(url,w,h);
        startInit('YuFrame1',540)
        
	});

    $('.right-menu-area').on('click','li a',function() {
        console.log('click');
		var url=$(this).data('url');
        
		showIframe(url,w,h);
        startInit('YuFrame1',540)
        
	});

    var sW=$('.perRight').width();
    var sH=$('.perRight').height();

    $('.listNav').on('click','dd dd',function(){
        
        var url=$(this).data('url');
        
		showSubIframe(url,sW,sH);
        setTimeout(initWrapperHeight,1000);
        initWrapperHeight();
    })
    $('.personIndex').on('click',function(){
        
        var url=$(this).data('url');
        console.log('11111111111')
		showSubIframe(url,sW,sH);

        setTimeout(initWrapperHeight,1000);
        initWrapperHeight();
		// startInit('subFrame',540)
    })
    

    // showIframe('index.html',w,h);
    showSubIframe('./myperson/perIndex.html',sW,sH);
    var browserVersion = window.navigator.userAgent.toUpperCase();
    var isOpera = browserVersion.indexOf("OPERA") > -1 ? true : false;
    var isFireFox = browserVersion.indexOf("FIREFOX") > -1 ? true : false;
    var isChrome = browserVersion.indexOf("CHROME") > -1 ? true : false;
    var isSafari = browserVersion.indexOf("SAFARI") > -1 ? true : false;
    var isIE = (!!window.ActiveXObject || "ActiveXObject" in window);
    var isIE9More = (! -[1, ] == false);

    function reinitIframe(iframeId, minHeight) {
        try {
            var iframe =typeof iframeId=='object'?iframeId:document.getElementById(iframeId);
            // console.log(iframe);
            var bHeight = 0;
           
            if (isChrome == false && isSafari == false){
                bHeight = iframe.contentWindow.document.body.scrollHeight;
            }
            var dHeight = 0;
            if (isFireFox == true){
                dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
            }else if (isIE == false && isOpera == false){
                
                dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
                
            }else if (isIE == true && isIE9More) {//ie9+
                var heightDeviation = bHeight - eval("window.IE9MoreRealHeight" + iframeId);  
                if (heightDeviation == 0) {
                    bHeight += 3;
                } else if (heightDeviation != 3) {
                    eval("window.IE9MoreRealHeight" + iframeId + "=" + bHeight);
                    bHeight += 3;
                }
            }
            else{//ie[6-8]、OPERA
                bHeight += 3;
            }
            
            var height = Math.max(bHeight, dHeight);
            if (height < minHeight) height = minHeight;
            
            iframe.style.height = height + "px";
        } catch (ex) { }
    }
    function startInit(iframeId, minHeight) {
        eval("window.IE9MoreRealHeight" + iframeId + "=0");
        setInterval(function(){
            reinitIframe(iframeId,minHeight);
        },100);
        window.setInterval("reinitIframe('" + iframeId + "'," + minHeight + ")", 100);
    }


	function showIframe(url,w1,h1){
	    //添加iframe
	    var if_w = w1||w; 
	    var if_h = 540; 
        
	    //allowTransparency='true' 设置背景透明
		$('.shop-content').html('');
	    var $o=$("<iframe width='" + if_w + "' height='" + if_h + "' id='YuFrame1' name='YuFrame1' style='z-index:4;'  frameborder='no' marginheight='0' marginwidth='0' allowTransparency='true'></iframe>").appendTo($('.shop-content'));    
	    var st=document.documentElement.scrollTop|| document.body.scrollTop;//滚动条距顶部的距离
	    var sl=document.documentElement.scrollLeft|| document.body.scrollLeft;//滚动条距左边的距离
	    var ch=document.documentElement.clientHeight;//屏幕的高度
	    var cw=document.documentElement.clientWidth;//屏幕的宽度
	    var objH=$("#YuFrame1").height();//浮动对象的高度
	    var objW=$("#YuFrame1").width();//浮动对象的宽度
	    var objT=Number(st)+(Number(ch)-Number(objH))/2;
	    var objL=Number(sl)+(Number(cw)-Number(objW))/2;
	    $("#YuFrame1").css('left','0');
	    $("#YuFrame1").css('top','0');
	 
	    $("#YuFrame1").attr("src", url);
	 
	}

    function showSubIframe(url,w,h){
	    //添加iframe
	    var if_w = w; 
	    var if_h = 540; 
        
	    //allowTransparency='true' 设置背景透明
		$('.perRight').html('');
	    var $o=$("<iframe width='" + if_w + "' height='" + if_h + "' id='subFrame' name='subFrame' style='z-index:4;'  frameborder='no' marginheight='0' marginwidth='0' allowTransparency='true'></iframe>").appendTo($('.perRight'));    
	    var st=document.documentElement.scrollTop|| document.body.scrollTop;//滚动条距顶部的距离
	    var sl=document.documentElement.scrollLeft|| document.body.scrollLeft;//滚动条距左边的距离
	    var ch=document.documentElement.clientHeight;//屏幕的高度
	    var cw=document.documentElement.clientWidth;//屏幕的宽度
	    var objH=$("#subFrame").height();//浮动对象的高度
	    var objW=$("#subFrame").width();//浮动对象的宽度
	    var objT=Number(st)+(Number(ch)-Number(objH))/2;
	    var objL=Number(sl)+(Number(cw)-Number(objW))/2;
	    $("#subFrame").css('left','0');
	    $("#subFrame").css('top','0');
	 
	    $("#subFrame").attr("src", url);
	 
        
	}

    // window.onresize=function(){
    //     var iframe=document.getElementById('YuFrame1');

    //     if(iframe){
    //         iframe.style.width=$('.shop-content').width()+'px';
    //     }
    // }

function initWrapperHeight(){
    var $content = $('.perRight');
    // $content.height($(this).height());
    $content.find('iframe').each(function() {
        console.log($(this.contentWindow.document.body).height());
      $(this).height(Math.max($(this.contentWindow.document.body).height(),540));
    });
}

//iframe自适应
  $(window).on('resize load', function() {
    // var $content = $('.perRight');
    // $content.height($(this).height());
    // $content.find('iframe').each(function() {
    //     console.log($(this.contentWindow.document.body).height());
    //   $(this).height($(this.contentWindow.document.body).height());
    // });

  }).resize();