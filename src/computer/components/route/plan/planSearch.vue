<template>
	<div class="right-content-index">
		<div class="item " style='margin-bottom:20px;'>
			<span class="span-title">计划位名称</span>
			<el-select v-model="restNum" filterable placeholder="请选择" @change='changePro'>
			    <el-option
			      v-for="(item,index) in options1"
			      :key="index"
			      :value="item.restNum"
			      :label="item.restName"
			      >
			    </el-option>
			</el-select>
			<span class="span-color">—</span>
			<el-input placeholder='计划位编号' style='width:15%' v-model="restNum1" v-on:input='flagProNum'></el-input>
			<span class="span-title right-title">选择日期</span>
			<el-input placeholder='选择团期' style='width:15%' @focus='focus'  v-model='proLeaveTime' :disabled='isDisabled'></el-input>
			<el-button type="primary" plain size='small' @click='getCon'>查询</el-button>
		</div>
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange" class="_table" style='margin-bottom:10px'>
				<el-table-column type="selection">
				</el-table-column>
				<el-table-column label="序号" :index="indexMethod" width='60' type='index' align="center">
				</el-table-column>
				<el-table-column prop="proName" label="产品名称" align="center">
					<template slot-scope="scope">
						<el-tooltip :content="tableData[scope.$index].proName" placement="bottom" effect="light">
							<div>
								{{tableData[scope.$index].proName}}
							</div>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column prop="LeaveDate" label="出发团期" align="center">
				</el-table-column>
				<el-table-column label="数量" prop="visitorNum" width='60' align="center">
				</el-table-column>
				<el-table-column label="分销商" align="center">
					<template slot-scope="scope">
						<el-tooltip :content="tableData[scope.$index].distributor" placement="bottom" effect="light">
							<div>
								{{tableData[scope.$index].distributor}}
							</div>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column prop="linkName" label="联系人" align="center">
				</el-table-column>
				<el-table-column prop="linkPhone" label="联系电话" width="120" align="center">
				</el-table-column>
				<el-table-column label="订单详情" align="center">
					<template slot-scope="scope">
						<span class="blue" @click='order(scope.row.orderId)'>详情</span>
					</template>
				</el-table-column>
			</el-table>
			<div align="right" class="pagination">
				<div class="self-count">
                    <el-button type="primary" plain size="small" @click='exportExl'>打印名单</el-button>
				</div>
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" :page-sizes="[10, 50, 100 ,200]" layout="total,sizes,prev, pager, next ,jumper" :total="totalCount">
				</el-pagination>
			</div>
			<!-- 日历模态框 -->
		<el-dialog
		  title="" :visible.sync="dialogVisible"  width="560px">
		  <calander v-if='dialogVisible' :obj='dataArr' :canClick='true' :isSingle='true' @getdata='getData'></calander>
		</el-dialog>
		<el-dialog
		title="" :visible.sync="orderDetail"  width="740px">
			<order-detail :orderId='detailId'></order-detail>
		</el-dialog>
	</div>
</template>
<script>
import calander from '../../public/calander_price.vue'
import orderDetail from '../order/orderDetail.vue'
	export default{
		data(){
			return{
				options1:[],
				restNum1:'',
				restNum:'',
				restId:'',
				detailId:'',
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
				tableData: [],
				proLeaveTime:'',
				dataArr:[],
				dialogVisible:false,
				orderDetail:false,
				isDisabled:true,
				sent:{}
			}
		},
		created(){
			this.$http.axios({
				url:this.$api.getRestListByCurrentUser,
				method:'get'
			}).then(res=>{
				let vm=this;
				res.forEach(function(item,index){
					let obj={
						restName:item.restName,
						restNum:item.restNum,
						restId:item.id
					}
					vm.options1.push(obj)
				})
			})
			this.loadData()
		},
		components:{
			orderDetail,
			calander
		},
		watch:{
			restNum:function(){
				this.change()
			}
		},
		methods:{
			exportExl(){

			},
			order(id){
				this.detailId=id;
				this.orderDetail=true;
			},
			getData(data){
				this.proLeaveTime=data;
				this.dialogVisible=false;
			},
			//多选响应
			handleSelectionChange: function(val) {
				console.log(val);
				this.multipleSelection = val;
			},
			focus(){
				this.dialogVisible=true;
			},
			getCon(){//查询
				this.sent={};
				if(this.proLeaveTime) this.sent.proLeaveTime=this.proLeaveTime;
				if(this.restNum) this.sent.restNum=this.restNum;
				this.loadData();
				
			},
			changePro(){//请求日期
				this.restNum1=this.restNum;
				
			},
			change(){
				let index1;
				this.isDisabled=true;
				this.proLeaveTime='';//清空日期
				this.dataArr=[];//清空日期数组
				if(this.restNum){
					let vm=this;
					this.options1.forEach(function(item,index){
						if(vm.restNum==item.restNum){
							return index1=index
						}
					})
				this.restId=this.options1[index1].restId;
					this.$http.axios({
					url:this.$api.getRouteDayRestByRestId,
					method:'get',
					params:{restId:this.restId}
				}).then(res=>{
					console.log(res)
					let obj=[];
					res.forEach(function(item,index){
						obj.push({
							day:item,
							price:'$'
						})
					})
					this.dataArr=obj;
					this.isDisabled=false;
				})
				}
			}, 
			flagProNum(){
				this.$nextTick(() => {
                                this.restNum1=this.$validate.checkNum(this.restNum1).slice(0,12);
                            })
				if(this.restNum1.length==12){
					let vm=this;
					this.options1.forEach(function(item,index){
						if(vm.restNum1==item.restNum){
							vm.restNum=vm.restNum1;
							return 
						}
					})
				}else{
					this.restNum='';
				}
			},
			loadData(){
				this.$http
				.axios({
					url:
						this.$api.getOrderRestList +'?pageNumber=' +this.currentPage +'&pageSize=' +this.pagesize,
					method: 'get',
					params: this.sent,
				})
				.then(res => {
					console.log(res)
					this.tableData = res.retList;
					this.totalCount = res.total;
				});
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
.item{
	margin:10px 10px;
}
.el-input,.el-select{
	margin: 0 10px;
}
.right-content-index{
	color:#666;
}
.blue{
	color:#45C8DC;
	cursor: pointer;
}
.self-count{
	float: left;
	margin-left:15px;
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
</style>