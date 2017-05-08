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
        goodsValidCode:'',
        userBankList:[]
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
            this.getUserBankList();
        },
        //债权金转余额
        obligation2Balance:function(){
            this.$http.post(ajaxAddress.preFix+ajaxAddress.order.obligation2balance)
                    .then(function(res){
                        if(res.body.code==200){
                           layer.msg('操作成功')
                        }else{
                            layer.msg('请稍后再试')
                        }
                    })
        },
        getUserBankList:function(){
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.list.banklist)
                    .then(function(res){
                        if(res.body.code==200){
                            self.userBankList=res.body.data.list;
                        }else{
                            self.userBankList=[];
                        }
                    })
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
            if(this.userBankList.length==0){
                layer.msg('请先添加银行卡');
                return;
            }
            var self=this;
            $('.bankListWrapper').html('');
            $.each(this.userBankList,function(index,item){
                $('<option>').appendTo($('.bankListWrapper')).html(item).attr('value',index+1);
            })
            layui.use(['form','layer'], function(){
                var layer = layui.layer;
                var form=layui.form();
                layer.open({
                    type:1,
                    title:'余额提现',
                    content: $('#bankFormWrapper'), //这里content是一个DOM
                    shade:[0.8,'#000'],
                    area:['600px','500px'],
                    maxmin: true,
                    end:function(){
                        
                        $('#bankFormWrapper').hide();
                    }
                })


                form.on('submit(addBank)',function(formParams){

                    self.$http.post(ajaxAddress.preFix+ajaxAddress.userData.outputMoney,formParams.field)
                        .then(function(res){
                            
                            if(res.body.code==200){
                                
                                layer.msg(res.body.msg);
                            }else{
                                layer.msg(res.body.msg);
                            }
                
                        })
                })

            });
        }
    }
})
