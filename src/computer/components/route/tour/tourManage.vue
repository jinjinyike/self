<template>
	<div id="tour-manage">
		<div class="manage-top">
            <div>
                <div class="top-title">
                    <!-- <p style="margin-top:5px;">按产品查询</p> -->
                    <p style="margin-top:5px;">旅游团状态</p>
                    <p>导游联系电话</p>
                </div>
                <div class="top-main">
                    <!-- <div class="line">
                        <el-select class="fir-select" v-model="proNum" @change='proChange' placeholder="请选择">
                            <el-option v-for="item in productArr" :key="item.proNum" :label="item.proName" :value="item.proNum"></el-option>
                        </el-select>
                        —
                        <el-input class="sec-select" v-model='proNum1' placeholder="请输入产品编号" v-on:input='backPro(proNum1)' :maxlength="12"></el-input>
                        <el-input class="sec-select" @focus='focus' :change='changeDom' v-model='proLeaveTime' placeholder="请选择团期" :disabled='!proNum'></el-input>
                    </div> -->
                    <div class="line">
                        <el-select v-model="tourStateValue" class="thr-select">
                            <el-option v-for="item in tourStateArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <span>内部编号</span>
                        <el-input class="thr-select" v-model="proSelfNums" placeholder="请输入内部编号" :maxlength="10"></el-input>
                        <span>发团日期</span>
                         <el-date-picker
                        v-model="tourStartTime"
                        type="date"
                        placeholder="选择日期" style="width:17%">
                        </el-date-picker>
                    </div>
                    <div class="line">
                        <el-input class="thr-select" v-model="guidePhone" placeholder="联系人手机号" :maxlength="11"></el-input>
                        <span>交通信息</span>
                        <el-input class="thr-select" v-model="plateNumber" placeholder="请输入车牌号"></el-input>
                    </div>
                </div>
            </div>
			<div class="search">
				<el-button type="primary" plain size='small' @click="search">查询</el-button>
			</div>
		</div>
		<div class="productManage-table right-content-index">
            <div class="mid-line">
                <div class="self-count" style="display:inline-block;">
					共
					<span class="colorSky"> {{totalCount}} </span> 个旅游团{{tourText}}
                    <!-- <el-button type="primary" size="small">导出为excel</el-button> -->
				</div>
                <div class="audit" v-show="doShow==='0'">
                    <el-button class="" type="primary" plain size='small' @click="splitTeam">拆分团队</el-button>
                    <el-button class="" type="primary" plain size='small' @click="tourArrange">开始安排</el-button>
                </div>
				<div class="audit" v-show="doShow==='1'">
                    <!-- <el-button class="" type="primary" plain size='small' @click="guideReimbursement">旅游团报账</el-button> -->
					<el-button class="" type="primary" plain size='small'>发团修改</el-button>
                    <el-button class="" type="primary" plain size='small'>添加订单</el-button>
                    <el-button class="" type="primary" plain size='small' @click="outListDown">出行名单下载</el-button>
                    <el-button class="" type="primary" plain size='small' @click="addTourList">发团名单</el-button>
                </div>
				<div class="audit" v-show="doShow==='2'">
                    <el-button class="" type="primary" plain size='small'>发团修改</el-button>
                    <el-button class="" type="primary" plain size='small'>添加订单</el-button>
                    <el-button class="" type="primary" plain size='small' @click="addTourList">发团名单</el-button>
                </div>
				<div class="audit" v-show="doShow==='3'">
                    <el-button class="" type="primary" plain size='small'>添加订单</el-button>
                    <!-- <el-button class="" type="primary" plain size='small' @click="guideReimbursement">旅游团报账</el-button> -->
                    <el-button class="" type="primary" plain size='small' @click="addTourList">发团名单</el-button>
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
                <el-table-column prop="proSelfNum" label="内部编号" class-name="proNum" align="center" width="120"></el-table-column>
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
		<!-- 日历模态框 -->
		<!-- <el-dialog
		  title="产品团期" :visible.sync="dialogVisible"  width="45%">
		  <calander v-if='dialogVisible' :obj='dataArr' :canClick='true' :isSingle='true' @getdata='getData'></calander>
		</el-dialog> -->
        <!-- 拆分团队 -->
		<el-dialog
		title="拆分团队" :visible.sync="splitTeamDialog"  width="650px" center>
            <div>
                <div class="line" style="border-top:1px solid #ddd;">
                    <span style="margin-right:10px;">选择拆分模式</span>
                    <template>
                        <el-radio v-model="splitType" label="1" @change="radioChange">按报名先后顺序</el-radio>
                        <el-radio v-model="splitType" label="2" @change="radioChange">按集合站点分布</el-radio>
                    </template>
                </div>
                <div class="line" v-show="splitType=='2'" style="border-top:1px dashed #ddd;">
                    <span style="margin-right:10px;">选择集合信息</span>
                    <el-select v-model="timePlaceVal" style="width:350px;" @change="gatherChange">
                        <el-option v-for="item in timePlaceArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="el-checkbox-none">
                <div class="line" style="border-top:1px solid #ddd;border-bottom:1px solid #ddd;">
                    <span>已完成 <span class="colorOrg">{{dialogSelection.length}}</span> 个订单</span>
                    <span>共计 <span class="colorOrg">{{vistorTotal}}</span> 名乘客</span>
                    <div style="float:right">
                        <el-button type="primary" plain size='small' @click="chooseAgain">再次选择</el-button>
                        <el-button type="primary" plain size='small' @click="goSpliteTeam">配置单独成团</el-button>
                    </div>
                </div>
                <!-- <el-table ref="testTable" :data="tableData" style="width:100%" @selection-change="dialogSelectChange" @row-click="handleclick" :row-class-name="tableRowClassName" :reserve-selection='getRowKeys'>
                    <el-table-column type="selection" :reserve-selection="true" width="40" prop='proNum'></el-table-column> -->
                <el-table ref="splitTable" :data="splitTableData" @select='selectChange' style="width:100%" @row-click="handleclick" :row-class-name="tableRowClassName">
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column type="index" label="序号" width='60' align='center'></el-table-column>
                    <el-table-column prop="linkName" label="联系人" width="100" align="center"></el-table-column>
                    <el-table-column prop="linkPhone" label="联系电话" width="120" align="center"></el-table-column>
                    <el-table-column prop="num" label="人数" width="80" align="center"></el-table-column>
                    </el-table-column>
                    <el-table-column label="集合时间地点" class-name="proNum" align="center">
                        <template slot-scope="scope">
                            <el-tooltip :content="splitTableData[scope.$index].proGatherTime+' '+splitTableData[scope.$index].proGatherPlace" placement="bottom" effect="light">
                                <div>
									<span>{{splitTableData[scope.$index].proGatherTime}}</span> <span>{{splitTableData[scope.$index].proGatherPlace}}</span>
                                </div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
		</el-dialog>
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
		<!-- <pdf :id="pdfId" ref="pdf"></pdf> -->
		<pdf ref="pdf"></pdf>
	</div>
