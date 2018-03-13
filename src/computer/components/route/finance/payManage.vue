<template>
  <div class="right-content-index">
      <div class="item">
        <span>产品类型</span>
        <el-select v-model='proNum'>
          <el-option v-for='item in option' :value="item.proNum" :label='item.proName' :key='item.proNum'></el-option>
        </el-select>
        <span>时间段</span>
        <el-date-picker v-model="start1" type="date" placeholder="选择日期" style='width:11%'></el-date-picker>
        <span>-</span>
        <el-date-picker v-model="end" type="date" placeholder="选择日期" style='width:11%'></el-date-picker>
        <span>全部员工</span>
        <employee :employeeType='2'></employee>
        <span>付款状态</span>
        <el-select style='width:13%' v-model='payStatu'>
          <el-option v-for='item in option1' :value="item.value" :label='item.label' :key='item.value'></el-option>
        </el-select>
        </div>
        <div class="dot"></div>
        <div class="item-bottom" style='text-align:center'>
          <el-button type='primary' plain size='small'>查询</el-button>
        </div>
        <div class="item-bottom">
          <el-table :data="tableData" style="width: 100%"  @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="序号" width="70" align="center" :index="indexMethod" type='index'></el-table-column>
            <el-table-column prop="" label="产品名称" width="" align="center"></el-table-column>
            <el-table-column prop="" label="预定日期" width="" align="center"></el-table-column>
            <el-table-column prop="" label="订单金额" width="" align="center"></el-table-column>
            <el-table-column prop="" label="联系人姓名" width="" align="center"></el-table-column>
            <el-table-column prop="" label="联系人电话" width="" align="center"></el-table-column>
            <el-table-column prop="" label="订单状态" width="" align="center"></el-table-column>
            <el-table-column prop="" label="公司员工" width="" align="center"></el-table-column>
            <el-table-column prop="" label="详情" width="" align="center"></el-table-column>
          </el-table>
        </div>
        <div align="right" class="pagination">
				<div class="self-count">
                    <el-button type="primary" plain size="small">导出Excel</el-button>
				</div>
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" :page-sizes="[10, 50, 100 ,200]" layout="total,sizes,prev, pager, next ,jumper" :total="totalCount">
				</el-pagination>
			</div>
  </div>
</template>
<script>
import employee from "../../public/employee";
export default {
    data() {
        return {
            proNum: "",
            start1: "",
            end: "",
            payStatu: "",
            tableData:[],
            option: [],
            option1: [
                { value: "0", label: "全部状态" },
                { value: "1", label: "已付款" },
                { value: "2", label: "未付款" }
            ],
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
        };
    },
    components: {
        employee
    },
    created() {
        this.$http
            .axios({
                url: this.$api.getAllRouteProducts + "?valid=0",
                method: "get"
            })
            .then(res => {
                res.unshift({ proName: "全部产品", proNum: "" });
                this.option = res;
            });
    },
    methods:{
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
};
</script>
<style lang="scss" scoped>
.right-content-index {
    color: #666;
}
.item {
    margin: 20px;
    .el-input,
    .el-select {
        margin: 0 10px;
    }
}
.dot {
    margin: 20px;
    border-bottom: 1px dashed #ddd;
}
.item-bottom {
    margin-bottom: 10px;
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
