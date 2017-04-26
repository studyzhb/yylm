new Vue({
	el:'#app',
	data:{
        cityId:1,
        navId:1,
		navName:'',
		//展开剩余个数
		residueCount:0,
		areaData:[],
        ClassifyData:[],
		//排序标记
		sortIndex:'0',

        tag:false,
        showIndex:"0",
        imgLeft:'',
		selectedSortIndex:'0',
		goodslistArr:[],
		shoplistArr:[],
		//总页数
		pageCount:1,
		//每页个数
		pageSize:6,
		currentPage:1,
		benefitlistArr:[],
		parames:{
			cityid:1,
			navid:1,
			p:1
		},
		gOstag:false,
		//获取标签信息
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

		prePage:function(){
			this.currentPage--;
			this.pageClick(this.currentPage);
		},
		nextPage:function(){
			this.currentPage++;
			this.pageClick(this.currentPage);
		},

		//排序
		sortShopList:function(index,tag){
			this.sortIndex=index;
			if(tag!==undefined){
				this.getShopInfo(tag);
			}
		},

		//剩余的个数
		residueNum:function(count){
			count=count||0;
			return '展开剩余'+count+'个';
		},
		showResidueList:function(item){
			if(!item.showAll){
				this.$set(item,'showAll',true);
			}else{
				item.showAll=!item.showAll;
			}

		},
		renderView:function(){
			var self=this;
			
			this.parames.navid=paraObj.navid;
			this.parames.cityid=paraObj.cityid;
			if(paraObj.subid&&paraObj.subid!='undefined'){
				this.parames.cate_class=paraObj.subid||'';
			}
			
			this.navName=unescape(paraObj.name);
			//获取城市站点和导航
			this.getCityAndNav();
			
			this.getAreaList();

			this.getClassifyInfo();

			this.showLabelAllInfo();
			//true加载商品,false加载店铺
			if(this.gOstag){
				this.getGoodsInfo();
			}else{
				this.getShopInfo();
			}
			
			this.getBefenit();
			
		},
		showLabelAllInfo:function(){
			var self=this;
				//获得标签方法
		   this.$http.get(ajaxAddress.preFix+ajaxAddress.label.labelAll)
			   .then(function(res){
				   self.labelArr = res.body.data;
				   
			});		
		},
		getAreaList:function(){
			var self=this;
			/**
			 * 获取区域列表
			 */
			this.$http.get(ajaxAddress.preFix+ajaxAddress.area.areaData+'?cityid='+this.parames.cityid+'&navid='+this.parames.navid)
				.then(function(res){
					res.body.data.forEach(function(item,index){
						
						item.areaIndex=-1;
						
					});
					self.areaData=res.body.data;
                    
				});
		},
		getClassifyInfo:function(){
			var self=this;
			/**
			 * 获取分类列表
			 */
            this.$http.get(ajaxAddress.preFix+ajaxAddress.Classify.Classifydata+'?cityid='+this.parames.cityid+'&navid='+this.parames.navid)
				.then(function(res){
					
                    res.body.data.forEach(function(item,index){
						
						if(item.id==1){
							item.children.forEach(function(its,ind){
								if(its.id==self.parames.cate_class){
									item.sortIndex=ind;
								}
							})
							
						}else{
							item.sortIndex='-1';
						}
                        

                    })
                    self.ClassifyData=res.body.data;
				});
		},
		getGoodsInfo:function(){
			var self=this;
			/**
			 * 获取商品数据
			 */ 
			this.$http.get(ajaxAddress.preFix+ajaxAddress.list.goodslist,{params:this.parames})
						.then(function(res){
							if(res.body.code==200){
								self.goodslistArr=res.body.data;
							}else{
								self.goodslistArr=[];
							} 
						})
		},
		getShopInfo:function(sortO){
			var self=this;

			var body={};
			
			for(var key in this.parames){
				if(key!='field'){
					body[key]=this.parames[key];
				}else{
					body.field=this.parames[key];
				}
			}

			if(sortO!==undefined){
				body[sortO]=true;
			}
			
			/**
			 * 获取店铺数据
			 */ 
			this.$http.get(ajaxAddress.preFix+ajaxAddress.list.shoplist,{params:body})
						.then(function(res){
							if(res.body.code==200){
								self.shoplistArr=res.body.data||[];

								self.pageCount=Math.ceil(res.body.pageAllNum/res.body.limit);
								self.pageSize=res.body.limit;

								//循环添加商品数据
								self.shoplistArr.forEach(function(item){
									self.getGoodsListByShopId(item.id,item)
								})
							}else{
								
								self.shoplistArr=[];
								self.pageCount=0;
							}
						})
		},
		//通过店铺ID过去商品信息
		getGoodsListByShopId:function(id,obj){
			var self=this;
			/**
			 * 获取店铺数据
			 */ 
			this.$http.get(ajaxAddress.preFix+ajaxAddress.list.getGoodsListByShopId+'?shopid='+id)
						.then(function(res){
							if(res.body.code==200){
								if(!obj.goods){
									self.$set(obj,'goods',[]);
								}
								obj.goods=res.body.data||[];
								obj.residueCount=res.body.data.length-2>0?res.body.data.length-2:0;
								
							}
						})
		},
		//筛选标签
		getLabelInfo:function(str,lField){
			var arr=str.split(',');
			var nArr=[];
			var self=this;
			//{id, type,field}
			
			this.labelArr.forEach(function(item){
				arr.forEach(function(its){
					if(its==item.id){
						
						if(LabelField[lField]==item.field){
							nArr.push(item);
						}
					}
				})
			})
		
			return nArr;
		},
		getBefenit:function(){
			var self=this;
			/**
			 * 获取优惠信息数据
			 */ 
			this.$http.get(ajaxAddress.preFix+ajaxAddress.list.benefit+'?cityid='+this.parames.cityid+'&navid='+this.parames.navid)
						.then(function(res){
							
							self.benefitlistArr=res.body.data;
						})
		},
		searchResultInfo:function(obj,tag){
			this.extendParams(obj,tag);
			
			this.getShopInfo();
		},
		extendParams:function(obj,tag){
			
			if(tag){
				// if(!this.parames.field){
				// 	this.parames.field={};
				// }

				
					for(var m in obj){
						this.parames[m]=obj[m];
					}
				
				// for(var i=0,j=this.parames.field;i<j.length;i++){
					
				// 	for(var m in obj){
				// 		if(!j[i][m]){
				// 			j[i][m]=obj[m];
				// 			break;
				// 		}else{
				// 			j[i][m]=obj[m];
				// 			break;
				// 		}
				// 	}
				// }
				// this.parames.field.push(obj);
				return;
			}else{
				for(var i in obj){
					this.parames[i]=obj[i];
				}
			}

			
		},
        getImageInfo:function(aIndex){
            var obj=this.$refs.aIndex[aIndex];
            var ofLeft=obj.offsetLeft+obj.offsetWidth/2-this.$refs.parIndex.offsetLeft-14;
            this.imgLeft=ofLeft;
			this.showIndex=aIndex;
        },
		//分类选中
		sortClick:function(sortItem,index,id){
			
			var obj={};
			obj[sortItem.field]=id;


			if(this.parames[sortItem.field]&&this.parames[sortItem.field]==id){
				
				sortItem.sortIndex=-11;
				delete this.parames[sortItem.field];
				this.searchResultInfo({},true);
			}else{
				sortItem.sortIndex=index;
				this.searchResultInfo(obj,true);
			}
			
		},
		//区域
		areaClick:function(item,pItem,index){
			var obj={};
			pItem.areaIndex=index;
			if(pItem.id=='1'){
				obj.areaid=item.id;
				delete this.parames.business
			}else{
				delete this.parames.areaid;
				obj.business=item.id;
			}
			this.searchResultInfo(obj);
		},
		pageClick:function(n){
			this.currentPage=n;
			var obj={};
			obj.p=n;
			this.searchResultInfo(obj);
		},
		/**
		 * 获取导航信息
		 */
		getCityAndNav:function(){
			
		},
		gotoDiscount:function(id){

			open(discountInfo+id+'&name='+escape(this.navName),'_self');
		},
		gotoShopDetail:function(id){
			open(shopDetailUrl+id+'&name='+escape(this.navName),'_self');
		},
		goToGoodsDetail:function(id){
			open(goodsDetailUrl+id+'&name='+escape(this.navName),'_self');
		}

	}
})
