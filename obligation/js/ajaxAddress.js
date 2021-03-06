var ajaxAddress={
    preFix:'/public/index.php/bondpc',
    registerPreFix:'/public/index.php/capp',
    formFix:'',
    payHtml:'/public/index.php/bondpc/pay',
    isHasBand:'/public/index.php/bondpc/bondpc/isHasBand',
    //支付宝充值
    rechargePayMoney:'/pay/rechargePay',
    user:{
        getPicCode:'/login/getcode',
        getLoginMessCode:'/login/code',
        login:'/login/login',
        //退出
        exit:'/login/out',
        resetLoginInfo:'/login/foundBack',
        resetLoginCode:'/login/getPhoneCode',
        //注册验证码
        registMessCode:'/code/index',
        getRegisterMessCode:'/register/code',
        register:'/enroll/index',
        getUpdateMessCode:'/User/getcode',//修改绑定手机号,获取图片验证码
        updateUserInfo:'/User/boundPhone',//提交修改手机号
        updatePassInfo:'/User/updatePassword',
        updateNikeName:'/user/update',
        userInfo:'/Bondpc/getUserInfo',
        finishedPayInfo:'/Login/insPayPassword'
    },
    list:{
        queuelist:'/goods/queueList',
        //获取单个队列的数据
        getOneUserQueue:'/bondpc/userQueue',
        getGoodsInfo:'/goods/getPack',
        getAddress:'/bondpc/getAddress',
        oblitaionList:'/bondpc/getBondList',
        banklist:'/userbalance/cardList',
        addBanklist:'/userbalance/cardSave',
        canShowBankList:'/userbalance/cardConfig',
        addAuthor:'/userbalance/saveRealName',
        isAuthorPage:'/userbalance/isName',
        
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
        userConsume:'/user/toConsume',
        //用户交易信息
        userAccount:'/userBalance/withdrawList',
        userBalance:'/userbalance/index',
        outputMoney:'/userbalance/balancewithdraw'
    },
    order:{
        commitOrder:'/bondpc/queueBuy',
        createHtml:'',
        //债权金转余额
        obligation2balance:'/Turnin/applyTurn',
        convertScore:'/bondpc/oneExchange',
        backGoods:'/bondpc/bayBack',
        backGoodsHis:'/bondpc/backList',
        exchangelist:'/bondpc/exchangeList',
        balancePay:"/pay/yuezhifu"
    }
}