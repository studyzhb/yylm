Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;
// Vue.http.options.xhr = { withCredentials: true }
Vue.http.interceptors.push((request, next) => {
	request.credentials = true;
	// request.headers.set('Content-Type','application/x-www-form-urlencoded');
	next()
})
new Vue({
    el:'#app',
    data:{
        queueList:[],
        userQueueList:[],
        userOrderArr:[],
        user:'',
        tabIndex:'0',
        userOrderFilterArr:[],
        goodsValidCode:''
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
            this.getUserAccountList();
            this.getQueueList();
        },
        getQueueList:function(){
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.userData.userAccount)
                    .then(function(res){
                        
                        if(res.body.code==200){

                            self.queueList=res.body.data.list.balance_list;
                            // self.handleData(res.body.data);   
                        }else{
                            self.queueList=[];
                            
                        }
                    })
        },
        getUserAccountList:function(obj){
            obj=obj||{};
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.userData.userBalance,{params:obj})
                    .then(function(res){
                        if(res.body.code==200){

                            self.userOrderArr=res.body.data.list;
                            
                            // self.handleData(res.body.data);   
                        }else{
                            self.userOrderArr={};
                        }
                    })
        },
        getUser:function(){
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.userData.user)
                    .then(function(res){
                        if(res.body.code==200){
                            self.user=res.body.data||{};
                        }else{
                            self.user={};
                        }
                        
                    })
        },
        showOrderList:function(index){
            this.tabIndex=index;
            this.getOneUserQueueList(index);
        },
        //展示付完款中的已消费与未消费
        showConsume:function(index,staIndex){
            this.tabIndex=index;
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.userData.userConsume,{params:{status:staIndex}})
                    .then(function(res){
                        if(res.body.code==200){

                            self.userOrderArr=res.body.data;
                            // self.handleData(res.body.data);   
                        }else{
                            self.userOrderArr=[];
                        }
                    })
        },
        outputMoney:function(obj){

        }
    }
})
