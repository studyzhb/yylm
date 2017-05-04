define(function() {
    'use strict';
    var test=true;
    var d=function(value){
        if(test){
             console.log(value);
        }
        
    }
    return {
        d:d
    }
});