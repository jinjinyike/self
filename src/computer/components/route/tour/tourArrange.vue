<template>
	<div id="order-search">
		<div class="manage-top">
            <div class="top-year">
                <span>发团安排</span>
                <el-button @click="doSearchShow"><span v-show="!searchShow">展开</span><span v-show="searchShow">收起</span><img v-show="!searchShow" src="/static/img/arrow_bottom.png"/><img v-show="searchShow" src="/static/img/arrow_top.png"/></el-button>
            </div>
            <el-collapse-transition>
                <div>
					<div class="top-main" v-show="searchShow" v-for="(item,index) in topList">
						<div class="line" style="border-bottom:1px dashed #ddd;">
							<span class="fir-span">产品名称</span> <span>{{item.proName}}</span>
							<span class="sec-span">内部编号</span> <span>{{item.proSelfNum}}</span>
							<span class="sec-span">发团日期</span> <span>{{item.proLeaveTime.substring(0,10)}}</span>
						</div>
						<div>
							<span class="fir-span">报名人数</span> <span>总共报名人数 {{item.visitorNum}} 人</span>
							<span class="sec-span">其中包括</span> <span class="sec-span">成人 {{item.adultNum}} 人</span> <span class="sec-span">儿童 {{item.childNum}} 人</span> <span class="sec-span">学生 {{item.studentNum}} 人</span> <span class="sec-span">老人 {{item.oldNum}} 人</span>
						</div>
						<div v-show="item.doubleRoom || item.threeRoom || item.oneBedRoom || item.threeFamilyRoom || item.fourRoom || item.moreRoom">
							<span class="fir-span">住宿信息</span> <span class="thr-span" v-show="item.doubleRoom">双人标间 {{item.doubleRoom}} 间</span> <span class="thr-span" v-show="item.threeRoom">三人间 {{item.threeRoom}} 间</span> <span class="thr-span" v-show="item.oneBedRoom">大床房 {{item.oneBedRoom}} 间</span> <span class="thr-span" v-show="item.threeFamilyRoom">三人家庭房 {{item.threeFamilyRoom}} 间</span> <span class="thr-span" v-show="item.fourRoom">四人间 {{item.fourRoom}} 间</span> <span class="thr-span" v-show="item.moreRoom">多人间 {{item.moreRoom}} 间</span> 
						</div>
						<!-- <div>
							<span class="fir-span">订单单数</span> <span>总共包括 3 个订单</span>
						</div> -->
					</div>
                </div>
            </el-collapse-transition>
		</div>
		<div class="mid-line">
			<!-- <el-button class="audit" type="primary" plain size='small' @click="userAudit">用户审核</el-button> -->
		</div>
		<div class="productManage-table right-content-index">
			<div class="arrange-top">
				<span>旅游团编号</span>
				<el-input placeholder="英文或数字最多10字符" v-model="teamSelfNum" @input="checkNum1(teamSelfNum)" :maxlength="10" style="width:25%"></el-input>
				<span class="sec-span">预支团款</span>
				<el-input class="sec-select" placeholder="输入金额" v-model="predictFee" @keyup.native="predictFee=predictFee.replace(/\D/g,'')"></el-input> 元
				<template>
					<el-checkbox  class="sec-span" v-model="isGroup">组团安排</el-checkbox>
					<el-checkbox v-model="isGround">地接安排</el-checkbox>
					<el-checkbox v-model="isSeats">座位重置</el-checkbox>
				</template>
			</div>
			<div class="group-arrange" v-show='isGroup'>
				<div class="group-line">
					<span class="fir-span">组团安排</span>
					<template>
						<el-checkbox v-model="ifGroupGuide">
							导游领队</el-checkbox>
						<el-checkbox v-model="ifGroupTraffic">交通车辆</el-checkbox>
						<el-checkbox v-model="ifGroupHotel">酒店住宿</el-checkbox>
						<el-checkbox v-model="ifGroupTicket">景区门票</el-checkbox>
					</template>
					</div>
					<div class="group-guide dashed" v-show="ifGroupGuide">
						<span class="fir-span">导游领队</span>
						<div class="group-guide-div">
							<div class="line dashed">
							<template>
								<el-checkbox checked disabled="">
									自行添加导游</el-checkbox>
								<el-checkbox disabled>平台添加导游</el-checkbox>
							</template>
						</div>
						<div class="line">
							<span>导游姓名</span>
							<el-input class="fir-select" placeholder="请输入导游姓名" :maxlength="5" v-model="groupGuide.guideName"></el-input>
							<span class="sec-span">联系电话</span>
							<el-input class="fir-select" placeholder="请输入联系电话" :maxlength="11" v-model="groupGuide.guidePhone"></el-input>
							<span class="sec-span">导游服务费</span>
							<el-input class="fir-select" placeholder="请输入导游服务费" v-model="groupGuide.guideFee" @keyup.native="groupGuide.guideFee=groupGuide.guideFee.replace(/\D/g,'')"></el-input> 元
						</div>
					</div>
				</div>
				<div class="group-traffic dashed" v-show="ifGroupTraffic">
					<span class="fir-span">交通车辆</span>
					<div class="group-traffic-div">
						<div class="group-traffic-main dashed" v-for="(item,index) in groupTraffic">
							<div class="line dashed">
								<span>交通方式</span>
								<el-select class="sec-select" v-model="item.trafficValue" placeholder="请选择">
									<el-option v-for="enter in trafficArr" :key="enter.value" :label="enter.label" :value="enter.value"></el-option>
								</el-select>
								<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" v-show="item.del==='1'" @click="addGroupTraffic">增加交通</el-button>
								<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" v-show="item.del==='0'" @click="delGroupTraffic(index)">删除交通</el-button>
							</div>
							<div class="line" v-show="item.trafficValue==='0'">
								<span>司机姓名</span>
								<el-input class="fir-select" placeholder="请输入司机姓名" :maxlength="5" v-model="item.driverName"></el-input>
								<span class="sec-span">联系电话</span>
								<el-input class="fir-select" placeholder="请输入联系电话" :maxlength="11" v-model="item.driverPhone"></el-input>
								<span class="sec-span">车辆牌照号</span>
								<el-input class="fir-select" placeholder="请输入车辆牌照号" :maxlength="20" v-model="item.plateNumber"></el-input><br/>
								<span>所属公司</span>
								<el-input placeholder="请输入车辆所属公司名称" style="width:48%;" v-model="item.belongCompany"></el-input>
								<span class="sec-span">车辆服务费</span>
								<el-input class="fir-select" placeholder="请输入车辆服务费" v-model="item.driverFee" @keyup.native="item.driverFee=item.driverFee.replace(/\D/g,'')"></el-input> 元
							</div>
							<div class="line" v-show="item.trafficValue!=='0'">
								<el-select class="sec-select" v-model="item.directionValue1" placeholder="请选择" v-show="item.trafficValue=='1'">
									<el-option v-for="enter in directionArr1" :key="enter.value" :label="enter.label" :value="enter.value"></el-option>
								</el-select>
								<el-select class="sec-select" v-model="item.directionValue2" placeholder="请选择" v-show="item.trafficValue=='2'">
									<el-option v-for="enter in directionArr2" :key="enter.value" :label="enter.label" :value="enter.value"></el-option>
								</el-select>
								<el-select class="sec-select" v-model="item.directionValue3" placeholder="请选择" v-show="item.trafficValue=='3'">
									<el-option v-for="enter in directionArr3" :key="enter.value" :label="enter.label" :value="enter.value"></el-option>
								</el-select>
								<el-input class="fir-select" placeholder="输入车次信息" v-model="item.description"></el-input>
								<span class="sec-span">成人数量</span>
								<el-input class="thr-select" placeholder="输入数量" v-model="item.adultNum"  @keyup.native="item.adultNum=item.adultNum.replace(/\D/g,'')"></el-input>
								-
								<el-input class="thr-select" placeholder="输入单价" v-model="item.adultPrice" @keyup.native="item.adultPrice=item.adultPrice.replace(/\D/g,'')"></el-input>
								<span class="sec-span">儿童数量</span>
								<el-input class="thr-select" placeholder="输入数量" v-model="item.childNum" @keyup.native="item.childNum=item.childNum.replace(/\D/g,'')"></el-input>
								-
								<el-input class="thr-select" placeholder="输入单价" v-model="item.childPrice" @keyup.native="item.childPrice=item.childPrice.replace(/\D/g,'')"></el-input>
							</div>
						</div>
					</div>
				</div>
				<div class="group-hotel dashed" v-show="ifGroupHotel">
					<span class="fir-span">酒店住宿</span>
					<div class="group-hotel-div">
						<div class="line dashed">
							<template>
								<el-checkbox checked disabled="">
									自行添加酒店</el-checkbox>
								<el-checkbox disabled>平台添加酒店</el-checkbox>
							</template>
						</div>
						<div class="group-hotel-main" v-for="(item,index) in groupHotel">
							<div class="line dashed">
								<span>联系人&nbsp;&nbsp;&nbsp;</span>
								<el-input class="fir-select" v-model="item.hotelLinkName" placeholder="请输入联系人姓名" :maxlength="5"></el-input>
								<span class="sec-span">联系电话</span>
								<el-input class="fir-select" v-model="item.hotelLinkPhone" placeholder="请输入联系电话" :maxlength="11"></el-input>
								<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" v-show="item.del==='1'" @click="addGroupHotel">增加酒店</el-button>
								<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" v-show="item.del==='0'" @click="delGroupHotel(index)">删除酒店</el-button>
							</div>
							<div class="line dashed">
								<span>酒店名称</span>
								<el-input placeholder="请输入酒店名称" v-model="item.hotelName" style="width:48%"></el-input>
								<span class="sec-span">酒店住宿费</span>
								<el-input class="fir-select" v-model="item.hotelFee" placeholder="请输入酒店住宿费" @keyup.native="item.hotelFee=item.hotelFee.replace(/\D/g,'')"></el-input> 元
							</div>
							<div class="line dashed" style="margin-bottom:-1px;">
								<span style="display:inline-block;width:8%;vertical-align:top;">预定数量</span>
								<div style="display:inline-block;width:91%;">
									<span>双人标间</span>
									<el-select class="thr-select" v-model="item.doubleRoom">
										<el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
									</el-select>
									-
									<el-input class="thr-select" v-model="item.doubleRoomPrice" placeholder="输入单价" @keyup.native="item.doubleRoomPrice=item.doubleRoomPrice.replace(/\D/g,'')"></el-input> 元
									<span class="sec-span">大床房</span>
									<el-select class="thr-select" v-model="item.standard">
										<el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
									</el-select>
									-
									<el-input class="thr-select" v-model="item.standardRoomPrice" placeholder="输入单价" @keyup.native="item.standardRoomPrice=item.standardRoomPrice.replace(/\D/g,'')"></el-input> 元
									<span class="sec-span">三人家庭房</span>
									<el-select class="thr-select" v-model="item.threeFamilyRoom">
										<el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
									</el-select>
									-
									<el-input class="thr-select" v-model="item.threeFamilyRoomPrice" placeholder="输入单价" @keyup.native="item.threeFamilyRoomPrice=item.threeFamilyRoomPrice.replace(/\D/g,'')"></el-input> 元<br/>
									<span>三人标间</span>
									<el-select class="thr-select" v-model="item.threeRoom">
										<el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
									</el-select>
									-
									<el-input class="thr-select" v-model="item.threeRoomPrice" placeholder="输入单价" @keyup.native="item.threeRoomPrice=item.threeRoomPrice.replace(/\D/g,'')"></el-input> 元
									<span class="sec-span">四人间</span>
									<el-select class="thr-select" v-model="item.fourRoom">
										<el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
									</el-select>
									-
									<el-input class="thr-select" v-model="item.fourRoomPrice" placeholder="输入单价" @keyup.native="item.fourRoomPrice=item.fourRoomPrice.replace(/\D/g,'')"></el-input> 元
									<span class="sec-span">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;多人间</span>
									<el-select class="thr-select" v-model="item.moreRoom">
										<el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
									</el-select>
									-
									<el-input class="thr-select" v-model="item.moreRoomPrice" placeholder="输入单价" @keyup.native="item.moreRoomPrice=item.moreRoomPrice.replace(/\D/g,'')"></el-input> 元
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="group-ticket" v-show="ifGroupTicket">
					<span class="fir-span">景区门票</span>
					<div class="group-ticket-div">
						<div class="line dashed">
							<template>
								<el-checkbox checked disabled="">
									自行添加门票</el-checkbox>
								<el-checkbox disabled>平台添加门票</el-checkbox>
							</template>
						</div>
						<div class="group-ticket-main" v-for="(item,index) in groupTicket">
							<div class="line dashed">
								<span>联系人&nbsp;&nbsp;&nbsp;</span>
								<el-input class="fir-select" v-model="item.ticketLinkName" placeholder="请输入联系人姓名" :maxlength="5"></el-input>
								<span class="sec-span">联系电话</span>
								<el-input class="fir-select" v-model="item.ticketLinkPhone" placeholder="请输入联系电话" :maxlength="11"></el-input>
								<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" v-show="item.del==='1'" @click="addGroupTicket">增加门票</el-button>
								<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" v-show="item.del==='0'" @click="delGroupTicket(index)">删除门票</el-button>
							</div>
							<div class="line dashed">
								<span>景区名称</span>
								<el-input placeholder="请输入景区名称" v-model="item.ticketName" style="width:48%"></el-input>
								<span class="sec-span">景区费用</span>
								<el-input class="fir-select" v-model="item.ticketFee" placeholder="请输入景区费用" @keyup.native="item.ticketFee=item.ticketFee.replace(/\D/g,'')"></el-input> 元
							</div>
							<div class="line dashed" style="margin-bottom:-1px;">
								<span style="display:inline-block;width:8%;vertical-align:top;">预定数量</span>

								<div style="display:inline-block;width:91%;">
									<span>成人票</span>
									<el-select class="thr-select" v-model="item.adultNum">
										<el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
									</el-select>
									-
									<el-input class="thr-select" v-model="item.adultPrice" placeholder="输入单价" @keyup.native="item.adultPrice=item.adultPrice.replace(/\D/g,'')"></el-input> 元
									<span class="sec-span">儿童票</span>
									<el-select class="thr-select" v-model="item.childNum">
										<el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
									</el-select>
									-
									<el-input class="thr-select" v-model="item.childPrice" placeholder="输入单价" @keyup.native="item.childPrice=item.childPrice.replace(/\D/g,'')"></el-input> 元
									<span class="sec-span">学生票</span>
									<el-select class="thr-select" v-model="item.studentNum">
										<el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
									</el-select>
									-
									<el-input class="thr-select" v-model="item.studentPrice" placeholder="输入单价" @keyup.native="item.studentPrice=item.studentPrice.replace(/\D/g,'')"></el-input> 元
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="ground-arrange" v-show='isGround'>
				<div class="ground-content" v-for="(item,index) in groundVoList">
					<div class="ground-line dashed">
						<div class="line">
							<span class="fir-span">地接安排</span>
							<el-select class="fir-select" v-model="item.groundId">
								<el-option v-for="item1 in groundList" :key="item1.value" :label="item1.label" :value="item1.value"></el-option>
							</el-select>
							<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" v-show="item.ground=='1'" @click="addGround">增加地接</el-button>
							<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" v-show="item.ground=='0'" @click="deleteGround(index)">删除地接</el-button>
						</div>
						<div class="line" style="margin-left:7%;">
							<span>地接安排类型</span>
							<el-select v-model="item.groundType">
								<el-option v-for="item1 in groundTypeArr" :key="item1.value" :label="item1.label" :value="item1.value"></el-option>
							</el-select>
							<div style="display:inline-block;" v-show="item.groundType==='1'">
								<template>
									<el-checkbox v-model="item.ifGroundGuide">
										导游领队</el-checkbox>
									<el-checkbox v-model="item.ifGroundTraffic">交通车辆</el-checkbox>
									<el-checkbox v-model="item.ifGroundHotel">酒店住宿</el-checkbox>
									<el-checkbox v-model="item.ifGroundTicket">景区门票</el-checkbox>
									<el-checkbox v-model="item.ifGroundMeal">餐饮综费</el-checkbox>
								</template>
							</div>
						</div>
					</div>
					<div class="ground-line dashed" v-show="item.groundType==='0'">
						<span class="fir-span">地接费用</span>
						<span>成人数量</span>
						<el-input class="thr-select" v-model="item.adultNum" placeholder="输入单价" @keyup.native="item.adultNum=item.adultNum.replace(/\D/g,'')"></el-input>
						-
						<el-input class="thr-select" v-model="item.adultPrice" placeholder="输入单价" @keyup.native="item.adultPrice=item.adultPrice.replace(/\D/g,'')"></el-input> 元
						<span class="sec-span">儿童数量</span>
						<el-input class="thr-select" v-model="item.childNum" placeholder="输入单价" @keyup.native="item.childNum=item.childNum.replace(/\D/g,'')"></el-input>
						-
						<el-input class="thr-select" v-model="item.childPrice" placeholder="输入单价" @keyup.native="item.childPrice=item.childPrice.replace(/\D/g,'')"></el-input> 元
						<span class="sec-span">老人数量</span>
						<el-input class="thr-select" v-model="item.oldNum" placeholder="输入单价" @keyup.native="item.oldNum=item.oldNum.replace(/\D/g,'')"></el-input>
						-
						<el-input class="thr-select" v-model="item.oldPrice" placeholder="输入单价" @keyup.native="item.oldPrice=item.oldPrice.replace(/\D/g,'')"></el-input> 元
					</div>
					<div class="arrange-by-Fee" v-show="item.groundType==='1'">
						<!-- 地接导游 -->
						<div class="ground-guide dashed" v-show="item.ifGroundGuide">
							<span class="fir-span">导游领队</span>
							<div class="group-guide-div" style="display:inline-block;width:92%;">
								<div class="line dashed" style="margin-bottom:-1px;" v-for="(item1,idx) in item.groundGuideList">
									<span>导游姓名</span>
									<el-input class="fir-select" v-model="item1.guideName" placeholder="请输入导游姓名" :maxlength="5"></el-input>
									<span class="sec-span">联系电话</span>
									<el-input class="fir-select" v-model="item1.guidePhone" placeholder="请输入联系电话" :maxlength="11"></el-input>
									<span class="sec-span">导游服务费</span>
									<el-input class="sec-select" v-model="item1.guideFee" placeholder="请输入导游服务费" @keyup.native="item1.guideFee=item1.guideFee.replace(/\D/g,'')"></el-input> 元
									<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" @click="addGroundGuide(index)" v-show="item1.guide==='1'">增加导游</el-button>
									<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" @click="delGroundGuide(index,idx)" v-show="item1.guide==='0'">删除导游</el-button>
								</div>
							</div>
						</div>
						<!-- 地接车辆 -->
						<div class="ground-traffic dashed" v-show="item.ifGroundTraffic">
							<span class="fir-span">交通车辆</span>
							<div class="ground-traffic-div">
								<div class="ground-traffic-main dashed" v-for="(item1,idx) in item.groundTrafficList" style="margin-bottom:-1px;">
									<div class="line dashed">
										<span>交通方式</span>
										<el-select class="sec-select" v-model="item1.trafficValue" placeholder="请选择">
											<el-option v-for="enter in trafficArr" :key="enter.value" :label="enter.label" :value="enter.value"></el-option>
										</el-select>
										<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" v-show="item1.traffic==='1'" @click="addGroundTraffic(index)">增加交通</el-button>
										<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" v-show="item1.traffic==='0'" @click="delGroundTraffic(index,idx)">删除交通</el-button>
									</div>
									<div class="line" v-show="item1.trafficValue==='0'">
										<span>车辆类型</span>
										<el-input class="fir-select" placeholder="请输入车辆类型" :maxlength="5" v-model="item1.driverType"></el-input>
										<span class="sec-span">车辆牌照号</span>
										<el-input class="fir-select" placeholder="请输入车辆牌照号" :maxlength="20" v-model="item1.plateNumber"></el-input>
										<span class="sec-span">车辆服务费</span>
										<el-input class="fir-select" placeholder="请输入车辆服务费" v-model="item1.driverFee" @keyup.native="item1.driverFee=item1.driverFee.replace(/\D/g,'')"></el-input> 元
									</div>
									<div class="line" v-show="item1.trafficValue!=='0'">
										<el-select class="sec-select" v-model="item1.directionValue1" placeholder="请选择" v-show="item1.trafficValue=='1'">
											<el-option v-for="enter in directionArr1" :key="enter.value" :label="enter.label" :value="enter.value"></el-option>
										</el-select>
										<el-select class="sec-select" v-model="item1.directionValue2" placeholder="请选择" v-show="item1.trafficValue=='2'">
											<el-option v-for="enter in directionArr2" :key="enter.value" :label="enter.label" :value="enter.value"></el-option>
										</el-select>
										<el-select class="sec-select" v-model="item1.directionValue3" placeholder="请选择" v-show="item1.trafficValue=='3'">
											<el-option v-for="enter in directionArr3" :key="enter.value" :label="enter.label" :value="enter.value"></el-option>
										</el-select>
										<el-input class="fir-select" placeholder="输入车次信息" v-model="item1.description"></el-input>
										<span class="sec-span">成人数量</span>
										<el-input class="thr-select" placeholder="输入数量" @keyup.native="item1.adultNum=item1.adultNum.replace(/\D/g,'')" v-model="item1.adultNum"></el-input>
										-
										<el-input class="thr-select" placeholder="输入单价" @keyup.native="item1.adultPrice=item1.adultPrice.replace(/\D/g,'')" v-model="item1.adultPrice"></el-input>
										<span class="sec-span">儿童数量</span>
										<el-input class="thr-select" placeholder="输入数量" @keyup.native="item1.childNum=item1.childNum.replace(/\D/g,'')" v-model="item1.childNum"></el-input>
										-
										<el-input class="thr-select" placeholder="输入单价" @keyup.native="item1.childPrice=item1.childPrice.replace(/\D/g,'')" v-model="item1.childPrice"></el-input>
									</div>
								</div>
							</div>
						</div>
						<!-- 地接酒店 -->
						<div class="ground-hotel dashed" v-show="item.ifGroundHotel">
							<span class="fir-span">酒店住宿</span>
							<div class="ground-hotel-div">
								<div class="ground-hotel-main" v-for="(item1,idx) in item.groundHotelList">
									<div class="line dashed">
										<span>酒店名称</span>
										<el-input placeholder="请输入酒店名称" v-model="item1.hotelName" style="width:30%"></el-input>
										<span class="sec-span">酒店住宿费</span>
										<el-input class="fir-select" v-model="item1.hotelFee" placeholder="请输入酒店住宿费" @keyup.native="item1.hotelFee=item1.hotelFee.replace(/\D/g,'')"></el-input> 元
										<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" v-show="item1.hotel==='1'" @click="addGroundHotel(index)">增加酒店</el-button>
										<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" v-show="item1.hotel==='0'" @click="delGroundHotel(index,idx)">删除酒店</el-button>
									</div>
									<div class="line dashed" style="margin-bottom:-1px;">
										<span style="display:inline-block;width:8%;vertical-align:top;">预定数量</span>
										<div style="display:inline-block;width:91%;">
											<span>双人标间</span>
											<el-select class="thr-select" v-model="item1.doubleRoom">
												<el-option v-for="enter in numOptionArr" :key="enter" :value="enter"></el-option>
											</el-select>
											-
											<el-input class="thr-select" v-model="item1.doubleRoomPrice" placeholder="输入单价" @keyup.native="item1.doubleRoomPrice=item1.doubleRoomPrice.replace(/\D/g,'')"></el-input> 元
											<span class="sec-span">大床房</span>
											<el-select class="thr-select" v-model="item1.standard">
												<el-option v-for="enter in numOptionArr" :key="enter" :value="enter"></el-option>
											</el-select>
											-
											<el-input class="thr-select" v-model="item1.standardRoomPrice" placeholder="输入单价" @keyup.native="item1.standardRoomPrice=item1.standardRoomPrice.replace(/\D/g,'')"></el-input> 元
											<span class="sec-span">三人家庭房</span>
											<el-select class="thr-select" v-model="item1.threeFamilyRoom">
												<el-option v-for="enter in numOptionArr" :key="enter" :value="enter"></el-option>
											</el-select>
											-
											<el-input class="thr-select" v-model="item1.threeFamilyRoomPrice" placeholder="输入单价" @keyup.native="item1.threeFamilyRoomPrice=item1.threeFamilyRoomPrice.replace(/\D/g,'')"></el-input> 元<br/>
											<span>三人标间</span>
											<el-select class="thr-select" v-model="item1.threeRoom">
												<el-option v-for="enter in numOptionArr" :key="enter" :value="enter"></el-option>
											</el-select>
											-
											<el-input class="thr-select" v-model="item1.threeRoomPrice" placeholder="输入单价" @keyup.native="item1.threeRoomPrice=item1.threeRoomPrice.replace(/\D/g,'')"></el-input> 元
											<span class="sec-span">四人间</span>
											<el-select class="thr-select" v-model="item1.fourRoom">
												<el-option v-for="enter in numOptionArr" :key="enter" :value="enter"></el-option>
											</el-select>
											-
											<el-input class="thr-select" v-model="item1.fourRoomPrice" placeholder="输入单价" @keyup.native="item1.fourRoomPrice=item1.fourRoomPrice.replace(/\D/g,'')"></el-input> 元
											<span class="sec-span">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;多人间</span>
											<el-select class="thr-select" v-model="item1.moreRoom">
												<el-option v-for="enter in numOptionArr" :key="enter" :value="enter"></el-option>
											</el-select>
											-
											<el-input class="thr-select" v-model="item1.moreRoomPrice" placeholder="输入单价" @keyup.native="item1.moreRoomPrice=item1.moreRoomPrice.replace(/\D/g,'')"></el-input> 元
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 景区门票 -->
						<div class="ground-ticket dashed" v-show="item.ifGroundTicket">
							<span class="fir-span">景区门票</span>
							<div class="ground-ticket-div">
								<div class="ground-ticket-main" v-for="(item1,idx) in item.groundTicketList">
									<div class="line dashed">
										<span>景区名称</span>
										<el-input placeholder="请输入景区名称" v-model="item1.ticketName" style="width:30%"></el-input>
										<span class="sec-span">景区费用</span>
										<el-input class="fir-select" v-model="item1.ticketFee" placeholder="请输入景区费用" @keyup.native="item1.ticketFee=item1.ticketFee.replace(/\D/g,'')"></el-input> 元
										<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" v-show="item1.ticket==='1'" @click="addGroundTicket(index)">增加门票</el-button>
										<el-button type='primary' plain size='small' style="float:right;margin-top:8px;" v-show="item1.ticket==='0'" @click="delGroundTicket(index,idx)">删除门票</el-button>
									</div>
									<div class="line dashed" style="margin-bottom:-1px;">
										<span style="display:inline-block;width:8%;vertical-align:top;">预定数量</span>

										<div style="display:inline-block;width:91%;">
											<span>成人票</span>
											<el-select class="thr-select" v-model="item1.adultNum">
												<el-option v-for="enter in numOptionArr" :key="enter" :value="enter"></el-option>
											</el-select>
											-
											<el-input class="thr-select" v-model="item1.adultPrice" placeholder="输入单价" @keyup.native="item1.adultPrice=item1.adultPrice.replace(/\D/g,'')"></el-input> 元
											<span class="sec-span">儿童票</span>
											<el-select class="thr-select" v-model="item1.childNum">
												<el-option v-for="enter in numOptionArr" :key="enter" :value="enter"></el-option>
											</el-select>
											-
											<el-input class="thr-select" v-model="item1.childPrice" placeholder="输入单价" @keyup.native="item1.childPrice=item1.childPrice.replace(/\D/g,'')"></el-input> 元
											<span class="sec-span">学生票</span>
											<el-select class="thr-select" v-model="item1.studentNum">
												<el-option v-for="enter in numOptionArr" :key="enter" :value="enter"></el-option>
											</el-select>
											-
											<el-input class="thr-select" v-model="item1.studentPrice" placeholder="输入单价" @keyup.native="item1.studentPrice=item1.studentPrice.replace(/\D/g,'')"></el-input> 元
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 餐饮综费 -->
						<div class="ground-meal dashed" v-show="item.ifGroundMeal"> 
							<div class="line">
								<span class="fir-span">餐饮综费</span>
								<span>成人数量</span>
								<el-input v-model="item.groundMeal.adultNum" class="sec-select" placeholder="输入数量" @keyup.native="item.groundMeal.adultNum=item.groundMeal.adultNum.replace(/\D/g,'')"></el-input>
								-
								<el-input v-model="item.groundMeal.adultPrice" class="sec-select" placeholder="输入单价" @keyup.native="item.groundMeal.adultPrice=item.groundMeal.adultPrice.replace(/\D/g,'')"></el-input> 元
								<span class="sec-span">儿童数量</span>
								<el-input v-model="item.groundMeal.childNum" class="sec-select" placeholder="输入数量" @keyup.native="item.groundMeal.childNum=item.groundMeal.childNum.replace(/\D/g,'')"></el-input>
								-
								<el-input v-model="item.groundMeal.childPrice" class="sec-select" placeholder="输入单价" @keyup.native="item.groundMeal.childPrice=item.groundMeal.childPrice.replace(/\D/g,'')"></el-input> 元
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="line">
					<span>地接安排</span>

				</div> -->

			</div>
			<div class="seats-arrange" v-show='isSeats'>
				<div class="line">
					<span>座位安排</span>

				</div>
			</div>
			<div style="line-height:40px;text-align:center;">
				<el-button type='primary' plain size='small' style="color: #45C8DC;background: #ecfafc;border-radius:4px;" @click="saveAll">保 存</el-button>
			</div>
		</div>
	
		<!--  -->
		<el-dialog
		title="" :visible.sync="orderDetail"  width="740px">
			<!-- <order-detail :orderId='detailId'></order-detail> -->
			<!-- <span slot="footer" class="dialog-footer">
				<el-button @click="orderDetail = false">取 消</el-button>
				<el-button type="primary" @click="orderDetail = false">确 定</el-button>
			</span> -->
		</el-dialog>

		 <site-single 
		 :show-tab='showTab' 
		 :site-num='siteNum'
		 :limit-num='limitNum'
		 :order-index='orderIndex'
		 @close='showTab = false'
		 >
		 </site-single>
		 <!-- <el-button @click='showTab=true;limitNum=2;orderIndex=0'>0</el-button>
		 <el-button @click='showTab=true;limitNum=3;orderIndex=1'>1</el-button> -->
	</div>
