    <!--<tour-detail :id='detailId' ref="load"></tour-detail>
    if(this.$refs.load){
        this.$refs.load.loadData(this.detailId);
    }
    -->
<template>
    <div class="detail">
        <div v-show="detailData.planType">
            <div class="top">
                <span class="fir-span">团队编号</span> <span>{{detailData.teamSelfNum}}</span>
                <span class="sec-span">共包含 个订单</span>
                <span class="sec-span">共计 2 名乘客</span>
            </div>
            <div class="group" v-show="detailData.planType!=='1'">
                <div class="line solid" style="text-align:center">
                    组团安排
                </div>
                <div class="line dashed" v-if="detailData.teamGuideEntityList" v-for='item in detailData.teamGuideEntityList'>
                    <span class="fir-span">导游姓名</span><span>{{item.guideName}}</span>
                    <span class="sec-span">联系电话 <span>{{item.guidePhone}}</span></span>
                    <span class="rt">导游服务费 <span>{{item.guideServiceFee}}</span> 元</span>
                </div> 
                <div class="line dashed" v-show="detailData.teamDriverEntityList"  v-for="(item,index) in detailData.teamDriverEntityList">
                    <div v-show="item.tool=='0'">
                        <span class="fir-span">司机姓名</span><span>{{item.driverName}}</span>
                        <span class="sec-span">联系电话 {{item.driverPhone}}</span>
                        <span class="rt">车辆服务费 <span>{{item.driverFee}}</span> 元</span><br>
                        <span class="fir-span">所属公司</span><span>{{item.belongCompany}}</span>
                        <span class="rt">车牌照号 <span>{{item.plateNumber}}</span></span>
                    </div>
                    <div v-show="item.tool!=='0'" >
                        <span class="fir-span" v-show="item.tool==='1' && item.direction ==='0'">去程火车</span>
                        <span class="fir-span" v-show="item.tool==='1' && item.direction ==='1'">回程火车</span>
                        <span class="fir-span" v-show="item.tool==='2' && item.direction ==='0'">去程飞机</span>
                        <span class="fir-span" v-show="item.tool==='2' && item.direction ==='1'">回程飞机</span>
                        <span class="fir-span" v-show="item.tool==='3' && item.direction ==='0'">去程轮船</span>
                        <span class="fir-span" v-show="item.tool==='4' && item.direction ==='1'">回程轮船</span>
                        <span>{{item.description}}</span>
                        <span class="sec-span">成人 {{item.adultNum}} 人</span>
                        <span class="sec-span">儿童 {{item.childNum}} 人</span>
                        <span class="rt" v-show="item.tool==='1'">火车费用 <span>{{item.driverFee}}</span> 元</span>
                        <span class="rt" v-show="item.tool==='2'">飞机费用 <span>{{item.driverFee}}</span> 元</span>
                        <span class="rt" v-show="item.tool==='3'">轮船费用 <span>{{item.driverFee}}</span> 元</span>
                    </div>
                </div>
                <div class="line dashed" v-show="detailData.teamHotelEntityList" v-for="item in detailData.teamHotelEntityList">
                    <span class="fir-span">酒店联系人</span><span>{{item.hotelLinkName}}</span>
                    <span class="sec-span">联系电话 <span>{{item.hotelLinkPhone}}</span></span>
                    <span class="rt">酒店住宿费 <span>{{item.hotelServiceFee}}</span> 元</span><br>
                    <span class="fir-span">酒店名称</span><span>{{item.hotelName}}</span>
                </div>
                <div class="line dashed" v-show="detailData.teamVisEntityList" v-for="item in detailData.teamVisEntityList">
                    <span class="fir-span">景区联系人</span><span>{{item.visLinkName}}</span>
                    <span class="sec-span">联系电话 <span>{{item.visLinkPhone}}</span></span>
                    <span class="rt">景区门票 <span>{{item.visFee}}</span> 元</span><br>
                    <span class="fir-span">景区名称</span> <span>{{item.visName}}</span>
                </div>
            </div>
            <div class="ground" v-show="detailData.planType!=='0'" v-for="(item,index) in detailData.groundVoList">
                <div class="line solid" style="text-align:center">
                    地接安排
                </div>
                <div class="line dashed">
                    <span class="fir-span">地接机构</span><span>{{item.groundLocalId}}</span>
                    <span class="rt">类型 <span v-show="item.groundType==='0'">按团队人次安排</span> <span v-show="item.groundType==='1'">按费用分项安排</span></span>
                </div>
                <div class="line dashed" v-show="item.groundType==='0'">
                    <span class="fir-span">地接费用</span>
                    <span>成人 {{item.groundAdultNum}}</span> <span>单价 {{item.groundAdultPrice}} 元/人</span>
                    <span class="sec-span">儿童 {{item.groundChildNum}}</span> <span>单价 {{item.groundChildPrice}} 元/人</span>
                    <span class="sec-span">老人 {{item.groundOldManNum}}</span> <span>单价 {{item.groundOldManPrice}} 元/人</span><br>
                    <span class="fir-span">费用总计</span> {{parseInt(item.groundAdultNum)*parseInt(item.groundAdultPrice)+parseInt(item.groundChildNum)*parseInt(item.groundChildPrice)+parseInt(item.groundOldManNum)*parseInt(item.groundOldManPrice)}} 元
                </div>
                <div class="line dashed" v-show="item.groundType==='1'">
                    <div class="line dashed" v-if="item.teamGuideEntityList" v-for="item1 in item.teamGuideEntityList">
                        <span class="fir-span">导游姓名</span><span>{{item1.guideName}}</span>
                        <span class="sec-span">联系电话 <span>{{item1.guidePhone}}</span></span>
                        <span class="rt">导游服务费 <span>{{item1.guideServiceFee}}</span> 元/团</span>
                    </div>
                    <div class="line dashed" v-if="item.teamDriverEntityList" v-for="item1 in item.teamDriverEntityList">
                        <div v-show="item1.tool=='0'">
                            <span class="fir-span">车辆类型</span><span>{{item1.description}}</span>
                            <span class="sec-span">车牌照号 <span>{{item1.plateNumber}}</span></span>
                            <span class="rt">车辆服务费 <span>{{item1.driverFee}}</span> 元</span>
                        </div>
                        <div v-show="item1.tool!=='0'">
                            <span class="fir-span"  v-show="item1.tool==='1' && item1.direction ==='0'">去程火车</span>
                            <span class="fir-span"  v-show="item1.tool==='1' && item1.direction ==='1'">回程火车</span>
                            <span class="fir-span" v-show="item1.tool==='2' && item1.direction ==='0'">去程飞机</span>
                            <span class="fir-span" v-show="item1.tool==='2' && item1.direction ==='1'">回程飞机</span>
                            <span class="fir-span" v-show="item1.tool==='3' && item1.direction ==='0'">去程轮船</span>
                            <span class="fir-span" v-show="item1.tool==='3' && item1.direction ==='1'">回程轮船</span>
                            <span>{{item1.description}}</span>
                            <span class="sec-span">成人 {{item1.adultNum}} 人</span>
                            <span class="sec-span">儿童 {{item1.childNum}} 人</span>
                            <span class="rt" v-show="item1.tool==='1'">火车费用 <span>{{item1.driverFee}}</span> 元</span>
                            <span class="rt" v-show="item1.tool==='2'">飞机费用 <span>{{item1.driverFee}}</span> 元</span>
                            <span class="rt" v-show="item1.tool==='3'">轮船费用 <span>{{item1.driverFee}}</span> 元</span>
                        </div>
                    </div>
                    <div class="line dashed" v-if="item.teamHotelEntityList" v-for="item1 in item.teamHotelEntityList">
                        <span class="fir-span">酒店名称</span><span>{{item1.hotelName}}</span>
                        <span class="rt">酒店费用 <span>{{item1.hotelServiceFee}}</span> 元</span>
                    </div>
                    <div class="line dashed" v-if="item.teamVisEntityList" v-for="item1 in item.teamVisEntityList">
                        <span class="fir-span">景区名称</span><span>{{item1.visName}}</span>
                        <span class="rt">门票费用 <span>{{item1.visFee}}</span> 元</span>
                    </div>
                    <div class="line dashed" v-if="item.groundMealEntity">
                        <span class="fir-span">餐饮费用</span>
                        <span>成人 <span>{{item.groundMealEntity.mealAdultNum}}</span> 人</span>
                        <span class="sec-span">儿童 <span>{{item.groundMealEntity.mealChildNum}}</span> 人</span>
                        <span class="rt">费用 <span>{{parseInt(item.groundMealEntity.mealAdultNum)*parseInt(item.groundMealEntity.mealAdultPrice)+parseInt(item.groundMealEntity.mealChildNum)*parseInt(item.groundMealEntity.mealChildPrice)}}</span> 元</span>
                    </div>
                </div>
            </div>
            <div class="line solid">
                <span class="fir-span">费用总计</span><span>{{totalMoney}}</span> 元
            </div>
        </div>
        <div class="table">
            <el-table :data="tableData" style="width:100%">
				<!-- <el-table-column type="selection" width="30"></el-table-column> -->
				<el-table-column type="index" label="序号" width='60' align='center'>
				</el-table-column>
				<el-table-column prop="linkName" label="联系人" width="100" align="center"></el-table-column>
				<el-table-column prop="linkPhone" label="联系电话" width="120" align="center"></el-table-column>
				<el-table-column prop="num" label="人数" width="100" align="center"></el-table-column>
				<el-table-column label="集合时间地点" align="center">
					<template slot-scope="scope">
						<el-tooltip :content="tableData[scope.$index].proGatherTime+' '+tableData[scope.$index].proGatherPlace" placement="bottom" effect="light">
							<div>
								<span>{{tableData[scope.$index].proGatherTime}}</span> <span>{{tableData[scope.$index].proGatherPlace}}</span>
							</div>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'component_name',
    props: {
        id: {
            type: Number,
            default: ''
        }
    },
    data() {
        return {
            detailData: {
                
            },
            tableData:[]
        };
    },
    methods: {
        loadData(obj) {
            
            let id = obj ? obj : this.id;
            console.log(id);
            this.$http
                .axios({
                    url: this.$api.getPlanDetilById + '/' + id,
                    method: 'get',
                    // params: { orderId: this.orderId }, // get方式传值
                    json: false,
                    error: true
                })
                .then(res => {
                    this.detailData = {},
                    this.tableData = []
                    this.storeData(res);
                })
                .catch(err => {
                    // this.err = true;
                    // console.log(123);
                    this.detailData = {},
                    this.tableData = []
                    this.$message.error('订单有误');
                });
        },
        storeData(res){
            this.tableData = res.visitorData.dataList;
            this.detailData = res.teamVo;
            console.log(this.detailData);
            
            if(this.detailData.teamDriverEntityList){
                for (let i = 0; i < this.detailData.teamDriverEntityList.length; i++) {
                    let enter = this.detailData.teamDriverEntityList[i];
                    if(enter.tool !=='0'){
                        enter.driverFee = 0;
                        if(enter.adultNum) enter.driverFee += parseInt(enter.adultNum*enter.adultPrice)
                        if(enter.childNum) enter.driverFee += parseInt(enter.childNum*enter.childPrice)
                    }
                }
            }
            if(this.detailData.groundVoList.length>0){
                for (let i = 0; i < this.detailData.groundVoList.length; i++) {
                    let enter = this.detailData.groundVoList[i]
                    if(enter.groundType==='1'){
                        if(enter.teamDriverEntityList){
                            for (let j = 0; j < enter.teamDriverEntityList.length; j++) {
                                if(enter.teamDriverEntityList[j].tool !=='0'){
                                    let text = enter.teamDriverEntityList[j];
                                    text.driverFee = 0;
                                    if(text.adultNum) text.driverFee += parseInt(text.adultNum*text.adultPrice);
                                    if(text.childNum) text.driverFee += parseInt(text.childNum*text.childPrice);
                                }
                            }
                        }
                    }
                }
            }
        },
    },
    mounted() {
        this.loadData();
    },
    computed:{
       totalMoney(){
            let totalMoney = 0;
            if(this.detailData.planType){
                if(this.detailData.teamGuideEntityList.length>0){// 组团导游
                    totalMoney += parseInt(this.detailData.teamGuideEntityList[0].guideServiceFee);
                }
                if(this.detailData.teamDriverEntityList.length>0){
                    for (let i = 0; i < this.detailData.teamDriverEntityList.length; i++) {
                        totalMoney += parseInt(this.detailData.teamDriverEntityList[i].driverFee);
                    }
                }
                if(this.detailData.teamHotelEntityList.length>0){
                    for (let i = 0; i < this.detailData.teamHotelEntityList.length; i++) {
                        totalMoney += parseInt(this.detailData.teamHotelEntityList[i].hotelServiceFee);                   
                    }
                }
                if(this.detailData.teamVisEntityList.length>0){
                    for (let i = 0; i < this.detailData.teamVisEntityList.length; i++) {
                        totalMoney += parseInt(this.detailData.teamVisEntityList[i].visFee);                    
                    }
                }
                if(this.detailData.groundVoList){
                    for (let i = 0; i < this.detailData.groundVoList.length; i++) {
                        let item = this.detailData.groundVoList[i];
                        if(item.groundType ==='0'){
                            totalMoney += parseInt(item.groundAdultNum)*parseInt(item.groundAdultPrice)+parseInt(item.groundChildNum)*parseInt(item.groundChildPrice)+parseInt(item.groundOldManNum)*parseInt(item.groundOldManPrice)
                        }else{
                            if(item.teamGuideEntityList){
                                for (let j = 0; j < item.teamGuideEntityList.length; j++) {
                                        totalMoney += parseInt(item.teamGuideEntityList[j].guideServiceFee);                         
                                }
                            }
                            if(item.teamDriverEntityList){
                                for (let j = 0; j < item.teamDriverEntityList.length; j++) {
                                    totalMoney += parseInt(item.teamDriverEntityList[j].driverFee);
                                }
                            }
                            if(item.teamHotelEntityList){
                                for (let j = 0; j < item.teamHotelEntityList.length; j++) {
                                    totalMoney += parseInt(item.teamHotelEntityList[j].hotelServiceFee);                                
                                }
                            }
                            if(item.teamVisEntityList){
                                for (let j = 0; j < item.teamVisEntityList.length; j++) {
                                    totalMoney += parseInt(item.teamVisEntityList[j].visFee); 
                                }
                            }
                            if(item.groundMealEntity){
                                // for (let j = 0; j < item.groundMealEntity.length; j++) {
                                    totalMoney += parseInt(item.groundMealEntity.mealAdultNum)*parseInt(item.groundMealEntity.mealAdultPrice)+parseInt(item.groundMealEntity.mealChildNum)*parseInt(item.groundMealEntity.mealChildPrice)                                
                                // }
                            }
                        }
                    }
                }
            }
            return totalMoney;
       }

    },
    watch: {
       id(){
           console.log(this.id);
       }
    }
};
</script>
<style lang='scss' scoped>
    .detail{
        max-height: 500px;
        overflow: auto;
        .rt{
            float: right;
        }
        .line{
            line-height: 40px;
        }
        .dashed{
            border-bottom: 1px dashed#ddd;
        }
        .solid{
            border-bottom: 1px solid #ddd;
        }
        .top{
            line-height: 40px;
            border-bottom: 1px solid #ddd;
        }
        .ground{
            margin-top: -1px;
        }
        .fir-span{
            display: inline-block;
            width: 90px;
        }
        .sec-span{
            margin-left: 15px;
        }
    }
</style>
