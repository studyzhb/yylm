Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;
// Vue.http.options.xhr = { withCredentials: true }
Vue.http.interceptors.push((request, next) => {
	request.credentials = true;
	// request.headers.set('Content-Type','application/x-www-form-urlencoded');
	next()
})

new Vue({
    el:'#app',
    data:{
        //倒计时初始值
		timeNum:2,
        cityId:1,
        navId:1,
        navName:'',
        goodsDetailArr:'',
        goodsId:'1',
        shopId:'1',
        selectedIndex:'0',
        hotGoodsArr:[],
        userDetailArr:'',
        userObj:{},
        changeIndex:'-1',
        picCode:'',
        nikeName:'',
        isShowError:false,
        validatorResetUser:{
			password:'',
			conPassword:'',
			phonecode:'',
			code:''
		},
        //修改绑定手机号
        registerUser:{
			phone:'',
			password:'',
			conPassword:'',
			phonecode:'',
			code:''
		},
        resetUser:{
            phone:'',
			password:'',
			conPassword:'',
			phonecode:'',
			code:''
        },
        changePass:{
            oldpassword:'',
            newpasswordOne:'',
            newpasswordTwo:''
        },
        payUser:{

        },
        isClick:true
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
            this.$http.get(ajaxAddress.preFix+ajaxAddress.user.userInfo)
                    .then(function(res){
                        if(res.body.code==200){
                            self.userObj=res.body.message;
                            self.resetUser.phone=self.userObj.tel;
                        }
                        
                        
                    })
        },
        //更新图片验证码
        updatePicCode:function(){
			this.picCode=ajaxAddress.preFix+ajaxAddress.user.getPicCode+'?v='+new Date().getTime();
		},
        //获取短信验证码
		getMesscode:function(){
			
			var phone=this.registerUser.phone;
			var code=this.registerUser.code;
            
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
        //忘记密码,重置
		getResetMesscode:function(){
			var phone=this.resetUser.phone;
			var code=this.resetUser.code;
			var self=this;
			if(!phone){
				layer.msg('手机号不能为空');
				return;
			}
			if(!code){
				layer.msg('验证码不能为空');
				return;
			}
			// layer.load();
			// if(this.isClick){
				this.isClick=false;
				this.$http.post(ajaxAddress.preFix+ajaxAddress.user.resetLoginCode,{phone:phone,code:code,type:'paypassword'})
				.then(function(res){
					if(res.body.code==200){
						layer.msg('短信验证码发送成功，请注意查收');
						self.timeOutNum('resetMessageCode');
					}else{
						layer.msg(res.body.message);
					}
					
					
				})
			// }else{
			// 	layer.msg('请稍后再试');
			// }
			
		},
        //设置支付密码
        timeOutNum:function(code){
			this[code]=--this.timeNum+'秒后重新发送';
			var self=this;
			
			if(this.timeNum<1){
				this.isClick=true;
				this[code]='获取短信验证码';
				return;
			}
			setTimeout(function(){
				self.timeOutNum(code);
			},1000);
		},
        confrimPayPass:function(){
			var body=this.resetUser;
			var tag=true;
			var self=this;
			this.isShowError=true;
			for(var key in this.validatorResetUser){
				
				if(!this.validatorResetUser[key]){
					
					tag=false;
					layer.msg('请填写完整内容');
				}
			}
			if(this.resetUser.password!=this.resetUser.conPassword){
				tag=false;
				layer.msg('两次输入密码不一致');
			}
			if(tag){
				this.$http.post(ajaxAddress.preFix+ajaxAddress.user.finishedPayInfo,body)
				.then(function(res){
					if(res.body.code==200){
						self.isShowError=false;
						self.changeIndex='-1';
						layer.msg(res.body.message);
						for(var key in this.resetUser){
								self.resetUser[key]='';
							}
					}else{
						layer.msg(res.body.message);
					}
				})
			}
			
		},
        updateNikeName:function(){
            var self=this;
			this.$http.post(ajaxAddress.preFix+ajaxAddress.user.updateNikeName,{nikename:this.nikeName})
					.then(function(res){
						
                        if(res.body.code==200){
                            layer.msg(res.body.message);
                            self.changeIndex=-1;
                             
                        }else{
                            layer.msg(res.body.message);
                        }
					})
        }
    }
})
