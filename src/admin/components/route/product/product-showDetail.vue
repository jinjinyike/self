<template>
	<div class="show-detail right-content-index">
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="基本信息" name="first">
				<div class="tab1">
					<div class="plate1">
						<div class="left">
							<span>产品名称</span>
							<i>{{page1.proName}}</i>
						</div>
						<div class="right">
							<span>内部编号</span>
							<i>{{page1.innerNum}}</i>
						</div>
					</div>
					<div class="plate2">
						<div class="left">
							<span>产品类型</span>
							<i>{{page1.proType[0]}} —— {{page1.proType[1]}}</i>
						</div>
						<div class="right">
							<span>主要交通类型</span>
							<i>{{page1.trafic}}</i>
						</div>
					</div>
					<div class="plate3 clearfix">
						<span style="margin-right:24px;">产品简介</span>
						<p>{{page1.intro}}</p>
					</div>
					<div class="plate4">
						<span>客源城市</span>
						<i v-for="(item,index) in page1.SourceCity" :key="index" style="margin-right:20px;">{{item}}</i>
					</div>
					<div class="plate5 clearfix" v-if="page1.hasService">
						<span>联运服务</span>
						<div class="service">
							<p v-for="item in page1.service" v-if="item.city!==''">
								<span style="margin-right:10px">{{item.city}}</span>
								<i>{{item.price}}</i> 元/每人
							</p>
						</div>
						<!-- <div class="none" v-else>
							不提供联运服务
						</div> -->
					</div>
					<div class="plate6 clearfix">
						<span>出发城市</span>
						<i>{{page1.startCity}}</i>
					</div>
					<div class="plate7 clearfix">
						<span>目的地</span>
						<i v-for="item in page1.destination" style="margin-right:20px;">{{item}}</i>
					</div>
					<div class="plate8 clearfix" v-for="(item,index) in page1.priceSystem" v-if="index<1">
						<span>价格体系</span>
						<i style="margin-right:20px;">{{item}}</i>
						<div style="margin-left:80px;">
							<p v-if="item === '儿童价格'">
								<span>儿童标准</span>
								<i>{{page1.childStandard}}</i>
							</p>
							<p v-if="item === '学生价格'">
								<span>学生标准</span>
								<i>{{page1.studentStandard}}</i>
							</p>
							<p v-if="item === '老年价格'">
								<span>老年标准</span>
								<i>{{page1.oldStandard}}</i>
							</p>
						</div>
					</div>
					<div class="plate9 clearfix">
						<span>住宿房型</span>
						<i v-if="page1.stayShow">不包含住宿</i>
						<p v-else>包含住宿
							<span style="margin-left:20px;">可选房型</span>
							<i v-for="item in page1.stayType" style="margin-right:10px;">{{item}}</i>
						</p>
					</div>

					<div class="plate11 clearfix" v-if="page1.proType[0] === '周边游'">
						<div class="plate11-left">
							<span>排座位号</span>
							<i>{{page1.proSeat}}</i>
						</div>
						<div class="plate11-right" v-if="page1.proSeat==='需要'">
							<span>选择第一辆车车型</span>
							<i>{{page1.proSeatCarType}}</i>
						</div>
						<div class="plate11-right" v-if="page1.proSeat==='需要'">
							<span>客人选座</span>
							<i>{{page1.proSeatOpen}}</i>
						</div>

					</div>
					<div class="plate12 clearfix" v-if="page1.isRoomFree==='有差价'">
						<div class="plate12-left">
							<span>单房差价</span>
							<i>{{page1.isRoomFree}}</i>
						</div>
						<!-- <div class="plate12-right">
                            <span>房差金额</span>
                            <i>200 元/人/晚</i>
                        </div> -->
					</div>
					<div class="plate13 clearfix">
						<div class="plate13-left">
							<span>审核员工</span>
							<!-- <i>不审核</i> -->
							<i>{{page1.proAuditEmployee}}</i>
						</div>
						<div class="plate13-right">
							<span>订单短信提醒</span>
							<!-- <i>不设提醒</i> -->
							<i>{{page1.proOrderInfo}}</i>
						</div>
					</div>
					<div class="plate14 clearfix">
						<div class="plate14-left">
							<span>上线设置</span>
							<i>{{page1.proStoredSetting}}</i>
						</div>
						<div class="plate14-right" v-if="page1.proStoredSetting==='预约时间上线'">
							<span style="margin-right:10px;">上线日期</span>
							<i style="margin-right:30px;">{{page1.proStoredTime}}</i>
							<!-- <span style="margin-right:10px;">上线时间</span> -->
							<!-- <i>{{page1.proStoredTime[1]}}</i> -->
						</div>
					</div>

				</div>
			</el-tab-pane>
			<el-tab-pane label="团期/价格" name="second">
				<div class="tab2">
					<div class="calandar item-bottom" >
							<span class="span-title">发团日期</span>
							<calandar-price :can-click='true' @getdata='dateClick' :index-num='0' :obj='page2.proLeaveTime' :isSingle='true' ref='calendar' v-if='page2.calandar'></calandar-price>
						</div>
					<div class="wrapper" v-if='page2.platoon' style="margin-top:20px">
						<div class="stayAndprice" v-for="items in page2.routePlatoonPriceEntityList">
							<div class="stay" v-if="page2.routeCon.hotelYes==1&&items.proHotelLevel">
								<span class="span-title">住宿级别</span>
								<span style="margin-left:-4px;">{{items.proHotelLevel}}</span>
									<span style="margin:0 10px" v-if='items.onePerPrice'><span style="margin-right:10px">房差金额</span>{{items.onePerPrice}}元/每天</span>
							</div>
							<div class="plane" v-if='page2.routeCon.flightYes==1'>
								<span class="span-title">航班信息</span>
								<span>{{items.flightCom}}</span>
								<span>{{items.fightNum}}</span>
								<span>{{items.flightLeaveTime}}</span>——
								<span>{{items.flightArriveTime}}</span>
							</div>
							<div class="price">
								<span class="span-title">产品价格</span>
								<table>
									<tr>
										<th></th>
										<th v-if="items.proMarketAdultPrice !== ''">成人价格</th>
										<th v-if="items.proMarketChildPrice !== ''">儿童价格</th>
										<th v-if="items.proMarketStudentPrice !== ''">学生价格</th>
										<th v-if="items.proMarketOldPrice !== ''">老年价格</th>
									</tr>
									<tr>
										<td>市场价格</td>
										<td v-if="items.proMarketAdultPrice !== ''">{{items.proMarketAdultPrice}}</td>
										<td v-if="items.proMarketChildPrice !== ''">{{items.proMarketChildPrice}}</td>
										<td v-if="items.proMarketStudentPrice !== ''">{{items.proMarketStudentPrice}}</td>
										<td v-if="items.proMarketOldPrice !== ''">{{items.proMarketOldPrice}}</td>
									</tr>
									<tr>
										<td>外卖价格</td>
										<td v-if="items.proOutAdultPrice !== ''">{{items.proOutAdultPrice}}</td>
										<td v-if="items.proOutChildPrice !== ''">{{items.proOutChildPrice}}</td>
										<td v-if="items.proOutStudentPrice !== ''">{{items.proOutStudentPrice}}</td>
										<td v-if="items.proOutOldPrice !== ''">{{items.proOutOldPrice}}</td>
									</tr>
									<tr>
										<td>分销价格</td>
										<td v-if="items.proDistributionAdultPrice !== ''">{{items.proDistributionAdultPrice}}</td>
										<td v-if="items.proDistributionChildPrice !== ''">{{items.proDistributionChildPrice}}</td>
										<td v-if="items.proDistributionStudentPrice !== ''">{{items.proDistributionStudentPrice}}</td>
										<td v-if="items.proDistributionOldPrice !== ''">{{items.proDistributionOldPrice}}</td>
									</tr>
								</table>
							</div>
						</div>
						<div class="surplus">
							<span class="span-title">余位设定</span>
							<i style="margin-left:-4px;" v-text='page2.routeCon.proRest?page2.routeCon.proRest:"不限"'></i>
						</div>
						<div class="promotions">
							<span class="span-title">
								产品促销
							</span>
							<div v-if="page2.routeCon.promotion==1">
								<div style="margin-bottom:10px;">有促销活动</div>
								<div class="promotions-info">
									<div class="flex" style="margin-bottom:10px;">
										<div style="width:200px">
											<span>活动类型</span>
											<span v-text='page2.routeCon.proPromotionType==0?"购买免单":"购买立减"'>{{}}</span>
										</div>
										<div>
											<span>适用客群</span>
											<span>{{page2.routeCon.suit}}</span>
										</div>

									</div>
									<div class="flex" >
										<div style="width:200px">
											<span>活动方案</span>
											<span v-if="page2.routeCon.proPromotionType==1">买 {{page2.routeCon.proBuyMoney}} 元免 {{page2.routeCon.proSendMoney}} 元</span>
											<span v-if="page2.routeCon.proPromotionType==0">买 {{page2.routeCon.proBuyPeople}}人免 {{page2.routeCon.proSendPeople}} 人</span>

										</div>
										<div>
											<span>价格全部按照 {{page2.routeCon.suitPrice}} 价格来计算</span>
										</div>

									</div>
								</div>
							</div>

							<div v-else>
								<i>无</i>
							</div>
						</div>
						<div class="plate10 clearfix">
							<span class="span-title">集合信息</span>
							<div class="info">
								<div class="info-top" style="margin-bottom:10px;">
									<span>集合城市</span>
									<i>{{page2.proGatherCity}}</i>
								</div>
								<div class="info-bottom clearfix">
									<span style="margin-right:30px;">集合时间地点</span>
									<div class="info-bottom_1">
										<p v-for="set in page2.routeGatherMapList" style="">
											<span>{{set.proGatherTime}} — {{set.proGatherPlace}}</span>
											<span v-if="set.proPickUpFee" style='margin-left:10px'>接送费:{{set.proPickUpFee}}元/每人</span>
										</p>

									</div>
								</div>
							</div>
						</div>

					</div>
				</div>

			</el-tab-pane>
			<el-tab-pane label="行程安排" name="third">
				<div class="tab3">
					<div class="wrapper" v-for="(item,index) in page3" :key="index">
						<div class="title">
							<span class="span-title">第{{index+1}}天</span>
							<div>
								<span>{{item.attraction[0]}}</span>
								<i v-if="item.attraction.length ===2">——</i>
								<span>{{item.attraction[1]}}</span>
							</div>
						</div>
						<div class="travel-1 flex">
							<span class="span-title">
								行程特色
							</span>
							<div>
								{{item.routeFeature}}
							</div>
						</div>
						<div class="travel-2 flex">
							<span class="span-title">
								详细行程
							</span>
							<div v-html="item.detailRoute" id="img_wrapper000000">
							</div>
						</div>
						<div class="trafic flex">
							<span class="span-title">交通形式</span>
							<i>{{item.proTraffic}}</i>
						</div>
						<div class="eat flex" v-if="item.proEat!==''">
							<span class="span-title">旅行用餐</span>
							<i style="margin-right:30px;">包含用餐</i>
							<i style="margin-right:20px;" v-for="items in item.proEat">{{items}}</i>
						</div>
						<div class="set flex" v-if="item.proHotel ==='1'">
							<span class="span-title">酒店住宿</span>
							<i style="margin-right:30px;">包含住宿</i>
							<i style="">{{item.proHotelName}}</i>
						</div>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="产品说明" name="fourth">
				<div class="tab4">
					<div class="flex">
						<span class="span-title">产品特色</span>
						<div>
							{{page4.proFeatures}}
						</div>
					</div>
					<div class="flex">
						<span class="span-title">费用说明</span>
						<div>
							{{page4.proCostDescription}}
						</div>
					</div>
					<div class="flex">
						<span class="span-title">预定须知</span>
						<div>
							{{page4.proOrderNotice}}
						</div>
					</div>
					<div class="flex" v-if="page4.proVisaNotice !==''">
						<span class="span-title">签证须知</span>
						<div>
							{{page4.proVisaNotice}}
						</div>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="产品图片" name="five">
				<div class="tab5">
					<div class="">
						<span class="span-title" style="margin-bottom:30px">产品封面图</span>
						<div>
							<img :src="page5.proPublicityPic" alt="" width="200" height='150' style="margin-right:15px;" v-bigImg='showImg'>
						</div>
					</div>
					<div class="">
						<span class="span-title" style="margin-bottom:30px">产品轮播图</span>
						<div>
							<img :src="item" alt="" v-for="item in page5.proRotationPic" width="200" height='150' style="margin-right:15px;" v-bigImg='showImg'>
						</div>
					</div>
					<div class="">
						<span class="span-title" style="margin-bottom:30px">产品海报图</span>
						<div>
							<img :src="page5.proPosterPic" alt="" width="200" height='150' style="margin-right:15px;" v-bigImg='showImg'>
						</div>
					</div>
					<img :src="bigImg" alt="" class="bigImg" ref="bigImg" style="top:0;left:0;" v-bigImg='showImg'>

				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import calandar from '../../public/calander.vue';
