<template>
<div>
				<div class="item" style="position:relative;text-align:center;margin-bottom:30px;margin-top:30px">
					<div class="dot"></div>
					<span class="center-title">基本信息</span>
				</div>
				<div class="item">
					<span class="span-title">产品名称</span>
                    <el-select  v-model='selectType'   style='width:150px' v-if='types==1' @change='selectTypeChange'>
						<el-option v-for='item in option0' :key='item.value' :value='item.value' :label='item.label'></el-option>
					</el-select>
                    <template v-if='selectType==0'>
                        <pro :valid='1' @change='proChange' :setWidth="width" ref='pro' :is-disable='isRest'></pro>
                        <span class="span-title">选择团期</span>
                        <el-input placeholder='选择团期' style='width:15%' @focus='focus' :change='changeDom' v-model='proLeaveTime' :disabled='isDisabled'></el-input>
                        <template v-if='rest'>
                            <span class="span-title">余位：</span>
                            <span>{{rest}}</span>
                        </template>
                    </template>
					<template v-else>
						<el-input placeholder="输入产品名称，不超过20字符" style='width:25%' v-model='editProName'></el-input>
						<!-- <span class="span-title">选择团期</span> -->
						<span>—</span>
						<el-date-picker
						v-model="leaveDate"
						type="date"
                        value-format='yyyy-MM-dd HH:mm:ss'
						placeholder="选择日期">
						</el-date-picker>
						<!-- <el-input placeholder="选择日期" ></el-input> -->
						<span class="span-title">行程天数</span>
						<el-select style='width:15%' v-model='routeDay'>
							<el-option v-for='item in 30' :value='item' :label='item' :key='item'></el-option>
						</el-select>
					</template>
				</div>
				<div class="item">
					<span class="span-title">分销商</span>
                    <el-select  v-model='selectDisType'   style='width:150px' v-if='types==1'>
						<el-option v-for='item in option7' :key='item.value' :value='item.value' :label='item.label'></el-option>
					</el-select>
					<template v-if='selectDisType==0'>
						<el-select placeholder='选择分销商' v-model='distributor' @change='distributorChange' filterable>
							<el-option v-for='item in option2' :key='item.id' :value='item.id' :label='item.name'></el-option>
						</el-select>
						<span>—</span>
						<el-select placeholder='选择业务员'  v-model='Salesman'  filterable style='width:217px'>
							<el-option v-for='item in option8' :key='item.id' :value='item.id' :label='item.name'></el-option>
						</el-select>
						<span class="span-title">手机查询</span>
						<el-input placeholder='分销商手机号' style='width:15%' v-model='phoneNum' v-on:input='checkSaleman'></el-input>
					</template>
				</div>
				<div class="item room">
					<span class="span-title">订单人数</span>
					<template v-if='adult'>
						<span>成人</span>
						<el-input v-model='adultNum' placeholder='数量' v-on:input='checkNum("adult")' :disabled='isRest'></el-input>
					</template>
					<template v-if='child'>
						<span>儿童</span>
						<el-input v-model='childNum' placeholder='数量' v-on:input='checkNum("child")' :disabled='isRest'></el-input>
					</template>
					<template v-if='student'>
						<span>学生</span>
						<el-input v-model='studentNum' placeholder='数量' v-on:input='checkNum("student")' :disabled='isRest'></el-input>
					</template>
					<template v-if='old'>
						<span>老人</span>
						<el-input v-model='oldNum' placeholder='数量' v-on:input='checkNum("old")' :disabled='isRest'></el-input>
					</template>
				</div>
				<div class="item room" v-if='isContainHotel==1||selectType==1'>
					<span class="span-title">房间数量</span>
					<template v-if='oneBedRoom'>
						<span>大床房</span>
						<el-input v-model='oneBedRoomNum' v-on:input='checkNum1("oneBedRoomNum")' placeholder='数量'></el-input>
					</template>
					<template v-if='doubleBedRoom'>
						<span>双人标间</span>
						<el-input v-model='doubleBedRoomNum' v-on:input='checkNum1("doubleBedRoomNum")' placeholder='数量'></el-input>
					</template>
					<template v-if='threeStandardRoom'>
						<span>三人标间</span>
						<el-input v-model='threeStandardRoomNum' v-on:input='checkNum1("threeStandardRoomNum")' placeholder='数量'></el-input>
					</template>
					<template v-if='threeFamilyRoom'>
						<span>三人家庭房</span>
						<el-input v-model='threeFamilyRoomNum' v-on:input='checkNum1("threeFamilyRoomNum")' placeholder='数量'></el-input>
					</template>
					<template v-if='fourBedRoom'>
						<span>四人间</span>
						<el-input  v-model='fourBedRoomNum' v-on:input='checkNum1("fourBedRoomNum")' placeholder='数量'></el-input>
					</template>
					<template v-if='moreBedRoom'>
						<span>多人间</span>
						<el-input v-model='moreBedRoomNum' v-on:input='checkNum1("moreBedRoomNum")' placeholder='数量'></el-input >
					</template>
					<template v-if='tent'>
						<span>露营</span>
						<el-input v-model='tentNum' v-on:input='checkNum1("tentNum")' placeholder='数量'></el-input>
					</template>
				</div>
				<div class="item" v-if='isRoomFree==1||selectType==1'>
					<span class="span-title">单房差</span>
					<el-select v-model='isRoom'>
						<el-option v-for='item in option33' :value='item.value' :label='item.label' :key='item.value'></el-option>
					</el-select>
					<template v-if='isRoom==1'>
						<el-input v-model='onePerAmount' placeholder='单房差'></el-input>元/天
					</template>
				</div>
				<div class="item">
					<span class="span-title">付款状态</span>
					<el-select v-model='statu'>
						<el-option v-for='item in option3' :value='item.value' :label='item.label' :key='item.value'></el-option>
					</el-select>
					<span>应收金额</span>
					<el-input v-model='payneed' placeholder='应收金额' v-on:input='checkNum3("payneed")'></el-input>
					<span>实收金额</span>
					<el-input v-model='paytrue' placeholder='实收金额' v-on:input='checkNum3("paytrue")'></el-input>
					<template v-if='statu==1'>
						<span>已收款金额</span>
						<el-input v-model='payed' placeholder='已收款金额' v-on:input='checkNum3("payed")'></el-input>
					</template>
				</div>
				<div class="item" style="margin-bottom:20px">
					<span class="span-title">其他条件</span>
					<el-select v-model='isLine'>
						<el-option v-for='item in option4' :value='item.value' :label='item.label' :key='item.value'></el-option>
					</el-select>
					<span>销售人员</span>
					<employee style='width:18%' ref='employee'></employee>
					<!-- <el-select v-model='supAddEmployeeId'>
						<el-option v-for='item in option5' :value='item.value' :label='item.label' :key='item.value'></el-option>
					</el-select> -->
				</div>
				<div class="item" style="position:relative;text-align:center;margin-bottom:30px;margin-top:30px">
					<div class="dot"></div>
					<span class="center-title">出行信息</span>
				</div>
		
				<div class="item">
					<span class="span-title">联系人姓名</span>
					<el-input v-model='linkName' placeholder='联系人姓名' :maxlength='8' style='width:20%'></el-input>
					<span class="span-title">联系人电话</span>
					<el-input v-model='linkPhone' placeholder='联系人电话' style='width:20%' :maxlength='11' ></el-input>
					<el-checkbox v-model='isPeople' style="float:right;margin-right:50px;margin-bottom:0px">出行人信息</el-checkbox>

				</div>
				<div class="item" >
					<span class="span-title">集合信息</span>
					<template v-if='selectType==1'>
						<!-- <el-input></el-input> -->
						<city placeholder="选择城市" @change='proGatherCity=arguments[0]' :inputcity='proGatherCity | changeData' :city-list="cityList" style="width:20%" ref='cityPicker'></city>
						<el-time-select
							v-model="proGatherTime1"
							:picker-options="{
								start: '00:00',
								step: '00:05',
								end: '23:55'
							}"
							placeholder="选择时间" style='width:12%;margin-left:0'>
							</el-time-select>
						<el-input placeholder="请输入集合地点(最多20字)" style='width:25%' v-model='proGatherPlace' ></el-input>
						<span>(若有其他集合信息，请自行加在备注信息里)</span>
					</template>
					<template v-if='selectType==0'>
						<el-select v-model='proGatherId' @change='showPickUpFee2("0")' style='width:20%'>
							<el-option v-for='item in routeGatherEntityList' :value='item.id' :label='item.proGatherTime +" "+ item.proGatherPlace' :key='item.id'>
								<span>{{item.proGatherTime}}</span>
								<span> {{item.proGatherPlace}}</span>
							</el-option>
						</el-select>
						<span v-if='showPickUpFee'>(此站点需要接送费{{proPickUpFee}}元/人)</span>
					</template>
				</div>
				<div class="item" v-if='selectType==0'>
					<template v-if='level'>
						<span class="span-title">选择级别</span>
						<el-select v-model='proPriceId' style='width:20%'>
							<el-option v-for='item in routePriceEntityList' :value='item.id' :key='item.id' :label='item.label'>
								<!-- style="float: left" -->
                                <span >{{item.proHotelLevel}} </span>
                                <span v-if='item.proHotelLevel&&item.fightNum'>x</span>
								<span > {{item.fightNum}}{{item.flightCom}} </span>
                                
							</el-option>
						</el-select>
					</template>
					
					<template v-if='routeUnionTransportEntityList.length'>
						<span class="span-title">联运服务</span>
						<el-select v-model='proUnionTransportId'>
							<el-option v-for='item in routeUnionTransportEntityList' :value='item.id' :label='item.cityName' :key='item.id'></el-option>
						</el-select>
					</template>
				</div>
				<div class="item" v-if='isPeople'>
					<span class='span-title'>出行人信息</span>
					<div style="" class="people">
						<div class="item-bottom" style='vertical-align:top;margin-top:-5px;'>
							<span style='width:60px;text-align:center'>序号</span>
							<span style='width:200px;text-align:center'>出行人姓名</span>
							<span style='width:200px;text-align:center'>证件类型</span>
							<span style='width:230px;text-align:center'>证件号码</span>
							<el-button type="primary" plain size='small' @click='addPeople'>添加</el-button>
							<el-button type="primary" plain size='small' @click='changeGathers' v-if='selectType==0'>更改集合信息</el-button>
						</div>
						<div v-for='(item,index) in peopleArr' class="item-bottom" :key='index'>
							<el-checkbox v-model='item.checked' style='width:60px;text-align:center'>{{index+1}}</el-checkbox>
							<el-input v-model='item.visitorName' style='width:180px' placeholder='出行人姓名' :maxlength='8'></el-input>
							<el-select v-model='item.visitorCertificateType' placeholder='证件类型' style='width:180px'>
								<el-option v-for='item1 in option6' :value='item1.value' :label='item1.label' :key='item1.value'></el-option>
							</el-select>
							<el-input v-model='item.visitorCertificateNum' style='width:210px' placeholder='证件号码' :maxlength='18'></el-input>
							<span style='width:200px'>
								<el-button type="primary" plain size='small' @click='delPeople(index)'>删除</el-button>
								<span v-show='item.gather' style="margin-left:10px">{{item.gather}}</span>
							</span>
						</div>
					</div>
				</div>
				<div class="dot" style="margin-bottom:25px"></div>
				<!-- 座位安排 -->
				<div class="item" v-if='(proSeat==1&&types==0)'>
					<span class="span-title">座位安排</span>
					<el-button type="primary" plain size='small' @click='obligate' style='margin-left:10px'>座位安排</el-button>
					<template v-if='carInfo.length' >
					<span style='margin-left:10px'>已选择</span>
					<span v-for='item in carInfo' :key='item.carNum' style='margin-right:10px'>{{item.carNum}}号车{{item.car}}座位</span>
					</template>
				</div>
				<div class="item">
					<span class="span-title">订单备注</span>
					<el-input type="textarea" style='width:35%;vertical-align:top' v-model='guideRemarks' placeholder='请输入订单备注'></el-input>
					<span class="span-title">财务备注</span>
					<el-input type="textarea" style='width:35%;vertical-align:top' v-model='remarks' placeholder='请输入财务备注'></el-input>
				</div>

				<div class="dot"></div>
				<div class="item item-bottom" style="text-align:center">
					<el-button type="primary" @click='addOrder' :disabled='isAddOrder'>添加订单</el-button>
				</div>
				<!-- 日历模态框 -->
				<el-dialog title="" :visible.sync="dialogVisible" width="560px">
					<div style="text-align:center">
					<calander v-if='dialogVisible' :obj='dataArr' :canClick='true' :isSingle='true' @getdata='getData'></calander>
				</div>
				</el-dialog>
				<el-dialog title="更换集合信息" :visible.sync="dialogVisible1" width="45%">
					<el-select v-model='proGatherId1' @change='showPickUpFee2("1")'>
						<el-option v-for='item in routeGatherEntityList' :value='item.id' :label='item.proGatherTime +" "+ item.proGatherPlace' :key='item.id'>
							<span>{{item.proGatherTime}}</span>
							<span> {{item.proGatherPlace}}</span>
						</el-option>
					</el-select>
					<span v-if='showPickUpFee1'>(此站点需要接送费{{proPickUpFee1}}元/人)</span>
					<span slot="footer" class="dialog-footer">
						<!-- <el-button @click="dialogVisible1 = false">取 消</el-button> -->
						<el-button type="primary" @click="changeGather">确 定</el-button>
					</span>
				</el-dialog>
				<select-site :select-click='true' :pro-leave-time='proLeaveTime' :rest-id='restId' :pro-num='proNum' :show-tab='showTab' @close='closeTab' :limit-num='limitNum' :allow-load='allowLoad'></select-site>
    </div>
