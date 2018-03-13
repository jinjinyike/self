<template>
    <div id='platoon' class="item">
         <div class="item-bottom">
                <span class="span-title">发团日期</span>
                <calander-price  :obj='dataArr' @getdata='dateClick'  :index-num='0' :canClick='true' ref='calendarPrice'></calander-price>
                 <!-- <el-tag v-for='ceshi in dataArr' :key='ceshi.day'>{{ceshi.day}}</el-tag> -->
            </div>
            <div class="dot"></div>
        <div v-if='gather1'>
            <div class="item-bottom">
                <!-- 集合信息 -->
                <div class="item-bottom">
                    <span class="span-title">集合信息</span>
                    <city-picker field="city" placeholder="选择集合城市"  @change='proGatherCity=arguments[0]' :inputcity='proGatherCity | changeData'  :city-list="cityList" ref='cityPicker' style="margin-bottom:10px;width:19.5%;" ></city-picker>
                    <template >
                                <a href="javascript:;" class="file">导入模板
                                    <input type='file'  @change='changeGather($event)'/>
                                </a>
                                <span class="tip">*请按模板格式上传集合信息(如无模板，请先下载模板)</span>
                                <el-button type="primary" plain size='small' @click="download(item)" style='float:right;margin-right:3%;'>下载模板</el-button>

                            </template>
                    <div class="inline-block" style="vertical-align:top;width:90%;margin-left:65px;">
                        <div v-for="(item2,gatherIndex) in gather"  class="item-bottom">
                        <template >
                        <el-time-select style="width:15%"
                              v-model="item2.proGatherTime"
                              :editable='false'
                              :picker-options="{
                                start: '04:00',
                                step: '00:05',
                                end: '23:55'
                              }"
                              placeholder="选择时间">
                        </el-time-select>
                    <el-input v-model="item2.proGatherPlace" placeholder="请输集合地点" style="width:34%" :maxlength='20'></el-input>
                    <el-checkbox v-model="item2.checked" >接送费</el-checkbox>
                    <div style="display:inline-block" v-if="item2.checked==true">
                        <el-input v-model.trim="item2.proPickUpFee" placeholder="金额" :maxlength='8' v-on:input="checkNum3(gatherIndex)"></el-input>
                        <span class="span-color">元/人</span>
                    </div>
                    <el-button type="primary" plain size='small' @click="delGather(gatherIndex)"  >删除</el-button>
                    <el-button type="primary" plain size='small' @click="addGather()" v-if='gatherIndex===0'>添加</el-button>
                    </template>
                    </div>
                    </div>
                </div>
                <div class="dot"></div> 
            </div>
            
        </div>
        <div v-if='promition'>
            <!-- 促销活动 -->
                <div class="item-bottom">
                    <span class="span-title">促销活动</span>
                    <el-select v-model="sell" placeholder="请选择" style='width:20.3%'>
                    <el-option
                      v-for="sell in options"
                      :key="sell.value"
                      :label="sell.label"
                      :value="sell.value">
                    </el-option>
                    </el-select>
                    <template v-if='sell!=0'>
                        <span class="span-title">适用客群</span>
                        <el-checkbox-group v-model="peoples">
                            <el-checkbox label="0" v-if='adult'>成人</el-checkbox>
                            <el-checkbox label="1" v-if='student'>学生</el-checkbox>
                            <el-checkbox label="2" v-if='child'>儿童</el-checkbox>
                            <el-checkbox label="3" v-if='old'>老人</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </div>
                <!-- 活动方式 -->
                <div v-if='sell!=0' class="item-bottom" style="margin-left:70px;">
                    <div class="inline-block" style="vertical-align:top">
                    <div class="span-color" v-if='sell==1'>
                        <span class="span-title">活动方式</span>
                            <span class="item-left">买</span><el-input v-model='proBuyPeople' v-on:input="checkNum5('proBuyPeople')"></el-input>
                            <span>人免</span><el-input v-model='proSendPeople' v-on:input="checkNum5('proSendPeople')"></el-input><span>人</span>
                            <span class="span-title right-title">价格全部按照</span>
                            <el-radio v-model="people" label="0" v-if='adult'>成人</el-radio>
                            <el-radio v-model="people" label="1" v-if='student'>学生</el-radio>
                            <el-radio v-model="people" label="2" v-if='child'>儿童</el-radio>
                            <el-radio v-model="people" label="3" v-if='old'>老人</el-radio>
                            <span>价格来计算</span>
                    </div>
                    <div class="span-color" v-if='sell==2'>
                        <span class="span-title">活动方式</span>
                        <span>满</span><el-input v-model='proBuyMoney' v-on:input="checkNum5('proBuyMoney')"></el-input>
                        <span>元减</span><el-input v-model='proSendMoney' v-on:input="checkNum5('proSendMoney')"></el-input><span>元</span>
                    </div>
                    <!-- <div class="dot" style="margin:5px;"></div> -->
                    </div>
                </div>
                <div class="dot"></div> 
        </div>
        <div class="button-area">
                <el-button type="primary" plain size='middle'  @click='nextThree'  :disabled='twocom'>提交</el-button>
        </div>
    </div>