</template>

<script>
// import employee from '../../public/employee.vue';
// import calander from '../../public/calander_price.vue';
// import orderDetail from './orderDetail.vue';
import siteSingle from './selectSiteSingle';
import { verificationPhone } from '../../../../common/utils/verificationUtils.js';
export default {
    data() {
        return {
            // 车的座位数/车型
            siteNum: 55,
            // 是否显示车位弹窗
            showTab: false,
            // 每个订单可选的座位
            limitNum: 3,
            orderIndex: 0,

            topList: [],
            teamSelfNum: '',
            predictFee: '',
            numOptionArr: [], // 下拉框数字0-100
            groundList: [], // 地接社
            groundTypeArr: [
                {
                    label: '按团队人次安排',
                    value: '0'
                },
                {
                    label: '按费用分项安排',
                    value: '1'
                }
            ], // 地接社安排类型
            groupGuide: {
                guideName: '',
                guidePhone: '',
                guideFee: ''
            },
            trafficArr: [
                {
                    label: '汽车',
                    value: '0'
                },
                {
                    label: '火车',
                    value: '1'
                },
                {
                    label: '飞机',
                    value: '2'
                },
                {
                    label: '轮船',
                    value: '3'
                }
            ], // 车辆类型
            directionArr1: [
                {
                    label: '去程火车',
                    value: '0'
                },
                {
                    label: '回程火车',
                    value: '1'
                }
            ],
            directionArr2: [
                {
                    label: '去程飞机',
                    value: '0'
                },
                {
                    label: '回程飞机',
                    value: '1'
                }
            ],
            directionArr3: [
                {
                    label: '去程轮船',
                    value: '0'
                },
                {
                    label: '回程轮船',
                    value: '1'
                }
            ],
            searchShow: true, // 查询条件
            orderDetail: false, //订单详情
            isGroup: false, // 组团安排
            isGround: false, // 地接安排
            isSeats: false, // 座位重置
            ifGroupGuide: false, // 组团导游
            ifGroupTraffic: false, // 组团车辆
            ifGroupHotel: false, // 组团酒店
            ifGroupTicket: false, // 组团门票
            groupTraffic: [
                {
                    del: '1', // 1增加车辆 0删除车辆
                    driverName: '', // 司机姓名
                    driverPhone: '', // 司机电话
                    plateNumber: '', // 牌照号
                    belongCompany: '', // 所属公司
                    driverFee: '', // 车辆费用
                    trafficValue: '0', // 交通类型
                    directionValue1: '0',
                    directionValue2: '0',
                    directionValue3: '0',
                    description: '', // 车次信息
                    adultNum: '', // 成人数量
                    adultPrice: '', // 成人价格
                    childNum: '', // 儿童数量
                    childPrice: '' // 儿童价格
                }
            ],
            groupHotel: [
                // 组团酒店
                {
                    del: '1', // 1 增加酒店 2 删除酒店
                    hotelLinkName: '', // 酒店联系人
                    hotelLinkPhone: '', // 酒店联系电话
                    hotelName: '', // 酒店名称
                    hotelFee: '', // 酒店费用
                    doubleRoom: '0', // 双人间数量
                    doubleRoomPrice: '', // 双人间价钱
                    standard: '0', // 大床房
                    standardRoomPrice: '', // 大床房价钱
                    threeFamilyRoom: '0', // 三人家庭房
                    threeFamilyRoomPrice: '', // 三人家庭房价钱
                    threeRoom: '0', // 三人间
                    threeRoomPrice: '', // 三人间价钱
                    fourRoom: '0', // 四人间
                    fourRoomPrice: '', // 四人间价钱
                    moreRoom: '0', // 多人间
                    moreRoomPrice: '' // 多人间价钱
                }
            ],
            groupTicket: [
                // 组团门票
                {
                    del: '1',
                    ticketLinkName: '',
                    ticketLinkPhone: '',
                    ticketName: '',
                    ticketFee: '',
                    adultNum: '0',
                    adultPrice: '',
                    childNum: '0',
                    childPrice: '',
                    studentNum: '0',
                    studentPrice: ''
                }
            ],
            groundVoList: [
                // 地接社大的集合
                {
                    ground: '1',
                    groundId: '', // 地接社
                    groundType: '0', // 地接安排类型
                    adultNum: '',
                    adultPrice: '',
                    childNum: '',
                    childPrice: '',
                    oldNum: '',
                    oldPrice: '',
                    ifGroundGuide: false, // 地接导游
                    ifGroundTraffic: false, // 地接车辆
                    ifGroundHotel: false, // 地接酒店
                    ifGroundTicket: false, // 地接门票
                    ifGroundMeal: false, // 地接餐饮
                    groundGuideList: [
                        {
                            guide: '1', // 0 删除 1 增加
                            guideName: '', // 导游姓名
                            guidePhone: '', // 导游电话
                            guideFee: '' // 导游费用
                        }
                    ],
                    groundTrafficList: [
                        {
                            traffic: '1', // 1增加车辆 0删除车辆
                            driverType: '', // 车辆类型
                            plateNumber: '', // 牌照号
                            driverFee: '', // 车辆费用
                            trafficValue: '0', // 交通类型
                            directionValue1: '0', // 0 去程火车 1 回程火车
                            directionValue2: '0', // 0 去程飞机 1 回程飞机
                            directionValue3: '0', // 0 去程轮船 1 回程轮船
                            description: '',
                            adultNum: '', // 成人数量
                            adultPrice: '', // 成人价格
                            childNum: '', // 儿童数量
                            childPrice: '' // 儿童价格
                        }
                    ],
                    groundHotelList: [
                        {
                            // 地接酒店
                            hotel: '1', // 1 增加酒店 2 删除酒店
                            hotelName: '', // 酒店名称
                            hotelFee: '', // 酒店费用
                            doubleRoom: '0', // 双人间数量
                            doubleRoomPrice: '', // 双人间价钱
                            standard: '0', // 大床房
                            standardRoomPrice: '', // 大床房价钱
                            threeFamilyRoom: '0', // 三人家庭房
                            threeFamilyRoomPrice: '', // 三人家庭房价钱
                            threeRoom: '0', // 三人间
                            threeRoomPrice: '', // 三人间价钱
                            fourRoom: '0', // 四人间
                            fourRoomPrice: '', // 四人间价钱
                            moreRoom: '0', // 多人间
                            moreRoomPrice: '' // 多人间价钱
                        }
                    ],
                    groundTicketList: [
                        {
                            // 地接门票
                            ticket: '1',
                            ticketName: '',
                            ticketFee: '',
                            adultNum: '0',
                            adultPrice: '',
                            childNum: '0',
                            childPrice: '',
                            studentNum: '0',
                            studentPrice: ''
                        }
                    ],
                    groundMeal: {
                        adultNum: '',
                        adultPrice: '',
                        childNum: '',
                        childPrice: ''
                    }
                }
            ]
        };
    },
    methods: {
		// 内部标号校验
		checkNum1(value){
			this.$nextTick(() => {
				this.teamSelfNum = this.$validate.checkNum1(value).slice(0,10);
			});
		},
		checkNum(type){
			// this.$validate.checkNum(this.predictFee)
			// console.log(type);
			switch (type) {
				case 'predictFee':
					this.$nextTick(() => {
						this.predictFee = this.$validate.checkNum(this.predictFee);
					})
					break;
			}
		},
        doSearchShow() {
            this.searchShow
                ? (this.searchShow = false)
                : (this.searchShow = true);
        },
        getSelectOption() {
            // 数字下拉框
            for (let i = 0; i <= 100; i++) {
                this.numOptionArr.push(i);
            }
        },
        //从服务器读取数据
        loadData() {
            this.$http
                .axios({
                    url:
                        this.$api.getOrderPaginateList +
                        '?start=' +
                        (this.currentPage - 1) +
                        '&size=' +
                        this.pagesize,
                    method: 'post',
                    data: this.searchObj(),
                    json: false
                })
                .then(res => {
                    console.log(res);
                    this.tableData = res.data;
                    this.totalCount = res.total;
                });
		},
		// 保存
		saveAll(){
			let obj={};
			obj.itemIds = this.$route.query.id;
			obj.predictFee = this.predictFee;
			obj.teamSelfNum = this.teamSelfNum;
			if(!this.teamSelfNum) return this.$message.error('旅游团编号未填写');
			if(!this.predictFee) return this.$message.error('预支团款未填写');

			let planType = '';
			if(this.isGroup && this.isGround){
				planType = '2';
			}else if(this.isGroup && !this.isGround){
				planType = '0';
			}else if(!this.isGroup && this.isGround){
				planType = '1';
			}
			obj.planType = planType; // 安排类型
			console.log(planType);
			if(!planType) return this.$message.error('组团或者地接至少选择一种进行安排');
			
			if(this.isGroup){
				if (!this.ifGroupGuide && !this.ifGroupHotel && !this.ifGroupTraffic &&!this.ifGroupTicket) {
					return this.$message.error('组团安排至少选择一项进行安排');
				}
				if(this.ifGroupGuide){
					// 组团导游
					obj.teamGuideEntityList = [];
					let groupGuide1 = {};
					groupGuide1.guideName = this.groupGuide.guideName;
					groupGuide1.guidePhone = this.groupGuide.guidePhone;
					groupGuide1.guideServiceFee = this.groupGuide.guideFee;
					groupGuide1.guideType = '0'; // 0 手动添加

					if(!this.groupGuide.guideName) return this.$message.error('请填写组团导游联系人姓名');			
					if(verificationPhone(this.groupGuide.guidePhone)==='0') return this.$message.error('请填写正确的组团导游手机号码');
					if (!this.groupGuide.guideFee) return this.$message.error('请填写组团导游服务费');
					obj.teamGuideEntityList.push(groupGuide1);
				}
				if(this.ifGroupTraffic){
					// 组团交通车辆
					obj.teamDriverEntityList =  [];
					for (let i = 0; i < this.groupTraffic.length; i++) {
						let enter = {};
						enter.tool = this.groupTraffic[i].trafficValue; // 0 汽车 1 飞机 2 火车 3轮船
						enter.driverType = '0'; // 0 手动添加
						if(this.groupTraffic[i].trafficValue==='0'){
							enter.driverName = this.groupTraffic[i].driverName; // 司机姓名
							enter.driverPhone = this.groupTraffic[i].driverPhone; // 司机电话
							enter.plateNumber = this.groupTraffic[i].plateNumber; // 牌照号
							enter.belongCompany = this.groupTraffic[i].belongCompany; // 所属公司
							enter.driverFee = this.groupTraffic[i].driverFee; // 车辆服务费
							if(!this.groupTraffic[i].driverName) return this.$message.error(`组团交通车辆第${i+1}条司机姓名未填写`);
							if(verificationPhone(this.groupTraffic[i].driverPhone)==='0') return this.$message.error(`组团交通车辆第${i+1}条司机电话填写有误`);
							if(!this.groupTraffic[i].plateNumber) return this.$message.error(`组团交通车辆第${i+1}条牌照号未填写`);
							if(!this.groupTraffic[i].belongCompany) return this.$message.error(`组团交通车辆第${i+1}条所属公司未填写`);
							if(!this.groupTraffic[i].driverFee) return this.$message.error(`组团交通车辆第${i+1}条车辆服务费未填写`);
						}else{
							if(this.groupTraffic[i].trafficValue==='1'){
								enter.direction = this.groupTraffic[i].directionValue1;
							}else if(this.groupTraffic[i].trafficValue==='2'){
								enter.direction = this.groupTraffic[i].directionValue2;
							}else{
								enter.direction = this.groupTraffic[i].directionValue3;
							}
							enter.description = this.groupTraffic[i].description;
							if(this.groupTraffic[i].adultNum) enter.adultNum = this.groupTraffic[i].adultNum;
							if(this.groupTraffic[i].adultPrice) enter.adultPrice = this.groupTraffic[i].adultPrice;
							if(this.groupTraffic[i].childNum) enter.childNum = this.groupTraffic[i].childNum;
							if(this.groupTraffic[i].childPrice) enter.childPrice = this.groupTraffic[i].childPrice;
							if(!this.groupTraffic[i].description) return this.$message.error(`组团交通车辆第${i+1}条车次信息未填写`);
							if((this.groupTraffic[i].adultNum && !this.groupTraffic[i].adultPrice) || (!this.groupTraffic[i].adultNum && this.groupTraffic[i].adultPrice)){
								return this.$message.error(`组团交通车辆第${i+1}条成人信息安排有误`);
							} 
							if((this.groupTraffic[i].childNum && !this.groupTraffic[i].childPrice) || (!this.groupTraffic[i].childNum && this.groupTraffic[i].childPrice)){
								return this.$message.error(`组团交通车辆第${i+1}条儿童信息安排有误`);
							} 
							if(!this.groupTraffic[i].adultNum && !this.groupTraffic[i].childNum) return this.$message.error(`组团交通车辆第${i+1}条信息安排有误`);
						}
						obj.teamDriverEntityList.push(enter);
					}
				}
				if(this.ifGroupHotel){
					// 组团酒店
					obj.teamHotelEntityList = [];
					for (let i = 0; i < this.groupHotel.length; i++) {
						let enter = {};
						enter.hotelType = '0'; // 0 手动添加
						enter.hotelLinkName = this.groupHotel[i].hotelLinkName;
						enter.hotelLinkPhone = this.groupHotel[i].hotelLinkPhone;
						enter.hotelName = this.groupHotel[i].hotelName;
						enter.hotelServiceFee = this.groupHotel[i].hotelFee;
						if (!this.groupHotel[i].hotelLinkName) return this.$message.error(`组团酒店住宿第${i+1}条联系人未填写`);
						if (verificationPhone(this.groupHotel[i].hotelLinkPhone)==='0') return this.$message.error(`组团酒店住宿第${i+1}条联系电话填写有误`);
						if (!this.groupHotel[i].hotelName) return this.$message.error(`组团酒店住宿第${i+1}条酒店名称未填写`);
						if (!this.groupHotel[i].hotelFee) return this.$message.error(`组团酒店住宿第${i+1}条酒店费用未填写`);
							
						enter.doubleRoom = this.groupHotel[i].doubleRoom;
						enter.doubleRoomPrice = this.groupHotel[i].doubleRoomPrice;

						enter.standardRoom = this.groupHotel[i].standard;
						enter.standardRoomPrice = this.groupHotel[i].standardRoomPrice;
																	
						enter.threeFamilyRoom = this.groupHotel[i].threeFamilyRoom;
						enter.threeFamilyRoomPrice = this.groupHotel[i].threeFamilyRoomPrice;

						enter.threeRoom = this.groupHotel[i].threeRoom;
						enter.threeRoomPrice = this.groupHotel[i].threeRoomPrice;

						enter.fourRoom = this.groupHotel[i].fourRoom;
						enter.fourRoomPrice = this.groupHotel[i].fourRoomPrice;

						enter.moreRoom = this.groupHotel[i].moreRoom;
						enter.moreRoomPrice = this.groupHotel[i].moreRoomPrice;
						obj.teamHotelEntityList.push(enter);

					}
				}
				if(this.ifGroupTicket){
					// 组团门票
					obj.teamVisEntityList = [];
					for(let i = 0;i<this.groupTicket.length;i++){
						let enter = {};
						enter.visType = '0'; // 0 手动添加
						enter.visLinkName = this.groupTicket[i].ticketLinkName;
						enter.visLinkPhone = this.groupTicket[i].ticketLinkPhone;
						enter.visName = this.groupTicket[i].ticketName;
						enter.visFee = this.groupTicket[i].ticketFee;
						if (!this.groupTicket[i].ticketLinkName) return this.$message.error(`组团景区门票第${i+1}条联系人未填写`);
						if (verificationPhone(this.groupTicket[i].ticketLinkPhone)==='0') return this.$message.error(`组团景区门票第${i+1}条联系电话填写有误`);
						if (!this.groupTicket[i].ticketName) return this.$message.error(`组团景区门票第${i+1}条景区名称未填写`);
						if (!this.groupTicket[i].ticketFee) return this.$message.error(`组团景区门票第${i+1}条景区费用未填写`);

						enter.visAdultNum = this.groupTicket[i].adultNum;
						enter.visAdultPrice = this.groupTicket[i].adultPrice;
						enter.visChildNum = this.groupTicket[i].childNum;
						enter.visChildPrice = this.groupTicket[i].childPrice;
						enter.visStudentNum = this.groupTicket[i].studentNum;
						enter.visStudentPrice = this.groupTicket[i].studentPrice;
						obj.teamVisEntityList.push(enter);
					}
				}
			}
			if(this.isGround){
				// 地接
				obj.groundVoList = [];
				for (let i = 0; i < this.groundVoList.length; i++) {
					let enter = {};
					enter.groundLocalId = this.groundVoList[i].groundId;
					if(!this.groundVoList[i].groundId) return this.$message.error(`第${i+1}条地接未选择地接社`);
					enter.groundType = this.groundVoList[i].groundType;
					if(this.groundVoList[i].groundType==='0'){
						enter.groundAdultNum = !this.groundVoList[i].adultNum ? 0: this.groundVoList[i].adultNum;
						enter.groundAdultPrice = !this.groundVoList[i].adultPrice ? 0: this.groundVoList[i].adultPrice;
						enter.groundChildNum = !this.groundVoList[i].childNum ? 0 : this.groundVoList[i].childNum;
						enter.groundChildPrice = !this.groundVoList[i].childPrice ? 0 : this.groundVoList[i].childPrice;
						enter.groundOldManNum = !this.groundVoList[i].oldNum ? 0 : this.groundVoList[i].oldNum;
						enter.groundOldManPrice = !this.groundVoList[i].oldPrice ? 0 : this.groundVoList[i].oldPrice;

					}else{
						if(!this.groundVoList[i].ifGroundGuide && !this.groundVoList[i].ifGroundTraffic && !this.groundVoList[i].ifGroundHotel && !this.groundVoList[i].ifGroundTicket && !this.groundVoList[i].ifGroundMeal){
							return this.$message.error(`第${i+1}条地接至少选择一项进行安排`);
						}
						if(this.groundVoList[i].ifGroundGuide){
							enter.teamGuideEntityList = [];
							let groundGuide = this.groundVoList[i].groundGuideList;
							for (let j = 0; j < groundGuide.length; j++) {
								let guide = {};
								guide.guideName = groundGuide[j].guideName;
								guide.guidePhone = groundGuide[j].guidePhone;
								guide.guideServiceFee = groundGuide[j].guideFee;
								enter.teamGuideEntityList.push(guide);
								if(!groundGuide[j].guideName) return this.$message.error(`第${i+1}条地接 第${j+1}条导游姓名未填写`);
								if(verificationPhone(groundGuide[j].guidePhone)==='0') return this.$message.error(`第${i+1}条地接 第${j+1}条导游电话填写有误`);
								if(!groundGuide[j].guideFee) return this.$message.error(`第${i+1}条地接 第${j+1}条导游服务费未填写`);
							}
						}
						if(this.groundVoList[i].ifGroundTraffic){
							enter.teamDriverEntityList = [];
							let groundDriver = this.groundVoList[i].groundTrafficList;
							for (let j = 0; j < groundDriver.length; j++) {
								let driver = {};
								driver.tool = groundDriver[j].trafficValue; // 0 汽车 1 飞机 2 火车 3轮船
								if(groundDriver[j].trafficValue==='0'){
									driver.description = groundDriver[j].driverType; // 车辆类型
									driver.plateNumber = groundDriver[j].plateNumber; // 牌照号
									driver.driverFee = groundDriver[j].driverFee; // 车辆服务费
									if(!groundDriver[j].driverType) return this.$message.error(`第${i+1}条地接 第${j+1}条车辆类型未填写`);
									if(!groundDriver[j].plateNumber) return this.$message.error(`第${i+1}条地接 第${j+1}条车辆牌照号填写`);
									if(!groundDriver[j].driverFee) return this.$message.error(`第${i+1}条地接 第${j+1}条车辆费用未填写`);
								}else{
									if(groundDriver[j].trafficValue==='1'){
										driver.direction = groundDriver[j].directionValue1;
									}else if(groundDriver[j].trafficValue==='2'){
										driver.direction = groundDriver[j].directionValue2;
									}else{
										driver.direction = groundDriver[j].directionValue3;
									}
									driver.description = groundDriver[j].description;
									driver.adultNum = groundDriver[j].adultNum;
									driver.adultPrice = groundDriver[j].adultPrice;
									driver.childNum = groundDriver[j].childNum;
									driver.childPrice = groundDriver[j].childPrice;

									if(!groundDriver[j].description) return this.$message.error(`第${i+1}条地接 第${j+1}条交通车辆车次信息未填写`);
									if((groundDriver[j].adultNum && !groundDriver[j].adultPrice) || (!groundDriver[j].adultNum && groundDriver[j].adultPrice)){
										return this.$message.error(`第${i+1}条地接 第${j+1}条交通车辆成人信息填写有误`);
									}
									if((groundDriver[j].childNum && !groundDriver[j].childPrice) || (!groundDriver[j].childNum && groundDriver[j].childPrice)){
										return this.$message.error(`第${i+1}条地接 第${j+1}条交通车辆儿童信息填写有误`);
									}
									if (!groundDriver[j].adultNum && !groundDriver[j].childNum) {
										return this.$message.error(`第${i+1}条地接 第${j+1}条交通车辆信息未填写完整`);
									}

								}
								enter.teamDriverEntityList.push(driver);
							}
						}
						if (this.groundVoList[i].ifGroundHotel) {
							enter.teamHotelEntityList = [];
							let groundHotel = this.groundVoList[i].groundHotelList;
							for (let j = 0; j < groundHotel.length; j++) {
								let hotel = {};
								hotel.hotelName = groundHotel[j].hotelName;
								hotel.hotelServiceFee = groundHotel[j].hotelFee;
								if (!groundHotel[j].hotelName) return this.$message.error(`第${i+1}条地接 第${j+1}条酒店名称未填写`);
								if (!groundHotel[j].hotelFee) return this.$message.error(`第${i+1}条地接 第${j+1}条酒店费用未填写`);
								hotel.doubleRoom = groundHotel[j].doubleRoom;
								hotel.doubleRoomPrice = groundHotel[j].doubleRoomPrice;

								hotel.standardRoom = groundHotel[j].standard;
								hotel.standardRoomPrice = groundHotel[j].standardRoomPrice;

								hotel.threeFamilyRoom = groundHotel[j].threeFamilyRoom;
								hotel.threeFamilyRoomPrice = groundHotel[j].threeFamilyRoomPrice;

								hotel.threeRoom = groundHotel[j].threeRoom;
								hotel.threeRoomPrice = groundHotel[j].threeRoomPrice;

								hotel.fourRoom = groundHotel[j].fourRoom;
								hotel.fourRoomPrice = groundHotel[j].fourRoomPrice;

								hotel.moreRoom = groundHotel[j].moreRoom;
								hotel.moreRoomPrice = groundHotel[j].moreRoomPrice;
								enter.teamHotelEntityList.push(hotel);
							}
						}
						if (this.groundVoList[i].ifGroundTicket) {
							enter.teamVisEntityList = [];
							let groundTicket = this.groundVoList[i].groundTicketList;
							for (let j = 0; j < groundTicket.length; j++) {
								let ticket = {};
								ticket.visName = groundTicket[j].ticketName;
								ticket.visFee = groundTicket[j].ticketFee;
								if (!groundTicket[j].ticketName) return this.$message.error(`第${i+1}条地接 第${j+1}条景区门票景区名称未填写`);
								if (!groundTicket[j].ticketFee) return this.$message.error(`第${i+1}条地接 第${j+1}条景区门票景区费用未填写`);

								ticket.visAdultNum = groundTicket[j].adultNum;
								ticket.visAdultPrice = groundTicket[j].adultPrice;
								ticket.visChildNum = groundTicket[j].childNum;
								ticket.visChildPrice = groundTicket[j].childPrice;
								ticket.visStudentNum = groundTicket[j].studentNum;
								ticket.visStudentPrice = groundTicket[j].studentPrice;	
								enter.teamVisEntityList.push(ticket);					
							}
						}
						if (this.groundVoList[i].ifGroundMeal) {
							enter.groundMealEntity = {};
							// let groundMeal = {};
							enter.groundMealEntity.mealAdultNum = !this.groundVoList[i].groundMeal.adultNum ? 0 : this.groundVoList[i].groundMeal.adultNum;
							enter.groundMealEntity.mealAdultPrice = !this.groundVoList[i].groundMeal.adultPrice ? 0 : this.groundVoList[i].groundMeal.adultPrice;
							enter.groundMealEntity.mealChildNum = !this.groundVoList[i].groundMeal.childNum ? 0 : this.groundVoList[i].groundMeal.childNum;
							enter.groundMealEntity.mealChildPrice = !this.groundVoList[i].groundMeal.childPrice ? 0 : this.groundVoList[i].groundMeal.childPrice;
							// enter.GroundMealEntity.push(groundMeal);
						}
					}
					obj.groundVoList.push(enter);
				}
			
			}
			console.log(obj);
			// return;
			this.$http
			.axios({
				url:
				this.$api.savePlan,
				method: 'post',
				data: obj,
				json: true
			})
			.then(res => {
				this.$message.success('安排成功');
			});
		},
        // 序号
        searchObj() {
            let obj = {};
            return obj;
        },
        // 增加组团交通
        addGroupTraffic() {
            this.groupTraffic.push({
                del: '0', // 1增加车辆 0删除车辆
                driverName: '', // 司机姓名
                driverPhone: '', // 司机电话
                plateNumber: '', // 牌照号
                belongCompany: '', // 所属公司
                driverFee: '', // 车辆费用
                trafficValue: '0', // 交通类型
                directionValue1: '0',
                directionValue2: '0',
                directionValue3: '0',
                description: '',
                adultNum: '', // 成人数量
                adultPrice: '', // 成人价格
                childNum: '', // 儿童数量
                childPrice: '' // 儿童价格
            });
        },
        delGroupTraffic(index) {
            this.groupTraffic.splice(index, 1); // 删除组团交通
        },
        // 增加组团酒店
        addGroupHotel() {
            this.groupHotel.push({
                del: '0', // 1 增加酒店 2 删除酒店
                hotelLinkName: '', // 酒店联系人
                hotelLinkPhone: '', // 酒店联系电话
                hotelName: '', // 酒店名称
                hotelFee: '', // 酒店费用
                doubleRoom: '0', // 双人间数量
                doubleRoomPrice: '', // 双人间价钱
                standard: '0', // 大床房
                standardRoomPrice: '', // 大床房价钱
                threeFamilyRoom: '0', // 三人家庭房
                threeFamilyRoomPrice: '', // 三人家庭房价钱
                threeRoom: '0', // 三人间
                threeRoomPrice: '', // 三人间价钱
                fourRoom: '0', // 四人间
                fourRoomPrice: '', // 四人间价钱
                moreRoom: '0', // 多人间
                moreRoomPrice: '' // 多人间价钱
            });
        },
        // 删除组团酒店
        delGroupHotel(index) {
            this.groupHotel.splice(index, 1);
        },
        // 组团增加门票
        addGroupTicket() {
            this.groupTicket.push({
                del: '0',
                ticketLinkName: '',
                ticketLinkPhone: '',
                ticketName: '',
                ticketFee: '',
                adultNum: '0',
                adultPrice: '',
                childNum: '0',
                childPrice: '',
                studentNum: '0',
                studentPrice: ''
            });
        },
        // 组团删除门票
        delGroupTicket(index) {
            this.groupTicket.splice(index, 1);
        },
        // 地接操作
        // 地接增加导游
        addGroundGuide(index) {
            this.groundVoList[index].groundGuideList.push({
                guide: '0', // 0 删除 1 增加
                guideName: '', // 导游姓名
                guidePhone: '', // 导游电话
                guideFee: '' // 导游费用
            });
        },
        // 地接删除导游
        delGroundGuide(index, idx) {
            this.groundVoList[index].groundGuideList.splice(idx, 1);
        },
        // 增加地接车辆
        addGroundTraffic(index) {
            this.groundVoList[index].groundTrafficList.push({
                traffic: '0', // 1增加车辆 0删除车辆
                driverType: '', // 车辆类型
                plateNumber: '', // 牌照号
                driverFee: '', // 车辆费用
                trafficValue: '0', // 交通类型
                directionValue1: '0',
                directionValue2: '0',
                directionValue3: '0',
                description: '',
                adultNum: '', // 成人数量
                adultPrice: '', // 成人价格
                childNum: '', // 儿童数量
                childPrice: '' // 儿童价格
            });
        },
        // 删除地接车辆
        delGroundTraffic(index, idx) {
            this.groundVoList[index].groundTrafficList.splice(idx, 1);
        },
        // 增加地接酒店
        addGroundHotel(index) {
            this.groundVoList[index].groundHotelList.push({
                // 地接酒店
                hotel: '0', // 1 增加酒店 2 删除酒店
                hotelName: '', // 酒店名称
                hotelFee: '', // 酒店费用
                doubleRoom: '0', // 双人间数量
                doubleRoomPrice: '', // 双人间价钱
                standard: '0', // 大床房
                standardRoomPrice: '', // 大床房价钱
                threeFamilyRoom: '0', // 三人家庭房
                threeFamilyRoomPrice: '', // 三人家庭房价钱
                threeRoom: '0', // 三人间
                threeRoomPrice: '', // 三人间价钱
                fourRoom: '0', // 四人间
                fourRoomPrice: '', // 四人间价钱
                moreRoom: '0', // 多人间
                moreRoomPrice: '' // 多人间价钱
            });
        },
        // 删除地接酒店
        delGroundHotel(index, idx) {
            this.groundVoList[index].groundHotelList.splice(idx, 1);
        },
        // 增加景区门票
        addGroundTicket(index) {
            this.groundVoList[index].groundTicketList.push({
                ticket: '0',
                ticketName: '',
                ticketFee: '',
                adultNum: '0',
                adultPrice: '',
                childNum: '0',
                childPrice: '',
                studentNum: '0',
                studentPrice: ''
            });
        },
        delGroundTicket(index, idx) {
            this.groundVoList[index].groundTicketList.splice(idx, 1);
        },
        // 增加地接
        addGround() {
            this.groundVoList.push(
                // 地接社大的集合
                {
                    ground: '0', // 0删除地接 1 增加地接
                    groundId: '', // 地接社
                    groundType: '0', // 地接安排类型
                    adultNum: '',
                    adultPrice: '',
                    childNum: '',
                    childPrice: '',
                    oldNum: '',
                    oldPrice: '',
                    ifGroundGuide: false, // 地接导游
                    ifGroundTraffic: false, // 地接车辆
                    ifGroundHotel: false, // 地接酒店
                    ifGroundTicket: false, // 地接门票
                    ifGroundMeal: false, // 地接餐饮
                    groundGuideList: [
                        {
                            guide: '1', // 0 删除 1 增加
                            guideName: '', // 导游姓名
                            guidePhone: '', // 导游电话
                            guideFee: '' // 导游费用
                        }
                    ],
                    groundTrafficList: [
                        {
                            traffic: '1', // 1增加车辆 0删除车辆
                            driverType: '', // 车辆类型
                            plateNumber: '', // 牌照号
                            driverFee: '', // 车辆费用
                            // trafficArr:[{label:'汽车',value:'0'},{label:'火车',value:'1'},{label:'飞机',value:'2'},{label:'轮船',value:'3'}],
                            trafficValue: '0', // 交通类型
                            // directionArr1:[{label:'去程火车',value:'0'},{label:'回程火车',value:'1'}],
                            directionValue1: '0',
                            // directionArr2:[{label:'去程飞机',value:'0'},{label:'回程飞机',value:'1'}],
                            directionValue2: '0',
                            // directionArr3:[{label:'去程轮船',value:'0'},{label:'回程轮船',value:'1'}],
                            directionValue3: '0',
                            description: '',
                            adultNum: '', // 成人数量
                            adultPrice: '', // 成人价格
                            childNum: '', // 儿童数量
                            childPrice: '' // 儿童价格
                        }
                    ],
                    groundHotelList: [
                        {
                            // 地接酒店
                            hotel: '1', // 1 增加酒店 2 删除酒店
                            hotelName: '', // 酒店名称
                            hotelFee: '', // 酒店费用
                            doubleRoom: '0', // 双人间数量
                            doubleRoomPrice: '', // 双人间价钱
                            standard: '0', // 大床房
                            standardRoomPrice: '', // 大床房价钱
                            threeFamilyRoom: '0', // 三人家庭房
                            threeFamilyRoomPrice: '', // 三人家庭房价钱
                            threeRoom: '0', // 三人间
                            threeRoomPrice: '', // 三人间价钱
                            fourRoom: '0', // 四人间
                            fourRoomPrice: '', // 四人间价钱
                            moreRoom: '0', // 多人间
                            moreRoomPrice: '' // 多人间价钱
                        }
                    ],
                    groundTicketList: [
                        {
                            // 组团门票
                            ticket: '1',
                            ticketName: '',
                            ticketFee: '',
                            adultNum: '0',
                            adultPrice: '',
                            childNum: '0',
                            childPrice: '',
                            studentNum: '0',
                            studentPrice: ''
                        }
                    ],
                    groundMeal: {
                        adultNum: '',
                        adultPrice: '',
                        childNum: '',
                        childPrice: ''
                    }
                }
            );
        },
        deleteGround(index) {
            this.groundVoList.splice(index, 1);
        }
    },
    created() {
        this.getSelectOption();
        this.$http
            .axios({
                url: this.$api.getLocalGroundList,
                method: 'get',
                // data: obj,
                json: false
            })
            .then(res => {
                for (let i = 0; i < res.length; i++) {
                    this.groundList.push({
                        label: res[i].agencyName,
                        value: res[i].id
                    });
                }
            });
        // getPlanById
        this.$http
            .axios({
                url: this.$api.getPlanById + '/' + this.$route.query.id,
                method: 'get',
                // data: obj,
                json: false
            })
            .then(res => {
                this.topList = res.teamItemEntityList;
                console.log(this.topList);
                // for (let i = 0; i < res.length; i++) {
                // 	this.groundList.push({
                // 		label:res[i].agencyName,
                // 		value:res[i].id
                // 	})
                // }
            });
    },
    components: {
        siteSingle
    }
};
</script>

