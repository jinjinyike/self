<template>
    <div id='platoon'>
        <div v-for='(item,index) in platoon' class="item">
            <div class="item-bottom">
                <span class="span-title">发团日期</span>
                <calander-price  :obj='item.dataArr' @getdata='dateClick'  :index-num='1' :canClick='true' ref='calendarPrice'></calander-price>
                <!-- <calander-pro  :obj='item.dataArr' @getdata='dateClick' :index-num='index'  ref='calendar'></calander-pro> -->
                 <!-- <el-tag v-for='ceshi in item.dataArr' :key='ceshi.day'>{{ceshi.day}}</el-tag> -->
            <div class="dot" style="margin-left:10px"></div>
            </div>
            
            <div class="item-bottom">
                <div class="inline-block" style='margin-top:-4px;width:90%;vertical-align:middle;margin-left:5px'>
                    <el-checkbox v-model="item.hotel"  v-if='room' @change='changeArr(index)'>酒店差别</el-checkbox>
                    <el-checkbox v-model="item.fly" v-if='fly' @change='changeArr(index)'>航班差别</el-checkbox>
                </div>
            <div class="dot" style="margin-left:10px" v-if='room||fly'></div>
            </div>
            <template >
                <!-- 住宿界别 -->
            <div class="item-bottom" v-if='item.hotel'>
                <span class="span-title" style="margin-top:4px;">住宿级别</span>
                <div class="inline-block " style="width:80%;vertical-align:top">
                <div v-for='(hotelInput,hotelindex) in item.hotelArr' class="item-bottom" >
                <el-input placeholder='住宿级别' v-model='hotelInput.hotelInput' style='width:25.3%'></el-input>
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
                <div v-for='(flyInput,flyindex) in item.flyArr' class="item-bottom" >
                <el-select v-model='flyInput.flyName' filterable placeholder="请选择">
                    <el-option
                      v-for="sky in options2"
                      :key="sky.value"
                      :label="sky.label"
                      :value="sky.value">
                    </el-option>
                </el-select>
                    <el-input placeholder='航班班次' v-model='flyInput.flyNum' style='margin-left:0px;'></el-input>
                    <el-time-select style="width:13%;margin-left:0px"
                              v-model="flyInput.start"
                              :editable='false'
                              :picker-options="{
                                start: '00:00',
                                step: '00:05',
                                end: '23:55'
                              }"
                              placeholder="出发时间">
                    </el-time-select>
                    <el-time-select style="width:13%;margin-left:0px"
                              v-model="flyInput.end"
                              :editable='false'
                              :picker-options="{
                                start: '00:00',
                                step: '00:05',
                                end: '23:55'
                              }"
                              placeholder="抵达时间">
                    </el-time-select>
                <el-button plain size='small' type="primary" @click='delflyLevel(index,flyindex)' v-if='flyindex!=0'>删除</el-button>
                <el-button plain size='small' type="primary" @click='addflyLevel(index)' v-if='flyindex==0'>添加</el-button>
                <!-- <el-button plain size='small' type="primary" @click='addpriceLevel(index)' v-if='item.fly||item.hotel'>生成价格体系</el-button> -->
                </div>
                </div>
            </div >
            <!-- 生成价格 -->
            <div  style='text-align:center;'>
                <el-button plain size='small' type="primary" @click='newpriceLevel(index)' v-if='item.fly||item.hotel'>生成价格体系</el-button>
            </div>
            <div class="dot" v-if='item.fly||item.hotel' style="margin-left:10px"></div>
            </template>
            <!-- 价格体系 -->
            <div class="item-bottom">
                <template v-for='(price,index1) in item.priceList' >
                    <template v-if='item.priceList.length>=1&&(item.hotel||item.fly)'>
                    <!-- 住宿级别 -->
                        <div class="item-bottom" v-if='item.hotel'>
                            <span class="span-title" >住宿级别</span>
                            <el-input v-model='price.hotelLevel' :disabled='true'></el-input>
                            <template v-if='roomMoney'>
                                <span class="span-title" >房差金额</span>
                                <el-input v-model='price.roomFree' :disabled='true' ></el-input>
                            </template>
                        </div>
                        <!-- 航班信息 -->
                        <div class="item-bottom" v-if='item.fly'>
                            <span class="span-title" >航班信息</span>
                            <el-input v-model='price.flyName' :disabled='true'></el-input>
                            <span class="span-title" >航班号</span>
                            <el-input v-model='price.flyNum' :disabled='true'></el-input>
                            <el-input v-model='price.start' :disabled='true'></el-input>
                            <el-input v-model='price.end' :disabled='true'></el-input>
                        </div>
                    </template>
                <!-- 市场价格 -->
                    <div class="item-bottom price-append">
                        <span class="span-title">市场价格</span>
                        <template v-if="adult">
                        <span class="span-title">成人价格</span><el-input v-model.trim="price.marketAdult" placeholder="" v-on:input="checkNum('marketAdult',index,index1)"><template slot="append">元/人</template></el-input>
                        </template>
                        <template v-if="child">
                        <span class="span-title">儿童价格</span><el-input v-model.trim="price.marketChild" placeholder="" v-on:input="checkNum('marketChild',index,index1)"><template slot="append">元/人</template></el-input>
                        </template>
                        <template v-if="student">
                        <span class="span-title">学生价格</span><el-input v-model.trim="price.marketStudent" placeholder="" v-on:input="checkNum('marketStudent',index,index1)"><template slot="append">元/人</template></el-input>
                        </template >
                        <template v-if='old'>
                        <span class="span-title">老人价格</span><el-input v-model.trim="price.marketOld" placeholder="" v-on:input="checkNum('marketOld',index,index1)"><template slot="append">元/人</template></el-input>
                        </template>
                    </div>
                <!-- 分销价格 -->
                    <div class="item-bottom price-append">
                        <span class="span-title">外卖价格</span>
                        <template v-if="adult">
                        <span class="span-title">成人价格</span><el-input v-model.trim="price.outAdult" placeholder="" v-on:input="checkNum('outAdult',index,index1)"><template slot="append">元/人</template></el-input>
                        </template>
                        <template v-if="child">
                        <span class="span-title">儿童价格</span><el-input v-model.trim="price.outChild" placeholder="" v-on:input="checkNum('outChild',index,index1)"><template slot="append">元/人</template></el-input>
                        </template>
                        <template v-if="student">
                        <span class="span-title">学生价格</span><el-input v-model.trim="price.outStudent" placeholder="" v-on:input="checkNum('outStudent',index,index1)"><template slot="append">元/人</template></el-input>
                        </template>
                        <template v-if='old'>
                        <span class="span-title">老人价格</span><el-input v-model.trim="price.outOld" placeholder="" v-on:input="checkNum('outOld',index,index1)"><template slot="append">元/人</template></el-input>
                        </template>
                    </div>
                <!-- 外卖价格 -->
                    <div class="item-bottom price-append">
                        <span class="span-title">分销价格</span>
                        <template v-if="adult">
                        <span class="span-title">成人价格</span><el-input v-model.trim="price.disAdult" placeholder="" v-on:input="checkNum('disAdult',index,index1)"><template slot="append">元/人</template></el-input>
                        </template>
                        <template v-if="child">
                        <span class="span-title">儿童价格</span><el-input v-model.trim="price.disChild" placeholder="" v-on:input="checkNum('disChild',index,index1)"><template slot="append">元/人</template></el-input>
                        </template>
                        <template v-if="student">
                        <span class="span-title">学生价格</span><el-input v-model.trim="price.disStudent" placeholder="" v-on:input="checkNum('disStudent',index,index1)"><template slot="append">元/人</template></el-input>
                        </template>
                        <template v-if='old'>
                        <span class="span-title">老人价格</span><el-input v-model.trim="price.disOld" placeholder="" v-on:input="checkNum('disOld',index,index1)"><template slot="append">元/人</template></el-input>
                        </template>
                    </div>
                    <!-- <div class="dot"></div> -->
                </template>
                <div class="dot" style="margin-left:10px" v-if='platoon[0].priceList.length>0'></div> 
            </div>
        </div>
        <div class="button-area">
                    <el-button type="primary" plain size='middle'  @click='nextThree'  :disabled='twocom'>提交</el-button>
        </div>
    </div>
