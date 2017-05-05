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
            this.getQueueList();
        },
        getQueueList:function(){
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.list.oblitaionList+"?status=2")
                    .then(function(res){
                        if(res.body.code==200){
                            self.queueList=res.body.data;
                            console.log(self.queueList);
                        }else{
                            self.queueList=[];
                        }
                    })
        },

        backGoods:function(id){
            
        }
    }
})
