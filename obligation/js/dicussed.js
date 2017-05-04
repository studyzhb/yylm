new Vue({
    el:'#app',
    data:{
        dicussInfoArr:'',
        commentObj:{
            levelid:'',
            good_id:'',
            contents:'',
            //品质评分
            quality:'',

        },
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
            this.getUserComment();
        },
        getUserComment:function(){
            
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.common.getCommented)
                    .then(function(res){
                        
                        if(res.body.code==200){
                            self.dicussInfoArr=res.body.data;
                        }else{
                            self.dicussInfoArr=[];
                        }
                    })
        },
        showOrderList:function(index){
            this.tabIndex=index;
            this.getUserOrder({status:index});
        },
        confirmCommonInfo:function(){
            var self=this;
            this.$http.post(ajaxAddress.preFix+ajaxAddress.goods.commitComment,this.commentObj)
                    .then(function(res){
                        if(res.body.code==200){

                        }else{
                            
                        }
                    })
        }

    }
})
