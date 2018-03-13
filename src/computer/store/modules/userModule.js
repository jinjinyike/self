/**
 * 用户模块的信息
 */
import mutationName from '../mutation_name'; //导入mutation_name管理公共数据的名称的方法

export default {
    namespaced: true, //开启自动命名空间
    state() {
        return {
            userPic:'',
            job:'',
            jobNum:'',
            companyLogo:'',
            companyName:'',
            name:'',
            isLogin: false //是否登录
        };
    },
    getters: {},
    mutations: {
        saveBaseInfo(state,ploy){
            state.userPic = ploy.userPic
            state.job = ploy.job
            state.jobNum = ploy.jobNum
            state.companyLogo = ploy.companyLogo
            state.companyName = ploy.companyName
            state.name = ploy.name
        }
    },
    actions: {
        [mutationName.LOGIN](context) {
            context.commit(mutationName.LOGIN); //提交mutations中login方法
        }
    }
};
