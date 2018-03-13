// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui' //引入element-ui框架
import 'element-ui/lib/theme-chalk/index.css' //引入element默认的css
import '../../static/css/element-variables.scss' //自定义主题色系
import '../../static/css/reset.css' // 去除公共样式css
import '../../static/css/site.css' // 整个站点公共css
import plugin from '../../static/plugin/customize/plugin' //导入自定义以及第三方插件
import store from '@/admin/store/adminStore' //vuex数据管理仓库
import router from './router' //路由
import App from './App'


Vue.use(plugin) //使用自定义以及第三方插件 
Vue.use(ElementUI) //elementUI插件

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    render: h => h(App)
})