<template>
	<div class="" style='display:inline-block'>
			<!-- <span class="span-title">产品名称</span> -->
			<el-select v-model="proNum" filterable placeholder="请选择" :disabled='isDisable' @change='changePro' style='height:30px !important;'>
			    <el-option
			      v-for="(item,index) in options1"
			      :key="index"
			      :value="item.proNum"
			      :label="item.proName"
			      >
			    </el-option>
			</el-select>
			<span class="span-color">—</span>
			<el-input placeholder='产品编号' :style='{width:setWidth}' v-model="proNum1" v-on:input='flagProNum' :disabled='isDisable'></el-input>
		</div>
</template>
<script>
import Validate from '@/common/validate/validate.js'
	export default{
		props:{
			valid:Number,
			default:function(){
				return 0
			},
			setWidth:String,
			default:function(){
				return '150px'
			},
			isDisable:Boolean,
			dafault:function(){
				return false
			}
		},
		data(){
			return{
				proNum: '',
				proNum1:'',
				options1: [],
			}
		},
		created(){
			let sent_data={valid:this.valid};
			this.$http.axios({
				url:this.$api.getAllRouteProducts,
				method:'get',
				params:sent_data
			}).then((res)=>{
				this.options1=res;
			})
		},
		watch:{
			proNum:function(){
				this.$emit('change');
			}
		},
		methods:{
			changePro(){
				this.proNum1=this.proNum;
			},
			flagProNum(){//产品编号
				this.$nextTick(() => {
                                this.proNum1=Validate.checkNum(this.proNum1).slice(0,12);
                            })
				if(this.proNum1.length==12){
					let vm=this;
					let index1;
					this.options1.forEach(function(item,index){
						if(vm.proNum1==item.proNum){
							return index1=index
						}
					})
					if(String(index1)){
						this.proNum=this.proNum1;
					}
				}else{
					this.proNum='';
				}
			},
		}
	}
</script>
<style scoped>
	@import '../../../assets/pcCss/addProduct.css';
	.el-input,.el-select,.el-textarea{
		margin:0 10px;
	}
	.el-input__inner{
		height:30px;
	}
</style>