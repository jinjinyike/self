import Vue from 'vue';
import Router from 'vue-router';
import page404 from '@/computer/components/public/page404'; //404页面
import example from '@/computer/components/example'; //示例
import login from '@/computer/components/login/login'; //登录页
import index from '@/computer/components/index/index'; //首页
import findPwd from '@/computer/components/login/findPwd'; //找回密码
// import addProduct from '@/computer/components/route/product/addProduct' //添加产品
import accountBase from '@/computer/components/account/account-base.vue'; //账户基本信息
import accountPerson from '@/computer/components/account/account-person.vue'; //个人信息页面
import commen from '@/computer/components/index/commen.vue'; //
//产品
import addProduct from '@/computer/components/route/product/addProduct.vue'; //添加产品
import editRouteProduct from '@/computer/components/route/product/editProduct.vue'; //修改产品
import productManage from '@/computer/components/route/product/productManage.vue'; //管理产品
import productShowDetail from '@/computer/components/route/product/product-showDetail.vue'; // 产品详情
import productSearch from '@/computer/components/route/product/productSearch.vue'; // 产品搜索
//计划位
import planManage from '@/computer/components/route/plan/planManage.vue'; //计划位管理
import planSearch from '@/computer/components/route/plan/planSearch.vue'; //计划位查询
import planCostManage from '@/computer/components/route/plan/planCostManage.vue'; //计划位费用查询
//订单
import addOrder from '@/computer/components/route/order/addOrder.vue'; //添加订单
import restSearch from '@/computer/components/route/order/restSearch'; //余位查询
import restHandle from '@/computer/components/route/order/restHandle'; //占位处理
import orderSearch from '@/computer/components/route/order/orderSearch.vue'; //添加查询
import orderReview from '@/computer/components/route/order/orderReview.vue'; //订单审核
import orderRevise from '@/computer/components/route/order/orderRevise.vue'; //订单修改
//财务
import payManage from '@/computer/components/route/finance/payManage.vue'; //支出管理
import incomeManage from '@/computer/components/route/finance/incomeManage.vue'; //收入管理
import accountCost from '@/computer/components/route/finance/accountCost.vue'; //账户中心

//公司
import companyManage from '@/computer/components/account/company-management.vue'; //公司管理

// 用户
import groupManage from '@/computer/components/route/user/groupManage.vue'; // 群组管理
import distributorManage from '@/computer/components/route/user/distributorManage.vue'; // 分销商管理
import distributorAccessManage from '@/computer/components/route/user/distributorAccessManage.vue'; // 分销商权限管理
import distributorGroupManage from '@/computer/components/route/user/distributorGroupManage.vue'; // 分销商群组管理
// 发团
import tourManage from '@/computer/components/route/tour/tourManage.vue'; // 发团管理
import tourArrange from '@/computer/components/route/tour/tourArrange.vue'; // 发团安排
import shortMessage from '@/computer/components/route/tour/shortMessage.vue'; // 短信通知
import guideReimbursement from '@/computer/components/route/tour/guideReimbursement.vue'; // 导游报账
import guideReportList from '@/computer/components/route/tour/guideReportList.vue'; // 导游报账列表

// 店铺管理
import storeManage from '../components/route/store/storeManage.vue';
// resource 资源管理
import groundManage from '@/computer/components/route/resource/groundManage.vue'; // 地接社管理

// profitSearch利润查询
import profitSearch from '@/computer/components/route/dataStatistics/profitSearch.vue'; // 利润查询
import profitDetail from '@/computer/components/route/dataStatistics/profitDetail.vue'; // 利润展示

Vue.use(Router);

