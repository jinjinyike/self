<template>
	<div class="con">
		<div class="item-bottom">
			<span class="span-title">计划位名称</span>
			<el-input placeholder='计划位名称,20字以内' style='width:25%' v-model='restName' :maxlength='20'></el-input>
			<span class="span-title">计划位类型</span>
			<el-select v-model='planType'>
				<el-option v-for='item in option' :key='item.value' :value='item.value' :label='item.label'></el-option>
			</el-select>
		</div>
		<div class="dot"></div>
		<div class="item-bottom">
			<span>计划位信息</span>
			<calander :obj='obj1' ref='calander' @getdata='setData' :showPrice='true'></calander>
		</div>
		<div class="dot"></div>
		<template >
		<div class="item-bottom" style="text-align:left">
			<el-button type="primary" plain size='small' @click='addNum'>添加数量</el-button>
			<el-button type="primary" plain size='small' @click='getTable' v-if='planType!=3' style='margin-left:38%'>下一步</el-button>
		</div>
		<div class="dot"></div>
		</template>
		<!-- <div class="item-bottom">
			<span>计划位预算</span>
		</div> -->
		<div class="item-bottom" v-if='tableData3.length&&planType!=3'>
				<el-table
				    :data="tableData3"
				    border
				    style="width: 100%">
				    <el-table-column prop="date" label="日期" width="100" align="center"></el-table-column>
				    <el-table-column prop="amount"  label="数量"  width="80" align="center"></el-table-column>
				    <el-table-column label="航空公司" width="" v-if='planType==0' align="center">
				      <template slot-scope="scope">
				      	<el-select  v-model='scope.row.fligtCom'>
				      		<el-option v-for='item in option1' :key='item.value' :label='item.label' :value='item.value'></el-option>
				      	</el-select>
				      </template>
				    </el-table-column>
				    <el-table-column label="航空信息" width="" v-if='planType==0' align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.fightInfo' placeholder='航次'></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column label="火车信息" width="" v-if='planType==2' align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.trainInfo' placeholder='火车信息'></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column label="车辆信息" width="" v-if='planType==2' align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.trainNum' placeholder='车辆信息'></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column label="码头信息" width="" v-if='planType==1' align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.pierInfo' placeholder='码头信息'></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column label="船名/航次" width="" v-if='planType==1' align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.pierNum' placeholder='船名/航次'></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column label="计划位单价" width="" align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.unitPrice' v-on:input="checkNum4(scope.$index)" placeholder='单价'></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column label="计划位预算" width="" align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.price'></el-input>
				      </template>
				    </el-table-column>
				    <!-- <el-table-column
				      label="修改预算">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.address'></el-input>
				      </template>
				    </el-table-column> -->
				    <el-table-column label="申请时间" align="center" width="170">
				      <template slot-scope="scope">
				      	<el-date-picker 
				      	      v-model="scope.row.applicationTime" type="date"
				      	      placeholder="选择日期" :picker-options="pickerOptions1" style='width:140px'>
				      	    </el-date-picker>
				      </template>
				    </el-table-column>
				  </el-table>
		</div>
		<div class="dot" v-if='tableData3.length&&planType!=3'></div>
		<div class="item-bottom button-area" v-if='(tableData3.length||planType==3)&&planType' style='text-align:center'>
			<el-button type="primary" plain  size='middle' @click='addPlan'>确定添加</el-button>
		</div>
		<el-dialog
		  title=""
		  :visible.sync="dialogVisible"
		  width="30%"
		  >
		  <div><span>设置计划位数量</span><el-input placeholder='计划位数量' v-model='num' v-on:input="checkNum1"></el-input></div>
		  <span slot="footer" class="dialog-footer">
		    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
		    <el-button type="primary" @click="submitData">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
