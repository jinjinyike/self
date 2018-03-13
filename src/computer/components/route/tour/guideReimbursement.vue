<template>
    <div class="guide-all right-content-index">
        <div class="top">导游报账</div>
        <div class="group-guide" v-show="guideBillVo.guideBillBaseEntity && guideBillVo.guideBillBaseEntity.planType!=='1'">
            <div style="height:10px;background:#f5f6fa;"></div>
            <div class="group-main line">
                <div class="line-top">组团成本费用</div>
                <div class="dashed" v-for="item in guideBillVo.guideBillGuideEntityList">
                    <span>导游费用</span>
                    <el-input class="fir-select" v-model.trim="item.guideServiceFee" placeholder="金额" @keyup.native="item.guideServiceFee=item.guideServiceFee.replace(/\D/g,'')"></el-input> 元
                    <span class="sec-span">导游餐补</span>
                    <el-select class="sec-select" v-model="item.isMealSupport">
                        <el-option v-for="item in isHave" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span v-show="item.isMealSupport==='1'"><el-input class="fir-select" placeholder="金额" v-model="item.mealSupport" @keyup.native="item.mealSupport=item.mealSupport.replace(/\D/g,'')"></el-input> 元</span>
                    <span class="sec-span">导游提成</span>
                    <el-select class="sec-select" v-model="item.isCommission">
                        <el-option v-for="item in isHave" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span class="sec-span">实际人数</span>
                    <!-- <el-select class="sec-select">
                        <el-option v-for="item in numOptionArr" :key="item" :value="item"></el-option>
                    </el-select> -->
                    <span class="sec-span">接送费</span>
                    <el-select class="sec-select" v-model="item.isShuttle">
                        <el-option v-for="item in isHave" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span v-show="item.isShuttle==='1'"><el-input class="fir-select" v-model="item.shuttle" placeholder="金额" @keyup.native="item.shuttle=item.shuttle.replace(/\D/g,'')"></el-input> 元</span>
                </div>
                <div v-for="item in guideBillVo.guideBillDriverEntityList">
                    <div class="dashed" v-show="item.tool==='0'">
                        <span>车辆费用</span>
                        <el-input class="fir-select" v-model="item.driverFee" placeholder="金额" @keyup.native="item.driverFee=item.driverFee.replace(/\D/g,'')"></el-input> 元
                        <span class="sec-span">司机餐补</span>
                        <el-select class="sec-select" v-model="item.isMealSupport">
                            <el-option v-for="item in isHave" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-input class="fir-select" v-show="item.isMealSupport==='1'" v-model="item.mealSupport" @keyup.native="item.mealSupport=item.mealSupport.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                        <span class="sec-span">停车费用</span>
                        <el-select class="sec-select" v-model="item.isParkFee">
                            <el-option v-for="item in isHave" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-input class="fir-select" v-show="item.isParkFee==='1'" v-model="item.parkFee" @keyup.native="item.parkFee=item.parkFee.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                        <span class="sec-span">高速费用</span>
                        <el-select class="sec-select" v-model="item.isHighSpeedFee">
                            <el-option v-for="item in isHave" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-input class="fir-select" v-show="item.isHighSpeedFee ==='1'" v-model="item.highSpeedFee" @keyup.native="item.highSpeedFee=item.highSpeedFee.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                    </div>
                    <div class="dashed" v-show="item.tool!=='0'">
                        <span v-show="item.tool==='1' && item.direction==='0'">去程火车</span>
                        <span v-show="item.tool==='1' && item.direction==='1'">回程火车</span>
                        <span v-show="item.tool==='2' && item.direction==='0'">去程飞机</span>
                        <span v-show="item.tool==='2' && item.direction==='1'">去程飞机</span>
                        <span v-show="item.tool==='3' && item.direction==='0'">去程轮船</span>
                        <span v-show="item.tool==='3' && item.direction==='1'">回程轮船</span>
                        <span class="sec-span">{{item.description}}</span>
                        <span class="sec-span">成人数量</span>
                        <el-input class="fir-select" v-model="item.adultNum" @keyup.native="item.adultNum=item.adultNum.replace(/\D/g,'')" placeholder="数量"></el-input>
                        — —
                        <el-input class="fir-select" v-model="item.adultPrice" @keyup.native="item.adultPrice=item.adultPrice.replace(/\D/g,'')" placeholder="单价"></el-input> 元
                        <span class="sec-span">儿童数量</span>
                        <el-input class="fir-select" v-model="item.childNum" @keyup.native="item.childNum=item.childNum.replace(/\D/g,'')" placeholder="数量"></el-input>
                        — —
                        <el-input class="fir-select" v-model="item.childPrice" @keyup.native="item.childPrice=item.childPrice.replace(/\D/g,'')" placeholder="单价"></el-input> 元
                        <span class="rt"><span>实际费用</span> <el-input v-model="item.driverFee" @keyup.native="item.driverFee=item.driverFee.replace(/\D/g,'')" placeholder="金额"></el-input> 元</span>
                    </div>
                </div>
                <div class="dashed" v-for="item in guideBillVo.guideBillHotelEntityList">
                    <span style="float:left;">酒店费用</span>
                    <div class="line" style="margin-left:60px;">
                        <div class="dashed" style="margin-bottom:-1px;">
                            <span class="sec-span">{{item.hotelName}}</span>
                            <span class="rt"><span>实际费用</span> <el-input v-model="item.hotelServiceFee" @keyup.native="item.hotelServiceFee=item.hotelServiceFee.replace(/\D/g,'')" placeholder="金额"></el-input> 元</span><br>
                            <span style="display:inline-block;width:60px;">实际入住</span><!-- 
                            --><span class="room-span">大床房</span>
                            <el-select class="sec-select" v-model="item.standardRoom">
                                <el-option v-for="item in numOptionArr" :key="item" :value="item"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item.standardRoomPrice" @keyup.native="item.standardRoomPrice=item.standardRoomPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                            <span class="room-span sec-span">双人标间</span>
                            <el-select class="sec-select" v-model="item.doubleRoom">
                                <el-option v-for="item in numOptionArr" :key="item" :value="item"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item.doubleRoomPrice" @keyup.native="item.doubleRoomPrice=item.doubleRoomPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                            <span class="room-span sec-span">三人标间</span>
                            <el-select class="sec-select" v-model="item.threeRoom">
                                <el-option v-for="item in numOptionArr" :key="item" :value="item"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item.threeRoomPrice" @keyup.native="item.threeRoomPrice=item.threeRoomPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元 <br>
                            <span class="room-span" style="margin-left:60px;">三人家庭房</span>
                            <el-select class="sec-select" v-model="item.threeFamilyRoom">
                                <el-option v-for="item in numOptionArr" :key="item" :value="item"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item.threeFamilyRoomPrice" @keyup.native="item.threeFamilyRoomPrice=item.threeFamilyRoomPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                            <span class="room-span sec-span">四人间</span>
                            <el-select class="sec-select" v-model="item.fourRoom">
                                <el-option v-for="item in numOptionArr" :key="item" :value="item"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item.fourRoomPrice" @keyup.native="item.fourRoomPrice=item.fourRoomPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                            <span class="room-span sec-span">多人间</span>
                            <el-select class="sec-select" v-model="item.moreRoom">
                                <el-option v-for="item in numOptionArr" :key="item" :value="item"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item.moreRoomPrice" @keyup.native="item.moreRoomPrice=item.moreRoomPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                        </div>
                    </div>
                </div>
                <div class="dashed" v-for="item in guideBillVo.guideBillVisEntityList">
                    <span style="float:left;">门票费用</span>
                    <div class="line" style="margin-left:60px;">
                        <div class="dashed" style="margin-bottom:-1px;">
                            <span class="sec-span">{{item.visName}}</span>
                            <span class="rt"><span>实际费用</span> <el-input v-model="item.visFee" @keyup.native="item.visFee=item.visFee.replace(/\D/g,'')" placeholder="金额"></el-input> 元</span><br>
                            <span style="display:inline-block;width:60px;">实际购票</span><!-- 
                            --><span class="room-span">成人</span>
                            <el-select class="sec-select" v-model="item.visAdultNum">
                                <el-option v-for="item in numOptionArr" :key="item" :value="item"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item.visAdultPrice" @keyup.native="item.visAdultPrice=item.visAdultPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                            <span class="room-span sec-span">儿童</span>
                            <el-select class="sec-select" v-model="item.visChildNum">
                                <el-option v-for="item in numOptionArr" :key="item" :value="item"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item.visChildPrice" @keyup.native="item.visChildPrice=item.visChildPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                            <span class="room-span sec-span">学生</span>
                            <el-select class="sec-select" v-model="item.visStudentNum">
                                <el-option v-for="item in numOptionArr" :key="item" :value="item"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item.visStudentPrice" @keyup.native="item.visStudentPrice=item.visStudentPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元 
                        </div>
                    </div>
                </div>
                <div v-if="guideBillVo.guideBillBaseEntity" style="overflow:auto;">
                    <span style="float:left;">餐饮费用
                        <el-select style="width:120px"  v-model="guideBillVo.guideBillBaseEntity.isHaveMeal">
                            <el-option v-for="item in isHave" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </span>
                    <div v-show="guideBillVo.guideBillBaseEntity.isHaveMeal==1">
                        <div class="dashed"  v-for="(item,index) in guideBillVo.guideBillMealEntityList" style="margin-bottom:-1px;margin-left:200px;">
                            <span>项目名称</span>
                            <el-input class="thr-select" v-model.trim="item.name" :maxlength="10" placeholder="输入项目名称,10字符以内"></el-input>
                            <span class="sec-span">实际费用</span>
                            <el-input class="fir-select" v-model="item.fee" @keyup.native="item.fee=item.fee.replace(/\D/g,'')" placeholder="金额"></el-input> 元 
                            <el-button v-show="index==0" class="sec-span" type="primary" size="small" @click="addGroupMeal">添 加</el-button>
                            <el-button v-show="index!=0" class="sec-span" type="primary" size="small" @click="deleteGroupMeal(index)">删 除</el-button>
                        </div>
                    </div>
                </div>
                <div v-show="guideBillVo.guideBillGuideEntityList && guideBillVo.guideBillGuideEntityList.length>0 && guideBillVo.guideBillGuideEntityList[0].isCommission==='1' ">
                    <div class="dashed" style="border-top:1px dashed #ddd;">提成费用</div>
                    <div class="dashed"  v-for="(item,index) in guideBillVo.guideBillCommissionEntityList">
                        <span>类目名称</span>
                        <el-input class="thr-select" v-model.trim="item.commissionName" :maxlength="10" placeholder="请输入提成类目名称,10字符以内"></el-input>
                        <span class="sec-span">总金额</span>
                        <el-input class="fir-span" placeholder="金额" v-model="item.commissionTotalFee" @keyup.native="item.commissionTotalFee=item.commissionTotalFee.replace(/\D/g,'')"></el-input> 元
                        <span class="sec-span">导游金额</span>
                        <el-input class="fir-span" placeholder="金额" v-model="item.commissionGuideFee" @keyup.native="item.commissionGuideFee=item.commissionGuideFee.replace(/\D/g,'')"></el-input> 元
                        <span class="sec-span">公司金额</span>
                        <el-input class="fir-span" placeholder="金额" v-model="item.commissionCompanyFee" @keyup.native="item.commissionCompanyFee=item.commissionCompanyFee.replace(/\D/g,'')"></el-input> 元
                        <el-button class="sec-span" v-show="index==0" type="primary" size="small" @click="addGroupCommission">添 加</el-button>
                        <el-button class="sec-span" v-show="index!=0" type="primary" size="small" @click="deleteGroupCommission(index)">删 除</el-button>
                    </div>
                </div>
            </div>
            <!-- <div style="height:10px;background:#f5f6fa;"></div> -->
        </div>
        <div class="ground-guide" v-for="(item,index) in guideBillVo.guideBillGroundVoList"  v-show="guideBillVo.guideBillBaseEntity && guideBillVo.guideBillBaseEntity.planType!=='0'">
            <div v-show="item.groundType==='0'">
                <div style="height:10px;background:#f5f6fa;"></div>
                <div class="ground-main line">
                    <div class="ground-top">
                        <span>地接成本费用</span>
                        <span>按团队人次安排</span>
                    </div>
                    <div class=" dashed">
                        <span>地接机构名称</span>
                        <span class="sec-span">{{item.groundLocalId}}</span>
                    </div>
                    <div class="dashed">
                        <span>地接费用</span>
                        <span class="sec-span">成人数量</span>
                        <el-input class="sec-select" v-model="item.groundAdultNum" @keyup.native="item.groundAdultNum=item.groundAdultNum.replace(/\D/g,'')" placeholder="人数"></el-input>
                        —
                        <el-input class="sec-select" v-model="item.groundAdultPrice" @keyup.native="item.groundAdultPrice=item.groundAdultPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                        <span class="sec-span">儿童数量</span>
                        <el-input class="sec-select" v-model="item.groundChildNum" @keyup.native="item.groundChildNum=item.groundChildNum.replace(/\D/g,'')" placeholder="人数"></el-input>
                        —
                        <el-input class="sec-select" v-model="item.groundChildPrice" @keyup.native="item.groundChildPrice=item.groundChildPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                        <span class="sec-span">老人数量</span>
                        <el-input class="sec-select" v-model="item.groundOldManNum" @keyup.native="item.groundOldManNum=item.groundOldManNum.replace(/\D/g,'')" placeholder="人数"></el-input>
                        —
                        <el-input class="sec-select" v-model="item.groundOldManPrice" @keyup.native="item.groundOldManPrice=item.groundOldManPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                        <span class="rt"><span>实际费用</span> <el-input placeholder="金额" v-model="item.totalMoney" @keyup.native="item.totalMoney=item.totalMoney.replace(/\D/g,'')"></el-input> 元</span>
                    </div>
                    <div>
                        <span>地接提成</span>
                        <el-select class="sec-select" v-model="item.isHaveCommission">
                            <el-option v-for="enter in isHave" :key="enter.value" :label="enter.label" :value="enter.value"></el-option>
                        </el-select>
                    </div>
                    <div v-show="item.isHaveCommission==='1'">
                        <div class="dashed" style="border-top:1px dashed #ddd">
                            <span>提成费用</span>
                        </div>
                        <div v-for="(item1,idx) in item.guideBillGroundCommissionEntityList">
                            <span>类目名称</span>
                            <el-input class="thr-select" v-model="item1.commissionName" :maxlength="10" placeholder="请输入提成类目名称,10字符以内"></el-input>
                            <span class="sec-span">提成金额</span>
                            <el-input class="fir-span" v-model="item1.commissionTotalFee" @keyup.native="item1.commissionTotalFee=item1.commissionTotalFee.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                            <el-button class="sec-span" v-show="idx==0" type="primary" size="small" @click="addGroundCommission(index)">添 加</el-button>
                            <el-button class="sec-span" v-show="idx!=0" type="primary" size="small" @click="deleteGroundCommission(index,idx)">删 除</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="item.groundType==='1'">
                <div style="height:10px;background:#f5f6fa;"></div>
                <div class="ground-main line">
                    <div class="ground-top">
                        <span>地接成本费用</span>
                        <span>按费用分项安排</span>
                    </div>
                    <div class="dashed">
                        <span>地接机构名称</span>
                        <span class="sec-span">{{item.groundLocalId}}</span>
                    </div>
                    <div>
                        <span>提成费用</span>
                        <el-select class="sec-select" v-model="item.isHaveCommission">
                            <el-option v-for="enter in isHave" :key="enter.value" :label="enter.label" :value="enter.value"></el-option>
                        </el-select>
                    </div>
                    <div class="dashed" v-for="item1 in item.guideBillGuideEntityList">
                        <span>导游费用</span>
                        <span class="sec-span">{{item1.guideName}}</span>
                        <el-input class="fir-select sec-span" v-model.trim="item1.guideServiceFee" placeholder="金额" @keyup.native="item1.guideServiceFee=item1.guideServiceFee.replace(/\D/g,'')"></el-input> 元
                    </div>
                    <div v-for="item1 in item.guideBillDriverEntityList">
                        <div class="dashed" v-show="item1.tool==='0'">
                            <span>汽车交通</span>
                            <span class="sec-span">{{item1.description}}</span>
                            <span class="sec-span">汽车交通</span>
                            <el-input class="sec-span fir-select" v-model="item1.driverFee" placeholder="金额" @keyup.native="item1.driverFee=item1.driverFee.replace(/\D/g,'')"></el-input> 元
                        </div>
                        <div class="dashed" v-show="item1.tool!=='0'">
                            <span v-show="item1.tool==='1' && item1.direction==='0'">去程火车</span>
                            <span v-show="item1.tool==='1' && item1.direction==='1'">回程火车</span>
                            <span v-show="item1.tool==='2' && item1.direction==='0'">去程飞机</span>
                            <span v-show="item1.tool==='2' && item1.direction==='1'">去程飞机</span>
                            <span v-show="item1.tool==='3' && item1.direction==='0'">去程轮船</span>
                            <span v-show="item1.tool==='3' && item1.direction==='1'">回程轮船</span>
                            <span class="sec-span">{{item1.description}}</span>
                            <span class="sec-span">成人数量</span>
                            <el-input class="fir-select" v-model="item1.adultNum" @keyup.native="item1.adultNum=item1.adultNum.replace(/\D/g,'')" placeholder="数量"></el-input>
                            — —
                            <el-input class="fir-select" v-model="item1.adultPrice" @keyup.native="item1.adultPrice=item1.adultPrice.replace(/\D/g,'')" placeholder="单价"></el-input> 元
                            <span class="sec-span">儿童数量</span>
                            <el-input class="fir-select" v-model="item1.childNum" @keyup.native="item1.childNum=item1.childNum.replace(/\D/g,'')" placeholder="数量"></el-input>
                            — —
                            <el-input class="fir-select" v-model="item1.childPrice" @keyup.native="item1.childPrice=item1.childPrice.replace(/\D/g,'')" placeholder="单价"></el-input> 元
                            <span class="rt"><span>实际费用</span> <el-input v-model="item1.driverFee" @keyup.native="item1.driverFee=item1.driverFee.replace(/\D/g,'')" placeholder="金额"></el-input> 元</span>
                        </div>
                    </div>
                    <!-- 酒店费用 -->
                    <div class="dashed" v-for="item1 in item.guideBillHotelEntityList">
                        <span style="float:left;">酒店费用</span>
                        <div class="dashed" style="margin-bottom:-1px;">
                            <span class="sec-span">{{item1.hotelName}}</span>
                            <span class="rt"><span>实际费用</span> <el-input v-model="item1.hotelServiceFee" @keyup.native="item1.hotelServiceFee=item1.hotelServiceFee.replace(/\D/g,'')" placeholder="金额"></el-input> 元</span><br>
                            <span style="display:inline-block;width:60px;">实际入住</span><!-- 
                            --><span class="room-span">大床房</span>
                            <el-select class="sec-select" v-model="item1.standardRoom">
                                <el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item1.standardRoomPrice" @keyup.native="item1.standardRoomPrice=item1.standardRoomPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                            <span class="room-span sec-span">双人标间</span>
                            <el-select class="sec-select" v-model="item1.doubleRoom">
                                <el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item1.doubleRoomPrice" @keyup.native="item1.doubleRoomPrice=item1.doubleRoomPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                            <span class="room-span sec-span">三人标间</span>
                            <el-select class="sec-select" v-model="item1.threeRoom">
                                <el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item1.threeRoomPrice" @keyup.native="item1.threeRoomPrice=item1.threeRoomPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元 <br>
                            <span class="room-span" style="margin-left:60px;">三人家庭房</span>
                            <el-select class="sec-select" v-model="item1.threeFamilyRoom">
                                <el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item1.threeFamilyRoomPrice" @keyup.native="item1.threeFamilyRoomPrice=item1.threeFamilyRoomPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                            <span class="room-span sec-span">四人间</span>
                            <el-select class="sec-select" v-model="item1.fourRoom">
                                <el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item1.fourRoomPrice" @keyup.native="item1.fourRoomPrice=item1.fourRoomPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                            <span class="room-span sec-span">多人间</span>
                            <el-select class="sec-select" v-model="item1.moreRoom">
                                <el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
                            </el-select>
                            —
                            <el-input class="fir-select" v-model="item1.moreRoomPrice" @keyup.native="item1.moreRoomPrice=item1.moreRoomPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                        </div>
                        
                    </div>
                    <div class="dashed" v-for="item1 in item.teamVisEntityList">
                        <span style="float:left;">门票费用</span>
                        <div class="line" style="margin-left:60px;">
                            <div class="dashed" style="margin-bottom:-1px;">
                                <span class="sec-span">{{item1.visName}}</span>
                                <span class="rt"><span>实际费用</span> <el-input v-model="item1.visFee" @keyup.native="item1.visFee=item1.visFee.replace(/\D/g,'')" placeholder="金额"></el-input> 元</span><br>
                                <span style="display:inline-block;width:60px;">实际购票</span><!-- 
                                --><span class="room-span">成人</span>
                                <el-select class="sec-select" v-model="item1.visAdultNum">
                                    <el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
                                </el-select>
                                —
                                <el-input class="fir-select" v-model="item1.visAdultPrice" @keyup.native="item1.visAdultPrice=item1.visAdultPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                                <span class="room-span sec-span">儿童</span>
                                <el-select class="sec-select" v-model="item1.visChildNum">
                                    <el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
                                </el-select>
                                —
                                <el-input class="fir-select" v-model="item1.visChildPrice" @keyup.native="item1.visChildPrice=item1.visChildPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                                <span class="room-span sec-span">学生</span>
                                <el-select class="sec-select" v-model="item1.visStudentNum">
                                    <el-option v-for="item1 in numOptionArr" :key="item1" :value="item1"></el-option>
                                </el-select>
                                —
                                <el-input class="fir-select" v-model="item1.visStudentPrice" @keyup.native="item1.visStudentPrice=item1.visStudentPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元 
                            </div>
                        </div>
                    </div>
                    <!-- 餐饮费用 -->
                    <div class="dashed" v-show="item.guideBillMealEntity">
                        <!-- <span>{{item.guideBillMealEntity}}</span> -->
                        <span>餐饮综费</span>
                        <span>成人数量</span>
                        <el-input class="fir-select" v-model="item.guideBillMealEntity.mealAdultNum" @keyup.native="item.guideBillMealEntity.mealAdultNum=item.guideBillMealEntity.mealAdultNum.replace(/\D/g,'')" placeholder="数量"></el-input>
                        — —
                        <el-input class="fir-select" v-model="item.guideBillMealEntity.mealAdultPrice" @keyup.native="item.guideBillMealEntity.mealAdultPrice=item.guideBillMealEntity.mealAdultPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                        <span class="sec-span">儿童数量</span>
                        <el-input class="fir-select" v-model="item.guideBillMealEntity.mealChildNum" @keyup.native="item.guideBillMealEntity.mealChildNum=item.guideBillMealEntity.mealChildNum.replace(/\D/g,'')" placeholder="数量"></el-input>
                        — —
                        <el-input class="fir-select" v-model="item.guideBillMealEntity.mealChildPrice" @keyup.native="item.guideBillMealEntity.mealChildPrice=item.guideBillMealEntity.mealChildPrice.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                        <span class="rt"><span>实际费用</span> <el-input placeholder="金额" v-model="item.guideBillMealEntity.fee"></el-input> 元</span>
                    </div>
                    <div v-show="item.isHaveCommission==='1'">
                        <div class="dashed" style="border-top:1px dashed #ddd">
                            <span>提成费用</span>
                        </div>
                        <div v-for="(item1,idx) in item.guideBillGroundCommissionEntityList">
                            <span>类目名称</span>
                            <el-input class="thr-select" v-model="item1.commissionName" :maxlength="10" placeholder="请输入提成类目名称,10字符以内"></el-input>
                            <span class="sec-span">提成金额</span>
                            <el-input class="fir-span" v-model="item1.commissionTotalFee" @keyup.native="item1.commissionTotalFee=item1.commissionTotalFee.replace(/\D/g,'')" placeholder="金额"></el-input> 元
                            <el-button class="sec-span" v-show="idx==0" type="primary" size="small" @click="addGroundCommission(index)">添 加</el-button>
                            <el-button class="sec-span" v-show="idx!=0" type="primary" size="small" @click="deleteGroundCommission(index,idx)">删 除</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="padding:30px 0 100px 0;text-align:center;">
            <el-button type="primary" @click="saveAll">保 存</el-button>
        </div>
    </div>
    
