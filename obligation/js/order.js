Vue.http.options.emulateJSON = true;
// Vue.http.options.xhr = { withCredentials: true }
Vue.http.interceptors.push((request, next) => {
	request.credentials = true
	next()
})

// Vue.use(Vuerify /*, add rules */);

new Vue({
	el:'#app',
    data:{
        selected:'',
        goodsDetai:{},
        goodsId:'',
        addressArr:[],
        goodsInfo:{
            total:'1',
        }
        
    },
    methods:{
        renderView:function(){
            this.goodsId=paraObj.id;
            this.getGoodsInfo();
            this.getAddressInfo();
        },
        getGoodsInfo:function(){

            var self=this;
			this.$http.get(ajaxAddress.preFix+ajaxAddress.list.queuelist)
				.then(function(res){
					if(res.body.code==200){
                        
						res.body.data.forEach(function(item){
                            if(item.id==self.goodsId){
                                self.goodsDetai=item;
                            }
                        })
					}
				});

        },
        getAddressInfo:function(){
            var self=this;
			this.$http.get(ajaxAddress.preFix+ajaxAddress.list.getAddress)
				.then(function(res){
					if(res.body.code==200){
                        
						self.addressArr=res.body.data;
					}else{
                        layer.msg('获取不到地址信息,请先登录');
                        setTimeout(function(){
                            open('index.html','_self');
                        },1000);
                    }
					
					
				});
        },
        createOrder:function(){
            var body={};
            var self=this;
            layer.load();
            this.isHasBand();  
        },
        isHasBand:function(){
            var self=this;
			this.$http.get(ajaxAddress.isHasBand)
				.then(function(res){
					if(res.body.code==200){
                        if(res.body.data){
                            if(this.selected){
                                this.addressArr.forEach(function(item){
                                    if(item.id==self.selected){
                                        body.username=item.sname;
                                        body.phone=item.tel;
                                        body.queue=self.goodsId;
                                        body.delivery_point=3;
                                        body.desc='121313';
                                        self.$http.post(ajaxAddress.preFix+ajaxAddress.order.commitOrder,body)
                                                .then(function(res){
                                                    if(res.body.code==200){
                                                        
                                                    var orderId=res.body.data.order_id;
                                                    
                                                    self.getPayHtml(orderId);

                                                    }else if(res.body.code==302){
                                                        cookieUtil.removeCookie('wdusername');
                                                        layer.msg(res.body.message);
                                                    }else{
                                                        layer.msg(res.body.message);
                                                    }
                                                })
                                        return false;
                                    }
                                })
                            }else{
                                layer.msg('请选择地址');
                                layer.closeAll('loading');
                                return;
                            }
                        }else{
                            open('approve.html','_self');
                        }
					}else{
                        
                        setTimeout(function(){
                            // open('index.html','_self');
                        },1000);
                    }
					
					
				});
        },
        getPayHtml:function(num){
            var self=this;
            open(ajaxAddress.payHtml+'?id='+num,'_self');

        },  
        changeMoney:function(item,way){
            if(way>0){
				item.total++;
			}else{
				item.total--;
				if(item.total<1){
					item.total=1;
				}
			}
        }
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
})


