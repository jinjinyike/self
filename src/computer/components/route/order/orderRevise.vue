<template>
    <div id="order-search">
        <div class="manage-top">
            <div class="top-year">
                <div class="top-year-div">
                    <span>按年份查询</span>
                </div>
                <div class="right-line">
                    <el-select class="year-choose" v-model="yearStart" placeholder="请选择">
                        <el-option v-for="(item,index) in yearArr" :key="index" :value="item">
                        </el-option>
                    </el-select>—
                    <el-select class="year-choose" v-model="yearEnd" placeholder="请选择">
                        <el-option v-for="(item,index) in yearArr" :key="index" :value="item">
                        </el-option>
                    </el-select>
                </div>
                <el-button @click="doSearchShow">更多条件查询<img src="" /></el-button>
            </div>
            <div v-show="searchShow">
                <div class="top-title">
                    <p>按产品查询</p>
                    <p>按分销商查询</p>
                    <p></p>
                    <p></p>
                    <p>按出行信息查询</p>
                    <p>按订单信息查询</p>
                    <p>按其他条件查询</p>
                </div>
                <div class="top-main">
                    <div class="line">
                        <el-select class="fir-select" v-model="productValue" placeholder="请选择">
                            <el-option v-for="(item,index) in productArr" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        —
                        <el-input class="sec-select" placeholder="请输入产品编号" :maxlength="12"></el-input>
                        <el-input class="sec-select" placeholder="请选择团期"></el-input>
                    </div>
                    <div class="line">
                        <el-select class="fir-select" placeholder="选择分销商" v-model="distributorValue">
                            <el-option v-for="(item,index) in distributorArr" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        —
                        <el-select class="sec-select" placeholder="选择业务员" v-model="employeeValue">
                            <el-option v-for="(item,index) in employeeArr" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>

                        <el-input class="sec-select" placeholder="分销商手机号" :maxlength="11"></el-input>
                        <el-button type="" size="small" style="color:#45c8dc;">搜 索</el-button>
                    </div>
                    <div class="line">
                        <el-select class="fir-select" placeholder="选择群组" v-model="groupValue">
                            <el-option v-for="(item,index) in groupArr" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        —
                        <el-select class="sec-select" placeholder="请选择所属区域" v-model="placeValue">
                            <el-option v-for="(item,index) in placeArr" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>

                    <div class="line">
                        <span class="fir-span">联系电话</span>
                        <el-input class="thr-select" placeholder="联系人手机号" :maxlength="11"></el-input>
                        <span>出行人证件号码</span>
                        <el-select placeholder="证件类型" v-model="identityValue">
                            <el-option v-for="(item,index) in identityArr" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-input class="iden-number" placeholder="请输入出行人证件号码"></el-input>
                    </div>
                    <div class="line">
                        <span class="fir-span">订单编号</span>
                        <el-input class="thr-select" placeholder="请输入订单编号"></el-input>
                        <span>发团日期</span>
                        <el-date-picker v-model="tourStartTime" type="date" placeholder="选择日期">
                        </el-date-picker>—
                        <!-- 
                            -->
                        <el-date-picker v-model="tourEndTime" type="date" placeholder="选择日期">
                        </el-date-picker>
                        <el-select v-model="systemValue" placeholder="请选择" style="width:18%">
                            <el-option v-for="(item,index) in systemArr" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>

                    </div>
                    <div class="line">
                        <span class="fir-span">订单类型</span>
                        <el-select class="thr-select" v-model="orderTypeValue">
                            <el-option v-for="(item,index) in orderTypeArr" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <span>公司员工</span>
                        <el-select v-model="companyMemberValue" placeholder="请选择" style="width:27%;">
                            <el-option v-for="(item,index) in companyMemberArr" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <span>销售人员</span>
                        <el-select v-model="saleManValue" placeholder="请选择" style="width:23%;">
                            <el-option v-for="(item,index) in saleManArr" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="search">
                <el-button type="primary" plain size='small' @click="search">查询</el-button>
            </div>
        </div>
        <div class="mid-line">
            <!-- <el-button class="audit" type="primary" plain size='small' @click="userAudit">用户审核</el-button> -->
        </div>
        <div class="productManage-table right-content-index">
            <el-table ref="testTable" :data="tableData" style="width:100%" @selection-change="handleSelectionChange" @row-click="handleclick" :row-class-name="tableRowClassName">
                <el-table-column type="selection" width="30"></el-table-column>
                <el-table-column type="index" label="序号" :index="indexMethod" width='60' align='center'>
                </el-table-column>
                <el-table-column label="产品名称" class-name="proNum" align="center">
                    <template slot-scope="scope">
                        <el-tooltip :content="tableData[scope.$index].name" placement="bottom" effect="light">
                            <div>
                                {{tableData[scope.$index].name}}
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="出发团期" width="170" align="center"></el-table-column>
                <el-table-column prop="phone" label="数量" width="120" align="center"></el-table-column>
                <el-table-column label="分销商" class-name="proNum" align="center">
                    <template slot-scope="scope">
                        <el-tooltip :content="tableData[scope.$index].name" placement="bottom" effect="light">
                            <div>
                                {{tableData[scope.$index].name}}
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="roleId" label="联系人" width="120" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系电话" width="170" align="center"></el-table-column>
                <el-table-column prop="availabelDate" label="欠款金额" width="120" align="center"></el-table-column>
                <el-table-column label="上系统状态" width="100" align="center" :formatter='statuFunc'>
                    <template slot-scope="scope">
                        <span>{{tableData[scope.$index].auditStatu}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <!-- <el-select v-model="checkValue" placeholder="请选择" @change='check(scope.$index, scope.row)'>
							<el-option v-for="item in checkArr" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select> -->
                        <el-dropdown @command="handleCommand">
                            <span style="display:inline-block;width:130px;">
                                <img class="el-dropdown-link" src="/static/img/control.png" alt="" style="width:22px;height:18px;margin-top:2px;">
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command='{optionName:item}' v-for="(item,index) in optionData" :key='index'>{{item}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>

            </el-table>
            <div align="right" class="pagination">
                <div class="self-count">
                    共
                    <span class="colorSky"> {{totalCount}} </span> 个产品
                    <el-button type="primary" size="small">导出为excel</el-button>
                </div>
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" :page-sizes="[10, 20, 30 ,40]" layout="sizes,prev, pager, next ,jumper" :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="" :visible.sync="cancleOrderDialog" width="25%" center>
            <div style="text-align:center;">是否确定取消该订单吗？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancleOrderDialog = false">取 消</el-button>
                <el-button type="primary" @click="cancleOrderDialog = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 更改基本信息 -->
        <el-dialog title="更改基本信息" :visible.sync="changeBaseInfoDialog" width="30%" center>
            <div style="margin-bottom:15px;">

                <span>其他条件</span>
                <el-select v-model="changeBaseInfoOtherValue" placeholder="请选择">
                    <el-option v-for="(item,index) in changeBaseInfoOther" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

                <span>销售人员</span>
                <el-select v-model="changeBaseInfoSaleValue" placeholder="请选择">
                    <el-option v-for="(item,index) in changeBaseInfoSale" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

            </div>
            <div style="display:flex;margin-bottom:15px;">
                <span style="margin-right:5px;">
                    订单备注
                </span>
                <el-input type="textarea" :rows="2" placeholder="" v-model="orderRemarkInfo" style="width:80%;">
                </el-input>
            </div>
            <div style="display:flex;">
                <span style="margin-right:5px;">
                    订单备注
                </span>
                <el-input type="textarea" :rows="2" placeholder="" v-model="orderRemarkInfo" style="width:80%;">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="cancleOrderDialog = false">取 消</el-button> -->
                <el-button type="primary" @click="submitChangeBaseInfoDialog">提交</el-button>
            </span>
        </el-dialog>
        <!-- 更改出行信息 -->
        <el-dialog title="更改出行信息" :visible.sync="changeOutDialog" width="30%" center>
            <div style="margin-bottom:10px">
                <span style="display:inline-block;width:70px;">
                    联系人
                </span>
                <el-input v-model="contactName" placeholder="请输入内容"></el-input>
                <span style="display:inline-block;width:70px;">
                    联系电话
                </span>
                <el-input v-model="contactTel" placeholder="请输入内容"></el-input>
            </div>
            <div v-for="(item,index) in outPeople" style="margin-bottom:10px" :key="">
                <span style="display:inline-block;width:70px;">出行人{{index+1}}</span>
                <el-input v-model="item.name" placeholder="请输入内容"></el-input>
                <el-select v-model="item.IDtype" placeholder="请选择" style="width:100px;">
                    <el-option v-for="(items,idx) in item.IDlist" :key="idx" :label="items.label" :value="items.value">
                    </el-option>
                </el-select>
                <el-input v-model="item.IDnum" placeholder="请输入内容" style="width:200px;"></el-input>
            </div>
            <div style="margin-bottom:10px">
                <span style="display:inline-block;width:70px;">
                    集合信息
                </span>
                <el-select v-model="changeBaseInfoSaleValue" placeholder="请选择" style="width:250px;">
                    <el-option v-for="(item,index) in gatherInfo" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

            </div>
            <div style="margin-bottom:10px">
                <span style="display:inline-block;width:70px;">
                    联运服务
                </span>
                <el-select v-model="transportServeValue" placeholder="请选择">
                    <el-option v-for="(item,index) in transportServe" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

            </div>
            <div style="margin-bottom:10px">
                <span style="display:inline-block;width:70px;">
                    选择酒店
                </span>
                <el-select v-model="hotelLevelValue" placeholder="请选择">
                    <el-option v-for="(item,index) in hotelLevel" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

            </div>
            <div style="margin-bottom:10px">
                <span style="display:inline-block;width:70px;">
                    选择航班
                </span>
                <el-select v-model="planeValue" placeholder="请选择" style="width:250px;">
                    <el-option v-for="(item,index) in plane" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

            </div>
            <div style="margin-bottom:10px">
                <span style="display:inline-block;width:70px;">
                    差价体系
                </span>
                <el-select v-model="proceSystemValue" placeholder="请选择" style="width:250px;">
                    <el-option v-for="(item,index) in proceSystem" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

            </div>
            <div style="margin-bottom:10px">
                <span style="display:inline-block;width:70px;">
                    增加费用
                </span>
                <el-input v-model="addFee" placeholder="请输入内容" style="width:200px;"></el-input>元

            </div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="cancleOrderDialog = false">取 消</el-button> -->
                <el-button type="primary" @click="submitChangeOutDialog">提交</el-button>
            </span>
        </el-dialog>
        <!-- 修改出行人数 -->
        <el-dialog title="修改出行人数" :visible.sync="outPersonNumDialog" width="30%" center>
            <div style="margin-bottom:10px">
                <span style="display:inline-block;width:30px;">
                    成人
                </span>
                <el-input v-model.number="adultNum" placeholder="请输入内容" style="width:100px;" @keyup.native="adultNum=adultNum.replace(/\D/g,'')" :maxlength='2'></el-input>人
                <span style="display:inline-block;width:30px;margin-left:50px;">
                    老人
                </span>
                <el-input v-model.number="oldNum" placeholder="请输入内容" style="width:100px;" @keyup.native="oldNum=oldNum.replace(/\D/g,'')" :maxlength='2'></el-input>人
            </div>
            <div style="margin-bottom:10px">
                <span style="display:inline-block;width:30px;">
                    儿童
                </span>
                <el-input v-model.number="childNum" placeholder="请输入内容" style="width:100px;" @keyup.native="childNum=childNum.replace(/\D/g,'')" :maxlength='2'></el-input>人
                <span style="display:inline-block;width:30px;margin-left:50px;">
                    学生
                </span>
                <el-input v-model.number="studentNum" placeholder="请输入内容" style="width:100px;" @keyup.native="studentNum=studentNum.replace(/\D/g,'')" :maxlength='2'></el-input>人
            </div>
            <div v-for="(item,index) in outPeople" style="margin-bottom:10px;margin-bottom:10px">
                <span style="display:inline-block;width:70px;">出行人{{index+1}}</span>
                <el-input v-model="item.name" placeholder="请输入内容"></el-input>
                <el-select v-model="item.IDtype" placeholder="请选择" style="width:100px;">
                    <el-option v-for="(items,idx) in item.IDlist" :key="idx" :label="items.label" :value="items.value">
                    </el-option>
                </el-select>
                <el-input v-model="item.IDnum" placeholder="请输入内容" style="width:200px;"></el-input>
            </div>
            <div>
                <el-button size="mini" @click="addPerson">增加出行人</el-button>
                <el-button size="mini" @click="reducePerson">减少出行人</el-button>
            </div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="cancleOrderDialog = false">取 消</el-button> -->
                <el-button type="primary" @click="submitOutPersonNumDialog">确定</el-button>
            </span>
        </el-dialog>
      
    </div>
</template>
<script>


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
			checkValue: '',
			// 注册账户的类型 true:供应商；false:分销商
			registerType: true,
			registerTypeCom: true,
			cancleOrderDialog: false,
			searchShow: false, // 查询条件
			yearArr: [2018],
			yearStart: '2018',
			yearEnd: '2018',
			productArr: [
				{ label: '全部产品', value: '' },
				{ label: '北京一日游', value: '121121' },
				{ label: '上海一日游', value: '2122332' }
			],
			productValue: '', //产品名称
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
			employeeValue: '',
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
				{ label: '选择分公司', value: '' },
				{ label: '第一个分公司', value: '123' },
				{ label: '第二个分公司', value: '456' }
			],
			disCompannyValue: '',
			identityArr: [
				{ value: '0', label: '身份证' },
				{ value: '1', label: '护照' },
				{ value: '2', label: '港澳台通行证' },
				{ value: '3', label: '军官证' }
			],
			identityValue: '0',
			systemArr: [
				{ label: '不限是否上系统', value: '0' },
				{ label: '订单已上系统', value: '1' },
				{ label: '订单未上系统', value: '2' },
				{ label: '无销售系统', value: '3' }
			],
			systemValue: '0',
			tourStartTime: '',
			tourEndTime: '',
			payTypeValue: '', // 支付类型
			payTypeArr: [
				{ label: '不限类型', value: '' },
				{ label: '线上支付', value: '0' },
				{ label: '线下支付', value: '1' }
			],
			orderTypeValue: '', // 订单类型
			orderTypeArr: [
				{ label: '全部类型', value: '' },
				{ label: '系统分销订单', value: '0' },
				{ label: '员工添加订单', value: '1' },
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
				{
					proName: '天津至云南豪华shu能够飞游',
					proNum: '1293093019039',
					proSelfNum: 'HHH3123',
					availabelDate: '2016-05-02',
					proStored: '正在运行'
				},
				{
					proName: '天津至云南豪华shu能够飞游',
					proNum: '1293093019039',
					proSelfNum: 'HHH3123',
					availabelDate: '2016-05-02',
					proStored: '正在运行'
				},
				{
					proName: '天津至云南豪华shu能够飞游',
					proNum: '1293093019039',
					proSelfNum: 'HHH3123',
					availabelDate: '2016-05-02',
					proStored: '正在运行'
				}
			],
			//多选数组
			multipleSelection: [],
			//请求的URL
			// url: "newstu/querystudentbypage",
			//搜索条件
			criteria: '',
			//下拉菜单选项
			select: '',
			//默认每页数据量
			pagesize: 5,
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
			optionData: ['更改基本信息', '更改出行信息', '更改出行时间', '修改出行人数'],
			changeBaseInfoOther: [
				{
					value: '选项1',
					label: '订单未上系统'
				},
				{
					value: '选项2',
					label: '订单已上系统'
				},
				{
					value: '选项2',
					label: '无销售系统'
				}
			],
			changeBaseInfoOtherValue: '',
			changeBaseInfoSale: [
				{
					value: '选项1',
					label: '001 任彩景'
				},
				{
					value: '选项2',
					label: '002 你猜'
				}
			],
			changeBaseInfoSaleValue: '',
			changeBaseInfoDialog: false,
			outPersonNumDialog: false,
			changeOutDialog: false,
			// 订单备注
			orderRemarkInfo: '',
			contactName: '',
			contactTel: '',
			outPeople: [
				{
					name: '',
					IDlist: [
						{
							label: '身份证',
							value: '身份证'
						}
					],
					IDtype: '',
					IDnum: ''
				}
			],
			gatherInfo: [
				{
					label: '06:00 天津滨海兴宁区',
					value: '06:00 天津滨海兴宁区'
				}
			],
			gatherInfoValue: '',
			transportServe: [
				{
					label: '秦皇岛市',
					value: '秦皇岛市'
				}
			],
			transportServeValue: '',
			hotelLevel: [
				{
					label: '四星级酒店',
					value: '四星级酒店'
				}
			],
			hotelLevelValue: '',
			plane: [
				{
					label: '天津航空 CA1233 19:00-21:00',
					value: '天津航空 CA1233 19:00-21:00'
				}
			],
			planeValue: '',
			proceSystem: [
				{
					label: '费用增多',
					value: '费用增多'
				},
				{
					label: '费用减少',
					value: '费用减少'
				},
				{
					label: '费用不变',
					value: '费用不变'
				}
			],
			proceSystemValue: '',
			addFee: '',
			childNum: '',
			adultNum: '',
			oldNum: '',
			studentNum: ''
		};
	},
	methods: {
		doSearchShow() {
			this.searchShow ? (this.searchShow = false) : (this.searchShow = true);
			// this.searchShow=true
		},
		handleCommand(command) {
			// 点击操作
			if (command.optionName == '更改基本信息') {
				this.changeBaseInfoDialog = true;
				return;
			}
			if (command.optionName == '更改出行信息') {
				this.changeOutDialog = true;
				return;
			}
			if (command.optionName == '更改出行时间') {
				return;
			}
			if (command.optionName == '修改出行人数') {
				this.outPersonNumDialog = true;
				return;
			}
		},
		//从服务器读取数据
		loadData() {
			this.$http
				.axios({
					url:
						this.$api.adminFindAllUserListPaginate +
						'?start=' +
						(this.currentPage - 1) +
						'&size=' +
						this.pagesize +
						'&auditStatu=' +
						'',
					method: 'post',
					data: '',
					json: true
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
			let obj = {
				start: this.currentPage - 1,
				size: this.pagesize,
				auditStatu: ''
			};
			if (this.userName !== '') {
				obj.name = this.userName;
			}
			if (this.userPhone !== '') {
				obj.phone = this.userPhone;
			}
			if (this.idenType !== '') {
				obj.roleId = this.idenType;
			}
			this.$http
				.axios({
					url: this.$api.adminFindAllUserListPaginate,
					method: 'post',
					data: obj
					// json: true
				})
				.then(res => {
					console.log(res);
					this.tableData = res.data;
					this.totalCount = res.total;
				});
		},
		statuFunc(row, column, cellValue) {
			// console.log(row);
			// let obj = '';
			// if (row.statu == '1') obj = '待审核';
			// return obj;
		},
		//多选响应
		handleSelectionChange: function(val) {
			console.log(val);
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
		submitChangeBaseInfoDialog() {
			this.changeBaseInfoDialog = false;
		},
		submitChangeOutDialog() {
			this.changeOutDialog = false;
		},
		addPerson() {
			this.outPeople.push({
				name: '',
				IDlist: [
					{
						label: '身份证',
						value: '身份证'
					}
				],
				IDtype: '',
				IDnum: ''
			});
		},
		submitOutPersonNumDialog() {
			let all = this.childNum + this.adultNum + this.oldNum + this.studentNum;
			all = all === '' ? 0 : all;

			if (all !== this.outPeople.length) {
				this.$message.error('出行人数和出行人信息数不一致');
				return;
			}
			console.log(all, this.outPeople.length);
		},
		reducePerson() {
			this.outPeople.splice(-1, 1);
		}
	},
	created() {
		this.loadData();
		// 审核员工
		this.$http
			.axios({
				url: this.$api.getEmployeeListByCurrentUser,
				method: 'get',
				// data: obj,
				json: true
			})
			.then(res => {
				for (let i = 0; i < res.length; i++) {
					this.companyMemberArr.push(
						res[i].statu == 0
							? {
									label: res[i].jobNumber + ' ' + res[i].name + '（已离职）',
									value: res[i].userId
								}
							: {
									label: res[i].jobNumber + ' ' + res[i].name,
									value: res[i].userId
								}
					);
				}
			})
			.catch(err => {
				// this.save=false;
			});
	},
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
				top: 0;
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
					// color: #43c8dc;
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
}
</style>

