export default{
    namespaced: true, //开启自动命名空间
	state(){
		return{
			planList:1,
		}
	},
	getters: {},
    mutations: {
    	commitList(state,obj){
    		state.planList+=1;
    	}
    },
    actions:{
    	commitList:({ commit }, obj) => {
    		commit('commitList',obj)
    	}
    }

}