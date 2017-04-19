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
        goodsDetai:{},
        goodsId:'',
        goodsInfo:{
            total:'1',

        }
        
    },
    methods:{
        renderView:function(){
            this.goodsId=paraObj.id;
            this.getGoodsInfo();
        },
        getGoodsInfo:function(){
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.detail.goodsDetail+'?id='+this.goodsId)
                    .then(function(res){
                        if(res.body.code==200){
                            console.log(res.body);
                            self.goodsDetai=res.body.data;
                        }
                    })
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


