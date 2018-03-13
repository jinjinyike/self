<template>
    <div>
        <el-dialog title="" :visible.sync="showTabs" width='476px' @close='close' center>
            <header v-show="headerShow" class="flex is-justify-center is-align-center">
                <section class="section-car">
                    <span class="arraw_left" @click="previousCar" :class="{active:nowCarNum!==1}"> ＜ </span>
                    <span class="center">{{nowCarNum}}号车</span>
                    <span class="arraw_right" @click="nextCar" :class="{active:carInfo.length>nowCarNum}"> ＞ </span>
                </section>
                <section class="section-add">
                    <button @click="addCar" v-if="carInfo.length===nowCarNum" class="button">增加车辆</button>
                    <span v-else style="">共有{{carInfo.length}}辆车</span>
                </section>
            </header>
            <section class="color flex is-justify-center is-align-center">
                <p class="flex is-align-center">
                    <span class="pay1"></span>已付款</p>
                <p class="flex is-align-center">
                    <span class="unpay1"></span>未付款</p>
                <p class="flex is-align-center">
                    <span class="occ1"></span>占位</p>
                <p class="flex is-align-center">
                    <span class="cancel1"></span>取消</p>

            </section>
            <section v-for="(item,index) in carInfo" :key="index" v-show="nowCarNum===index+1">
                <div class="carBox">
                    <p class="flex is-justify-space-between">
                        <span style="color:#929AB1;background:#ddd;">司机</span>
                        <span style="margin-right:0px;color:#929AB1;background:#ddd;">导游</span>
                    </p>
                    <p v-for="(items,idx) in item.arr">
                        <span v-for="(key,value) in items" v-selectColor='{DATA:item,limitNum,selectClicks,method:changeArr,index:index,nowCarNum,deleteCancel}' ref="span">{{key}}</span>
                    </p>
                </div>
                <footer v-show="remarkShow" style="margin-top:20px;">
                    <el-button @click="remarkInfoShow = !remarkInfoShow" v-if="item.ramarks === ''" class="button">添加备注</el-button>
                    <section class="flex is-justify-center is-align-center" v-if="!remarkInfoShow">
                        <span style="color:#909296;">车辆备注：</span>
                        <span style="width: 270px;display: inline-block;height: 30px;line-height:30px;margin-right:22px;color:#FC716E;">{{item.remarks}}</span>
                        <el-button @click="remarkInfoShow = !remarkInfoShow" type="text" class="button">编辑备注</el-button>
                    </section>
                    <section v-if="remarkInfoShow" class="flex is-justify-center is-align-center" style="margin-right:10px;">
                        <span style="color:#909296;">车辆备注：</span>
                        <el-input v-model="item.remarks" placeholder="最多20个字" style="width:300px;margin-right:10px;"></el-input>
                        <el-button @click="saveRemarks(index)" type="text" class="button">保存</el-button>
                    </section>
                </footer>
            </section>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="cancleOrderDialog = false">取 消</el-button> -->
                <el-button @click="showTabs=false" type="primary">确定</el-button>
            </span>

        </el-dialog>
        <el-dialog title="" :visible.sync="selectCarTab" width='476px' center>
            <p class="flex is-justify-center is-align-center" style="margin-bottom:20px;">
                <span style="margin-right:10px;">
                    选择车型
                </span>
                <el-select v-model="carTyprValue" placeholder="请选择" style="width:100px;">
                    <el-option v-for="item in carTypr" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

            </p>
            <p class="flex is-justify-center is-align-center">
                <span style="margin-right:10px;">
                    车辆备注
                </span>
                <el-input v-model="remarkValue" placeholder="最多20个字" style="width:300px;"></el-input>

            </p>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="cancleOrderDialog = false">取 消</el-button> -->
                <el-button @click="submitAddCar" class="button">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
	name: 'component_name',
	props: {
		// 是否显示页面
		showTab: {
			type: Boolean,
			required: true
		},
		// 出发团期
		proLeaveTime: {
			required: true,
			type: String
		},
		// 产品编号
		proNum: {
			required: true,
			type: String
		},
		// 游客数
		limitNum: {
			required: true,
			type: Number
		},
		// 是否显示头部
		headerShow: {
			type: Boolean,
			default: true
		},
		// 是否显示页面底部的备注
		remarkShow: {
			type: Boolean,
			default: true
		},
		selectClick: {
			type: Boolean,
			required: true
		},
		allowLoad: {
			type: Boolean,
			default: true
		},
		//占位id
		restId: {
			type: String,
			default: ''
		}
		// 车辆数量
		// carNUm: {
		// 	type: Number,
		// 	default: 1
		// }
	},
	data() {
		return {
			remarkInfoShow: false,
			showTabs: this.showTab,
			selectClicks: this.selectClick,
			carNUms: 1,
			// 目前显示的车辆号
			nowCarNum: 1,
			// 选择车辆类型的弹框
			selectCarTab: false,
			// 车辆类型
			carTypr: [
				{
					label: '33+1+1',
					value: '35'
				},
				{
					label: '35+1+1',
					value: '37'
				},
				{
					label: '37+1+1',
					value: '39'
				},
				{
					label: '45+1+1',
					value: '47'
				},
				{
					label: '47+1+1',
					value: '49'
				},
				{
					label: '49+1+1',
					value: '51'
				},
				{
					label: '53+1+1',
					value: '55'
				},
				{
					label: '55+1+1',
					value: '57'
				},
				{
					label: '57+1+1',
					value: '59'
				},
				{
					label: '59+1+1',
					value: '61'
				}
			],
			carTyprValue: '',
			// 将值拆分成+1+1的形式
			carTyprValueSpecial: '',
			// 添加新的车辆时写的备注
			remarkValue: '',
			// 每个页面的车辆信息
			carInfo: [
				{
					personNUm: '51',
					door: '',
					pay: [],
					unpay: [],
					occ: [],
					cancel: [1, 2],
					remarks: ''
				}
			],
			// 游客数
			// limitNum: '2',
			// 临时存储用的
			momentArr: {
				idx: '',
				arr: []
			}
		};
	},
	mounted() {
		// let timer = setInterval(()=>{
		//  if(this.proLeaveTime.length>0){
		//      this.loadData();
		//      clearInterval(timer)
		//      timer = null;
		//  }
		// },50)
	},
	methods: {
		deleteCancel(idx, item) {
			for (let i = 0; i < this.carInfo[idx - 1].cancel.length; i++) {
				if (this.carInfo[idx - 1].cancel[i] == item) {
					this.carInfo[idx - 1].cancel.splice(i, 1);
				}
			}
		},
		changeArr(idx, arr) {
			this.carInfo[idx - 1].occ = arr;
		},
		close() {
			let deleteNum = 0;
			let t = 0;
			for (let i = 0; i < this.carInfo.length; i++) {
				if (i >= this.carInfo.length) {
					break;
				}
				if (i > 0) {
					deleteNum = this.carInfo[i - 1].occ.length + t;
					if (deleteNum === 0) deleteNum = t;
					let c = this.carInfo[i].occ.splice(0, deleteNum);
					t = c.length;
					if (t === 0) t = deleteNum;
				}
			}

			for (let j = 0; j < this.carInfo.length; j++) {
				if (this.carInfo[j].occ.length > 0) {
					if (this.carInfo[j].cancel.length > 0) {
						this.carInfo[j].cancel = this.carInfo[j].cancel.concat(
							this.carInfo[j].occ
						);
					} else {
						this.carInfo[j].cancel = this.carInfo[j].occ;
					}

					this.carInfo[j].occ = [];
				}
			}
			let occ = document.getElementsByClassName('occ');
			let length = occ.length;

			for (let i = 0; i < length; i++) {
				if (occ[i] === undefined) break;

				occ[i].classList.remove('occ');
				i = i - 1;
			}
			console.log(12312313);
			this.$emit('close', this.carInfo);
		},
		loadData() {
			if (this.allowLoad === false) return;

			let obj = {
				proLeaveTime: this.proLeaveTime,
				proNum: this.proNum
			};
			if (this.restId) obj.restId = this.restId;
			this.$http
				.axios({
					url: '/carBefore/getCarBeforeInfo',
					method: 'get',
					params: obj
				})
				.then(res => {
					this.carInfo = [];
					// this.carInfo.splice(0, 1);
					for (let i = 0; i < res.length; i++) {
						this.carInfo.push({
							personNUm: res[i].carTypeBefore,
							door: '',
							pay: res[i].payedSeat,
							unpay: res[i].unPaySeat,
							occ: [],
							cancel: res[i].cancel ? res[i].cancel : [],
							remarks: res[i].remark,
							carMark: res[i].carMark,
							carNum: res[i].carNum
						});
					}
					this.carNUms = parseInt(res[res.length - 1].carNum);
				})
				.catch(error => {
					console.error(error);
				});
		},
		// 有门车辆座位的拆分
		// 无门车辆座位的拆分
		// 判断车辆有门还是无门
		judugeDoor() {},
		// 点击增加车辆
		addCar() {
			this.selectCarTab = true;
			this.showTabs = false;
		},
		// 选好车型之后提交
		submitAddCar() {
			this.$http
				.axios({
					url: '/carBefore/addCarBeforeEntity',
					method: 'post',
					data: {
						carNum: this.carNUms + 1, //车辆号
						carTypeBefore: this.carTyprValueSpecial, //车型
						proNum: this.proNum, //产品编号
						proLeaveTime: this.proLeaveTime, //日期
						remark: this.remarkValue //车辆备注
					}
				})
				.then(res => {
					if (res === 1) {
						this.carInfo.push({
							personNUm: this.carTyprValue,
							pay: [],
							unpay: [],
							occ: [],
							cancel: [],
							remarks: this.remarkValue
						});

						this.carTyprValue = '';
						this.carNUms++;
						this.selectCarTab = false;
						this.showTabs = true;
						this.selectClicks = true;
						return;
					}
					console.warn('增加车辆接口错误');
				});
		},
		previousCar() {
			if (this.nowCarNum > 1) {
				this.nowCarNum--;
			}
		},
		nextCar() {
			if (this.nowCarNum < this.carInfo.length) {
				this.nowCarNum++;
			}
		},
		// 提交编辑好的备注
		saveRemarks(idx) {
			this.$http
				.axios({
					url: '/carBefore/updateRemark',
					method: 'post',
					data: {
						id: this.carInfo[idx].carMark,
						remark: this.carInfo[idx].remarks
					}
				})
				.then(res => {
					if (res === 1) {
						this.remarkInfoShow = false;
					}
				})
				.catch(err => {
					console.error(err);
				});
		}
	},
	watch: {
		carInfo: {
			deep: true,
			handler(val, oldVal) {
				val.map((item, idx) => {
					let siteNum = (parseInt(item.personNUm) - 7) % 4 === 0 ? false : true;
					item.door = siteNum;
					item.arr = [];
					let arr = [];
					if (siteNum === false) {
						for (let i = 1; i <= parseInt(item.personNUm) - 7; i++) {
							arr.push(i);
							if (i % 4 === 0) {
								item.arr.push(arr);
								arr = [];
							}
						}
						item.arr.push([
							parseInt(item.personNUm) - 6,
							parseInt(item.personNUm) - 5,
							parseInt(item.personNUm) - 4,
							parseInt(item.personNUm) - 3,
							parseInt(item.personNUm) - 2
						]);
					} else {
						let allRow = (parseInt(item.personNUm) - 9) / 4;
						let addRow = Math.ceil(allRow / 2);

						for (let i = 1; i <= parseInt(item.personNUm) - 7; i++) {
							if (i === addRow * 4 + 1) {
								item.arr.push([i, i + 1]);
								i = i + 1;
							} else {
								arr.push(i);
								if (arr.length === 4) {
									item.arr.push(arr);
									arr = [];
								}
							}
						}
						item.arr.push([
							parseInt(item.personNUm) - 6,
							parseInt(item.personNUm) - 5,
							parseInt(item.personNUm) - 4,
							parseInt(item.personNUm) - 3,
							parseInt(item.personNUm) - 2
						]);
					}
				});
			}
		},
		carTyprValue(val) {
			if (val.length === 2) {
				this.carTyprValueSpecial = `${parseInt(val) - 2}+1+1`;
			}
		},
		showTab(val) {
			this.showTabs = val;
		},
		selectClick(val) {
			this.selectClicks = val;
		},
		proLeaveTime() {
			this.carInfo = [{}];
			this.nowCarNum = 1;
			this.loadData();
		},
		proNum() {
			if (this.proLeaveTime === '') return;
			this.carInfo = [{}];
			this.nowCarNum = 1;
			this.loadData();
		}
	},
	computed: {},
	directives: {
		selectColor: {
			inserted: function(el, binding) {
				let limitNum = binding.value.limitNum;
				let pay = binding.value.DATA.pay;
				let unpay = binding.value.DATA.unpay;
				let occ = binding.value.DATA.occ;
				let cancel = binding.value.DATA.cancel;
				let nowCarNum = binding.value.nowCarNum;

				if (pay) {
					// 支付
					pay.forEach(item => {
						if (parseInt(el.innerText) === parseInt(item)) {
							el.classList.add('pay');
						}
					});
				}
				if (unpay) {
					// 支付
					unpay.forEach(item => {
						if (parseInt(el.innerText) === parseInt(item)) {
							el.classList.add('unpay');
						}
					});
				}
				if (cancel) {
					// 支付
					cancel.forEach(item => {
						if (parseInt(el.innerText) === parseInt(item)) {
							el.classList.add('cancel');
						}
					});
				}

				el['@clickSite'] = e => {
					console.log(e.target);
					let cancelNum = document.getElementsByClassName('cancel');
					let occNum = document.getElementsByClassName('occ');
					if (
						e.target.classList.contains('unpay') ||
						e.target.classList.contains('pay')
					)
						return;

					if (e.target.classList.contains('cancel')) {
						e.target.classList.remove('cancel');
						binding.value.deleteCancel(nowCarNum, e.target.innerText);
						return;
					}
					if (
						(cancelNum.length < limitNum &&
							occNum.length < limitNum - cancelNum.length) ||
						(!cancelNum.length && occNum.length < limitNum)
					) {
						e.target.classList.toggle('occ');
					} else {
						e.target.classList.remove('occ');
					}

					let arr = [];
					for (let i = 0; i < occNum.length; i++) {
						arr.push(occNum[i].innerText);
					}
					binding.value.method(nowCarNum, arr);
				};
				if (binding.value.selectClicks === false) {
					return;
				} else {
					el.addEventListener('click', el['@clickSite']);
				}
			},
			componentUpdated: function(el, binding) {
				el.removeEventListener('click', el['@clickSite']);

				let limitNum = binding.value.limitNum;
				let pay = binding.value.DATA.pay;
				let unpay = binding.value.DATA.unpay;
				let occ = binding.value.DATA.occ;
				let cancel = binding.value.DATA.cancel;
				let nowCarNum = binding.value.nowCarNum;

				if (pay) {
					// 支付
					pay.forEach(item => {
						if (parseInt(el.innerText) === parseInt(item)) {
							el.classList.add('pay');
						}
					});
				}
				if (unpay) {
					// 支付
					unpay.forEach(item => {
						if (parseInt(el.innerText) === parseInt(item)) {
							el.classList.add('unpay');
						}
					});
				}
				if (cancel) {
					// 支付
					cancel.forEach(item => {
						if (parseInt(el.innerText) === parseInt(item)) {
							el.classList.add('cancel');
						}
					});
				}

				el['@clickSite'] = e => {
					console.log(e.target);
					let cancelNum = document.getElementsByClassName('cancel');
					let occNum = document.getElementsByClassName('occ');
					if (
						e.target.classList.contains('unpay') ||
						e.target.classList.contains('pay')
					)
						return;

					if (e.target.classList.contains('cancel')) {
						e.target.classList.remove('cancel');
						binding.value.deleteCancel(nowCarNum, e.target.innerText);
						return;
					}

					if (
						(cancelNum.length < limitNum &&
							occNum.length < limitNum - cancelNum.length) ||
						(!cancelNum.length && occNum.length < limitNum)
					) {
						e.target.classList.toggle('occ');
					} else {
						e.target.classList.remove('occ');
					}
					let arr = [];
					for (let i = 0; i < occNum.length; i++) {
						arr.push(occNum[i].innerText);
					}

					binding.value.method(nowCarNum, arr);
				};

				if (binding.value.selectClicks === false) {
					return;
				} else {
					el.addEventListener('click', el['@clickSite']);
				}
			},
			unbind: function(el, binding) {
				el.removeEventListener('click', el['@clickSite']);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
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
.button {
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	color: #4cc8db;
}
header {
	.section-car {
		span {
			font-size: 20px;
			&.active {
				cursor: pointer;
				color: #4cc8db;
			}
		}
		.center {
			margin: 0 5px;
		}
	}
	.section-add {
		position: absolute;
		left: 300px;
	}
}
.carBox {
	border: 1px solid #000;
	width: 58%;
	margin: 0 auto;
	padding: 10px;
	p {
		span {
			cursor: pointer;
			display: inline-block;
			text-align: center;
			border: 1px solid #000;
			width: 38px;
			height: 28px;
			line-height: 28px;
			margin: 10px 10px 0 0;
			&:last-child {
				margin-right: 0;
			}
			&.pay {
				background: #d81e06;
				color: #fff;
			}
			&.unpay {
				background: #1296db;
				color: #fff;
			}
			&.occ {
				background: #000;
				color: #fff;
			}
			&.cancel {
				background: #fe9900;
				color: #fff;
			}
		}
		&:not(:last-child) {
			span {
				&:nth-child(2) {
					margin-right: 61px;
				}
			}
		}
	}
}
.color {
	margin: 10px 0;
	p {
		&:not(:last-child) {
			margin-right: 10px;
		}
	}
	span {
		display: inline-block;
		width: 25px;
		margin-right: 5px;

		height: 13px;
		&.pay1 {
			background: #d81e06;
		}
		&.unpay1 {
			background: #1296db;
		}
		&.occ1 {
			background: #000;
		}
		&.cancel1 {
			background: #fe9900;
		}
	}
}
.el-dialog__body{
    padding-bottom: 0 !important;
}
</style>
