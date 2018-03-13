<template>
    <div class="main">
        <el-dialog title="" :visible.sync="showTabs" width='688px'>
            <div id="pdf">
                <header class="flex is-justify-center is-align-center">
                    <span>{{proNum}}</span>
                    <h1>
                        {{proName}}
                    </h1>
                </header>
                <table border='1' cellpadding='0' cellspacing='0' align='center' style="width:650px;">
                    <tr class="title">
                        <td width='80' align='center'>产品名称</td>
                        <td>{{proName}}</td>
                    </tr>
                    <tr class="title">
                        <td width='80' align='center'>发团日期</td>
                        <td>{{groupData.join(' / ')}}</td>
                    </tr>
                    <tr class="title">
                        <td width='80' align='center'>产品价格</td>
                        <td>
                            <span v-if="adultPrice !== ''">成人</span>
                            <span v-if="adultPrice !== ''">{{adultPrice}} 元 </span>
                            <span v-if="childPrice !== ''">儿童</span>
                            <span v-if="childPrice !== ''">{{childPrice}} 元 </span>
                            <span v-if="studentPrice !== ''">学生</span>
                            <span v-if="studentPrice !== ''">{{studentPrice}} 元 </span>
                            <span v-if="oldPrice !== ''">老人</span>
                            <span v-if="oldPrice !== ''">{{oldPrice}} 元 </span>
                        </td>
                    </tr>
                    <tr class="title" v-if="promotion === '1'">
                        <td width='80' align='center'>促销活动</td>
                        <td v-if="proPromotionType === '0'">买 {{proBuyPeople}} 人免 {{proSendPeople}} 人</td>
                        <td v-else>买 {{proBuyMoney}} 元减 {{proSendMoney}} 元</td>
                    </tr>
                    <tr class="title">
                        <td width='80' align='center'>产品特色</td>
                        <td>{{proFeature}}</td>
                    </tr>
                    <tr v-for="(item,index) in distance" :key="index">
                        <td width='80' align='center'>第{{index+1}}天</td>
                        <td>
                            <div v-html="item.detailPlan"></div>
                            <div>
                                <span style="margin-right:15px;display:inline-block;">景点/目的地</span>
                                <span>{{item.termini}}</span>
                            </div>
                            <div>
                                <span v-if="item.hotelLevel!==''">住宿：</span>
                                <span class="margin-right" v-if="item.hotelLevel!==''">{{item.hotelLevel}}</span>
                                <span>交通：</span>
                                <span class="margin-right">{{item.travel}}</span>
                                <span v-if="item.food[0] !== ''">餐饮：</span>
                                <span>{{item.food.join(' / ')}}</span>
                            </div>
                            <div class="flex">
                                <span style="display:block;width:;">行程特色：</span>
                                <span>{{item.travelFeature}}</span>
                            </div>
                        </td>

                    </tr>
                    <tr class="">
                        <td width='80' align='center'>费用说明</td>
                        <td>{{fees}}</td>
                    </tr>
                    <tr class="">
                        <td width='80' align='center'>预定须知</td>
                        <td>{{scheduleRemain}}</td>
                    </tr>
                    <!-- <tr class="">
                        <td width='80' align='center'>预定流程</td>
                        <td>{{scheduleFlow}}</td>
                    </tr> -->
                    <tr class="">
                        <td width='80' align='center'>集合信息</td>
                        <td>
                            <p v-for="item in gatherData">
                                <span>
                                    {{item.info}}
                                </span>
                                <span style="margin-left:20px;">
                                    接送费 {{item.fee}}元/人
                                </span>
                            </p>
                        </td>
                    </tr>
                </table>
                <p style="color:red;">备注：此行程仅供参考，最终以出团通知单或者实际行程为准</p>
            </div>
            <el-button type="primary" @click='print' style="margin:20px auto 0;display:block;">打印</el-button>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showTabs: true,
            proName: '泰国曼谷芭提雅双飞五晚七日游',
            proNum: '101123455432',
            groupData: ['07.08', '07.10', '08.23', '08.30', '09.10', '09.23'],
            adultPrice: '123',
            childPrice: '213',
            studentPrice: '123',
            oldPrice: '',
            proFeature: '',
            distance: [
                // {
                // 	detailPlan:
                // 		'泰国豪华畅游双飞五晚七日游泰国豪华畅游双飞五晚七日游泰国豪华畅游双飞五晚七日游泰国豪华畅游双飞五晚七日游泰国豪华畅游双飞五晚七日游',
                // 	termini: ['天津', '菲律宾'],
                // 	hotelLevel: '五星级酒店',
                // 	travel: '飞机',
                // 	food: ['早餐', '中餐', '晚餐'],
                // 	travelFeature:
                // 		'泰国豪华畅游双飞五晚七日游泰国豪华畅游双飞五晚七日游泰国豪华畅游双飞五晚七日游泰国豪华畅游双飞五晚七日游泰国豪华畅游双飞五晚七日游'
                // }
            ],
            fees: '',
            scheduleRemain: '',
            scheduleFlow: '',
            gatherData: [
                // {
                // 	info: '06:00 天津滨海国际机场T2航站楼总服务台门口旁',
                // 	fee: '20'
                // }
            ],
            proBuyMoney: '',
            proBuyPeople: '',
            proSendMoney: '',
            proSendPeople: '',
            promotion: '',
            proPromotionType: ''
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.$http
                .axios({
                    url: '/orderRoute/getPrintRouteInto',
                    method: 'get',
                    params: {
                        orderId: '100531422219'
                    }
                })
                .then(res => {
                    this.proName = res.proName;
                    this.groupData = res.leaveDate.split(',');
                    this.adultPrice = res.proOutAdultPrice;
                    this.childPrice = res.proOutChildPrice;
                    this.studentPrice = res.proOutStudentPrice;
                    this.oldPrice = res.proOutOldPrice;

                    this.proFeature = res.proFeatures;
                    this.fees = res.proCostDescription;
                    this.scheduleRemain = res.proOrderNotice;

                    this.proBuyMoney = res.proBuyMoney;
                    this.proBuyPeople = res.proBuyPeople;
                    this.proSendMoney = res.proSendMoney;
                    this.proSendPeople = res.proSendPeople;

                    this.promotion = res.promotion;
                    this.proPromotionType = res.proPromotionType;

                    for (let i = 0; i < res.routePlanEntityList.length; i++) {
                        this.distance.push({
                            detailPlan: res.routePlanEntityList[i].detailRoute,
                            termini: res.routePlanEntityList[i].attraction,
                            hotelLevel: res.routePlanEntityList[i].proHotelName,
                            travel: res.routePlanEntityList[i].proTraffic,
                            food: res.routePlanEntityList[i].proEat.split(','),
                            travelFeature:
                                res.routePlanEntityList[i].routeFeature
                        });
                    }

                    for (let j = 0; j < res.routeGatherEntityList.length; j++) {
                        this.gatherData.push({
                            info: `${
                                res.routeGatherEntityList[j].proGatherTime
                            }   ${res.routeGatherEntityList[j].proGatherPlace}`,
                            fee: res.routeGatherEntityList[j].proPickUpFee
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        print() {
            this.createPdf('pdf');
        },
        createPdf(printpage) {
            // let newWindow = window.open(); //打开新窗口
            let codestr = document.getElementById(printpage).innerHTML; //获取需要生成pdf页面的div代码

            window.document.write(codestr); //向文档写入HTML表达式或者JavaScript代码

            window.document.close(); //关闭document的输出流, 显示选定的数据
            let head = document.getElementsByTagName('head')[0];
            var style = document.createElement('link');
            style.href = '/static/css/pdf.css';
            style.rel = 'stylesheet';
            style.type = 'text/css';

            head.appendChild(style);
            console.log(window);
            setTimeout(() => {
                window.print(); //打印当前窗口
                this.$router.push({ path: '/index/orderReview' });
                location.reload();
                console.log(this.$router);
            }, 500);

            return true;
        }
    }
};
</script>
<style lang="scss" scoped media='print'>
.flex {
    display: flex;
}
.is-justify-center {
    justify-content: center;
}
.is-justify-space-between {
    justify-content: space-between;
}

.is-align-center {
    align-items: center;
}
.margin-right {
    margin-right: 20px;
}
.main {
    width: 688px;
    #pdf {
        header {
            font-size: 14px;
            span {
                position: absolute;
                left: 20px;
            }
            margin-bottom: 10px;
        }
        table {
            border: 1px solid #797979;

            tr {
                padding: 10px;
                vertical-align: middle;
                td {
                    padding: 10px;
                }
                td:nth-child(1) {
                    width: 80px;
                    text-align: center;
                }
                &:not(.title) {
                    border: 1px solid #797979;
                    td:nth-child(1) {
                        border-right: 1px solid #797979;
                    }
                    td:nth-child(2) {
                        div {
                            &:nth-child(1) {
                                border-bottom: 1px dashed #797979;
                                padding-bottom: 10px;
                            }
                            margin-top: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>
