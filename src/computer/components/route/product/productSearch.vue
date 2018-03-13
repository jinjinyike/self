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
                <el-table-column label="产品二维码" align="center" width="100">
                    <template slot-scope="scope">
                        <span class="does" @click="getProTwoCode(scope.$index, scope.row)">查看并下载</span>
                    </template>
                </el-table-column>
                <el-table-column label="产品海报图" align="center" width="150">
                    <template slot-scope="scope">
                        <span class="does" @click="getProPoster(scope.$index, scope.row)">查看并下载</span>
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
        <el-dialog :title="dialogTitle" :visible.sync="centerDialogVisible" width="35%" center>
			<div style="text-align:center;">
                <img :src="imgUrl" alt="">
            </div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">下 载</el-button>
			</span>
		</el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
        yearArr: [2018],
        year: "2018",
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
        centerDialogVisible:false,
        imgUrl:'',
        dialogTitle:'',
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
                url: this.$api.getRouteCommandList+'?start='+(this.currentPage-1)+'&size='+this.pagesize+'&proStored='+this.state+'&createTime='+this.year+'-01-01'+'&sort=desc&order=createtime&proAdminAudit=3',
                method: 'post',
                data: '',
                json: true
            }).then(res=>{
                console.log(res);
                this.tableData = res.data;
                this.totalCount = res.total;
                // console.log(this.)
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
        // 获取二维码
        getProTwoCode(index,row){
            // alert(row.proNum);
            this.dialogTitle = '产品二维码';
            this.centerDialogVisible = true;

            this.imgUrl = 'http://pics.ctripfair.com/o_1c2ns2s5n1emrrdo1tbi1q7h1ehl11.jpg?imageslim';
        },
         // 获取海报图
        getProPoster(index,row){
            // alert(row.proNum);
            this.dialogTitle = '产品海报图';
            this.centerDialogVisible = true;

            this.imgUrl = 'http://pics.ctripfair.com/o_1c2nrdne61npa66a1oug6g318c7n.jpg?imageslim';
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
            .does{
                color: #ff746f;
                cursor: pointer;
               
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
        .el-dialog img{
            width: 300px;
            height: 300px;
        }
    }


</style>

