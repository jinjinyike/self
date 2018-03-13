<template>
	<div id="product-manage">
		<div class="manage-top">
			<div class="line">
				<span class="fir-span">按类型查询</span>
				<el-select class="type-choose" v-model="idenType" placeholder="请选择" @change=''>
					<el-option v-for="item in idenTypeArr" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="line">
				<span class="fir-span">按用户查询</span>
				<el-input class="userName" type="text" placeholder="请输入用户名" v-model="userName"></el-input>
				<span>用户手机号</span>
				<el-input class="userPhone" type="text" placeholder="请输入用户手机号" v-model="userPhone"></el-input>
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
				<!-- <el-table-column type="selection"></el-table-column> -->
				<el-table-column type="index" label="序号" :index="indexMethod" width='80' align='center'>
				</el-table-column>
				<el-table-column label="用户名称" class-name="proNum" align="center">
					<template slot-scope="scope">
						<el-tooltip :content="tableData[scope.$index].name" placement="bottom" effect="light">
							<div>
								{{tableData[scope.$index].name}}
							</div>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column prop="phone" label="手机号" width="170" align="center"></el-table-column>
				<!-- <el-table-column  prop="proSelfNum" label="所在城市" width="120" align="center"></el-table-column> -->
				<el-table-column prop="roleId" label="用户类型" width="120" align="center"></el-table-column>
				<el-table-column label="审核状态" width="100" align="center" :formatter='statuFunc'>
					<template slot-scope="scope">
						<span>{{tableData[scope.$index].auditStatu}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="availabelDate" label="使用期" width="120" align="center"></el-table-column>
				<el-table-column label="用户详情" align="center" width="100">
					<template slot-scope="scope">
						<span class="colorOrg" @click="getDetail(scope.$index, scope.row)">详情</span>
					</template>
				</el-table-column>

				<el-table-column label="审核" align="center" width="150">

					<template slot-scope="scope">
						<el-select v-model="checkValue" placeholder="请选择" @change='check(scope.$index, scope.row)'>
							<el-option v-for="item in checkArr" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>

					</template>
				</el-table-column>

			</el-table>
			<div align="right" class="pagination">
				<div class="self-count">
					共
					<span class="colorSky"> {{totalCount}} </span> 个用户
				</div>
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" :page-sizes="[10, 20, 30 ,40]" layout="sizes,prev, pager, next ,jumper" :total="totalCount">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="用户详情" :visible.sync="centerDialogVisible" width="60%" center>
			<table>
				<tr>
					<td>账户信息</td>
					<td>
						<p>
							<span>用户名</span>
							<span>{{detailData.name}}</span>
						</p>
						<p>
							<span>邮箱账号</span>
							<span>{{detailData.mail}}</span>
						</p>
						<p>
							<span>绑定手机号</span>
							<span>{{detailData.tel}}</span>
						</p>
						<p v-if="!registerType">
							<span>分销商类型</span>
							<span>{{detailData.distributorType}}</span>
						</p>
					</td>
				</tr>
				<tr v-if="registerType || registerTypeCom">
					<td>公司信息</td>
					<td>
						<p>
							<span>公司名称</span>
							<span>{{detailData.companyName}}</span>
						</p>
						<p>
							<span>所在城市</span>
							<span>{{detailData.city}}</span>
						</p>
						<p>
							<span>公司地址</span>
							<span>{{detailData.address}}</span>
						</p>
						<p v-if="registerType">
							<span>公司类型</span>
							<span>{{detailData.companyType}}</span>
						</p>
					</td>
				</tr>
				<tr v-if="registerType">
					<td>联系信息</td>
					<td>
						<p>
							<span>联系人</span>
							<span>{{detailData.contactName}}</span>
						</p>
						<p>
							<span>联系电话</span>
							<span>{{detailData.contactTel}}</span>
						</p>
					</td>
				</tr>
			</table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
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
			centerDialogVisible: false,
			yearArr: [2016, 2017, 2018],
			year: '2017',
			idenTypeArr: [
				{
					alue: '',
					label: '全部'
				},
				{
					value: '01010000',
					label: '路线产品供应商'
				},
				{
					value: '01020000',
					label: '门票产品供应商'
				},
				{
					value: '02020000',
					label: '个人分销商'
				},
				{
					value: '02010000',
					label: '企业分销商'
				}
			],
			idenType: '',
			userName: '', // 查询用户名
			userPhone: '', // 查询手机号
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
		// 审核
		check(index, row) {
			console.log(row);
			let checkValue = this.checkValue
			if (checkValue === 'audityes') {
				this.$confirm('确定审核通过吗?', '', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true
				})
					.then(() => {
						this.$http
							.axios({
								url: `/admin/audit/${checkValue}/${row.id}`,
								method: 'post',
								data: '',
								json: true
							})
							.then(res => {
								this.$message({
									type: 'success',
									message: '操作成功!'
								});
								this.loadData();
							});
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});
					});
			} else if (checkValue === 'auditno') {
				this.$confirm('确定审核不通过吗?', '', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true
				})
					.then(() => {
						this.$http
							.axios({
								url: `/admin/audit/${checkValue}/${row.id}`,
								method: 'post',
								data: '',
								json: true
							})
							.then(res => {
								this.$message({
									type: 'success',
									message: '操作成功!'
								});
								this.loadData();
							});
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});
					});
			}
			this.checkValue = '';
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

			// this.userName // 用户名 name
			// this.userPhone // 用户手机号 phone
			// this.idenType // 用户类型 roleId
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
		// 点击详情
		getDetail(index, row) {
			console.log(index, row);
			this.$http
				.axios({
					url: this.$api.getDetail,
					method: 'post',
					data: {
						id: row.id
					}
					// json: true
				})
				.then(res => {
					console.log(res);
					this.registerType = true;
					let data = this.detailData;

					data.name = res.name;
					data.mail = res.email;
					data.tel = res.phone;
					data.companyName = res.compannyName;
					data.city = `${res.province}-${res.city}`;
					data.address = res.address;
					data.companyType = res.roleName;
					data.contactName = res.contactName;
					data.contactTel = res.contactPhone;

					if (res.roleId === '02020000') {
						//判断为个人分销商
						this.registerType = false;
						data.distributorType = res.roleName;
						this.registerTypeCom = false;
						return;
					}
					if (res.roleId === '02010000') {
						//判断为企业分销商
						this.registerTypeCom = true;
					}
				});
			// alert(row.proNum);
			this.centerDialogVisible = true;
		},

		changeYear() {
			// 改变年份触发
			this.changePage();
			console.log(this.year);
			console.log(this.currentPage);
			this.loadData();
		},
		// changeState() {
		// 	// 改变状态触发
		// 	this.changePage();
		// 	console.log(this.state);
		// 	console.log(this.currentPage);
		// 	this.loadData();
		// },
		changePage() {
			this.currentPage = 1;
		},
		//改变当前点击的行的class，高亮当前行
		tableRowClassName({ row, rowIndex }) {
			if (rowIndex % 2 == 1) {
				return 'info-row';
			}
		},
		// 点击用户审核
		userAudit() {
			if (this.multipleSelection.length == 0) return;
			console.log(123);
			var array = [];
			this.multipleSelection.forEach(item => {
				array.push(item.proNum);
			});
			this.$confirm('确定审核通过吗?', '', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				center: true
			})
				.then(() => {
					// this.$http.axios({
					//     url: this.$api.auditno+'/'+row.proNum,
					//     method: 'post',
					//     data: '',
					//     json: true
					// }).then(res=>{
					this.$message({
						type: 'success',
						message: '操作成功!'
					});
					this.loadData();
					// })
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			console.log(this.multipleSelection);
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
	}
};
</script>
<style lang='scss' scoped>
@import '../../../../assets/pcCss/addProduct.css';
#product-manage {
	margin-top: 20px;
	.manage-top {
		width: 96%;
		margin: auto;
		overflow: hidden;
		opacity: 0.96;
		background: #ffffff;
		box-shadow: 0 0 5px 0 rgba(121, 121, 121, 0.32);
		border-radius: 4px;
		.search {
			margin-top: 10px;
			border-top: 1px dashed #ddd;
			padding: 10px;
			text-align: center;
			.el-button {
				width: 120px;
				border-radius: 4px;
			}
		}
		.line {
			height: 50px;
			line-height: 50px;
			.fir-span {
				display: inline-block;
				width: 80px;
				padding-left: 20px;
				background: #f1f2f6;
			}
			.userPhone {
				width: 150px;
			}
			.userName,
			.type-choose {
				width: 300px;
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
	}
	.el-dialog table {
		width: 100%;
	}
	.el-dialog table td {
		border: 1px solid #ddd;
		padding-left: 20px;
		p {
			height: 25px;
			line-height: 25px;
			margin: 10px 0;
			span:nth-child(1) {
				display: inline-block;
				width: 100px;
				text-align: right;
				margin-right: 20px;
			}
			span:nth-child(2) {
			}
		}
	}
}
</style>

