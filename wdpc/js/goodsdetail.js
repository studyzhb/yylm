new Vue({
	el:'#app',
	data:{
        cityId:1,
        navId:1,
		navName:'',
        goodsDetailArr:'',
        goodsId:'1',
		shopId:'',
		selectedIndex:'0',
		hotGoodsArr:[],
		shopDetailArr:''
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
			this.goodsId=paraObj.id;
			this.navName=unescape(paraObj.name);
            this.getGoodsInfo();
			
		},
		getGoodsInfo:function(){
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.detail.goodsDetail+'?id='+this.goodsId)
                    .then(function(res){
                        console.log(res);
                        self.goodsDetailArr=res.body.data;
						self.shopId=self.goodsDetailArr.shopid;
						self.getShopInfo();
						self.getHotInfo();
                    })
        },
		json2arr:function(value){
			
			var arr=typeof eval(value)=='object'?JSON.parse(value):[];
			return arr;
		},
		getShopInfo:function(){
			var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.detail.shopDetail+'?id='+this.shopId)
                    .then(function(res){
                        console.log(res);
                        self.shopDetailArr=res.body.data;
                    })
		},
		getHotInfo:function(){
			var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.detail.hotSale+'?id='+this.shopId)
                    .then(function(res){
                        console.log(res);
                        self.hotGoodsArr=res.body.data;
                    })
		},
		gotoShopDetail:function(id){
			open(shopDetailUrl+id+'&name='+escape(this.navName),'_self');
		}

	}
})
