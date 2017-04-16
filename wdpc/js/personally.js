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
        userDetailArr:'',
        changeIndex:'-1',
        picCode:'',
        nikeName:'',
        //修改绑定手机号
        registerUser:{
			phone:'',
			phonecode:'',
			code:''
		},
        resetUser:{
            phone:'',
            phonecode:'',
            code:'',
            password:''
        },
        changePass:{
            oldpassword:'',
            newpassword:''
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
                //获取导航
	this.picCode=ajaxAddress.preFix+ajaxAddress.user.getPicCode;

        })

    },
    methods:{
        renderView:function(){
            var self=this;
            this.shopId=paraObj.id;
            this.navName=unescape(paraObj.name);
            this.getUserInfo();
            
        },
    
        getUserInfo:function(){
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.userData.userInfo+'?id='+this.shopId)
                    .then(function(res){
                        
                        self.userDetailArr=res.body.data;
                        console.log(self.userDetailArr);
                    })
        },
        //更新图片验证码
        updatePicCode:function(){
			this.picCode=ajaxAddress.preFix+ajaxAddress.user.getPicCode+'?v='+new Date().getTime();
		},
        //获取短信验证码
		getMesscode:function(){
			console.log('111');
			var phone=this.registerUser.phone;
			var code=this.registerUser.code;
            console.log(this.registerUser);
			this.$http.post(ajaxAddress.preFix+ajaxAddress.user.getUpdateMessCode,{},{params:{phone:phone,code:code}})
					.then(function(res){
						console.log(res);
					})
		},
        //修改绑定手机号
        updateUserInfo:function(){
			var body=this.registerUser;
			this.$http.post(ajaxAddress.preFix+ajaxAddress.user.updateUserInfo,{},{params:body})
					.then(function(res){
						console.log(res);
					})
		},
        //修改密码
        updatePassInfo:function(){
			var body=this.changePass;
			this.$http.post(ajaxAddress.preFix+ajaxAddress.user.updatePassInfo,{},{params:body})
					.then(function(res){
						console.log(res);
					})
		},
        updateNikeName:function(){
            
			this.$http.post(ajaxAddress.preFix+ajaxAddress.user.updateNikeName,{},{params:{nikename:nikeName}})
					.then(function(res){
						console.log(res);
					})
        }
    }
})
