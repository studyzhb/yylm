new Vue({
    el:'#app',
    data:{
        selectedIndex:0,
        selectedSubIndex:0
    },
    mounted:function() {
        
        this.$nextTick(function(){
            this.renderView();
        })

    },
    methods:{
        renderView:function(){
            var self=this;
           this.$http.get(ajaxAddress.isHasBand)
                    .then(function(res){
                        if(res.body.code==200){
                            
                        }else{
                            open('index.html','_self');
                            self.queueList=[];
                        }
                    })
        }
    },

})