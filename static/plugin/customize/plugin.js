'use strict'

import Vue from 'vue'
import commonUtils from '@/common/utils/commonUtils' //公共函数js(原生)
import requestUtils from '@/common/utils/requestUtils' //自定义封装axios请求
import loadUtils from '@/common/load/loadUtils' //加载中动画
import api from '@/common/api/api' //访问后台请求接口
import syspub from '@/common/utils/syspub' //系统公共函数
import md5 from '@/common/utils/md5' //密码加密
// import verif from '@/common/utils/verificationUtils' // 验证身份证号
import validate from '@/common/validate/validate' // 验证

export default {
    install: function(Vue) {
        Object.defineProperty(Vue.prototype, '$commonUtils', { value: commonUtils }) //公共函数js
        Object.defineProperty(Vue.prototype, '$http', { value: requestUtils }) //自定义封装axios请求
        Object.defineProperty(Vue.prototype, '$load', { value: loadUtils }) //自定义封装axios请求
        Object.defineProperty(Vue.prototype, '$api', { value: api }) //访问后台请求接口
        Object.defineProperty(Vue.prototype, '$syspub', { value: syspub }) //系统公共函数
        Object.defineProperty(Vue.prototype, "$md5", { value: md5 }); //密码加密
        Object.defineProperty(Vue.prototype, '$validate', { value: validate }); // 验证
        // Object.defineProperty(Vue.prototype, '$verif', { value: verif }); // 验证身份证号
    }
}