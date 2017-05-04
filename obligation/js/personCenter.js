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
            this.$http.get(ajaxAddress.preFix+ajaxAddress.list.oblitaionList+"?status=0")
                    .then(function(res){
                        if(res.body.code==200){
                            self.queueList=res.body.data;
                        }else{
                            self.queueList=[];
                        }
                    })
        }
    },

})