</template>
<script>
import selectSite from "./selectSite.vue";
import Validate from "@/common/validate/validate.js";
import pro from "../../public/proName_Num.vue";
import calander from "../../public/calander_price.vue";
import employee from "../../public/employee.vue";
import city from "../../public/cityPicker.vue";
import cityList from "china-city-data";
import {
    verificationPhone,
    verificationID,
    testPassport
} from "@/common/utils/verificationUtils";
export default {
    props: {
        types: String,//0添加订单1添加单团
        default: '0'
    },
    data() {
        return {
            cityList,
            selectType: "0", //0现有产品，1自定义产品
            selectDisType: "0", //0分销商提供，1公司自营
            editProName:'',
            leaveDate: "", //自定义产品数据 出发团契
            routeDay: "", //天数
            proGatherTime1: "", //集合时间
            proGatherPlace:'',
            proGatherCity: "", //集合城市
            isAddOrder: false,
            isRest: false,
            allowLoad: false,
            // 控制是否顯示選座
            showTab: false,
            // 选座的人数限制
            limitNum: 0,
            restId: "",
            width: "217px",
            proNum: "",
            proNum1: "",
            distributor: "",
            adult: true,
            student: true,
            child: true,
            old: true,
            adultNum: "",
            studentNum: "",
            childNum: "",
            oldNum: "",
            oneBedRoom: false,
            doubleBedRoom: false,
            tent: false,
            threeStandardRoom: false,
            threeFamilyRoom: false,
            fourBedRoom: false,
            moreBedRoom: false,
            oneBedRoomNum: "",
            doubleBedRoomNum: "",
            tentNum: "",
            threeStandardRoomNum: "",
            threeFamilyRoomNum: "",
            fourBedRoomNum: "",
            moreBedRoomNum: "",
            statu: "0", //0未付1已付
            // isSys: '0', //0未上1已上
            proLeaveTime: "",
            isContainHotel: "", //是否包含住宿
            isLine: "0", //是否上系统(0否 1 是) ,
            linkName: "", //联系人信工
            linkPhone: "", //联系人电话
            guideRemarks: "", //导游备注
            remarks: "", //订单备注
            supAddEmployeeId: "", //供应商添加订单员工 ,
            proUnionTransportId: "", //联运编号
            proPriceId: "", //级别id
            everyDayId: "", //集合信息附带id
            proGatherId: "",
            proGatherId1: "",
            proPickUpFee: "",
            proPickUpFee1: "",
            onePerAmount: "", //单房差
            showPickUpFee: false, //接送费是否显示
            showPickUpFee1: false,
            showCanlder: false,
            dataArr: [],
            level: false, //差别是否
            isPeople: true, //是否出行人
            isDisabled: true,
            payneed: "",
            paytrue: "",
            payed: "",
            rest: "", //余位
            isRoomFree: "",
            isRoom: "",
            phoneNum:'',//分销商手机号
            Salesman:'',
            option0: [
                { value: "0", label: "现有产品" },
                { value: "1", label: "自定义产品" }
            ],
            option7: [
                { value: "0", label: "分销商提供" },
                { value: "1", label: "公司自营" }
            ],
            option8:[],
            option1: [],
            option2: [],
            option3: [
                { value: "0", label: "未付款" },
                { value: "1", label: "已付款" }
            ],
            option33: [
                { value: "0", label: "无单房差" },
                { value: "1", label: "有单房差" }
            ],
            option4: [
                { value: "0", label: "未上系统" },
                { value: "1", label: "已上系统" }
            ],
            option5: [
                { value: "0", label: "张三" },
                { value: "1", label: "李四" }
            ],
            option6: [
                { value: "1", label: "身份证" },
                { value: "2", label: "护照" },
                { value: "3", label: "港澳台通行证" },
                { value: "4", label: "军官证" }
            ],
            peopleArr: [
                {
                    visitorName: "",
                    visitorCertificateType: "1",
                    visitorCertificateNum: "",
                    checked: false,
                    proGatherId: "",
                    gather: ""
                }
            ],
            routeGatherEntityList: [], //集合信息
            routeUnionTransportEntityList: [], //联运
            routePriceEntityList: [], //酒店航班差别
            routeCon: {}, //是否有差别
            dialogVisible: false,
            dialogVisible1: false,
            proSeat: "",
            carInfo: [],
            childRest: "",
            oldRest: "",
            studentRest: "",
            adultRest: ""
        };
    },
    created() {
        this.creaChange();
        this.getdistribute();
    },
    mounted(){
        // let obj=[{id:'0',checked:true,contons:'1'},{id:'1',checked:true,contons:'2'},{id:'3',checked:false,contons:'3'}];
        // // let obj1=obj.filter(item=>!item.checked);//过滤true的数组
        // console.log("过滤器")
        // let obj1=obj.map(item=>item)
        // console.log(obj1)
        // console.log(obj)
        // let obj2=obj.find(item=>item.contons==="1")
        // console.log(obj2)
        // let obj3=obj.findIndex(item=>item.id==="0")
        // console.log(obj3)

    },
    components: {
        pro,
        calander,
        employee,
        selectSite,
        city
    },
    filters: {
        changeData(oldVal) {
            return oldVal;
        }
    },
    methods: {
        getdistribute(){
            this.$http.axios({
                url:this.$api.getDistributorList,
                method:'get',
            }).then(res=>{
                this.option2=res;
            })
        },
        selectTypeChange(){
            if(this.selectType==1){
                this.adult=true;
                this.student=true;
                this.old=true;
                this.child=true;
                this.proLeaveTime='';
                this.isDisabled=true;
                this.rest='';
                this.oneBedRoom = true;
                this.doubleBedRoom = true;
                this.tent = true;
                this.threeStandardRoom = true;
                this.threeFamilyRoom = true;
                this.fourBedRoom = true;
                this.moreBedRoom = true;
                // this.isContainHotel=1;//住宿
                // this.isRoomFree=1;//方差
            }
            
        },
        creaChange() {
            if (this.$route.query.id) {
                //从占位管理来的单子
                let proLeaveTime;
                this.$http
                    .axios({
                        url: this.$api.getOrderRestInfoByID,
                        method: "get",
                        params: { id: this.$route.query.id }
                    })
                    .then(res => {
                        this.$refs.pro.proNum = res.proNum;
                        this.$refs.pro.proNum1 = res.proNum;
                        this.proNum = res.proNum;
                        this.proLeaveTime = res.proLeaveTime;
                        this.isRest = true;
                        this.isDisabled = true;
                        if (res.childRest) this.childRest = res.childRest;
                        if (res.oldRest) this.oldRest = res.oldRest;
                        if (res.studentRest) this.studentRest = res.studentRest;
                        if (res.adultRest) this.adultRest = res.adultRest;
                        proLeaveTime = res.proLeaveTime;
                        this.restId = String(this.$route.query.id);

                        console.log(res);
                        // })
                    })
                    .then(() => {
                        //数量赋值
                        this.getData(proLeaveTime);
                    });
                //产品编号赋值
                // this.$refs.pro.proNum
                //日历赋值
                //日历框赋值
                //信息赋值
            }
        },
        promise1() {
            return new Promise((resolve, reject) => {
                resolve();
            }).then(() => {
                console.log("000");
                setTimeout(function() {
                    console.log(12122);
                }, 2000);
            });
        },
        closeTab(carInfo) {//关闭座位安排
            this.showTab = false;
            this.selectClick = false;
            this.allowLoad = false;
            let vm = this;
            this.carInfo = [];
            carInfo.forEach(function(item, index) {
                if (item.cancel.length) {
                    vm.carInfo.push({
                        carNum: item.carNum,
                        car: item.cancel.join("、"),
                        carMark: item.carMark
                    });
                }
            });
            console.log(carInfo);
        },
        obligate() {//点击座位安排
            this.limitNum =
                Number(this.oldNum) +
                Number(this.studentNum) +
                Number(this.childNum) +
                Number(this.adultNum);
            if (!this.limitNum) return this.$message.error("请选择人数");
            this.showTab = true;
        },
        changeGathers() {//更换集合信息按钮
            if (!this.proLeaveTime)
                return this.$message.error("未选择产品团期");
            for (let i = 0; i < this.peopleArr.length; i++) {
                let item = this.peopleArr[i];
                if (item.checked) {
                    this.dialogVisible1 = true;
                    return;
                }
            }
            this.$message.error("未选择出行人");
        },
        changeGather() {//切换集合信息
            if (!this.proGatherId1)
                return this.$message.error("未选择集合信息");
            let vm = this;
            let gather = "";
            this.routeGatherEntityList.forEach(function(item, index) {
                if (item.id == vm.proGatherId1) {
                    gather = item.proGatherTime + "" + item.proGatherPlace;
                    return;
                }
            });
            this.peopleArr.forEach(function(item, index) {
                if (item.checked) {
                    item.proGatherId = vm.proGatherId1;
                    item.gather = gather;
                }
            });
            this.dialogVisible1 = false;
        },
        showPickUpFee2(type) { //切换集合信息显示接送费
            let vm = this;
            let id;
            if (type == 0) {
                //外面的集合信息
                id = this.proGatherId;
                this.showPickUpFee = false;
            } else {
                //框里的集合信息
                id = this.proGatherId1;
                this.showPickUpFee1 = false;
            }
            this.routeGatherEntityList.forEach(function(item, index) {
                if (id == item.id) {
                    if (type == 0) vm.everyDayId = item.everyDayId;
                    if (item.proPickUpFee) {
                        if (type == 0) {
                            vm.proPickUpFee = item.proPickUpFee;
                            vm.showPickUpFee = true;
                        } else {
                            vm.proPickUpFee1 = item.proPickUpFee;
                            vm.showPickUpFee1 = true;
                        }

                        return;
                    }
                }
            });
        },
        addOrder() {//封装数据
            if (!this.flag()) {
                let obj = {};
                // this.isAddOrder = true;
                if (this.$route.query.id)
                    obj.orderRestId = this.$route.query.id;
                if(this.types==1&&this.selectType==1){//单团自定义产品
                    obj.singleMap={};
                    obj.singleMap.proName=this.editProName;
                    obj.singleMap.travelDays=this.routeDay;
                    obj.singleMap.proGatherCity=this.proGatherCity;
                    obj.singleMap.proGatherTime=this.proGatherTime1;
                    obj.singleMap.proGatherPlace=this.proGatherPlace;
                }
                if (this.proSeat == 1 &&this.types=='0'&&this.carInfo.length) {
                    obj.carSeatEntityList = [];
                    this.carInfo.forEach(function(item, index) {
                        obj.carSeatEntityList.push({
                            carNum: item.carNum,
                            carBeforeId: item.carMark,
                            seatBefore: item.car.split("、").join(",")
                        });
                    });
                }
                obj.payneed = this.payneed; //应收金额
                obj.paytrue = this.paytrue; //湿收金额
                if (this.statu == 1) obj.payed = this.payed; //已付金额
                if (this.isPeople) {
                    obj.orderVisitorEntityList = []; //出行人
                    let vm = this;
                    this.peopleArr.forEach(function(item, index) {
                        //出行人数组
                        let obj1 = {
                            visitorName: item.visitorName,
                            visitorCertificateType: item.visitorCertificateType,
                            visitorCertificateNum: item.visitorCertificateNum
                        };
                        if(vm.types==0||(vm.types==1&&vm.selectType==0)){
                            obj1.proGatherId = item.proGatherId
                            ? item.proGatherId
                            : vm.proGatherId;
                        }
                        obj.orderVisitorEntityList.push(obj1);
                    });
                }
                let orderHotelEntity = {}; //房间大对象
                obj.orderHotelEntity = orderHotelEntity;
                orderHotelEntity.oneBedRoom = 0;
                orderHotelEntity.doubleBedRoom = 0;
                orderHotelEntity.tent = 0;
                orderHotelEntity.threeFamilyRoom = 0;
                orderHotelEntity.moreBedRoom = 0;
                orderHotelEntity.threeStandardRoom = 0;
                orderHotelEntity.fourBedRoom = 0;
                if (this.oneBedRoom&&this.oneBedRoomNum)
                    orderHotelEntity.oneBedRoom = this.oneBedRoomNum;
                if (this.doubleBedRoom&&this.doubleBedRoomNum)
                    orderHotelEntity.doubleBedRoom = this.doubleBedRoomNum;
                if (this.tent&&this.tentNum) orderHotelEntity.tent = this.tentNum;
                if (this.threeFamilyRoom&&this.threeFamilyRoomNum)
                    orderHotelEntity.threeFamilyRoom = this.threeFamilyRoomNum;
                if (this.moreBedRoom&&this.moreBedRoomNum)
                    orderHotelEntity.moreBedRoom = this.moreBedRoomNum;
                if (this.threeStandardRoom&&this.threeStandardRoomNum)
                    orderHotelEntity.threeStandardRoom = this.threeStandardRoomNum;
                if (this.fourBedRoom&&this.fourBedRoomNum)
                    orderHotelEntity.fourBedRoom = this.fourBedRoomNum;

                let orderRouteEntity = {};
                obj.orderRouteEntity = orderRouteEntity; //路线基本信息
                if(selectDisType!=1){//0选择分销商1公司自营
                    let vm=this;
                this.option2.forEach(function(item,index){//分销商
                    if(item.id==vm.distributor){
                        obj.orderRouteEntity.disNum=item.disNum;
                    }
                })
                if(this.Salesman) obj.orderRouteEntity.disEmployeeId=this.Salesman;//业务员
                }
                
                if(this.types==1){
                    orderRouteEntity.singleGroup=this.selectType=='0'?'1':'2';//1单团现有产品2单团自定义产品
                    orderRouteEntity.leaveDate=this.leaveDate;
               }else{
                    orderRouteEntity.singleGroup=0;//添加订单
                     let tip = " " + "00:00:00";
                     orderRouteEntity.leaveDate = this.proLeaveTime + tip;
                }
                orderRouteEntity.isLine = this.isLine; //是否上系统
                if(this.types==0||(this.types==1&&this.selectType==0)){
                    orderRouteEntity.proPriceId = this.proPriceId; //价格体系id
                    orderRouteEntity.everyDayId = this.everyDayId; //附带id
                }
                if(this.proUnionTransportId) orderRouteEntity.proUnionTransportId = this.proUnionTransportId; //联运id
                if (this.isRoom == 1 && this.isRoomFree == 1)
                    orderRouteEntity.onePerAmount = this.onePerAmount;
                orderRouteEntity.supSaleEmployeeId = this.$refs.employee.employeeValue; //供应商添加订单员工
                orderRouteEntity.proNum = this.proNum;
                if (this.guideRemarks)
                    orderRouteEntity.guideRemarks = this.guideRemarks; //导游备注
                orderRouteEntity.adultNum = 0;
                orderRouteEntity.childNum = 0;
                orderRouteEntity.studentNum = 0;
                orderRouteEntity.oldNum = 0;
                orderRouteEntity.visitorNum = 0; //报名数量
                if (this.adult&&this.adultNum) orderRouteEntity.adultNum = this.adultNum;
                orderRouteEntity.visitorNum += Number(this.adultNum);
                if (this.child&&this.childNum) orderRouteEntity.childNum = this.childNum;
                orderRouteEntity.visitorNum += Number(this.childNum);
                if (this.student&&this.studentNum) orderRouteEntity.studentNum = this.studentNum;
                orderRouteEntity.visitorNum += Number(this.studentNum);
                if (this.old&&this.oldNum) orderRouteEntity.oldNum = this.oldNum;
                orderRouteEntity.visitorNum += Number(this.oldNum);
                if (this.routeUnionTransportEntityList.length)
                    orderRouteEntity.proUnionTransportId = this.proUnionTransportId; //联运编号
               
                orderRouteEntity.proGatherId = this.proGatherId; //集合信息

                let orderBaseEntity = {};
                obj.orderBaseEntity = orderBaseEntity;
                orderBaseEntity.linkName = this.linkName;
                orderBaseEntity.linkPhone = this.linkPhone;
                if (this.remarks) orderBaseEntity.remarks = this.remarks;
                orderBaseEntity.payStatu = this.statu;
                console.log(obj);
                this.$http
                    .axios({
                        url: this.$api.addOrderRoute,
                        method: "post",
                        data: obj,
                        json: true
                    })
                    .then(res => {
                        if (res == 1) this.$message.success("添加成功");
                        this.isAddOrder = false;
                        console.log(this.$route.query.id);
                        if (this.$route.query.id) {
                            this.$emit("changeRoute");
                            this.$router.push({
                                name: "restHandle"
                            });
                        }
                    })
                    .catch(err => {
                        this.isAddOrder = false;
                    });
            }
        },
        checkNum3(type) {//校验金额数量
            switch (type) {
                case "payneed":
                    this.$nextTick(() => {
                        this.payneed = this.$validate
                            .checkNum(this.payneed)
                            .slice(0, 8);
                    });
                    break;
                case "paytrue":
                    this.$nextTick(() => {
                        this.paytrue = this.$validate
                            .checkNum(this.paytrue)
                            .slice(0, 8);
                    });
                    break;
                case "payed":
                    this.$nextTick(() => {
                        this.payed = this.$validate
                            .checkNum(this.payed)
                            .slice(0, 8);
                    });
            }
        },
        checkNum(type) {//校验人数数量
            switch (type) {
                case "adult":
                    this.$nextTick(() => {
                        this.adultNum = this.$validate
                            .checkNumPos(this.adultNum)
                            .slice(0, 5);
                    });
                    break;
                case "child":
                    this.$nextTick(() => {
                        this.childNum = this.$validate
                            .checkNumPos(this.childNum)
                            .slice(0, 5);
                    });
                    break;
                case "old":
                    this.$nextTick(() => {
                        this.oldNum = this.$validate
                            .checkNumPos(this.oldNum)
                            .slice(0, 5);
                    });
                    break;
                case "student":
                    this.$nextTick(() => {
                        this.studentNum = this.$validate
                            .checkNumPos(this.studentNum)
                            .slice(0, 5);
                    });
                    break;
            }
        },
        checkNum1(type) {//校验房间数量
            switch (type) {
                case "oneBedRoomNum":
                    this.$nextTick(() => {
                        this.oneBedRoomNum = this.$validate
                            .checkNumPos(this.oneBedRoomNum)
                            .slice(0, 5);
                    });
                    break;
                case "doubleBedRoomNum":
                    this.$nextTick(() => {
                        this.doubleBedRoomNum = this.$validate
                            .checkNumPos(this.doubleBedRoomNum)
                            .slice(0, 5);
                    });
                    break;
                case "threeFamilyRoomNum":
                    this.$nextTick(() => {
                        this.threeFamilyRoomNum = this.$validate
                            .checkNumPos(this.threeFamilyRoomNum)
                            .slice(0, 5);
                    });
                    break;
                case "threeStandardRoomNum":
                    this.$nextTick(() => {
                        this.threeStandardRoomNum = this.$validate
                            .checkNumPos(this.threeStandardRoomNum)
                            .slice(0, 5);
                    });
                    break;
                case "fourBedRoomNum":
                    this.$nextTick(() => {
                        this.fourBedRoomNum = this.$validate
                            .checkNumPos(this.fourBedRoomNum)
                            .slice(0, 5);
                    });
                    break;
                case "moreBedRoom":
                    this.$nextTick(() => {
                        this.moreBedRoom = this.$validate
                            .checkNumPos(this.moreBedRoom)
                            .slice(0, 5);
                    });
                    break;
                case "tentNum":
                    this.$nextTick(() => {
                        this.tentNum = this.$validate
                            .checkNumPos(this.tentNum)
                            .slice(0, 5);
                    });
                    break;
            }
        },
        addPeople() {//添加出行人
            this.peopleArr.push({
                visitorName: "",
                visitorCertificateType: "1",
                visitorCertificateNum: ""
            });
        },
        delPeople(index) {//删除出行人
            this.peopleArr.splice(index, 1);
        },
        getData(data) {//点击获取日历 改变dom
            console.log(data);
            let obj = { proNum: this.proNum, proLeaveTime: data };
            this.$http
                .axios({
                    url: this.$api.getPlatoonOrderInfoByDate,
                    method: "get",
                    params: obj
                })
                .then(res => {
                    console.log(res);
                    this.proLeaveTime = data;
                    this.dialogVisible = false;
                    //改变dom
                    let res1 = res.routeProEntity;
                    let priceArr = res1.priceStructure;
                    this.proSeat = res1.proSeat;
                    if (this.proSeat == 1&&this.types==0) this.allowLoad = true;

                    this.carInfo = [];
                    this.adult = false;
                    this.child = false;
                    this.student = false;
                    this.old = false;
                    if (priceArr.includes("儿童价格")) {
                        this.child = true;
                        this.childNum = this.childRest ? this.childRest : "";
                    }
                    if (priceArr.includes("学生价格")) {
                        this.student = true;
                        this.studentNum = this.studentRest
                            ? this.studentRest
                            : "";
                    }
                    if (priceArr.includes("老人价格")) {
                        this.old = true;
                        this.oldNum = this.oldRest ? this.oldRest : "";
                    }
                    if (priceArr.includes("成人价格")) {
                        this.adult = true;
                        this.adultNum = this.adultRest ? this.adultRest : "";
                    }
                    this.isContainHotel = res1.isContainHotel; //是否包含住宿
                    if (this.isContainHotel == 1) {
                        this.oneBedRoom = false;
                        this.doubleBedRoom = false;
                        this.tent = false;
                        this.threeStandardRoom = false;
                        this.threeFamilyRoom = false;
                        this.fourBedRoom = false;
                        this.moreBedRoom = false;
                        this.oneBedRoomNum = "";
                        this.doubleBedRoomNum = "";
                        this.threeFamilyRoomNum = "";
                        this.threeStandardRoomNum = "";
                        this.fourBedRoomNum = "";
                        this.tentNum = "";
                        this.moreBedRoomNum = "";
                        let room = res1.proHotelType.split(",");
                        if (room.includes("大床房")) {
                            this.oneBedRoom = true;
                        }
                        if (room.includes("双人标间")) {
                            this.doubleBedRoom = true;
                        }
                        if (room.includes("三人家庭房")) {
                            this.threeFamilyRoom = true;
                        }
                        if (room.includes("三人标间")) {
                            this.threeStandardRoom = true;
                        }
                        if (room.includes("四人间")) {
                            this.fourBedRoom = true;
                        }
                        if (room.includes("多人间")) {
                            this.moreBedRoom = true;
                        }
                        if (room.includes("露营")) {
                            this.tent = true;
                        }
                    }
                    this.routeGatherEntityList = res.routeGatherEntityList; //集合信息
                    this.proGatherId = ""; //清空集合选择
                    this.proGatherId1 = "";
                    this.peopleArr.forEach(function(item, index) {
                        item.proGatherId = "";
                        item.gather = "";
                    });
                    this.routeUnionTransportEntityList =
                        res.routeUnionTransportEntityList; //联运服务
                    if (this.routeUnionTransportEntityList.length) {
                        this.routeUnionTransportEntityList.forEach(function(
                            item,
                            index
                        ) {
                            item.cityName = item.cityName.split("[")[0];
                        });
                    }
                    this.routeCon = res.routeCon;
                    this.level = false;
                    if (
                        res.routePriceEntityList[0].fightNum ||
                        res.routePriceEntityList[0].proHotelLevel
                    ) {
                        this.level = true;
                        this.proPriceId = "";
                    } else {
                        this.proPriceId = res.routePriceEntityList[0].id;
                    }
                    if (this.level) {
                        res.routePriceEntityList.forEach(function(item, index) {
                            item.label =
                                item.proHotelLevel + "  " + item.fightNum;
                        });
                    }
                    this.routePriceEntityList = res.routePriceEntityList; //级别处理
                    this.rest = String(res.rest) ? String(res.rest) : "不限"; //余位
                    this.isRoomFree = res.routeProEntity.isRoomFree; //是否有单房差
                });
        },
        flag() { //添加时校验数据
            if(this.selectType==0){
                if (!this.proNum&&this.selectType==0) return this.$message.error("未选择产品");
                if (!this.proLeaveTime)
                    return this.$message.error("未选择产品团期");
            }else{
                if(!this.editProName) return this.$message.error('未填写产品名称')
                if(!this.leaveDate) return this.$message.error('未选择日期')
                if(!this.routeDay) return this.$message.error('未选择行程天数')
            }
            if(!this.distributor) return this.$message.error('未选择分销商')
            let amount = 0;
            if (this.adult) amount += Number(this.adultNum);
            if (this.child) amount += Number(this.childNum);
            if (this.old) amount += Number(this.oldNum);
            if (this.student) amount += Number(this.studentNum);
            if (!amount) return this.$message.error("未填写有效人数");
            if (this.isContainHotel == 1||this.selectType==1) {
                let room = 0;
                if (this.oneBedRoom) room += Number(this.oneBedRoomNum);
                if (this.doubleBedRoom) room += Number(this.doubleBedRoomNum);
                if (this.tent) room += Number(this.tentNum);
                if (this.threeFamilyRoom)
                    room += Number(this.threeFamilyRoomNum);
                if (this.moreBedRoom) room += Number(this.moreBedRoomNum);
                if (this.threeStandardRoom)
                    room += Number(this.threeStandardRoomNum);
                if (this.fourBedRoom) room += Number(this.fourBedRoomNum);
                if (!room) return this.$message.error("未填写有效房间数");
            }
            if ((this.isRoomFree == 1||this.selectType==1) && !this.isRoom)
                return this.$message.error("单房差未选择");
            if ((this.isRoomFree == 1||this.selectType==1) && this.isRoom == 1 && !this.onePerAmount)
                return this.$message.error("未填写单房差");
            if (!this.statu) return this.$message.error("未选择付款状态");
            if (!this.payneed) return this.$message.error("未填写应收金额");
            if (!this.paytrue) return this.$message.error("未填写应收金额");
            if (this.statu == 1 && !this.payed)
                return this.$message.error("未填写已付金额");
            if (!this.isLine) return this.$message.error("未选择其他条件");
            if (!this.$refs.employee.employeeValue)
                return this.$message.error("未选择销售人员");
            if (!this.linkName) return this.$message.error("未填写联系人姓名");
            if (!this.linkPhone) return this.$message.error("未填写联系电话");
            console.log(verificationPhone(this.linkPhone));
            if (verificationPhone(this.linkPhone) == 0)
                return this.$message.error("联系电话不正确");
            if (!this.proGatherId&&this.selectType==0) return this.$message.error("未选择集合信息");
            if(this.selectType==1){
                if(!this.proGatherCity) return this.$message.error('未选择集合城市')
                if(!this.proGatherTime1) return this.$message.error('未填写集合时间')
                if(!this.proGatherPlace) return this.$message.error('未填写集合地点')
            }
            if (
                this.routeUnionTransportEntityList.length &&
                !this.proUnionTransportId&&this.selectType==0
            )
                return this.$message.error("未选择联运城市");
            if (this.level && !this.proPriceId&&this.selectType==0)
                return this.$message.error("未选择级别");
            if (this.isPeople) {
                if (amount != this.peopleArr.length)
                    return this.$message.error("出行人数不等于填写总人数");
                for (let i = 0; i < this.peopleArr.length; i++) {
                    let item = this.peopleArr[i];
                    let tip = "第" + (i + 1) + "条";
                    if (!item.visitorName)
                        return this.$message.error(tip + "未填写出行人姓名");
                    if (!item.visitorCertificateNum)
                        return this.$message.error(tip + "未填写证件号码");
                    if (
                        item.visitorCertificateType == 1 &&
                        verificationID(item.visitorCertificateNum) == 0
                    )
                        return this.$message.error("证件号码不正确");
                    if (
                        item.visitorCertificateType != 1 &&
                        !testPassport(item.visitorCertificateNum)
                    )
                        return this.$message.error("证件号码不正确");
                }
            }
            if (this.proSeat == 1 &&this.types==0&& this.carInfo.length) { 
                let num = 0;
                this.carInfo.forEach(function(item, index) {
                    num += item.car.split("、").length;
                });
                if (num != amount)
                    return this.$message.error("人数和座位数不一致");
            }
        },
        focus() {//获得焦点
            if (this.proNum) this.dialogVisible = true;
        },
        changeDom() {
            //切換日期 切換dom
        },
        proChange(data) {//切换产品，切换日历 
            if (this.$route.query.id) return;
            this.proNum = this.$refs.pro.proNum;
            this.isDisabled = true;
            this.proLeaveTime = ""; //清空日期
            this.dataArr = []; //清空日期数组
            this.isContainHotel = false;
            this.isRoom = "";
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
                        console.log(res);
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
        distributorChange() {
            //分销商切换请求业务员 手机号
            if(this.distributor){
                let vm=this;
                this.Salesman='';
                this.$http.axios({
                    url:this.$api.getDistributorSalesmanList+'/'+this.distributor,
                    method:'get',
                    // params:{disNum:this.distributor}
                }).then(res=>{
                    this.option8=res;
                })
                this.option2.forEach(function(item,index){
                    if(item.id==vm.distributor){
                        vm.phoneNum=item.phoneNum;
                    }
                });
                // this.phoneNum=arr.phoneNum;
            }

        },
        getDistributorSalesmanList(){

        },
        checkSaleman(){//手机号回显分销商
        if(this.phoneNum){
             this.$nextTick(() => {
                this.phoneNum=this.$validate.checkNum(this.phoneNum).slice(0,11);
            });
            if(this.phoneNum.length==11){
                let vm=this;
                this.option2.forEach(function(item,index){
                    if(item.phoneNum==vm.phoneNum){
                        vm.distributor=item.id;
                        vm.distributorChange();
                    }
                })
            }else{
                this.distributor='';
                this.Salesman='';
                this.option8=[];
            }
        }
            

        },
        backPro(data) {//校验产品编号并回显产品名称
            if (data) {
                this.$nextTick(() => {
                    this.proNum1 = Validate.checkNum(this.proNum1).slice(0, 12);
                });
                if (this.proNum1.length == 12) {
                    let vm = this;
                    this.option1.forEach(function(item, index) {
                        if (vm.proNum1 == item.proNum) {
                            vm.proNum = vm.proNum1;
                            return;
                        }
                    });
                } else {
                    this.proNum = "";
                }
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.item {
    padding-left: 20px;
    margin-bottom: 10px;
}
.item-bottom {
    margin-bottom: 10px;
}
.span-title {
    display: inline-block;
    width: 80px;
    text-align: right;
}
.dot {
    border-bottom: 1px dashed #ddd;
    margin: 10px 20px;
}
.el-input,
.el-select,
.el-textarea {
    margin: 0 10px;
}
.room .el-input {
    margin: 0;
    width: 6%;
}
.room span {
    margin: 0 10px;
}
.room .span-title {
    margin: 0;
}
.people {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
}
.people span {
    display: inline-block;
}
/*small按钮*/
.el-button--small {
    height: 30px;
    border-radius: 0;
    background-color: white;
    border-color: #45c8dc;
}

.el-button--primary.is-plain:hover,
.el-button--primary.is-plain:focus {
    background: white;
    color: #45c8dc;
}
.center-title {
    font-size: 16px;
    background-color: #fff;
    display: inline-block;
    position: absolute;
    top: -10px;
    z-index: 20;
    margin-left: -40px;
    padding: 0 20px;
}
</style>
