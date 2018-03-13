<template>
	<div class="right-content-index">
		<div class="con">
			<div class="item-bottom">
				<span>产品名称</span>
				<pro-commen style='display:inline-block' ref='pro' :valid='0' :setWidth='width'></pro-commen>
				<el-button type="primary" plain size='small' @click='getCon'>查询</el-button>
			</div>
			<div class="dot"></div>
			<template v-if='showCanlder'>
				<div class="item-bottom">
					<!-- <span>查询结果</span> -->
					<calander-seat :obj='dataArr' ref='calander' :showPrice='true' :canClick='true' :isSingle='true' @getdata='dateClick' :index-num='1' style="margin-left:0"></calander-seat>
					<!-- 右侧占位信息 -->
					<div title="预留占位" v-if="dialogVisible" style="display:inline-block;vertical-align:top;border:1px solid  #ddd;border-radius:5px;padding:10px 0 0 10px;height:281px;width:470px">
						<div class="item-bottom">
							<span>通过手机号码查询</span>
							<el-input placeholder='分销商手机号' v-model="phoneNum" v-on:input='checkSaleman' style="width:35%"></el-input>
							<!-- <el-button type="primary" plain size='small' @click='getDis'>查询</el-button> -->
						</div>
						<div class="item-bottom">
							<span class="span-title">系统分销商</span>
							<el-select v-model='disNum' style="width:33.7%" clearable  @change='distributorChange'>
								<el-option v-for='item in option1' :value='item.id' :label='item.name' :key='item.id'></el-option>
							</el-select>
							<span>—</span>
							<el-select v-model='selNum' style="width:34%" clearable>
								<el-option v-for='item in option2' :value='item.id' :label='item.name' :key='item.id'></el-option>
							</el-select>
						</div>
						<div class="item-bottom">
							<span class="span-title">临时记录</span>
							<el-input style='width:33.7%' placeholder='分销商名称' v-model='tempName'></el-input>
							<span>—</span>
							<el-input style='width:34%' placeholder='分销商手机号' v-model='tempTel' v-on:input='checkPhone()'></el-input>
						</div>
						<div class="item-bottom">
							<template v-if='adult'>
								<span>成人</span>
								<el-input v-model='adultNum' style='width:80px' placeholder='数量' v-on:input='checkNum(adult)' @keyup.native="adultNum=adultNum.replace(/\D/g,'')"></el-input>
							</template>
							<template v-if='child'>
								<span>儿童</span>
								<el-input v-model='childNum' style='width:80px' placeholder='数量' v-on:input='checkNum(child)' @keyup.native="childNum=childNum.replace(/\D/g,'')"></el-input>
							</template>
							<template v-if='student'>
								<span>学生</span>
								<el-input v-model='studentNum' style='width:80px' placeholder='数量' v-on:input='checkNum(student)' @keyup.native="studentNum=studentNum.replace(/\D/g,'')"></el-input>
							</template>
							<template v-if='old'>
								<span>老人</span>
								<el-input v-model='oldNum' style='width:80px' placeholder='数量' v-on:input='checkNum(old)' @keyup.native="oldNum=oldNum.replace(/\D/g,'')"></el-input>
							</template>
							<el-button type="primary" plain size='small' v-if='showRest==1' @click='obligate'>座位预留</el-button>
						</div>
						<div class="item-bottom">
							<span style='color:red'>*系统分销商和临时记录填写一个即可</span>
						</div>
						<!-- <span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible = false">取 消</el-button>
							<el-button type="primary" @click="addRest">确 定</el-button>
						</span> -->
					</div>

				</div>
				<div class="dot"></div>
				<div class="item-bottom" style='text-align:center'>
					<el-button type="primary" plain size='small' @click='getSite' v-if='showRest==1'>座位查询</el-button>
					<el-button type="primary" plain size='small' @click='getRest'>占位</el-button>
				</div>
			</template>
		</div>
		
		<!-- 这上面写的三个属性是必须传入的 -->
		<!-- 最后一个属性用来控制组件是否显示 -->
		<select-site :select-click='selectClick' :pro-leave-time='proLeaveTime' :pro-num='proNum1' :show-tab='showTab' @close='closeTab' :limit-num='limitNum' :allow-load='allowLoad'></select-site>
	</div>
