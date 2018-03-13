<template>
    <div id='platoon'>
        <div v-for='(item,index) in platoon' class="item">
            <div class="item-bottom">
                <el-tag>第 {{index+1}} 期</el-tag>
                <div class="inline-block" style='margin-top:-4px;width:90%;text-align:right;vertical-align:middle;'>
                    <el-checkbox v-model="item.hotel" v-if='room' @change='changeArr(index)'>酒店差别</el-checkbox>
                    <el-checkbox v-model="item.fly" v-if='fly' @change='changeArr(index)'>航班差别</el-checkbox>
                    <el-button type="primary" plain size='small' @click="delplatoon(index)" v-if='index!=0' style='margin-left:30px'>删除团期</el-button>
                    <el-button type="primary" plain size='small' @click="addplatoon()" v-if='index==0' style='margin-left:30px'>增加团期</el-button>
                </div>
                <div class="dot" style="margin:10px 10px"></div>
            </div>

            <div class="item-bottom">
                <span class="span-title">发团日期</span>
                <calander-pro :obj='item.dataArr' @getdata='dateClick' :index-num='index' ref='calendar'></calander-pro>
                <!-- <el-tag v-for='ceshi in item.dataArr' :key='ceshi.day'>{{ceshi.day}}</el-tag> -->
            </div>
            <div class="dot"></div>
            <template>
                <!-- 住宿界别 -->
                <div class="item-bottom" v-if='item.hotel'>
                    <span class="span-title" style="margin-top:4px;">住宿级别</span>
                    <div class="inline-block " style="width:90%;vertical-align:top">
                        <div v-for='(hotelInput,hotelindex) in item.hotelArr' class="item-bottom">
                            <el-input placeholder='住宿级别' v-model='hotelInput.hotelInput' style='width:20%'></el-input>
                            <el-input placeholder='房差金额' v-model='hotelInput.roomFree' v-if='roomMoney' style='margin-left:0px' v-on:input="checkNum4(index,hotelindex)"></el-input>
                            <el-button plain size='small' type="primary" @click='delhotelLevel(index,hotelindex)' v-if='hotelindex!=0'>删除</el-button>
                            <el-button plain size='small' type="primary" @click='addhotelLevel(index)' v-if='hotelindex==0'>添加</el-button>
                        </div>
                    </div>
                </div>
                <!-- 飞机 -->
                <div class="item-bottom" v-if='item.fly'>
                    <span class="span-title" style="margin-top:4px;">航班信息</span>
                    <div class="inline-block " style="width:90%;vertical-align:top">
                        <div v-for='(flyInput,flyindex) in item.flyArr' class="item-bottom">
                            <el-select v-model='flyInput.flyName' filterable placeholder="请选择" style='width:20%'>
                                <el-option v-for="sky in options2" :key="sky.value" :label="sky.label" :value="sky.value">
                                </el-option>
                            </el-select>

                            <el-input placeholder='航班班次' v-model='flyInput.flyNum' style='margin-left:0px;'></el-input>
                            <el-time-select style="width:13%;margin-left:0px" v-model="flyInput.start" :editable='false' :picker-options="{
                                start: '00:00',
                                step: '00:05',
                                end: '23:55'
                              }" placeholder="出发时间">
                            </el-time-select>
                            <el-time-select style="width:13%;margin-left:0px" v-model="flyInput.end" :editable='false' :picker-options="{
                                start: '00:00',
                                step: '00:05',
                                end: '23:55'
                              }" placeholder="抵达时间">
                            </el-time-select>
                            <el-button plain size='small' type="primary" @click='delflyLevel(index,flyindex)' v-if='flyindex!=0'>删除</el-button>
                            <el-button plain size='small' type="primary" @click='addflyLevel(index)' v-if='flyindex==0'>添加</el-button>
                            <!-- <el-button plain size='small' type="primary" @click='addpriceLevel(index)' v-if='item.fly||item.hotel'>生成价格体系</el-button> -->
                        </div>
                    </div>
                </div>
                <!-- 生成价格 -->
                <div style='text-align:center;'>
                    <el-button plain size='small' type="primary" @click='newpriceLevel(index)' v-if='item.fly||item.hotel'>生成价格体系</el-button>
                </div>
                <div class="dot" v-if='item.fly||item.hotel'></div>
            </template>
            <!-- 价格体系 -->
            <div class="item-bottom">
                <template v-for='(price,index1) in item.priceList'>
                    <template v-if='item.priceList.length>=1&&(item.hotel||item.fly)'>
                        <!-- 住宿级别 -->
                        <div class="item-bottom" v-if='item.hotel'>
                            <span class="span-title">住宿级别</span>
                            <el-input v-model='price.hotelLevel' :disabled='true'></el-input>
                            <template v-if='roomMoney'>
                                <span class="span-title">房差金额</span>
                                <el-input v-model='price.roomFree' :disabled='true'></el-input>
                            </template>
                        </div>
                        <!-- 航班信息 -->
                        <div class="item-bottom" v-if='item.fly'>
                            <span class="span-title">航班信息</span>
                            <el-input v-model='price.flyName' :disabled='true'></el-input>
                            <span class="span-title">航班号</span>
                            <el-input v-model='price.flyNum' :disabled='true'></el-input>
                            <el-input v-model='price.start' :disabled='true'></el-input>
                            <el-input v-model='price.end' :disabled='true'></el-input>
                        </div>
                    </template>
                    <!-- 市场价格 -->
                    <div class="item-bottom price-append">
                        <span class="span-title">市场价格</span>
                        <template v-if="adult">
                            <span class="span-title">成人价格</span>
                            <el-input v-model.trim="price.marketAdult" placeholder="" v-on:input="checkNum('marketAdult',index,index1)">
                                <template slot="append">元/人</template>
                            </el-input>
                        </template>
                        <template v-if="child">
                            <span class="span-title">儿童价格</span>
                            <el-input v-model.trim="price.marketChild" placeholder="" v-on:input="checkNum('marketChild',index,index1)">
                                <template slot="append">元/人</template>
                            </el-input>
                        </template>
                        <template v-if="student">
                            <span class="span-title">学生价格</span>
                            <el-input v-model.trim="price.marketStudent" placeholder="" v-on:input="checkNum('marketStudent',index,index1)">
                                <template slot="append">元/人</template>
                            </el-input>
                        </template>
                        <template v-if='old'>
                            <span class="span-title">老人价格</span>
                            <el-input v-model.trim="price.marketOld" placeholder="" v-on:input="checkNum('marketOld',index,index1)">
                                <template slot="append">元/人</template>
                            </el-input>
                        </template>
                    </div>
                    <!-- 分销价格 -->
                    <div class="item-bottom price-append">
                        <span class="span-title">外卖价格</span>
                        <template v-if="adult">
                            <span class="span-title">成人价格</span>
                            <el-input v-model.trim="price.outAdult" placeholder="" v-on:input="checkNum('outAdult',index,index1)">
                                <template slot="append">元/人</template>
                            </el-input>
                        </template>
                        <template v-if="child">
                            <span class="span-title">儿童价格</span>
                            <el-input v-model.trim="price.outChild" placeholder="" v-on:input="checkNum('outChild',index,index1)">
                                <template slot="append">元/人</template>
                            </el-input>
                        </template>
                        <template v-if="student">
                            <span class="span-title">学生价格</span>
                            <el-input v-model.trim="price.outStudent" placeholder="" v-on:input="checkNum('outStudent',index,index1)">
                                <template slot="append">元/人</template>
                            </el-input>
                        </template>
                        <template v-if='old'>
                            <span class="span-title">老人价格</span>
                            <el-input v-model.trim="price.outOld" placeholder="" v-on:input="checkNum('outOld',index,index1)">
                                <template slot="append">元/人</template>
                            </el-input>
                        </template>
                    </div>
                    <!-- 外卖价格 -->
                    <div class="item-bottom price-append">
                        <span class="span-title">分销价格</span>
                        <template v-if="adult">
                            <span class="span-title">成人价格</span>
                            <el-input v-model.trim="price.disAdult" placeholder="" v-on:input="checkNum('disAdult',index,index1)">
                                <template slot="append">元/人</template>
                            </el-input>
                        </template>
                        <template v-if="child">
                            <span class="span-title">儿童价格</span>
                            <el-input v-model.trim="price.disChild" placeholder="" v-on:input="checkNum('disChild',index,index1)">
                                <template slot="append">元/人</template>
                            </el-input>
                        </template>
                        <template v-if="student">
                            <span class="span-title">学生价格</span>
                            <el-input v-model.trim="price.disStudent" placeholder="" v-on:input="checkNum('disStudent',index,index1)">
                                <template slot="append">元/人</template>
                            </el-input>
                        </template>
                        <template v-if='old'>
                            <span class="span-title">老人价格</span>
                            <el-input v-model.trim="price.disOld" placeholder="" v-on:input="checkNum('disOld',index,index1)">
                                <template slot="append">元/人</template>
                            </el-input>
                        </template>
                    </div>
                    <div class="dot"></div>
                </template>
                <!-- 余位设定 -->
                <div class="item-bottom">
                    <span class="span-title">余位设定</span>
                    <el-select v-model="item.restType" placeholder="请选择" style='width:20.3%'>
                        <el-option v-for="sell in options3" :key="sell.value" :label="sell.label" :value="sell.value">
                        </el-option>
                    </el-select>
                    <el-input placeholder='余位数量' v-if='item.restType==1' v-model.trim='item.rest' v-on:input="checkNum2(index)" style='margin-left:0'>
                    </el-input>
                </div>
                <!-- 促销活动 -->
                <div class="item-bottom">
                    <span class="span-title">促销活动</span>
                    <el-select v-model="item.sell" placeholder="请选择" style='width:20.3%'>
                        <el-option v-for="sell in options" :key="sell.value" :label="sell.label" :value="sell.value">
                        </el-option>
                    </el-select>
                    <template v-if='item.sell!=0'>
                        <span class="span-title">适用客群</span>
                        <el-checkbox-group v-model="item.peoples">
                            <el-checkbox label="0" v-if='adult'>成人</el-checkbox>
                            <el-checkbox label="1" v-if='student'>学生</el-checkbox>
                            <el-checkbox label="2" v-if='child'>儿童</el-checkbox>
                            <el-checkbox label="3" v-if='old'>老人</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </div>
                <!-- 活动方式 -->
                <div v-if='item.sell!=0' class="item-bottom" style="margin-left:70px;">
                    <div class="inline-block" style="vertical-align:top">
                        <div class="span-color" v-if='item.sell==1'>
                            <span class="span-title">活动方式</span>
                            <span class="item-left">买</span>
                            <el-input v-model='item.proBuyPeople' v-on:input="checkNum5(index,'proBuyPeople')"></el-input>
                            <span>人免</span>
                            <el-input v-model='item.proSendPeople' v-on:input="checkNum5(index,'proSendPeople')"></el-input>
                            <span>人</span>
                            <span class="span-title right-title">价格全部按照</span>
                            <el-radio v-model="item.people" label="0" v-if='adult'>成人</el-radio>
                            <el-radio v-model="item.people" label="1" v-if='student'>学生</el-radio>
                            <el-radio v-model="item.people" label="2" v-if='child'>儿童</el-radio>
                            <el-radio v-model="item.people" label="3" v-if='old'>老人</el-radio>
                            <span>价格来计算</span>
                        </div>
                        <div class="span-color" v-if='item.sell==2'>
                            <span class="span-title">活动方式</span>
                            <span>满</span>
                            <el-input v-model='item.proBuyMoney' v-on:input="checkNum5(index,'proBuyMoney')"></el-input>
                            <span>元减</span>
                            <el-input v-model='item.proSendMoney' v-on:input="checkNum5(index,'proSendMoney')"></el-input>
                            <span>元</span>
                        </div>
                        <div class="dot" style="margin:5px;"></div>
                    </div>
                </div>

                <!-- 集合信息 -->
                <div class="item-bottom">
                    <span class="span-title">集合信息</span>
                    <city-picker field="city" placeholder="选择集合城市" @change='item.proGatherCity=arguments[0]' :inputcity='item.proGatherCity | changeData' :city-list="cityList" ref='cityPicker' style="margin-bottom:10px;width:19.5%;"></city-picker>
                    <template>
                        <a href="javascript:;" class="file">导入模板
                            <input type='file' @change='changeGather(index,$event)' />
                        </a>
                        <span class="tip">*请按模板格式上传集合信息(如无模板，请先下载模板)</span>
                        <el-button type="primary" plain size='small' @click="download(item)" style='float:right;margin-right:3%;'>下载模板</el-button>

                    </template>
                    <div class="inline-block" style="vertical-align:top;width:90%;margin-left:65px;">
                        <div v-for="(item2,gatherIndex) in item.gather" class="item-bottom">
                            <template>
                                <el-time-select style="width:15%" v-model="item2.proGatherTime" :editable='false' :picker-options="{
                                start: '04:00',
                                step: '00:05',
                                end: '23:55'
                              }" placeholder="选择时间">
                                </el-time-select>
                                <el-input v-model="item2.proGatherPlace" placeholder="请输集合地点" style="width:34%" :maxlength='20'></el-input>
                                <el-checkbox v-model="item2.checked">接送费</el-checkbox>
                                <!-- v-if="item.checked==true" -->
                                <div style="display:inline-block" v-if="item2.checked==true">
                                    <el-input v-model.trim="item2.proPickUpFee" placeholder="金额" :maxlength='8' v-on:input="checkNum3(index,gatherIndex)"></el-input>
                                    <span class="span-color">元/人</span>
                                </div>
                                <el-button type="primary" plain size='small' @click="delGather(index,gatherIndex)">删除</el-button>
                                <el-button type="primary" plain size='small' @click="addGather(index)" v-if='gatherIndex===0'>添加</el-button>
                            </template>
                        </div>
                    </div>
                </div>
                <!-- <div class="item-bottom item" style="width:93%;height:30px"> -->
                <!-- <el-button type="primary" plain size='small' @click="delplatoon(index)" v-if='platoon.length!=1'>删除团期</el-button>
                    <el-button type="primary" plain size='small' @click="addplatoon()" v-if='platoon.length==index+1' style='float:right'>增加团期</el-button> -->
                <!-- </div> -->
                <div class="dot"></div>
            </div>
        </div>
        <div class="button-area">
            <el-button type="primary" plain size='middle' @click='backOne'>上一步</el-button>
            <el-button type="primary" plain size='middle' @click='twoSave' style='margin:0 30px' :disabled='twosaves'>保存</el-button>
            <el-button type="primary" plain size='middle' @click='nextThree' :disabled='twocom'>下一步</el-button>
        </div>
    </div>
