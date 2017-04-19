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
		shopDetailArr:'',
		commentArr:[]
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
			this.getCommentInfo();
			
		},
		getGoodsInfo:function(){
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.detail.goodsDetail+'?id='+this.goodsId)
                    .then(function(res){
                        
                        self.goodsDetailArr=res.body.data;
						self.shopId=self.goodsDetailArr.shopid;
						self.getShopInfo();
						self.getHotInfo();
                    })
        },
		getCommentInfo:function(){
			var self=this;
			
			this.$http.get(ajaxAddress.preFix+ajaxAddress.goods.getComment+'?id='+this.goodsId)
					.then(function(res){
						// console.log(res);
						if(res.body.code==200){
							self.commentArr=res.body.data||[];
						}
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
                        if(res.body.code==200){
                        	self.shopDetailArr=res.body.data;
						}

                    })
		},
		getHotInfo:function(){
			var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.detail.hotSale+'?id='+this.shopId)
                    .then(function(res){
                        if(res.body.code==200){
                        	self.hotGoodsArr=res.body.data;
 
						}
                   })
		},
		gotoShopDetail:function(id){
			open(shopDetailUrl+id+'&name='+escape(this.navName),'_self');
		},
		goToGoodsDetail:function(id){
			open(goodsDetailUrl+id+'&name='+escape(this.navName),'_self');
		},
		//去生成订单页面
		goToOrder:function(){
			open('order.html?id='+this.goodsId,'_self');
		}

	}
})