</template>
<script>
import selectSite from './selectSite.vue';
import proCommen from '../../public/proName_Num.vue';
import calanderSeat from '../../public/calander_seat.vue';
import Validate from '../../../../common/validate/validate.js';
import { verificationPhone } from '../../../../common/utils/verificationUtils.js';
export default {
	data() {
		return {
			allowLoad:false,
			width: '150px',
			dataArr: [],
			proLeaveTime: '',
			option1: [{ value: '001', label: '假分销商' }],
			option2: [{ value: '001', label: '假业务员' }],
			adult: false,
			student: false,
			child: false,
			old: false,
			adultNum: 0,
			studentNum: 0,
			childNum: 0,
			oldNum: 0,
			dialogVisible: false,
			disNum: '', //选择分销商
			selNum: '', //业务员
			phoneNum:'',
			showRest: 0, //1显示出来，0不显示
			showCanlder: false,
			proNum1: '', //产品编号
			tempName: '', // 临时记录分销商名字
			tempTel: '', // 临时记录分销商手机号
			showTab: false, //是否显示选择座位的模态框
			selectClick: false, //座位是否可以点击,
			limitNum: 0,
			carInfo: ''
		};
	},
	watch: {},
	created(){
		this.getdistribute()
	},
	methods: {
		getdistribute(){
            this.$http.axios({
                url:this.$api.getDistributorList,
                method:'get',
            }).then(res=>{
                this.option1=res;
            })
		},
		distributorChange() {
            //分销商切换请求业务员 手机号
            if(this.disNum){
                let vm=this;
                this.selNum='';
                this.$http.axios({
                    url:this.$api.getDistributorSalesmanList+'/'+this.disNum,
                    method:'get',
                }).then(res=>{
                    this.option2=res;
                })
                this.option1.forEach(function(item,index){
                    if(item.id==vm.disNum){
                        vm.phoneNum=item.phoneNum;
                    }
                });
            }

        },
		checkSaleman(){//手机号回显分销商
			if(this.phoneNum){
				this.$nextTick(() => {
					this.phoneNum=this.$validate.checkNum(this.phoneNum).slice(0,11);
				});
				if(this.phoneNum.length==11){
					let vm=this;
					this.option1.forEach(function(item,index){
						if(item.phoneNum==vm.phoneNum){
							vm.disNum=item.id;
							vm.distributorChange();
						}
					})
				}else{
					this.disNum='';
					this.selNum='';
					this.option2=[];
				}
			}
		},
		// 座位预定的方法
		obligate() {
			this.limitNum =
				Number(this.oldNum) +
				Number(this.studentNum) +
				Number(this.childNum) +
				Number(this.adultNum);
			this.showTab = true;
			this.selectClick = true;
		},
		closeTab(carInfo) {
			this.showTab = false;
			this.selectClick = false;
			this.carInfo = carInfo;
			console.log(carInfo);
		},
		addRest() {
			let obj = {};
			obj.orderRestEntity = {};
			if ((this.disNum || this.selNum) && (this.tempName || this.tempTel)) {
				return this.$message.error('临时分销商和选择的分销商只能保留一个');
			}
			if (this.disNum && this.selNum) {
				//选择的 暂无字段
			}
			if (this.tempName || this.tempTel) {
				//临时分销
				if (!this.tempName) return this.$message.error('未填写临时分销商');
				if (!this.tempTel) return this.$message.error('未填临时分销商手机号码');
				if (!verificationPhone(this.tempTel))
					return this.$message.error('临时手机号码不正确');
				obj.orderRestEntity.tempTel = this.tempTel;
				obj.orderRestEntity.tempName = this.tempName;
			}
			if (this.adult) {
				if (!this.adultNum) return this.$message.error('未填写成人数量');
				obj.orderRestEntity.adultRest = this.adultNum;
			}
			if (this.child) {
				if (!this.childNum) return this.$message.error('未填写儿童数量');
				obj.orderRestEntity.childRest = this.childNum;
			}
			if (this.student) {
				if (!this.studentNum) return this.$message.error('未填写学生数量');
				obj.orderRestEntity.studentRest = this.studentNum;
			}
			if (this.old) {
				if (!this.oldNum) return this.$message.error('未填写老人数量');
				obj.orderRestEntity.oldRest = this.oldNum;
			}
			obj.orderRestEntity.proLeaveTime = new Date(this.proLeaveTime).getTime();
			obj.orderRestEntity.proNum = this.proNum1;

			obj.carSeatEntityList = [];
			let num = 0;
			for (let j = 0; j < this.carInfo.length; j++) {
				obj.carSeatEntityList.push({
					carNum: this.carInfo[j].carNum, //车辆号
					carBeforeId: this.carInfo[j].carMark, //后台返的carMark
					seatBefore: this.carInfo[j].cancel.join(',') //安排座位号˝
				});
				num = num + this.carInfo[j].cancel.length;
			}
			if (num !== parseInt(this.limitNum))
				return this.$message.error('人数与座位数不符');
			let momentArr = [];
			obj.carSeatEntityList.forEach(item => {
				if (item.seatBefore !== '') {
					momentArr.push(item);
				}
			});
			obj.carSeatEntityList = momentArr;
			momentArr = null;

			console.log(obj);
			this.$http
				.axios({
					url: this.$api.addOrderRest,
					method: 'post',
					data: obj,
					json: true
				})
				.then(res => {
					if (res == 1) this.$message.success('占位成功');
					this.dialogVisible = false;
				});
		},
		checkPhone() {
			//校验手机号码
			this.$nextTick(() => {
				this.tempTel = Validate.checkNum(this.tempTel).slice(0, 11);
			});
		},
		checkNum(type) {
			//校验人数量
			switch (type) {
				case 'adult':
					this.$nextTick(() => {
						this.adultNum = Validate.checkNum(this.adultNum).slice(0, 5);
					});
					break;
				case 'child':
					this.$nextTick(() => {
						this.childNum = Validate.checkNum(this.childNum).slice(0, 5);
					});
					break;
				case 'student':
					this.$nextTick(() => {
						this.studentNum = Validate.checkNum(this.studentNum).slice(0, 5);
					});
					break;
				case 'old':
					this.$nextTick(() => {
						this.oldNum = Validate.checkNum(this.oldNum).slice(0, 5);
					});
					break;
			}
		},
		getDis() {
			//获取对应分销商信息
		},
		getSite() {
			// 展示座位模态框
			if (!this.proLeaveTime) return this.$message.error('未选择团期');
			this.showTab = true;
			console.log(this.showTab);
		},
		getRest() {
			//获取占位信息
			if (!this.$refs.pro.proNum) return this.$message.error('未选择产品');
			if (!this.proLeaveTime) return this.$message.error('未选择团期');
			this.tempTel = ''; //清空数据
			this.tempName = '';
			this.adultNum = '';
			this.$http
				.axios({
					url: this.$api.getResverdRest,
					method: 'get',
					params: { proNum: this.proNum1 }
				})
				.then(res => {
					this.adult = false;
					this.child = false;
					this.student = false;
					this.old = false;
					let priceArr = res.buyKinds.split(',');
					if (priceArr.includes('儿童价格')) {
						this.child = true;
						this.childNum = '';
					}
					if (priceArr.includes('学生价格')) {
						this.student = true;
						this.studentNum = '';
					}
					if (priceArr.includes('老人价格')) {
						this.old = true;
						this.oldNum = '';
					}
					if (priceArr.includes('成人价格')) {
						this.adult = true;
						this.adultNum = '';
					}
					this.dialogVisible = true;
					// this.showCanlder = false;
				});
		},
		dateClick(data) {
			this.proLeaveTime = data;
		},
		getCon() {
			//查询
			this.allowLoad=false;
			this.showCanlder = false;
			this.dialogVisible=false;
			let proNum = this.$refs.pro.proNum;
			if (proNum !== '') {
				this.$http
					.axios({
						url:
							this.$api.getRouteRestEveryDay +
							'?valid=1&plan=1&showRest=1&proNum=' +
							proNum,
						method: 'get'
					})
					.then(res => {
						this.proNum1 = this.$refs.pro.proNum;
						this.dataArr = [];
						this.dataArr = res.dateMapList;
						this.showRest = res.showRest;
						if(this.showRest==1) this.allowLoad=true;
						this.showCanlder = true;
					});
			}
		},
		promiseAsyn() {
			return new Promise((resolve, reject) => {
				resolve();
			});
		}
	},
	components: {
		proCommen,
		calanderSeat,
		selectSite
	}
};
</script>
<style scoped>
.con {
	padding: 20px;
	color: #666;
}
.item-bottom {
	margin-bottom: 10px;
}
.el-input,
.el-select,
.el-textarea {
	margin: 0 10px;
}
.dot {
	margin: 20px 0;
	border-bottom: 1px dashed #ddd;
}
.span-title {
	display: inline-block;
	width: 70px;
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
</style>