</template>
<style scoped>
/*@import '../../../css/addProduct.css'*/
@import "../../../../assets/pcCss/addProduct.css";
</style>
<script >
import cityPicker from "../../public/cityPicker.vue";
import cityList from "china-city-data";
import { mapState, mapActions } from "vuex";
import calanderPro from "../../public/calander.vue";
import Validate from "@/common/validate/validate.js";
import flyList from "../../public/flySet.js";

var isRoom;//全局变量 产品有无酒店差别
var isFly;
export default {
    data() {
        return {
            twocom: false,
            twosaves: false,
            cityList,
            adult: false,
            child: false,
            student: false,
            old: false,
            room: false,
            roomMoney: true,
            fly: false,
            platoon: [
                {
                    dataArr: [], //日历团期集合
                    priceList: [
                        {
                            marketAdult: "",
                            marketChild: "",
                            marketStudent: "",
                            marketOld: "",
                            outAdult: "",
                            outStudent: "",
                            outChild: "",
                            outOld: "",
                            disAdult: "",
                            disStudent: "",
                            disChild: "",
                            disOld: "",
                            hotelLevel: "", //酒店级别
                            roomFree: "",
                            flyName: "", //航班信息
                            flyNum: "",
                            start: "",
                            end: ""
                        }
                    ],
                    gather: [
                        {
                            //集合信息
                            proGatherTime: "",
                            proGatherPlace: "",
                            checked: false,
                            proPickUpFee: ""
                        }
                    ],
                    isExport: "0",
                    proGatherCity: "", //集合出发城市
                    rest: "",
                    restType: "0",
                    sell: "0",
                    proBuyMoney: "", //促销购买金额
                    proSendMoney: "", //促销立减金额
                    proBuyPeople: "", //促销满减人数
                    proSendPeople: "", //促销免单人数
                    people: "", //价格计算
                    peoples: [], //适用客群
                    hotelArr: [{ hotelInput: "", roomFree: "" }],
                    flyArr: [{ flyName: "", flyNum: "", start: "", end: "" }],
                    hotel: false,//isRoom,
                    fly: false//isFly
                }
            ],
            options: [
                { value: "0", label: "无促销活动" },
                { value: "1", label: "购买免单活动" },
                { value: "2", label: "购买立减活动" }
            ],
            options13: [
                { value: "0", label: "手动输入" },
                { value: "1", label: "导入模板" }
            ],
            options2: flyList,
            options3: [
                { value: "0", label: "不限余位" },
                { value: "1", label: "设定余位" }
            ]
        };
    },
    created() {},
    filters: {
        changeData(oldVal) {
            return oldVal;
        }
    },
    computed: {
        ...mapState("addPro", ["proNum", "basic", "platoon1"])
        // dataRest(){
        //     let watchArr=[];
        //     this.platoon.forEach(function(item,index){
        //         watchArr.push({hotel:item.hotel,fly:item.fly})
        //     })
        //     return watchArr
        // }
    },
    watch: {
        // dataRest:{
        //     handler(now,old){//监控每期的酒店和航班的是否变化
        //         for(let i=0;i<old.length;i++){
        //             if(old[i]!=now[i]){
        //                 return this.addpriceLevel(i);
        //             };
        //         }
        //     },
        //      deep:true
        // },
        basic: {
            handler(now, old) {
                console.log(this.basic);
                if (this.basic) {
                    this.basic.routeProEntity.isContainHotel == 1
                        ? (this.room = true)
                        : (this.room = false); //有住宿
                    this.basic.routeProEntity.mainTraffic == "飞机"
                        ? (this.fly = true)
                        : (this.fly = false); //是否飞机
                    this.roomMoney =
                        this.basic.routeProEntity.isRoomFree == 1
                            ? true
                            : false; //有无房差
                    isRoom = this.room;
                    isFly = this.fly;
                    let priceArr = this.basic.routeProEntity.priceStructure.split(
                        ","
                    );
                    this.adult = false;
                    this.student = false;
                    this.child = false;
                    this.old = false;
                    if (priceArr.includes('成人价格')) {
                    	this.adult = true;
                    }
                    if (priceArr.includes("学生价格")) {
                        this.student = true;
                    }
                    if (priceArr.includes("儿童价格")) {
                        this.child = true;
                    }
                    if (priceArr.includes("老人价格")) {
                        this.old = true;
                    }
                    this.platoon.forEach(function(item, index) {
                        item.hotel = false;//isRoom; //有 后来改为默认不选中
                        item.fly = false;//isFly;
                        if (isFly && !item.flyArr.length) {
                            item.fly = isFly;//isFly;
                            //有航班，航班数组无时，补全数组
                            item.flyArr = [
                                { flyName: "", flyNum: "", start: "", end: "" }
                            ];
                        }
                        if (isRoom && !item.hotelArr.length) {
                            item.hotel = isRoom;//;
                            //有酒店，酒店数组无时，补全数组
                            item.hotelArr = [{ hotelInput: "", roomFree: "" }];
                        }
                        if ((isRoom || isFly)&&(item.hotel||item.fly)) {
                            item.priceList = []; //在后台不更新的情况下  任一清空价格数组
                        }
                        if (!isRoom && !isFly) {
                            //都无还原价格数组
                            item.priceList = [
                                {
                                    marketAdult: "",
                                    marketChild: "",
                                    marketStudent: "",
                                    marketOld: "",
                                    outAdult: "",
                                    outStudent: "",
                                    outChild: "",
                                    outOld: "",
                                    disAdult: "",
                                    disStudent: "",
                                    disChild: "",
                                    disOld: "",
                                    hotelLevel: "", //酒店级别
                                    roomFree: "",
                                    flyName: "", //航班信息
                                    flyNum: "",
                                    start: "",
                                    end: ""
                                }
                            ];
                        }
                    });
                }
                console.log(this.platoon);
            },
            deep: true
        },
        platoon1: {
            handler() {
                console.log(this.platoon1);
                let vm = this;
                let platoonArr = this.platoon1; //数组
                this.promiseSyn()
                    .then(() => {
                        vm.platoonSyn(); //处理数据函数
                    })
                    .then(() => {
                        this.platoon.forEach(function(item, index) {
                            //给城市赋值
                            if (item.proGatherCity) {
                                vm.$refs.cityPicker[index].assignGather();
                            }
                            //日历赋值
                            if (item.dataArr.length) {
                                vm.$refs.calendar[index].initData(null);
                            }
                        });
                    });
            },
            deep: true
        }
    },
    methods: {
        promiseSyn() {
            return new Promise((resolve, reject) => {
                resolve();
            });
        },
        platoonSyn() {
            let platoonArr = this.platoon1; //数组
            let vm = this;
            let platoons = [];
            if (platoonArr.length) {
                platoonArr.forEach(function(item, index) {
                    let obj = {};
                    obj.rest = item.proRest; //余位
                    obj.restType = item.proRest ? "1" : "0"; //余位类型
                    obj.sell = item.promotion == 0 ? "0" : ""; //产品促销(0无促销 1有促销)
                    if (item.proPromotionType) {
                        obj.sell = item.proPromotionType == 0 ? "1" : "2"; //免单//立减
                    }
                    obj.proBuyMoney = item.proBuyMoney;
                    obj.proSendMoney = item.proSendMoney;
                    obj.peoples = item.suit.split(","); //适用客群数组
                    obj.proBuyPeople = item.proBuyPeople;
                    obj.proSendPeople = item.proSendPeople;
                    obj.people = item.suitPrice;
                    obj.dataArr = [];
                    if (item.proLeaveTime) {
                        let proLeaveTime = item.proLeaveTime.split(",");
                        proLeaveTime.forEach(function(item2, index2) {
                            obj.dataArr.push({ day: item2, price: "2" });
                        });
                    }
                    obj.proGatherCity = "";
                    if (item.proGatherCity) {
                        obj.proGatherCity = item.proGatherCity
                            .split("[")[1]
                            .slice(0, 6); //集合城市
                    }

                    //集合信息
                    let gather = [];
                    obj.gather = gather;
                    // obj.isExport='0';
                    item.routeGatherMapList.forEach(function(item1, index1) {
                        let obj1 = {};
                        obj1.proGatherTime = item1.proGatherTime;
                        obj1.proGatherPlace = item1.proGatherPlace;
                        obj1.proPickUpFee = item1.proPickUpFee;
                        if (item1.proPickUpFee) {
                            obj1.checked = true;
                        } else {
                            obj1.checked = false;
                        }
                        gather.push(obj1);
                    });
                    // obj.hotel=isRoom;
                    // obj.fly=isFly;
                    //酒店数组  当前有酒店数组hotel=true空数组 false
                    let hotelArr = [];
                    if (
                        item.routeHotelMapList &&
                        item.routeHotelMapList.length
                    ) {
                        obj.hotel = true;
                        item.routeHotelMapList.forEach(function(item4, index4) {
                            let obj4 = {};
                            obj4.hotelInput = item4.proHotelLevel;
                            obj4.roomFree = item4.onePerPrice;
                            hotelArr.push(obj4);
                        });
                    } else {
                        obj.hotel = false;
                        if (isRoom) {
                            hotelArr.push({
                                hotelInput: "",
                                roomFree: ""
                            });
                        }
                    }
                    //飞机当前有酒店数组fly=true空数组 false
                    let flyArr = [];
                    if (item.flightMapList && item.flightMapList.length) {
                        obj.fly = true;
                        item.flightMapList.forEach(function(item6, index) {
                            let obj5 = {};
                            obj5.flyName = item6.flightCom;
                            obj5.flyNum = item6.fightNum;
                            obj5.start = item6.flightLeaveTime;
                            obj5.end = item6.flightArriveTime;
                            flyArr.push(obj5);
                        });
                    } else {
                        obj.fly = false;
                        if (isFly) {
                            flyArr.push({
                                flyName: "",
                                flyNum: "",
                                start: "",
                                end: ""
                            });
                        }
                    }
                    obj.hotelArr = hotelArr;
                    obj.flyArr = flyArr;
                    let priceList = [];
                    obj.priceList = priceList;
                    if (item.routePlatoonPriceEntityList.length > 0) {
                        item.routePlatoonPriceEntityList.forEach(function(
                            item3,
                            index3
                        ) {
                            let obj2 = {};
                            obj2.hotel = isRoom;
                            obj2.hotelLevel = item3.proHotelLevel; //酒店的
                            obj2.roomFree = item3.onePerPrice;
                            obj2.fly = isFly;
                            obj2.flyName = item3.flightCom; //航班公司
                            obj2.flyNum = item3.fightNum; //航空班次
                            obj2.start = item3.flightLeaveTime; //起飞时间
                            obj2.end = item3.flightArriveTime; //到达时间
                            obj2.marketAdult = item3.proMarketAdultPrice;
                            obj2.outAdult = item3.proOutAdultPrice;
                            obj2.disAdult = item3.proDistributionAdultPrice;
                            obj2.marketStudent = item3.proMarketStudentPrice;
                            obj2.outStudent = item3.proOutStudentPrice;
                            obj2.disStudent = item3.proDistributionStudentPrice;
                            obj2.marketChild = item3.proMarketChildPrice;
                            obj2.outChild = item3.proOutChildPrice;
                            obj2.disChild = item3.proDistributionChildPrice;
                            obj2.marketOld = item3.proMarketOldPrice;
                            obj2.outOld = item3.proOutOldPrice;
                            obj2.disOld = item3.proDistributionOldPrice;
                            priceList.push(obj2);
                        });
                    }
                    platoons.push(obj);
                });
                this.platoon = platoons;
            } else {
                if ((isRoom || isFly)&&(item.hotel||item.fly)) {
                    this.platoon[0].priceList = [];
                }
            }
        },
        changeArr(index) {
            // console.log(this.platoon[index].fly);
            //监控每期价格体系
            this.addpriceLevel(index);
        },
        checkNum2(index) {
            //校验余位为5数字
            if (this.platoon[index].rest) {
                this.$nextTick(() => {
                    this.platoon[index].rest = Validate.checkNum(
                        this.platoon[index].rest
                    ).slice(0, 5);
                });
            }
        },
        checkNum3(index, index1) {
            //校验接送费为5数字
            let obj = this.platoon[index].gather[index1].proPickUpFee;
            if (obj) {
                this.$nextTick(() => {
                    obj = Validate.checkNum(obj).slice(0, 5);
                    this.platoon[index].gather[index1].proPickUpFee = obj;
                });
            }
        },
        checkNum4(index, index1) {
            //校验房差金额为5数字
            let obj = this.platoon[index].hotelArr[index1].roomFree;
            if (obj) {
                this.$nextTick(() => {
                    obj = Validate.checkNumPos(obj).slice(0, 5);
                    this.platoon[index].hotelArr[index1].roomFree = obj;
                });
            }
            console.log(this.$Validate);
        },
        checkNum5(index, obj) {
            let obj1;
            switch (obj) {
                case "proBuyMoney":
                    obj1 = this.platoon[index].proBuyMoney;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 5);
                            this.platoon[index].proBuyMoney = obj1;
                        });
                    }
                    break;
                case "proSendMoney":
                    obj1 = this.platoon[index].proSendMoney;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 5);
                            this.platoon[index].proSendMoney = obj1;
                        });
                    }
                    break;
                case "proBuyPeople":
                    obj1 = this.platoon[index].proBuyPeople;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 5);
                            this.platoon[index].proBuyPeople = obj1;
                        });
                    }
                    break;
                case "proSendPeople":
                    obj1 = this.platoon[index].proSendPeople;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 5);
                            this.platoon[index].proSendPeople = obj1;
                        });
                    }
                    break;
            }
        },
        checkNum(obj, index, index1) {
            //校验价格体系只能为小于8位数的整数
            let obj1;
            switch (obj) {
                case "marketAdult":
                    obj1 = this.platoon[index].priceList[index1].marketAdult;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 8);
                            this.platoon[index].priceList[
                                index1
                            ].marketAdult = obj1;
                        });
                    }
                    break;
                case "marketChild":
                    obj1 = this.platoon[index].priceList[index1].marketChild;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 8);
                            this.platoon[index].priceList[
                                index1
                            ].marketChild = obj1;
                        });
                    }
                    break;
                case "marketStudent":
                    obj1 = this.platoon[index].priceList[index1].marketStudent;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 8);
                            this.platoon[index].priceList[
                                index1
                            ].marketStudent = obj1;
                        });
                    }
                    break;
                case "marketOld":
                    obj1 = this.platoon[index].priceList[index1].marketOld;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 8);
                            this.platoon[index].priceList[
                                index1
                            ].marketOld = obj1;
                        });
                    }
                    break;
                case "outAdult":
                    obj1 = this.platoon[index].priceList[index1].outAdult;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 8);
                            this.platoon[index].priceList[
                                index1
                            ].outAdult = obj1;
                        });
                    }
                    break;
                case "outStudent":
                    obj1 = this.platoon[index].priceList[index1].outStudent;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 8);
                            this.platoon[index].priceList[
                                index1
                            ].outStudent = obj1;
                        });
                    }
                    break;
                case "outChild":
                    obj1 = this.platoon[index].priceList[index1].outChild;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 8);
                            this.platoon[index].priceList[
                                index1
                            ].outChild = obj1;
                        });
                    }
                    break;
                case "outOld":
                    obj1 = this.platoon[index].priceList[index1].outOld;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 8);
                            this.platoon[index].priceList[index1].outOld = obj1;
                        });
                    }
                    break;
                case "disAdult":
                    obj1 = this.platoon[index].priceList[index1].disAdult;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 8);
                            this.platoon[index].priceList[
                                index1
                            ].disAdult = obj1;
                        });
                    }
                    break;
                case "disStudent":
                    obj1 = this.platoon[index].priceList[index1].disStudent;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 8);
                            this.platoon[index].priceList[
                                index1
                            ].disStudent = obj1;
                        });
                    }
                    break;
                case "disChild":
                    obj1 = this.platoon[index].priceList[index1].disChild;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 8);
                            this.platoon[index].priceList[
                                index1
                            ].disChild = obj1;
                        });
                    }
                    break;
                case "disOld":
                    obj1 = this.platoon[index].priceList[index1].disOld;
                    if (obj1) {
                        this.$nextTick(() => {
                            obj1 = Validate.checkNum(obj1).slice(0, 8);
                            this.platoon[index].priceList[index1].disOld = obj1;
                        });
                    }
                    break;
            }
        },
        dateClick(data, index) {
            this.platoon[index].dataArr = data;
        },
        changeGather(index1, e) {
            //加入文件对象
            var formData = new FormData();
            formData.append("file", e.target.files[0]);
            let filt = e.target.files[0].name;
            let type = filt.split(".")[1].toLowerCase();
            if (type == "xls" || type == "xlsx") {
                this.$http
                    .updaloadExcel({
                        url: this.$api.uploadExcel,
                        method: "post",
                        data: formData
                    })
                    .then(res => {
                        let arr = res.data.data;
                        console.log(arr);
                        arr.forEach(function(item, index) {
                            if (item.proPickUpFee) {
                                item.checked = true;
                            } else {
                                item.checked = false;
                            }
                        });
                        let arr2 = [];
                        this.platoon[index1].gather.forEach(function(
                            item3,
                            index3
                        ) {
                            if (
                                item3.proGatherTime ||
                                item3.proGatherPlace ||
                                (item3.checked && item3.proPickUpFee)
                            ) {
                                arr2.push(item3);
                            }
                        });
                        this.platoon[index1].gather = [...arr2, ...arr];
                    })
                    .catch(err => {
                        this.$message.error(err);
                    });
            } else {
                return this.$message.error("导入数据必须是表格文件");
            }
        },
        addGather(index) {
            //添加集合信息
            this.platoon[index].gather.push({
                proGatherTime: "",
                proGatherPlace: "",
                checked: "",
                proPickUpFee: ""
            });
        },
        delGather(index, gatherIndex) {
            //删除集合信息
            if (this.platoon[index].gather.length > 1) {
                this.platoon[index].gather.splice(gatherIndex, 1);
            } else {
                this.$message.warning("至少保留一条集合信息");
            }
        },
        download() {
            //下载模板
            this.$http.axios({
                url: this.$api.downloadPro,
                method: "get"
            });
        },
        delhotelLevel(index, index1) {
            //删除酒店级别
            this.platoon[index].hotelArr.splice(index1, 1);
            this.addpriceLevel(index);
        },
        addhotelLevel(index) {
            //添加酒店级别
            this.platoon[index].hotelArr.push({ hotelInput: "", roomFree: "" });
        },
        addflyLevel(index) {
            //添加航班信息
            this.platoon[index].flyArr.push({
                flyName: "",
                flyNum: "",
                start: "",
                end: ""
            });
        },
        delflyLevel(index, index1) {
            //删除航班信息
            this.platoon[index].flyArr.splice(index1, 1);
            this.addpriceLevel(index);
        },
        flagpriceLevel(index) {
            //生成价格体系前校验
            let hotel = this.platoon[index].hotel;
            let vm = this;
            let flag = true;
            if (hotel) {
                this.platoon[index].hotelArr.forEach(function(item, index) {
                    if (!item.hotelInput || (!item.roomFree && vm.roomMoney)) {
                        vm.$message.error("酒店级别信息未填写完整");
                        return (flag = false);
                    }
                });
            }
            let fly = this.platoon[index].fly;
            if (fly && flag) {
                this.platoon[index].flyArr.forEach(function(item, index) {
                    if (
                        !item.flyName ||
                        !item.flyNum ||
                        !item.start ||
                        !item.end
                    ) {
                        vm.$message.error("航班信息未填写完整");
                        return (flag = false);
                    }
                });
            }
            return flag;
        },
        newpriceLevel(index) {
            let flag = this.flagpriceLevel(index);
            if (flag != false) {
                this.addpriceLevel(index);
            }
        },
        addpriceLevel(index) {
            //生成价格体系
            let hotel = this.platoon[index].hotel;
            let fly = this.platoon[index].fly;
            let arr = [];
            let hotelCon = this.platoon[index].hotelArr;
            let flyCon = this.platoon[index].flyArr;
            if (hotel && fly) {
                for (let i = 0; i < hotelCon.length; i++) {
                    for (let j = 0; j < flyCon.length; j++) {
                        arr.push({
                            marketAdult: "",
                            marketChild: "",
                            marketStudent: "",
                            marketOld: "",
                            outAdult: "",
                            outStudent: "",
                            outChild: "",
                            outOld: "",
                            disAdult: "",
                            disStudent: "",
                            disChild: "",
                            disOld: "",
                            hotelLevel: hotelCon[i].hotelInput, //酒店级别
                            roomFree: hotelCon[i].roomFree,
                            flyName: flyCon[j].flyName, //航班信息
                            flyNum: flyCon[j].flyNum,
                            start: flyCon[j].start,
                            end: flyCon[j].end
                        });
                    }
                }
            }
            if (hotel && !fly) {
                hotelCon.forEach(function(item, hotelindex) {
                    arr.push({
                        marketAdult: "",
                        marketChild: "",
                        marketStudent: "",
                        marketOld: "",
                        outAdult: "",
                        outStudent: "",
                        outChild: "",
                        outOld: "",
                        disAdult: "",
                        disStudent: "",
                        disChild: "",
                        disOld: "",
                        hotelLevel: item.hotelInput, //酒店级别
                        roomFree: item.roomFree,
                        flyName: "", //航班信息
                        flyNum: "",
                        start: "",
                        end: ""
                    });
                });
            }
            if (!hotel && fly) {
                flyCon.forEach(function(item, flyindex) {
                    arr.push({
                        marketAdult: "",
                        marketChild: "",
                        marketStudent: "",
                        marketOld: "",
                        outAdult: "",
                        outStudent: "",
                        outChild: "",
                        outOld: "",
                        disAdult: "",
                        disStudent: "",
                        disChild: "",
                        disOld: "",
                        hotelLevel: "", //酒店级别
                        roomFree: "",
                        flyName: item.flyName, //航班信息
                        flyNum: item.flyNum,
                        start: item.start,
                        end: item.end
                    });
                });
            }
            if (!hotel && !fly) {
                arr.push({
                    marketAdult: "",
                    marketChild: "",
                    marketStudent: "",
                    marketOld: "",
                    outAdult: "",
                    outStudent: "",
                    outChild: "",
                    outOld: "",
                    disAdult: "",
                    disStudent: "",
                    disChild: "",
                    disOld: "",
                    hotelLevel: "", //酒店级别
                    roomFree: "",
                    flyName: "", //航班信息
                    flyNum: "",
                    start: "",
                    end: ""
                });
            }
            console.log(arr);
            this.platoon[index].priceList = arr;
        },
        addplatoon() {
            //增加团期
            let obj = {};
            if (!isRoom && !isFly) {//酒店飞机全无
                obj = {
                    dataArr: [], //日历团期集合
                    priceList: [
                        {
                            marketAdult: "",
                            marketChild: "",
                            marketStudent: "",
                            marketOld: "",
                            outAdult: "",
                            outStudent: "",
                            outChild: "",
                            outOld: "",
                            disAdult: "",
                            disStudent: "",
                            disChild: "",
                            disOld: "",
                            hotelLevel: "", //酒店级别
                            roomFree: "",
                            flyName: "", //航班信息
                            flyNum: "",
                            start: "",
                            end: ""
                        }
                    ],
                    gather: [
                        {
                            //集合信息
                            proGatherTime: "",
                            proGatherPlace: "",
                            checked: "",
                            proPickUpFee: ""
                        }
                    ],
                    isExport: "0",
                    proGatherCity: "", //集合出发城市
                    rest: "",
                    restType: "0",
                    sell: "0",
                    proBuyMoney: "", //促销购买金额
                    proSendMoney: "", //促销立减金额
                    proBuyPeople: "", //促销满减人数
                    proSendPeople: "", //促销免单人数
                    people: "", //价格计算
                    peoples: [], //适用客群
                    hotelArr: [{ hotelInput: "", roomFree: "" }],
                    flyArr: [{ flyName: "", flyNum: "", start: "", end: "" }],
                    hotel: isRoom,
                    fly: isFly
                };
            } else {
                obj = {
                    dataArr: [], //日历团期集合
                    priceList: [{
                            marketAdult: "",
                            marketChild: "",
                            marketStudent: "",
                            marketOld: "",
                            outAdult: "",
                            outStudent: "",
                            outChild: "",
                            outOld: "",
                            disAdult: "",
                            disStudent: "",
                            disChild: "",
                            disOld: "",
                            hotelLevel: "", //酒店级别
                            roomFree: "",
                            flyName: "", //航班信息
                            flyNum: "",
                            start: "",
                            end: ""
                        }],
                    gather: [
                        {
                            //集合信息
                            proGatherTime: "",
                            proGatherPlace: "",
                            checked: "",
                            proPickUpFee: ""
                        }
                    ],
                    isExport: "0",
                    proGatherCity: "", //集合出发城市
                    rest: "",
                    restType: "0",
                    sell: "0",
                    proBuyMoney: "", //促销购买金额
                    proSendMoney: "", //促销立减金额
                    proBuyPeople: "", //促销满减人数
                    proSendPeople: "", //促销免单人数
                    people: "", //价格计算
                    peoples: [], //适用客群
                    hotelArr: [{ hotelInput: "", roomFree: "" }],
                    flyArr: [{ flyName: "", flyNum: "", start: "", end: "" }],
                    hotel: false,//isRoom,
                    fly: false //isFly
                };
            }
            this.platoon.push(obj);
        },
        delplatoon(index) {
            //删除团期
            this.platoon.splice(index, 1);
        },
        ArrIsFlag() {
            //判断每期中是否有团期相同
            let arr = [];
            let set = new Set();
            this.platoon.forEach(function(item, index) {
                item.dataArr.forEach(function(item2, index) {
                    arr.push(item2.day);
                    set.add(item2.day);
                });
            });
            if (arr.length == set.size) {
                return true;
            } else {
                return false;
            }
        },
        twoSave() {
            //保存
            let proNum = this.proNum;
            let obj = this.pageData();
            let flag = true;
            obj.forEach(function(item, index) {
                if (!item.proLeaveTime) {
                    return (flag = false);
                }
            });
            if (flag) {
                this.twosaves = true; //按钮禁用一会
                this.$http
                    .axios({
                        url: this.$api.routePlatoonItem + "?proNum=" + proNum,
                        method: "post",
                        data: obj,
                        json: true
                    })
                    .then(res => {
                        this.$message.success("团期保存成功");
                        this.twosaves = false; //按钮恢复
                        console.log(res);
                    })
                    .catch(() => {
                        this.twosaves = false; //按钮恢复
                    });
            } else {
                this.$message.error("请至少选择下团期");
            }
        },
        nextThree() {
            //下一页
            let proNum = this.proNum;
            let flag = this.flagData();
            console.log(flag);
            if (flag == true) {
                if (this.ArrIsFlag()) {
                    this.twocom = true; //按钮禁用一会
                    let obj = this.pageData();
                    this.$http
                        .axios({
                            url:
                                this.$api.routePlatoonItem +
                                "?proNum=" +
                                proNum,
                            method: "post",
                            data: obj,
                            json: true
                        })
                        .then(res => {
                            console.log(res);
                            this.twocom = false; //按钮恢复
                            if (res) {
                                this.threeTotal(res);
                                this.changeTab("third");
                            }
                        })
                        .catch(() => {
                            this.twocom = false; //按钮恢复
                        });
                } else {
                    this.$message.error("团期中有重复团期");
                }
            }
        },
        backOne() {
            //上一页
            this.changeTab("first");
        },
        fore7(arr, func) {
            for (var i = 0; i < arr.length; i++) {
                var ret = func.call(this, arr[i], i); //回调函数
                if (typeof ret !== "undefined" && (ret == null || ret == false))
                    break;
            }
        },
        flagData() {
            //校验数据
            // if(!this.routeDays){
            //     return this.$message.error('行程天数未填写')
            // }
            let vm = this;
            let flag = true;
            this.fore7(this.platoon, function(item, index) {
                // this.platoon.forEach(function(item,index){
                let tip = "第" + (index + 1) + "期";
                if (!item.restType) {
                    vm.$message.error(tip + "余位未选择");
                    return (flag = false);
                }
                if (item.restType == 1) {
                    //余味
                    if (!item.rest) {
                        vm.$message.error(tip + "余位未填写");
                        return (flag = false);
                    }
                }
                if (!item.sell) {
                    vm.$message.error(tip + "促销活动未选择");
                    return (flag = false);
                }
                if (item.sell == 1) {
                    //免单
                    if (!item.proBuyPeople) {
                        vm.$message.error(tip + "满减人数未填写");
                        return (flag = false);
                    }
                    if (!item.proSendPeople) {
                        vm.$message.error(tip + "免单人数未填写");
                        return (flag = false);
                    }
                    if (item.peoples.length == 0) {
                        vm.$message.error(tip + "适用客群未选择");
                        return (flag = false);
                    }
                    if (!item.people) {
                        vm.$message.error(tip + "计算价格人群未选择");
                        return (flag = false);
                    }
                }
                if (item.sell == 2) {
                    //立减
                    if (!item.proBuyMoney) {
                        vm.$message.error(tip + "满减金额未填写");
                        return (flag = false);
                    }
                    if (!item.proSendMoney) {
                        vm.$message.error(tip + "免单金额未填写");
                        return (flag = false);
                    }
                    if (item.peoples.length == 0) {
                        vm.$message.error(tip + "适用客群未选择");
                        return (flag = false);
                    }
                }
                if (item.dataArr.length == 0) {
                    vm.$message.error(tip + "团期未选择");
                    return (flag = false);
                }
                if (!item.proGatherCity) {
                    console.log(item.proGatherCity);
                    vm.$message.error(tip + "集合城市未选择");
                    return (flag = false);
                }
                //集合信息
                for (let i = 0; i < item.gather.length; i++) {
                    if (!item.gather[i].proGatherTime) {
                        vm.$message.error(tip + "集合时间未选择");
                        return (flag = false);
                        // break
                    }
                    if (!item.gather[i].proGatherPlace) {
                        vm.$message.error(tip + "集合地点未填写");
                        return (flag = false);
                        // break
                    }
                    if (
                        !item.gather[i].proPickUpFee &&
                        item.gather[i].checked
                    ) {
                        vm.$message.error(tip + "接送费未填写");
                        return (flag = false);
                        // break
                    }
                }
                //价格体系
                if (!item.priceList.length) {
                    vm.$message.error(tip + "价格体系未填写");
                    return (flag = false);
                }
                for (let j = 0; j < item.priceList.length; j++) {
                    if (item.hotel) {
                        //酒店的
                        if (!item.priceList[j].hotelLevel) {
                            vm.$message.error(tip + "酒店级别为空");
                            return (flag = false);
                            // break
                        }
                        if (vm.roomMoney) {
                            if (!item.priceList[j].roomFree) {
                                vm.$message.error(tip + "房差金额为空");
                                return (flag = false);
                                // break
                            }
                        }
                    }
                    if (item.fly) {
                        //飞机
                        if (!item.priceList[j].flyName) {
                            vm.$message.error(tip + "航班公司为空");
                            return (flag = false);
                            // break
                        }
                        if (!item.priceList[j].flyNum) {
                            vm.$message.error(tip + "航空班次为空");
                            return (flag = false);
                            // break
                        }
                        if (!item.priceList[j].start) {
                            vm.$message.error(tip + "航班起飞时间为空");
                            return (flag = false);
                            // break
                        }
                        if (!item.priceList[j].end) {
                            vm.$message.error(tip + "航班到达时间为空");
                            return (flag = false);
                            // break
                        }
                    }
                    if (vm.adult) {
                        if (
                            !item.priceList[j].marketAdult ||
                            !item.priceList[j].outAdult ||
                            !item.priceList[j].disAdult
                        ) {
                            vm.$message.error(tip + "成人价格未填写完整");
                            return (flag = false);
                        }
                    }
                    if (vm.student) {
                        if (
                            !item.priceList[j].marketStudent ||
                            !item.priceList[j].outStudent ||
                            !item.priceList[j].disStudent
                        ) {
                            vm.$message.error(tip + "学生价格未填写完整");
                            return (flag = false);
                        }
                    }
                    if (vm.child) {
                        if (
                            !item.priceList[j].marketChild ||
                            !item.priceList[j].outChild ||
                            !item.priceList[j].disChild
                        ) {
                            vm.$message.error(tip + "儿童价格未填写完整");
                            return (flag = false);
                        }
                    }
                    if (vm.old) {
                        if (
                            !item.priceList[j].marketOld ||
                            !item.priceList[j].outOld ||
                            !item.priceList[j].disOld
                        ) {
                            vm.$message.error(tip + "老人价格未填写完整");
                            return (flag = false);
                        }
                    }
                }
            });
            if (flag == true) {
                return true;
            } else {
                return false;
            }
        },
        pageData() {
            let routePlatoonDateEntityList = [];
            let vm = this;
            this.platoon.forEach(function(item, index) {
                let obj = {};
                if (item.restType == 1) {
                    obj.proRest = item.rest; //余味
                }
                obj.promotion = item.sell == 0 ? "0" : "1"; //产品促销(0无促销 1有促销)
                if (item.sell == 1) {
                    //免单
                    obj.proPromotionType = 0;
                    obj.proBuyPeople = item.proBuyPeople;
                    obj.proSendPeople = item.proSendPeople;
                    obj.suit = item.peoples.join(","); //适用客群数组
                    obj.suitPrice = item.people;
                }
                if (item.sell == 2) {
                    //立减
                    obj.proPromotionType = 1;
                    obj.proBuyMoney = item.proBuyMoney;
                    obj.proSendMoney = item.proSendMoney;
                    obj.suit = item.peoples.join(","); //适用客群数组
                }
                obj.proLeaveTime = [];
                item.dataArr.forEach(function(item2, index2) {
                    obj.proLeaveTime.push(item2.day);
                });
                obj.proLeaveTime = obj.proLeaveTime.join(","); //团期
                obj.proGatherCity = item.proGatherCity;
                //集合信息
                let gatherArr = [];
                item.gather.forEach(function(item1, index1) {
                    let obj1 = {};
                    obj1.proGatherTime = item1.proGatherTime;
                    obj1.proGatherPlace = item1.proGatherPlace;
                    if (item1.checked) {
                        obj1.proPickUpFee = item1.proPickUpFee;
                    }
                    gatherArr.push(obj1);
                });
                obj.routeGatherMapList = gatherArr;
                // 酒店数组
                if (isRoom && item.hotel) {
                    obj.hotelYes = 1;
                    let routeHotelMapList = [];
                    item.hotelArr.forEach(function(item0, index0) {
                        let obj0 = {};
                        obj0.proHotelLevel = item0.hotelInput;
                        if (vm.roomMoney) {
                            obj0.onePerPrice = item0.roomFree;
                        }
                        routeHotelMapList.push(obj0);
                    });
                    obj.routeHotelMapList = routeHotelMapList;
                }
                //飞机数组
                if (isFly && item.fly) {
                    obj.flightYes = 1;
                    let flightMapList = [];
                    item.flyArr.forEach(function(item00, index00) {
                        flightMapList.push({
                            flightCom: item00.flyName, //航班公司
                            fightNum: item00.flyNum, //航空班次
                            flightLeaveTime: item00.start, //起飞时间
                            flightArriveTime: item00.end //到达时间
                        });
                    });
                    obj.flightMapList = flightMapList;
                }
                let routePlatoonPriceEntityList = [];
                obj.routePlatoonPriceEntityList = routePlatoonPriceEntityList;
                item.priceList.forEach(function(item3, index3) {
                    let obj2 = {};
                    if (item.hotel) {
                        //酒店的
                        obj2.proHotelLevel = item3.hotelLevel;
                        if (vm.roomMoney) {
                            obj.isOnePer = 1;
                            obj2.onePerPrice = item3.roomFree;
                        } else {
                            obj.isOnePer = 0;
                        }
                    }
                    if (item.fly) {
                        obj2.flightCom = item3.flyName; //航班公司
                        obj2.fightNum = item3.flyNum; //航空班次
                        obj2.flightLeaveTime = item3.start; //起飞时间
                        obj2.flightArriveTime = item3.end; //到达时间
                    }
                    if (vm.adult) {
                        obj2.proMarketAdultPrice = item3.marketAdult;
                        obj2.proOutAdultPrice = item3.outAdult;
                        obj2.proDistributionAdultPrice = item3.disAdult;
                    }
                    if (vm.student) {
                        obj2.proMarketStudentPrice = item3.marketStudent;
                        obj2.proOutStudentPrice = item3.outStudent;
                        obj2.proDistributionStudentPrice = item3.disStudent;
                    }
                    if (vm.child) {
                        obj2.proMarketChildPrice = item3.marketChild;
                        obj2.proOutChildPrice = item3.outChild;
                        obj2.proDistributionChildPrice = item3.disChild;
                    }
                    if (vm.old) {
                        obj2.proMarketOldPrice = item3.marketOld;
                        obj2.proOutOldPrice = item3.outOld;
                        obj2.proDistributionOldPrice = item3.disOld;
                    }
                    routePlatoonPriceEntityList.push(obj2);
                });
                routePlatoonDateEntityList.push(obj);
            });
            console.log(routePlatoonDateEntityList);
            return routePlatoonDateEntityList;
        },
        ...mapActions("addPro", ["twoCommit", "changeTab", "threeTotal"])
    },
    components: {
        calanderPro,
        cityPicker
    }
};
</script>