import calander from '../../public/calander.vue'
import flyList from '../../public/flySet.js'
import Valiate from '../../../../common/validate/validate.js'
	export default{
		data(){
			return{
				dialogVisible: false,
				restName:'',
				num:'',
				obj1:[],
				planType:'',
				option:[{value:'0',label:'飞机'},{value:'2',label:'火车'},{value:'1',label:'轮船'},{value:'3',label:'其他'}],
				option1:flyList,
				pickerOptions1: {
		          disabledDate(time) {
		            return time.getTime() < Date.now();
		          }},
				tableData3: []
			}
		},
		methods:{
			addPlan(){//确定添加
				let obj={};
				if(!this.restName) return this.$message.error('未填写计划位名称');
				if(!this.planType) return this.$message.error('未选择计划位类型');
				obj.routeRestEntity={};
				obj.routeRestEntity.restName=this.restName;
				obj.routeRestEntity.restType=this.planType;
				if(this.planType==3){
					if(!this.obj1.length) return this.$message.error('未选择日期');
					obj.routeRestDayEntityList=[];
					this.obj1.forEach(function(item,index){
						obj.routeRestDayEntityList.push({
							restDay:new Date(item.day).getTime(),
							restAccount:item.price,
							restOriginAccount:item.price
						})
					})
				}else{//另外三种方式
					obj.routeRestDayEntityList=[];
					for(let i=0;i<this.tableData3.length;i++){
						let item =this.tableData3[i];
						let tip='第'+(i+1)+'条';
						if(!item.unitPrice) return this.$message.error(tip+'未填写单价');
						if(!item.price) return this.$message.error(tip+'未填写预算');
						if(!item.applicationTime) return this.$message.error(tip+'未选择申请时间');
						let obj1={};
						obj1.restDay=new Date(item.date).getTime();
						obj1.restAccount=item.amount;
						obj1.restOriginAccount=item.amount;
						obj1.unitPrice=item.unitPrice;
						obj1.totalPrice=item.price;
						obj1.applyTime=item.applicationTime.getTime();
						if(this.planType==0){
							if(!item.fligtCom) return this.$message.error(tip+'未选择航空公司');
							if(!item.fightInfo) return this.$message.error(tip+'未填写航班');
							obj1.fligtCom=item.fligtCom;
							obj1.fightInfo=item.fightInfo;
						}
						if(this.planType==1){
							if(!item.pierInfo) return this.$message.error(tip+'未填写码头信息');
							if(!item.pierNum) return this.$message.error(tip+'未填写航次');
							obj1.pierInfo=item.pierInfo;
							obj1.pierNum=item.pierNum;
						}
						if(this.planType==2){
							if(!item.trainInfo) return this.$message.error(tip+'未填写火车信息');
							if(!item.trainNum) return this.$message.error(tip+'未填写车辆信息');
							obj1.trainInfo=item.trainInfo;
							obj1.trainNum=item.trainNum;
						}
						obj.routeRestDayEntityList.push(obj1)
					}
				}
				console.log(obj)
				this.$http.axios({
					url:this.$api.addRouteRestEntity,
					method:'post',
					json:true,
					data:obj
				}).then(res=>{
					if(res==1) this.$message.success('添加成功')
				})

			},
			getTable(){//生成计划位预算
				if(!this.planType) return this.$message.error('未选择计划位类型');
				if(!this.obj1.length) return this.$message.error('未选择日期');
				let arr=[];
				for(let i=0;i<this.obj1.length;i++){
					let item=this.obj1[i];
					if(item.price=='$') return this.$message.error('有日期未设置数量');
					arr.push({date: item.day,
					          amount: item.price,//数量
					          applyTime: '',
					          unitPrice:'',//单价
					          price:'',//总价
					          fightInfo:"",
								fligtCom:"",
								pierInfo:"",//码头信息
								pierNum:"",//轮船航次
								trainInfo:"",//火车信息
								trainNum:""})
				}
				this.tableData3=arr;
			},
			checkNum1(){//校验数量6位
				this.$nextTick(()=>{
					this.num=Valiate.checkNum(this.num).slice(0,6);
				})
			},
			checkNum4(index){//校验单价6位
				this.$nextTick(()=>{
					this.tableData3[index].unitPrice=Valiate.checkNum(this.tableData3[index].unitPrice).slice(0,6);
					this.tableData3[index].price=this.tableData3[index].amount*this.tableData3[index].unitPrice
				})
			},
			setData(data,index){
				this.obj1=data;
			},
			addNum(){//添加数量
				if(!this.obj1.length) return this.$message.error('未选择日期')
				this.dialogVisible=true;
				this.num='';
			},
			submitData(){//提交数量并初始化日历显示
				if(!this.num) return this.$message.error('未填写数量')
				this.dialogVisible=false;
				let vm=this;
				this.obj1.forEach(function(item,index){
					if(!item.isSet){
						item.price=vm.num;
						item.isSet=true;
					}
				})
				let cur=this.$refs.calander.currentYear+'-'+this.$refs.calander.currentMonth+'-'+'1';
				this.$refs.calander.initData(cur)
			},
			handleClose(done) {
			        this.$confirm('确认关闭？')
			          .then(_ => {
			            done();
			          })
			          .catch(_ => {});
			      }
		},
		components:{
			calander
		}
	}
</script>
<style lang='scss' scoped>
	.con{
		padding:10px 20px;
		color: #666;
	}
	.dot{
		margin :20px 0;
		border-bottom: 1px dashed #ddd;
	}
	.item-bottom{
		margin-bottom: 10px;
	}
	.el-input,.el-select{
		margin:0 10px;
	}
	.el-table__body{
		.el-input,.el-select{
			margin:0;
		}
	}
	/*small按钮*/
.el-button--small {
    height: 30px;
    border-radius: 0;
    background-color: white;
    border-color: #45C8DC;
}

.el-button--primary.is-plain:hover,
.el-button--primary.is-plain:focus {
    background: white;
    color: #45C8DC;
}
/*公共按钮*/
.button-area .el-button--primary.is-plain:hover,
.button-area .el-button--primary.is-plain:focus{
    background-color: #45C8DC;
    color: white;
}
</style>