<style lang='scss' scoped>
// @import '../../../../assets/pcCss/addProduct.css';
#order-search {
    color: #666;
    margin-top: 20px;
    .manage-top {
        width: 96%;
        margin: auto;
        overflow: hidden;
        opacity: 0.96;
        background: #ffffff;
        box-shadow: 0 0 5px 0 rgba(121, 121, 121, 0.32);
        border-radius: 4px;
        margin-left: 20px;
        .top-main {
            border-top: 1px solid #ddd;
            padding: 20px;
            line-height: 40px;
            .fir-span {
                display: inline-block;
                width: 8%;
            }
            .sec-span {
                margin-left: 2%;
            }
            .thr-span {
                margin-right: 2%;
            }
        }
        .top-year {
            height: 50px;
            line-height: 50px;
            position: relative;
            padding: 0 20px;
            img {
                width: 14px;
                height: 14px;
                margin-left: 10px;
            }
            .el-button {
                position: absolute;
                right: 0px;
                top: 5px;
                border: none;
                background: none;
                margin-right: 14px;
                font-weight: normal;
                color: #666;
            }
        }
        .top-title {
            display: inline-block;
            width: 12%;
            background: #f1f2f6;
            p {
                height: 40px;
                line-height: 40px;
                margin-left: 10px;
            }
        }
        .right-line {
            display: inline-block;
            padding-left: 6px;
            width: 86%;
        }
    }
    .productManage-table {
        .el-button {
            color: #45c8dc;
            background: #fff;
            border-radius: 0px;
        }
        .dashed {
            border-bottom: 1px dashed #ddd;
        }
        .group-arrange,
        .arrange-top,
        .ground-arrange {
            padding: 20px;
        }
        .arrange-top {
            line-height: 50px;
            height: 50px;
            border-bottom: 1px solid #ddd;
            .sec-span {
                margin-left: 2%;
            }
            .sec-select {
                width: 14%;
            }
        }
        .group-arrange {
            .fir-span {
                display: inline-block;
                width: 7%;
                vertical-align: top;
            }
            .sec-span {
                margin-left: 2%;
            }
            .fir-select {
                width: 20%;
            }
            .sec-select {
                width: 14%;
            }
            .thr-select {
                width: 10%;
            }
            .group-line {
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #ddd;
            }
            .group-guide,
            .group-traffic,
            .group-hotel,
            .group-ticket {
                line-height: 45px;
            }
            .group-guide-div,
            .group-traffic-div,
            .group-hotel-div,
            .group-ticket-div {
                display: inline-block;
                width: 92%;
            }
        }
        .ground-arrange {
            .fir-span {
                display: inline-block;
                width: 7%;
                vertical-align: top;
            }
            .sec-span {
                margin-left: 2%;
            }
            .fir-select {
                width: 20%;
            }
            .sec-select {
                width: 14%;
            }
            .thr-select {
                width: 10%;
            }
            .ground-line {
                // height: 50px;
                line-height: 50px; // border-bottom: 1px solid #ddd;
            }
            .ground-guide,
            .ground-traffic,
            .ground-hotel,
            .ground-ticket,
            .ground-meal {
                line-height: 45px;
            }
            .ground-guide-div,
            .ground-traffic-div,
            .ground-hotel-div,
            .ground-ticket-div {
                display: inline-block;
                width: 92%;
            }
        }
    }
}
</style>
