<template>
	<div id="tour-manage">
		<div class="manage-top">
            <div>
                <div class="top-title">
                    <p style="margin-top:5px;">团队编号</p>
                </div>
                <div class="top-main">
                    <div class="line">
                        <!-- <span>团队编号</span> -->
                        <el-input class="thr-select" placeholder="请输入团队编号" :maxlength="10"></el-input>
                        <span>发团日期</span>
                         <el-date-picker
                        v-model="tourStartTime"
                        type="date"
                        placeholder="选择日期" style="width:17%">
                        </el-date-picker>
                    </div>
                    
                </div>
            </div>
			<div class="search">
				<el-button type="primary" plain size='small' @click="search">查询</el-button>
			</div>
		</div>
		<div class="productManage-table right-content-index">
            <!-- <div class="mid-line">
            </div> -->
			<el-table ref="testTable" :data="tableData" style="width:100%" @selection-change="handleSelectionChange" @row-click="handleclick" :row-class-name="tableRowClassName">
				<el-table-column type="selection" width="30"></el-table-column>
				<el-table-column type="index" label="序号" :index="indexMethod" width='60' align='center'>
				</el-table-column>
                <el-table-column prop="teamSelfNum" label="团队编号" class-name="proNum" align="center" width="160"></el-table-column>
				<el-table-column label="产品名称" class-name="proNum" align="center">
					<template slot-scope="scope">
						<el-tooltip :content="tableData[scope.$index].proName" placement="bottom" effect="light">
							<div>
								{{tableData[scope.$index].proName}}
							</div>
						</el-tooltip>
					</template>
				</el-table-column>
                <el-table-column prop="" label="联系人" width="120" align="center"></el-table-column>
				<el-table-column prop="visitorNum" label="团队人数" width="100" align="center"></el-table-column>
				<el-table-column :formatter='proLeaveTimeFuc' label="出发日期" width="160" align="center"></el-table-column>
				<el-table-column prop="" label="报账状态" width="100" align="center"></el-table-column>
				<el-table-column prop="" label="团队利润" width="120" align="center"></el-table-column>
				
                <el-table-column label="团队详情" align="center" width="120">
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
					共
					<span class="colorSky"> {{totalCount}} </span> 个产品
                    <!-- <el-button type="primary" size="small">导出为excel</el-button> -->
				</div>
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" :page-sizes="[10, 20, 30 ,40]" layout="sizes,prev, pager, next ,jumper" :total="totalCount">
				</el-pagination>
			</div>
		</div>
		<!-- 日历模态框 -->
		<!-- <el-dialog
		  title="产品团期" :visible.sync="dialogVisible"  width="45%">
		  <calander v-if='dialogVisible' :obj='dataArr' :canClick='true' :isSingle='true' @getdata='getData'></calander>
		</el-dialog> -->
        <!-- 拆分团队 -->
		
        
	</div>
</template>
<script>
const baseURL = process.envconfig.API_HOST; // 请求基地址
// import calander from '../../public/calander_price.vue';
export default {
    data() {
        return {
            checkArr: [
                {
                    value: 'audityes',
                    label: '通过'
                },
                {
                    value: 'auditno',
                    label: '不通过'
                }
            ],
            detailId: '', // 订单编号
            checkValue: '',
            // 注册账户的类型 true:供应商；false:分销商
            registerType: true,
            registerTypeCom: true,
            cancleOrderDialog: false,
            tourDetailDialog: false, // 发团详情dialog
            searchShow: false, // 查询条件
            innerpayMoneyDialog: false, // 付款内层dialog
            dialogVisible: false, // 团期
            splitTeamDialog: false, //拆分团队
            proLeaveTime: '',
            // doShow: '0', // 显示操作

            linkPhone: '', //联系电话
            orderId: '', // 订单编号
            productArr: [{ proName: '全部产品', proNum: '' }],
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
            tourText: '未安排',
            tourStartTime: '',
            guidePhone: '', //导游电话
            plateNumber: '', // 交通车牌号
            proSelfNums: '', // 内部编号
            splitType: '1', // 默认按报名先后顺序
            timePlaceArr: [], // 集合时间地点集合
            timePlaceVal: '', //
            // tourEndTime: '',
            //表格当前页数据
            tableData: [],
            // 拆分表格数据
            splitTableData: [], // 拆分表格显示的数据
            splitTableTotal: [], // 拆分表格所有数据集合
            // 获取row的key值
            getRowKeys(row) {
                console.log();
                return row.proNum;
            },
            // 模态款多选
            dialogSelection: [],
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
       
        selectable(row, index) {
            console.log(row);
            console.log(index);
        },
        
        goToDetail(index,row) {
            // 导游报账
            this.$router.push({
                name: 'profitDetail',
                query: { id: row.teamId }
            });
        },
        //从服务器读取数据
        loadData() {
            this.$http
                .axios({
                    url:
                        this.$api.getGuideBillByParamPaginate +
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
        },
        searchObj() {
            let obj = {};
            console.log();
            obj.isBill = 1; // 以报账
            if (this.proSelfNums) obj.proSelfNum = this.proSelfNums; // 内部编号
            if (this.tourStartTime)
                obj.proLeaveTime = this.$commonUtils.DateUtils.formatDate(
                    this.tourStartTime,
                    'yyyy-MM-dd'
                ); // 出发团期
            // console.log(this.tourStartTime.substring(0,10));
            console.log(obj);
            return obj;
        },
        statuFunc(row, column, cellValue) {},
        
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
        proLeaveTimeFuc(row, column, cellValue) {
            if (row.proLeaveTime != null) {
                return row.proLeaveTime.substring(0, 10);
            }
        }
    },
    created() {
        this.loadData();
    },
    watch: {
        
    },
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
        .el-button {
            color: #45c8dc;
            background: #fff;
            border-radius: 4px;
        }
        width: 96%;
        margin: auto;
        overflow: hidden;
        opacity: 0.96;
        background: #ffffff;
        box-shadow: 0 0 5px 0 rgba(121, 121, 121, 0.32);
        border-radius: 4px;
        .top-title {
            display: inline-block;
            width: 12%;
            background: #f1f2f6;
            p {
                height: 40px;
                line-height: 40px;
                margin-left: 10px;
            }
        }
        .right-line {
            display: inline-block;
            padding-left: 6px;
            width: 86%;
        }
        .top-main {
            vertical-align: top;
            display: inline-block;
            width: 86%;
            margin-left: 6px;

            .line {
                height: 30px;
                margin: 10px 0;
                .fir-select {
                    width: 29%;
                }
                .sec-select {
                    width: 22%;
                }
                .thr-select {
                    width: 17%;
                }
                .el-date-editor {
                    width: 13%;
                }
                .iden-number {
                    width: 24%;
                }
                .el-button {
                    border: 1px solid #45c8dc;
                }
                // margin-left: 8px;
            }
        }
        .search {
            margin-top: 5px;
            border-top: 1px dashed #ddd;
            padding: 10px;
            text-align: center;
            .el-button {
                width: 120px;
                border-radius: 4px;
            }
        }
    }
    .mid-line {
        // width: 96%;
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
                width: 110px;
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
    .el-dialog {
        .line {
            height: 50px;
            line-height: 50px;
        }
    }
}
</style>
