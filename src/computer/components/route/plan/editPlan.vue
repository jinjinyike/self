<template>
	<div class="con">
		<div class="item-bottom">
			<el-table
			    :data="tableData"
			    style="width: 100%">
			    <el-table-column type="index" label="序号" width="80" align="center" :index="indexMethod"></el-table-column>
			    <el-table-column prop="restNum" label="计划位编号" width="120" align="center"> </el-table-column>
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
			    <el-table-column prop="restType" label="计划位类型" width="180" align="center"></el-table-column>
			    <el-table-column label="日期/余位"  width="100" align="center">
			      <template slot-scope="scope">
			      	<span class="blue" @click='isCanlander(scope.$index)'>查看</span>
				  </template>
			    </el-table-column>
			    <el-table-column label="所含产品"  width="100" align="center">
			      <template slot-scope="scope">
			      	<span v-if='scope.row.isAdd==0' class="blue" @click='addPro(scope.row.restId,0)'>添加产品</span>
			      	<span v-else class="blue" @click='addPro(scope.row.restId,1)'>修改产品</span>
				  </template>
			    </el-table-column>
		        <el-table-column label="计划位删除" width="100" align="center">
		          <template slot-scope="scope">
		          	<span class="blue" @click='delPlan(scope.row.restId)'>删除</span>
		    	  </template>
		        </el-table-column>
			    <el-table-column label="计划位修改" width="120" align="center">
			      <template slot-scope="scope">
			      	<!-- <span class="blue">修改</span> -->
			      	<el-dropdown @command="handleCommand">
			      	  <span class="el-dropdown-link blue">
			      	    修改<i class="el-icon-arrow-down el-icon--right"></i>
			      	  </span>
			      	  <el-dropdown-menu slot="dropdown">
			      	    <el-dropdown-item :command='{index:scope.$index,num:1}'>修改数量</el-dropdown-item>
			      	    <el-dropdown-item :command='{index:scope.$index,num:2}'>增加日期</el-dropdown-item>
			      	    <el-dropdown-item :command='{index:scope.$index,num:3}'>删除日期</el-dropdown-item>
			      	  </el-dropdown-menu>
			      	</el-dropdown>
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
		<!-- 展示日历 -->
		<el-dialog :visible.sync="dialogVisible0" width="560px" >
		  <div style="text-align:center">
		  	<calander-seat v-if='dialogVisible0' :obj='showDataArr' :indexNum='1'  :canClick='false' :showPrice='true' class='fixed-calander'></calander-seat>
		  </div>
		</el-dialog>
		<!-- 添加产品 -->
		<el-dialog title="增删产品" :visible.sync="dialogVisible1" width="30%" center>
		  <div>
		  	<div v-for='item in addPlanPro.addProArr' class="item-bottom">
		  		<el-checkbox v-model="item.choosed"><span>{{item.proSelfNum}}</span>
		  		<span>{{item.proName}}</span></el-checkbox>
		  	</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible1 = false">取 消</el-button>
		    <el-button type="primary" @click="sureAdd">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 删除计划位 -->
		<el-dialog title="" :visible.sync="dialogVisible2"  width="30%" center>
		  <div style="text-align:center"> 确定删除此计划位？ </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible2 = false">取 消</el-button>
		    <el-button type="primary" @click="sureDel">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 删除计划位日期 -->
		<el-dialog title="删除计划位日期" :visible.sync="dialogVisible3"  width="560px" center>
		  <div>
		  	<calander-price v-if='dialogVisible3' :obj='delDateArr' :indexNum='0' @getdata='getData' :canClick='true'></calander-price>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible3 = false">取 消</el-button>
		    <el-button type="primary" @click="sureDel">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 修改计划位日期数量 -->
		<el-dialog title="修改计划位数量" :visible.sync="dialogVisible4"  width="48%" center>
		  <div class="item-bottom">
		  	<span>计划位日期</span>
		  	<calander-seat v-if='dialogVisible4' :obj='editDateArr' :indexNum='0' @getdata='getData' :canClick='true' :showPrice='true' ></calander-seat>
		  </div>
		  <div><span>计划位数量</span><el-input placeholder='数量' v-model='editNum' v-on:input='checkNum'></el-input></div>

		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible4 = false">取 消</el-button>
		    <el-button type="primary" @click="sureEditNum">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 添加计划位日期数量 -->
		<el-dialog title="增加计划位日期" :visible.sync="dialogVisible5"  width="80%" center>
		  <div class="item-bottom">
		  	<span>计划位日期</span>
		  	<calander v-if='dialogVisible5' :noDate='delDateArr' :indexNum='0' @getdata='getData1' :canClick='true' ></calander>
		  </div>
		  <div><span>计划位数量</span><el-input placeholder='数量' v-model='editNum' v-on:input='checkNum'></el-input></div>
		<div class="dot"></div>
		<template v-if='planType!="其他"'>
		<div class="item-bottom" style="text-align:center">
			<el-button type="primary" plain size='small' @click='getTable'>下一步</el-button>
		</div>
		<div class="dot"></div>
		</template>
		<div class="item-bottom" v-if='tableData3.length'>
				<el-table
				    :data="tableData3"
				    border
				    style="width: 100%">
				    <el-table-column prop="date" label="日期" width="100" align="center"></el-table-column>
				    <el-table-column prop="amount"  label="数量"  width="80" align="center"></el-table-column>
				    <el-table-column label="航空公司" width="" v-if='planType=="飞机"' align="center">
				      <template slot-scope="scope">
				      	<el-select  v-model='scope.row.fligtCom'>
				      		<el-option v-for='item in option1' :key='item.value' :label='item.label' :value='item.value'></el-option>
				      	</el-select>
				      </template>
				    </el-table-column>
				    <el-table-column label="航空信息" width="" v-if='planType=="飞机"' align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.fightInfo' placeholder='航次'></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column label="火车信息" width="" v-if='planType=="火车"' align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.trainInfo' placeholder='火车信息'></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column label="车辆信息" width="" v-if='planType=="火车"' align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.trainNum' placeholder='车辆信息'></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column label="码头信息" width="" v-if='planType=="轮船"' align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.pierInfo' placeholder='码头信息'></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column label="船名/航次" width="" v-if='planType=="轮船"' align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.pierNum' placeholder='船名/航次'></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column label="计划位单价" width="" align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.unitPrice' v-on:input="checkNum4(scope.$index)" placeholder='单价'></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column label="计划位预算"  align="center">
				      <template slot-scope="scope">
				      	<el-input v-model='scope.row.price'></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column label="申请时间" align="center" width='170'>
				      <template slot-scope="scope">
				      	<el-date-picker 
				      	      v-model="scope.row.applicationTime" type="date"
				      	      placeholder="选择日期" :picker-options="pickerOptions1" style='width:135px'>
				      	    </el-date-picker>
				      </template>
				    </el-table-column>
				  </el-table>
		</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible5 = false">取 消</el-button>
		    <el-button type="primary" @click="sureAddPlan">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import calanderPrice from "../../public/calander_price.vue";
