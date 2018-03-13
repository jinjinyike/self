<template>
    <div class="right-content-index">
        <el-tabs v-model="activeName" type="card" class='add'>
            <el-tab-pane label="群组管理" name="first">
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
                    <el-table-column prop="name" label="群组名称" width="170" align="center"></el-table-column>
                    <el-table-column label="对应公司" class-name="proNum" align="center">
                        <template slot-scope="scope">
                            <el-tooltip :content="tableData[scope.$index].comName" placement="bottom" effect="light">
                                <div>
                                    {{tableData[scope.$index].comName}}
                                </div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="proNum" label="成员数量" width="170" align="center"></el-table-column>
                    <el-table-column prop="proStored" label="群组来源" width="100" align="center"></el-table-column>
                    <el-table-column label="群组管理" align="center" width="150">
                        <template slot-scope="scope">
                            <el-dropdown @command="handleCommand">
                            <span style="display:inline-block;width:130px;" >
                                <img class="el-dropdown-link" src="/static/img/control.png" alt="" style="width:22px;height:18px;margin-top:2px;">
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command='{data:tableData[scope.$index].id,num:1}'>查看详情</el-dropdown-item>
                                <el-dropdown-item :command='{data:tableData[scope.$index].id,num:2}'>查看成员</el-dropdown-item>
                                <el-dropdown-item :command='{data:tableData[scope.$index].id,num:3}'>修改资料</el-dropdown-item>
                                <el-dropdown-item :command='{data:tableData[scope.$index].id,num:4}'>成员移动</el-dropdown-item>
                                <el-dropdown-item :command='{data:tableData[scope.$index].id,num:5}'>删除群组</el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown>
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
                        layout="sizes,prev, pager, next ,jumper"
                        :total="totalCount">
                    </el-pagination>
                </div>

            </el-tab-pane>
            <el-tab-pane label="添加群组" name="second">
                <div class="add-group">
                    <p class="group-name">
                        <span class="fir-span">群组名称<b style="float:right;color:#ff746f;">*</b></span>
                        <el-input placeholder="请输入群组名称(最多10个字)" :maxlength="10" v-model="groupName"></el-input>
                    </p>
                    <p class="company-detail">
                        <span class="fir-span">对应公司<b style="float:right;color:#ff746f;">*</b></span>
                        <el-select v-model="isCompany" placeholder="请选择" style="width:150px;">
                            <el-option
                            v-for="item in weatherCompany"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-show="isCompany==='1'" v-model="valueCompany" filterable placeholder="输入公司名称查询" style="width:347px;">
                            <el-option
                            v-for="item in companyList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input v-show="isCompany==='0'" placeholder="请输入群组对应总公司名称" v-model="companyName" style="width:347px;"></el-input>
                    </p>
                    <p>
                        <span class="fir-span">业务联系人</span>
                        <el-input placeholder="请输入姓名" :maxlength="5" v-model="employeeName" style="width:150px;"></el-input>
                        <el-input placeholder="请输入联系电话" :maxlength="11" v-model="employeePhone" style="width:347px;"></el-input>
                    </p>
                    <p>
                        <span class="fir-span">返佣政策</span>
                        <el-select v-model="policy">
                            <el-option
                            v-for="item in policyList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <span class="radio-content" v-show="policy==='1'">
                            <!-- <el-radio v-model="radio" label="1">返点</el-radio>
                            <el-radio v-model="radio" label="2">人头费</el-radio> -->
                            <el-checkbox v-model="checked3" label="返点"></el-checkbox>
                            <el-checkbox v-model="checked4" label="人头费"></el-checkbox>
                        </span>
                    </p>
                    <div style="text-align:center;margin-top:10px;">
                        <el-button type="primary" plain size='middle' style='' @click="sureAddGroup">确 定</el-button>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

        <!-- 群组详情dialog -->
        <el-dialog
            title="群组详情"
            :visible.sync="groupDetail"
            width="750px"
            center>
            <div class="group-detail">
                <p><span>群组名称</span>
                <span>{{detailData.name}}</span></p>
                <p>
                    <span>对应公司</span>
                    <span v-show="detailData.comName">{{detailData.comName}}</span>
                    <span v-show="!detailData.comName">无</span>
                </p>
                <p v-show="detailData.linkName || detailData.linkPhone"><span>业务联系人</span>
                <span>{{detailData.linkName}}</span><span>联系电话</span><span>{{detailData.linkPhone}}</span></p>
                <p>
                    <span>返佣政策</span>
                    <span v-show="detailData.isRebate == '1'">对应总公司有返佣</span>
                    <span v-show="detailData.isRebate == '0'" style="width:115px;margin-left:0;">对应总公司无返佣</span>
                    <span v-show="detailData.rebateType=='0'||detailData.rebateType=='2'" style="margin-left:20px;">返点</span><span v-show="detailData.rebateType=='1'||detailData.rebateType=='2'" style="margin-left:20px;">人头费</span>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="groupDetail = false">返 回</el-button>
            </span>
        </el-dialog>
        
        <!-- 群成员dialog -->
        <el-dialog
            title="群组成员"
            :visible.sync="groupMember"
            width="750px"
            center>
            <div class="group-member">
               <el-table
                ref="testTable"
                :data="memberData"
                @selection-change="handleSelectionChange"
                @row-click="handleclick"
                :row-class-name = "tableRowClassName"
                >
                    <el-table-column
                    type="index"
                    label="序号"
                    :index="indexMethod" width='80' align='center'>
                    </el-table-column>
                    <el-table-column label="分销商名称" class-name="proNum" align="center">
                        <template slot-scope="scope">
                            <el-tooltip :content="memberData[scope.$index].name" placement="bottom" effect="light">
                                <div>
                                    {{memberData[scope.$index].name}}
                                </div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="linkName" label="联系人" width="100" align="center"></el-table-column>
                    <el-table-column prop="linkPhone" label="联系电话" width="170" align="center"></el-table-column>
               </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="groupMember = false">返 回</el-button>
            </span>
        </el-dialog>

        <!-- 成员移动dialog -->
        <el-dialog
            title="成员移动"
            :visible.sync="removeMember"
            width="520px"
            center>
            <div class="remove-member">
                <span>将此群组全部成员移至</span>
                <el-select v-model="valueGroup" filterable placeholder="请选择">
                    <el-option
                    v-for="item in groupList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureRemoveMember">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除群组 -->
        <el-dialog
            title=""
            :visible.sync="deleteGroup"
            width="520px"
            center>
            <div class="delete-group" style="text-align:center">
                确定删除该群组吗？
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="" @click="deleteGroup = false">取 消</el-button>
                <el-button type="primary" @click="sureDeleteGroup">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改资料dialog -->
        <el-dialog
            title="修改资料"
            :visible.sync="editData"
            width="750px"
            center>
            <div class="add-group-dialog">
                <p class="group-name">
                    <span class="fir-span">群组名称<b style="float:right;color:#ff746f;">*</b></span>
                    <el-input v-model="detailData.name" placeholder="请输入群组名称(最多10个字)" :maxlength="10"></el-input>
                </p>
                <p class="company-detail">
                    <span class="fir-span">对应公司<b style="float:right;color:#ff746f;">*</b></span>
                    <el-select v-model="detailData.isHaveCom" placeholder="请选择" style="width:200px;">
                        <el-option
                        v-for="item in weatherCompany"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-show="detailData.isHaveCom==='1'" v-model="detailData.disComId" filterable placeholder="输入公司名称查询">
                        <el-option
                        v-for="item in companyList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input v-show="detailData.isHaveCom==='0'" placeholder="请输入群组对应总公司名称" v-model="detailData.comName"></el-input>
                </p>
                <p>
                    <span class="fir-span">业务联系人</span>
                    <el-input placeholder="请输入姓名" :maxlength="5" v-model="detailData.linkName" style="width:200px;"></el-input>
                    <el-input placeholder="请输入联系电话" :maxlength="11" v-model="detailData.linkPhone" style="width:250px;"></el-input>
                </p>
                <p>
                    <span class="fir-span">返佣政策</span>
                    <el-select v-model="detailData.isRebate" style="width:200px;">
                        <el-option
                        v-for="item in policyList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span class="radio-content" v-show="detailData.isRebate==='1'">
                        <el-checkbox v-model="checked1" label="返点"></el-checkbox>
                        <el-checkbox v-model="checked2" label="人头费"></el-checkbox>
                    </span>
                </p>
            </div>
          
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { verificationPhone } from '../../../../common/utils/verificationUtils.js';
    export default {
        data() {
            return {
                activeName: 'first',
                groupDetail: false, // 群组详情
                groupMember: false, // 群组成员
                removeMember: false, // 成员移动
                editData: false, // 修改资料
                deleteGroup: false, // 删除群组
                //表格当前页数据
                tableData: [
                ],
                memberData:[
                    // {
                    //     proName: "天津至云南豪华shu能够飞游",
                    //     proNum:"1293093019039",
                    //     proStored:"正在运行",
                    // },
                    // {
                    //     proName: "天津至云南豪华shu能够飞游",
                    //     proNum:"1293093019039",
                    //     proStored:"正在运行",
                    // }
                ],
                groupList:[
                    // {
                    //     value:1,
                    //     label: "天津群组"
                    // },
                    // {
                    //     value:2,
                    //     label: "北京群组"
                    // }
                ],
                valueGroup:'', // 选择群组
                companyList:[
                    // {
                    //     value: '1',
                    //     label:'天津市同游会科技'
                    // },
                    // {
                    //     value: '2',
                    //     label:'天津市同游会科技'
                    // }
                ],
                valueCompany:'',
                isCompany:'1', // 是否包含公司
                weatherCompany:[
                    {
                        value:'0',
                        label:'无对应总公司'
                    },
                    {
                        value:'1',
                        label:'有对应总公司'
                    }
                ],
                policyList:[
                    {
                        value:'0',
                        label:'对总公司无返佣'
                    },
                    {
                        value:'1',
                        label:'对总公司有返佣'
                    }
                ],
                policy:'1', // 是否有返佣
                checked3:false, // 返点
                checked4:false, // 人头费
                groupName:'', // 对应群组名称
                companyName:'', //手输公司名称
                employeeName:'', // 员工姓名
                employeePhone:'', // 员工电话
                // 
                checked1:false, // 修改返点
                checked2:false, // 修改人头费
                detailData:{}, //详情弹框
                id:'', // 点击每一行所存储的id
                //多选数组
                multipleSelection: [],
                //请求的URL
                // url: "newstu/querystudentbypage", 
                criteria: "",//搜索条件    
                select: "",//下拉菜单选项    
                pagesize: 10,//默认每页数据量   
                highlightId: -1,//默认高亮行数据id
                currentPage: 1,//当前页码
                start: 1,//查询的页码
                totalCount: 0//默认数据总数
            };
        },
        
        methods: {
            // 确定添加群组
            sureAddGroup(){
                let obj={};
                obj.name = this.groupName; // 群组名称
                obj.isHaveCom = this.isCompany; // 是否包含公司
                if(this.isCompany === '1') {
                    if(!this.valueCompany) return this.$message.error('请选择对应总公司');
                    obj.disComId = this.valueCompany;
                    for (let i = 0; i < this.companyList.length; i++) {
                        if(this.valueCompany==this.companyList[i].value){
                            obj.comName = this.companyList[i].label;
                            break;
                        }                        
                    }
                }
                if (this.isCompany ==='0') {
                    if(this.companyName) obj.comName = this.companyName; // 公司名称
                };
                if(this.employeeName) obj.linkName = this.employeeName;
                if(this.employeePhone) {
                    obj.linkPhone = this.employeePhone;
                    if(verificationPhone(this.employeePhone)==='0') return this.$message.error('请输入业务联系人电话');
                }
                // if(!this.employeeName) return this.$message.error('请输入业务联系人姓名');
                // if(verificationPhone(this.employeePhone)==='0') return this.$message.error('请输入业务联系人电话');
                obj.isRebate = this.policy;
                if(this.policy==='1'){
                    if(this.checked3 && this.checked4) obj.rebateType = 2;
                    if(this.checked3 && !this.checked4) obj.rebateType = 0;
                    if(!this.checked3 && this.checked4) obj.rebateType = 1;
                    if(!this.checked3 && !this.checked4) return this.$message.error('至少选择一项');
                }
                this.$http.axios({
                    url:this.$api.distributorGroupAddGroup,
                    method:'post',
                    data:obj,
                    json:true
                }).then(res=>{
                    this.groupName = ''; // 群组名称
                    this.isCompany = '1'; // 是否包含公司
                    this.valueCompany = '';
                    this.employeeName = '';
                    this.employeePhone = '';
                    this.policy = '1';
                    this.checked3 =false;
                    this.checked4 =false;
                    this.addGroupDialog = false;
                    this.$message.success('添加成功');
                    this.loadData();
                })
            },
            loadData(){
                this.$http
                    .axios({
                        url:
                            this.$api.distributorGroupGetGroupList +
                            '?start=' +
                            (this.currentPage - 1) +
                            '&size=' +
                            this.pagesize,
                        method: 'get',
                        // params: this.searchObj(),
                        json: false
                    })
                    .then(res => {
                        this.tableData = res.data;
                        this.totalCount = res.total;
                        this.groupList = [];
                        this.valueGroup = '';
                        for (let i = 0; i < this.tableData.length; i++) {
                            // console.log(this.tableData);
                            this.groupList.push({value:this.tableData[i].id,label:this.tableData[i].name});
                        }
                    });
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
            // 确定修改
            sureEdit(){
                console.log(11111)
                let obj={};
                obj.name = this.detailData.name; // 群组名称
                obj.isHaveCom = this.detailData.isHaveCom; // 是否包含公司
                obj.id = this.detailData.id;
                if (this.detailData.isHaveCom ==='0') {
                    if(this.detailData.comName) obj.comName = this.detailData.comName; // 公司名称
                };
                if(this.detailData.isHaveCom ==='1'){
                    obj.disComId = this.detailData.disComId;
                    if(!this.detailData.disComId) return this.$message.error('请选择对应总公司');
                    for (let i = 0; i < this.companyList.length; i++) {
                        if(this.detailData.disComId==this.companyList[i].value){
                            obj.comName = this.companyList[i].label;
                            break;
                        }                        
                    }
                }
                if(this.detailData.linkName) obj.linkName = this.detailData.linkName;
                if(this.detailData.linkPhone) {
                    obj.linkPhone = this.detailData.linkPhone;
                    if(verificationPhone(this.detailData.linkPhone)==='0') return this.$message.error('请输入正确的业务联系人电话');
                }
                // if(!this.detailData.linkName) return this.detailData.$message.error('请输入业务联系人姓名');
                // if(verificationPhone(this.detailData.linkPhone)==='0') return this.$message.error('请输入正确的业务联系人电话');
                obj.isRebate = this.detailData.isRebate;
                if(this.detailData.isRebate==='1'){
                    if(this.checked1 && this.checked2) obj.rebateType = 2;
                    if(this.checked1 && !this.checked2) obj.rebateType = 0;
                    if(!this.checked1 && this.checked2) obj.rebateType = 1;
                    if(!this.checked1 && !this.checked2) return this.$message.error('至少选择一项');
                }
                this.$http
                    .axios({
                        url: this.$api.distributorGroupUpdate,
                        method: 'post',
                        data: obj,
                        json: true
                    })
                    .then(res => {
                        this.$message.success('修改成功');
                        this.loadData();
                        this.editData = false;
                    });
            },
            handleCommand(command){
                // console.log(command);
                this.id = command.data; // 之前的群组id 值
                if(command.num===1){ // 群组详情
                    this.groupDetail = true;
                    this.getDeatilData(command.data);
                }
                if(command.num===2){ // 群组成员
                    this.groupMember = true;
                    // distributorFindByClass
                    this.$http
                    .axios({
                        url: this.$api.distributorFindByClass,
                        method: 'post',
                        data:{groupId:command.data,statu:1},
                        json: true
                    })
                    .then(res => {
                        this.memberData = res;
                    });
                }
                if(command.num===3){ // 修改群组
                    this.editData = true;
                    this.getDeatilData(command.data);
                }
                if(command.num==4){ // 成员移动
                    this.removeMember = true;
                    // this.sureRemoveMember(command.data);
                }
                if(command.num==5){ // 删除群组
                    this.deleteGroup = true;
                }
            },
            sureDeleteGroup(){ // 删除群组
                // distributorGroupDelete
                // this.id 
                this.$http
                    .axios({
                        url: this.$api.distributorGroupDelGroup+this.id,
                        method: 'get',
                        // params:'',
                        json: false
                    })
                    .then(res => {
                        this.$message.success('群组删除成功');
                        this.deleteGroup = false;
                        this.loadData();
                    });
            },
            sureRemoveMember(){ // 群组成员移动
                this.removeMember = false;
                // console.log({groupId:this.id,targetId:this.valueGroup});
                // return ;
                this.$http
                    .axios({
                        url: this.$api.modifyMoveGroup,
                        method: 'post',
                        data:{groupId:this.id,targetId:this.valueGroup},
                        json: false
                    })
                    .then(res => {
                        // this.memberData = res;
                        this.$message.success('群组成员移动成功');
                        this.loadData();
                    });
            },
            getDeatilData(id){
                this.$http
                    .axios({
                        url: this.$api.distributorGroupDetail+id,
                        method: 'get',
                        json: false
                    })
                    .then(res => {
                        this.detailData = res;
                        if(this.detailData.isRebate==='1'){
                            if(this.detailData.rebateType!='1') this.checked1 = true;
                            if(this.detailData.rebateType!='0') this.checked2 = true;
                        }
                    });
            }
        },
        mounted(){
            this.loadData();
            // getRegistCom
            this.$http
                .axios({
                    url: this.$api.getRegistCom,
                    method: 'get',
                    json: false
                })
                .then(res => {
                    for (let i = 0; i < res.length; i++) {
                        this.companyList.push({value:res[i].userId,label:res[i].NAME});
                    }
                });
        }
    };
</script>
<style lang='scss' scoped>
    // // 设置头部样式 
    // .el-tabs__item{
    //     padding: 0;
    // }
    .el-tabs .el-table{
        margin: auto;
        border-top: 1px solid #ddd;
    }
    .flex{
        display: flex;
    }
    .el-pagination{
        flex:1;
    }
    .pagination{
        width: 98%;
        margin: auto;
        margin-top: 10px;
    }
    .colorSky{
        color: #ff746f;
        font-size: 16px;
    }
    // 添加群组样式
    .add-group{
        width: 90%;
        margin: auto;
        color: #666;
        p,.company-detail{
            line-height: 50px;
            border-bottom: 1px dashed #ddd;
            .fir-span {
                display: inline-block;
                width: 75px;
            }
            .radio-content{
                margin-left: 20px;
            }
        }
        .group-name .el-input{
            width: 500px;
        }
        .company-detail .el-input,.company-detail .el-select:nth-child(3){
            width:250px;
        }
    }
    .add-group-dialog{
        width: 90%;
        margin: auto;
        color: #666;
        p,.company-detail{
            line-height: 50px;
            border-bottom: 1px dashed #ddd;
            .fir-span {
                display: inline-block;
                width: 75px;
            }
            .radio-content{
                margin-left: 20px;
            }
        }
        .group-name .el-input{
            width: 200px;
        }
        .company-detail .el-input,.company-detail .el-select:nth-child(3){
            width:250px;
        }
    }
    // 详情弹框样式
    .el-dialog .group-detail p{
        line-height: 40px;
        border-bottom: 1px dashed #ddd;
        span:nth-child(1){
            display: inline-block;
            width:100px;
        }
        span:nth-child(3){
            display: inline-block;
            margin-left: 35px;
            width: 85px;
        }
    }
    // 群成员弹框
    .group-member{
        max-height: 400px;
        overflow: auto;
    }
    // 成员移动
    .remove-member .el-select{
        width: 290px;
        margin-left: 10px;
    }
</style>
