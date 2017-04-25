var ajaxAddress={
    preFix:'/yylm/public/index.php/unionIndex',
    formFix:'',
    area:{
        areaData:'/condition/getArea'
    },
    Classify:{
        Classifydata:'/condition/getClassify'
    },
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
        shoplist:'/lists/shop',
        goodslist:'/lists/goods',
        benefit:'/lists/Benefit',
        getGoodsListByShopId:'/lists/shopGoods'
    },
    detail:{
        goodsDetail:'/goods/GoodsDetail',
        shopDetail:'/goods/shopDetail',

        hotSale:'/goods/hotSale'
    },
    discount:{
        bendfit:'/benefit/BenefitDetail',
    },
    discountMessage:{
        discountMesData:'/index/Benefit'
    },
    label:{
        labelAll:'/common/LabelAll'
    },
    Banner:{
        banner:'/index/getBanner'
    },

    nav:{
        showPrimaryNav:'/index/getNav',
    },

    updataContent:{
        hotContent:'/index/getRecommendShop',
        goods:'/index/getRecommendGoods'
    },
    search:{
        searchShop:'/search/shopList',
        searchGoods:'/search/goodsList'
    },
    userData:{
        user:'/User/user',
        userInfo:'/User/userInfo',//个人详细信息
        userOder:'/User/purchaseOrderLst',
        //展示已消费与未消费的订单
        userConsume:'/user/toConsume'
    },
    common:{
        getCity:'/common/getCity',
        getComment:'/User/noEvaluate',
        getCommented:'/User/evaluateLst'
    },
    goods:{
        goodsCode:'/user/searchCode',
        getComment:'/goods/evaluate',
        comment:'/user/goodsEvaluate',
        //提交评论
        commitComment:'/user/goodsEvaluate'
    }
}