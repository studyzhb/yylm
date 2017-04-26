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
		shopDetailArr:'',
		goodsPic:''
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
			
            this.getShopInfo();
			this.getHotInfo();
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
							 self.goodsPic=self.json2arr(res.body.data.intr_pic)[0];
						}else{
							self.shopDetailArr={};
						}
                       
                    })
		},
		getHotInfo:function(){
			var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.detail.hotSale+'?id='+this.shopId)
                    .then(function(res){
                        if(res.body.code==200){
							self.hotGoodsArr=res.body.data;
						}else{
							self.hotGoodsArr=[];
						}
                        
                    })
		},
		goToGoodsDetail:function(id){
			open(goodsDetailUrl+id+'&name='+escape(this.navName),'_self');
		},
		showNowImage:function(src){
			this.goodsPic=src;
		}

	}
})
