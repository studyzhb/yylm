new Vue({
    el:'#app',
    data:{
        dicussInfoArr:'',
        user:'',
        tabIndex:'0',
        userOrderFilterArr:[]
    },
    filters:{
        json2single:function(value){
            
            var str=typeof eval(value)=='object'?JSON.parse(value)[0]:'';
            
            return str;
        }
        
    },
    mounted:function() {
        
        this.$nextTick(function(){
            this.renderView();
    
        })

    },
    methods:{
        renderView:function(){
            var self=this;
            this.shopId=paraObj.id;
            this.navName=unescape(paraObj.name);
            this.getUserOrder();
            
        },
        getUserOrder:function(obj){
            obj=obj||{};
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.userData.userOder,{params:obj})
                    .then(function(res){
                        if(res.body.code==200){

                            self.dicussInfoArr=res.body.data;
                            
                        }
                    })
        },

        showOrderList:function(index){
            this.tabIndex=index;
            this.getUserOrder({status:index});
        }

    }
})
