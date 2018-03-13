<template>
	<div id="order-search">
		<div class="manage-top">
                <div class="top-year">
					<div class="top-year-div">
                    	<span>按年份查询</span>
					</div>
					<div class="right-line">
						<el-select class="year-choose" v-model="yearStart" placeholder="请选择">
							<el-option v-for="item in yearArr" :key="item" :value="item">
							</el-option>
						</el-select> — <el-select class="year-choose" v-model="month" placeholder="请选择">
							<el-option v-for="item in monthArr" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
                    <el-button @click="doSearchShow">更多条件查询<img v-show="!searchShow" src="/static/img/arrow_bottom.png"/><img v-show="searchShow" src="/static/img/arrow_top.png"/></el-button>
                </div>
				<el-collapse-transition>
					<div v-show="searchShow">
						<div class="top-title">
							<p style="margin-top:5px;">按产品查询</p>
							<p>按分销商查询</p>
							<p></p>
							<p></p>
							<p>按出行信息查询</p>
							<p>按订单信息查询</p>
							<p>按其他条件查询</p>
						</div>
						<div class="top-main">
							<div class="line">
								<el-select class="fir-select" v-model="proNum" @change='proChange' placeholder="请选择">
									<el-option v-for="item in productArr" :key="item.proNum" :label="item.proName" :value="item.proNum"></el-option>
								</el-select>
								—
								<el-input class="sec-select" v-model='proNum1' placeholder="请输入产品编号" v-on:input='backPro(proNum1)' :maxlength="12"></el-input>

								<el-input class="sec-select" @focus='focus' :change='changeDom' v-model='proLeaveTime' placeholder="请选择团期" :disabled='!proNum'></el-input>
							</div>
							<div class="line">
								<el-select class="fir-select" filterable placeholder="选择分销商" v-model="distributorValue"  @change='distributorChange'>
									<el-option v-for="item in distributorArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
								—
								<el-select class="sec-select" filterable placeholder="选择业务员" v-model="employeeValue1">
									<el-option v-for="item in employeeArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
								<el-input class="sec-select" placeholder="分销商手机号" :maxlength="11" v-model="phoneNum" v-on:input="checkSaleman"></el-input>
								<el-button type="" size="small" style="color:#45c8dc;">搜 索</el-button>
							</div>
							<div class="line">
								<el-select class="fir-select" filterable placeholder="选择群组" v-model="groupValue">
									<el-option v-for="item in groupArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
								<span style="visibility:hidden;">—</span>
								<el-select class="sec-select" filterable placeholder="请选择所属区域" v-model="placeValue">
									<el-option v-for="item in placeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</div>
							<div class="line">
								<el-select class="fir-select" filterable placeholder="请选择分公司" v-model="disCompannyValue">
									<el-option v-for="item in disCompannyArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</div>
							<div class="line">
								<span class="fir-span">联系电话</span>
								<el-input class="thr-select" v-model="linkPhone" placeholder="联系人手机号" :maxlength="11"></el-input>
								<span>出行人证件号码</span>
								<el-select placeholder="证件类型" v-model="identityValue">
									<el-option v-for="item in identityArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
								<el-input class="iden-number" v-model="visitorCertificateNum" placeholder="请输入出行人证件号码"></el-input>
							</div>
							<div class="line">
								<span class="fir-span">订单编号</span>
								<el-input class="thr-select" v-model="orderId" placeholder="请输入订单编号"></el-input>
								<span>发团日期</span>
								<el-date-picker
								v-model="tourStartTime"
								type="date"
								placeholder="选择日期">
								</el-date-picker>—<!-- 
								--><el-date-picker
								v-model="tourEndTime"
								type="date"
								placeholder="选择日期">
								</el-date-picker>
								<el-select v-model="systemValue" placeholder="请选择" style="width:18%">
									<el-option v-for="item in systemArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
								<span>支付类型</span>
								<el-select v-model="payTypeValue" placeholder="请选择" style="width:13%">
									<el-option v-for="item in payTypeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</div>
							<div class="line">
								<span class="fir-span">订单类型</span>
								<el-select class="thr-select" v-model="orderTypeValue">
									<el-option v-for="item in orderTypeArr" :key="item.value" :label="item.label" :value="item.value" ></el-option>
								</el-select>
								<span>公司员工</span>
								<!-- <el-select v-model="companyMemberValue" placeholder="请选择" style="width:27%;">
									<el-option v-for="item in companyMemberArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select> -->
								<employee :employeeType="2" style="width:27%" ref="employeeId"></employee>
								
								<span>销售人员</span>
								<!-- <el-select v-model="saleManValue" filterable placeholder="请选择" style="width:23%;">
									<el-option v-for="item in saleManArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select> -->
								<employee :employeeType="2" style="width:23%" ref="employeeIdSale"></employee>
							</div>
						</div>
					</div>
				</el-collapse-transition>
			<div class="search">
				<el-button type="primary" plain size='small' @click="search">查询</el-button>
			</div>
		</div>
		<div class="mid-line">
			<!-- <el-button class="audit" type="primary" plain size='small' @click="userAudit">用户审核</el-button> -->
		</div>
		<div class="productManage-table right-content-index">
			<el-table ref="testTable" :data="tableData" style="width:100%" @selection-change="handleSelectionChange"   @row-click="handleclick" :row-class-name="tableRowClassName">
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
				<el-table-column prop="leaveDate" label="出发团期" width="120" align="center"></el-table-column>
				<el-table-column prop="visitorNum" label="数量" width="80" align="center"></el-table-column>
                <el-table-column label="分销商" class-name="proNum" align="center">
					<template slot-scope="scope">
						<!-- <el-tooltip :content="tableData[scope.$index].name" placement="bottom" effect="light">
							<div>
								{{tableData[scope.$index].name}}
							</div>
						</el-tooltip> -->
					</template>
				</el-table-column>
				<el-table-column prop="linkName" label="联系人" width="100" align="center"></el-table-column>
				<el-table-column prop="linkPhone" label="联系电话" width="120" align="center"></el-table-column>
				<el-table-column prop="" label="欠款金额" width="100" align="center"></el-table-column>
				<!-- :formatter='statuFunc' -->
				<el-table-column label="上系统状态" width="100" align="center" >
					<template slot-scope="scope">
						<el-tooltip v-show="tableData[scope.$index].isLine=='0'" content="未上系统" placement="bottom" effect="light">
							<el-button style="border:none;background:none;padding:0;">
								<img src="/static/img/wrong.png" style="width:16px;height:16px;"/>
							</el-button>
						</el-tooltip>
						<el-tooltip v-show="tableData[scope.$index].isLine=='1'" content="已上系统" placement="bottom" effect="light">
							<el-button style="border:none;background:none;padding:0;">
								<img src="/static/img/right.png" style="width:20px;height:14px;"/>
							</el-button>
						</el-tooltip>
						<el-tooltip v-show="tableData[scope.$index].isLine=='2'" content="无系统状态" placement="bottom" effect="light">
							<el-button style="border:none;background:none;padding:0;">
								无
							</el-button>
						</el-tooltip>
						<!-- <el-tooltip v-show="tableData[scope.$index].isLine=='0'" content="去支付" placement="bottom" effect="light">
							<el-button style="border:none;background:none;padding:0;">
								<img src="/static/img/right1.png" style="width:20px;height:14px;"/>
							</el-button>
						</el-tooltip> -->
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="80">
					<template slot-scope="scope">
                         <el-dropdown @command="handleCommand">
                            <span style="display:inline-block;width:60px;" >
                                <img class="el-dropdown-link" src="/static/img/control.png" alt="" style="width:22px;height:18px;margin-top:2px;">
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command='{data:tableData[scope.$index].orderId,num:1}'>查看详情</el-dropdown-item>
                                <el-dropdown-item :command='{data:tableData[scope.$index].orderId,num:2}'>取消订单</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
					</template>
				</el-table-column>
                <el-table-column label="待支付" align="center" width="100">
					<template slot-scope="scope">
						<el-tooltip content="去支付" placement="bottom" effect="light">
                           <el-button style="border:none;background:none;padding:0;" @click="goToPay(scope.$index, scope.row)">
                               <img src="/static/img/topay.png" style="width:22px;height:22px;"/>
                           </el-button>
                        </el-tooltip>
						<!-- <el-button style="border:none;background:none;padding:0;"></el-button> -->
						<!-- <span class="colorOrg" @click="getDetail(scope.$index, scope.row)">详情</span> -->
					</template>
				</el-table-column>
			</el-table>
			<div align="right" class="pagination">
				<div class="self-count">
					共
					<span class="colorSky"> {{totalCount}} </span> 个产品
                    <el-button  size="small" @click='exportExl'>导出为excel</el-button>
				</div>
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" :page-sizes="[10, 20, 30 ,40]" layout="sizes,prev, pager, next ,jumper" :total="totalCount">
				</el-pagination>
			</div>
		</div>
		<!-- 取消订单dialog -->
		<el-dialog title="" :visible.sync="cancleOrderDialog" width="25%" center>
			<div style="text-align:center;">是否确定取消该订单吗？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancleOrderDialog = false">取 消</el-button>
				<el-button type="primary" @click="cancleOrderDialog = false">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="" :visible.sync="payMoneyDialog" width="25%" center class="pay-dialog">
			<el-dialog
			width="30%"
			title="链接地址"
			:visible.sync="innerpayMoneyDialog"
			append-to-body>
				<div>www.baidu.com</div>
			</el-dialog>
			<div style="text-align:center;">分销商应增付金额为：￥<span class="colorOrg">100</span></div>
			<span slot="footer" class="dialog-footer">
				<div>
				<el-button class="copy-link" @click="innerpayMoneyDialog = true">复制付款链接</el-button>
				</div>
				<div>
				<el-button type="primary" @click="payMoneyDialog = false">发送链接短信</el-button>
				</div>
			</span>
		</el-dialog>

		<!-- 日历模态框 -->
		<el-dialog
		  title="产品团期" :visible.sync="dialogVisible"  width="45%">
		  <calander v-if='dialogVisible' :obj='dataArr' :canClick='true' :isSingle='true' @getdata='getData'></calander>
		</el-dialog>
		<!-- <el-dialog title="" :visible.sync="payMoneyDialog" width="25%" center>
			<div>
				<p>订单已通过审核,等待审核</p>
				<p>分销商应增付金额为：￥<span class="colorOrg">100</span></p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="payMoneyDialog = false">确定</el-button>
			</span>
		</el-dialog> -->
		<el-dialog
		title="" :visible.sync="orderDetail"  width="740px">
			<order-detail :orderId='detailId'></order-detail>
			<!-- <span slot="footer" class="dialog-footer">
				<el-button @click="orderDetail = false">取 消</el-button>
				<el-button type="primary" @click="orderDetail = false">确 定</el-button>
			</span> -->
		</el-dialog>
	</div>
