
define(function() {
/**
 * cookie
 */
var cookieUtil={
    //天数
    setCookie:function(user,name){
        document.cookie=user+"="+name;
    },
    setExpiresDate:function(user,name,value){
        var da=new Date();
        var expiresDay=da.getDate()+value;
        da.setDate(expiresDay);
        document.cookie=user+"="+name+";expires="+da+";path=/";
    },
    getCookie:function(name) {
        if(document.cookie.length>0){
            var start=document.cookie.indexOf(name+"=");
            if(start!=-1){
                start=document.cookie.indexOf(name+"=")+name.length+1;
            }else{
                return '';
            }
            var end=document.cookie.indexOf(';',start)!=-1?document.cookie.indexOf(';',start):document.cookie.length;
            return document.cookie.substring(start,end);
        }
        return "";
    },
    removeCookie:function(name){
        this.setExpiresDate(name,1,-1);
    }
}

var config={
  //表单提交
  formSubmit:function(formId,urlhttp,fun){
    $(formId).ajaxSubmit({
      url:urlhttp,
      type:'post',
      success:function(data){
        console.log(data);
        if(!!fun){
          fun(data);
        }  
      }
    });
  },

    formatTemplate:function(dta, tmpl) {  
        var b;
        var format = { 
            price: function(x) {  
                // console.log(typeof x,this.discount);
                return (x*b).toFixed(2); 
            },
            discount:function(a){
                b=a==0?1:a*0.1;
                return b;
            }
        };  
        return tmpl.replace(/{(\w+)}/g, function(m1, m2) {  
            if (!m2)  
                return "";  
            return (format && format[m2]) ? format[m2](dta[m2]) : dta[m2];  
        });  
    },
    /**
     * 
     * @param {String} method 请求方法
     * @param {String} url 请求地址
     * @param {Function} fun 回调函数
     * @param {Object} data	请求参数
     */
    ajax:function(method,url,fun,data){
    	// console.log(url);
        data=data||{};
        data.token=cookieUtil.getCookie('token');
        url+="?v="+new Date().getTime();
    	$.ajax({
    		type:method,
		   	url:url,
		   	data:data||{date:new Date().getTime()},
        // xhrFields: {
        //               withCredentials: true
        //       },
        // crossDomain: true,
		   	success: function(msg){
              msg=typeof msg==='object'?msg:JSON.parse(msg);
              if(msg.code&&msg.code=='401'){
                $(parent.document).find('iframe').remove();
                // open('login.html','_self');
                top.location.href="../login.html";
              }else if(msg.code&&msg.code=='402'){
                  top.location.href="../login.html";
                //   open('login.html','_self');
              }
              else{
                 if(fun){
                  fun(msg);
                  } 
              }   		 	
		   },
       error:function(e){
         console.log(JSON.stringify(e));
        
            }
        })
		

    },
    uploadImage:function(inputId,imgId) {
        var docObj=document.getElementById(inputId);
        var imgObjPreview=document.getElementById(imgId);
                if(docObj.files &&docObj.files[0]){
                        //火狐下，直接设img属性
                        imgObjPreview.style.display = 'block';
                        imgObjPreview.style.width = '200px';
                        imgObjPreview.style.height = '120px';                    
                        //imgObjPreview.src = docObj.files[0].getAsDataURL();

      //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式  
      imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);

                }else{
                        //IE下，使用滤镜
                        docObj.select();
                        var imgSrc = document.selection.createRange().text;
                        var localImagId = document.getElementById("localImag");
                        //必须设置初始大小
                        localImagId.style.width = "300px";
                        localImagId.style.height = "120px";
                        //图片异常的捕捉，防止用户修改后缀来伪造图片
                      try{
                          localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                          localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
                        }catch(e){
                          alert("您上传的图片格式不正确，请重新选择!");
                          return false;
                        }
                        imgObjPreview.style.display = 'none';
                        document.selection.empty();
                }
                return true;
        }

   
}


return {
    cookieUtil:cookieUtil,
    tools:config
}



});