</template>
<script>
import pdf from './pdf.vue';
import tourDetail from '../../public/tourDetail.vue';
import '../../../../common/utils/bus.js';
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
            doShow: '0', // 显示操作

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
        proChange() {
            // 改变产品团期变化
            this.proNum1 = this.proNum;
            this.proLeaveTime = ''; //清空日期
            this.dataArr = []; //清空日期数组
            if (this.proNum)
                this.$http
                    .axios({
                        url:
                            this.$api.getRoutePlatoonDateList +
                            '?valid=0&proNum=' +
                            this.proNum,
                        method: 'get'
                    })
                    .then(res => {
                        // console.log(res);
                        res = res.split(',');
                        let obj = [];
                        res.forEach(function(item, index) {
                            obj.push({
                                day: item,
                                price: '$'
                            });
                        });
                        this.dataArr = obj;
                    });
        },
        backPro(data) {
            //
            if (data) {
                this.$nextTick(() => {
                    this.proNum1 = this.$validate
                        .checkNum(this.proNum1)
                        .slice(0, 12);
                });
                if (this.proNum1.length == 12) {
                    let vm = this;
                    this.productArr.forEach(function(item, index) {
                        if (vm.proNum1 == item.proNum) {
                            vm.proNum = vm.proNum1;
                            return;
                        }
                    });
                } else {
                    this.proNum = '';
                    this.proLeaveTime = '';
                    // this.dataArr = []; //清空日期数组
                }
            }
        },
        getData(data) {
            this.proLeaveTime = data;
            this.dialogVisible = false;
        },
        focus() {
            //获得焦点
            if (this.proNum) this.dialogVisible = true;
        },
        changeDom() {
            //切換日期 切換dom
        },
        // 点击详情
        goToDetail(index, row) {
            this.detailId = row.id;
            this.tourDetailDialog = true;
            if (this.$refs.load) {
                this.$refs.load.loadData(this.detailId);
            }
        },
        // 发团名单
        addTourList(){
            if(this.multipleSelection.length!=1) return this.$message.error('请选择一条数据');
            if(this.$refs.pdf){
                this.$refs.pdf.loadData(this.multipleSelection[0].id);
                this.$refs.pdf.doShowTabs();
            }
        },
        // 出行名单下载
        outListDown() {
            let id = '';
            if (this.multipleSelection.length == 0) {
                return this.$message.error('至少选择一条数据');
            } else {
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    id += this.multipleSelection[i].id + ',';
                }
                id = id.substring(0, id.length - 1);
                window.location = `${baseURL}${
                    this.$api.getVisitorsForm
                }?id=${id}`;
            }
        },
        doSearchShow() {
            this.searchShow
                ? (this.searchShow = false)
                : (this.searchShow = true);
        },
        // 点击拆分团队
        splitTeam() {
            if (this.multipleSelection.length != 1)
                return this.$message.error('请选择一条数据');
            this.splitTeamDialog = true;
            this.dialogSelection = [];
            this.$http
                .axios({
                    url: this.$api.getTeamVisitorList,
                    method: 'get',
                    params: { teamId: this.multipleSelection[0].id },
                    json: false
                })
                .then(res => {
                    console.log(res);
                    this.splitTableData = res.dataList;
                    this.splitTableTotal = res.dataList;
                    this.timePlaceArr = [
                        {
                            label: '不限集合时间地点',
                            value: ''
                        }
                    ];
                    for (let i = 0; i < res.gatherList.length; i++) {
                        this.timePlaceArr.push({
                            label:
                                res.gatherList[i].proGatherTime +
                                ' ' +
                                res.gatherList[i].proGatherPlace,
                            value: res.gatherList[i].proGatherId
                        });
                    }
                });
        },
        // 集合地点变化
        gatherChange() {
            this.splitTableData = [];
            if (this.timePlaceVal) {
                for (let i = 0; i < this.splitTableTotal.length; i++) {
                    if (
                        this.splitTableTotal[i].proGatherId == this.timePlaceVal
                    )
                        this.splitTableData.push(this.splitTableTotal[i]);
                }
            } else {
                this.splitTableData = this.splitTableTotal;
            }
        },
        // 单选框监听
        selectChange(selection, row) {
            let enter = '1';
            let arr = [
                {
                    visitorId: row.visitorId,
                    visitorNum: row.num,
                    teamId: row.teamId
                }
            ];
            for (let i = 0; i < this.dialogSelection.length; i++) {
                if (arr[0].visitorId == this.dialogSelection[i].visitorId) {
                    this.dialogSelection.splice(i, 1);
                    enter = '0';
                }
            }
            if (enter === '1') {
                this.dialogSelection.push({
                    visitorId: row.visitorId,
                    visitorNum: row.num,
                    teamId: row.teamId
                });
            }
            this.vistorTotal = 0;
            for (let i = 0; i < this.dialogSelection.length; i++) {
                this.vistorTotal += parseInt(
                    this.dialogSelection[i].visitorNum
                );
            }
            // console.log(this.dialogSelection);
        },
        chooseAgain(){ // 再次选择进行隐藏
            let arr = this.splitTableData ;
            let arr1 = [];
            // this.splitTableData = [];
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < this.dialogSelection.length; j++) {
                    if(this.dialogSelection[j].visitorId==arr[i].visitorId){
                        arr1.push(arr[i]);
                    }
                    
                }            
            }
            this.splitTableData = this.difference(arr,arr1);
        },
        difference(arr1, arr2) { // 取数组的差集
            let isNaN = Number.isNaN;
            return arr1.reduce(function(previous, i) {
                var found = arr2.findIndex(function(j) {
                    return j === i || (isNaN(i) && isNaN(j));
                });
                return (found < 0 && previous.push(i), previous);
            }, []);
        },
        tourArrange() { // 点击进行发团安排
            // 发团安排
			let id = '';
			if(this.multipleSelection.length==0) return this.$message.error('至少选择一条数据');
            if (this.multipleSelection.length > 1) {
                for (let i = 1; i < this.multipleSelection.length; i++) {
                    if (
                        this.multipleSelection[i - 1].proLeaveTime !=
                        this.multipleSelection[i].proLeaveTime
                    ) {
                        return this.$message.error('发团时间不一致');
                    }
                    if (
                        this.multipleSelection[i - 1].proReturnTime !=
                        this.multipleSelection[i].proReturnTime
                    ) {
                        return this.$message.error('发团结束时间不一致');
                    }
                }
            }
            for (let i = 0; i < this.multipleSelection.length; i++) {
                id += this.multipleSelection[i].id + ',';
            }
            id = id.substring(0, id.length - 1);
            this.$router.push({
                name: 'tourArrange',
                query: { id: id }
            });
        },
        //从服务器读取数据
        loadData() {
            this.$http
                .axios({
                    url:
                        this.$api.getTeamPaginateList +
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
        search() {
            this.loadData();
            if (this.tourStateValue === '0') {
                this.tourText = '未安排';
                this.doShow = '0';
            }
            if (this.tourStateValue === '1') {
                this.tourText = '未出发';
                this.doShow = '1';
            }
            if (this.tourStateValue === '2') {
                this.tourText = '进行中';
                this.doShow = '2';
            }
            if (this.tourStateValue === '3') {
                this.tourText = '已完成';
                this.doShow = '3';
            }
        },
        searchObj() { // 搜索obj
            let obj = {};
            console.log();
            if (this.tourStateValue) obj.type = this.tourStateValue; // 未安排
            if (this.proSelfNums) obj.proSelfNum = this.proSelfNums; // 内部编号
            if (this.tourStartTime)
                obj.proLeaveTime = this.$commonUtils.DateUtils.formatDate(
                    this.tourStartTime,
                    'yyyy-MM-dd'
                ); // 出发团期
            if (this.guidePhone) obj.guidePhone = this.proLeaveTime; // 导游联系电话
            if (this.plateNumber) obj.plateNumber = this.plateNumber; // 交通信息
            // console.log(this.tourStartTime.substring(0,10));
            console.log(obj);
            return obj;
        },
        statuFunc(row, column, cellValue) {},
        // 配置单独成团
        goSpliteTeam() {
            if (this.dialogSelection.length == 0)
                return this.$message.error('至少选择一条数据进行拆分');
            if(this.dialogSelection.length == this.splitTableTotal.length){
                return this.$message.error('拆分条数须小于总条数');
            }
            let obj = {};
            let visitorId = '';
            for (let i = 0; i < this.dialogSelection.length; i++) {
                visitorId += this.dialogSelection[i].visitorId + ',';
            }
            obj.teamId = this.dialogSelection[0].teamId;
            obj.visitorId = visitorId.substring(0, visitorId.length - 1);
            console.log(obj);
            this.$http
                .axios({
                    url: this.$api.modifyDividTeam,
                    method: 'post',
                    data: obj,
                    json: false
                })
                .then(res => {
                    this.$message.success('拆分成功');
                    this.loadData();
                    this.splitTeamDialog = false;
                });
        },
        radioChange() { // 拆分模式进行切换
            this.splitTableData = this.splitTableTotal;
            if (this.splitType == '2') {
                this.timePlaceVal = '';
                this.gatherChange();
            }
        },
        // 拆分团队多选
        dialogSelectChange(rows) {
            this.dialogSelection = [];
            if (rows) {
                rows.forEach(row => {
                    if (row) {
                        this.dialogSelection.push({
                            visitorId: row.visitorId,
                            visitorNum: row.num,
                            teamId: row.teamId
                        });
                    }
                });
            }
            this.vistorTotal = 0;
            for (let i = 0; i < this.dialogSelection.length; i++) {
                this.vistorTotal += parseInt(
                    this.dialogSelection[i].visitorNum
                );
            }
            // console.log(this.dialogSelection);
        },

        //多选响应
        handleSelectionChange: function(val) {
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
        // 序号
        indexMethod(index) {
            let num = (this.currentPage - 1) * this.pagesize + 1 + index;
            return num;
        },
        proLeaveTimeFuc(row, column, cellValue) {
            if (row.proLeaveTime != null) {
                return row.proLeaveTime.substring(0, 10);
            }
        }
    },
    created() {
        this.loadData();
        // document.getElementsByClass('.el-checkbox').css('display','none');
        // 获取产品列表
        // this.$http
        // 	.axios({
        // 		url: this.$api.getAllRouteProducts + '?valid=1',
        // 		method: 'get'
        // 	})
        // 	.then(res => {
        // 		for (let i = 0; i < res.length; i++) {
        // 			this.productArr.push({
        // 				proNum: res[i].proNum,
        // 				proName: res[i].proName
        // 			});
        // 		}
        // 	});
    },
    watch: {
        splitTableData: {
            //
            handler() {
                this.splitTableData.forEach((row, index) => {
                    for (let i = 0; i < this.dialogSelection.length; i++) {
                        // 演示选中奇数行
                        if (
                            this.dialogSelection[i].visitorId == row.visitorId
                        ) {
                            this.$nextTick(() => {
                                this.$refs.splitTable.toggleRowSelection(
                                    row,
                                    true
                                );
                            });
                        }
                    }
                });
            },
            deep: true
        }
    },
    components: {
        // employee,
        // calander,
        tourDetail,
        pdf
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
    .el-dialog {
        .line {
            height: 50px;
            line-height: 50px;
        }
        thead .el-checkbox{
            display: none;
        }
    }
}
</style>