</template>
<style scoped>
@import '../../../../assets/pcCss/addProduct.css'
</style>
<script >
import cityPicker from '../../public/cityPicker.vue'
import cityList from 'china-city-data'
import {mapState,mapActions} from 'vuex'
// import calanderPro from'../../public/calander.vue'
import calanderPrice from'../../public/calander_price.vue'
import Validate from '@/common/validate/validate.js'
import flyList from '../../public/flySet.js'
var isRoom;
var isFly;
    export default{
        data(){
            return{
                twocom:false,
                cityList,
                adult:false,
                child:false,
                student:false,
                old:false,
                room:false,
                roomMoney:false,
                fly:false,
                platoon:[
                    {
                        dataArr:[],//日历团期集合
                        proLeaveTime:[],
                        priceList:[
                        {
                            marketAdult:'',
                            marketChild:'',
                            marketStudent:'',
                            marketOld:'',
                            outAdult:'',
                            outStudent:'',
                            outChild:'',
                            outOld:'',
                            disAdult:'',
                            disStudent:'',
                            disChild:'',
                            disOld:'',
                            hotelLevel:'',//酒店级别
                            roomFree:'',
                            flyName:'', //航班信息
                            flyNum:'',
                            start:'',
                            end:'',
                        }
                        ],
                        hotelArr:[{hotelInput:'',roomFree:''}],
                        flyArr:[{flyName:'',flyNum:'',start:'',end:''}],
                        hotel:isRoom,
                        fly:isFly
                    }
                ],
                options2:flyList,
                options3:[{value:'0',label:'不限余位'},{value:'1',label:'设定余位'}],
            }
        },
        created(){
        },
        filters: {
            changeData(oldVal) {
                return oldVal;
            }
        },
        computed:{
                ...mapState('editRoutePro',['SproNum','basic','platoon1'])
        },
        watch:{
            basic:{
                handler(){
                    this.basic.routeProEntity.isContainHotel == 1
                        ? (this.room = true)
                        : (this.room = false); //有住宿
                    this.basic.routeProEntity.mainTraffic == '飞机'
                        ? (this.fly = true)
                        : (this.fly = false); //是否飞机
                    this.roomMoney =
                        this.basic.routeProEntity.isRoomFree == 1 ? true : false; //有无房差
                    isRoom = this.room;
                    isFly = this.fly;
                    let priceArr = this.basic.routeProEntity.priceStructure.split(',');
                    this.adult = false;
                    this.student = false;
                    this.child = false;
                    this.old = false;
                    if (priceArr.includes('成人价格')) {
                        this.adult = true;
                    }
                    if (priceArr.includes('学生价格')) {
                        this.student = true;
                    }
                    if (priceArr.includes('儿童价格')) {
                        this.child = true;
                    }
                    if (priceArr.includes('老人价格')) {
                        this.old = true;
                    }
                    this.platoon[0].hotel=isRoom;
                    this.platoon[0].fly=isFly;
                    if (isRoom || isFly) {
                            this.platoon[0].priceList = []; //在后台不更新的情况下  任一清空价格数组
                        }
                        if (!isRoom && !isFly) {
                            //都无还原价格数组
                            this.platoon[0].priceList = [
                                {
                                    marketAdult: '',
                                    marketChild: '',
                                    marketStudent: '',
                                    marketOld: '',
                                    outAdult: '',
                                    outStudent: '',
                                    outChild: '',
                                    outOld: '',
                                    disAdult: '',
                                    disStudent: '',
                                    disChild: '',
                                    disOld: '',
                                    hotelLevel: '', //酒店级别
                                    roomFree: '',
                                    flyName: '', //航班信息
                                    flyNum: '',
                                    start: '',
                                    end: ''
                                }
                            ];
                        }
                }
            },
            platoon1:{
                handler(){
                    this.getPlatoon();
                }
            }
        },
        mounted(){
            this.getPlatoon();
        },
        methods:{
            getPlatoon(){
                this.promiseSyn().then(()=>{
                            if(this.platoon1){
                                let dataArr=[];
                                 let arr=this.platoon1.split(',');
                                 arr.forEach(function(item,index){
                                    dataArr.push({day:item,price:'2'})
                                 })
                                 this.platoon[0].dataArr=dataArr;
                            }

                        }).then(()=>{
                            console.log(this.$refs.calendarPrice)
                            if(this.$refs.calendarPrice[0]){
                                this.$refs.calendarPrice[0].initData(null);
                            }
                        })
            },
            promiseSyn(){
                return new Promise((resolve,reject)=>{
                    resolve()
                })
            },
            platoonSyn(){
                let platoonArr=this.platoon1;//数组
                let vm=this;
                let platoons=[];
                if(platoonArr.length){
                 platoonArr.forEach(function(item,index){
                let obj={};
                obj.dataArr=[];
                if(item.proLeaveTime){
                    let proLeaveTime=item.proLeaveTime.split(',');
                    proLeaveTime.forEach(function(item2,index2){
                        obj.dataArr.push({day:item2,price:'2'})
                    })
                }
                // obj.hotel=isRoom;
                // obj.fly=isFly;
                //酒店数组  当前有酒店数组hotel=true空数组 false
                let hotelArr=[];
                if(item.routeHotelMapList && item.routeHotelMapList.length){
                    obj.hotel=true;
                    item.routeHotelMapList.forEach(function(item4,index4){
                        let obj4={};
                        obj4.hotelInput=item4.proHotelLevel;
                        obj4.roomFree=item4.onePerPrice;
                        hotelArr.push(obj4);
                    })
                }else{
                    obj.hotel=false;
                }
                //飞机当前有酒店数组fly=true空数组 false
                let flyArr=[];
                if(item.flightMapList&&item.flightMapList.length){
                    obj.fly=true;
                    item.flightMapList.forEach(function(item6,index){
                        let obj5={};
                        obj5.flyName=item6.flightCom;
                        obj5.flyNum=item6.fightNum;
                        obj5.start=item6.flightLeaveTime;
                        obj5.end=item6.flightArriveTime;
                        flyArr.push(obj5);
                    });
                }else{
                    obj.fly=false;
                }
                obj.hotelArr=hotelArr;
                obj.flyArr=flyArr;
                let priceList=[];
                obj.priceList=priceList;
                if(item.routePlatoonPriceEntityList.length>0){
                    item.routePlatoonPriceEntityList.forEach(function(item3,index3){
                        let obj2={};
                        obj2.hotel=isRoom; 
                        obj2.hotelLevel=item3.proHotelLevel;//酒店的
                        obj2.roomFree=item3.onePerPrice;
                        obj2.fly=isFly; 
                        obj2.flyName=item3.flightCom;//航班公司
                        obj2.flyNum=item3.fightNum;//航空班次
                        obj2.start=item3.flightLeaveTime;//起飞时间
                        obj2.end=item3.flightArriveTime;//到达时间
                        obj2.marketAdult=item3.proMarketAdultPrice;
                        obj2.outAdult=item3.proOutAdultPrice;
                        obj2.disAdult=item3.proDistributionAdultPrice;
                        obj2.marketStudent=item3.proMarketStudentPrice;
                        obj2.outStudent=item3.proOutStudentPrice;
                        obj2.disStudent=item3.proDistributionStudentPrice;
                        obj2.marketChild=item3.proMarketChildPrice;
                        obj2.outChild=item3.proOutChildPrice;
                        obj2.disChild=item3.proDistributionChildPrice;
                        obj2.marketOld=item3.proMarketOldPrice;
                        obj2.outOld=item3.proOutOldPrice;
                        obj2.disOld=item3.proDistributionOldPrice;
                        priceList.push(obj2);
                    })
                }
                console.log('11111111111');
                platoons.push(obj);
            })
            this.platoon=platoons;
            }else{
                if(isRoom||isFly){
                    this.platoon[0].priceList=[];
                }
            }
                
            },
            changeArr(index){//监控每期价格体系
                this.addpriceLevel(index);
            },
            checkNum4(index,index1){//校验房差金额为5数字
                let obj=this.platoon[index].hotelArr[index1].roomFree;
                if(obj){
                    this.$nextTick(()=>{
                        obj=Validate.checkNum(obj).slice(0,5);
                        this.platoon[index].hotelArr[index1].roomFree=obj;
                    })
                }
            },
            checkNum(obj,index,index1){//校验价格体系只能为小于8位数的整数
                let obj1;
                switch(obj){
                    case 'marketAdult' :
                        obj1=this.platoon[index].priceList[index1].marketAdult;
                        if(obj1){
                            this.$nextTick(() => {
                                obj1=Validate.checkNum(obj1).slice(0,8);
                                this.platoon[index].priceList[index1].marketAdult=obj1;
                            })
                        }
                    break;
                    case 'marketChild' :
                        obj1=this.platoon[index].priceList[index1].marketChild;
                        if(obj1){
                            this.$nextTick(() => {
                                obj1=Validate.checkNum(obj1).slice(0,8);
                                this.platoon[index].priceList[index1].marketChild=obj1;
                            })
                        }
                    break;
                    case 'marketStudent' :
                        obj1=this.platoon[index].priceList[index1].marketStudent;
                        if(obj1){
                            this.$nextTick(() => {
                                obj1=Validate.checkNum(obj1).slice(0,8);
                                this.platoon[index].priceList[index1].marketStudent=obj1;
                            })
                        }
                        break;
                    case 'marketOld' :
                        obj1=this.platoon[index].priceList[index1].marketOld;
                        if(obj1){
                            this.$nextTick(() => {
                                obj1=Validate.checkNum(obj1).slice(0,8);
                                this.platoon[index].priceList[index1].marketOld=obj1;
                            })
                        }
                        break;
                    case 'outAdult' :
                        obj1=this.platoon[index].priceList[index1].outAdult;
                        if(obj1){
                            this.$nextTick(() => {
                                obj1=Validate.checkNum(obj1).slice(0,8);
                                this.platoon[index].priceList[index1].outAdult=obj1;
                            })
                        }
                        break;
                    case 'outStudent' :
                        obj1=this.platoon[index].priceList[index1].outStudent;
                        if(obj1){
                            this.$nextTick(() => {
                                obj1=Validate.checkNum(obj1).slice(0,8);
                                this.platoon[index].priceList[index1].outStudent=obj1;
                            })
                        }
                        break; 
                    case 'outChild' :
                        obj1=this.platoon[index].priceList[index1].outChild;
                        if(obj1){
                            this.$nextTick(() => {
                                obj1=Validate.checkNum(obj1).slice(0,8);
                                this.platoon[index].priceList[index1].outChild=obj1;
                            })
                        }
                        break;  
                    case 'outOld' :
                        obj1=this.platoon[index].priceList[index1].outOld;
                        if(obj1){
                            this.$nextTick(() => {
                                obj1=Validate.checkNum(obj1).slice(0,8);
                                this.platoon[index].priceList[index1].outOld=obj1;
                            })
                        }
                        break;  
                    case 'disAdult' :
                        obj1=this.platoon[index].priceList[index1].disAdult;
                        if(obj1){
                            this.$nextTick(() => {
                                obj1=Validate.checkNum(obj1).slice(0,8);
                                this.platoon[index].priceList[index1].disAdult=obj1;
                            })
                        }
                        break;   
                    case 'disStudent' :
                        obj1=this.platoon[index].priceList[index1].disStudent;
                        if(obj1){
                            this.$nextTick(() => {
                                obj1=Validate.checkNum(obj1).slice(0,8);
                                this.platoon[index].priceList[index1].disStudent=obj1;
                            })
                        }
                        break;   
                    case 'disChild' :
                        obj1=this.platoon[index].priceList[index1].disChild;
                        if(obj1){
                            this.$nextTick(() => {
                                obj1=Validate.checkNum(obj1).slice(0,8);
                                this.platoon[index].priceList[index1].disChild=obj1;
                            })
                        }
                        break;   
                    case 'disOld' :
                        obj1=this.platoon[index].priceList[index1].disOld;
                        if(obj1){
                            this.$nextTick(() => {
                                obj1=Validate.checkNum(obj1).slice(0,8);
                                this.platoon[index].priceList[index1].disOld=obj1;
                            })
                        }
                        break;                        
                }
                
            },
            dateClick(data,index){
                this.platoon[0].proLeaveTime = data;
            },
            delhotelLevel(index,index1){//删除酒店级别
                this.platoon[index].hotelArr.splice(index1,1);
                this.addpriceLevel(index);
            },
            addhotelLevel(index){//添加酒店级别
                this.platoon[index].hotelArr.push({hotelInput:'',roomFree:''});
            },
            addflyLevel(index){//添加航班信息
                this.platoon[index].flyArr.push({flyName:'',flyNum:'',start:'',end:''});
            },
            delflyLevel(index,index1){//删除航班信息
                this.platoon[index].flyArr.splice(index1,1);
                this.addpriceLevel(index);
            },
            flagpriceLevel(index){//生成价格体系前校验
                let hotel=this.platoon[index].hotel;
                let vm=this;
                let flag=true;
                if(hotel){
                    this.platoon[index].hotelArr.forEach(function(item,index){
                        if(!item.hotelInput||(!item.roomFree&&vm.roomMoney)){
                            vm.$message.error('酒店级别信息未填写完整');
                            return flag=false
                        }
                    });
                }
                let fly=this.platoon[index].fly
                if(fly&&flag){
                    this.platoon[index].flyArr.forEach(function(item,index){
                        if(!item.flyName||!item.flyNum||!item.start||!item.end){
                            vm.$message.error('航班信息未填写完整');
                            return flag=false
                        }
                    })
                }
                return flag
            },
            newpriceLevel(index){
                let flag=this.flagpriceLevel(index);
                if(flag!=false){
                    this.addpriceLevel(index);
                }
            },
            addpriceLevel(index){//生成价格体系
                let hotel=this.platoon[index].hotel;
                let fly=this.platoon[index].fly;
                let arr=[];
                let hotelCon=this.platoon[index].hotelArr;
                let flyCon=this.platoon[index].flyArr;
                if(hotel&&fly){
                    for(let i=0;i<hotelCon.length;i++){
                        for(let j=0;j<flyCon.length;j++){
                            arr.push({
                                marketAdult:'',
                                marketChild:'',
                                marketStudent:'',
                                marketOld:'',
                                outAdult:'',
                                outStudent:'',
                                outChild:'',
                                outOld:'',
                                disAdult:'',
                                disStudent:'',
                                disChild:'',
                                disOld:'',
                                hotelLevel:hotelCon[i].hotelInput,//酒店级别
                                roomFree:hotelCon[i].roomFree,
                                flyName:flyCon[j].flyName, //航班信息
                                flyNum:flyCon[j].flyNum,
                                start:flyCon[j].start,
                                end:flyCon[j].end
                            })
                        }
                    }
                }
                    if(hotel&&!fly){
                        hotelCon.forEach(function(item,hotelindex){
                            arr.push({marketAdult:'',
                                marketChild:'',
                                marketStudent:'',
                                marketOld:'',
                                outAdult:'',
                                outStudent:'',
                                outChild:'',
                                outOld:'',
                                disAdult:'',
                                disStudent:'',
                                disChild:'',
                                disOld:'',
                            hotelLevel:item.hotelInput,//酒店级别
                            roomFree:item.roomFree,
                            flyName:'', //航班信息
                            flyNum:'',
                            start:'',
                            end:''})
                        })
                    }
                    if(!hotel&&fly){
                        flyCon.forEach(function(item,flyindex){
                            arr.push({marketAdult:'',
                                marketChild:'',
                                marketStudent:'',
                                marketOld:'',
                                outAdult:'',
                                outStudent:'',
                                outChild:'',
                                outOld:'',
                                disAdult:'',
                                disStudent:'',
                                disChild:'',
                                disOld:'',
                            hotelLevel:'',//酒店级别
                            roomFree:'',
                            flyName:item.flyName, //航班信息
                            flyNum:item.flyNum,
                            start:item.start,
                            end:item.end})
                        })
                    }
                    if(!hotel&&!fly){
                            arr.push({marketAdult:'',
                                marketChild:'',
                                marketStudent:'',
                                marketOld:'',
                                outAdult:'',
                                outStudent:'',
                                outChild:'',
                                outOld:'',
                                disAdult:'',
                                disStudent:'',
                                disChild:'',
                                disOld:'',
                            hotelLevel:'',//酒店级别
                            roomFree:'',
                            flyName:'', //航班信息
                            flyNum:'',
                            start:'',
                            end:''})
                    }
                    console.log(arr)
                    this.platoon[index].priceList=arr;
            },
            nextThree(){//下一页
                let proNum=this.SproNum;
                let flag=this.flagData();
                console.log(flag)
                if(flag==true){
                        this.twocom=true;//按钮禁用一会
                        let obj=this.pageData();
                        this.$http.axios({
                            url:this.$api.updateRoutePriceEntity+'?proNum='+proNum,
                             method:'post',
                             data:obj,
                             json:true,
                         }).then(res=>{
                            this.twocom=false;//按钮恢复
                            if(res==1){
                                this.$message.success('修改成功')
                            }
                         }).catch(()=>{
                            this.twocom=false;//按钮恢复
                         })  
                }
                
            },
            fore7(arr,func){
                     for (var i = 0; i < arr.length; i++) {
                         var ret= func.call(this,arr[i],i);//回调函数
                         if(typeof ret !== "undefined"&&(ret==null||ret==false)) break;
                     }
            },
            flagData(){//校验数据
                let vm=this;
                let flag=true;
                this.fore7(this.platoon,function(item,index){
                    let tip='';
                    if(item.dataArr.length==0){
                        this.$message.error(tip+'团期未选择');
                        return flag=false;
                    }
                    //价格体系
                        for(let j=0;j<item.priceList.length;j++){
                        if(item.hotel){//酒店的
                            if(!item.priceList[j].hotelLevel){
                                this.$message.error(tip+'酒店级别为空');
                                return flag=false;
                            }
                            if(vm.roomMoney){
                                if(!item.priceList[j].roomFree){
                                    this.$message.error(tip+'房差金额为空');
                                    return flag=false;
                                }
                            }
                        }
                        if(item.fly){//飞机
                            if(!item.priceList[j].flyName){
                                this.$message.error(tip+'航班公司为空');
                                return flag=false;
                            }
                            if(!item.priceList[j].flyNum){
                                this.$message.error(tip+'航空班次为空');
                                return flag=false;
                            }
                            if(!item.priceList[j].start){
                                this.$message.error(tip+'航班起飞时间为空');
                                return flag=false;
                            }
                            if(!item.priceList[j].end){
                                this.$message.error(tip+'航班到达时间为空');
                                return flag=false;
                            }
                        }
                        if(vm.adult){
                            if(!item.priceList[j].marketAdult||!item.priceList[j].outAdult||!item.priceList[j].disAdult){
                                this.$message.error(tip+'成人价格未填写完整');
                                return flag=false;
                            }
                        }
                        if(vm.student){
                            if(!item.priceList[j].marketStudent||!item.priceList[j].outStudent||!item.priceList[j].disStudent){
                                this.$message.error(tip+'学生价格未填写完整');
                                return flag=false;
                            }
                        }
                        if(vm.child){
                            if(!item.priceList[j].marketChild||!item.priceList[j].outChild||!item.priceList[j].disChild){
                                this.$message.error(tip+'儿童价格未填写完整');
                                return flag=false;
                            }
                        }
                        if(vm.old){
                            if(!item.priceList[j].marketOld||!item.priceList[j].outOld||!item.priceList[j].disOld){
                                this.$message.error(tip+'老人价格未填写完整');
                                return flag=false;
                            }
                        }
                    }
                })
                if(flag==true){
                    return true
                }else{
                    return false
                }
            },
            pageData(){
                // let routePlatoonDateEntityList=[];
                let vm=this;
                let obj={};
                this.platoon.forEach(function(item,index){
                    // obj.proLeaveTime=[];
                    // item.dataArr.forEach(function(item2,index2){
                    //     obj.proLeaveTime.push(item2.day)
                    // })
                    obj.proLeaveTime=item.proLeaveTime.join(',');//团期
                    // 酒店数组
                    if(isRoom&&item.hotel){
                        obj.hotelYes=1;
                        let routeHotelMapList=[];
                        item.hotelArr.forEach(function(item0,index0){
                            let obj0={};
                            obj0.proHotelLevel=item0.hotelInput;
                            if(vm.roomMoney){
                                obj0.onePerPrice=item0.roomFree
                            }
                            routeHotelMapList.push(obj0)
                        })
                        obj.routeHotelMapList=routeHotelMapList;
                    }
                    //飞机数组
                    if(isFly&&item.fly){
                        obj.flightYes=1;
                        let flightMapList=[];
                        item.flyArr.forEach(function(item00,index00){
                            flightMapList.push({
                                flightCom : item00.flyName, //航班公司
                                fightNum :item00.flyNum,//航空班次
                                flightLeaveTime : item00.start, //起飞时间
                                flightArriveTime : item00.end //到达时间
                            })
                        })
                        obj.flightMapList=flightMapList;
                    }
                    let routePlatoonPriceEntityList=[];
                    obj.routePlatoonPriceEntityList=routePlatoonPriceEntityList;
                    item.priceList.forEach(function(item3,index3){
                        let obj2={};
                        if(item.hotel){//酒店的
                            obj2.proHotelLevel=item3.hotelLevel;
                            if(vm.roomMoney){
                                obj.isOnePer=1;
                                obj2.onePerPrice=item3.roomFree;
                            }else{
                                obj.isOnePer=0;
                            }
                        }
                        if(item.fly){
                            obj2.flightCom=item3.flyName;//航班公司
                            obj2.fightNum=item3.flyNum;//航空班次
                            obj2.flightLeaveTime=item3.start;//起飞时间
                            obj2.flightArriveTime=item3.end;//到达时间
                        }
                        if(vm.adult){
                            obj2.proMarketAdultPrice=item3.marketAdult;
                            obj2.proOutAdultPrice=item3.outAdult;
                            obj2.proDistributionAdultPrice=item3.disAdult;
                        }
                        if(vm.student){
                           obj2.proMarketStudentPrice=item3.marketStudent;
                            obj2.proOutStudentPrice=item3.outStudent;
                            obj2.proDistributionStudentPrice=item3.disStudent;
                        }
                        if(vm.child){
                            obj2.proMarketChildPrice=item3.marketChild;
                            obj2.proOutChildPrice=item3.outChild;
                            obj2.proDistributionChildPrice=item3.disChild;
                        }
                        if(vm.old){
                            obj2.proMarketOldPrice=item3.marketOld;
                            obj2.proOutOldPrice=item3.outOld;
                            obj2.proDistributionOldPrice=item3.disOld;
                        }
                        routePlatoonPriceEntityList.push(obj2);
                        
                    })
                    // routePlatoonDateEntityList.push(obj);
                })
                // console.log(routePlatoonDateEntityList) 
                return obj
            },
            // ...mapActions('addPro',[
            //     'twoCommit','changeTab','threeTotal'])
        },
        components:{
            cityPicker,
            calanderPrice

        }
    }
</script>