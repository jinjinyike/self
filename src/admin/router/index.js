import Vue from "vue";
import Router from "vue-router";
import page404 from "@/computer/components/public/page404"; //404页面
import login from "@/admin/components/login/login"; //登录页
import index from "@/admin/components/index/index"; //首页
import commen from '@/admin/components/index/commen.vue' // 展示页面
import productAudit from "@/admin/components/route/product/productAudit.vue";
import userAudit from "@/admin/components/route/user/userAudit.vue"; // 产品审核
import productShowDetail from "@/admin/components/route/product/product-showDetail.vue"; // 产品详情

Vue.use(Router);

export default new Router({
    // mode: 'history',
    base: "/",
    //初始路由
    routes: [{
            name: "login",
            path: "/login",
            component: login
        }, //登录页
        {
            name: "index",
            path: "/index",
            component: index,
            // 在children里写index的下级路由页面
            children: [{
                    //默认页面
                    name: "commen",
                    path: "commen",
                    component: commen
                },
                {
                    // 管理产品
                    name: "productAudit",
                    path: "productAudit",
                    component: productAudit
                },
                {
                    // 产品详情
                    name: "productShowDetail",
                    path: "productShowDetail",
                    component: productShowDetail
                },
                {
                    // 用户管理-审核
                    name: "userAudit",
                    path: "userAudit",
                    component: userAudit
                }
            ]
        }, //首页
        { name: "root", path: "/", redirect: "/login" }, //访问根实例,不加任何其他路由
        { name: "page404", path: "/page404", component: page404 }, //404页面
        { name: "error", path: "*", redirect: "/page404" } //匹配不到页面时跳转404页面
    ]
});