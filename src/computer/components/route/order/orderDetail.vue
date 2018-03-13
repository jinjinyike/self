 <!-- 备注！！！！，外层dialog宽度大于等于740px 写固定宽度 -->
 <!-- <order-detail :orderId='detailId'></order-detail> -->
 
<template>
    <div class="">
        <div v-if="!err">
            <div class="order-datail" id="pdf">
                <p class="h1">
                    <span class="num">NO.{{orderId}}</span> 订单详情
                </p>
                <table border="1px solid #666;" cellspacing=‘0’>
                    <tr>
                        <td class="title">
                            分销人员
                        </td>
                        <td style="width:33%;border-right:1px solid #666;">
                            {{detailData.disAddNumber}} {{detailData.disAddName}}
                        </td>
                        <td class="title">
                            组团社
                        </td>
                        <td>
                            <!-- {{detailData.zutr}} -->
                        </td>
                    </tr>
                    <tr>
                        <td class="title">
                            添加人员
                        </td>
                        <td style="width:33%;border-right:1px solid #666;">
                            {{detailData.supAddNumber}} {{detailData.supAddName}}
                        </td>
                        <td class="title">
                            联系人
                        </td>
                        <td>
                            {{detailData.linkName}} {{detailData.linkPhone}}
                        </td>
                    </tr>
                    <tr>
                        <td class="title">
                            销售人员
                        </td>
                        <td style="width:33%;border-right:1px solid #666;">
                            {{detailData.supSaleNumber}} {{detailData.supSaleName}}
                        </td>
                        <td class="title">
                            是否上系统
                        </td>
                        <td>
                            <span v-if='detailData.isLine==="0"'>未上系统</span>
                            <span v-if='detailData.isLine==="1"'>已上系统</span>
                            <span v-else-if='detailData.isLine==="2"'>无销售系统</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">
                            参团名称
                        </td>
                        <td colspan="3">
                            {{detailData.proName}}
                        </td>
                    </tr>
                    <tr>
                        <td class="title">
                            发团时间
                        </td>
                        <td style="width:33%;">
                            {{detailData.leaveDate}}
                        </td>
                        <td colspan="2">
                            <span v-if="detailData.cityName">
                                联运城市
                                <span>{{detailData.cityName.split('[')[0]}}</span>
                                <span v-show='detailData.fee'> {{detailData.fee}} 元</span>
                            </span>
                            <!-- <span v-for="(item,index) in detailData.cityTransport" :key="index" style="margin-right:10px;">
                            {{item}}
                        </span> -->
                        </td>
                    </tr>
                    <tr>
                        <td class="title">
                            报名人数
                        </td>
                        <td colspan="3">
                            <span style="margin-right:60px;">共计{{totalNum}}人</span> (其中
                            <span v-if="detailData.adultNum!=0">成人{{detailData.adultNum}}人</span>
                            <span v-if="detailData.childNum!=0">儿童{{detailData.childNum}}人</span>
                            <span v-if="detailData.oldNum!=0">老人{{detailData.oldNum}}人</span> )
                        </td>
                    </tr>
                    <tr v-if="detailData.proHotelLevel != ''">
                        <td class="title">
                            预定酒店
                        </td>
                        <td colspan="3">
                            {{detailData.proHotelLevel}}
                        </td>
                    </tr>
                    <tr v-if="detailData.flightCom != ''">
                        <td class="title">
                            预定航班
                        </td>
                        <td colspan="3">
                            <span>{{detailData.flightCom}} </span>
                            <span> {{detailData.fightNum}} </span>
                            <span style="margin-right:4px;"> {{detailData.flightLeaveTime}}</span> —
                            <span>{{detailData.flightArriveTime}}</span>
                        </td>
                    </tr>
                    <tr v-if="detailData.isHasRoom===1">
                        <td class="title">
                            预留房间
                        </td>
                        <td colspan="3">
                            <span v-show='detailData.doubleBedRoom!=0'>
                                双人标间{{detailData.doubleBedRoom}}间
                            </span>
                            <span v-show='detailData.threeStandardRoom!=0'>
                                三人标间{{detailData.threeStandardRoom}}间
                            </span>
                            <span v-show='detailData.threeFamilyRoom!=0'>
                                三人家庭房{{detailData.threeFamilyRoom}}间
                            </span>
                            <span v-show='detailData.oneBedRoom!=0'>
                                大床房{{detailData.oneBedRoom}}间
                            </span>
                            <span v-show='detailData.fourBedRoom!=0'>
                                四人间{{detailData.fourBedRoom}}间
                            </span>
                            <span v-show='detailData.moreBedRoom!=0'>
                                多人间{{detailData.moreBedRoom}}间
                            </span>
                            <span v-show='detailData.tent!=0'>
                                帐篷{{detailData.tent}}间
                            </span>
                        </td>
                    </tr>
                    <!-- 座位 -->
                    <tr v-if="detailData.carNumSeatBefore !==[]">
                        <td class="title">
                            预留座位
                        </td>
                        <td colspan="3">
                            <p v-for="item in detailData.carNumSeatBefore">
                                <span>
                                    <span>{{item.carNum}}</span>号车
                                    <span v-for="items in item.seatBefore" style="margin-right:10px;">{{items}}</span>
                                </span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">
                            集合信息
                        </td>
                        <!-- <td class="title" style="width:80px;display:inline-block;">
                        {{detailData.gatherData}}
                    </td> -->
                        <td colspan="3">
                            <!-- <span> {{detailData.proGatherTime}} </span>
                        <span> {{detailData.proGatherPlace}} </span>
                        <span v-if="detailData.proPickUpFee"> 接送费：{{detailData.proPickUpFee}} 元/人 </span> -->
                            <!-- <div style="float:left;margin-right:50px;">
                            {{detailData.gatherData}}
                        </div> -->
                            <div style="">
                                <p v-for="(item,key) in detailData.routeGatherEntityList">
                                    <span style="margin-right:15px;">{{item.proGatherTime}}</span>
                                    <span style="margin-right:15px;">{{item.proGatherPlace}}</span>
                                    <span v-if="item.proPickUpFee !== ''">{{item.proPickUpFee}}元/每人</span>
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">
                            订单金额
                        </td>
                        <td colspan="3">
                            <!-- <span style="border-right:1px solid #666;padding-right:50px;margin-right:80px;height:100%;">
                            {{detailData.fee}}元
                        </span>
                        <span style="margin-right:20px;">
                            应收：{{detailData.orderPrice}}元
                        </span> -->
                            <span style="margin-right:20px;">
                                实收：{{detailData.payment}}元
                            </span>
                            <!-- <span style="margin-right:20px;">
                            优惠：{{detailData.orderPrice}}元
                        </span>
                        <span style="margin-right:20px;">
                            欠款：{{detailData.orderPrice}}元
                        </span>
                        <span>
                            附加费：{{detailData.orderPrice}}元
                        </span> -->
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" style="text-align:center;">
                            联系人信息
                        </td>
                    </tr>
                    <tr>
                        <td class="title">
                            联系人
                        </td>
                        <td style="width:33%;border-right:1px solid #666;">
                            {{detailData.linkName}}
                        </td>
                        <td class="title">
                            联系电话
                        </td>
                        <td>
                            {{detailData.linkPhone}}
                        </td>
                    </tr>
                    <tr v-if="detailData.orderVisitor!=0">
                        <td colspan="4" style="text-align:center;">出行人信息</td>
                    </tr>
                    <tr v-if="detailData.orderVisitor!=0">
                        <td colspan='4' style="padding-left:0;">
                            <p class="order-vistor" v-for="(item,key) in detailData.orderVisitor" :key="key">
                                <span style="margin-left:10px;">{{item.visitorName}} </span>
                                <span> {{item.visitorCertificateNum}}</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="title" style="width:140px;">组团社/客人备注</td>
                        <td colspan="3">
                            <!-- {{detailData.remark}} -->
                        </td>
                    </tr>
                    <tr>
                        <td class="title" style="width:140px;">订单备注</td>
                        <td colspan="3">
                            {{detailData.remarks}}
                        </td>
                    </tr>
                    <tr>
                        <td class="title" style="width:140px;">导游/领队备注</td>
                        <td colspan="3">
                            {{detailData.guideRemarks}}
                        </td>
                    </tr>
                </table>
            </div>
            <el-button type="primary" @click='print' style="margin:20px auto 0;display:block;">打印</el-button>
        </div>
        <p style="text-align:center;" v-else>
            系统异常
        </p>
    </div>
