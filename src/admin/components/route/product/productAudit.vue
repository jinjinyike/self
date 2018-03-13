<template>
  <div id="product-manage">
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
                <el-table-column prop="proAdminAudit" label="审核状态" width="100" align="center"></el-table-column>
                <el-table-column label="产品详情" align="center" width="100">
                    <template slot-scope="scope">
                        <span class="colorOra" @click="getDetail(scope.$index, scope.row)">产品详情</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-select v-model="audit" placeholder="请选择" @change='changeAudit(scope.$index, scope.row)'>
                            <el-option
                            v-for="item in auditArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
            <div align="right" class="pagination">
                <div class="self-count">
                    共 <span class="colorSky"> {{totalCount}} </span> 条产品
                </div>
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pagesize"
                    :page-sizes="[10, 20, 30 ,40]"
                    layout="sizes,prev, pager, next ,jumper"
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
        year: "2017",
        stateArr: [{
                value: "1",
                label: "正常运营"
            },{
                value: "0",
                label: "仓库存放"
            },{
                value: "2",
                label: "等待运营"
            }],
        state: "1",
        auditArr: [{
                value: "1",
                label: "审核通过"
            },{
                value: "0",
                label: "审核不通过"
            }],
        audit: "",
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
        loadData(){
            this.$http.axios({
                url: this.$api.adminGetRouteCommandList+'?start='+(this.currentPage-1)+'&size='+this.pagesize+'&sort=asc&order=createtime&proAdminAudit=',
                method: 'post',
                data: '',
                json: true
            }).then(res=>{
                console.log(res);
                this.tableData = res.data;
                this.totalCount = res.total;
            })
        },
        // 序号
        indexMethod(index) {
            let num = (this.currentPage-1)*this.pagesize + 1+index
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
        getDetail(index,row){
            // alert(row.proNum);
            this.$router.push({
                name:'productShowDetail',
                query:{proNum:row.proNum}
            })
        },
        //上架
        upStore(index, row) {
            this.$confirm('确定上架吗?', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            //   type: 'warning',
                center: true
            }).then(() => {
                this.$http.axios({
                    url: this.$api.routeProUp+'/'+row.proNum,
                    method: 'post',
                    data: '',
                    json: true
                }).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '上架成功!'
                        });
                        this.loadData();
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消上架'
                });
            });
        },
        // 下架
        downStore(index, row){
            console.log(index);
            console.log(row.proNum);
            this.$confirm('确定下架吗?', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true
            }).then(() => {
                    this.$http.axios({
                        url: this.$api.routeProDown+'/'+row.proNum,
                        method: 'post',
                        data: '',
                        json: true
                    }).then(res=>{
                        this.$message({
                            type: 'success',
                            message: '下架成功!'
                        });
                        this.loadData();
                    })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消下架'
                });
            });
        },
        //删除
        handleDelete: function(index, row) {
                this.$confirm('确定删除产品吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                // row.proNum
                this.$http.axios({
                    url: this.$api.routeProDown+'/'+row.proNum,
                    method: 'post',
                    data: '',
                    json: true
                }).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.loadData();
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
                });
            });
        },
        changeYear(){ // 改变年份触发
            this.changePage();
            console.log(this.year);
            console.log(this.currentPage);
            this.loadData();
        },
        changeState(){ // 改变状态触发
            this.changePage();
            console.log(this.state);
            console.log(this.currentPage);
            this.loadData();
        },
        changePage(){
            this.currentPage = 1;
        },
        // 点击是否审核通过
        changeAudit(index,row){
            console.log(row.proNum);
            console.log(this.audit);
            if(this.audit==='1'){
                this.$confirm('确定审核通过吗?', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                        this.$http.axios({
                            url: this.$api.audityes+'/'+row.proNum,
                            method: 'post',
                            data: '',
                            json: true
                        }).then(res=>{
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                            this.loadData();
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }else if(this.audit==='0'){
                this.$confirm('确定审核不通过吗?', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                        this.$http.axios({
                            url: this.$api.auditno+'/'+row.proNum,
                            method: 'post',
                            data: '',
                            json: true
                        }).then(res=>{
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                            this.loadData();
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
            this.audit = '';
        },
        //改变当前点击的行的class，高亮当前行
        tableRowClassName ({row, rowIndex}) {
            if (rowIndex%2 == 1) {
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
    created () {
        this.loadData();
    }
};
</script>
<style lang='scss' scoped>
    #product-manage{
        margin-top: 20px;
        .colorOra{
            color: #ff746f;
            cursor: pointer;
        }
        .manage-top{
            padding: 12px;
            padding-left: 2%;
            // border-bottom: 1px solid #ddd;
            .state-choose{
                margin-left: 20px;
            }
        }
       .productManage-table{
            //  width: 96%;
            height: 100%;
            margin: auto;
            .el-table .proNum div{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .pagination{
                margin-top: 15px;
                display: flex;
                .self-count{
                    line-height:32px;
                    width: 100px;
                    .colorSky{
                        // color: #43c8dc;
                        color:#ff746f;
                        font-size: 18px;
                    }
                }
            }
            .el-pagination{
                flex:1;
            }
       }

    }


</style>

