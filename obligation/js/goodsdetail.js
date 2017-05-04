new Vue({
	el:'#app',
	data:{
        cityId:1,
        navId:1,
		navName:'',
        goodsDetailArr:'',
        goodsId:'1',
		shopId:'',
		goodsPic:'',
		selectedIndex:'0',
		hotGoodsArr:[],
		shopDetailArr:'',
		commentArr:[],
		goodsScoreObj:{},
		labelArr:[]
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
		parseScore:function(value){
			return value+'.0分';
		},
		renderView:function(){
			var self=this;
			
			this.goodsId=paraObj.id;
			this.navName=unescape(paraObj.name);
			this.showLabelAllInfo();
            this.getGoodsInfo();
			// this.getCommentInfo();
			// this.getCommentTotalScore();
			
		},
		getGoodsInfo:function(){
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.detail.goodsDetail+'?id='+this.goodsId)
                    .then(function(res){
                        if(res.body.code==200){
							self.goodsDetailArr=res.body.data;
							self.goodsPic=self.json2arr(res.body.data.goods_pic)[0];
							self.shopId=self.goodsDetailArr.shopid;
							self.getShopInfo();
							self.getHotInfo();
						}else{

						}
                        
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
		getCommentTotalScore:function(){
			var self=this;
			
			this.$http.get(ajaxAddress.preFix+ajaxAddress.goods.getComment+'?id='+this.goodsId)
					.then(function(res){
						// console.log(res);
						if(res.body.code==200){
							self.goodsScoreObj=res.body.data;
							self.getGoodsInfo();
						}else{
							
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
							self.shopDetailArr=res.body.data||{};
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
		},
		showNowImage:function(src){
			this.goodsPic=src;
		},
		showLabelAllInfo:function(){
			var self=this;
				//获得标签方法
		   this.$http.get(ajaxAddress.preFix+ajaxAddress.label.labelAll)
			   .then(function(res){
				   if(res.body.code==200){
					self.labelArr = res.body.data;
					
				   }
				   
				   
			});		
		},
		//筛选标签
		getLabelInfo:function(str,lField){
			var arr=str?str.split(','):[];
			var nArr=[];
			var self=this;
			
			//{id, type,field}
			if(this.labelArr instanceof Array){

				this.labelArr.forEach(function(item){
					
					arr.forEach(function(its){
						if(its==item.id){
							
							if(LabelField[lField]==item.field){
								nArr.push(item);
							}
						}
					})
				})
			}
			
		
			return nArr;
		},


	}
})
