new Vue({
    el:'#app',
    data:{
        cityId:1,
        navId:1,
        navName:'',
        goodsDetailArr:'',
        goodsId:'1',
        shopId:'1',
        selectedIndex:'0',
        hotGoodsArr:[],
        userDetailArr:''
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
            this.getUserInfo();
            
        },
    
        getUserInfo:function(){
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.userData.userInfo+'?id='+this.shopId)
                    .then(function(res){
                        
                        self.userDetailArr=res.body.data;
                        console.log(self.userDetailArr);
                    })
        },
    }
})