import calanderSeat from "../../public/calander_seat.vue";
import calander from "../../public/calander.vue";
import Validate from "../../../../common/validate/validate.js";
import flyList from "../../public/flySet.js";
export default {
    data() {
        return {
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
            dialogVisible1: false, //添加产品磨矿
            restId: "",
            addPlanPro: {
                addProArr: [],
                edit: "" //判断添加产品修改产品
            },
            dialogVisible2: false, //删除计划位磨矿
            delPlanIndex: "", //删除计划位的索引
            dialogVisible3: false, //删除计划位日期磨矿
            delDateArr: [], //回显计划位日期数组
            delDate: [], //选择删除计划位日期
            editDateArr: [], //回显计划位日期数组
            editDate: [], //选择修改计划位日期
            dialogVisible4: false, //修改计划位日期磨矿
            editNum: "",
            dialogVisible5: false, //添加计划位日期
            addDataArr: [],
            option1: flyList,
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                }
            },
            tableData3: [],
            planType: "",
            dialogVisible0: false //计划位日期磨矿
        };
    },
    filters: {},
    watch: {
        planList: function() {
            this.loadData();
        }
    },
    created() {
        this.loadData();
    },
    computed: {
        ...mapState("plan", ["planList"])
    },
    components: {
        calanderPrice,
        calanderSeat,
        calander
    },
    methods: {
        isCanlander(index) {
            let obj = [];
            this.dialogVisible0 = true;
            this.tableData[index].restTime.forEach(function(item, index) {
                obj.push({
                    proLeaveTime: item.day,
                    proRest: item.price
                });
            });
            this.showDataArr = obj;
        },
        sureAddPlan() {
            //确定添加日期
            let obj = {};
            obj.routeRestMap = {};
            obj.routeRestMap.restId = this.restId;
            if (!this.addDataArr.length)
                return this.$message.error("未选择日期");
            if (!this.editNum) return this.$message.error("未填写数量");
            obj.routeRestDayEntityList = [];
            if (this.planType == "其他") {
                let vm = this;
                this.addDataArr.forEach(function(item, index) {
                    obj.routeRestDayEntityList.push({
                        restDay: new Date(item.day).getTime(),
                        restAccount: vm.editNum,
                        restOriginAccount: vm.editNum
                    });
                });
            } else {
                //另外三种方式
                for (let i = 0; i < this.tableData3.length; i++) {
                    let item = this.tableData3[i];
                    let tip = "第" + (i + 1) + "条";
                    if (!item.unitPrice)
                        return this.$message.error(tip + "未填写单价");
                    if (!item.price)
                        return this.$message.error(tip + "未填写预算");
                    if (!item.applicationTime)
                        return this.$message.error(tip + "未选择申请时间");
                    let obj1 = {};
                    obj1.restDay = new Date(item.date).getTime();
                    obj1.restAccount = item.amount;
                    obj1.restOriginAccount = item.amount;
                    obj1.unitPrice = item.unitPrice;
                    obj1.totalPrice = item.price;
                    obj1.applyTime = item.applicationTime.getTime();
                    if (this.planType == "飞机") {
                        if (!item.fligtCom)
                            return this.$message.error(tip + "未选择航空公司");
                        if (!item.fightInfo)
                            return this.$message.error(tip + "未填写航班");
                        obj1.fligtCom = item.fligtCom;
                        obj1.fightInfo = item.fightInfo;
                    }
                    if (this.planType == "轮船") {
                        if (!item.pierInfo)
                            return this.$message.error(tip + "未填写码头信息");
                        if (!item.pierNum)
                            return this.$message.error(tip + "未填写航次");
                        obj1.pierInfo = item.pierInfo;
                        obj1.pierNum = item.pierNum;
                    }
                    if (this.planType == "火车") {
                        if (!item.trainInfo)
                            return this.$message.error(tip + "未填写火车信息");
                        if (!item.trainNum)
                            return this.$message.error(tip + "未填写车辆信息");
                        obj1.trainInfo = item.trainInfo;
                        obj1.trainNum = item.trainNum;
                    }
                    obj.routeRestDayEntityList.push(obj1);
                }
            }
            console.log(obj);
            this.$http
                .axios({
                    url: this.$api.addRouteRestDayByRest,
                    method: "post",
                    json: true,
                    data: obj
                })
                .then(res => {
                    if (res == 1) this.$message.success("添加成功");
                    this.dialogVisible5 = false;
                    this.loadData();
                });
        },
        checkNum4(index) {
            //校验单价6位
            this.$nextTick(() => {
                this.tableData3[index].unitPrice = Validate.checkNum(
                    this.tableData3[index].unitPrice
                ).slice(0, 6);
                this.tableData3[index].price =
                    this.tableData3[index].amount *
                    this.tableData3[index].unitPrice;
            });
        },
        getTable() {
            //生成计划位预算
            if (!this.addDataArr.length)
                return this.$message.error("未选择日期");
            if (!this.editNum) return this.$message.error("未填写数量");
            let arr = [];
            for (let i = 0; i < this.addDataArr.length; i++) {
                let item = this.addDataArr[i];
                arr.push({
                    date: item.day,
                    amount: this.editNum, //数量
                    applyTime: "",
                    unitPrice: "", //单价
                    price: "", //总价
                    fightInfo: "",
                    fligtCom: "",
                    pierInfo: "", //码头信息
                    pierNum: "", //轮船航次
                    trainInfo: "", //火车信息
                    trainNum: ""
                });
            }
            this.tableData3 = arr;
        },
        sureEditNum() {
            //确定修改计划位数量
            if (!this.editNum) return this.$message.error("未填写数量");
            if (!this.delDate.length) return this.$message.error("未选择日期");
            let obj = {
                restId: this.restId,
                restAccount: this.editNum,
                restDay: this.delDate.join(",")
            };
            this.$http
                .axios({
                    url: this.$api.updateRouteDayRest,
                    method: "post",
                    data: obj
                })
                .then(res => {
                    if (res == 1) this.$message.success("修改成功");
                    this.dialogVisible4 = false;
                    this.loadData();
                });
        },
        checkNum() {
            //校验数量5位数
            if (this.editNum) {
                this.$nextTick(() => {
                    this.editNum = Validate.checkNum(this.editNum).slice(0, 5);
                });
            }
        },
        sureDelDate() {
            //确认删除计划位日期
            if (!this.delDate.length) return this.$message.error("未选择日期");
            let obj = { restId: this.restId, restDay: this.delDate.join(",") };
            this.$http
                .axios({
                    url: this.$api.delRouteRestDayByDate,
                    method: "post",
                    data: obj
                })
                .then(res => {
                    if (res == 1) this.$message.success("删除成功");
                    this.dialogVisible3 = false;
                    this.loadData();
                });
        },
        getData1(data) {
            //增加的日期
            console.log(data);
            this.addDataArr = data;
        },
        getData(data) {
            //获取删除计划位日期
            this.delDate = data;
        },
        handleCommand(command) {
            console.log(command);
            switch (command.num) {
                case 3: //删除计划位日期
                    this.delDateArr = this.tableData[command.index].restTime;
                    this.dialogVisible3 = true;
                    this.delDate = [];
                    this.restId = this.tableData[command.index].restId;
                    break;
                case 1: //修改计划位数量
                    let vm = this;
                    vm.editDateArr = [];
                    this.editNum = "";
                    this.delDate = [];
                    this.tableData[command.index].restTime.forEach(function(
                        item,
                        index
                    ) {
                        vm.editDateArr.push({
                            proLeaveTime: item.day,
                            proRest: item.price
                        });
                    });
                    this.dialogVisible4 = true;
                    this.restId = this.tableData[command.index].restId;
                    break;
                case 2: //增加计划位日期
                    this.delDateArr = this.tableData[command.index].restTime;
                    this.dialogVisible5 = true;
                    this.editNum = "";
                    this.addDataArr = [];
                    this.tableData3 = [];
                    this.planType = this.tableData[command.index].restType;
                    this.restId = this.tableData[command.index].restId;
            }
        },
        delPlan(restId) {
            //删除计划位提示弹框
            this.dialogVisible2 = true;
            this.restId = restId;
        },
        sureDel() {
            //确认删除计划位
            this.$http
                .axios({
                    url: this.$api.updateRestProductValid,
                    method: "post",
                    data: { restId: this.restId }
                })
                .then(res => {
                    if (res == 1) this.$message.success("删除成功");
                    this.dialogVisible2 = false;
                    this.loadData();
                });
        },
        sureAdd() {
            //计划位添加产品
            let arr = [];
            this.addPlanPro.addProArr.forEach(function(item, index) {
                if (item.choosed) {
                    arr.push(item.proNum);
                }
            });
            if (!arr.length && this.addPlanPro.edit == 0)
                return this.$message.error("未选择产品");
            let obj = { restId: this.restId, proNums: arr.join(",") };
            this.$http
                .axios({
                    url: this.$api.addRestProductValid,
                    method: "post",
                    data: obj
                })
                .then(res => {
                    if (res == 1) {
                        let tip =
                            this.addPlanPro.edit == 0 ? "添加成功" : "修改成功";
                        this.$message.success(tip);
                    }
                    this.dialogVisible1 = false;
                    this.loadData();
                });
        },
        addPro(restId, obj) {
            //查找可被添加的计划位产品
            this.$http
                .axios({
                    url: this.$api.getAvailableProduct,
                    method: "get",
                    params: { restId: restId }
                })
                .then(res => {
                    if (!res.length) return this.$message.warning("暂无产品");
                    this.addPlanPro.edit = obj;
                    this.dialogVisible1 = true;
                    this.restId = restId;
                    this.addPlanPro.addProArr = [];
                    let vm = this;
                    res.forEach(function(item, index) {
                        let obj = {
                            proName: item.proName,
                            proNum: item.proNum,
                            proSelfNum: item.proSelfNum,
                            choosed: false
                        };
                        if (item.isAdd == 1) obj.choosed = true;
                        vm.addPlanPro.addProArr.push(obj);
                    });
                });
        },
        loadData() {
            //加载表格数据
            let obj = {
                pageNumber: this.currentPage,
                pageSize: this.pagesize
            };
            this.$http
                .axios({
                    url: this.$api.getRouteRestListByUserId,
                    method: "get",
                    params: obj
                })
                .then(res => {
                    let tableData = [];
                    let res1 = res.routeRestMapList;
                    this.totalCount = res.total;
                    let vm = this;
                    res1.forEach(function(item, index) {
                        let arr = [];
                        item.dateRest.forEach(function(item1, index) {
                            arr.push({
                                day: item1.restDay,
                                price: item1.restAccount
                            });
                        });
                        tableData.push({
                            restId: item.restId,
                            restName: item.restName,
                            restNum: item.restNum,
                            restType: vm.planType1(item.restType),
                            restTime: arr,
                            showCanlander: false,
                            isAdd: item.isAdd
                        });
                    });
                    this.tableData = tableData;
                });
        },
        planType1(obj) {
            //计划类型转换
            switch (obj) {
                case "0":
                    return "飞机";
                    break;
                case "1":
                    return "轮船";
                    break;
                case "2":
                    return "火车";
                    break;
                case "3":
                    return "其他";
                    break;
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
            // if(num < 10) num = '0'+num;
            return num;
        }
    }
};
</script>
<style scoped>
.con {
    padding: 10px 20px;
    color: #666;
}
.dot {
    margin: 20px 0;
    border-bottom: 1px dashed #ddd;
}
.item-bottom {
    margin-bottom: 10px;
}
.el-input,
.el-select {
    margin: 0 10px;
}
.blue {
    color: #45c8dc;
    cursor: pointer;
}
.el-dialog__body {
    line-height: inherit !important;
}
.fixed-calander {
    display: fixed;
    z-index: 2;
    top: 50%;
    left: 50%;
}
</style>>
