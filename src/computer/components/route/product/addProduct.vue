<template>
	<div id='add-pro' class="right-content-index">
		<el-tabs v-model="activeName" type="card">
	    <el-tab-pane label="基本信息" name="first" :disabled='true'>
	    	<basic></basic>
	    </el-tab-pane>
	    <el-tab-pane label="团期/价格" name="second" :disabled='true'>
    	  <platoon></platoon>
	    </el-tab-pane>
	    <el-tab-pane label="行程安排" name="third" :disabled='true'>
	    	<arrange></arrange>
	    </el-tab-pane>
	    <el-tab-pane label="产品说明" name="fourth" :disabled='true'>
                <manual/>
        </el-tab-pane>
        <el-tab-pane label="产品图片" name="five" :disabled='true'>
            <pic/>
        </el-tab-pane>
	  </el-tabs>
	</div>
</template>
<style scoped>

@import '../../../../assets/pcCss/addProduct.css'

</style>
<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
import basic from './addProduct-basic'
import platoon from './addProduct-platoon.vue'
import manual from './addProduct-manual.vue'
import pic from './addProduct-pic.vue'
import arrange from './addProduct-route.vue'
	export default{
		data(){
			return{

      		}
		},
		created(){
			this.$http.axios({
                                url:this.$api.getProNum,
				                method:'get',
				            }).then(res=>{
				            	let proNum;
				            	if(res.routeProEntity){
				            		proNum=res.routeProEntity.proNum;
				            		res.type=1;
				            		this.oneCommit(res);
				            	}else{
				            		proNum=res.proNum;
				            	}
				            	console.log(res)
				            	this.createPronum(proNum);
				            })
		},
		computed:{
			...mapState('addPro',['proNum']),
            //获取第几个选项卡同时进行设置下一个选项卡的索引
            'activeName':{
                get:function(){
                    return this.$store.state.addPro.activeName;
                },
                set:function(){
                    return this.activeName;
                }
            }
		},
		monted:{

		},
		methods:{
			...mapActions('addPro',[
				'createPronum','oneCommit']),
      		handleOpen(key, keyPath) {
      		        console.log(key, keyPath);
      		      },
      		      handleClose(key, keyPath) {
      		        console.log(key, keyPath);
      		      }
		},
		components: {
			//基本信息
			basic,
			// 产品说明
			platoon,
			// 行程安排
			arrange,
	        manual,
	        // 产品图片
	        pic
		}
}
</script>
