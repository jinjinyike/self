<template>
	<div id='edit-pro' class="right-content-index">
		<!-- <p class="item" style="text-align:center;">修改产品</p> -->
		<div class="item " style='margin-bottom:20px;'>
			<span class="span-title">产品名称</span>
			<el-select v-model="proNum" filterable placeholder="请选择" @change='changePro'>
			    <el-option
			      v-for="(item,index) in options1"
			      :key="index"
			      :value="item.proNum"
			      :label="item.proName"
			      >
			    </el-option>
			</el-select>
			<span class="span-color">—</span>
			<el-input placeholder='产品编号' style='width:15%' v-model="proNum1" v-on:input='flagProNum'></el-input>
			<span class="span-title right-title">选择修改项</span>
			<el-select v-model="opContent"  placeholder="请选择">
			    <el-option
			          v-for="item in options2"
			          :key="item.value"
			          :label="item.label"
			          :value="item.value"
			          >
			    </el-option>
			</el-select>
			<el-button type="primary" plain size='small' @click='getCon'>获取修改信息</el-button>
		</div>
		<!-- <div class="item" style="text-align:center;">
		</div> -->
		<div class="dot"></div>
		<basic v-if='basic1'></basic>
		<platoon v-if='platoon1'></platoon>
		<gather v-if='gather1||promition'></gather>
		<price v-if='priceList'></price>
		<decription1 v-if='decription'></decription1>
		<pic1 v-if='pic'></pic1>
		<route1 v-if='route'></route1>
		<pro-seat1 v-if='proSeat'></pro-seat1>
	</div>
</template>
<style scoped>
@import '../../../../assets/pcCss/addProduct.css';
@import '../../../../assets/pcCss/editRouteProduct.css';
</style>
<script>
import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import Validate from '@/common/validate/validate.js'
import basic from './editProduct-basic.vue'
import platoon from './editProduct-platoon.vue'
import gather from './editProduct-gather.vue'
import price from './editProduct-price.vue'
import decription1 from './editProduct-description.vue'
import pic1 from './editProduct-pic.vue'
import route1 from './editProduct-route.vue'
import proSeat1 from './editProduct-proSeat.vue'
	export default{
		data(){
			return {
				proNum: '',
				proNum1:'',
		        opContent: '',
		        basic1:false,
		        platoon1:false,
		        gather1:false,
		        promition:false,
		        priceList:false,
		        decription:false,
		        pic:false,
		        route:false,
		        proSeat:false,
				options1: [],
				options2: [{
				          value: '1',
				          label: '基本信息'
				        }, {
				          value: '2',
				          label: '产品团期'
				        }, {
				          value: '3',
				          label: '产品余位'
				        }, {
				          value: '4',
				          label: '产品价格'
				        }, {
				          value: '5',
				          label: '促销活动'
				        }, {
				          value: '6',
				          label: '集合信息'
				        },{
				          value: '7',
				          label: '行程安排'
				        },{
				          value: '8',
				          label: '产品说明'
				        }, {
				          value: '9',
				          label: '产品图片'
				        }],
			}
		},
		created(){
			let sent_data={valid:0};
			this.$http.axios({
				url:this.$api.getAllRouteProducts,
				method:'get',
				params:sent_data
			}).then((res)=>{
				this.options1=res;
			})
			// 审核员工
			this.$http.axios({
				url: this.$api.getEmployeeListByCurrentUser,
				method: 'get',
				// data: obj,
				json: true
			}).then(res => {
				let employeeList = [{label:"不限员工",value:'0'}];
				for (let i = 0; i < res.length; i++) {
					employeeList.push(res[i].statu=='0' ? {label:res[i].jobNumber+' '+res[i].name,value: res[i].userId,disabled:true}:{label:res[i].jobNumber+' '+res[i].name,value: res[i].userId})
				}
				// editPro提交员工List
				this.employeeArrStore(employeeList);		
			}).catch(err=>{
					// this.save=false;
			});

		},
		computed:{
				...mapState('editRoutePro',['SproNum','employeeArr']),
				'setPlatoon':{
					get(){
						return this.$store.state.editRoutePro.setPlatoon
					},
					set(){
						return this.setPlatoon
					}
				}
		},
		mounted(){
		},
		watch:{
			setPlatoon:{
				handler(){
					if(this.setPlatoon){
						this.platoon1=false
					}
				}
			}
		},
		methods:{
			...mapActions('editRoutePro',[
				'createPronum','basicStore','pltoonStore','gatherStore','promitionStore','setPlatoonStore','routeStore','restStore','employeeArrStore']),
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
			basicShare(){//获取基本信息
				this.$http.axios({
						url:this.$api.getRouteProEntity+'?proNum='+this.SproNum,
						method:'get',
					}).then((res)=>{
						this.basicStore(res)
					})
			},
			getPlatoonShare(){//获取团期
				this.$http.axios({
						url:this.$api.getRoutePlatoonDateList+'?valid=1&proNum='+this.SproNum,
						method:'get',
					}).then((res)=>{
						this.pltoonStore(res)
					})
			},
			getCon(){//获取修改项
				if(!this.proNum){
					return this.$message.error('请选择产品')
				}
				if(!this.opContent){
					return this.$message.error('请选择修改项')
				}
				this.basic1=false;
				this.platoon1=false;
				this.gather1=false;
				this.promition=false;
				this.priceList=false;
				this.decription=false;
				this.pic=false;
				this.route=false;
				this.proSeat=false,
				this.setPlatoonStore(false)
				this.createPronum(this.proNum)
				switch(this.opContent){
					case '1'://基本信息
					this.basic1=true;
					this.basicShare();
					break;
					case '2'://增减团期
					this.platoon1=true;
					this.getPlatoonShare();
					break;
					case '6'://集合信息
					this.gather1=true;
					this.getPlatoonShare();
					this.gatherStore(true);
					this.promitionStore(false);
					break;
					case '5'://促销信息
					this.promition=true;
					this.getPlatoonShare();
					this.basicShare();
					this.promitionStore(true);
					this.gatherStore(false);
					break;
					case '4'://价格体系
					this.priceList=true;
					this.basicShare();
					this.getPlatoonShare();
					break;
					case '8'://产品说明
					this.decription=true;
					this.basicShare();
					break;
					case '9'://产品图片
					this.pic=true;
					this.basicShare();
					break;
					case '7'://行程安排
					this.route=true;
					this.basicShare();
					this.$http.axios({
						url:this.$api.getRoutePlanEntityByProNum+'?proNum='+this.SproNum,
						method:'get',
					}).then((res)=>{
						this.routeStore(res)
					})
					break;
					case '3'://产品余位
					this.proSeat=true;
					this.$http.axios({
						url:this.$api.getRouteRestEveryDay+'?valid=1&plan=0&proNum='+this.SproNum,
						method:'get',
					}).then((res)=>{
						this.restStore(res.dateMapList);
					})
					break;

				}
			}
		},
		components:{
			basic,  //基本信息
			platoon, //增加团期，删除团期
			gather,//集合信息,促销信息
			price,//价格体系
			decription1,//产品说明
			pic1,//产品图片
			route1,//行程安排
			proSeat1//产品余位
		}

	}
</script>
