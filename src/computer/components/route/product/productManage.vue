<template>
  <div id="product-manage">
        <div class="manage-top">
            <span>产品年份</span>
            <el-select v-model="year" placeholder="请选择" @change='changeYear'>
                <el-option
                v-for="item in yearArr"
                :key="item"
                :value="item">
                </el-option>
            </el-select>
            <span class="state-choose">产品状态</span>
            <el-select v-model="state" placeholder="请选择" @change = 'changeState'>
                <el-option
                v-for="item in stateArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <!-- :default-sort = "{prop: 'availabelDate', order: 'ascending'}"//排序方式 -->
        <div class="productManage-table right-content-index">
            <el-table
            ref="testTable"
            :data="tableData"
            style="width:100%"
            @selection-change="handleSelectionChange"
            @row-click="handleclick"
            :row-class-name = "tableRowClassName"
            >
                <el-table-column
                type="index"
                label="序号"
                :index="indexMethod" width='80' align='center'>
                </el-table-column>
                <!-- <el-table-column prop="proName" label="产品名称"  show-overflow-tooltip placement="bottom" effect="light" class-name="proNum" align="center"></el-table-column> -->

                <el-table-column label="产品名称" class-name="proNum" align="center">
                    <template slot-scope="scope">
                        <el-tooltip :content="tableData[scope.$index].proName" placement="bottom" effect="light">
                            <div>
                                {{tableData[scope.$index].proName}}
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="proNum" label="产品编号" width="170" align="center"></el-table-column>
                <el-table-column  prop="proSelfNum" label="内部编号" width="120" align="center"></el-table-column>
                <el-table-column prop="availabelDate" label="产品有效期" width="120" align="center"></el-table-column>
                <el-table-column prop="proStored" label="产品状态" width="100" align="center"></el-table-column>
                <!-- <el-table-column label="产品详情" align="center" width="100">
                    <template slot-scope="scope">
                        <span class="does" @click="getDetail(scope.$index, scope.row)">产品详情</span>
                    </template>
                </el-table-column> -->
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-tooltip content="上架" placement="bottom" effect="light">
                           <el-button @click="upStore(scope.$index, scope.row)" v-show="state==='0'">
                               <span class="does up"></span>
                           </el-button>
                        </el-tooltip>
                        <el-tooltip content="下架" placement="bottom" effect="light">
                           <el-button  @click="downStore(scope.$index, scope.row)" v-show="state==='1'">
                               <span class="does down"></span>
                           </el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="bottom" effect="light">
                           <el-button @click="handleDelete(scope.$index, scope.row)">
                               <span class="does delete"></span>
                           </el-button>
                        </el-tooltip>
                        <el-tooltip content="详情" placement="bottom" effect="light">
                           <el-button @click="getDetail(scope.$index, scope.row)">
                               <span class="does detail"></span>
                           </el-button>
                        </el-tooltip>
                        <!-- <span class="does" @click="upStore(scope.$index, scope.row)" v-show="state==='0'">上架</span>
                        <span class="does" @click="downStore(scope.$index, scope.row)" v-show="state=='1'">下架</span>
                        <span class="does" @click="handleDelete(scope.$index, scope.row)">删除</span> -->
                    </template>
                </el-table-column>
            </el-table>
            <div align="right" class="pagination">
                <div class="self-count">
                    共 <span class="colorSky"> {{totalCount}} </span> 条产品
                </div>
                <!-- layout=" total,sizes, prev, pager, next, jumper" -->
                <!-- v-show='totalCount>pagesize' -->
                    <!-- :page-sizes="[10, 20, 30, 40]" -->
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pagesize"
                    :page-sizes="[10, 20, 30,40]"
                    layout="total,sizes,prev, pager, next ,jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      yearArr: [2018],
      year: "2018",
      stateArr: [
        {
          value: "1",
          label: "正常运营"
        },
        {
          value: "0",
          label: "仓库存放"
        },
        {
          value: "2",
          label: "等待运营"
        }
      ],
      state: "1",
      //表格当前页数据
      tableData: [
        // {
        //     proName: "天津至云南豪华shu能够飞游",
        //     proNum:"1293093019039",
        //     proSelfNum:"HHH3123",
        //     availabelDate: "2016-05-02",
        //     proStored:"正在运行",
        // }
      ],
      //多选数组
      multipleSelection: [],
      //请求的URL
      // url: "newstu/querystudentbypage",
      //搜索条件
      criteria: "",
      //下拉菜单选项
      select: "",
      //默认每页数据量
      pagesize: 10,
      //默认高亮行数据id
      highlightId: -1,
      //当前页码
      currentPage: 1,
      //查询的页码
      start: 1,
      //默认数据总数
      totalCount: 0
    };
  },

  methods: {
    //从服务器读取数据
    loadData() {
      this.$http
        .axios({
          // url: this.$api.getRouteCommandList+'?start='+this.currentPage+'&size='+this.pagesize+'&proStored='+this.state,
          url:
            this.$api.getRouteCommandList +
            "?start=" +
            (this.currentPage - 1) +
            "&size=" +
            this.pagesize +
            "&proStored=" +
            this.state +
            "&createTime=" +
            this.year +
            "-01-01" +
            "&sort=desc&order=createtime&proAdminAudit=3",
          method: "post",
          data: "",
          json: true
        })
        .then(res => {
          console.log(res);
          this.tableData = [];
          this.tableData = res.data;
          this.totalCount = res.total;
          // this.$set(this.data,'tableData',res.data)
        //   for (let i = 0; i < res.data.length; i++) {
        //     this.tableData.push({});
        //     this.$set(this.$data.tableData[i], "proName", res.data[i].proName);
        //     this.$set(this.$data.tableData[i], "proNum", res.data[i].proNum);
        //     this.$set(
        //       this.$data.tableData[i],
        //       "proSelfNum",
        //       res.data[i].proSelfNum
        //     );
        //     this.$set(
        //       this.$data.tableData[i],
        //       "availabelDate",
        //       res.data[i].availabelDate
        //     );
        //     this.$set(
        //       this.$data.tableData[i],
        //       "proStored",
        //       res.data[i].proStored
        //     );
        //   }
        });
    },
    // 序号
    indexMethod(index) {
      let num = (this.currentPage - 1) * this.pagesize + 1 + index;
      // if(num < 10) num = '0'+num;
      return num;
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
      this.$router.push({
        name: "productShowDetail",
        query: { proNum: row.proNum }
      });
    },
    //上架
    upStore(index, row) {
      this.$confirm("确定上架吗?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        //   type: 'warning',
        center: true
      })
        .then(() => {
          this.$http
            .axios({
              url: this.$api.routeProUp + "/" + row.proNum,
              method: "post",
              data: "",
              json: true
            })
            .then(res => {
              this.$message({
                type: "success",
                message: "上架成功!"
              });

                this.loadData();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消上架"
          });
        });
    },
    // 下架
    downStore(index, row) {
      this.$confirm("确定下架吗?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {
          this.$http
            .axios({
              url: this.$api.routeProDown + "/" + row.proNum,
              method: "post",
              data: "",
              json: true
            })
            .then(res => {
              this.$message({
                type: "success",
                message: "下架成功!"
              });
              this.loadData();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架"
          });
        });
    },
    //删除
    handleDelete: function(index, row) {
      this.$confirm("确定删除产品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          // row.proNum
          this.$http
            .axios({
              url: this.$api.routeProDeal + "/" + row.proNum,
              method: "post",
              data: "",
              json: true
            })
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.loadData();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    changeYear() {
      // 改变年份触发
      this.changePage();
      console.log(this.year);
      console.log(this.currentPage);
      this.loadData();
    },
    changeState() {
      // 改变状态触发
      this.changePage();
      console.log(this.state);
      console.log(this.currentPage);
      this.loadData();
    },
    changePage() {
      this.currentPage = 1;
    },
    //改变当前点击的行的class，高亮当前行
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "info-row";
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
    }
  },
  created() {
    this.loadData();
  }
};
</script>
<style lang='scss' scoped>
#product-manage {
  .manage-top {
    padding: 12px;
    padding-left: 2%;
    // border-bottom: 1px solid #ddd;
    .state-choose {
      margin-left: 20px;
    }
  }
  .productManage-table {
    //  width: 96%;
    height: 100%;
    margin: auto;
    .el-table .proNum div {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .el-button{
        padding: 0px;
        border: none;
        background: none;
    }
    .does {
      color: #43c8dc;
      cursor: pointer;
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 27px;
    //   border: none;
    }
    .up {
      background: url("/static/img/up.png") no-repeat;
      background-size: 20px 20px;
    }
    .down {
      background: url("/static/img/down.png") no-repeat;
      background-size: 20px 20px;
    }
    .delete {
    //   margin-left: 15px;
      background: url("/static/img/delete.png") no-repeat;
      background-size: 20px 20px;
    }
    .detail {
    //   margin-left: 15px;
      width: 10px;
      height: 16px;
      background: url("/static/img/detail.png") no-repeat;
      background-size: 10px 16px;
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
}
</style>

