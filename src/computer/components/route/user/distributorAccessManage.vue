<template>
    <div class="right-content-index">
        <div class="top">
            <span class="fir-span">分销商类型</span>
            <el-select v-model="distributorType">
                <el-option v-for="item in distributorList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <span class="fir-span">客户分组</span>
            <el-select v-model="groupValue" filterable placeholder="请选择">
                <el-option
                v-for="item in groupList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <span class="fir-span">搜索分销商</span>
            <el-input placeholder="请输入手机号" :maxlength="11"></el-input>
            <el-button type="primary" size="small">搜 索</el-button>
        </div>
        <div class="middle">
            <el-select v-model="controlValue" placeholder="请选择" @change="controlChange">
                <el-option v-for="item in controlList"
                :key="item.vlaue"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
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
            <el-table-column label="分销商名称" class-name="proNum" align="center">
                <template slot-scope="scope">
                    <el-tooltip :content="tableData[scope.$index].proName" placement="bottom" effect="light">
                        <div>
                            {{tableData[scope.$index].proName}}
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="proNum" label="手机号码" width="120" align="center"></el-table-column>
            <el-table-column prop="proStored" label="分销商类型" width="100" align="center"></el-table-column>
            <el-table-column prop="proStored" label="订单数量" width="100" align="center"></el-table-column>
            <el-table-column prop="proNum" label="所属分组" width="180" align="center"></el-table-column>
            <el-table-column prop="number" label="分销授信" width="100" align="center"></el-table-column>
            
            <el-table-column prop="proStored" label="价格调整" align="center" width="100"></el-table-column>
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
                    :page-sizes="[10, 20, 30,40]"
                    layout="sizes,prev, pager, next ,jumper"
                    :total="totalCount">
            </el-pagination>
        </div>
        <!-- 分销授信dialog -->
        <el-dialog
            title="对此分销商进行授信,超过额度不能执行操作"
            :visible.sync="distributorAccess"
            width="30%"
            center>
            <p class="distributor-access">
                <span>授信额度</span>
                <el-input placeholder="请输入额度,最高99999" type="number"></el-input> 元
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="distributorAccess = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 价格调整 -->
        <el-dialog
            title="价格调整"
            :visible.sync="adjustPrice"
            width="40%"
            center>
            <div class="adjust-price">
                <!-- <el-input placeholder="请输入额度,最高99999" type="number"></el-input> 元 -->
                <div>
                    <span>选择对此分销调整分销价格的产品</span>
                    <p class="product-name">
                        <el-select filterable v-model="productValue" placeholder="选择分销价格调整的产品">
                            <el-option v-for="item in productList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                            </el-option>
                        </el-select>
                        —
                        <el-input placeholder="请输入内部编号"></el-input>
                    </p>
                    <p>
                        <span style="margin-right:30px;">选择调整形式</span>
                        <el-radio v-model="radio" label="1">百分比形式</el-radio>
                        <el-radio v-model="radio" label="2">金额形式</el-radio>
                    </p>
                    <p v-show="radio=='1'">
                        <el-select v-model="percentValue">
                            <el-option v-for="item in percentList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                        <span class="fir-span">百分比</span>
                        <el-input placeholder="请输入数字" type="number"></el-input>
                        % (百分之)
                    </p>
                    <p v-show="radio=='2'">
                        <el-select v-model="percentValue">
                            <el-option v-for="item in percentList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                        <span class="fir-span">金额</span>
                        <el-input placeholder="请输入数字" type="number"></el-input> 元
                    </p>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="adjustPrice = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 欠款清账dialog -->
        <el-dialog
            title=""
            :visible.sync="clearAccount"
            width="30%"
            center>
            <div class="clear-account">
                <p>
                    <span>目前此分销商前框金额为</span>
                    <span>30000</span> 元
                </p>
                <p> 
                    <span>已经结算</span>
                    <el-input placeholder="请输入额度,最高99999" type="number"></el-input> 元
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="clearAccount = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    export default{
        data(){
            return {
                distributorAccess: false, // 分销授信dialog
                clearAccount: false, // 欠款清账dialog
                adjustPrice: false, // 价格调整dialog
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
                distributorType:'', // 选择的分销商类型
                distributorList:[ // 选择分销商类型list
                    {value:'0',label:'全部类型'},
                    {value:'1',label:'平台分销商'},
                    {value:'2',label:'导游/领队'},
                    {value:'3',label:'自建分销商'},
                    {value:'4',label:'电商平台'}
                    ],
                groupList:[ // 客户分组list
                    {value:'0',label:'全部分组'},
                    {value:'1',label:'和平区域分销商'},
                    {value:'2',label:'南开区域分销商'},
                    {value:'3',label:'塘沽区域分销商'},
                ],
                groupValue:'', // 客户分组
                controlList:[
                    {value:'0',label:'权限配置'},
                    {value:'1',label:'分销授信'},
                    {value:'2',label:'价格调整'},
                    {value:'3',label:'欠款清账'},
                ],
                controlValue:'0',
                distributorPhone:'', // 分销商手机号
                productList:[ // 价格调整产品列表
                    {value:'0',label:'全部产品'},
                    {value:'0211311',label:'马尔代夫一日游'},
                    {value:'0211321',label:'马尔代夫二日游'},
                    {value:'0211331',label:'马尔代夫三日游'},
                    {value:'0211341',label:'马尔代夫四日游'},
                ],
                productValue:'', // 选择产品
                radio: '1', // 价格调整形式

                percentValue: '0', 
                percentList:[ // 百分比
                    {value:'0',label:'降价'},
                    {value:'1',label:'加价'}
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
            // 点击权限配置
            controlChange(index){
                console.log(index);
                if(index === '1'){ // 分销权限
                    this.distributorAccess = true;
                }
                if(index === '2'){ // 价格调整
                    this.adjustPrice = true;
                }
                if(index === '3'){ // 欠款清账
                    this.clearAccount = true;
                }
                this.reset();
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
    .pagination{
        width: 96%;
        margin: auto;
        margin-top: 10px;
    }
    .colorSky{
        color: #ff746f;
        font-size: 16px;
    }
    .top{
        line-height: 50px;
        border-bottom: 1px dashed #ddd;
        .fir-span{
            display: inline-block;
            width: 80px;
            margin-left: 2%;
        }
        .el-select,.el-input{
            width: 20%;
        }
        .el-button{
            background: #fff;
            border-radius: 0;
            color: #45c8dc;
            border-color: #45c8dc;
            height: 30px;
            margin-left: 5%;
            // width: 15%;
        }
    }
    .middle{
        line-height: 50px;
        text-align: right;
        border-bottom: 1px solid #ddd;
        .el-select{
            margin-right: 10px;
        }
    }
    .el-dialog{
        .distributor-access{
            line-height: 50px;
            .el-input{
                width: 60%;
                margin-left: 3%;
            }
        }
        .clear-account{
            line-height: 50px;
            .el-input{
                width:60%;
            }
        }
        .adjust-price{
            p{
                line-height: 50px;
                border-bottom: 1px dashed #ddd;
            }
            .product-name{
                .el-select{
                    width: 55%;
                }
                .el-input{
                    width: 35%;
                }
            }
            .fir-span{
                display: inline-block;
                width:50px;
                margin-left: 10px;
            }
        }
    }
</style>
