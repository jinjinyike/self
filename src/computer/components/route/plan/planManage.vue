<template>
	<div class="right-content-index">
		<el-tabs v-model="activeName" @tab-click="handleClick" class='self'>
		    <el-tab-pane label="管理计划位" name="first">
		    	<edit-plan></edit-plan>
		    </el-tab-pane>
		    <el-tab-pane label="添加计划位" name="second">
		    	<add-plan></add-plan>
		    </el-tab-pane>
		  </el-tabs>
	</div>
</template>
<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
import addPlan from './addPlan.vue'
import editPlan from './editPlan.vue'
	export default{
		data(){
			return {
				activeName:'first'
			}
		},
		methods: {
			...mapActions('plan',[
				'commitList']),
	      handleClick(tab, event) {
	        if(tab.index==0){
	        	this.commitList()
	        	// tab.$children[0].tableData
	        }
	      }
    	},
    	components:{
    		addPlan,
    		editPlan
    	}
	}
</script>
<style scoped>
	.el-tabs__nav{
		width: auto;
	}
	.el-tabs__item{
		width: auto;
	}
</style>