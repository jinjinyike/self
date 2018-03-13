<template>
  <div id="order-search">
    <div class="manage-top">
                <div class="top-year">
					<div class="top-year-div">
                    	<span>按收入类型查询</span>
					</div>
					<div class="right-line">
						<el-select v-model='incomeType' style="width:29%">
							<el-option v-for='item in option1' :value='item.value' :label='item.label' :key='item.value'></el-option>
						</el-select>
						<el-select v-model='shopType' v-if='incomeType==3' style="width:29%">
							<el-option v-for='item in option2' :value='item.value' :label='item.label' :key='item.value'></el-option>
						</el-select>
					</div>
                    <el-button @click="doSearchShow">更多条件查询<img v-show="!searchShow" src="/static/img/arrow_bottom.png"/><img v-show="searchShow" src="/static/img/arrow_top.png"/></el-button>
                </div>
                <el-collapse-transition>
					<div v-show="searchShow">
						<div class="top-title">
							<p style="margin-top:5px;">按产品查询</p>
							<p>按分销商查询</p>
							<p>按其他条件查询</p>
						</div>
						<div class="top-main">
              <div class="line">
                <el-select class="fir-select" v-model="proNum" @change='proChange' placeholder="请选择">
									<el-option v-for="item in options1" :key="item.proNum" :label="item.proName" :value="item.proNum"></el-option>
								</el-select>
								—
								<el-input class="sec-select" v-model='proNum1' placeholder="请输入产品编号" v-on:input='backPro(proNum1)' :maxlength="12"></el-input>
                —
								<el-input class="sec-select" v-model='proNum1' placeholder="请输入内部编号" v-on:input='backPro(proNum1)' :maxlength="12"></el-input>
								<el-input class="sec-select" @focus='focus' :change='changeDom' v-model='proLeaveTime' placeholder="请选择团期" :disabled='!proNum'></el-input>

              </div>
							<div class="line">
								<el-select class="fir-select" filterable placeholder="选择分销商" v-model="distributorValue">
									<el-option v-for="item in distributorArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
                —
								<el-input class="sec-select" placeholder="分销商手机号" :maxlength="11"></el-input>
								<el-button type="" size="small" style="color:#45c8dc;">搜 索</el-button>
							</div>
							<div class="line">
                <span>时间段</span>
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
								<!-- <el-select v-model="systemValue" placeholder="请选择" style="width:18%">
									<el-option v-for="item in systemArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select> -->
                <span>公司员工</span>
								<employee :employeeType="2" style="width:27%" ref="employeeId"></employee>
							</div>
						</div>
					</div>
				</el-collapse-transition>
        <div class="search">
				<el-button type="primary" plain size='small' @click="search">查询</el-button>
			  </div>
      </div>
      <div class="right-content-index">
        <el-table :data="tableData" style="width: 100%"  @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="序号" width="70" align="center" :index="indexMethod" type='index'></el-table-column>
            <el-table-column prop="" label="产品名称" width="" align="center"></el-table-column>
            <el-table-column prop="" label="出发团期" width="" align="center"></el-table-column>
            <el-table-column prop="" label="分销商" width="" align="center"></el-table-column>
            <el-table-column prop="" label="应收金额" width="" align="center"></el-table-column>
            <el-table-column prop="" label="实收金额" width="" align="center"></el-table-column>
            <el-table-column prop="" label="优惠金额" width="" align="center"></el-table-column>
            <el-table-column prop="" label="已付金额" width="" align="center"></el-table-column>
            <el-table-column prop="" label="欠款金额" width="" align="center"></el-table-column>
            <el-table-column prop="" label="详情" width="" align="center"></el-table-column>
          </el-table>
          <div align="right" class="pagination">
              <div class="self-count">
                          <el-button type="primary" plain size="small">导出Excel</el-button>
              </div>
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" :page-sizes="[10, 50, 100 ,200]" layout="total,sizes,prev, pager, next ,jumper" :total="totalCount">
              </el-pagination>
			</div>
      </div>
			<!-- 日历模态框 -->
				<el-dialog title="" :visible.sync="dialogVisible" width="560px">
					<div style="text-align:center">
					<calander v-if='dialogVisible' :obj='dataArr' :canClick='true' :isSingle='true' @getdata='getData'></calander>
				</div>
				</el-dialog>
  </div>
</template>
<script>
  import employee from '../../public/employee.vue';
	import calander from "../../public/calander_price.vue";
export default {
    data(){
      return {
        proNum:'',
        proNum1:'',
        productArr:[],
        proLeaveTime:'',
        distributorValue:'',
        distributorArr:[],
        tourStartTime:'',
        tourEndTime:'',
        tableData:[],
				incomeType:'0',
				shopType:'0',
				dialogVisible:false,
				dataArr:[],
				options1:[],
				option1:[{value:'0',label:'全部状态'},{value:'1',label:'系统分校订单收入'},{value:'2',label:'员工添加订单收入'},{value:'3',label:'合作电商订单收入'}],
				option2:[{value:'0',label:'全部电商平台'},{value:'1',label:'携程旅行网'},{value:'2',label:'同城旅行网'},{value:'3',label:'去哪儿旅行网'},{value:'4',label:'艺龙旅行网'},{value:'5',label:'阳光绿洲票务分销'}],
        searchShow:false,
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

      }
    },
    created(){
			let sent_data={valid:0};
			this.$http.axios({
				url:this.$api.getAllRouteProducts,
				method:'get',
				params:sent_data
			}).then((res)=>{
				this.options1=res;
			})
    },
    components:{
      employee,
			calander
    },
    methods:{
      changeDom(){

      },
			getData(data){
				this.proLeaveTime=data;
				this.dialogVisible=false;
			},
      focus(){
				 if (this.proNum) this.dialogVisible = true;
      },
			backPro(){//产品编号
				this.$nextTick(() => {
                                this.proNum1=this.$validate.checkNum(this.proNum1).slice(0,12);
                            })
				if(this.proNum1.length==12){
					let vm=this;
					let index1;
					this.options1.forEach(function(item,index){
						if(vm.proNum1==item.proNum){
							return index1=index
						}
					})
					if(String(index1)){
						this.proNum=this.proNum1;
					}
				}else{
					this.proNum='';
				}
			},
      proChange(){
				this.proNum1=this.proNum;
				if (this.proNum) {
                this.$http
                    .axios({
                        url:
                            this.$api.getRoutePlatoonDateList +
                            "?valid=1&proNum=" +
                            this.proNum,
                        method: "get"
                    })
                    .then(res => {
                        res = res.split(",");
                        let obj = [];
                        res.forEach(function(item, index) {
                            obj.push({
                                day: item,
                                price: "$"
                            });
                        });
                        this.dataArr = obj;
                        this.isDisabled = false;
                    });
            }
      },
      search(){

      },
      doSearchShow() {
			  this.searchShow ? (this.searchShow = false) : (this.searchShow = true);
      },
      loadData(){

      },
      handleSelectionChange(){

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
      }
    }
}
</script>
<style lang="scss" scoped>
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
					width: 20%;
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
}
.right-content-index{
  margin: auto;
	height: 100%;
}
.self-count{
	float: left;
	margin-left:15px;
}
</style>


