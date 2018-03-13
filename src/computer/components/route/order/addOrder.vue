<template>
	<div class="right-content-index">
		<el-tabs v-model="activeName" type="card" class='add'>
	    	<el-tab-pane label="添加订单" name="first" >
				<add-order-con types='0' @change-route='editRoute'  ref='addOnly0'></add-order-con>
	    	</el-tab-pane>
		<el-tab-pane label="添加单团" name="second" :disabled="come">
			<!-- <div>添加单团</div> -->
			<add-order-con types='1' ref='addOnly1'></add-order-con>
		</el-tab-pane>
	</el-tabs>
	</div>
</template>
<script>
import addOrderCon from './addOrderCon.vue';
export default {
	data() {
		return {
			activeName:'first',
			come:false,
		};
	},
	route:{
        data(transition){
            console.log(this.$route.query)
        }
    },
	watch:{
		$route:function(data){
			console.log(this.$refs)
			this.come=false;
			this.$refs.addOnly0.$refs.pro.proNum='';
			this.$refs.addOnly0.$refs.pro.proNum1='';
			this.$refs.addOnly1.$refs.pro.proNum='';
			this.$refs.addOnly1.$refs.pro.proNum1='';
			this.$refs.addOnly0.proLeaveTime='';
			this.$refs.addOnly0.isRest=false;
			this.$refs.addOnly0.adultNum='';
			this.$refs.addOnly0.studentNum='';
			this.$refs.addOnly0.childNum='';
			this.$refs.addOnly0.oldNum='';
			this.$refs.addOnly1.adultNum='';
			this.$refs.addOnly1.studentNum='';
			this.$refs.addOnly1.childNum='';
			this.$refs.addOnly1.oldNum='';
		}
	},
	created() {
		if(this.$route.query.id){
			this.come=true;
			console.log(this.come)
		}
	},
	components: {
		addOrderCon
	},
	methods:{
		editRoute(){
		}
	}
};
</script>
<style scoped>
.right-content-index {
	color: #666;
}
</style>