</template>

<script>
export default {
	name: 'component_name',
	props: {
		// detailData: {
		// 	type: Object,
		// 	default: {}
		// }
		orderId: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			detailData: {},
			err: false
		};
	},
	computed: {
		totalNum() {
			let oldNum = 0;
			let adultNUm = parseInt(this.detailData.adultNum);
			let childNum = parseInt(this.detailData.childNum);
			if (this.detailData.oldNum && this.detailData.oldNum !== '') {
				oldNum = parseInt(this.detailData.oldNum);
			}
			return adultNUm + childNum + oldNum;
		}
	},
	methods: {
		loadData() {
			this.$http
				.axios({
					url: this.$api.getOrderRouteDetail,
					method: 'get',
					params: {
						orderId: this.orderId
					}, // get方式传值
					json: false,
					error: true
				})
				.then(res => {
					this.err = false;
					this.detailData = res;
				})
				.catch(err => {
					this.err = true;
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
			style.href = '/static/css/pdf1.css';
			style.rel = 'stylesheet';
			style.type = 'text/css';

			head.appendChild(style);
			console.log(window);
			setTimeout(() => {
				window.print(); //打印当前窗口
				this.$router.push({ path: '/index/orderSearch' });
				location.reload();
				console.log(this.$router);
			}, 500);

			return true;
		}
	},
	mounted() {
		this.loadData();
	},
	watch: {
		orderId: {
			handler(newVal, oldVal) {
				if (!newVal) {
					this.detailData = {};
					return;
				}
				this.loadData();
			},
			deep: true
		}
	}
};
</script>

<style lang="scss" scoped>
.order-datail {
	padding: 20px 0 0; // position: absolute;

	// box-shadow: 1px 1px 5px 1px #eee;
	// border: 1px solid #666; // width: 60%;
	.h1 {
		font-weight: normal;
		font-size: 20px;
		text-align: center;
		position: relative;
		.num {
			position: absolute;
			left: 20px;
			bottom: 0;
			font-size: 14px;
		}
	}
	table {
		margin-top: 20px;
		width: 100%;
		.order-vistor {
			height: 40px;
			line-height: 40px;
			display: inline-block;
			width: 50%;
			border-right: 1px solid #666;
			border-bottom: 1px solid #666;
			margin-bottom: -1px;
			margin-right: -1px;
		}
		.title {
			width: 17%; // width: 80px;
			vertical-align: center;
			padding-left: 10px;
		}
		tr {
			border: 1px solid #666;
			border-right: none;
			border-left: none;
			width: 100%;
			line-height: 32px;
			height: 40px;
			&:last-child {
				border-bottom: none;
			}
		}
		td:not(.title) {
			// display: inline-block;
			padding-left: 10px; // width: calc(100% - 80px)
		}
	}
}
</style>