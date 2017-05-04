define(function() {
    'use strict';
    var laytpl,layer,form,laydate;
    var resolve=false;
    
    var a=function(){
        return  layui.use(['laytpl','layer','form','laydate'],function(){
            laytpl = layui.laytpl;
            layer = layui.layer;
            laydate=layui.laydate;
            form=layui.form();
            resolve=true;
        })
    }()
   

    return a;
    
    
});