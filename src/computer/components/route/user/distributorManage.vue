<template>
    <div class="right-content-index">
        <el-tabs v-model="activeName" type="card" class='add'>
            <el-tab-pane label="分销商管理" name="first">
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
                    <el-table-column label="分销商名称" class-name="proNum" align="center">
                        <template slot-scope="scope">
                            <el-tooltip :content="tableData[scope.$index].name" placement="bottom" effect="light">
                                <div>
                                    {{tableData[scope.$index].name}}
                                </div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="groupName" label="所属群组" width="200" align="center"></el-table-column>
                    <el-table-column prop="linkName" label="联系人" width="100" align="center"></el-table-column>
                    <el-table-column prop="linkPhone" label="联系电话" width="120" align="center"></el-table-column>
                    <el-table-column prop="num" label="业务人员" width="100" align="center"></el-table-column>
                    
                    <el-table-column label="分销商管理" align="center" width="150">
                        <template slot-scope="scope">
                            <el-dropdown @command="handleCommand">
                            <span style="display:inline-block;width:130px;" >
                                <img class="el-dropdown-link" src="/static/img/control.png" alt="" style="width:22px;height:18px;margin-top:2px;">
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command='{data:tableData[scope.$index].id,num:1}'>查看详情</el-dropdown-item>
                                <el-dropdown-item :command='{data:tableData[scope.$index].id,num:2}'>添加业务员</el-dropdown-item>
                                <el-dropdown-item :command='{data:tableData[scope.$index].id,num:3}'>修改资料</el-dropdown-item>
                                <el-dropdown-item :command='{data:tableData[scope.$index].id,num:4}'>支付设置</el-dropdown-item>
                                <el-dropdown-item :command='{data:tableData[scope.$index].id,num:5}'>匹配账号</el-dropdown-item>
                                <el-dropdown-item :command='{data:tableData[scope.$index].id,num:6}'>删除分销商</el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
                <div align="right" class="pagination flex">
                    <div class="self-count" style="width:100px;">
                        共 <span class="colorSky"> {{totalCount}} </span> 个分销商
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
            <el-tab-pane label="添加分销商" name="second">
                <div class="add-distributor">
                    <div class="add-distributor-top">
                        <div class="check-title">
                            <span>分销商绑定手机号检测</span>
                        </div>
                        <p>
                            <span class="fir-span">手机号 <span class="colorOrg">*</span></span>
                            <el-input placeholder="请输入手机号" :maxlength="11" v-model="phone" @keyup.native="phoneChange"></el-input>
                            <el-button type="primary" size="small" @click="checkPhone">检测</el-button>
                            <span style="color:#ff746f" v-show="disObj.existType==='2'">此手机已绑定同游会账户</span>
                            <span style="color:#ff746f" v-show="disObj.existType==='3'">此手机已被添加为分销商</span>
                            <span style="color:#ff746f" v-show="disObj.existType==='0' || disObj.existType==='1'">此手机绑定账户可添加</span>
                        </p>
                    </div>
                    <div class="add-distributor-main" v-show="showDis">
                        <div class="check-title">
                            <span>分销商信息</span>
                        </div>
                        <p>
                            <span class="fir-span">分销商名称<span class="colorOrg">*</span></span>
                            <el-input placeholder="请输入分销商名称" v-model="disObj.name"></el-input>
                        </p>
                        <p v-show="disObj.existType==='0'">
                            <span class="fir-span">账户密码<span class="colorOrg">*</span></span>
                            <el-input placeholder="6-20位数字或字母" v-model="disObj.password"></el-input>
                        </p>
                        <p>
                            <span class="fir-span">业务联系人<span class="colorOrg">*</span></span>
                            <el-input placeholder="输入联系人" v-model="disObj.linkName"></el-input>
                            <el-input placeholder="输入联系电话" v-model="disObj.linkPhone"></el-input>
                        </p>
                        <p>
                            <span class="fir-span">分销商类型</span>
                            <template>
                                <el-radio v-model="disObj.userRole" label="02020000">个人分销商</el-radio>
                                <el-radio v-model="disObj.userRole" label="02010000">企业分销商</el-radio>
                            </template>
                        </p>
                        <p>
                            <span class="fir-span">选择群组<span class="colorOrg">*</span></span>
                            <el-select v-model="valueGroup">
                                <el-option v-for="item in groupList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </p>
                        <div style="text-align:center;margin-top:10px;">
                            <el-button type="primary" plain size='middle' style='' @click="commit">确定添加</el-button>
                        </div>
                    </div>
                    
                </div>
                
            </el-tab-pane>
        </el-tabs>

        <!-- 分销商详情dialog -->
        <el-dialog
            title="分销商详情"
            :visible.sync="distributorDetail"
            width="500px"
            center>
            <div class="distributor-detail">
                <p><span>分销商名称</span><span>{{detailObj.name}}</span></p>
                <p><span>所属群组</span><span>{{detailObj.groupId}}</span></p>
                <p><span>业务联系人</span><span>{{detailObj.linkName}}</span><span>联系电话</span><span>{{detailObj.linkPhone}}</span></p>
                <p><span>绑定手机号</span><span>{{detailObj.phoneNum}}</span></p>
                <div>
                    <span class="fir-span">业务员信息</span>
                    <div class="name-phone">
                        <p v-for="item in detailObj.distributorSalesmanEntityList">
                            <span>{{item.name}}</span><span>{{item.phone}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="distributorDetail = false">返 回</el-button>
            </span>
        </el-dialog>
        
        <!-- 添加业务员dialog -->
        <el-dialog
            title="添加业务员"
            :visible.sync="addSalesMan"
            width="450px"
            center>
            <div class="sales-man">
                <p>
                    <span class="fir-span">业务员姓名</span>
                    <el-input placeholder="请输入姓名" v-model="employeeObj.name"></el-input>
                </p>
                <p>
                    <span class="fir-span">联系电话</span>
                    <el-input placeholder="请输入电话" v-model="employeeObj.phone" :maxlength="11"></el-input>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addEmployee">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 支付设置dialog -->
        <el-dialog
            title="支付设置"
            :visible.sync="paySetting"
            width="450px"
            center>
            <div class="pay-setting">
                <el-checkbox v-model="outline">线下支付</el-checkbox>
                <el-checkbox v-model="inline">线上支付</el-checkbox>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="payCommit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改资料dialog -->
        <el-dialog
            title="修改资料"
            :visible.sync="editData"
            width="700px"
            center>
            <div class="edit-distributorData">
                <p class="huge">
                    <span>分销商名称</span>
                    <el-input placeholder="请输入分销商名称" v-model="detailObj.name"></el-input>
                </p>
                <p class="huge">
                    <span>所属群组</span>
                    <el-select v-model="detailObj.groupId">
                        <el-option v-for="item in groupList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </p>
                <p class="normal">
                    <span>业务联系人</span>
                    <el-input placeholder="联系姓名" v-model="detailObj.linkName"></el-input>
                    <el-input placeholder="联系电话" :maxlength="11" v-model="detailObj.linkPhone"></el-input>
                </p>
                <div style="line-height:40px;">
                    <span class="fir-span">业务员信息</span>
                    <el-button type="primary" @click="addEmp" v-show="detailObj.distributorSalesmanEntityList && detailObj.distributorSalesmanEntityList.length==0" plain size='small' style="border-radius:0;background:#fff;color: #45c8dc;border-color: #45c8dc">增加+</el-button>
                    <div class="name-phone">
                        <p v-for="(item,index) in detailObj.distributorSalesmanEntityList">
                            <el-input placeholder="业务员姓名" v-model="item.name"></el-input>
                            <el-input placeholder="业务员电话" :maxlength="11" v-model="item.phone"></el-input>
                            <el-button type="primary" plain size='small' @click="deleteEmp(index)">删除-</el-button>
                            <el-button type="primary" plain size='small' @click="addEmp" v-show="index==0">增加+</el-button>
                        </p>
                    </div>
                </div>  
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureChangeEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 匹配账号 -->
        <el-dialog
            title="匹配账号"
            :visible.sync="matchAccount"
            width="650px"
            center>
            <div class="match-account">
                <p>
                    <span class="fir-span">系统分销商</span>
                    <el-select v-model="distributorValue">
                        <el-option v-for="item in distributorList"
                        :value="item.value"
                        :label="item.label"
                        :key="item.value">
                        </el-option>
                    </el-select>
                </p>
                <p>
                    <span class="fir-span">绑定手机号</span>
                    <el-input placeholder="输入手机号" :maxlength="11"></el-input>
                    <el-button type="primary" plain size='small' style=''>检 索</el-button>
                </p>
                <div class="add-distributor-main">
                    <div class="check-title">
                        <span>检索结果</span>
                    </div>
                    <p>
                        <span class="fir-span">分销商名称</span>
                        <span>天津乐友国际旅行社</span>
                    </p>
                    <p>
                        <span class="fir-span">绑定手机号</span>
                        <span>15222222222</span>
                        <span class="fir-span" style="margin-left:15px;">账号ID</span>
                    </p>
                    <p>
                        <span class="fir-span">业务联系人</span>
                        <span>小明同学</span>
                        <span>15522222222</span>
                    </p>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="matchAccount = false">确定匹配</el-button>
            </span>
        </el-dialog>
        <!-- 删除分销商 -->
        <el-dialog
            title=""
            :visible.sync="deleteDis"
            width="25%"
            center>
            <p style="text-align:center;">确定删除分销商吗？</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDis = false">取 消</el-button>
                <el-button type="primary" @click="deleteDis = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { verificationPhone,verificationUser } from '../../../../common/utils/verificationUtils.js';
    export default {
        data() {
            return {
                activeName: 'first',
                distributorDetail: false, // 群组详情
                addSalesMan: false, // 群组成员
                paySetting: false, // 支付设置
                editData: false, // 修改资料
                outline: false, // 线下支付
                inline: false, // 线上支付
                matchAccount: false, // 匹配账号
                deleteDis:false, // 删除分销商
                //表格当前页数据
                tableData: [
                    
                ],
                memberData:[
                    {
                        proName: "天津至云南豪华shu能够飞游",
                        proNum:"1293093019039",
                        proStored:"正在运行",
                    },
                    {
                        proName: "天津至云南豪华shu能够飞游",
                        proNum:"1293093019039",
                        proStored:"正在运行",
                    }
                ],
                groupList:[ //
                    
                ],
                weatherCompany:[
                    {
                        value:'0',
                        label:'无对应公司'
                    },
                    {
                        value:'1',
                        label:'有对应公司'
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
                employeeObj:{ // 添加业务员
                    name:'',
                    phone:''
                },
                detailObj:[], //详情
                distributorList:[
                ],
                distributorValue:'', // 分销商选择
                policy:'1', // 是否有返佣
                isCompany:'1', // 是否包含公司
                valueGroup:'', // 选择群组
                radio:'1',
                showDis: false,
                disObj:{
                    existType:'',
                    name:'',
                    linkName:'', // 联系人姓名
                    linkPhone:'', // 联系电话
                    password:'', // 密码
                    userRole:'02020000',
                },
                phone:'', //检测分销商手机号
                id:'', // id值
                //多选数组
                multipleSelection: [],
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
            // 增加业务员
            addEmployee(){
                if(!this.employeeObj.name) return this.$message.error('业务联系人姓名未填写');
                if(verificationPhone(this.employeeObj.phone)==='0') return this.$message.error('业务联系人手机号码填写有误');
                this.$http.axios({
                    url:this.$api.addDistributorSalesman ,
                    method: 'post',
                    data:{name:this.employeeObj.name,phone:this.employeeObj.phone,distributorId:this.id},
                    json: true
                })
                .then(res => {
                    this.loadData();
                    this.$message.success('业务员添加成功');
                    this.addSalesMan = false;
                    this.employeeObj.name = '';
                    this.employeeObj.phone = '';
                });
            },
            payCommit(){ // 支付设置
                let payType = '0';
                if(!this.inline && this.outline) payType = '1'; 
                if(this.inline && this.outline) payType = '2'; 
                if(!this.inline && !this.outline) return this.$message.error('至少选择一种支付方式');
                this.$http.axios({
                    url:this.$api.distributorUpdate ,
                    method: 'post',
                    data:{pay:payType,id:this.id},
                    json: true
                })
                .then(res => {
                    this.$message.success('支付方式设置成功');
                    this.paySetting = false;
                });
            },
            phoneChange(){
                // console.log('change')
                if(this.phone.length !=11){
                    this.clear();
                }
            },
            // 详情
            distributor(num){
                this.detailObj = {};
                this.$http.axios({
                    url:this.$api.distributorDetail+this.id,
                    method: 'post',
                    // data:obj,
                    json: true
                })
                .then(res => {
                    this.detailObj = res;
                    if(num == 1){
                        for(let i =0;i<this.groupList.length;i++){
                            if(this.groupList[i].label==this.detailObj.groupId){
                                this.detailObj.groupId = this.groupList[i].value;
                                break;
                            }
                        }
                    }
                });
            },
            handleCommand(command){
                console.log(command);
                this.id = command.data;
                if(command.num===1){
                    this.distributorDetail = true;
                    this.distributor();
                }
                if(command.num===2){
                    this.employeeObj.name = '';
                    this.employeeObj.phone = '';
                    this.addSalesMan = true;
                }
                if(command.num===3){
                    this.editData = true;
                    this.distributor(1);
                }
                if(command.num==4){ // 支付设置
                    this.paySetting = true;
                    this.inline = false;
                    this.outline = false;
                    this.$http.axios({
                        url:this.$api.distributorFindById+this.id,
                        method: 'get',
                        json: false
                    })
                    .then(res => {
                        switch(res.pay){
                            case '2':
                                this.inline = true;
                                this.outline = true;
                            break;
                            case '1':
                                this.inline = false;
                                this.outline = true;
                            break;
                            case '0':
                                this.inline = true;
                                this.outline = false;
                            break;
                        }
                    });
                }
                if(command.num==5){
                    this.matchAccount = true;
                }
                if(command.num==6){
                    this.deleteDis = true;
                }
                
            },
            deleteEmp(index){
                this.detailObj.distributorSalesmanEntityList.splice(index,1);
            },
            addEmp(){
                this.detailObj.distributorSalesmanEntityList.push({
                    name:'',phone:''
                });
            },
            // 确定修改分销商资料
            sureChangeEdit(){
                // let obj = {};
                let obj = {};
                let distributorSalesmanEntityList = [];
                obj.name = this.detailObj.name;
                if(!this.detailObj.name) return this.$message.error('请填写分销商名称');
                obj.groupId = this.detailObj.groupId;
                obj.linkPhone = this.detailObj.linkPhone;
                obj.linkName = this.detailObj.linkName;
                if(!this.detailObj.linkName) return this.$message.error('请填写业务联系人姓名');
                if(verificationPhone(this.detailObj.linkPhone)==='0') return this.$message.error('业务联系人电话填写有误');
                obj.id = this.id;
                for (let i = 0; i < this.detailObj.distributorSalesmanEntityList.length; i++) {
                    distributorSalesmanEntityList.push({
                        name:this.detailObj.distributorSalesmanEntityList[i].name,
                        phone:this.detailObj.distributorSalesmanEntityList[i].phone,
                    })  
                    if(!this.detailObj.distributorSalesmanEntityList[i].name) return  this.$message.error(`第${i+1}条 业务员姓名未填写`);            
                    if(verificationPhone(this.detailObj.distributorSalesmanEntityList[i].phone)==='0') return  this.$message.error(`第${i+1}条 业务员手机号填写有误`);            
                }
                // obj.obj = obj;
                if(distributorSalesmanEntityList.length>0){
                    obj.distributorSalesmanEntityList = distributorSalesmanEntityList;
                }
                console.log(obj);
                // return;
                this.$http.axios({
                    url:this.$api.updateDistributor ,
                    method: 'post',
                    data:obj,
                    json: true
                })
                .then(res => {
                    this.$message.success('分销商信息修改成功');
                    this.editData = false;
                });
            },
            commit(){ // 点击确定添加群组
                let obj = {};
                obj.phoneNum = this.phone;
                obj.name = this.disObj.name;
                obj.linkName = this.disObj.linkName;
                obj.linkPhone = this.disObj.linkPhone;
                obj.groupId = this.valueGroup;
                obj.bindType = this.disObj.existType;
                obj.userRole = this.disObj.userRole; // 注册类型
                if(!this.disObj.name) return this.$message.error('请输入分销商名称');
                if(!this.disObj.linkName) return this.$message.error('请输入业务联系人姓名');
                if(verificationPhone(this.disObj.linkPhone)==='0') return this.$message.error('请输入正确的业务联系人手机号码');
                if(this.disObj.existType ==='0'){
                    if(verificationUser(6,20,this.disObj.password)==='0') {
                        return this.$message.error('密码格式有误');
                    }else{
                        obj.password = this.$md5.md5(this.disObj.password);
                    }
                }
                if(!this.valueGroup) return this.$message.error('请选择群组');
                this.$http.axios({
                    url:this.$api.addDistributor ,
                    method: 'post',
                    data:obj,
                    json: true
                })
                .then(res => {
                    this.$message.success('分销商添加成功');
                    this.clear();
                    this.phone = '';
                });
            },
            clear(){
                this.disObj.existType = ''
                this.showDis = false;
                this.disObj.name= '';
                this.disObj.linkName=''; // 联系人姓名
                this.disObj.linkPhone=''; // 联系电话
                this.disObj.password=''; // 密码
            },
            // 检测手机号码
            checkPhone(){
                // console.log(123);
                if(this.phone.length==11){
                    if(verificationPhone(this.phone)==='1') {
                        this.$http.axios({
                            url: this.$api.queryDistributorExist+this.phone,
                            method:'get',
                            json:false
                        })
                        .then(res=>{
                            if(res.existType !='3'){
                                this.showDis = true;
                                this.disObj.name = res.name;
                            }else{
                                this.showDis = false;
                            }
                            this.disObj.existType = res.existType;
                        });
                    }else{
                        this.$message.error('请输入正确的手机号');
                    }
                }else{
                    this.$message.error('请输入正确的手机号');
                }
                
            },
            // 加载数据列表
            loadData(){
                this.$http
                    .axios({
                        url:
                            this.$api.getDisList +
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
        },
        mounted(){
            this.loadData();
            // 分销商群组
            this.$http.axios({
                        url:this.$api.distributorGroupGetGroupList ,
                        method: 'get',
                        json: false
                    })
                    .then(res => {
                        this.groupList = [];
                        for (let i = 0; i < res.data.length; i++) {
                            this.groupList.push({
                                value: res.data[i].id,
                                label: res.data[i].name,
                            })                                    
                        }
                    });
        }
    };
</script>
<style lang='scss' scoped>
    // 设置头部样式 
    // #tab-first{
    //     text-align: center;
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
    .add-distributor{
        width: 90%;
        margin: auto;
        color: #666;
        .fir-span{
            width: 80px;
            display: inline-block;
        }
        .colorOrg{
            float: right;
            color: #ff746f;
        }
        .check-title{
            line-height:40px;
            border-bottom:1px solid #ddd;
        }
        .add-distributor-top{
            .el-input{
                width: 20%;
            }
            .el-button{
                background: #fff;
                border-radius: 0;
                color: #45c8dc;
                border-color: #45c8dc;
                margin-left: 3%;
            }
        }
        .add-distributor-main{
            .el-input,.el-select{
                width: 20%;
            }
        }
        p{
            line-height: 50px;
            border-bottom: 1px dashed #ddd;
        }
        .group-name .el-input,.company-detail .el-input,.company-detail .el-select:nth-child(3){
            width: 33%;
        }
    }
    // 详情弹框样式
    .distributor-detail{
        max-height: 400px;
        overflow: auto;
        p{
            line-height: 40px;
            border-bottom: 1px dashed #ddd;
            span:nth-child(1){
                display: inline-block;
                width:20%;
            }
            span:nth-child(3){
                display: inline-block;
                margin-left: 25px;
                width: 20%;
            }
        }
        .fir-span,.name-phone{
            display: inline-block;
        }
        .fir-span{
            vertical-align:top;
            width: 19%;
            line-height:40px;
        }
        .name-phone{
            width: 79%;
            span:nth-child(1){
                width: 25%;
            }
        }
    }
    // 修改资料
    .edit-distributorData{
        max-height: 400px;
        overflow: auto;
        p{
            line-height: 40px;
            border-bottom: 1px dashed #ddd;
            span{
                display: inline-block;
                width: 90px;
                // width: 20%;
            }
        }
        .huge{
            .el-select,.el-input{
                width: 400px;
            }
        }
        .normal .el-input:nth-child(2){
            width: 150px;
            // width: 24%;
        }
        .normal .el-input:nth-child(3){
            width: 245px;
            // width: 40%;
        }
        .fir-span{
            display: inline-block;
            width: 90px;
            vertical-align: top;
            line-height: 40px;
        }
        .name-phone{
            display: inline-block;
            // width: 78%;
            width: 548px;
            p .el-input:nth-child(1){
                // width: 26%;
                width: 150px;
            }
            p .el-input:nth-child(2){
                width: 245px;
                // width: 37%;
            }
            .el-button{
                background: #fff;
                border-radius: 0;
                color: #45c8dc;
                border-color: #45c8dc;
                // width: 15%;
            } 
        }
    }
    // 群成员弹框
    .sales-man{
        p{
            line-height: 50px;
            border-bottom: 1px dashed #ddd;
            .fir-span{
                display: inline-block;
                width: 18%;
            }
            .el-input{
                width: 70%;
            }
        }
    }
    // 成员移动
    .pay-setting{
        text-align: center;
    }
    .match-account{
        p{
            line-height: 50px;
            border-bottom: 1px dashed #ddd;
            
        }
        .fir-span{
            display: inline-block;
            width: 80px;
        }
        .check-title{
            text-align: center;
            line-height: 50px;
            border-bottom: 1px solid #ddd;
        }
        .el-select{
            width: 60%;
        }
        .el-input{
            width: 30%;
        }
        .el-button{
            background: #fff;
            border-radius: 0;
            color: #45c8dc;
            border-color: #45c8dc;
            height: 30px;
            margin-left: 10%;
            // width: 15%;
        }
    }
</style>