</template>
<style scoped>
@import '../../../../assets/pcCss/addProduct.css';
@import '../../../../assets/pcCss/editRouteProduct.css';
</style>
<script >
import cityPicker from '../../public/cityPicker.vue'
import cityList from 'china-city-data'
import {mapState,mapActions} from 'vuex'
import calanderPrice from'../../public/calander_price.vue'
import Validate from '@/common/validate/validate.js'
var isRoom;
var isFly;
    export default{
        data(){
            return{
                adult:false,
                child:false,
                student:false,
                old:false,
                twocom:false,
                cityList,
                dataArr:[],//日历团期集合
                proLeaveTime:[],
                gather:[{    //集合信息
                    proGatherTime:'',
                    proGatherPlace:'',
                    checked:false,
                    proPickUpFee:''
                }],
                isExport:'0',
                proGatherCity:'',//集合出发城市
                delDataArr:[],
                sell:'0',
                proBuyMoney:'',//促销购买金额
                proSendMoney:'',//促销立减金额
                proBuyPeople:'',//促销满减人数
                proSendPeople:'',//促销免单人数
                people:'',//价格计算
                peoples:[],//适用客群
                options:[{value:'0',label:'无促销活动'},{value:'1',label:'购买免单活动'},{value:'2',label:'购买立减活动'}]
            }
        },
        created(){
            // ,'gather1','promition'
        },
        filters: {
            changeData(oldVal) {
                return oldVal;
            }
        },
        mounted(){
            this.getPlatoon();
        },
        computed:{
                ...mapState('editRoutePro',['SproNum','platoon1','gather1','promition','basic']),
        },
        watch:{
                platoon1:{
                    handler(){
                        this.getPlatoon();
                    },
                    deep:true
                },
                promition:{
                    handler(){
                        if(this.promition){
                            this.getPlatoon();
                        }
                    }
                },
                gather1:{
                    handler(){
                        if(this.gather1){
                            this.getPlatoon();
                        }
                    }
                },
                'basic.routeProEntity.priceStructure':function(){
                    let priceArr=this.basic.routeProEntity.priceStructure;
                    this.adult=false;
                    this.student=false;
                    this.child=false;
                    this.old=false;
                    if (priceArr.includes('儿童价格')) {
                        this.child = true;
                    }
                    if (priceArr.includes('学生价格')) {
                        this.student = true;
                    }
                    if (priceArr.includes('老人价格')) {
                        this.old = true;
                    }
                    if (priceArr.includes('成人价格')) {
                        this.adult = true;
                    }
                }
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
                         this.dataArr=dataArr;
                    }
                }).then(()=>{
                    if(this.$refs.calendarPrice){
                        this.$refs.calendarPrice.initData(null);
                    }
                })
            },
            promiseSyn(){
                return new Promise((resolve,reject)=>{
                    resolve()
                })
            },
            checkNum3(index1){//校验接送费为5数字
                let obj=this.gather[index1].proPickUpFee;
                if(obj){
                    this.$nextTick(()=>{
                        obj=Validate.checkNum(obj).slice(0,5);
                        this.gather[index1].proPickUpFee=obj;
                    })
                }
            },
            checkNum5(obj){
                    let obj1;
                switch(obj){
                    case 'proBuyMoney':
                        obj1=this.proBuyMoney;
                        if(obj1){
                            this.$nextTick(()=>{
                               obj1=Validate.checkNum(obj1).slice(0,5);
                                this.proBuyMoney=obj1;
                            })
                        }
                        break;
                    case 'proSendMoney':
                            obj1=this.proSendMoney;
                        if(obj1){
                            this.$nextTick(()=>{
                                obj1=Validate.checkNum(obj1).slice(0,5);
                                this.proSendMoney=obj1;
                            })
                        }
                        break;
                    case 'proBuyPeople':
                        obj1=this.proBuyPeople; 
                        if(obj1){
                            this.$nextTick(()=>{
                                obj1=Validate.checkNum(obj1).slice(0,5);
                                this.proBuyPeople=obj1;
                            })
                        }
                        break;
                    case 'proSendPeople':
                        obj1=this.proSendPeople;
                        if(obj1){
                            this.$nextTick(()=>{
                                obj1=Validate.checkNum(obj1).slice(0,5);
                                this.proSendPeople=obj1;
                            })
                        }
                        break;
                }
            },
            dateClick(data){
                this.proLeaveTime= data;
            },
            changeGather(e){//加入文件对象
                var formData=new FormData();
                formData.append('file', e.target.files[0]); 
                let filt=e.target.files[0].name;
                let type=filt.split('.')[1].toLowerCase();
                if(type=='xls'||type=='xlsx'){
                    this.$http.updaloadExcel({
                        url:this.$api.uploadExcel,
                        method:'post',
                        data:formData,
                    }).then(res=>{
                        let arr=res.data.data;
                        console.log(arr) 
                        arr.forEach(function(item,index){
                            if(item.proPickUpFee){
                                item.checked=true;
                            }else{
                                item.checked=false;
                            }
                        })
                        let arr2 = [];
                        this.gather.forEach(function(item3, index3) {
                            if (
                                item3.proGatherTime ||
                                item3.proGatherPlace ||
                                (item3.checked && item3.proPickUpFee)
                            ) {
                                arr2.push(item3);
                            }
                        });
                        this.gather = [
                            ...arr2,
                            ...arr
                        ];
                    }).catch(err=>{
                        this.$message.error(err);
                    })
                }else{
                    return this.$message.error('导入数据必须是表格文件')
                }
                
            },
            addGather(){//添加集合信息
                this.gather.push({proGatherTime:'',proGatherPlace:'',checked:'',proPickUpFee:''})
            },
            delGather(gatherIndex){//删除集合信息
                if(this.gather.length>1){
                    this.gather.splice(gatherIndex,1);
                }else{
                    this.$message.warning('至少保留一条集合信息')
                }
            },
          download(){//下载模板
            this.$http.axios({
                url:this.$api.downloadPro,
                method:'get',
            })
          },
            nextThree(){//提交
                let proNum=this.SproNum;
                let flag=this.flagData();
                console.log(flag)
                if(flag!=false){
                        this.twocom=true;//按钮禁用一会
                        let obj=this.pageData();
                        let  url
                        if(this.gather1){
                            url=this.$api.updateRouteGatherInfo+'?proNum='+proNum;
                        }else{
                            url=this.$api.updateRoutePromotions+'?proNum='+proNum;
                        }
                        this.$http.axios({
                            url:url,
                             method:'post',
                             data:obj,
                             json:true,
                         }).then(res=>{
                            if(res==1){
                            this.$message.success('修改成功')
                            }
                            this.twocom=false;//按钮恢复
                         }).catch(()=>{
                            this.twocom=false;//按钮恢复
                         })  
                }
                
            },
            flagData(){//校验数据
                    let vm=this;
                    let tip='';
                    if(this.proLeaveTime.length==0){
                        this.$message.error(tip+'团期未选择');
                        return false;
                    }
                    if(this.gather1){
                        if(!this.proGatherCity){
                            // console.log(item.proGatherCity)
                            this.$message.error(tip+'集合城市未选择');
                            return false;
                        } 
                        //集合信息
                        for(let i=0;i<this.gather.length;i++){
                            if(!this.gather[i].proGatherTime){
                                this.$message.error(tip+'集合时间未选择');
                                return false;
                            }
                            if(!this.gather[i].proGatherPlace){
                                this.$message.error(tip+'集合地点未填写');
                               return false;
                            }
                            if(!this.gather[i].proPickUpFee&&this.gather[i].checked){
                                this.$message.error(tip+'接送费未填写');
                                return false;
                            }
                        }
                    }

                    if(this.promition){
                        if(!this.sell){
                            this.$message.error(tip+'促销活动未选择');
                            return false;
                        }
                        if(this.sell=='1'){//免单
                            if(!this.proBuyPeople){
                                this.$message.error(tip+'满减人数未填写');
                                return false;
                            }
                            if(!this.proSendPeople){
                                this.$message.error(tip+'免单人数未填写');
                                return false;
                            }
                            if(this.peoples.length==0){
                                this.$message.error(tip+'适用客群未选择');
                                return false;
                             }
                            if(!this.people){
                                this.$message.error(tip+'计算价格人群未选择');
                                return false;
                            }
                        }
                        if(this.sell==2){//立减
                            if(!this.proBuyMoney){
                                this.$message.error(tip+'满减金额未填写');
                                return false;
                            }
                            if(!this.proSendMoney){
                                this.$message.error(tip+'免单金额未填写');
                                return false;
                            }
                            if(this.peoples.length==0){
                                this.$message.error(tip+'适用客群未选择');
                                return false;
                            }
                        }
                    }
                    
            },
            pageData(){
                let vm=this;
                let obj={};
                obj.proNum=this.SproNum;
                obj.proLeaveTime=this.proLeaveTime.join(',');//团期
                if(this.gather1){
                    obj.proGatherCity=this.proGatherCity;
                    //集合信息
                    let gatherArr=[];
                    this.gather.forEach(function(item1,index1){
                        let obj1={};
                        obj1.proGatherTime=item1.proGatherTime;
                        obj1.proGatherPlace=item1.proGatherPlace;
                        if(item1.checked){
                            obj1.proPickUpFee=item1.proPickUpFee;
                        }
                        gatherArr.push(obj1)
                    })
                    obj.routeGatherMapList=gatherArr;
                }
                
                if(this.promition){
                    obj.promotion=this.sell==0?'0':'1';//产品促销(0无促销 1有促销) 
                        if(this.sell==1){//免单
                            obj.proPromotionType=0;
                            obj.proBuyPeople=this.proBuyPeople;
                            obj.proSendPeople=this.proSendPeople;
                            obj.suit=this.peoples.join(',');//适用客群数组
                            obj.suitPrice=this.people;
                        }
                        if(this.sell==2){//立减
                            obj.proPromotionType=1;
                            obj.proBuyMoney=this.proBuyMoney;
                            obj.proSendMoney=this.proSendMoney;
                            obj.suit=this.peoples.join(',');//适用客群数组
                        }
                }
                console.log(obj)
                return obj
            },
            // ...mapActions('editRoutePro',[
            //     'twoCommit',])
        },
        components:{
            calanderPrice,
            cityPicker
        }
    }
</script>