</template>
<script>
    export default {
        data() {
            return{
                isHave:[
                    {label:'有',value:'1'},
                    {label:'无',value:'0'}
                ],
                numOptionArr:[],
                // val:'1',
                guideBillVo:{},
                groundList:[] // 地接显示信息
            }
        },
        methods:{
            handleInput(e){
                console.log(this.val);
                this.val=e.target.value.replace(/[^\d]/g,'');
            },
            loadData(){
                // this.$route.query.id
                this.$http.axios({
                    url: this.$api.getGuideBillById+this.$route.query.teamId,
                    method: 'get',
					// params: this.searchObj(),
					json: false
                })
                .then(
                    res => {
                        this.guideBillVo = res;
                        if (!this.guideBillVo.guideBillMealEntityList || this.guideBillVo.guideBillMealEntityList.length==0) {
                            this.guideBillVo.guideBillMealEntityList = [];
                            this.guideBillVo.guideBillMealEntityList.push({
                                name:'',
                                fee:''
                            })
                        }
                        // 组团提成
                        if(this.guideBillVo.guideBillGuideEntityList[0].isCommission==='0' && this.guideBillVo.guideBillCommissionEntityList.length==0){
                            this.guideBillVo.guideBillCommissionEntityList = []
                            this.guideBillVo.guideBillCommissionEntityList.push({
                                commissionName:'',
                                commissionTotalFee:'',
                                commissionGuideFee:'',
                                commissionCompanyFee:''
                            });
                        };
                        for (let i = 0; i < this.guideBillVo.guideBillGroundVoList.length; i++) {
                            let enter = this.guideBillVo.guideBillGroundVoList[i];
                            // 地接正确显示
                            for (let j = 0; j < this.groundList.length; j++) {
                                if(enter.groundLocalId == this.groundList[j].value){
                                    enter.groundLocalId = this.groundList[j].label;
                                    break;
                                }                                
                            }
                            if(enter.isHaveCommission ==='0'){
                                enter.guideBillGroundCommissionEntityList=[];
                            }
                            // 判断是否有
                            if(enter.guideBillGroundCommissionEntityList.length==0  || enter.isHaveCommission ==='0'){
                                enter.guideBillGroundCommissionEntityList=[];
                                enter.guideBillGroundCommissionEntityList.push({
                                    commissionName:'',
                                    commissionTotalFee:''
                                })
                            }
                        }

                       
				})
            },
            // 点击保存导游报账
            saveAll(){
                let obj = {};
                obj.guideBillBaseEntity={};
                obj.guideBillBaseEntity.id = this.guideBillVo.guideBillBaseEntity.id;
                if(this.guideBillVo.guideBillBaseEntity.planType!=='1'){
                    if(this.guideBillVo.guideBillGuideEntityList.length>0){
                        obj.guideBillGuideEntityList = []; // 导游
                        obj.guideBillCommissionEntityList = []; // 提成
                        let guide = {};
                        guide.guideServiceFee = this.guideBillVo.guideBillGuideEntityList[0].guideServiceFee;
                        guide.isMealSupport = this.guideBillVo.guideBillGuideEntityList[0].isMealSupport;
                        if(guide.isMealSupport === '1'){ 
                            guide.mealSupport = this.guideBillVo.guideBillGuideEntityList[0].mealSupport;
                            if(!guide.mealSupport) return this.$message.error('导游餐补未填写');
                        }
                        guide.isCommission = this.guideBillVo.guideBillGuideEntityList[0].isCommission; // 导游提成
                        guide.isShuttle = this.guideBillVo.guideBillGuideEntityList[0].isShuttle; // 导游接送费
                        if(guide.isShuttle === '1'){
                            guide.shuttle = this.guideBillVo.guideBillGuideEntityList[0].shuttle;
                            if(!guide.shuttle) return this.$message.error('接送费金额未填写')
                        }
                        guide.id = this.guideBillVo.guideBillGuideEntityList[0].id;
                        obj.guideBillGuideEntityList.push(guide);
                        if(guide.isCommission === '1'){ // 提成
                            for(let i = 0;i<this.guideBillVo.guideBillCommissionEntityList.length;i++){
                                let commission = {};
                                commission.commissionName = this.guideBillVo.guideBillCommissionEntityList[i].commissionName;
                                commission.commissionTotalFee = this.guideBillVo.guideBillCommissionEntityList[i].commissionTotalFee;
                                commission.commissionGuideFee = this.guideBillVo.guideBillCommissionEntityList[i].commissionGuideFee;
                                commission.commissionCompanyFee = this.guideBillVo.guideBillCommissionEntityList[i].commissionCompanyFee;
                                // commission.id = this.guideBillVo.guideBillCommissionEntityList[i].id;
                                if(!commission.commissionName) return this.$message.error(`第 ${i+1} 条组团提成类目名称未填写`);
                                if(!commission.commissionTotalFee) return this.$message.error(`第 ${i+1} 条组团提成总费用未填写`);
                                if(!commission.commissionGuideFee) return this.$message.error(`第 ${i+1} 条组团提成导游金额未填写`);
                                if(!commission.commissionCompanyFee) return this.$message.error(`第 ${i+1} 条组团提成公司金额未填写`);
                                obj.guideBillCommissionEntityList.push(commission);
                            }
                        }
                    }
                    if(this.guideBillVo.guideBillDriverEntityList.length>0){
                        obj.guideBillDriverEntityList = [];
                        for (let i = 0; i < this.guideBillVo.guideBillDriverEntityList.length; i++) {
                            let enter = {};
                            // enter.tool = this.guideBillVo.guideBillDriverEntityList[i].tool; // 0 汽车 1 飞机 2 火车 3轮船
                            enter.id = this.guideBillVo.guideBillDriverEntityList[i].id; // 
                            if(this.guideBillVo.guideBillDriverEntityList[i].tool==='0'){
                                enter.driverFee = this.guideBillVo.guideBillDriverEntityList[i].driverFee; // 车辆费用
                                enter.isMealSupport = this.guideBillVo.guideBillDriverEntityList[i].isMealSupport; // 司机餐补
                                enter.isParkFee = this.guideBillVo.guideBillDriverEntityList[i].isParkFee; // 停车费
                                enter.isHighSpeedFee = this.guideBillVo.guideBillDriverEntityList[i].isHighSpeedFee; // 高速费
                                if(!enter.driverFee) return this.$message.error(`组团交通车辆第${i+1}条车辆服务费未填写`);
                                if(enter.isMealSupport==='1'){
                                    enter.mealSupport = this.guideBillVo.guideBillDriverEntityList[i].mealSupport;
                                    if(!enter.mealSupport) return this.$message.error(`组团交通车辆第${i+1}条司机餐补费用未填写`);
                                }
                                if(enter.isParkFee==='1') {
                                    enter.parkFee = this.guideBillVo.guideBillDriverEntityList[i].parkFee;
                                    if(!enter.parkFee) return this.$message.error(`组团交通车辆第${i+1}条司机停车费用未填写`);
                                }
                                if(enter.isHighSpeedFee==='1') {
                                    enter.isHighSpeedFee = this.guideBillVo.guideBillDriverEntityList[i].isHighSpeedFee;
                                    if(!enter.isHighSpeedFee) return this.$message.error(`组团交通车辆第${i+1}条高速费用费用未填写`);
                                }
                            }else{
                                if(!this.guideBillVo.guideBillDriverEntityList[i].driverFee) return this.$message.error(`组团交通车辆第${i+1}条车辆实际费用未填写`);

                                if(this.guideBillVo.guideBillDriverEntityList[i].adultNum) enter.adultNum = this.guideBillVo.guideBillDriverEntityList[i].adultNum;
                                if(this.guideBillVo.guideBillDriverEntityList[i].adultPrice) enter.adultPrice = this.guideBillVo.guideBillDriverEntityList[i].adultPrice;
                                if(this.guideBillVo.guideBillDriverEntityList[i].childNum) enter.childNum = this.guideBillVo.guideBillDriverEntityList[i].childNum;
                                if(this.guideBillVo.guideBillDriverEntityList[i].childPrice) enter.childPrice = this.guideBillVo.guideBillDriverEntityList[i].childPrice;
                                enter.driverFee = this.guideBillVo.guideBillDriverEntityList[i].driverFee;
                                if((this.guideBillVo.guideBillDriverEntityList[i].adultNum && !this.guideBillVo.guideBillDriverEntityList[i].adultPrice) || (!this.guideBillVo.guideBillDriverEntityList[i].adultNum && this.guideBillVo.guideBillDriverEntityList[i].adultPrice)){
                                    return this.$message.error(`组团交通车辆第${i+1}条成人信息安排有误`);
                                } 
                                if((this.guideBillVo.guideBillDriverEntityList[i].childNum && !this.guideBillVo.guideBillDriverEntityList[i].childPrice) || (!this.guideBillVo.guideBillDriverEntityList[i].childNum && this.guideBillVo.guideBillDriverEntityList[i].childPrice)){
                                    return this.$message.error(`组团交通车辆第${i+1}条儿童信息安排有误`);
                                } 
                                if(!this.guideBillVo.guideBillDriverEntityList[i].adultNum && !this.guideBillVo.guideBillDriverEntityList[i].childNum) return this.$message.error(`组团交通车辆第${i+1}条信息安排有误`);
                            }
                            obj.guideBillDriverEntityList.push(enter);
                        }
                    }
                    // 组团酒店信息
                    if(this.guideBillVo.guideBillHotelEntityList.length>0){
                        obj.guideBillHotelEntityList = [];
                        for(let i = 0;i<this.guideBillVo.guideBillHotelEntityList.length;i++){
                            let enter = {};
                            enter.id = this.guideBillVo.guideBillHotelEntityList[i].id;
                            enter.hotelServiceFee = this.guideBillVo.guideBillHotelEntityList[i].hotelServiceFee;
                            if (!this.guideBillVo.guideBillHotelEntityList[i].hotelServiceFee) return this.$message.error(`组团酒店住宿第${i+1}条酒店费用未填写`);
                                
                            enter.doubleRoom = this.guideBillVo.guideBillHotelEntityList[i].doubleRoom;
                            enter.doubleRoomPrice = this.guideBillVo.guideBillHotelEntityList[i].doubleRoomPrice;

                            enter.standardRoom = this.guideBillVo.guideBillHotelEntityList[i].standardRoom;
                            enter.standardRoomPrice = this.guideBillVo.guideBillHotelEntityList[i].standardRoomPrice;
                                                                        
                            enter.threeFamilyRoom = this.guideBillVo.guideBillHotelEntityList[i].threeFamilyRoom;
                            enter.threeFamilyRoomPrice = this.guideBillVo.guideBillHotelEntityList[i].threeFamilyRoomPrice;

                            enter.threeRoom = this.guideBillVo.guideBillHotelEntityList[i].threeRoom;
                            enter.threeRoomPrice = this.guideBillVo.guideBillHotelEntityList[i].threeRoomPrice;

                            enter.fourRoom = this.guideBillVo.guideBillHotelEntityList[i].fourRoom;
                            enter.fourRoomPrice = this.guideBillVo.guideBillHotelEntityList[i].fourRoomPrice;

                            enter.moreRoom = this.guideBillVo.guideBillHotelEntityList[i].moreRoom;
                            enter.moreRoomPrice = this.guideBillVo.guideBillHotelEntityList[i].moreRoomPrice;
                            obj.guideBillHotelEntityList.push(enter);
                        }
                    }
                    if(this.guideBillVo.guideBillVisEntityList.length>0){
                        obj.guideBillVisEntityList=[];
                        for(let i = 0;i<this.guideBillVo.guideBillVisEntityList.length;i++){
                            let enter = {};
                            enter.id = this.guideBillVo.guideBillVisEntityList[i].id;
                            enter.visFee = this.guideBillVo.guideBillVisEntityList[i].visFee;
                            if (!this.guideBillVo.guideBillVisEntityList[i].visFee) return this.$message.error(`组团景区门票第${i+1}条景区费用未填写`);

                            enter.visAdultNum = this.guideBillVo.guideBillVisEntityList[i].visAdultNum;
                            enter.visAdultPrice = this.guideBillVo.guideBillVisEntityList[i].visAdultPrice;
                            enter.visChildNum = this.guideBillVo.guideBillVisEntityList[i].visChildNum;
                            enter.visChildPrice = this.guideBillVo.guideBillVisEntityList[i].visChildPrice;
                            enter.visStudentNum = this.guideBillVo.guideBillVisEntityList[i].visStudentNum;
                            enter.visStudentPrice = this.guideBillVo.guideBillVisEntityList[i].visStudentPrice;
                            obj.guideBillVisEntityList.push(enter);
                        }
                    }
                    if(this.guideBillVo.guideBillBaseEntity.planType!=='1'){
                        // obj.guideBillBaseEntity = {};
                        obj.guideBillBaseEntity.isHaveMeal = this.guideBillVo.guideBillBaseEntity.isHaveMeal;
                        obj.guideBillBaseEntity.id = this.guideBillVo.guideBillBaseEntity.id;
                        if(this.guideBillVo.guideBillBaseEntity.isHaveMeal==='1'){
                            obj.guideBillMealEntityList = [];
                            for (let i = 0; i < this.guideBillVo.guideBillMealEntityList.length; i++) {
                                let enter = {};
                                enter.name = this.guideBillVo.guideBillMealEntityList[i].name;
                                enter.fee = this.guideBillVo.guideBillMealEntityList[i].fee;
                                // if(enter.id) enter.id = this.guideBillVo.guideBillMealEntityList[i].id;
                                if(!enter.name) return this.$message.error(`组团餐饮第${i+1}条餐饮名称未填写`);
                                if(!enter.fee) return this.$message.error(`组团餐饮第${i+1}条餐饮费用未填写`);
                                obj.guideBillMealEntityList.push(enter);
                            }
                        }
                    }
                }
                if(this.guideBillVo.guideBillBaseEntity.planType!=='0'){
                    if(this.guideBillVo.guideBillGroundVoList.length>0){
                        obj.guideBillGroundVoList = [];
                        // console.log(this.guideBillVo.guideBillGroundVoList.length);
                        // return;
                        // 地接
                        for (let i = 0; i < this.guideBillVo.guideBillGroundVoList.length; i++) {
                            let ground = this.guideBillVo.guideBillGroundVoList[i];
                            let groundMain = {};
                            groundMain.id = ground.id;
                            groundMain.isHaveCommission = ground.isHaveCommission;
                            groundMain.groundType = ground.groundType;
                            if(ground.isHaveCommission==='1'){
                                groundMain.guideBillGroundCommissionEntityList = [];
                                for (let j = 0; j < ground.guideBillGroundCommissionEntityList.length; j++) {
                                    let enter = {};
                                    enter.commissionName = ground.guideBillGroundCommissionEntityList[j].commissionName
                                    enter.commissionTotalFee = ground.guideBillGroundCommissionEntityList[j].commissionTotalFee;
                                    // enter.id = ground.guideBillGroundCommissionEntityList[j].id;
                                    if(!enter.commissionName) return this.$message.error(`第${i+1}条地接第${j+1}条提成类目名称未填写`);
                                    if(!enter.commissionTotalFee) return this.$message.error(`第${i+1}条地接第${j+1}条提成费用未填写`);
                                    groundMain.guideBillGroundCommissionEntityList.push(enter);
                                }
                            }
                            if(ground.groundType === '0'){
                                groundMain.groundAdultNum = !ground.groundAdultNum ? 0: ground.groundAdultNum;
                                groundMain.groundAdultPrice = !ground.groundAdultPrice ? 0: ground.groundAdultPrice;
                                groundMain.groundChildNum = !ground.groundChildNum ? 0 : ground.groundChildNum;
                                groundMain.groundChildPrice = !ground.groundChildPrice ? 0 : ground.groundChildPrice;
                                groundMain.groundOldManNum = !ground.groundOldManNum ? 0 : ground.groundOldManNum;
                                groundMain.groundOldManPrice = !ground.groundOldManPrice ? 0 : ground.groundOldManPrice;
                                // 实际费用
                                groundMain.totalMoney = ground.totalMoney;
                                groundMain.id = ground.id;
                                if(!groundMain.totalMoney) return this.$message.error(`第${i+1}条地接未填写实际费用`);
                            }else{
                                if(ground.guideBillGuideEntityList.length>0){
                                    groundMain.guideBillGuideEntityList = [];
                                    for (let j = 0; j < ground.guideBillGuideEntityList.length; j++) {
                                        let groundGuide = {};
                                        groundGuide.guideServiceFee = ground.guideBillGuideEntityList[j].guideServiceFee;
                                        groundGuide.id = ground.guideBillGuideEntityList[j].id;
                                        groundMain.guideBillGuideEntityList.push(groundGuide);
                                    }
                                }
                                // 地接交通
                                if(ground.guideBillDriverEntityList.length>0){
                                    groundMain.guideBillDriverEntityList = [];
                                    for (let j = 0; j < ground.guideBillDriverEntityList.length; j++) {
                                        let enter = {};
                                        // enter.tool = ground.guideBillDriverEntityList[j].tool; // 0 汽车 1 飞机 2 火车 3轮船
                                        enter.id = ground.guideBillDriverEntityList[j].id; // 0 汽车 1 飞机 2 火车 3轮船
                                        if(ground.guideBillDriverEntityList[j].tool==='0'){
                                            enter.driverFee = ground.guideBillDriverEntityList[j].driverFee; // 车辆费用
                                            if(!enter.driverFee) return this.$message.error(`第${i+1}条地接第${j+1}条交通车辆服务费未填写`);
                                        }else{
                                            if(!ground.guideBillDriverEntityList[j].driverFee) return this.$message.error(`组团交通车辆第${j+1}条车辆实际费用未填写`);

                                            if(ground.guideBillDriverEntityList[j].adultNum) enter.adultNum = ground.guideBillDriverEntityList[j].adultNum;
                                            if(ground.guideBillDriverEntityList[j].adultPrice) enter.adultPrice = ground.guideBillDriverEntityList[j].adultPrice;
                                            if(ground.guideBillDriverEntityList[j].childNum) enter.childNum = ground.guideBillDriverEntityList[j].childNum;
                                            if(ground.guideBillDriverEntityList[j].childPrice) enter.childPrice = ground.guideBillDriverEntityList[j].childPrice;
                                            enter.driverFee = ground.guideBillDriverEntityList[j].driverFee;
                                            enter.id = ground.guideBillDriverEntityList[j].id;
                                            if((ground.guideBillDriverEntityList[j].adultNum && !ground.guideBillDriverEntityList[j].adultPrice) || (!ground.guideBillDriverEntityList[j].adultNum && ground.guideBillDriverEntityList[j].adultPrice)){
                                                return this.$message.error(`第${i+1}条地接第${j+1}条交通车辆成人信息安排有误`);
                                            } 
                                            if((ground.guideBillDriverEntityList[j].childNum && !ground.guideBillDriverEntityList[j].childPrice) || (!ground.guideBillDriverEntityList[j].childNum && ground.guideBillDriverEntityList[j].childPrice)){
                                                return this.$message.error(`第${i+1}条地接第${j+1}条交通车辆儿童信息安排有误`);
                                            } 
                                            if(!ground.guideBillDriverEntityList[j].adultNum && !ground.guideBillDriverEntityList[j].childNum) return this.$message.error(`第${i+1}条地接第${j+1}条交通车辆信息安排有误`);
                                        }
                                        groundMain.guideBillDriverEntityList.push(enter);
                                    } 
                                }
                                // 地接酒店
                                if(ground.guideBillHotelEntityList.length>0){
                                    groundMain.guideBillHotelEntityList = [];
                                    for(let j = 0;j<ground.guideBillHotelEntityList.length;j++){
                                        let enter = {};
                                        enter.hotelServiceFee = ground.guideBillHotelEntityList[j].hotelServiceFee;
                                        enter.id = ground.guideBillHotelEntityList[j].id;
                                        if (!ground.guideBillHotelEntityList[j].hotelServiceFee) return this.$message.error(`第${i+1}条地接第${j+1}条酒店住宿费用未填写`);
                                            
                                        enter.doubleRoom = ground.guideBillHotelEntityList[j].doubleRoom;
                                        enter.doubleRoomPrice = ground.guideBillHotelEntityList[j].doubleRoomPrice;

                                        enter.standardRoom = ground.guideBillHotelEntityList[j].standardRoom;
                                        enter.standardRoomPrice = ground.guideBillHotelEntityList[j].standardRoomPrice;
                                                                                    
                                        enter.threeFamilyRoom = ground.guideBillHotelEntityList[j].threeFamilyRoom;
                                        enter.threeFamilyRoomPrice = ground.guideBillHotelEntityList[j].threeFamilyRoomPrice;

                                        enter.threeRoom = ground.guideBillHotelEntityList[j].threeRoom;
                                        enter.threeRoomPrice = ground.guideBillHotelEntityList[j].threeRoomPrice;

                                        enter.fourRoom = ground.guideBillHotelEntityList[j].fourRoom;
                                        enter.fourRoomPrice = ground.guideBillHotelEntityList[j].fourRoomPrice;

                                        enter.moreRoom = ground.guideBillHotelEntityList[j].moreRoom;
                                        enter.moreRoomPrice = ground.guideBillHotelEntityList[j].moreRoomPrice;
                                        groundMain.guideBillHotelEntityList.push(enter);
                                    }
                                }
                                // 地接门票
                                if(ground.teamVisEntityList.length>0){
                                    groundMain.teamVisEntityList = [];
                                    for(let j = 0;j<ground.teamVisEntityList.length;j++){
                                        let enter = {};
                                        enter.visFee = ground.teamVisEntityList[j].visFee;
                                        enter.id = ground.teamVisEntityList[j].id;
                                        if (!ground.teamVisEntityList[j].visFee) return this.$message.error(`第${i+1}条地接第${j+1}条景区费用未填写`);

                                        enter.visAdultNum = ground.teamVisEntityList[j].visAdultNum;
                                        enter.visAdultPrice = ground.teamVisEntityList[j].visAdultPrice;
                                        enter.visChildNum = ground.teamVisEntityList[j].visChildNum;
                                        enter.visChildPrice = ground.teamVisEntityList[j].visChildPrice;
                                        enter.visStudentNum = ground.teamVisEntityList[j].visStudentNum;
                                        enter.visStudentPrice = ground.teamVisEntityList[j].visStudentPrice;
                                        groundMain.teamVisEntityList.push(enter);
                                    }
                                }
                                if(ground.guideBillMealEntity){
                                    // console.log(1);
                                    groundMain.guideBillMealEntity = {};
                                    groundMain.guideBillMealEntity.mealAdultNum = ground.guideBillMealEntity.mealAdultNum ? ground.guideBillMealEntity.mealAdultNum:0;
                                    groundMain.guideBillMealEntity.mealAdultPrice = ground.guideBillMealEntity.mealAdultPrice ? ground.guideBillMealEntity.mealAdultPrice:0;
                                    groundMain.guideBillMealEntity.mealChildNum = ground.guideBillMealEntity.mealChildNum ? ground.guideBillMealEntity.mealChildNum:0;
                                    groundMain.guideBillMealEntity.mealChildPrice = ground.guideBillMealEntity.mealChildPrice ? ground.guideBillMealEntity.mealChildPrice:0;
                                    groundMain.guideBillMealEntity.fee = ground.guideBillMealEntity.fee;
                                    groundMain.guideBillMealEntity.id = ground.guideBillMealEntity.id;
                                    if(!groundMain.guideBillMealEntity.fee) return this.$message.error(`第${i+1}条地接餐饮费用未填写`);
                                    // for(let j=0;j<ground.guideBillMealEntity.length;j++){
                                    //     let enter = {};
                                    //     enter.mealAdultNum = groundMain.guideBillMealEntity[j].mealAdultNum;
                                    //     enter.mealAdultPrice = groundMain.guideBillMealEntity[j].mealAdultPrice;
                                    //     enter.mealChildNum = groundMain.guideBillMealEntity[j].mealChildNum;
                                    //     enter.mealChildPrice = groundMain.guideBillMealEntity[j].mealChildPrice;
                                    //     enter.fee = groundMain.guideBillMealEntity[j].fee;
                                    //     enter.id = groundMain.guideBillMealEntity[j].id;
                                    //     groundMain.guideBillMealEntity.push(enter);
                                    // }
                                }
                            }
                            obj.guideBillGroundVoList.push(groundMain);
                        }
                    }
                }
                console.log(obj);
                this.$http.axios({
                    url:this.$api.saveGuideBill,
                    method:'post',
                    data:obj,
                    json:true
                }).then(res=>{
                    this.$message.success('保存成功');
                })
            },
            // 增加组团餐饮
            addGroupMeal(){
                this.guideBillVo.guideBillMealEntityList.push({name:'',fee:''})
            },
            deleteGroupMeal(index){
                this.guideBillVo.guideBillMealEntityList.splice(index,1);
            },
            // 增加组团提成
            addGroupCommission(){
                this.guideBillVo.guideBillCommissionEntityList.push({
                    commissionName:'',
                    commissionTotalFee:'',
                    commissionGuideFee:'',
                    commissionCompanyFee:''
                })
            },
            deleteGroupCommission(index){
                this.guideBillVo.guideBillCommissionEntityList.splice(index,1);
            },
            // 增加地接提成
            addGroundCommission(index){
                this.guideBillVo.guideBillGroundVoList[index].guideBillGroundCommissionEntityList.push({
                    commissionName:'',
                    commissionTotalFee:''
                })
            },
            // 删除地接提成
            deleteGroundCommission(index,idx){
                this.guideBillVo.guideBillGroundVoList[index].guideBillGroundCommissionEntityList.splice(idx,1);
            },   

        },
        created(){
            for(let i=0;i<=100;i++){
                this.numOptionArr.push(i);
            }
        },
        mounted () {
            this.loadData();
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
        }
    }
