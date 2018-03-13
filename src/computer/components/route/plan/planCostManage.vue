<template>
	<div class="right-content-index">
		<div class="item-bottom">
					<el-table
					    :data="tableData"
					    style="width: 100%">
					    <el-table-column type="index" label="序号" width="80" align="center" :index="indexMethod"></el-table-column>
					    <el-table-column
					      label="计划位名称" align="center">
					      <template slot-scope="scope">
						    <el-tooltip :content="scope.row.restName" placement="bottom" effect="light">
                            <div>
                                {{scope.row.restName}}
                            </div>
                        	</el-tooltip>
					      </template>
					    </el-table-column>
					    <el-table-column prop="restType" label="计划位类型" width="100" align="center"></el-table-column>
					    <el-table-column label="计划位数量"  width="100" align="center" prop="restOriginAccount"></el-table-column>
					    <el-table-column label="计划位日期"  width="120" align="center" prop="restDay"></el-table-column>
					    <el-table-column label="计划位费用"  width="130" align="center" prop="totalPrice"></el-table-column>
					    <el-table-column label="申请日期"  width="120" align="center" prop="applyTime"></el-table-column>
					    <el-table-column label="费用修改" width="100" align="center">
					      <template slot-scope="scope" v-if='scope.row.restType!="其他"'>
					      	<span class="blue" @click='editCost(scope.$index)'>修改</span>
						  </template>
					    </el-table-column>
					    <el-table-column label="打款进程"  width="100" align="center">
					      <template slot-scope="scope" v-if='scope.row.restType!="其他"'>
					      	<span v-if='scope.row.account>0' class="blue" @click='addPro(scope.$index,1)'>查看</span>
					      	<span v-else class="blue" @click='addPro(scope.$index,0)'>未安排</span>
						  </template>
					    </el-table-column>
				        
					  </el-table>
				</div>
				<div class="item-bottom pagination"  align="right" >
			<el-pagination background
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="currentPage"
			      :page-sizes="[10, 50, 100, 150]"
			      :page-size="pagesize"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="totalCount">
			    </el-pagination>
		</div>

		<!-- 添加计划位日期数量 -->
		<el-dialog title="修改计划位预算" :visible.sync="dialogVisible0"  width="75%" center="">
		<div class="item-bottom" v-if='tableData1.length'>
				<el-table
				    :data="tableData1"
				    border
				    style="width: 100%">
				    <el-table-column prop="restDay" label="日期" width="100" align="center"></el-table-column>
				    <el-table-column prop="restAccount"  label="数量"  width="80" align="center"></el-table-column>
				    <el-table-column prop="fligtCom" label="航空公司" width="" v-if='planType=="飞机"' align="center"></el-table-column>
				    <el-table-column prop="fightInfo" label="航空信息" width="" v-if='planType=="飞机"' align="center"></el-table-column>
				    <el-table-column prop="trainInfo" label="火车信息" width="" v-if='planType=="火车"' align="center"></el-table-column>
				    <el-table-column prop="trainNum" label="车辆信息" width="" v-if='planType=="火车"' align="center"></el-table-column>
				    <el-table-column prop="pierInfo"  label="码头信息" width="" v-if='planType=="轮船"' align="center"></el-table-column>
				    <el-table-column prop="pierNum" label="船名/航次" width="" v-if='planType=="轮船"' align="center"></el-table-column>
				    <el-table-column prop="totalPrice" label="计划位预算" align="center" ></el-table-column>
				    <el-table-column prop="applyTime" label="申请时间" align="center" width="150"> </el-table-column>
				    	<el-table-column  label="修改费用"  align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.editCostNum' placeholder='金额' v-on:input='checkNum1'></el-input>
				      </template>
				    </el-table-column>
				  </el-table>
		</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible0 = false">取 消</el-button>
		    <el-button type="primary" @click="sureEditCost">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 计划打款进程 -->
		<el-dialog title="计划位打款进程" :visible.sync="dialogVisible1"  width="75%" center>
		<div class="item-bottom" v-if='tableData1.length'>
				<el-table
				    :data="tableData1" border style="width: 100%">
				    <el-table-column prop="restDay" label="日期" width="100" align="center"></el-table-column>
				    <el-table-column prop="restAccount"  label="数量"  width="80" align="center"></el-table-column>
				    <el-table-column prop="fligtCom" label="航空公司" width="" v-if='planType=="飞机"' align="center"></el-table-column>
				    <el-table-column prop="fightInfo" label="航空信息" width="" v-if='planType=="飞机"' align="center"></el-table-column>
				    <el-table-column prop="trainInfo" label="火车信息" width="" v-if='planType=="火车"' align="center"></el-table-column>
				    <el-table-column prop="trainNum" label="车辆信息" width="" v-if='planType=="火车"' align="center"></el-table-column>
				    <el-table-column prop="pierInfo"  label="码头信息" width="" v-if='planType=="轮船"' align="center"></el-table-column>
				    <el-table-column prop="pierNum" label="船名/航次" width="" v-if='planType=="轮船"' align="center"></el-table-column>
				    <el-table-column prop="totalPrice" label="计划位费用" align="center" ></el-table-column>
				    <el-table-column prop="applyTime" label="申请时间" align="center" width="150"> </el-table-column>
				  </el-table>
		</div>
		<div class="item-bottom" v-if='isShow==1'>
			<span style="display:inline-block;width:90px">此计划位共分</span>
			<el-select v-model='times' @change='changeTime'>
				<el-option v-for='item in 10' :label='item' :value='item' :key='item'></el-option>
			</el-select>
			次给
			<span v-if='planType=="飞机"'>航空公司</span>
			<span v-else-if='planType=="火车"'>铁路公司</span>
			<span v-else-if='planType=="轮船"'>轮渡公司</span>
			打款
		</div>
		<div class="item-bottom" v-for='(item,index) in moneyArr' v-if='isShow==1'>
			<span style="display:inline-block;width:90px">第{{index+1}}次打款</span>
			<!-- <span>时间</span> -->
			<el-date-picker v-model="item.feeTime"  type="datetime" placeholder="选择日期时间" :picker-options="pickerOptions1"></el-date-picker>
			<!-- <span>金额</span> -->
			<el-input v-model='item.feeTotal' placeholder='金额' v-on:input='checkNum2(index)'></el-input>
		</div>
		<div class="item-bottom" v-for='(item,index) in showArr' v-if='isShow!=1'>
			<span style="display:inline-block;width:90px">第{{item.feePer}}次打款</span>
			<span>时间</span>
			<span style="margin-right:20px">{{item.feeTime}}</span>
			<span>金额</span>
			<span>{{item.feeTotal}}元</span>
		</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible1 = false">取 消</el-button>
		    <el-button type="primary" @click="addMoney">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
