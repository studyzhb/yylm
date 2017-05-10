Vue.http.options.emulateJSON = true;
// Vue.http.options.xhr = { withCredentials: true }
Vue.http.interceptors.push(function(request, next){
	request.credentials = true;
	// request.headers.set('Content-Type','application/x-www-form-urlencoded');
	next()
})
new Vue({
    el:'#app',
    data:{
        dicussInfoArr:'',
        commentObj:{
            levelid:'1',
            good_id:'1',
            orderid:'',
            contents:'请输入你的评论内容',
            //品质评分
            quality:'1',

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
            
            this.$http.get(ajaxAddress.preFix+ajaxAddress.common.getComment)
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
        confirmCommonInfo:function(item){
            var self=this;
            layer.load();
            this.commentObj.orderid=item.orderinfoid;
            this.commentObj.good_id=item.goodsid;
            this.$http.post(ajaxAddress.preFix+ajaxAddress.goods.commitComment,this.commentObj)
                    .then(function(res){
                        layer.closeAll('loading');
                        if(res.body.code==200){
                            self.getUserComment();
                        }else{
                            layer.msg(res.body.message);
                        }
                    })
        }

    }
})
