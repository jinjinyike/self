<template>
	<div>
		<div class="table">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange" class="_table">
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
				<el-table-column prop="leaveDate" label="出发团期" align="center">
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
				<el-table-column prop="price" label="订单金额" align="center">
				</el-table-column>
				<el-table-column prop="payStatu" label="支付类型" :formatter="formatStatu" align="center">
				</el-table-column>
				<el-table-column prop="type" label="订单类型" :formatter="formatType" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-dropdown trigger="hover" class="menu-wrapper" @command='orderHandle' style="padding-top:0px;float:none;">
							<span class="el-dropdown-link menu">
								下拉菜单
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item v-for="(opt,idx) in handleOpt" :command='[opt,scope.$index, scope.row]' :key="idx">{{opt}}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
			</el-table>
			<div align="right" class="pagination">
				<div class="self-count">
					共
					<span class="colorSky"> {{totalCount}} </span> 条数据
				</div>
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" :page-sizes="[10, 50, 100 ,200]" layout="total,sizes,prev, pager, next ,jumper" :total="totalCount">
				</el-pagination>
			</div>
		</div>
		<!-- 附加费 -->
		<el-dialog title="附加费" :visible.sync="dialogVisible1" width="30%" center>
			<div class="flex" style="margin-bottom:10px;">
				<div style="margin-right:10px;">增收金额</div>
				<div>
					<el-input v-model="extraChangePrice" placeholder="请输入内容"></el-input>元
				</div>
			</div>
			<div class="flex">
				<div style="margin-right:10px;">增收原因</div>
				<div style="width:75%;">
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="extraChangeRegard">
					</el-input>

				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
				<el-button type="primary" @click="submitExtraCharge">确认并发送</el-button>
			</span>
		</el-dialog>
		<!-- 变更价格 -->
		<el-dialog title="变更价格" :visible.sync="dialogVisible2" width="20%" center>
			<div>
				该订单价格
				<el-select v-model="optionsValue" placeholder="请选择" style="width:100px;">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-input v-model="changePriceNum" placeholder="请输入内容"></el-input>元

			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="changePrice">确认并发送</el-button>
			</span>
		</el-dialog>
		<!-- 确认审核通过 -->
		<el-dialog title="审核订单" :visible.sync="dialogVisible3" width="30%" center>
			<div style="text-align:center">确定审核通过吗？</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="auditSuccess">确定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="" :visible.sync="orderDetail" width="740px" @close='close'>
			<order-detail :orderId='detailId'></order-detail>
		</el-dialog>
		<!-- <pdf></pdf> -->
		<select-site :select-click='true' :pro-leave-time='row.leaveDate' :pro-num='row.proNum' :show-tab='showTab' @close='closeTab' :limit-num='row.visitorNum' :allow-load='allowLoad'></select-site>
	</div>
