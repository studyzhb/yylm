new Vue({
    el:'#app',
    data:{
        userOrderArr:'',
        user:'',
        tabIndex:'0',
        userOrderFilterArr:[]
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
            this.getUserOrder();
            this.getUser();
        },
    
        getUserOrder:function(obj){
            obj=obj||{};
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.userData.userOder,{params:obj})
                    .then(function(res){
                        if(res.body.code==200){

                            // self.userOrderArr=res.body.data;
                            self.handleData(res.body.data);   
                        }
                    })
        },
        getUser:function(){
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.userData.user)
                    .then(function(res){
                        self.user=res.body.data;
                        console.log(self.user);
                    })
        },
        showOrderList:function(index){
            this.tabIndex=index;
        },
        handleData:function(arrN){
            var self=this;
            var arr=[];
            
            arrN.forEach(function(item,index){
               
                if(item.status==1){
                    arr.push(arrN.splice(index,1));
                }

            })
            self.userOrderArr=arrN;
            
            arr[0].forEach(function(item){
                console.log(item);
                for(var i=0;i<item.number;i++){
                    arr.push(item);
                }
            })
            for(var i=0,j=arr;i<j.length;i++){
                j[i].number=1;
            }
            console.log(arr);
            self.userOrderFilterArr=arr;
        }
    }
})
