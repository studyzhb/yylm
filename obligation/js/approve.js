require(['jquery','main','requestAddress','lay-model','image-upload','log'],function($,myObj,ajaxAddress,layObj,upload,log){
    
    var common=myObj.load();
    
    /**
     * 图片上传
     */
    $('.imageadd').on('click',function(){
        upload.uploadImage(this,true);
    });

        setTimeout(function(){
        form=layObj.form();
        form.on('submit(shopInfo)',function(formParams){
            log.d(formParams.field)
            layObj.layer.load();

            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.obligation.approve,function(data){
                    log.d(data);
                    if(data.code==200){
                        
                        layObj.layer.closeAll();
                        layer.msg('认证成功，等待审核');
                        setTimeout(function(){
                           open('index.html','_self');
                        },1000);
                        
                    }else{
                        
                        layObj.layer.closeAll('loading');
                        layer.msg(data.msg);
                        setTimeout(function(){
                            
                           
                        },1000);
                    }
                },formParams.field);
                
            return false;
        })

    },1000);

})