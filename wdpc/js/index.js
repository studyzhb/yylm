
new Vue({
	el:'#app',
	data:{
		navData:[],
		banImgData:[],
		mainData:[],
		navIdArr:[],
		navNameArr:[],
		bannerData:[],
		labelArr:[],//标签数组 【 ID=》 name】
		timer:"",
		index:"",
		navid:'',
		navtype:'',
		cityId:'0',
		labelFArr:[],
		laeblSArr:[],
		laeblTArr:[]
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
			if(this.bannerData.length>0){
				this.active();
			}	
		})
	},
	methods:{
		renderView:function(){
			
			var self=this;
			this.$http.get(ajaxAddress.preFix+ajaxAddress.nav.showPrimaryNav+'?navtype=1')
				.then(function(res){
					// console.log(res);
					self.navData=res.body.data;
					self.navData.forEach(function(data){
						self.navIdArr.push({id:data.id,typeShop:[],typeGoods:[],benefit:[],nav_name:data.name});
						
					})			
					self.navIdArr.forEach(function(item) {
						self.navfun(item);
					});
					
					// console.log(self.navIdArr);
					
				});
			this.$http.get(ajaxAddress.preFix+ajaxAddress.Banner.banner+'?station=1')
				.then(function(res){
					// console.log(res);
					
					if(res.body.code==200){
						self.bannerData=res.body.data.concat(res.body.data)||[];
						if(self.bannerData.length>0){
							setTimeout(function(){
								self.active();
							},1000);
							
						}	
					}
						
					// console.log(self.bannerData);
					
				});


			this.$http.get(ajaxAddress.preFix+ajaxAddress.Banner.banner+'?station=2')
				.then(function(res){
					// console.log(res);
				
					if(res.body.code==200){
						self.banImgData=res.body.data||[];
							
					}
							
					// console.log(self.banImgData);
					
				});
					//获得标签方法
		   this.$http.get(ajaxAddress.preFix+ajaxAddress.label.labelAll)
			   .then(function(res){
				   
				   self.labelArr = res.body.data;
				   
			});
			
		},
		setNameShop:function(value){

			var str = value + shopRecomendName;
			
			
				return str;
			
		},
		setNameGoods:function(value){

			var str = value + goodsRecomendName;
			
			
				return str;
			
		},
		//获得推荐/热门店铺方法
		navfun:function(navObj){
			this.$http.get(ajaxAddress.preFix+ajaxAddress.updataContent.hotContent+'?navid='+navObj.id)
				.then(function(res){
					// console.log(res.body.data);
					//navNameArr

					// res.body.data.forEeach(function(item){
					// 	item.
					// });
					if(res.body.data){
						navObj.typeShop=res.body.data||[];
					}
	
				})
		//获得推荐/热门商品方法
		 this.$http.get(ajaxAddress.preFix+ajaxAddress.updataContent.goods+'?navid='+navObj.id)
				.then(function(res){
					// console.log(res.body.data);
					var arr  = res.body.data instanceof Array? res.body.data.splice(9):[];
					navObj.typeGoods   = res.body.data;
					navObj.typeGoodsAd = arr;
					
					
				})
		
			// 优惠信息
			this.$http.get(ajaxAddress.preFix+ajaxAddress.discountMessage.discountMesData+'?navid='+navObj.id)
			.then(function(res){
				navObj.benefit=res.body.data;
				console.log(navObj.benefit);
				
			})

			// this.$http.get(ajaxAddress.preFix+ajaxAddress.updataCon+'?navid='+navObj.id)
			// .then(function(res){
			// 	// console.log(res.body.data);
			// 	navObj.benefit=res.body.data;
			// 	console.log(navObj.typeGoods);
				
			// })
		
		

		},
		
		getLabelInfo:function(str,lField){
			
			
			var arr=str?str.split(','):[];
			
			var nArr=[];
			var self=this;
			
			//{id, type,field}
			this.labelArr.forEach(function(item){
				arr.forEach(function(its){
					if(its==item.id){
						// console.log(LabelField[lField]);
						// console.log(item.field);
						if(LabelField[lField]==item.field){
							nArr.push(item);
						}
					}
				})
				
			})
			// console.log(nArr);
			return nArr;
		},
		active:function(){
			var self=this;
			var len=$(".notice-pic>li").size();
			
			$(".notice-pic").width(len*$('.notice-pic>li').width());
			clearInterval(this.timer);
			this.timer=setInterval(function () {
				self.index==len/2?self.index=0:self.index++;
                self.index==0?$('.notice-pic').css({left:0}):'';
				go();
			},2000)
			function go(){
				// self.index++;
				// if(self.index > $('.notice-pic>li').size()-1){
				// 	self.index = 0;
				// }
				$('.notice-pic').animate({
				'left':-$('.notice-pic>li').width()*self.index+'px'
				},1000);
			};
		},
		updateNav:function(id){
			this.navid=id;
		},
		gotoShopDetail:function(id,name){
			open(shopDetailUrl+id+'&name='+escape(name),'_self');
		},
		goToGoodsDetail:function(id,name){
			open(goodsDetailUrl+id+'&name='+escape(name),'_self');
		},
		gotoDiscount:function(id,name){

			open(discountInfo+id+'&name='+escape(name),'_self');
		},

	}
})