</template>
<script>
import orderDetail from './orderDetail.vue';
import pdf from './pdf';
import selectSite from './selectSite.vue';
export default {
	data() {
		return {
			allowLoad:false,
			// 控制是否顯示選座
			showTab: false,
			// 选座的人数限制
			row:{
				visitorNum: 0,
				leaveDate:'',
				proNum:'',},
			carInfo:[],
			isTrue:false,
			
			// 附加费
			dialogVisible1: false,
			// 变更价格
			dialogVisible2: false,
			dialogVisible3: false, //审核通过
			orderDetail: false,
			detailId: '',
			// 表格数据
			tableData: [],
			detailData: {
				// 产品编号
				proNum: '0101010',
				// 分销人员工号
				distributorNUm: '001',
				// 分销人员姓名
				distributorName: '欧阳',
				// 添加人员工号
				addPersonNum: '002',
				// 添加人员姓名
				addPersonName: '欧阳2',
				// 销售人员工号
				sellPersonNum: '003',
				// 销售人员姓名
				sellPersonName: '欧阳3',
				// 组团社
				zutr: '乐游旅游水木天成店',
				// 联系人姓名
				ContactName: '欧阳少华',
				// 联系人电话
				ContactTel: '15822455770',
				// 订单状态
				orderType: '未上系统',
				// 参团名称
				memberShipName: '泰国曼谷芭提雅激情双飞五晚七日游',
				// 发团时间
				startTime: '2017.12.02',
				// 联运城市
				cityTransport: ['北京'],
				// 报名的成人个数
				adultNum: '1',
				// 报名的儿童个数
				childNum: '1',
				// 老人个数
				oldNum: '1',
				// 预定酒店
				bookHotel: '四星级酒店',
				// 航空公司
				airName: '天津航空',
				// 航班号
				airNum: 'CA9080',
				// 起飞时间
				airStartTime: '18:00',
				// 抵达时间
				airStartEnd: '20:00',
				// 预留房间
				room: [
					{
						type: '大床房',
						num: '1'
					}
				],
				// 预留座位
				site: [
					{
						carNum: '1',
						siteNum: ['1', '2']
					}
				],

				// 集合日期
				gatherData: '2017.12.02',
				gatherDataTime: [
					{
						time: '09:00',
						place: '天津滨海国际机场T2航站楼总服务台旁',
						price: ''
					},
					{
						time: '09:00',
						place: '天津滨海国际机场T2航站楼总服务台旁',
						price: '20'
					}
				],
				// 订单金额
				orderPrice: '10002',
				// 联系人
				contactPerson: '苏简',
				// 联系电话
				contactTel: '13909092132',
				// 出行人
				tripPerson: [
					{
						name: '欧阳说话',
						tel: '12312313123'
					},
					{
						name: '欧阳说话',
						tel: '12312313123'
					}
				],
				remark1: '',
				remark2: '',
				remark3: ''
			},
			// 表格中选中复选框
			multipleSelection: [],
			handleOpt: ['查看详情', '通过审核', '不通过并退款', '增加附加费', '变更价格'],
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
			// 增收金额
			extraChangePrice: '',
			// 增收原因
			extraChangeRegard: '',
			options: [
				{
					value: '1',
					label: '增加'
				},
				{
					value: '0',
					label: '减少'
				}
			],
			optionsValue: '',
			changePriceNum: ''
		};
	},

	created() {
		this.loadData();
	},
	methods: {
		closeTab(carInfo){
			this.showTab = false;
			this.selectClick = false;
			this.allowLoad=false;
			console.log(carInfo)
			let vm=this;
			this.carInfo=[];
			let num=0;
			carInfo.forEach(function(item,index){
				if(item.cancel.length){
					vm.carInfo.push({carNum:item.carNum,seatBefore:item.cancel.join(','),carBeforeId:item.carMark})
					num+=item.cancel.length;
				}
			})
			if(this.row.visitorNum==num){
				this.isTrue=true;this.dialogVisible3=true; 
			} 

		},
		close() {
			this.detailId = '';
		},
		formatStatu(val) {
			return val.payStatu == 1 ? '已付款' : '待付款';
		},
		formatType(val) {
			return val.type == 1 ? '线上订单' : '线下订单';
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		//每页显示数据量变更
		handleSizeChange: function(val) {
			this.currentPage = 1;
			this.pagesize = val;
			this.loadData();
			// this.showDetailStaff({
			// 	departmentId: this.staff.departId
			// });
		},
		//页码变更
		handleCurrentChange: function(val) {
			this.currentPage = val;
			this.loadData();
			// this.showDetailStaff({
			// 	departmentId: this.staff.departId
			// });
		},
		// 操作里的选项
		orderHandle(command) {
			if (command[0] === '查看详情') {
				this.orderDetail = true;
				let index = command[2].orderId;
				this.detailId = index;

				return;
			}
			if (command[0] === '通过审核') {
				let index = command[2].orderId;
				this.detailId = index;
				this.isTrue=false;
				if(command[2].rest==1){
					this.allowLoad=true;
					this.row=command[2];
					this.showTab = true;
					console.log(this.row)
					return
				}
				this.dialogVisible3 = true;
				return;
			}
			if (command[0] === '不通过并退款') {
				return;
			}
			if (command[0] === '增加附加费') {
				this.dialogVisible1 = true;
				return;
			}
			if (command[0] === '变更价格') {
				this.dialogVisible2 = true;
				return;
			}
		},
		auditSuccess() {
			// if(this.allowLoad) 
			let obj={};
			obj.orderId=this.detailId;
			if(this.isTrue) obj.carSeatEntityList=this.carInfo;
			//审核通过
			this.$http
				.axios({
					url: this.$api.auditSuccess,
					method: 'post',
					data: obj,
					json:true,
				})
				.then(res => {
					this.dialogVisible3 = false;
					this.$message.success('审核通过');
					this.loadData();
				});
		},
		submitExtraCharge() {
			this.dialogVisible1 = false;
		},
		changePrice() {
			this.dialogVisible2 = false;
		},
		loadData() {
			this.$http
				.axios({
					url:
						this.$api.getOrderAuditList +
						'?start=' +
						(this.currentPage - 1) +
						'&size=' +
						this.pagesize,
					method: 'post',
					data: '',
					json: false
				})
				.then(res => {
					// console.log(res);
					this.tableData = res.data;
					this.totalCount = res.total;
				});
		},
		// 序号
		indexMethod(index) {
			let num = (this.currentPage - 1) * this.pagesize + 1 + index;
			return num;
		}
	},
	components: {
		orderDetail,
		pdf,
		selectSite
	}
};
</script>
<style lang="scss" scoped>
.flex {
	display: flex;
}
.pagination {
	margin-top: 15px;
	display: flex;
	width: 95%;
	margin: 0 auto;
	.self-count {
		line-height: 32px;
		width: 100px;
		.colorSky {
			// color: #43c8dc;
			color: #ff746f;
			font-size: 18px;
		}
	}
}
.el-pagination {
	flex: 1;
}
._table {
	width: 95%;
	margin: 20px auto;
}
.el-table__header {
	width: 100% !important;
}
.menu-wrapper {
	float: right;
	overflow: hidden;
	height: 20px;
	padding: 8px 10px 0 0;
}
.menu {
	display: inline-block;
	background: url('/static/img/menu.png') no-repeat center;
	background-size: contain;
	width: 20px;
	height: 20px;
	// float: right;
	color: transparent;
	cursor: pointer;
	outline: none;
}
.el-table .cell {
	color: red;
}
</style>