</template>
<script>
import employee from '../../public/employee.vue';
import calander from '../../public/calander_price.vue';
import orderDetail from './orderDetail.vue';
const baseURL = process.envconfig.API_HOST; // 请求基地址

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
			payMoneyDialog: false, // 付款链接dialog
			searchShow: false, // 查询条件
			innerpayMoneyDialog: false, // 付款内层dialog
			dialogVisible: false, // 团期
			orderDetail: false, //订单详情
			proLeaveTime: '',
			yearArr: ['不限年份', '2018'],
			yearStart: '不限年份',
			monthArr: [
				{ label: '不限月份', value: '不限' },
				{ label: '1月', value: '1' },
				{ label: '2月', value: '2' },
				{ label: '3月', value: '3' },
				{ label: '4月', value: '4' },
				{ label: '5月', value: '5' },
				{ label: '6月', value: '6' },
				{ label: '7月', value: '7' },
				{ label: '8月', value: '8' },
				{ label: '9月', value: '9' },
				{ label: '10月', value: '10' },
				{ label: '11月', value: '11' },
				{ label: '12月', value: '12' }
			],
			month: '不限',
			linkPhone: '', //联系电话
			orderId: '', // 订单编号
			productArr: [
				{ proName: '全部产品', proNum: '' }
				// { label: '北京一日游', value: '121121' },
				// { label: '上海一日游', value: '2122332' }
			],
			proNum: '', //产品名称
			proNum1: '', // 产品编号
			dataArr: [],
			phoneNum:'',
			distributorArr: [
				{ label: '选择分销商', value: '' },
				{ label: '123分销商', value: '123' },
				{ label: '456分销商', value: '456' }
			],
			distributorValue: '',
			employeeArr: [
				{ label: '选择业务员', value: '' },
				{ label: '小明', value: '123' },
				{ label: '小红', value: '456' }
			],
			employeeValue1: '',
			placeArr: [
				{ label: '请选择所属区域', value: '' },
				{ label: '华北地区', value: '123' },
				{ label: '华东地区', value: '456' }
			],
			placeValue: '',
			groupArr: [
				{ label: '选择群组', value: '' },
				{ label: '群组1', value: '123' },
				{ label: '群组1', value: '456' }
			],
			groupValue: '',
			disCompannyArr: [
				{ label: '选择分公司', value: '' }
				// { label: '第一个分公司', value: '123' },
				// { label: '第二个分公司', value: '456' }
			],
			disCompannyValue: '',
			identityArr: [
				{ value: '1', label: '身份证' },
				{ value: '2', label: '护照' },
				{ value: '3', label: '港澳台通行证' },
				{ value: '4', label: '军官证' }
			],
			identityValue: '1',
			visitorCertificateNum: '', //证件号码
			systemArr: [
				{ label: '不限是否上系统', value: '' },
				{ label: '订单已上系统', value: '0' },
				{ label: '订单未上系统', value: '1' },
				{ label: '无销售系统', value: '2' }
			],
			systemValue: '',
			tourStartTime: '',
			tourEndTime: '',
			payTypeValue: '', // 支付类型
			payTypeArr: [
				{ label: '不限类型', value: '' },
				{ label: '线上支付', value: '1' },
				{ label: '线下支付', value: '0' }
			],
			orderTypeValue: '', // 订单类型
			orderTypeArr: [
				{ label: '全部类型', value: '' },
				{ label: '系统分销订单', value: '1' },
				{ label: '员工添加订单', value: '0' },
				{ label: '合作电商订单', value: '2' }
			],
			companyMemberValue: '', //
			companyMemberArr: [{ label: '全部员工', value: '' }], // 公司员工
			saleManValue: '',
			saleManArr: [
				{ label: '全部员工', value: '' },
				{ label: '小红', value: '001' },
				{ label: '小白', value: '003' }
			], // 销售人员
			//表格当前页数据
			tableData: [
				
			],
			//多选数组
			multipleSelection: [],
			//请求的URL
			// url: "newstu/querystudentbypage",
			//搜索条件
			criteria: '',
			//下拉菜单选项
			// select: '',
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
			},
			selection:[]
		};
	},
	methods: {
		getdistribute(){
            this.$http.axios({
                url:this.$api.getDistributorList,
                method:'get',
            }).then(res=>{
                this.distributorArr=res;
            })
		},
		distributorChange() {
            //分销商切换请求业务员 手机号
            if(this.distributorValue){
                let vm=this;
                this.employeeValue1='';
                this.$http.axios({
                    url:this.$api.getDistributorSalesmanList+'/'+this.distributorValue,
                    method:'get',
                    // params:{disNum:this.distributor}
                }).then(res=>{
                    this.employeeArr=res;
                })
                this.distributorArr.forEach(function(item,index){
                    if(item.id==vm.distributorValue){
                        vm.phoneNum=item.phoneNum;
                    }
                });
                // this.phoneNum=arr.phoneNum;
            }

        },
        checkSaleman(){//手机号回显分销商
        if(this.phoneNum){
             this.$nextTick(() => {
                this.phoneNum=this.$validate.checkNum(this.phoneNum).slice(0,11);
            });
            if(this.phoneNum.length==11){
                let vm=this;
                this.distributorArr.forEach(function(item,index){
                    if(item.phoneNum==vm.phoneNum){
                        vm.distributorValue=item.id;
                        vm.distributorChange();
                    }
                })
            }else{
                this.distributorValue='';
                this.employeeValue1='';
                this.employeeArr=[];
            }
        }
        },
		handleSelectionChange(selection){
			console.log(selection)
			this.selection=selection;
		},
		exportExl(){//导出excel
			let obj=[];
			if(!this.selection.length) return this.$message.error('未选择订单')
			this.selection.forEach(function(item,index){
				obj.push(item.orderId)
			})
			let obj1={id:obj.join(',')}
			window.location=baseURL+this.$api.getOrderRouteForm+'?id='+obj.join(',');
			},
		proChange() {
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
					this.proNum1 = this.$validate.checkNum(this.proNum1).slice(0, 12);
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
		goToPay(index, row) {
			this.payMoneyDialog = true;
		},
		doSearchShow() {
			this.searchShow ? (this.searchShow = false) : (this.searchShow = true);
			// this.searchShow=true
		},
		handleCommand(command) {
			// 点击操作
			if (command.num == '1') {
				// alert('12333');
				this.orderDetail = true;
				this.detailId = command.data;
			}
			if (command.num == '2') {
				this.cancleOrderDialog = true;
			}
		},
		//从服务器读取数据
		loadData() {
			this.$http
				.axios({
					url:
						this.$api.getOrderPaginateList +
						'?start=' +
						(this.currentPage - 1) +
						'&size=' +
						this.pagesize,
					method: 'get',
					params: this.searchObj(),
				})
				.then(res => {
					console.log(res);
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
			// console.log(this.tourStartTime.substring(0,10));
			if (this.yearStart != '不限年份') obj.year = this.yearStart; //年份
			if (this.month != '不限') obj.month = this.month; //月份
			if (this.proNum) {
				obj.proNum = this.proNum; // 产品编号
				if (this.proLeaveTime) obj.leaveDate = this.proLeaveTime; // 出发团期
			}
			if (this.tourStartTime)
				obj.startDate = this.$commonUtils.DateUtils.formatDate(
					this.tourStartTime,
					'yyyy-MM-dd'
				); //开始时间
			if (this.tourEndTime)
				obj.endDate = this.$commonUtils.DateUtils.formatDate(
					this.tourEndTime,
					'yyyy-MM-dd'
				); //结束时间
			if (this.linkPhone) obj.linkPhone = this.linkPhone; // 联系电话
			if (this.visitorCertificateNum) {
				obj.visitorCertificateType = this.identityValue; // 证件类型
				obj.visitorCertificateNum = this.visitorCertificateNum; //证件号码
			}
			if (this.orderId) obj.orderId = this.orderId; // 订单编号
			if (this.systemValue) obj.isLine = this.systemValue; // 是否上系统 0，1，2无
			if (this.orderTypeValu) obj.type = this.orderTypeValue; // 线上1 线下0
			if (this.orderTypeValue) obj.source = this.orderTypeValue; // 订单类型

			if (this.$refs.employeeId && this.$refs.employeeId.employeeValue)
				obj.supAddEmployeeId = this.$refs.employeeId.employeeValue; // 公司员工
			if (this.$refs.employeeIdSale && this.$refs.employeeIdSale.employeeValue)
				obj.supSaleEmployeeId = this.$refs.employeeIdSale.employeeValue; // 销售人员
			if (this.disCompannyValue) obj.childId = this.disCompannyValue; // 分公司
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
		}
	},
	created() {
		this.loadData();
		// 获取产品列表
		this.$http
			.axios({
				url: this.$api.getAllRouteProducts + '?valid=1',
				method: 'get'
			})
			.then(res => {
				for (let i = 0; i < res.length; i++) {
					this.productArr.push({
						proNum: res[i].proNum,
						proName: res[i].proName
					});
				}
			});
		// 获取分公司
		this.$http
			.axios({
				url: this.$api.getChildCompanyByUserId,
				method: 'get'
			})
			.then(res => {
				for (let i = 0; i < res.length; i++) {
					this.disCompannyArr.push({
						label: res[i].companyName,
						value: res[i].userId
					});
				}
			});
			this.getdistribute()
	},
	components: {
		employee,
		calander,
		orderDetail
	}
};
</script>
<style lang='scss' scoped>
// @import '../../../../assets/pcCss/addProduct.css';
#order-search {
	color: #666;
	margin-top: 20px;
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
		.top-year {
			height: 40px;
			line-height: 40px;
			position: relative;
			.top-year-div {
				display: inline-block;
				width: 12%;
				background: #f1f2f6;
				span {
					padding-top: 5px;
					display: inline-block;
					margin-left: 10px;
				}
			}
			img {
				width: 14px;
				height: 14px;
				margin-left: 10px;
			}
			.el-select {
				width: 14%;
			}
			.el-select:nth-child(2) {
				margin-right: 3px;
			}
			.el-select:nth-child(3) {
				margin-left: 3px;
			}
			.el-button {
				position: absolute;
				right: 10px;
				top: 5px;
				border: none;
				background: none;
				margin-right: 14px;
				font-weight: normal;
				color: #666;
			}
		}
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
				.fir-span {
					// margin-left: 10px;
				}
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
		width: 96%;
		overflow: hidden;
		padding: 10px;
		.audit {
			float: right;
		}
	}
	.productManage-table {
		height: 100%;
		margin: auto;
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
				.el-button {
					color: #45c8dc;
					background: #fff;
					border-radius: 4px;
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
	.pay-dialog {
		.colorOrg {
			color: #ff746f;
			font-size: 18px;
		}
		.dialog-footer {
			div {
				line-height: 34px;
				.el-button {
					width: 90%;
					height: 26px;
					padding: 0;
				}
				.copy-link {
					border: 1px solid #45c8dc;
					color: #45c8dc;
				}
			}
		}
	}
}
</style>