import Validate from '../../../../common/validate/validate.js'
	export default{
		data(){
			return{
				tableData: [],
				//默认每页数据量
				pagesize: 10,
				//默认高亮行数据id
				highlightId: -1,
				//当前页码
				currentPage: 1,
				//查询的页码
				start: 1,
				//默认数据总数
				totalCount: 0,
				tableData1:[],
				dialogVisible0:false,//修改费用模态框
				dialogVisible1:false,//打款信息模态框
				times:'',
				moneyArr:[],
				pickerOptions1: {
		          disabledDate(time) {
		            return time.getTime() < Date.now();
		          }},
		          isShow:'',
		          showArr:[],
		          planType:''
			}
		},
		created(){
			this.loadData();
		},
		methods:{
			checkNum2(index){//校验打款金额8位数
				let obj=this.moneyArr[index].feeTotal;
				if(obj){
					this.$nextTick(()=>{
						this.moneyArr[index].feeTotal=Validate.checkNum(obj).slice(0,8);
					})
				}
			},
			checkNum1(){//校验修改费用8位数
				if(this.tableData1[0].editCostNum){
					this.$nextTick(()=>{
						this.tableData1[0].editCostNum=Validate.checkNum(this.tableData1[0].editCostNum).slice(0,8)
					})
				}
			},
			addMoney(){//添加打款信息
				console.log(this.moneyArr)
				let obj=this.moneyArr;
				for(let i=0;i<obj.length;i++){
					let item=obj[i];
					if(!item.feeTime) return this.$message.error('打款时间未填写完整');
					if(!item.feePer) return this.$message.error('打款金额未填写完整');
					item.feeTime=item.feeTime.getTime();
				}
				this.$http.axios({
					url:this.$api.insertRouteRestFee,
					method:'post',
					json:true,
					data:this.moneyArr
				}).then(res=>{
					if(res==1) this.$message.success('添加成功')
					this.dialogVisible1=false;
					this.loadData();
				})
			},
			changeTime(){//打款次数自动变化
				let num=this.times;
				this.moneyArr=[];
				for(let i=0;i<num;i++){
					this.moneyArr.push({
						feePer:i+1,
						feeTime:'',
						feeTotal:'',
						restDayId:this.tableData1[0].id
					})
				}
			},
			addPro(index,type){//修改费用显示
				if(type==1){//查看
					this.isShow=0;
					this.showArr=[];
					this.$http.axios({
						url:this.$api.findByRouteRestFee,
						method:'get',
						params:{restId:this.tableData[index].id}
					}).then(res=>{//回显费用信息
						let item=res.routeRestDay;
						let obj=[];
						obj.push({
							applyTime:item.applyTime,
							restDay:item.restDay,
							restAccount:item.restAccount,
							totalPrice:item.totalPrice,
							id:item.id,
							fightInfo:item.fightInfo,
							fligtCom:item.fligtCom,
							pierInfo:item.pierInfo,
							pierNum:item.pierNum,
							trainInfo:item.trainInfo,
							trainNum:item.trainNum,
							editCostNum:'',
						})
					this.tableData1=obj;

					this.planType=this.tableData[index].restType;
					let arr=[];
					res.routeRestFee.forEach(function(item,index){
						arr.push({
							feeTime:item.feeTime,
							feeTotal:item.feeTotal,
							feePer:item.feePer,
						})
					})
					this.showArr=arr;
					this.dialogVisible1=true;

					})
				}else{
					this.moneyArr=[];
					this.times='';
					this.isShow=1;
					this.showShare(index,1);
					// this.dialogVisible1=true;
				}
			},
			sureEditCost(){//确定修改费用
				if(!this.tableData1[0].editCostNum) return this.$message.error('未填写费用');
				let obj={id:this.tableData1[0].id,totalPrice:this.tableData1[0].editCostNum}
				this.$http.axios({
					url:this.$api.updateRouteRestDay,
					method:'post',
					json:true,
					data:obj
				}).then(res=>{
					if(res==1) this.$message.success('修改成功')
						this.dialogVisible0=false;
				})

			},
			showShare(index,type){
				let id=this.tableData[index].id;
				this.tableData1=[];
				this.$http.axios({
					url:this.$api.findById+id,
					method:'get'
				}).then(res=>{
					let item=res;
					let obj=[];
						obj.push({
							applyTime:item.applyTime,
							restDay:item.restDay,
							restAccount:item.restAccount,
							totalPrice:item.totalPrice,
							id:item.id,
							fightInfo:item.fightInfo,
							fligtCom:item.fligtCom,
							pierInfo:item.pierInfo,
							pierNum:item.pierNum,
							trainInfo:item.trainInfo,
							trainNum:item.trainNum,
							editCostNum:'',
						})
					this.tableData1=obj;
					this.planType=this.tableData[index].restType;
					if(type==1){
						this.dialogVisible1=true;
					}else{
						this.dialogVisible0=true;
					}
				})
			},
			editCost(index){//修改费用
				this.showShare(index,0);
				// this.dialogVisible0=true;
			},
			loadData(){
				this.$http.axios({
					url:this.$api.getRouteRestMapList,
					method:'get',
					params:{pageNumber:this.currentPage,pageSize:this.pagesize}
				}).then(res=>{
					this.totalCount=res.total;
					let obj=[];
					let vm=this;
					res.routeRestMapList.forEach(function(item,index){
						obj.push({
							id:item.id,
							account:item.account,
							restDay:item.restDay,
							restName:item.restName,
							restOriginAccount:item.restOriginAccount,
							restType:vm.planType1(item.restType),
							totalPrice:item.totalPrice,
							applyTime:item.applyTime
						})
					})
					this.tableData=obj;
				})
			},
			planType1(obj){//计划类型转换
				switch(obj){
					case '0':
						return '飞机';
						break
					case '1':
						return '轮船';
						break
					case '2':
						return '火车';
						break
					case '3':
						return '其他';
						break			
				}
			},
			changePage() {
			  this.currentPage = 1;
			},
			//每页显示数据量变更
	        handleSizeChange: function(val) {
	            this.changePage();
	            this.pagesize = val;
	            this.loadData();
	        },
	        //页码变更
	        handleCurrentChange: function(val) {
	            this.currentPage = val;
	            this.loadData();
	        },
	        // 序号
	        indexMethod(index) {
	          let num = (this.currentPage - 1) * this.pagesize + 1 + index;
	          return num;
	        },
		}
	}
</script>
<style scoped>
	.item-bottom{
		margin-bottom: 10px;
	}
	.el-input,.el-select{
		margin:0 10px;
	}
	.blue{
		color:#45C8DC;
		cursor: pointer;
	}
</style>