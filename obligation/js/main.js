/**
 * 封装工具集合
 */
define(['util'],function(config){
    function MyObj(){
        return this._init.apply(this,arguments);
    }
    MyObj.fn = MyObj.prototype
            = function(){
                return {
                    _init:function(){// 初始化方法
                        
                        this.setting = Array.prototype.slice.call(arguments);
                        return this;
                    },
                    _bindEvt:function(){// 事件绑定
                        return this;
                    },
                    _pageLoad:function(){
                        this._bindEvt();
                        
                        return this;
                    }
                }
    }()

    // 给类添加属性或方法，相当于静态变量
    MyObj.extend = function(obj){
        var extended = obj.extended;
        for (var i in obj){
            MyObj.fn[i] = obj[i];
        }
        if (extended) extend(MyObj);
    };
    MyObj.extend(config);
    MyObj.load = function(param){
        return new MyObj(param)._pageLoad();
    }
    
    return MyObj;
})
