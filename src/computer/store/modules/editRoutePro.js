import mutationName from '../mutation_name';

export default {
    namespaced: true, //开启自动命名空间
    state() {
        return {
            SproNum: "",
            basic: {}, //基本信息
            platoon1: "",
            setPlatoon: false, //完成切换
            gather1: "",
            promition: "",
            route: "",
            rest: "",
            employeeArr: []
        };
    },
    getters: {},
    mutations: {
        createPronum(state, proNum) {
            state.SproNum = proNum;
        },
        basicStore(state, obj) {
            //基本信息
            state.basic = obj;
        },
        pltoonStore(state, obj) {
            //团期日期
            state.platoon1 = obj;
        },
        setPlatoonStore(state, obj) {
            state.setPlatoon = obj;
        },
        gatherStore(state, obj) {
            state.gather1 = obj;
        },
        promitionStore(state, obj) {
            state.promition = obj;
        },
        routeStore(state, obj) {
            state.route = obj;
        },
        restStore(state, obj) {
            state.rest = obj;
        },
        employeeArrStore(state, obj) {
            state.employeeArr = obj;
        }
    },
    actions: {
        createPronum: ({ commit }, proNum) => {
            //获取产品编号
            commit("createPronum", proNum);
        },
        basicStore: ({ commit }, obj) => {
            //基本信息提交
            commit("basicStore", obj);
        },
        pltoonStore: ({ commit }, obj) => {
            //团期信息提交
            commit("pltoonStore", obj);
        },
        setPlatoonStore: ({ commit }, obj) => {
            //团期切换
            commit("setPlatoonStore", obj);
        },
        gatherStore: ({ commit }, obj) => {
            //集合信息提交
            commit("gatherStore", obj);
        },
        promitionStore: ({ commit }, obj) => {
            //促销信息提交
            commit("promitionStore", obj);
        },
        routeStore: ({ commit }, obj) => {
            //行程信息提交
            commit("routeStore", obj);
        },
        restStore: ({ commit }, obj) => {
            //余位团期提交
            commit("restStore", obj);
        },
        employeeArrStore({ commit }, obj) {
            // 员工提交
            commit("employeeArrStore", obj);
        }
    }
};