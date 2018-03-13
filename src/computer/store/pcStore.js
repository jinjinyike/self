/**
 * author:by@Deng
 * email:by@6886432@163.com
 * version:1.0
 * descriptioin: pc端数据管理仓库
 */

import Vue from 'vue'
import Vuex from 'vuex' //导入数据管理状态
import userModule from './modules/userModule'   //用户信息模块
import addPro from './modules/addPro.js' //添加产品模块
import editRoutePro from './modules/editRoutePro.js' //编辑路线产品模块
import plan from './modules/plan.js'//控卫管理模块

Vue.use(Vuex)       //使用vuex管理数据

//管理模块
export default new Vuex.Store({
    modules:{
        userModule,     //用户信息模块
        addPro,         //添加产品模块s
        editRoutePro,	//修改路线产品模块
        plan,//控卫管理模块
    }
})
