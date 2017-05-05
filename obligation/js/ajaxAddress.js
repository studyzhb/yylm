var ajaxAddress={
    preFix:'/public/index.php/bondpc',
    formFix:'',
    payHtml:'/public/index.php/bondpc/pay',
    isHasBand:'/public/index.php/bondpc/bondpc/isHasBand',
    user:{
        getPicCode:'/login/getcode',
        getLoginMessCode:'/login/code',
        login:'/login/login',
        //退出
        exit:'/login/out',
        resetLoginInfo:'/login/foundBack',
        resetLoginCode:'/login/code',
        //
        getRegisterMessCode:'/register/code',
        register:'/register/register',
        getUpdateMessCode:'/User/getcode',//修改绑定手机号,获取图片验证码
        updateUserInfo:'/User/boundPhone',//提交修改手机号
        updatePassInfo:'/User/updatePassword',
        updateNikeName:'/user/update',
    },
    list:{
        queuelist:'/goods/queueList',
        //获取单个队列的数据
        getOneUserQueue:'/bondpc/userQueue',
        getGoodsInfo:'/goods/getPack',
        getAddress:'/bondpc/getAddress',
        oblitaionList:'/bondpc/getBondList'
    },
    detail:{
        goodsDetail:'/goods/GoodsDetail',
        shopDetail:'/goods/shopDetail',
        hotSale:'/goods/hotSale'
    },
    userData:{
        user:'/User/user',
        userInfo:'/User/userInfo',//个人详细信息
        userOder:'/User/purchaseOrderLst',
        //展示已消费与未消费的订单
        userConsume:'/user/toConsume'
    },
    order:{
        commitOrder:'/bondpc/queueBuy',
        createHtml:'',
        convertScore:'/bondpc/oneExchange',
        backGoods:'/bondpc/bayBack',
        backGoodsHis:'/bondpc/backList',
        exchangelist:'/bondpc/exchangeList'
    }
}