</script>
<style lang='scss' scoped>
    .guide-all{
        color: #666;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        .top{
            line-height: 50px;
            padding: 0 20px;
            font-size: 16px;
            border-bottom: 1px solid #ddd;
        }
        .line{
            line-height: 45px;
        }
        .dashed{
            border-bottom: 1px dashed #ddd;
        }
        .fir-select{
            width: 10%;
        }
        .sec-select{
            width:8%;
        }
        .thr-select{
            width: 30%;
        }
        .sec-span{
            margin-left:10px;
        }
        .rt{
            float: right;
            margin-right:1%;
        }
        .group-guide{
            .group-main{
                padding: 0 20px;
                .line-top{
                    line-height: 45px;
                    border-bottom: 1px solid #ddd;
                }
            }
            .room-span{
                display: inline-block;
                width:70px;
                text-align: right;
            }
            .el-button {
                color: #45c8dc;
                background: #fff;
                border-radius: 4px;
            }
        }
        .ground-guide{
            .ground-main{
                padding: 0 20px;
                .ground-top{
                    line-height: 45px;
                    border-bottom: 1px solid #ddd;
                }
            }
            .room-span{
                display: inline-block;
                width:70px;
                text-align: right;
            }
            .el-button {
                color: #45c8dc;
                background: #fff;
                border-radius: 4px;
            }
        }
    }
</style>