import calandarPrice from '../../public/calander_price.vue';
export default {
	name: '',
	data() {
		return {
			bigImg: '',
			activeName: 'first',
			page1: {
				// 产品名称
				proName: '',
				// 内部编号
				innerNum: '',
				// 产品类型
				proType: [],
				// 主要交通类型
				trafic: '',
				// 产品简介
				intro: '',
				// 客源城市
				SourceCity: [],
				// 是否有联运服务
				hasService: true,
				// 联运服务
				service: [
					
				],
				// 出发城市
				startCity: '',
				// 目的地
				destination: [],
				// 价格体系
				priceSystem: [],
				// 是否显示住宿房型
				stayShow: true,
				// 可选房型
				stayType: [],
				// 集合城市
				setCity: '',
				// setTimeAndPlace: [
				// 	{
				// 		time: '06:00',
				// 		place: '天津滨海国际机场T2航站楼',
				// 		price: '20'
				// 	},
				// 	{
				// 		time: '06:00',
				// 		place: '天津滨海国际机场T2航站楼'
				// 	}
				// ]
				// 座位安排
				proSeat: '',
				// 第一辆车类型
				proSeatCarType: '',
				// 是否支持客人选座
				proSeatOpen: '',
				// 单房差价
				isRoomFree: '',
				// 审核员工
				proAuditEmployee: '',
				// 订单短信提醒
				proOrderInfo: '',
				// 上线时间设置
				proStoredSetting: '',
				// 上线时间
				proStoredTime: '',
				// 儿童标准
				childStandard: '',
				// 学生标准
				studentStandard: '',
				// 老人标准
				oldStandard: ''
			},
			page2: {
					proLeaveTime:[],
					calandar: false,
					proLeaveTime: [],
					platoon:false,
					routePlatoonPriceEntityList:[],
					routeCon:{},
					routeGatherEntityList:[]
			},
			page3: [
				{
					attraction: '',
					detailRoute: '',
					proEat: '',
					proHotel: '',
					proHotelName: '',
					proTraffic: '',
					routeFeature: ''
				}
			],
			page4: {
				// 产品特色
				proFeatures: '',
				// 费用说明
				proCostDescription: '',
				// 预定须知
				proOrderNotice: '',
				// 签证须知
				proVisaNotice: ''
			},
			page5: {
				// 封面图
				proPublicityPic: '',
				// 轮播图
				proRotationPic: '',
				// 海报图
				proPosterPic: ''
			}
		};
	},
	created() {
		this.$http
			.axios({
				url: this.$api.getProductDetail,
				method: 'GET',
				params: {
					proNum: this.$route.query.proNum
				}
			})
			.then(res => {
				console.log(res);
				let data = res;
				/*********** 处理第一页的数据 ***********/
				let data1 = data.routeProEntity; // 第一页的基本信息
				let data1_traffic = data.routeUnionTransportEntityList; //联运服务的信息，没有为空
				let page1 = this.page1; // 缓存第一页数据

				// 联运服务的相关信息
				page1.service=[];
				for (let i = 0; i < data1_traffic.length; i++) {
					page1.service.push({
						city: data1_traffic[i].cityName.split('[')[0],
						price:data1_traffic[i].fee
					})
				}

				page1.proName = data1.proName; //产品名称
				page1.innerNum = data1.proSelfNum; // 内部编号
				page1.proType = data1.proType.split(','); //产品类型
				page1.trafic = data1.mainTraffic; //交通类型
				page1.intro = data1.proIntro; // 产品简介

				page1.childStandard = data1.childStandard;
				page1.studentStandard = data1.studentStandard;
				page1.oldStandard = data1.oldStandard;

				// 客源城市
				if (data1.passengerCity === '不限') {
					page1.SourceCity = data1.passengerCity;
				} else {
					let att = data1.passengerCity.split(',');

					for (let a = 0; a < att.length; a++) {
						att[a] = att[a].split('[')[0];
					}
					page1.SourceCity = att;
				}

				page1.hasService = data1.isTransport === '0' ? false : true;
				page1.startCity = data1.proStartCity.split('[')[0]; // 出发城市
				page1.destination = data1.proDestination.split(','); // 目的地
				page1.priceSystem = data1.priceStructure.split(','); // 价格体系
				page1.stayShow = data1.isContainHotel === '0' ? true : false; // 是否显示住宿房型 true为不包含
				page1.stayType = data1.proHotelType.split(','); // 可选房型

				page1.proSeat = data1.proSeat === '0' ? '不需要' : '需要';
				page1.proSeatCarType = data1.proSeatCarType;
				page1.proSeatOpen = data1.proSeatOpen === '1' ? '支持' : '不支持';
				page1.isRoomFree = data1.isRoomFree === '1' ? '有差价' : '无差价';
				page1.proAuditEmployee = data1.proAuditEmployee === '0' ? '无员工审核' : '';
				page1.proOrderInfo = data1.proOrderInfo === '0' ? '无员工提醒' : '';
				page1.proStoredSetting =
					data1.proStoredSetting === '0' ? '审核通过后立即上线' : '预约时间上线';
					page1.proStoredTime=data1.proStoredTime;

				/********** 处理第二页数据 ***********/
				let data2 = data.routePlatoonDateEntityList; // 第二页的基本数据
				// 出发日期转换成数组
					let proLeaveTime = data.proLeaveTime.split(',');
					this.page2.proLeaveTime = [];
					for (let j = 0; j < proLeaveTime.length; j++) {
						this.page2.proLeaveTime.push({ day: proLeaveTime[j], price: '1' });
					}
					this.page2.calandar = true;
				
				/********** 处理第三页数据 ***********/
				let data3 = data.routePlanEntityList;
				let page3 = this.page3;
				// this.$set(this, 'page3', data3);
				console.log(data3, page3);
				page3.splice(0, 1);

				for (let p = 0; p < data3.length; p++) {
					let nowData0 = data3[p];
					page3.push({
						attraction: nowData0.attraction.split(','),
						detailRoute: nowData0.detailRoute,
						proEat: nowData0.proEat === '' ? '' : nowData0.proEat.split(','),
						proHotel: nowData0.proHotel,
						proHotelName: nowData0.proHotelName,
						proTraffic: nowData0.proTraffic,
						routeFeature: nowData0.routeFeature
					});

					// nowPage0.attraction = nowData0.attraction.split(',');
					// nowPage0.proEat =
					// 	nowData0.proEat === '' ? '' : nowData0.proEat.split(',');
				}

				/********** 处理第四页数据 ***********/
				let page4 = this.page4;
				page4.proFeatures = data1.proFeatures;
				page4.proCostDescription = data1.proCostDescription;
				page4.proOrderNotice = data1.proOrderNotice;
				page4.proVisaNotice = data1.proVisaNotice;

				/********** 处理第五页数据 ***********/
				let page5 = this.page5;
				page5.proPublicityPic = data1.proPublicityPic;
				page5.proRotationPic = data1.proRotationPic.split(',');
				page5.proPosterPic = data1.proPosterPic;
			});
	},
	components: {
		calandar,
		calandarPrice
	},
	methods: {
		dateClick(data, index) {
			console.log(data)
			let obj={
				proLeaveTime:data,
				proNum:this.$route.query.proNum
			}
			this.$http.axios({
				url:this.$api.getRouteProductByDate,
				method:'get',
				params:obj
			}).then(res=>{
				this.page2.platoon=true;
				this.page2.routeGatherMapList=res.routeGatherEntityList;
				this.page2.routeCon=res.routeCon;
				this.page2.routePlatoonPriceEntityList=res.routePriceEntityList;
				this.page2.proGatherCity = res.routeCity.split('[')[0];
				if(this.page2.routeCon.promotion){
					switch (this.page2.routeCon.suitPrice) {
								case '0':
									this.page2.routeCon.suitPrice = '成人';
									break;
								case '1':
									this.page2.routeCon.suitPrice = '学生';
									break;
								case '2':
									this.page2.routeCon.suitPrice = '儿童';
									break;
								case '3':
									this.page2.routeCon.suitPrice = '老人';
									break;
					}
					let suit=res.routeCon.suit.split(',');
					suit.forEach(function(item,index){
						if(item==0){
							suit[index]='成人';
						}
						if(item==1){
							suit[index]='学生'
						}
						if(item==2){
							suit[index]='儿童';
						}
						if(item==3){
							suit[index]='老人'
						}
					})
					this.page2.routeCon.suit=suit.join(',')
				}
			})
		},
		showImg(top, left, imgSrc) {
			console.log(top);
			this.bigImg = imgSrc;
			this.$refs.bigImg.style.top = `${top - 80}px`;
			this.$refs.bigImg.style.left = `${left - 100}px`;
			if (left > 700) {
				this.$refs.bigImg.style.left = `${left - 500}px`;
			}
			if (top > 500) {
				this.$refs.bigImg.style.top = `${top - 320}px`;
			}
		}
	},
	directives: {
		bigImg: {
			inserted: function(el, binding) {
				el['getTop'] = function() {
					let currentParent = el.offsetParent;
					let currentTop = el.offsetTop;
					while (currentParent !== null) {
						currentTop += currentParent.offsetTop;
						currentParent = currentParent.offsetParent;
					}
					return currentTop;
				};

				el['getLeft'] = function() {
					let currentParent = el.offsetParent;
					let currentLeft = el.offsetLeft;
					while (currentParent !== null) {
						currentLeft += currentParent.offsetLeft;
						currentParent = currentParent.offsetParent;
					}
					return currentLeft;
				};
				if (el.className !== 'bigImg') {
					el.addEventListener('mouseover', function() {
						binding.value(el['getTop'](), el['getLeft'](), el.src);
					});
					el.addEventListener('mouseleave', function(e) {
						if (e.toElement.className !== 'bigImg') {
							binding.value(0, 0, '');
						}
					});
					return;
				}
				el.addEventListener('mouseleave', function() {
					binding.value(0, 0, '');
				});
			}
		}
	},
	computed: {}
};
</script>
<style lang='scss' scoped>
@import '../../../../assets/pcCss/addProduct.css';
.clearfix::after {
	content: '.';
	display: block;
	height: 0;
	clear: both;
	visibility: hidden;
}
.flex {
	display: flex;
}
.item-bottom{
	margin-bottom:10px;
}
.show-detail {
	width: 96%;
	box-shadow: 0 0 5px 0 rgba(121, 121, 121, 0.32);

	color: #666;
	font-size: 14px;
	margin: 25px auto 25px;
}
i {
	font-style: normal;
}
.tab1 {
	padding: 10px 30px;
	& > div {
		line-height: 30px;
		span {
			margin-right: 20px;
		}
		& > span {
			width: 56px;
			display: inline-block;
		}
	}
	.plate1,
	.plate2 {
		clear: both;
		.left,
		.right {
			float: left;
			span {
				margin-right: 20px;
			}
		}
		.left {
			display: inline-block;
			width: 540px;
			span {
			}
		}
	}
	.plate3 {
		clear: both;
		span {
			margin-right: 20px;
			float: left;
		}
		p {
			float: left;
			width: 62%;
		}
	}
	.plate5 {
		span {
			float: left;
			margin-right: 24px;
		}
		.none,
		.service {
			float: left;
			span {
				display: inline-block;
			}
		}
	}

	.plate9 {
		& > span {
			float: left;
			margin-right: 23px;
		}
		p {
			float: left;
		}
	}
	.plate10 {
		& > span {
			float: left;
			margin-right: 23px;
		}
		.info {
			float: left;
		}
		.info-bottom {
			span {
				float: left;
			}
			.info-bottom_1 {
				width: auto;

				float: left;
				i {
					margin-left: 100px;
				}
			}
		}
	}
	.plate11 {
		.plate11-left {
			float: left;
			display: inline-block;
			width: 182px;
		}
		.plate11-right {
			float: left;
		}
	}
	.plate12 {
		.plate12-left {
			display: inline-block;
			width: 182px;
			float: left;
		}
		.plate12-right {
			float: left;
		}
	}
	.plate13 {
		.plate13-left {
			display: inline-block;
			width: 250px;
			float: left;
		}
		.plate13-right {
			float: left;
		}
	}
	.plate14 {
		.plate14-left {
			display: inline-block;
			width: 250px;
			float: left;
		}
		.plate14-right {
			float: left;
		}
	}
}
.tab2 {
	padding: 10px 30px;
	.span-title {
		text-align: left;
		display: inline-block;
		width: 70px;
	}
	.wrapper {
		& > div {
			margin-bottom: 10px;
		}
		.title {
			display: flex;
			justify-content: space-between;
		}
		.calandar {
			span {
				vertical-align: top;
			}
		}
		.stayAndprice {
			& > div {
				margin-bottom: 10px;
			}
			.price {
				display: flex;

				table {
					// border: 1px solid #666;
					border-collapse: collapse;
				}
				th {
					width: 70px;
					font-weight: normal;
				}
				tr {
					border: 1px solid #666;
				}
				td,
				th {
					display: inline-block;
					width: 79px;
					height: 45px;
					line-height: 45px;
					text-align: center;
					&:not(:last-child) {
						border-right: 1px solid #666;
					}
				}
			}
		}
		.promotions {
			display: flex;
			.promotions-info {
				// margin-left: 50px;
			}
		}
		.plate10 {
			& > span {
				float: left;
				// margin-right: 23px;
			}
			.info {
				float: left;
			}
			.info-top {
				span {
					margin-right: 20px;
				}
			}
			.info-bottom {
				span {
					float: left;
				}
				.info-bottom_1 {
					width: auto;

					float: left;
					i {
						margin-left: 100px;
					}
				}
			}
		}
	}
}
.tab3,
.tab4,
.tab5 {
	padding: 10px 30px;
	.span-title {
		text-align: left;
		display: inline-block;
		width: 70px;
	}

	.wrapper {
		margin-bottom: 50px;
		& > div {
			margin-bottom: 10px;
		}
		.title {
			display: flex;
		}
		.travel-1,
		.travel-2 {
			& > div {
				width: 100%;
			}
		}
	}
}
.tab4,
.tab5 {
	& > div {
		margin-bottom: 50px;
	}
}

.tab5 {
	& > div {
		& > div {
			margin-left: 60px;
		}
	}
	.bigImg {
		width: 400px;
		position: absolute;
		top: 0;
		left: 0;
	}
}
.tab3 {
	img {
		width: 100%;
	}
}

.img_wrapper {
	font-size: 10px;
	img {
		width: 100%;
	}
	p {
		font-size: 20px;
		img {
			width: 100%;
		}
	}
}
</style>