export default new Router({
    // mode: 'history',
    base: '/',
    //初始路由
    routes: [{
            name: 'login',
            path: '/login',
            component: login
        },
        {
            //找回密码
            name: 'findPwd',
            path: '/findPwd',
            component: findPwd
        }, //登录页
        {
            // 子路由有默认路由，去掉父路由的name
            // name: "index",
            path: '/index',
            component: index,
            // 在children里写index的下级路由页面
            children: [{
                    //首页默认路由
                    path: '/',
                    redirect: 'commen'
                },
                {
                    //默认页面
                    name: 'commen',
                    path: 'commen',
                    component: commen
                },
                {
                    //公司账户信息
                    name: 'accountBase',
                    path: 'accountBase',
                    component: accountBase
                },
                {
                    //个人基础信息
                    name: 'accountPerson',
                    path: 'accountPerson',
                    component: accountPerson
                },
                {
                    //添加产品
                    name: 'addProduct',
                    path: 'addProduct',
                    component: addProduct
                },
                {
                    //修改产品
                    name: 'editRouteProduct',
                    path: 'editRouteProduct',
                    component: editRouteProduct
                },
                {
                    // 管理产品
                    name: 'productManage',
                    path: 'productManage',
                    component: productManage
                },
                {
                    // 产品详情
                    name: 'productShowDetail',
                    path: 'productShowDetail',
                    component: productShowDetail
                },
                {
                    // 产品查询
                    name: 'productSearch',
                    path: 'productSearch',
                    component: productSearch
                },
                {
                    // 产品查询
                    name: 'companyManage',
                    path: 'companyManage',
                    component: companyManage
                },
                {
                    // 群组管理
                    name: 'groupManage',
                    path: 'groupManage',
                    component: groupManage
                },
                {
                    // 分销商管理
                    name: 'distributorManage',
                    path: 'distributorManage',
                    component: distributorManage
                },
                {
                    // 分销商权限管理
                    name: 'distributorAccessManage',
                    path: 'distributorAccessManage',
                    component: distributorAccessManage
                },
                {
                    // 分销商群组管理
                    name: 'distributorGroupManage',
                    path: 'distributorGroupManage',
                    component: distributorGroupManage
                },
                {
                    // 计划位管理
                    name: 'planManage',
                    path: 'planManage',
                    component: planManage
                },
                {
                    // 计划位查询
                    name: 'planSearch',
                    path: 'planSearch',
                    component: planSearch
                },
                {
                    // 计划位费用查询
                    name: 'planCostManage',
                    path: 'planCostManage',
                    component: planCostManage
                },
                {
                    // 添加订单
                    name: 'addOrder',
                    path: 'addOrder',
                    component: addOrder
                },
                {
                    // 余位查询
                    name: 'restSearch',
                    path: 'restSearch',
                    component: restSearch
                },
                {
                    // 占位处理
                    name: 'restHandle',
                    path: 'restHandle',
                    component: restHandle
                },
                {
                    // 订单查询
                    name: 'orderSearch',
                    path: 'orderSearch',
                    component: orderSearch
                },
                {
                    // 订单修改
                    name: 'orderRevise',
                    path: 'orderRevise',
                    component: orderRevise
                },
                {
                    // 订单审核
                    name: 'orderReview',
                    path: 'orderReview',
                    component: orderReview
                },
                // 资源管理 地接社
                {
                    // 增加地接社
                    name: 'groundManage',
                    path: 'groundManage',
                    component: groundManage
                },
                // 发团
                {
                    // 发团管理
                    name: 'tourManage',
                    path: 'tourManage',
                    component: tourManage
                },
                {
                    // 发团安排
                    name: 'tourArrange',
                    path: 'tourArrange',
                    component: tourArrange
                },
                {
                    // 导游报账列表
                    name: 'guideReportList',
                    path: 'guideReportList',
                    component: guideReportList
                },
                {
                    // 导游报账
                    name: 'guideReimbursement',
                    path: 'guideReimbursement',
                    component: guideReimbursement
                },
                {
                    // 短信通知
                    name: 'shortMessage',
                    path: 'shortMessage',
                    component: shortMessage
                },
                {
                    // 店铺设置
                    name: 'storeManage',
                    path: 'storeManage',
                    component: storeManage
                },
                {
                    //财务管理
                    // 支付管理
                    name: 'payManage',
                    path: 'payManage',
                    component: payManage
                },
                {
                    // 收入管理
                    name: 'incomeManage',
                    path: 'incomeManage',
                    component: incomeManage
                },
                {
                    // 账户中心
                    name: 'accountCost',
                    path: 'accountCost',
                    component: accountCost
                },
                // 数据统计
                {
                    // 数据统计-利润查询
                    name: 'profitSearch',
                    path: 'profitSearch',
                    component: profitSearch
                },
                {
                    // 数据统计-利润展示
                    name: 'profitDetail',
                    path: 'profitDetail',
                    component: profitDetail
                }
            ]
        },
        { name: 'root', path: '/', redirect: '/login' }, //访问根实例,不加任何其他路由
        { name: 'example', path: '/components/example', component: example }, //示例
        // { name: 'addProduct', path: '/components/route/product/addProduct', component: addProduct }, //示例
        { name: 'page404', path: '/page404', component: page404 }, //404页面
        { name: 'error', path: '*', redirect: '/page404' } //匹配不到页面时跳转404页面
    ]
});