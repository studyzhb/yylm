var paraObj=function() {
    'use strict';
     var paraData=location.href.split('?')||[];
        var readyData=paraData[1]?paraData[1]:'';
        var arrData=readyData.split('&')||[];

        var obj={};

        for(var i=0,j=arrData.length;i<j;i++){
            var arr=arrData[i].split('=')||[];
            obj[arr[0]]=arr[1];
        }

        return obj;
}();