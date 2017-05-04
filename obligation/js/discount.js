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
			this.shopId=paraObj.id;
			this.navName=unescape(paraObj.name);
            this.getShopInfo();
			
		},
		json2arr:function(value){
			
			var arr=typeof eval(value)=='object'?JSON.parse(value):[];
			return arr;
		},
		getShopInfo:function(){
			var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.discount.bendfit+'?id='+this.shopId)
                    .then(function(res){
                        console.log(res);
                        self.shopDetailArr=res.body.data[0];
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
        printDay:function(value){
            var str='距离打折结束还剩';
            str+=this.getTimeed(value)+'天';
            return str;
        },
        getTimeed:function (timestamp) {

            var now = new Date();
            var leftTime =-timestamp*1000+now.getTime();
            var leftsecond = parseInt(leftTime / 1000);
            
            var day1 = Math.floor(leftsecond / (60 * 60 * 24));
            var hour = Math.floor(leftsecond / 3600);
            var minute = Math.floor(leftsecond / 60);
            var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
            
            return day1;
        }

	}
})
