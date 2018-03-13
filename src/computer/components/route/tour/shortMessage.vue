<template>
	<div id="tour-manage">
        <div class="manage-top">
            <div class="line">
                <span class="fir-span">旅游团状态</span>
                <template>
                    <el-radio v-model="splitType" label="1" @change="radioChange">未通知旅游团</el-radio>
                    <el-radio v-model="splitType" label="2" @change="radioChange">已通知旅游团</el-radio>
                </template>
            </div>
        </div>
		<div class="productManage-table right-content-index">
            <div class="mid-line">
                <div class="self-count" style="display:inline-block;">
					共
					<span class="colorSky"> {{totalCount}} </span> 个旅游团{{tourText}}
                    <!-- <el-button type="primary" size="small">导出为excel</el-button> -->
				</div>
                <div class="audit">
                    <span>团队编号</span>
                    <el-input class="thr-select" v-model="proSelfNums" placeholder="请输入内部编号" :maxlength="10" style="width:180px;"></el-input>
                    <span>发团日期</span>
                         <el-date-picker
                        v-model="tourStartTime"
                        type="date"
                        placeholder="选择日期" style="width:180px;">
                        </el-date-picker>
                    <el-button class="" type="primary" plain size='small' @click="search">搜索</el-button>
                    <el-button class="" type="primary" plain size='small' @click="goToInfo" v-show="splitType==='1'">开始通知</el-button>
                </div>
            </div>
			<el-table ref="testTable" :data="tableData" style="width:100%" @selection-change="handleSelectionChange" @row-click="handleclick" :row-class-name="tableRowClassName">
				<el-table-column type="selection" width="30"></el-table-column>
				<el-table-column type="index" label="序号" :index="indexMethod" width='60' align='center'>
				</el-table-column>
				<el-table-column label="产品名称" class-name="proNum" align="center">
					<template slot-scope="scope">
						<el-tooltip :content="tableData[scope.$index].proName" placement="bottom" effect="light">
							<div>
								{{tableData[scope.$index].proName}}
							</div>
						</el-tooltip>
					</template>
				</el-table-column>
                <el-table-column prop="teamSelfNum" label="团队编号" class-name="proNum" align="center" width="120"></el-table-column>
				<el-table-column :formatter='proLeaveTimeFuc' label="出发团期" width="120" align="center"></el-table-column>
				<el-table-column prop="visitorNum" label="人数" width="80" align="center"></el-table-column>
                
				<el-table-column prop="guideName" label="导游姓名" width="100" align="center"></el-table-column>
				<el-table-column prop="guidePhone" label="导游联系电话" width="120" align="center"></el-table-column>
				<el-table-column prop="plateNumber" label="交通信息" width="100" align="center"></el-table-column>
				<el-table-column label="团状态" width="100" align="center" >
					<template slot-scope="scope">
						<span v-show='tableData[scope.$index].isPlan==="0"'>未安排</span>
						<span v-show='tableData[scope.$index].isPlan==="1"'>未出发</span>
						<span v-show='tableData[scope.$index].isPlan==="2"'>进行中</span>
						<span v-show='tableData[scope.$index].isPlan==="3"'>已完成</span>
					</template>
				</el-table-column>
                <el-table-column label="团队详情" align="center" width="100">
					<template slot-scope="scope">
						<!-- <el-tooltip content="去支付" placement="bottom" effect="light"> -->
                           <el-button style="border:none;background:none;padding:0;" @click="goToDetail(scope.$index, scope.row)">
                                <span>详 情</span>
                           </el-button>
					</template>
				</el-table-column>
			</el-table>
			<div align="right" class="pagination">
				<div class="self-count">
					<!-- 共
					<span class="colorSky"> {{totalCount}} </span> 个产品
                    <el-button type="primary" size="small">导出为excel</el-button> -->
				</div>
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" :page-sizes="[10, 20, 30 ,40]" layout="sizes,prev, pager, next ,jumper" :total="totalCount">
				</el-pagination>
			</div>
		</div>
        <!-- 团队详情dialog -->
        <el-dialog
		title="团队详情" :visible.sync="tourDetailDialog"  width="650px" center>
            <div>
              <tour-detail :id='detailId' ref="load"></tour-detail>
            </div>
			<!-- <order-detail :orderId='detailId'></order-detail> -->
			<!-- <span slot="footer" class="dialog-footer">
				<el-button @click="splitTeamDialog = false">取 消</el-button>
				<el-button type="primary" @click="splitTeamDialog = false">确 定</el-button>
			</span> -->
		</el-dialog>
        <!-- 短信通知dialog -->
        <el-dialog
		title="短信通知" :visible.sync="showInfoDialog"  width="650px" center>
            <div>
                <div class="line">
                    <span>选择通知对象</span>
                    <el-checkbox-group v-model="infoValue" @change="handleCheckedInfoChange" style="display:inline-block;">
                        <el-checkbox v-for="info in infoArr" :label="info" :key="info">{{info}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="line">
                    <span>短信通知数量</span>
                    <span>共计需要发出 <span>20</span> 条短信</span>
                </div>
                <div class="line">
                    <span>短信剩余数量</span>
                    <span>目前账号剩余 <span>100</span> 条短信</span>
                </div>
            </div>
			<!-- <order-detail :orderId='detailId'></order-detail> -->
			<span slot="footer" class="dialog-footer">
				<!-- <el-button @click="splitTeamDialog = false">取 消</el-button> -->
				<el-button type="primary" @click="showInfoDialog = false">确定通知</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import tourDetail from '../../public/tourDetail.vue';
// import calander from '../../public/calander_price.vue';
export default {
	data() {
		return {
			
			detailId: '', // 订单编号
			checkValue: '',
			// 注册账户的类型 true:供应商；false:分销商
			registerType: true,
			registerTypeCom: true,
			cancleOrderDialog: false,
			tourDetailDialog: false, // 发团详情dialog
			showInfoDialog: false, //拆分团队
            proLeaveTime: '',

			linkPhone: '', //联系电话
			orderId: '', // 订单编号
			productArr: [
				{ proName: '全部产品', proNum: '' }
			],
			proNum: '', //产品名称
			proNum1: '', // 产品编号
			dataArr: [],
			
			tourStateArr: [
				{ label: '未安排旅游团', value: '0' },
				{ label: '未出发旅游团', value: '1' },
				{ label: '进行中旅游团', value: '2' },
				{ label: '已完成旅游团', value: '3' }
			],
            tourStateValue: '0',
            tourText:'未通知',
            tourStartTime: '',
			
			proSelfNums:'', // 内部编号
            splitType:'1',

            infoArr:['游客','导游','司机'],
            infoValue:[], // 短信选中
			//表格当前页数据
			tableData: [
            ],
            // 模态款多选
            dialogSelection:[],
            vistorTotal: 0, // 选择乘客
			//多选数组
			multipleSelection: [],
			//请求的URL
			// url: "newstu/querystudentbypage",
			//搜索条件
			criteria: '',
			//下拉菜单选项
			select: '',
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
			detailData: {
				name: '',
				mail: '',
				tel: '',
				distributorType: '',
				companyName: '',
				city: '',
				address: '',
				companyType: '',
				contactName: '',
				contactTel: ''
			}
		};
	},
	methods: {
		
		goToDetail(index, row) {
			this.detailId = row.id;
			if(this.$refs.load){
				this.$refs.load.loadData(this.detailId);
			}
			this.tourDetailDialog = true;
		},
		doSearchShow() {
			this.searchShow ? (this.searchShow = false) : (this.searchShow = true);
        },
		
		//从服务器读取数据
		loadData() {
			this.$http
				.axios({
					url:
						this.$api.getTeamItemByParamPaginate +
						'?start=' +
						(this.currentPage - 1) +
						'&size=' +
						this.pagesize,
					method: 'get',
					params: this.searchObj(),
					json: false
				})
				.then(res => {
					this.tableData = res.data;
					this.totalCount = res.total;
				});
		},
		
		// 序号
		indexMethod(index) {
			let num = (this.currentPage - 1) * this.pagesize + 1 + index;
			return num;
		},
		search() {
            this.loadData();
            // if (this.tourStateValue==='0') this.tourText = '未安排';
            // if (this.tourStateValue==='1') this.tourText = '未出发';
            // if (this.tourStateValue==='2') this.tourText = '进行中';
            // if (this.tourStateValue==='3') this.tourText = '已完成';
		},
		searchObj() {
			let obj = {};
			if(this.proSelfNums) obj.proSelfNum = this.proSelfNums; // 内部编号
			if(this.tourStartTime) obj.proLeaveTime = this.$commonUtils.DateUtils.formatDate(
					 this.tourStartTime,
					'yyyy-MM-dd'
                );; // 出发团期
           obj.isNotice = this.splitType==='1'? '0' : '1';
			// console.log(this.tourStartTime.substring(0,10));
			console.log(obj);
			return obj;
		},
		statuFunc(row, column, cellValue) {
			// console.log(row);
			// let obj = '';
			// if (row.isLine == '0') obj = '未上系统';
			// if (row.isLine == '1') obj = '已上系统';
			// return obj;
        },
        radioChange(){
            // 已通知未通知切换
            this.loadData();
			this.tourText = this.splitType === '1'?  '未通知' : '已通知'
        },
        goToInfo(){ // 点击开始通知
            this.showInfoDialog=true;
        },
        handleCheckedInfoChange(){
            console.log(this.infoValue);
        },
		//多选响应
		handleSelectionChange: function(val) {
			// console.log(val);
			this.multipleSelection = val;
		},
		//点击行响应
		handleclick: function(row, event, column) {
			this.highlightId = row.id;
		},

		changePage() {
			this.currentPage = 1;
		},
		//改变当前点击的行的class，高亮当前行
		tableRowClassName({ row, rowIndex }) {
			if (rowIndex % 2 == 1) {
				return 'info-row';
			}
			// if(row.isLine=='1'){
			//  return 'info-row-disable'
			// }
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
		proLeaveTimeFuc(row, column, cellValue){
			if(row.proLeaveTime!=null){
				return row.proLeaveTime.substring(0,10);
			}

		}
	},
	created() {
		this.loadData();
    },
    watch:{
        tableData:{ // 
            handler() {
				this.tableData.forEach((row, index) => {
                    for(let i =0;i<this.dialogSelection.length;i++){
                        // 演示选中奇数行
                        if (this.dialogSelection[i].proNum == row.proNum) {
                            this.$nextTick(() => {
                                this.$refs.splitTable.toggleRowSelection(row, true);
                            })
                        }
                    }
                })
			},
			deep: true
        }
    },
	components: {
		// employee,
        // calander,
        tourDetail
	}
};
</script>
<style lang='scss' scoped>
// @import '../../../../assets/pcCss/addProduct.css';
#tour-manage {
	color: #666;
	margin-top: 20px;
    .el-button {
        color: #45c8dc;
        background: #fff;
        border-radius: 4px;
    }
	.manage-top {
		width: 96%;
		margin: auto;
		overflow: hidden;
		opacity: 0.96;
		background: #ffffff;
		box-shadow: 0 0 5px 0 rgba(121, 121, 121, 0.32);
		border-radius: 4px;
        .line {
            height: 30px;
            line-height: 30px;
            margin: 10px 0;
            .fir-select {
                width: 29%;
            }
            .fir-span{
                margin: 0 20px;
            }
		}
		
	}
	.mid-line {
		overflow: hidden;
		padding: 10px;
        border-bottom: 1px solid #ddd; 
		.audit {
			float: right;
		}
        .self-count {
            line-height: 32px;
            width: 220px;
            .colorSky {
                color: #ff746f;
                font-size: 18px;
            }
            
        }
	}
	.productManage-table {
		height: 100%;
		margin: auto;
        margin-top: 10px;
		.colorOrg {
			color: #ff746f;
			cursor: pointer;
		}
		.el-table .proNum div {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		.pagination {
			margin-top: 15px;
			display: flex;
			.self-count {
				line-height: 32px;
				width: 220px;
				.colorSky {
					color: #ff746f;
					font-size: 18px;
				}
				
			}
		}
		.el-pagination {
			flex: 1;
		}
	}
	.colorOrg {
		color: #ff746f;
		font-size: 18px;
	}
	.el-dialog{
        .line{
            height: 50px;
            line-height: 50px;
        }
    }
}
</style>

