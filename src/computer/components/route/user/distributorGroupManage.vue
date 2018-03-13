<template>
    <div class="right-content-index">
        <div class="top">
            <el-button type="primary" size="small" @click="addGroup">添 加 群 组</el-button>
        </div>
         <el-table
            ref="testTable"
            :data="tableData"
            style="width:100%"
            @selection-change="handleSelectionChange"
            @row-click="handleclick"
            :row-class-name = "tableRowClassName"
            >
            <el-table-column type="selection"></el-table-column>
            <el-table-column
            type="index"
            label="序号"
            :index="indexMethod" width='80' align='center'>
            </el-table-column>
            <el-table-column prop="proStored" label="群组名称" align="center"></el-table-column>
            <el-table-column prop="proStored" label="分销商数量" align="center"></el-table-column>

            <el-table-column label="群组操作" align="center" width="150">
                <template slot-scope="scope">
                    <el-select v-model="controlValue" placeholder="请选择" @change='controlGroup(scope.$index, scope.row)'>
                        <el-option
                        v-for="item in controlList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
        <div align="right" class="pagination flex">
            <div class="self-count" style="width:100px;">
                共 <span class="colorSky"> {{totalCount}} </span> 个群组
            </div>
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pagesize"
                    :page-sizes="[10, 20, 30,40]"
                    layout="sizes,prev, pager, next ,jumper"
                    :total="totalCount">
            </el-pagination>
        </div>
        <!-- 添加群组dialog -->
        <el-dialog
            title=""
            :visible.sync="addGroupDialog"
            width="30%"
            center>
            <p class="add-group">
                <span>群组名称</span>
                <el-input placeholder="请输入群组名称,最多10字" :maxlength="10" v-model = "groupName"></el-input> 
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addDisGroup">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 群组重命名dialog -->
        <el-dialog
            title="群组重命名"
            :visible.sync="renameGroupDialog"
            width="30%"
            center>
            <p class="add-group">
                <span>群组名称</span>
                <el-input placeholder="请输入群组名称,最多10字" :maxlength="10" v-model="rename"></el-input> 
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="renameGroupDialog = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 成员移动dialog -->
        <el-dialog
            title="将此群组内分销商移动至其他群组"
            :visible.sync="memberRemoveDialog"
            width="30%"
            center>
            <p class="add-group">
                <span>选择群组</span>
                <el-select v-model="groupValue" filterable placeholder="请选择群组">
                    <el-option v-for="item in groupList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="memberRemoveDialog = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除群组dialog -->
        <el-dialog
            title=""
            :visible.sync="deleteGroup"
            width="30%"
            center>
            <p class="add-group">
                确定删除此群组吗？
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button type="" @click="deleteGroup = false">取 消</el-button>
                <el-button type="primary" @click="deleteGroup = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                addGroupDialog: false, // 添加群组dialog
                renameGroupDialog: false, // 重命名dialog
                memberRemoveDialog: false, // 成员移动群组
                deleteGroup:false, // 删除群组
                //表格当前页数据
                tableData: [
                    {
                        proName: "天津至云南豪华shu能够飞游",
                        proNum:"12930930190",
                        proStored:"正在运行",
                        number:'10'
                    },
                    {
                        proName: "天津至云南豪华shu能够飞游",
                        proNum:"12930930190",
                        proStored:"正在运行",
                        number:'10'
                    }
                ],
                groupName: '', // 新增加群组 
                rename: '', // 群组重命名
                controlList:[ // 操作arr
                    {value:'0',label:'选择操作'},
                    {value:'1',label:'成员移动'},
                    {value:'2',label:'重命名'},
                    {value:'3',label:'删除群组'},
                ],
                controlValue:'0',

                groupValue:'', // 选择分销商
                groupList:[ // 分销商arr
                    {value:'0',label:'全部群组'},
                    {value:'1',label:'北辰地区分销商'},
                    {value:'2',label:'虹桥地区分销商'},
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
            }
        },
        methods:{
            loadData(){},
            addDisGroup(){
                // this.$http.axios({
                //     url:this.$api.distributorGroupAddGroup,
                //     method:'post',
                //     data:{name:this.groupName},
                //     json:true
                // }).then(res=>{
                //     this.addGroupDialog = false;
                //     this.$message.success('添加成功');

                //     this.loadData();
                // })
            },
             //点击行响应
            handleclick: function(row, event, column) {
                this.highlightId = row.id;
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
            },
            addGroup(){ // 点击添加群组
                this.addGroupDialog = true;
            },
            // 群组操作
            controlGroup(index,row){
                if(this.controlValue === '1'){ // 成员移动
                    this.memberRemoveDialog = true;
                }
                if(this.controlValue === '2'){ // 重命名
                    // this.rename = row. // 重命名回显
                    this.renameGroupDialog = true;
                }
                if(this.controlValue === '3'){ // 删除群组
                    this.deleteGroup = true;
                }
                this.controlValue = '0';
            },
            reset(){ // 重置操作
                this.controlValue = '0';
            }
        }
    }
</script>
<style lang="scss" scoped>
    .flex{
        display: flex;
    }
    .self-count{
        line-height: 32px;
    }
    .el-pagination{
        flex:1;
    }
    .colorSky{
        color: #ff746f;
        font-size: 16px;
    }
    .pagination{
        width: 96%;
        margin: auto;
        margin-top: 10px;
    }
    .top{
        line-height: 50px;
        border-bottom: 1px solid #ddd;
        text-align: right;
        .el-button{
            background: #fff;
            border-radius: 0;
            color: #45c8dc;
            border-color: #45c8dc;
            height: 30px;
            margin-right: 3%;
            // width: 15%;
        }
    }
    .el-dialog{
        .add-group{
            text-align: center;
            .el-input,.el-select{
                width: 60%;
                margin-left: 10px;
            }
        }
        
    }
</style>
