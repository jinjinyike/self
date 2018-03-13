import mutationName from '../mutation_name';

export default {
    namespaced: true, //开启自动命名空间
    state() {
        return {
            proNum: '',
            activeName: 'first', //选项卡
            basic: {},
            platoon1: {},
            route: {},
            manual: {},
            picture: {}
        };
    },
    getters: {},
    mutations: {
        changeTab(state, obj) {
            //下一步切换选项卡
            state.activeName = obj;
        },
        oneCommit(state, obj) {
            state.basic = obj
        },
        twoCommit(state, obj) {
            state.platoon1 = obj
        },
        createPronum(state, proNum) {
            state.proNum = proNum
        },
        threeTotal(state, obj) {
            state.route = obj;
        },
        allTotal(state, obj) {
            state.picture = obj;
        },
        fourCommit(state, obj) {
            state.manual = obj;
        },
        changeRoute(state, obj) {
            state.activeName = obj;
        }
    },
    actions: {
        changeTab: ({ commit }, obj) => {
            //改变选项卡
            commit('changeTab', obj);
        },
        oneCommit: ({ commit }, obj) => {
            //基本信息提交
            commit('oneCommit', obj);
        },
        twoCommit: ({ commit }, obj) => { //团期信息提交
            commit('twoCommit', obj);
        },
        createPronum: ({ commit }, proNum) => {
            //获取产品编号
            commit('createPronum', proNum);
        },
        threeTotal: ({ commit }, obj) => {
            // 行程安排信息
            commit('threeTotal', obj);
        },
        allTotal: ({ commit }, obj) => {
            // 图片提交
            commit('allTotal', obj);
        },
        fourCommit: ({ commit }, obj) => {
            commit('fourCommit', obj);
        },
        // 点击添加产品回到第一页
        changeRoute: ({ commit }, obj) => {
            commit("changeRoute", obj);
        }
    }
};