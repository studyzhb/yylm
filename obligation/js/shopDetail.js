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
		goodsPic:'',
		labelArr:[]
	},
	filters:{
		json2single:function(value){
			
			var str=typeof eval(value)=='object'?JSON.parse(value)[0]:'';
			
			return str;
		},
		
		
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
			this.shopId=paraObj.id;
			this.navName=unescape(paraObj.name);
			this.showLabelAllInfo();
            this.getShopInfo();
			this.getHotInfo();
			
		},
		showIntro:function(str,tagStr){
			var $div=$('<div style="position:absolute;width:60px;color:#888;text-align:center;border-radius:3px;line-height:20px;border:1px solid #999;bottom:-20px;background:#fff;right:-60px;">').appendTo($(this.$refs[tagStr])).html(str);
			setTimeout(function(){
				
				$div.remove();
			},500);
			// layer.tips(str,this.$refs[tagStr],{
			// 	tips: [2, '#c00']
			// });
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
		},
		showLabelAllInfo:function(){
			var self=this;
				//获得标签方法
		   this.$http.get(ajaxAddress.preFix+ajaxAddress.label.labelAll)
			   .then(function(res){
				   if(res.body.cod==200){
					self.labelArr = res.body.data;
				   }else{
					   self.labelArr = [];
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
